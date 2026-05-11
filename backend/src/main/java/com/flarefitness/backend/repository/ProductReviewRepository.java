package com.flarefitness.backend.repository;

import com.flarefitness.backend.entity.ProductReview;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductReviewRepository extends JpaRepository<ProductReview, String> {

    List<ProductReview> findAllByOrderByCreatedAtDesc();

    List<ProductReview> findByProductIdOrderByCreatedAtDesc(String productId);

    List<ProductReview> findByProductIdAndStatusOrderByCreatedAtDesc(String productId, String status);
}
