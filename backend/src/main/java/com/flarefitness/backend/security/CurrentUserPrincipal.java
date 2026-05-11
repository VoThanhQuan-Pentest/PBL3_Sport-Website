package com.flarefitness.backend.security;

import com.flarefitness.backend.entity.User;
import java.text.Normalizer;
import java.util.Collection;
import java.util.List;
import java.util.Locale;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class CurrentUserPrincipal implements UserDetails {

    private final User user;

    public CurrentUserPrincipal(User user) {
        this.user = user;
    }

    public User getUser() {
        return user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(toAuthority(user.getRole())));
    }

    @Override
    public String getPassword() {
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        return user.getUsername();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        if (Boolean.TRUE.equals(user.getDeleted())) {
            return false;
        }
        String status = normalizeRole(user.getStatus());
        return !status.contains("ngung")
                && !status.contains("khoa")
                && !status.contains("inactive")
                && !status.contains("disabled")
                && !status.contains("tam dung");
    }

    public static String toAuthority(String role) {
        if (role == null) {
            return "ROLE_CUSTOMER";
        }

        String normalizedRole = normalizeRole(role);
        if ("qu n tr vi n".equals(normalizedRole) || "admin".equals(normalizedRole)) {
            return "ROLE_ADMIN";
        }
        if ("nh n vi n".equals(normalizedRole) || "staff".equals(normalizedRole)) {
            return "ROLE_STAFF";
        }

        return switch (normalizedRole) {
            case "quan tri vien", "quan tri" -> "ROLE_ADMIN";
            case "nhan vien", "nhanvien" -> "ROLE_STAFF";
            case "quản trị viên", "admin" -> "ROLE_ADMIN";
            case "nhân viên", "staff" -> "ROLE_STAFF";
            default -> "ROLE_CUSTOMER";
        };
    }
    private static String normalizeRole(String role) {
        String normalized = Normalizer.normalize(role, Normalizer.Form.NFD)
                .replaceAll("\\p{M}+", "")
                .toLowerCase(Locale.ROOT)
                .replace('đ', 'd')
                .replace('Đ', 'd')
                .replace('?', ' ')
                .replaceAll("[^a-z\\s]", " ")
                .replaceAll("\\s+", " ")
                .trim();

        return normalized.isBlank() ? "customer" : normalized;
    }
}
