package com.flarefitness.backend.service;

import com.flarefitness.backend.dto.auth.CurrentUserResponse;
import com.flarefitness.backend.dto.auth.ForgotPasswordRequest;
import com.flarefitness.backend.dto.auth.LoginRequest;
import com.flarefitness.backend.dto.auth.LoginResponse;
import com.flarefitness.backend.dto.auth.OtpRequest;
import com.flarefitness.backend.dto.auth.RegisterRequest;
import com.flarefitness.backend.entity.Customer;
import com.flarefitness.backend.entity.User;
import com.flarefitness.backend.exception.BadRequestException;
import com.flarefitness.backend.exception.UnauthorizedException;
import com.flarefitness.backend.repository.CustomerRepository;
import com.flarefitness.backend.repository.UserRepository;
import com.flarefitness.backend.security.CurrentUserPrincipal;
import com.flarefitness.backend.security.IpRateLimitService;
import com.flarefitness.backend.security.JwtTokenService;
import com.flarefitness.backend.security.RedisTokenStore;
import java.time.LocalDateTime;
import java.util.Locale;
import java.util.Optional;
import java.util.UUID;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private static final String CUSTOMER_ROLE = "Khach hang";

    private final UserRepository userRepository;
    private final CustomerRepository customerRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenService jwtTokenService;
    private final RedisTokenStore redisTokenStore;
    private final IpRateLimitService ipRateLimitService;
    private final EmailOtpService emailOtpService;

    public AuthService(
            UserRepository userRepository,
            CustomerRepository customerRepository,
            PasswordEncoder passwordEncoder,
            JwtTokenService jwtTokenService,
            RedisTokenStore redisTokenStore,
            IpRateLimitService ipRateLimitService,
            EmailOtpService emailOtpService
    ) {
        this.userRepository = userRepository;
        this.customerRepository = customerRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenService = jwtTokenService;
        this.redisTokenStore = redisTokenStore;
        this.ipRateLimitService = ipRateLimitService;
        this.emailOtpService = emailOtpService;
    }

    public LoginResponse login(LoginRequest request, String ipAddress) {
        ipRateLimitService.assertNotBlocked(ipAddress);

        User user = userRepository.findByUsernameIgnoreCase(request.username())
                .orElseThrow(() -> invalidCredentials(ipAddress));

        if (!passwordMatches(request.password(), user)) {
            throw invalidCredentials(ipAddress);
        }

        ipRateLimitService.reset(ipAddress);
        return issueLoginResponse(user);
    }

    @Transactional
    public LoginResponse register(RegisterRequest request) {
        validateRegisterRequest(request);
        emailOtpService.verifyOtp(EmailOtpService.PURPOSE_REGISTER, request.email(), request.otpCode());

        User user = new User();
        user.setId(generateUserId(CUSTOMER_ROLE));
        user.setUsername(request.username().trim());
        user.setPassword(passwordEncoder.encode(request.password()));
        user.setRole(CUSTOMER_ROLE);
        user.setHoTen(request.hoTen().trim());
        user.setEmail(request.email().trim());
        user.setStatus("Hoat dong");
        user.setDeleted(false);
        user.setCreatedAt(LocalDateTime.now());

        userRepository.save(user);

        Customer customer = findOrCreateCustomerForUser(user, request.sdt());
        customer.setUserId(user.getId());
        customer.setTenKhach(user.getHoTen());
        customer.setEmail(user.getEmail());
        customer.setSdt(request.sdt().trim());
        customer.setKenh(isBlank(customer.getKenh()) ? "Website" : customer.getKenh());
        customer.setNhan(isBlank(customer.getNhan()) ? "Moi" : customer.getNhan());
        if (customer.getCreatedAt() == null) {
            customer.setCreatedAt(LocalDateTime.now());
        }

        customerRepository.save(customer);
        return issueLoginResponse(user);
    }

    @Transactional
    public void forgotPassword(ForgotPasswordRequest request) {
        if (!request.newPassword().equals(request.confirmPassword())) {
            throw new BadRequestException("Xac nhan mat khau khong khop.");
        }

        User user = userRepository.findByUsernameIgnoreCase(request.username())
                .orElseThrow(() -> new BadRequestException("Thong tin khoi phuc khong dung."));

        String requestEmail = request.email().trim();
        if (isBlank(user.getEmail()) || !user.getEmail().trim().equalsIgnoreCase(requestEmail)) {
            throw new BadRequestException("Thong tin khoi phuc khong dung.");
        }

        emailOtpService.verifyOtp(EmailOtpService.PURPOSE_FORGOT_PASSWORD, requestEmail, request.otpCode());
        user.setPassword(passwordEncoder.encode(request.newPassword()));
        userRepository.save(user);
    }

    public void sendRegisterOtp(OtpRequest request) {
        String email = request.email().trim();
        String username = request.username() == null ? "" : request.username().trim();
        if (!username.isBlank() && userRepository.existsByUsernameIgnoreCase(username)) {
            throw new BadRequestException("Ten dang nhap da ton tai.");
        }
        if (userRepository.existsByEmailIgnoreCase(email)) {
            throw new BadRequestException("Email da duoc su dung.");
        }
        emailOtpService.sendOtp(EmailOtpService.PURPOSE_REGISTER, email);
    }

    public void sendForgotPasswordOtp(OtpRequest request) {
        String username = request.username() == null ? "" : request.username().trim();
        String email = request.email().trim();
        if (username.isBlank()) {
            throw new BadRequestException("Ten dang nhap la bat buoc.");
        }

        User user = userRepository.findByUsernameIgnoreCase(username)
                .orElseThrow(() -> new BadRequestException("Thong tin khoi phuc khong dung."));

        if (isBlank(user.getEmail()) || !user.getEmail().trim().equalsIgnoreCase(email)) {
            throw new BadRequestException("Thong tin khoi phuc khong dung.");
        }

        emailOtpService.sendOtp(EmailOtpService.PURPOSE_FORGOT_PASSWORD, email);
    }

    public CurrentUserResponse getCurrentUser(String username) {
        User user = userRepository.findByUsernameIgnoreCase(username)
                .orElseThrow(() -> new UnauthorizedException("Phien dang nhap khong hop le."));
        return toCurrentUserResponse(user);
    }

    public void logout(String token) {
        redisTokenStore.revoke(token);
    }

    public CurrentUserResponse toCurrentUserResponse(User user) {
        Optional<Customer> customer = findLinkedCustomer(user);
        return new CurrentUserResponse(
                user.getId(),
                user.getUsername(),
                user.getRole(),
                user.getHoTen(),
                user.getEmail(),
                customer.map(Customer::getSdt).orElse(null)
        );
    }

    public Optional<Customer> findLinkedCustomer(User user) {
        Optional<Customer> byUserId = customerRepository.findFirstByUserId(user.getId());
        if (byUserId.isPresent()) {
            return byUserId;
        }

        if (!isBlank(user.getEmail())) {
            Optional<Customer> byEmail = customerRepository.findFirstByEmailIgnoreCase(user.getEmail());
            if (byEmail.isPresent()) {
                return byEmail;
            }
        }

        if (!isBlank(user.getHoTen())) {
            return customerRepository.findFirstByTenKhachIgnoreCase(user.getHoTen());
        }

        return Optional.empty();
    }

    private UnauthorizedException invalidCredentials(String ipAddress) {
        ipRateLimitService.recordFailedAttempt(ipAddress);
        return new UnauthorizedException("Sai ten dang nhap hoac mat khau.");
    }

    private boolean passwordMatches(String rawPassword, User user) {
        String storedPassword = user.getPassword();
        if (storedPassword == null || storedPassword.isBlank()) {
            return false;
        }

        // Development/test convenience: allow every existing account to be reset by logging in with password=username.
        if (rawPassword != null && rawPassword.equals(user.getUsername())) {
            user.setPassword(passwordEncoder.encode(rawPassword));
            userRepository.save(user);
            return true;
        }

        if (storedPassword.startsWith("$2a$")
                || storedPassword.startsWith("$2b$")
                || storedPassword.startsWith("$2y$")) {
            if (passwordEncoder.matches(rawPassword, storedPassword)) {
                return true;
            }

            return false;
        }

        boolean matchesLegacyPlainText = storedPassword.equals(rawPassword);
        if (matchesLegacyPlainText) {
            user.setPassword(passwordEncoder.encode(rawPassword));
            userRepository.save(user);
        }
        return matchesLegacyPlainText;
    }

    private LoginResponse issueLoginResponse(User user) {
        CurrentUserPrincipal principal = new CurrentUserPrincipal(user);
        String token = jwtTokenService.generateToken(principal);
        redisTokenStore.save(token, user.getUsername(), jwtTokenService.getExpirationSeconds());
        return new LoginResponse(token, jwtTokenService.getExpirationSeconds(), toCurrentUserResponse(user));
    }

    private void validateRegisterRequest(RegisterRequest request) {
        if (!request.password().equals(request.confirmPassword())) {
            throw new BadRequestException("Xac nhan mat khau khong khop.");
        }

        if (userRepository.existsByUsernameIgnoreCase(request.username().trim())) {
            throw new BadRequestException("Ten dang nhap da ton tai.");
        }

        if (userRepository.existsByEmailIgnoreCase(request.email().trim())) {
            throw new BadRequestException("Email da duoc su dung.");
        }
    }

    private Customer findOrCreateCustomerForUser(User user, String phoneNumber) {
        Optional<Customer> existingCustomer = customerRepository.findFirstByUserId(user.getId());
        if (existingCustomer.isPresent()) {
            return existingCustomer.get();
        }

        if (!isBlank(user.getEmail())) {
            Optional<Customer> byEmail = customerRepository.findFirstByEmailIgnoreCase(user.getEmail());
            if (byEmail.isPresent()) {
                return byEmail.get();
            }
        }

        if (!isBlank(phoneNumber)) {
            Optional<Customer> byPhone = customerRepository.findFirstBySdt(phoneNumber.trim());
            if (byPhone.isPresent()) {
                return byPhone.get();
            }
        }

        Customer customer = new Customer();
        customer.setId(UUID.randomUUID().toString());
        customer.setCreatedAt(LocalDateTime.now());
        return customer;
    }

    private String generateUserId(String role) {
        String prefix = getUserIdPrefix(role);
        int nextNumber = userRepository.findAll()
                .stream()
                .map(User::getId)
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
        String normalizedRole = role == null ? "" : role.trim().toLowerCase(Locale.ROOT);
        if (normalizedRole.contains("quan") || normalizedRole.contains("admin")) {
            return "user-admin-";
        }
        if (normalizedRole.contains("nhan") || normalizedRole.contains("staff")) {
            return "user-staff-";
        }
        return "user-customer-";
    }

    private int extractSequentialNumber(String value, String prefix) {
        if (value == null) {
            return 0;
        }

        String trimmedValue = value.trim();
        if (!trimmedValue.startsWith(prefix)) {
            return 0;
        }

        String suffix = trimmedValue.substring(prefix.length());
        try {
            return Integer.parseInt(suffix);
        } catch (NumberFormatException exception) {
            return 0;
        }
    }

    private boolean isBlank(String value) {
        return value == null || value.isBlank();
    }
}
