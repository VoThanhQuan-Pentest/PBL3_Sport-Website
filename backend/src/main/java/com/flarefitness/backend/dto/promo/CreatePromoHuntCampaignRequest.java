package com.flarefitness.backend.dto.promo;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

public record CreatePromoHuntCampaignRequest(
        @NotBlank String voucherCode,
        @NotNull @Min(1) Integer totalQuantity,
        @NotNull LocalDateTime startAt,
        @NotNull @Future LocalDateTime endAt,
        String status
) {
}
