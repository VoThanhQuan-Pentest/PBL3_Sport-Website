package com.flarefitness.backend.dto.order;

import com.fasterxml.jackson.annotation.JsonAlias;

public record OrderStatusUpdateRequest(
        String status,
        @JsonAlias({"paymentStatus", "payment_status"}) String paymentStatus,
        @JsonAlias({"supportRequest", "support_request"}) String supportRequest,
        @JsonAlias({"supportStatus", "support_status"}) String supportStatus,
        @JsonAlias({"supportNote", "support_note"}) String supportNote,
        @JsonAlias({"paymentConfirmedBy", "payment_confirmed_by"}) String paymentConfirmedBy,
        @JsonAlias({"paidAt", "paid_at"}) String paidAt
) {
}
