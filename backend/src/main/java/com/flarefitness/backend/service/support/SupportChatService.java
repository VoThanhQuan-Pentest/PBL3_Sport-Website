package com.flarefitness.backend.service.support;

import com.flarefitness.backend.dto.support.SupportCustomerResponse;
import com.flarefitness.backend.dto.support.SupportMessageRequest;
import com.flarefitness.backend.dto.support.SupportMessageResponse;
import com.flarefitness.backend.dto.support.SupportThreadResponse;
import com.flarefitness.backend.dto.support.SupportThreadStatusRequest;
import com.flarefitness.backend.entity.Customer;
import com.flarefitness.backend.entity.User;
import com.flarefitness.backend.entity.support.SupportMessage;
import com.flarefitness.backend.entity.support.SupportThread;
import com.flarefitness.backend.exception.BadRequestException;
import com.flarefitness.backend.exception.ResourceNotFoundException;
import com.flarefitness.backend.exception.UnauthorizedException;
import com.flarefitness.backend.repository.CustomerRepository;
import com.flarefitness.backend.repository.UserRepository;
import com.flarefitness.backend.repository.support.SupportMessageRepository;
import com.flarefitness.backend.repository.support.SupportThreadRepository;
import com.flarefitness.backend.security.CurrentUserPrincipal;
import java.text.Normalizer;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SupportChatService {

    private static final String STATUS_OPEN = "Đang mở";
    private static final String STATUS_PROCESSING = "Đang xử lý";
    private static final String STATUS_CLOSED = "Đã đóng";
    private static final String CANONICAL_STATUS_OPEN = "\u0110ang m\u1edf";
    private static final String CANONICAL_STATUS_PROCESSING = "\u0110ang x\u1eed l\u00fd";
    private static final String CANONICAL_STATUS_CLOSED = "\u0110\u00e3 \u0111\u00f3ng";
    private static final Set<String> ALLOWED_STATUSES = Set.of(
            CANONICAL_STATUS_OPEN,
            CANONICAL_STATUS_PROCESSING,
            CANONICAL_STATUS_CLOSED
    );
    private static final LocalTime WORK_START = LocalTime.of(8, 0);
    private static final LocalTime WORK_END = LocalTime.of(21, 0);

    private final SupportThreadRepository supportThreadRepository;
    private final SupportMessageRepository supportMessageRepository;
    private final UserRepository userRepository;
    private final CustomerRepository customerRepository;

    public SupportChatService(
            SupportThreadRepository supportThreadRepository,
            SupportMessageRepository supportMessageRepository,
            UserRepository userRepository,
            CustomerRepository customerRepository
    ) {
        this.supportThreadRepository = supportThreadRepository;
        this.supportMessageRepository = supportMessageRepository;
        this.userRepository = userRepository;
        this.customerRepository = customerRepository;
    }

    @Transactional(readOnly = true)
    public SupportThreadResponse getCurrentCustomerThread(Authentication authentication, boolean createIfMissing) {
        User user = requireAuthenticatedUser(authentication);
        assertCustomerUser(user);

        SupportThread thread = supportThreadRepository.findFirstByCustomerUserId(user.getId()).orElse(null);
        if (thread == null && !createIfMissing) {
            return null;
        }

        if (thread == null) {
            thread = createThread(user);
        }

        return toThreadResponse(thread, customerRepository.findFirstByUserId(user.getId()).orElse(null), user);
    }

    @Transactional
    public SupportThreadResponse appendCustomerMessage(Authentication authentication, SupportMessageRequest request) {
        User user = requireAuthenticatedUser(authentication);
        assertCustomerUser(user);

        SupportThread thread = supportThreadRepository.findFirstByCustomerUserId(user.getId()).orElseGet(() -> createThread(user));
        LocalDateTime now = LocalDateTime.now();
        saveMessage(thread.getId(), "customer", user.getId(), request.text(), now);

        String autoReply = resolveAutoReply(request.text(), now);
        LocalDateTime updatedAt = now;
        if (!autoReply.isBlank()) {
            updatedAt = now.plusSeconds(1);
            saveMessage(thread.getId(), "staff", "", autoReply, updatedAt);
        }

        thread.setUpdatedAt(updatedAt);
        supportThreadRepository.save(thread);
        return toThreadResponse(thread, customerRepository.findFirstByUserId(user.getId()).orElse(null), user);
    }

    @Transactional(readOnly = true)
    public List<SupportThreadResponse> getThreadsForWorkspace(Authentication authentication) {
        User currentUser = requireAuthenticatedUser(authentication);
        assertWorkspaceUser(currentUser);

        List<SupportThread> threads = supportThreadRepository.findAllByOrderByUpdatedAtDesc();
        Map<String, User> usersById = userRepository.findAllById(
                threads.stream().map(SupportThread::getCustomerUserId).collect(Collectors.toSet())
        ).stream().collect(Collectors.toMap(User::getId, user -> user, (left, right) -> left, LinkedHashMap::new));
        Map<String, Customer> customersByUserId = customerRepository.findAll().stream()
                .filter(customer -> customer.getUserId() != null && !customer.getUserId().isBlank())
                .collect(Collectors.toMap(Customer::getUserId, customer -> customer, (left, right) -> left, LinkedHashMap::new));

        return threads.stream()
                .map(thread -> toThreadResponse(thread, customersByUserId.get(thread.getCustomerUserId()), usersById.get(thread.getCustomerUserId())))
                .toList();
    }

    @Transactional
    public SupportThreadResponse appendWorkspaceMessage(Authentication authentication, String threadId, SupportMessageRequest request) {
        User currentUser = requireAuthenticatedUser(authentication);
        assertWorkspaceUser(currentUser);

        SupportThread thread = supportThreadRepository.findById(threadId)
                .orElseThrow(() -> new ResourceNotFoundException("Khong tim thay cuoc tro chuyen ho tro."));
        LocalDateTime now = LocalDateTime.now();
        saveMessage(thread.getId(), "staff", currentUser.getId(), request.text(), now);
        thread.setUpdatedAt(now);
        supportThreadRepository.save(thread);

        User customerUser = userRepository.findById(thread.getCustomerUserId()).orElse(null);
        Customer customer = customerRepository.findFirstByUserId(thread.getCustomerUserId()).orElse(null);
        return toThreadResponse(thread, customer, customerUser);
    }

    @Transactional
    public SupportThreadResponse updateThreadStatus(Authentication authentication, String threadId, SupportThreadStatusRequest request) {
        User currentUser = requireAuthenticatedUser(authentication);
        assertWorkspaceUser(currentUser);

        String normalizedStatus = resolveStatus(request.status());
        if (normalizedStatus == null) {
            throw new BadRequestException("Trang thai ho tro khong hop le.");
        }

        SupportThread thread = supportThreadRepository.findById(threadId)
                .orElseThrow(() -> new ResourceNotFoundException("Khong tim thay cuoc tro chuyen ho tro."));
        thread.setStatus(normalizedStatus);
        thread.setUpdatedAt(LocalDateTime.now());
        supportThreadRepository.save(thread);

        User customerUser = userRepository.findById(thread.getCustomerUserId()).orElse(null);
        Customer customer = customerRepository.findFirstByUserId(thread.getCustomerUserId()).orElse(null);
        return toThreadResponse(thread, customer, customerUser);
    }

    private SupportThread createThread(User user) {
        LocalDateTime now = LocalDateTime.now().minusSeconds(1);

        SupportThread thread = new SupportThread();
        thread.setId("support-" + UUID.randomUUID());
        thread.setCustomerUserId(user.getId());
        thread.setStatus(CANONICAL_STATUS_OPEN);
        thread.setCreatedAt(now);
        thread.setUpdatedAt(now);
        supportThreadRepository.save(thread);

        saveMessage(
                thread.getId(),
                "staff",
                "",
                "Xin chào, Flare Fitness đã sẵn sàng hỗ trợ bạn. Hãy gửi nội dung cần tư vấn.",
                now
        );
        return thread;
    }

    private void saveMessage(String threadId, String senderType, String senderUserId, String text, LocalDateTime createdAt) {
        SupportMessage message = new SupportMessage();
        message.setId("message-" + UUID.randomUUID());
        message.setThreadId(threadId);
        message.setSenderType(senderType);
        message.setSenderUserId(senderUserId == null ? "" : senderUserId);
        message.setText(normalizeOutgoingSupportText(text));
        message.setCreatedAt(createdAt);
        supportMessageRepository.save(message);
    }

    private String resolveAutoReply(String text, LocalDateTime now) {
        if (!isBusinessHours(now.toLocalTime())) {
            return "Xin lỗi, hiện đã ngoài giờ làm việc của Flare Fitness (08:00 - 21:00 hằng ngày). Tin nhắn của bạn đã được ghi nhận và nhân viên sẽ phản hồi trong giờ làm việc gần nhất.";
        }

        String normalized = normalizeSupportText(text);
        if (normalized.matches(".*\\b(xin chao|chao|hello|hi|alo)\\b.*")) {
            return "Xin chào, Flare Fitness đã nhận được tin nhắn của bạn. Nhân viên tư vấn sẽ hỗ trợ bạn trong cuộc trò chuyện này.";
        }

        return "";
    }

    private String normalizeOutgoingSupportText(String text) {
        String value = String.valueOf(text == null ? "" : text).trim();
        if (value.contains("Flare Fitness") && value.contains("08:00")) {
            return "Xin l\u1ed7i, hi\u1ec7n \u0111\u00e3 ngo\u00e0i gi\u1edd l\u00e0m vi\u1ec7c c\u1ee7a Flare Fitness (08:00 - 21:00 h\u1eb1ng ng\u00e0y). Tin nh\u1eafn c\u1ee7a b\u1ea1n \u0111\u00e3 \u0111\u01b0\u1ee3c ghi nh\u1eadn v\u00e0 nh\u00e2n vi\u00ean s\u1ebd ph\u1ea3n h\u1ed3i trong gi\u1edd l\u00e0m vi\u1ec7c g\u1ea7n nh\u1ea5t.";
        }
        if (value.contains("Flare Fitness")) {
            return "Xin ch\u00e0o, Flare Fitness \u0111\u00e3 s\u1eb5n s\u00e0ng h\u1ed7 tr\u1ee3 b\u1ea1n. H\u00e3y g\u1eedi n\u1ed9i dung c\u1ea7n t\u01b0 v\u1ea5n.";
        }
        return value;
    }

    private boolean isBusinessHours(LocalTime now) {
        return !now.isBefore(WORK_START) && !now.isAfter(WORK_END);
    }

    private String normalizeText(String value) {
        return String.valueOf(value == null ? "" : value)
                .toLowerCase()
                .replace('đ', 'd')
                .replaceAll("[^\\p{L}\\p{N}\\s]", " ")
                .replaceAll("\\s+", " ")
                .trim();
    }

    private String normalizeSupportText(String value) {
        return Normalizer.normalize(String.valueOf(value == null ? "" : value), Normalizer.Form.NFD)
                .toLowerCase(Locale.ROOT)
                .replace('\u0111', 'd')
                .replace('\u0110', 'd')
                .replaceAll("\\p{M}+", "")
                .replaceAll("[^\\p{L}\\p{N}\\s]", " ")
                .replaceAll("\\s+", " ")
                .trim();
    }

    private String resolveStatus(String status) {
        String normalized = normalizeSupportText(status);
        if (normalized.isBlank()) {
            return null;
        }
        if (normalized.equals("dang mo") || normalized.equals("open")) {
            return CANONICAL_STATUS_OPEN;
        }
        if (normalized.equals("dang xu ly") || normalized.equals("dang xu li") || normalized.equals("processing")) {
            return CANONICAL_STATUS_PROCESSING;
        }
        if (normalized.equals("da dong") || normalized.equals("closed")) {
            return CANONICAL_STATUS_CLOSED;
        }

        String trimmed = String.valueOf(status == null ? "" : status).trim();
        return ALLOWED_STATUSES.contains(trimmed) ? trimmed : null;
    }

    private SupportThreadResponse toThreadResponse(SupportThread thread, Customer customer, User user) {
        List<SupportMessageResponse> messages = supportMessageRepository.findByThreadIdOrderByCreatedAtAsc(thread.getId()).stream()
                .map(message -> new SupportMessageResponse(
                        message.getId(),
                        message.getSenderType(),
                        message.getText(),
                        message.getCreatedAt()
                ))
                .toList();

        SupportCustomerResponse customerResponse = new SupportCustomerResponse(
                user != null ? user.getId() : thread.getCustomerUserId(),
                customer != null && customer.getTenKhach() != null && !customer.getTenKhach().isBlank()
                        ? customer.getTenKhach()
                        : (user != null ? user.getHoTen() : ""),
                user != null ? user.getUsername() : "",
                customer != null && customer.getEmail() != null && !customer.getEmail().isBlank()
                        ? customer.getEmail()
                        : (user != null ? user.getEmail() : ""),
                customer != null ? customer.getSdt() : ""
        );

        return new SupportThreadResponse(
                thread.getId(),
                thread.getCustomerUserId(),
                customerResponse,
                thread.getStatus(),
                thread.getCreatedAt(),
                thread.getUpdatedAt(),
                messages
        );
    }

    private User requireAuthenticatedUser(Authentication authentication) {
        if (authentication == null || !(authentication.getPrincipal() instanceof CurrentUserPrincipal principal)) {
            throw new UnauthorizedException("Ban can dang nhap de su dung tinh nang ho tro.");
        }

        return principal.getUser();
    }

    private void assertCustomerUser(User user) {
        if (CurrentUserPrincipal.toAuthority(user.getRole()).equals("ROLE_ADMIN")
                || CurrentUserPrincipal.toAuthority(user.getRole()).equals("ROLE_STAFF")) {
            throw new UnauthorizedException("Tai khoan nhan vien va quan tri vien khong su dung kenh ho tro khach hang.");
        }
    }

    private void assertWorkspaceUser(User user) {
        String authority = CurrentUserPrincipal.toAuthority(user.getRole());
        if (!authority.equals("ROLE_ADMIN") && !authority.equals("ROLE_STAFF")) {
            throw new UnauthorizedException("Ban khong co quyen xem ho tro khach hang.");
        }
    }
}
