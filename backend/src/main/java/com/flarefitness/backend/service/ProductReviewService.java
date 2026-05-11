package com.flarefitness.backend.service;

import com.flarefitness.backend.dto.review.ProductReviewRequest;
import com.flarefitness.backend.dto.review.ProductReviewResponse;
import com.flarefitness.backend.dto.review.ProductReviewStatusRequest;
import com.flarefitness.backend.entity.Order;
import com.flarefitness.backend.entity.OrderItem;
import com.flarefitness.backend.entity.ProductReview;
import com.flarefitness.backend.entity.User;
import com.flarefitness.backend.exception.BadRequestException;
import com.flarefitness.backend.exception.ResourceNotFoundException;
import com.flarefitness.backend.exception.UnauthorizedException;
import com.flarefitness.backend.repository.OrderItemRepository;
import com.flarefitness.backend.repository.OrderRepository;
import com.flarefitness.backend.repository.ProductRepository;
import com.flarefitness.backend.repository.ProductReviewRepository;
import com.flarefitness.backend.security.CurrentUserPrincipal;
import java.text.Normalizer;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Locale;
import java.util.UUID;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ProductReviewService {

    private static final String STATUS_VISIBLE = "Hi\u1ec3n th\u1ecb";
    private static final String STATUS_HIDDEN = "\u1ea8n";

    private final ProductReviewRepository productReviewRepository;
    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;

    public ProductReviewService(
            ProductReviewRepository productReviewRepository,
            ProductRepository productRepository,
            OrderRepository orderRepository,
            OrderItemRepository orderItemRepository
    ) {
        this.productReviewRepository = productReviewRepository;
        this.productRepository = productRepository;
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
    }

    @Transactional(readOnly = true)
    public List<ProductReviewResponse> getVisibleReviewsByProduct(String productId) {
        productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Khong tim thay san pham."));
        return productReviewRepository.findByProductIdAndStatusOrderByCreatedAtDesc(productId, STATUS_VISIBLE)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<ProductReviewResponse> getAllReviews() {
        return productReviewRepository.findAllByOrderByCreatedAtDesc()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional
    public ProductReviewResponse createReview(ProductReviewRequest request, Authentication authentication) {
        User user = requireCustomer(authentication);
        productRepository.findById(request.productId())
                .orElseThrow(() -> new ResourceNotFoundException("Khong tim thay san pham."));

        if (!hasDeliveredOrderForProduct(user, request.productId())) {
            throw new BadRequestException("Chi co the danh gia san pham trong don hang da giao.");
        }

        ProductReview review = new ProductReview();
        review.setId("review-" + UUID.randomUUID());
        review.setProductId(request.productId());
        review.setUserId(user.getId());
        review.setReviewerName(firstNonBlank(user.getHoTen(), user.getUsername(), "Khach hang"));
        review.setRating(Math.min(5, Math.max(1, request.rating())));
        review.setContent(request.content().trim());
        review.setStatus(STATUS_VISIBLE);
        review.setCreatedAt(LocalDateTime.now());

        return toResponse(productReviewRepository.save(review));
    }

    @Transactional
    public ProductReviewResponse updateStatus(String id, ProductReviewStatusRequest request) {
        ProductReview review = productReviewRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Khong tim thay danh gia."));
        review.setStatus(resolveStatus(request.status()));
        return toResponse(productReviewRepository.save(review));
    }

    @Transactional
    public void deleteReview(String id) {
        if (!productReviewRepository.existsById(id)) {
            throw new ResourceNotFoundException("Khong tim thay danh gia.");
        }
        productReviewRepository.deleteById(id);
    }

    private boolean hasDeliveredOrderForProduct(User user, String productId) {
        List<String> deliveredOrderIds = orderRepository.findByUserIdOrderByCreatedAtDesc(user.getId())
                .stream()
                .filter(order -> isDeliveredStatus(order.getTrangThaiDon()))
                .map(Order::getId)
                .toList();
        if (deliveredOrderIds.isEmpty()) {
            return false;
        }
        return orderItemRepository.findByOrderIdIn(deliveredOrderIds)
                .stream()
                .map(OrderItem::getProductId)
                .anyMatch(itemProductId -> String.valueOf(itemProductId).equals(String.valueOf(productId)));
    }

    private boolean isDeliveredStatus(String status) {
        String normalized = normalize(status);
        return normalized.contains("da giao") || normalized.contains("delivered");
    }

    private String resolveStatus(String status) {
        String normalized = normalize(status);
        if (normalized.contains("an") || normalized.contains("hidden")) {
            return STATUS_HIDDEN;
        }
        if (normalized.contains("hien thi") || normalized.contains("visible") || normalized.contains("active")) {
            return STATUS_VISIBLE;
        }
        throw new BadRequestException("Trang thai danh gia khong hop le.");
    }

    private ProductReviewResponse toResponse(ProductReview review) {
        return new ProductReviewResponse(
                review.getId(),
                review.getProductId(),
                review.getUserId(),
                review.getReviewerName(),
                review.getRating(),
                review.getContent(),
                review.getStatus(),
                review.getCreatedAt()
        );
    }

    private User requireCustomer(Authentication authentication) {
        if (authentication == null || !(authentication.getPrincipal() instanceof CurrentUserPrincipal principal)) {
            throw new UnauthorizedException("Phien dang nhap khong hop le.");
        }

        User user = principal.getUser();
        String authority = CurrentUserPrincipal.toAuthority(user.getRole());
        if ("ROLE_ADMIN".equals(authority) || "ROLE_STAFF".equals(authority)) {
            throw new UnauthorizedException("Chuc nang danh gia chi danh cho khach hang.");
        }
        return user;
    }

    private String firstNonBlank(String... values) {
        for (String value : values) {
            if (value != null && !value.isBlank()) {
                return value.trim();
            }
        }
        return "Khach hang";
    }

    private String normalize(String value) {
        return Normalizer.normalize(String.valueOf(value == null ? "" : value), Normalizer.Form.NFD)
                .replaceAll("\\p{M}+", "")
                .toLowerCase(Locale.ROOT)
                .replace('\u0111', 'd')
                .replace('\u0110', 'd')
                .replaceAll("[^a-z0-9\\s-]", " ")
                .replaceAll("\\s+", " ")
                .trim();
    }
}
