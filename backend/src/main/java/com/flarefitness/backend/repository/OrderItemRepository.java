package com.flarefitness.backend.repository;

import com.flarefitness.backend.entity.OrderItem;
import java.util.Collection;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, String> {

    List<OrderItem> findByOrderIdIn(Collection<String> orderIds);

    List<OrderItem> findByOrderId(String orderId);

    void deleteByOrderId(String orderId);
}
