package com.flarefitness.backend.dto.analytics;

import com.fasterxml.jackson.annotation.JsonAlias;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;
import java.util.Map;

public record TrackBehaviorEventRequest(
        @JsonAlias("session_id") @Size(max = 100) String sessionId,
        @JsonAlias("event_type") @NotNull BehaviorEventType eventType,
        @JsonAlias("page_type") BehaviorPageType pageType,
        @JsonAlias("page_key") @Size(max = 255) String pageKey,
        @JsonAlias("product_id") @Size(max = 64) String productId,
        @JsonAlias("order_id") @Size(max = 64) String orderId,
        @JsonAlias("category_key") @Size(max = 100) String categoryKey,
        @JsonAlias("brand_key") @Size(max = 100) String brandKey,
        @JsonAlias("search_keyword") @Size(max = 255) String searchKeyword,
        @JsonAlias("price_value") @DecimalMin("0.0") BigDecimal priceValue,
        @Min(0) Integer quantity,
        @JsonAlias("duration_seconds") @Min(0) Integer durationSeconds,
        Map<String, Object> metadata
) {
}
