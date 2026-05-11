package com.flarefitness.backend.dto.review;

import jakarta.validation.constraints.NotBlank;

public record ProductReviewStatusRequest(
        @NotBlank(message = "Trang thai khong duoc de trong.")
        String status
) {
}
