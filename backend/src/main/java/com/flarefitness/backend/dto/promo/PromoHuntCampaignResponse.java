package com.flarefitness.backend.dto.promo;

import java.time.LocalDateTime;

public record PromoHuntCampaignResponse(
        String id,
        String voucherCode,
        Integer totalQuantity,
        Long claimedCount,
        Long remaining,
        Boolean userClaimed,
        LocalDateTime startAt,
        LocalDateTime endAt,
        String status,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}
