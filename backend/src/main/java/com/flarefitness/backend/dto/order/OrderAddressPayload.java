package com.flarefitness.backend.dto.order;

public record OrderAddressPayload(
        String id,
        String recipient,
        String phone,
        String detail,
        String street,
        String ward,
        String district,
        String province,
        String text
) {
}
