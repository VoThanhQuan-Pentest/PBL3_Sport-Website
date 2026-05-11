package com.flarefitness.backend.repository;

import com.flarefitness.backend.entity.Order;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, String> {

    List<Order> findAllByOrderByCreatedAtDesc();

    List<Order> findByUserIdOrderByCreatedAtDesc(String userId);

    List<Order> findByCustomerIdOrderByCreatedAtDesc(String customerId);

    Optional<Order> findByMaDon(String maDon);
}
