package com.flarefitness.backend.dto.order;

import com.fasterxml.jackson.annotation.JsonAlias;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import java.math.BigDecimal;

public record OrderItemPayload(
        @JsonAlias("productId") @NotBlank String productId,
        String sku,
        String name,
        String image,
        String size,
        @JsonAlias("variantType") String variantType,
        @Min(1) Integer quantity,
        @JsonAlias("unitPrice") BigDecimal unitPrice,
        BigDecimal subtotal
) {
}
