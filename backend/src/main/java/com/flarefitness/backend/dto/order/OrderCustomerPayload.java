package com.flarefitness.backend.dto.order;

public record OrderCustomerPayload(
        String id,
        String name,
        String username,
        String email,
        String phone
) {
}
