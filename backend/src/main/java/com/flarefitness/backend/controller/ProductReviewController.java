package com.flarefitness.backend.controller;

import com.flarefitness.backend.dto.review.ProductReviewRequest;
import com.flarefitness.backend.dto.review.ProductReviewResponse;
import com.flarefitness.backend.dto.review.ProductReviewStatusRequest;
import com.flarefitness.backend.service.ProductReviewService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/reviews")
public class ProductReviewController {

    private final ProductReviewService productReviewService;

    public ProductReviewController(ProductReviewService productReviewService) {
        this.productReviewService = productReviewService;
    }

    @GetMapping("/products/{productId}")
    public List<ProductReviewResponse> getProductReviews(@PathVariable String productId) {
        return productReviewService.getVisibleReviewsByProduct(productId);
    }

    @GetMapping
    public List<ProductReviewResponse> getAllReviews() {
        return productReviewService.getAllReviews();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ProductReviewResponse createReview(
            @Valid @RequestBody ProductReviewRequest request,
            Authentication authentication
    ) {
        return productReviewService.createReview(request, authentication);
    }

    @PatchMapping("/{id}")
    public ProductReviewResponse updateReviewStatus(
            @PathVariable String id,
            @Valid @RequestBody ProductReviewStatusRequest request
    ) {
        return productReviewService.updateStatus(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteReview(@PathVariable String id) {
        productReviewService.deleteReview(id);
    }
}
