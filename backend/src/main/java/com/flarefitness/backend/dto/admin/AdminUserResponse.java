package com.flarefitness.backend.dto.admin;

public record AdminUserResponse(
        String id,
        String hoTen,
        String username,
        String role,
        String email,
        String sdt,
        String status,
        java.time.LocalDateTime createdAt
) {
}
