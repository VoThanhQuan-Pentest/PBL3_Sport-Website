package com.flarefitness.backend.dto.review;

import com.fasterxml.jackson.annotation.JsonAlias;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record ProductReviewRequest(
        @JsonAlias({"product_id", "productId"})
        @NotBlank(message = "San pham khong duoc de trong.")
        String productId,

        @NotNull(message = "Diem danh gia khong duoc de trong.")
        @Min(value = 1, message = "Diem danh gia toi thieu la 1.")
        @Max(value = 5, message = "Diem danh gia toi da la 5.")
        Integer rating,

        @NotBlank(message = "Noi dung danh gia khong duoc de trong.")
        @Size(min = 8, max = 1000, message = "Noi dung danh gia phai tu 8 den 1000 ky tu.")
        String content
) {
}
