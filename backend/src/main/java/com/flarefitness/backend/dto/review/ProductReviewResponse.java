package com.flarefitness.backend.dto.review;

import java.time.LocalDateTime;

public record ProductReviewResponse(
        String id,
        String productId,
        String userId,
        String reviewer,
        Integer rating,
        String content,
        String status,
        LocalDateTime createdAt
) {
}
