package com.flarefitness.backend.service;

import com.flarefitness.backend.dto.admin.AdminUserRequest;
import com.flarefitness.backend.dto.admin.AdminUserResponse;
import com.flarefitness.backend.entity.Customer;
import com.flarefitness.backend.entity.User;
import com.flarefitness.backend.exception.BadRequestException;
import com.flarefitness.backend.exception.ResourceNotFoundException;
import com.flarefitness.backend.repository.CustomerRepository;
import com.flarefitness.backend.repository.UserRepository;
import com.flarefitness.backend.security.CurrentUserPrincipal;
import java.time.LocalDateTime;
import java.util.Locale;
import java.util.Optional;
import java.util.UUID;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AdminService {

    private static final String ROLE_ADMIN = "Quan tri vien";
    private static final String ROLE_STAFF = "Nhan vien";
    private static final String ROLE_CUSTOMER = "Khach hang";
    private static final String STATUS_ACTIVE = "Hoat dong";
    private static final String STATUS_DELETED = "Da xoa";

    private final UserRepository userRepository;
    private final CustomerRepository customerRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminService(
            UserRepository userRepository,
            CustomerRepository customerRepository,
            PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.customerRepository = customerRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional(readOnly = true)
    public java.util.List<AdminUserResponse> getAllUsers() {
        return userRepository.findByDeletedFalseOrderByHoTenAsc()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional
    public AdminUserResponse createUser(AdminUserRequest request) {
        String username = requireText(request.username(), "Username la bat buoc.");
        String hoTen = requireText(request.hoTen(), "Ho ten la bat buoc.");
        String email = trimToNull(request.email());
        String role = normalizeRole(request.role());
        String status = normalizeStatus(request.status());

        if (userRepository.existsByUsernameIgnoreCase(username)) {
            throw new BadRequestException("Username da ton tai.");
        }
        if (email != null && userRepository.existsByEmailIgnoreCase(email)) {
            throw new BadRequestException("Email da duoc su dung.");
        }

        User user = new User();
        user.setId(generateUserId(role));
        user.setUsername(username);
        user.setPassword(passwordEncoder.encode(trimToNull(request.password()) == null ? username : request.password().trim()));
        user.setRole(role);
        user.setHoTen(hoTen);
        user.setEmail(email);
        user.setStatus(status);
        user.setDeleted(false);
        user.setCreatedAt(LocalDateTime.now());
        userRepository.save(user);
        syncCustomerRecord(user, request.sdt());
        return toResponse(user);
    }

    @Transactional
    public AdminUserResponse updateUser(String id, AdminUserRequest request, Authentication authentication) {
        User user = userRepository.findActiveById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Khong tim thay tai khoan."));
        String currentAdminId = currentAdmin(authentication).getId();

        String username = requireText(request.username(), "Username la bat buoc.");
        String hoTen = requireText(request.hoTen(), "Ho ten la bat buoc.");
        String email = trimToNull(request.email());
        String role = normalizeRole(request.role());
        String status = normalizeStatus(request.status());

        if (userRepository.existsByUsernameIgnoreCaseAndIdNot(username, user.getId())) {
            throw new BadRequestException("Username da ton tai.");
        }
        if (email != null && userRepository.existsByEmailIgnoreCaseAndIdNot(email, user.getId())) {
            throw new BadRequestException("Email da duoc su dung.");
        }
        if (user.getId().equals(currentAdminId)
                && (!ROLE_ADMIN.equals(role) || isInactiveStatus(status))) {
            throw new BadRequestException("Khong duoc tu ha quyen hoac khoa tai khoan dang dang nhap.");
        }

        user.setUsername(username);
        user.setRole(role);
        user.setHoTen(hoTen);
        user.setEmail(email);
        user.setStatus(status);
        String rawPassword = trimToNull(request.password());
        if (rawPassword != null) {
            user.setPassword(passwordEncoder.encode(rawPassword));
        }

        userRepository.save(user);
        syncCustomerRecord(user, request.sdt());
        return toResponse(user);
    }

    @Transactional
    public void deleteUser(String id, Authentication authentication) {
        User user = userRepository.findActiveById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Khong tim thay tai khoan."));
        if (user.getId().equals(currentAdmin(authentication).getId())) {
            throw new BadRequestException("Khong duoc xoa tai khoan dang dang nhap.");
        }

        String deletedSuffix = "__deleted__" + System.currentTimeMillis();
        user.setUsername(truncate(user.getUsername() + deletedSuffix, 100));
        if (user.getEmail() != null && !user.getEmail().isBlank()) {
            user.setEmail(truncate(user.getEmail() + deletedSuffix, 150));
        }
        user.setStatus(STATUS_DELETED);
        user.setDeleted(true);
        userRepository.save(user);
    }

    private AdminUserResponse toResponse(User user) {
        Optional<Customer> customer = Optional.empty();
        customer = customerRepository.findFirstByUserId(user.getId());
        if (customer.isEmpty() && user.getEmail() != null && !user.getEmail().isBlank()) {
            customer = customerRepository.findFirstByEmailIgnoreCase(user.getEmail());
        }
        if (customer.isEmpty() && user.getHoTen() != null && !user.getHoTen().isBlank()) {
            customer = customerRepository.findFirstByTenKhachIgnoreCase(user.getHoTen());
        }

        return new AdminUserResponse(
                user.getId(),
                user.getHoTen(),
                user.getUsername(),
                user.getRole(),
                user.getEmail(),
                customer.map(Customer::getSdt).orElse(null),
                user.getStatus(),
                user.getCreatedAt()
        );
    }

    private void syncCustomerRecord(User user, String phoneNumber) {
        if (!ROLE_CUSTOMER.equals(normalizeRole(user.getRole()))) {
            return;
        }
        Customer customer = customerRepository.findFirstByUserId(user.getId())
                .or(() -> user.getEmail() == null ? Optional.empty() : customerRepository.findFirstByEmailIgnoreCase(user.getEmail()))
                .orElseGet(() -> {
                    Customer nextCustomer = new Customer();
                    nextCustomer.setId("customer-" + UUID.randomUUID());
                    nextCustomer.setCreatedAt(LocalDateTime.now());
                    return nextCustomer;
                });
        customer.setUserId(user.getId());
        customer.setTenKhach(user.getHoTen());
        customer.setEmail(user.getEmail());
        customer.setSdt(trimToNull(phoneNumber) == null ? defaultPhone(customer.getSdt()) : phoneNumber.trim());
        customer.setKenh(customer.getKenh() == null || customer.getKenh().isBlank() ? "Website" : customer.getKenh());
        customer.setNhan(customer.getNhan() == null || customer.getNhan().isBlank() ? "Moi" : customer.getNhan());
        customerRepository.save(customer);
    }

    private User currentAdmin(Authentication authentication) {
        if (authentication == null || !(authentication.getPrincipal() instanceof CurrentUserPrincipal principal)) {
            throw new BadRequestException("Phien dang nhap khong hop le.");
        }
        return principal.getUser();
    }

    private String generateUserId(String role) {
        String prefix = getUserIdPrefix(role);
        int nextNumber = userRepository.findIdsByPrefix(prefix)
                .stream()
                .mapToInt(id -> extractSequentialNumber(id, prefix))
                .max()
                .orElse(0) + 1;

        String candidate = prefix + String.format("%03d", nextNumber);
        while (userRepository.existsById(candidate)) {
            nextNumber += 1;
            candidate = prefix + String.format("%03d", nextNumber);
        }
        return candidate;
    }

    private String getUserIdPrefix(String role) {
        return switch (normalizeRole(role)) {
            case ROLE_ADMIN -> "user-admin-";
            case ROLE_STAFF -> "user-staff-";
            default -> "user-customer-";
        };
    }

    private int extractSequentialNumber(String value, String prefix) {
        if (value == null || !value.startsWith(prefix)) {
            return 0;
        }
        try {
            return Integer.parseInt(value.substring(prefix.length()));
        } catch (NumberFormatException exception) {
            return 0;
        }
    }

    private String normalizeRole(String role) {
        String normalized = normalize(role);
        if (normalized.contains("quan tri") || normalized.contains("admin")) {
            return ROLE_ADMIN;
        }
        if (normalized.contains("nhan vien") || normalized.contains("staff")) {
            return ROLE_STAFF;
        }
        return ROLE_CUSTOMER;
    }

    private String normalizeStatus(String status) {
        String normalized = normalize(status);
        if (normalized.contains("ngung") || normalized.contains("khoa") || normalized.contains("inactive")) {
            return "Ngung hoat dong";
        }
        return STATUS_ACTIVE;
    }

    private boolean isInactiveStatus(String status) {
        return !"Hoat dong".equals(normalizeStatus(status));
    }

    private String normalize(String value) {
        return String.valueOf(value == null ? "" : value)
                .toLowerCase(Locale.ROOT)
                .replace('đ', 'd')
                .replace('Đ', 'd')
                .replaceAll("\\p{M}+", "")
                .replaceAll("[^a-z0-9]+", " ")
                .replaceAll("\\s+", " ")
                .trim();
    }

    private String requireText(String value, String message) {
        String trimmed = trimToNull(value);
        if (trimmed == null) {
            throw new BadRequestException(message);
        }
        return trimmed;
    }

    private String trimToNull(String value) {
        if (value == null) {
            return null;
        }
        String trimmed = value.trim();
        return trimmed.isBlank() ? null : trimmed;
    }

    private String defaultPhone(String value) {
        return trimToNull(value) == null ? "0000000000" : value.trim();
    }

    private String truncate(String value, int maxLength) {
        if (value == null || value.length() <= maxLength) {
            return value;
        }
        return value.substring(0, maxLength);
    }
}
