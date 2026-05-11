package com.flarefitness.backend.dto.order;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public record OrderResponse(
        String id,
        String code,
        LocalDateTime createdAt,
        String status,
        String paymentStatus,
        String paidAt,
        String paymentConfirmedBy,
        String supportRequest,
        String supportStatus,
        String supportNote,
        Integer totalItems,
        BigDecimal subtotal,
        BigDecimal shipping,
        BigDecimal discount,
        BigDecimal total,
        String voucherCode,
        String voucherLabel,
        OrderAddressPayload address,
        OrderCustomerPayload customer,
        String accountKey,
        List<String> accountKeyAliases,
        List<OrderItemPayload> items
) {
}
