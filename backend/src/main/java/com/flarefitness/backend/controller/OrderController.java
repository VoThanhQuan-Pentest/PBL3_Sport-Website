package com.flarefitness.backend.controller;

import com.flarefitness.backend.dto.order.OrderRequest;
import com.flarefitness.backend.dto.order.OrderResponse;
import com.flarefitness.backend.dto.order.OrderStatusUpdateRequest;
import com.flarefitness.backend.service.OrderService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping
    public List<OrderResponse> getAllOrders() {
        return orderService.getAllOrders();
    }

    @GetMapping("/me")
    public List<OrderResponse> getCurrentCustomerOrders(Authentication authentication) {
        return orderService.getCurrentCustomerOrders(authentication);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public OrderResponse createOrder(Authentication authentication, @Valid @RequestBody OrderRequest request) {
        return orderService.createOrder(authentication, request);
    }

    @PatchMapping("/{orderId}")
    public OrderResponse updateOrder(
            @PathVariable String orderId,
            @RequestBody OrderStatusUpdateRequest request,
            Authentication authentication
    ) {
        return orderService.updateOrder(orderId, request, authentication);
    }
}
