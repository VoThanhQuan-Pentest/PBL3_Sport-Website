package com.flarefitness.backend.dto.order;

import com.fasterxml.jackson.annotation.JsonAlias;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import java.math.BigDecimal;
import java.util.List;

public record OrderRequest(
        String id,
        String code,
        @JsonAlias("createdAt") String createdAt,
        BigDecimal subtotal,
        BigDecimal shipping,
        BigDecimal discount,
        BigDecimal total,
        @JsonAlias("voucherCode") String voucherCode,
        @JsonAlias("voucherLabel") String voucherLabel,
        @Valid OrderAddressPayload address,
        @NotEmpty List<@Valid OrderItemPayload> items
) {
}
