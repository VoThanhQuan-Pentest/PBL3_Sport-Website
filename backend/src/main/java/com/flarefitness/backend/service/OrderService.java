package com.flarefitness.backend.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.flarefitness.backend.dto.order.OrderAddressPayload;
import com.flarefitness.backend.dto.order.OrderCustomerPayload;
import com.flarefitness.backend.dto.order.OrderItemPayload;
import com.flarefitness.backend.dto.order.OrderRequest;
import com.flarefitness.backend.dto.order.OrderResponse;
import com.flarefitness.backend.dto.order.OrderStatusUpdateRequest;
import com.flarefitness.backend.entity.Customer;
import com.flarefitness.backend.entity.Order;
import com.flarefitness.backend.entity.OrderItem;
import com.flarefitness.backend.entity.Product;
import com.flarefitness.backend.entity.User;
import com.flarefitness.backend.exception.BadRequestException;
import com.flarefitness.backend.exception.ResourceNotFoundException;
import com.flarefitness.backend.exception.UnauthorizedException;
import com.flarefitness.backend.repository.CustomerRepository;
import com.flarefitness.backend.repository.OrderItemRepository;
import com.flarefitness.backend.repository.OrderRepository;
import com.flarefitness.backend.repository.ProductRepository;
import com.flarefitness.backend.security.CurrentUserPrincipal;
import java.math.BigDecimal;
import java.text.Normalizer;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class OrderService {

    private static final String STATUS_PENDING = "Ch\u1edd x\u00e1c nh\u1eadn";
    private static final String PAYMENT_PENDING_COD = "Ch\u1edd kh\u00e1ch tr\u1ea3 ti\u1ec1n khi nh\u1eadn h\u00e0ng";
    private static final String PAYMENT_WAITING_CONFIRMATION = "Ch\u1edd nh\u00e2n vi\u00ean x\u00e1c nh\u1eadn thu ti\u1ec1n";
    private static final String PAYMENT_PAID = "Thanh to\u00e1n th\u00e0nh c\u00f4ng";
    private static final String PAYMENT_CANCELLED = "Kh\u00f4ng ghi nh\u1eadn thanh to\u00e1n";

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final CustomerRepository customerRepository;
    private final ProductRepository productRepository;
    private final ObjectMapper objectMapper;

    public OrderService(
            OrderRepository orderRepository,
            OrderItemRepository orderItemRepository,
            CustomerRepository customerRepository,
            ProductRepository productRepository,
            ObjectMapper objectMapper
    ) {
        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.customerRepository = customerRepository;
        this.productRepository = productRepository;
        this.objectMapper = objectMapper;
    }

    @Transactional(readOnly = true)
    public List<OrderResponse> getAllOrders() {
        return toResponses(orderRepository.findAllByOrderByCreatedAtDesc());
    }

    @Transactional(readOnly = true)
    public List<OrderResponse> getCurrentCustomerOrders(Authentication authentication) {
        User user = requireUser(authentication);
        List<Order> orders = new ArrayList<>(orderRepository.findByUserIdOrderByCreatedAtDesc(user.getId()));
        findCustomerForUser(user).ifPresent(customer -> orders.addAll(orderRepository.findByCustomerIdOrderByCreatedAtDesc(customer.getId())));

        return toResponses(orders.stream()
                .collect(Collectors.toMap(Order::getId, Function.identity(), (left, right) -> left))
                .values()
                .stream()
                .sorted(Comparator.comparing(Order::getCreatedAt, Comparator.nullsLast(Comparator.naturalOrder())).reversed())
                .toList());
    }

    @Transactional
    public OrderResponse createOrder(Authentication authentication, OrderRequest request) {
        User user = requireCustomer(authentication);
        if (request.items() == null || request.items().isEmpty()) {
            throw new BadRequestException("Don hang phai co san pham.");
        }

        String requestedId = trimToNull(request.id());
        if (requestedId != null && orderRepository.existsById(requestedId)) {
            return toResponse(orderRepository.findById(requestedId).orElseThrow());
        }
        String requestedCode = trimToNull(request.code());
        if (requestedCode != null) {
            var existingOrder = orderRepository.findByMaDon(requestedCode);
            if (existingOrder.isPresent()) {
                return toResponse(existingOrder.get());
            }
        }

        LocalDateTime createdAt = parseDateTime(request.createdAt());
        Customer customer = findOrCreateCustomer(user, request.address());
        BigDecimal subtotal = nonNegative(request.subtotal());
        BigDecimal shipping = nonNegative(request.shipping());
        BigDecimal discount = nonNegative(request.discount());
        BigDecimal total = request.total() == null
                ? subtotal.add(shipping).subtract(discount).max(BigDecimal.ZERO)
                : nonNegative(request.total());

        Order order = new Order();
        order.setId(requestedId == null ? "order-" + UUID.randomUUID() : requestedId);
        order.setMaDon(requestedCode == null ? buildOrderCode(createdAt) : requestedCode);
        order.setNgayDat(createdAt.toLocalDate());
        order.setCustomerId(customer.getId());
        order.setUserId(user.getId());
        order.setNguoiNhan(firstNonBlank(request.address() == null ? null : request.address().recipient(), customer.getTenKhach(), user.getHoTen()));
        order.setSoDienThoaiGiao(firstNonBlank(request.address() == null ? null : request.address().phone(), customer.getSdt()));
        order.setTrangThaiDon(STATUS_PENDING);
        order.setThanhToan("COD");
        order.setDaThanhToan(false);
        order.setTongTien(total);
        order.setPhiShip(shipping);
        order.setGiamGia(discount);
        order.setDiaChiGiao(buildAddressText(request.address(), customer));
        order.setGhiChu(serializeMetadata(Map.of(
                "voucherCode", safeString(request.voucherCode()),
                "voucherLabel", safeString(request.voucherLabel())
        )));
        order.setCreatedAt(createdAt);
        orderRepository.save(order);

        saveOrderItems(order, request.items(), createdAt);
        return toResponse(order);
    }

    @Transactional
    public OrderResponse updateOrder(String orderId, OrderStatusUpdateRequest request, Authentication authentication) {
        User user = requireUser(authentication);
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new ResourceNotFoundException("Khong tim thay don hang."));

        Map<String, String> metadata = parseMetadata(order.getGhiChu());
        String nextStatus = trimToNull(request.status());
        if (nextStatus != null) {
            order.setTrangThaiDon(nextStatus);
            if (isCancelledStatus(nextStatus)) {
                order.setDaThanhToan(false);
                metadata.put("paidAt", "");
                metadata.put("paymentConfirmedBy", "");
            }
        }
        putOrRemoveMetadata(metadata, "supportRequest", request.supportRequest());
        putOrRemoveMetadata(metadata, "supportStatus", request.supportStatus());
        putOrRemoveMetadata(metadata, "supportNote", request.supportNote());

        if (isPaidRequest(request)) {
            if (!isDeliveredStatus(order.getTrangThaiDon())) {
                throw new BadRequestException("Chi xac nhan thu tien sau khi don da giao.");
            }
            order.setDaThanhToan(true);
            metadata.put("paidAt", firstNonBlank(request.paidAt(), LocalDateTime.now().toString()));
            metadata.put("paymentConfirmedBy", firstNonBlank(request.paymentConfirmedBy(), user.getUsername()));
        }

        order.setGhiChu(serializeMetadata(metadata));
        orderRepository.save(order);
        return toResponse(order);
    }

    private void saveOrderItems(Order order, List<OrderItemPayload> payloads, LocalDateTime createdAt) {
        List<String> productIds = payloads.stream()
                .map(OrderItemPayload::productId)
                .filter(id -> id != null && !id.isBlank())
                .distinct()
                .toList();
        Map<String, Product> products = productRepository.findAllById(productIds)
                .stream()
                .collect(Collectors.toMap(Product::getId, Function.identity()));

        List<OrderItem> items = new ArrayList<>();
        for (OrderItemPayload payload : payloads) {
            Product product = products.get(payload.productId());
            if (product == null) {
                throw new BadRequestException("San pham trong don hang khong ton tai: " + payload.productId());
            }

            int quantity = Math.max(1, payload.quantity() == null ? 1 : payload.quantity());
            BigDecimal unitPrice = payload.unitPrice() == null ? product.getGiaBan() : nonNegative(payload.unitPrice());
            BigDecimal lineTotal = payload.subtotal() == null
                    ? unitPrice.multiply(BigDecimal.valueOf(quantity))
                    : nonNegative(payload.subtotal());

            OrderItem item = new OrderItem();
            item.setId("order-item-" + UUID.randomUUID());
            item.setOrderId(order.getId());
            item.setProductId(product.getId());
            item.setVariantId(null);
            item.setTenSanPhamSnapshot(firstNonBlank(payload.name(), product.getTenSanPham()));
            item.setSkuSnapshot(firstNonBlank(payload.sku(), product.getSku()));
            item.setSizeSnapshot(firstNonBlank(payload.size(), product.getSize(), "Tieu chuan"));
            item.setMauSnapshot(firstNonBlank(payload.variantType(), product.getMau()));
            item.setSoLuong(quantity);
            item.setDonGia(unitPrice);
            item.setThanhTien(lineTotal);
            item.setCreatedAt(createdAt);
            items.add(item);
        }

        orderItemRepository.saveAll(items);
    }

    private List<OrderResponse> toResponses(List<Order> orders) {
        if (orders.isEmpty()) {
            return List.of();
        }

        List<String> orderIds = orders.stream().map(Order::getId).toList();
        Map<String, List<OrderItem>> itemsByOrderId = orderItemRepository.findByOrderIdIn(orderIds)
                .stream()
                .collect(Collectors.groupingBy(OrderItem::getOrderId));
        List<String> productIds = itemsByOrderId.values()
                .stream()
                .flatMap(List::stream)
                .map(OrderItem::getProductId)
                .distinct()
                .toList();
        Map<String, Product> products = productRepository.findAllById(productIds)
                .stream()
                .collect(Collectors.toMap(Product::getId, Function.identity()));
        Map<String, Customer> customers = customerRepository.findAllById(orders.stream().map(Order::getCustomerId).distinct().toList())
                .stream()
                .collect(Collectors.toMap(Customer::getId, Function.identity()));

        return orders.stream()
                .map(order -> toResponse(order, itemsByOrderId.getOrDefault(order.getId(), List.of()), products, customers.get(order.getCustomerId())))
                .toList();
    }

    private OrderResponse toResponse(Order order) {
        List<OrderItem> items = orderItemRepository.findByOrderId(order.getId());
        Map<String, Product> products = productRepository.findAllById(items.stream().map(OrderItem::getProductId).distinct().toList())
                .stream()
                .collect(Collectors.toMap(Product::getId, Function.identity()));
        Customer customer = customerRepository.findById(order.getCustomerId()).orElse(null);
        return toResponse(order, items, products, customer);
    }

    private OrderResponse toResponse(Order order, List<OrderItem> items, Map<String, Product> products, Customer customer) {
        Map<String, String> metadata = parseMetadata(order.getGhiChu());
        List<OrderItemPayload> itemResponses = items.stream()
                .map(item -> {
                    Product product = products.get(item.getProductId());
                    return new OrderItemPayload(
                            item.getProductId(),
                            item.getSkuSnapshot(),
                            item.getTenSanPhamSnapshot(),
                            product == null ? "" : product.getHinhAnhUrl(),
                            item.getSizeSnapshot(),
                            item.getMauSnapshot(),
                            item.getSoLuong(),
                            item.getDonGia(),
                            item.getThanhTien()
                    );
                })
                .toList();

        int totalItems = itemResponses.stream().mapToInt(item -> item.quantity() == null ? 0 : item.quantity()).sum();
        String paymentStatus = resolvePaymentStatus(order);
        OrderCustomerPayload customerPayload = new OrderCustomerPayload(
                firstNonBlank(order.getUserId(), customer == null ? null : customer.getUserId(), order.getCustomerId()),
                firstNonBlank(customer == null ? null : customer.getTenKhach(), order.getNguoiNhan()),
                "",
                customer == null ? "" : customer.getEmail(),
                firstNonBlank(order.getSoDienThoaiGiao(), customer == null ? null : customer.getSdt())
        );

        return new OrderResponse(
                order.getId(),
                order.getMaDon(),
                order.getCreatedAt(),
                order.getTrangThaiDon(),
                paymentStatus,
                metadata.getOrDefault("paidAt", ""),
                metadata.getOrDefault("paymentConfirmedBy", ""),
                metadata.getOrDefault("supportRequest", ""),
                metadata.getOrDefault("supportStatus", ""),
                metadata.getOrDefault("supportNote", ""),
                totalItems,
                order.getTongTien().add(nonNegative(order.getGiamGia())).subtract(nonNegative(order.getPhiShip())).max(BigDecimal.ZERO),
                nonNegative(order.getPhiShip()),
                nonNegative(order.getGiamGia()),
                order.getTongTien(),
                metadata.getOrDefault("voucherCode", ""),
                metadata.getOrDefault("voucherLabel", ""),
                new OrderAddressPayload("", order.getNguoiNhan(), order.getSoDienThoaiGiao(), order.getDiaChiGiao(), "", "", "", "", order.getDiaChiGiao()),
                customerPayload,
                order.getUserId(),
                java.util.stream.Stream.of(order.getUserId(), order.getCustomerId(), customer == null ? "" : customer.getEmail(), order.getSoDienThoaiGiao())
                        .filter(value -> value != null && !value.isBlank())
                        .distinct()
                        .toList(),
                itemResponses
        );
    }

    private Customer findOrCreateCustomer(User user, OrderAddressPayload address) {
        Customer customer = findCustomerForUser(user).orElseGet(Customer::new);
        if (customer.getId() == null || customer.getId().isBlank()) {
            customer.setId("customer-" + UUID.randomUUID());
            customer.setCreatedAt(LocalDateTime.now());
        }
        customer.setUserId(user.getId());
        customer.setTenKhach(firstNonBlank(address == null ? null : address.recipient(), user.getHoTen(), user.getUsername()));
        customer.setEmail(user.getEmail());
        customer.setSdt(firstNonBlank(address == null ? null : address.phone(), customer.getSdt(), "0000000000"));
        customer.setKenh(firstNonBlank(customer.getKenh(), "Website"));
        customer.setNhan(firstNonBlank(customer.getNhan(), "Moi"));
        customer.setDiaChi(buildAddressText(address, customer));
        if (customer.getCreatedAt() == null) {
            customer.setCreatedAt(LocalDateTime.now());
        }
        return customerRepository.save(customer);
    }

    private java.util.Optional<Customer> findCustomerForUser(User user) {
        var byUserId = customerRepository.findFirstByUserId(user.getId());
        if (byUserId.isPresent()) {
            return byUserId;
        }
        if (user.getEmail() != null && !user.getEmail().isBlank()) {
            var byEmail = customerRepository.findFirstByEmailIgnoreCase(user.getEmail());
            if (byEmail.isPresent()) {
                return byEmail;
            }
        }
        if (user.getHoTen() != null && !user.getHoTen().isBlank()) {
            return customerRepository.findFirstByTenKhachIgnoreCase(user.getHoTen());
        }
        return java.util.Optional.empty();
    }

    private User requireUser(Authentication authentication) {
        if (authentication == null || !(authentication.getPrincipal() instanceof CurrentUserPrincipal principal)) {
            throw new UnauthorizedException("Phien dang nhap khong hop le.");
        }
        return principal.getUser();
    }

    private User requireCustomer(Authentication authentication) {
        User user = requireUser(authentication);
        String authority = CurrentUserPrincipal.toAuthority(user.getRole());
        if ("ROLE_ADMIN".equals(authority) || "ROLE_STAFF".equals(authority)) {
            throw new UnauthorizedException("Nhan vien va quan tri vien khong duoc dat hang.");
        }
        return user;
    }

    private String resolvePaymentStatus(Order order) {
        if (Boolean.TRUE.equals(order.getDaThanhToan())) {
            return PAYMENT_PAID;
        }
        if (isCancelledStatus(order.getTrangThaiDon())) {
            return PAYMENT_CANCELLED;
        }
        if (isDeliveredStatus(order.getTrangThaiDon())) {
            return PAYMENT_WAITING_CONFIRMATION;
        }
        return PAYMENT_PENDING_COD;
    }

    private boolean isPaidRequest(OrderStatusUpdateRequest request) {
        String paymentStatus = normalize(request.paymentStatus());
        return paymentStatus.contains("thanh toan thanh cong")
                || paymentStatus.contains("da thu tien")
                || paymentStatus.contains("da ghi nhan thanh toan")
                || trimToNull(request.paidAt()) != null;
    }

    private boolean isDeliveredStatus(String status) {
        String normalized = normalize(status);
        String raw = String.valueOf(status == null ? "" : status).toLowerCase(Locale.ROOT);
        return normalized.contains("da giao") || (raw.contains("giao") && !raw.contains("ang giao"));
    }

    private boolean isCancelledStatus(String status) {
        String normalized = normalize(status);
        String raw = String.valueOf(status == null ? "" : status).toLowerCase(Locale.ROOT);
        return normalized.contains("da huy") || normalized.contains("huy don") || (raw.contains("h") && raw.contains("y") && !raw.contains("thay"));
    }

    private Map<String, String> parseMetadata(String note) {
        if (note == null || note.isBlank() || !note.trim().startsWith("{")) {
            return new HashMap<>();
        }
        try {
            return new HashMap<>(objectMapper.readValue(note, new TypeReference<Map<String, String>>() { }));
        } catch (JsonProcessingException ignored) {
            return new HashMap<>();
        }
    }

    private String serializeMetadata(Map<String, String> metadata) {
        Map<String, String> clean = new LinkedHashMap<>();
        metadata.forEach((key, value) -> {
            if (value != null && !value.isBlank()) {
                clean.put(key, value);
            }
        });
        if (clean.isEmpty()) {
            return null;
        }
        try {
            String json = objectMapper.writeValueAsString(clean);
            return json.length() <= 500 ? json : json.substring(0, 500);
        } catch (JsonProcessingException exception) {
            return null;
        }
    }

    private String buildAddressText(OrderAddressPayload address, Customer customer) {
        if (address == null) {
            return firstNonBlank(customer.getDiaChi(), "Chua cap nhat dia chi");
        }
        return java.util.stream.Stream.of(address.detail(), address.street(), address.ward(), address.district(), address.province(), address.text())
                .map(this::trimToNull)
                .filter(value -> value != null && !value.isBlank())
                .distinct()
                .collect(Collectors.joining(", "));
    }

    private String buildOrderCode(LocalDateTime createdAt) {
        return "DH-" + createdAt.toLocalDate().toString().replace("-", "") + "-" + UUID.randomUUID().toString().substring(0, 4).toUpperCase(Locale.ROOT);
    }

    private LocalDateTime parseDateTime(String value) {
        String normalized = trimToNull(value);
        if (normalized == null) {
            return LocalDateTime.now();
        }
        try {
            return Instant.parse(normalized).atZone(ZoneId.systemDefault()).toLocalDateTime();
        } catch (RuntimeException ignored) {
            try {
                return LocalDateTime.parse(normalized);
            } catch (RuntimeException ignoredAgain) {
                return LocalDate.now().atStartOfDay();
            }
        }
    }

    private BigDecimal nonNegative(BigDecimal value) {
        if (value == null || value.signum() < 0) {
            return BigDecimal.ZERO;
        }
        return value;
    }

    private String firstNonBlank(String... values) {
        for (String value : values) {
            String trimmed = trimToNull(value);
            if (trimmed != null) {
                return trimmed;
            }
        }
        return "";
    }

    private String safeString(String value) {
        return value == null ? "" : value.trim();
    }

    private String trimToNull(String value) {
        if (value == null) {
            return null;
        }
        String trimmed = value.trim();
        return trimmed.isBlank() ? null : trimmed;
    }

    private void putOrRemoveMetadata(Map<String, String> metadata, String key, String value) {
        if (value == null) {
            return;
        }
        String trimmed = value.trim();
        if (trimmed.isBlank()) {
            metadata.remove(key);
            return;
        }
        metadata.put(key, trimmed);
    }

    private String normalize(String value) {
        return Normalizer.normalize(String.valueOf(value == null ? "" : value), Normalizer.Form.NFD)
                .toLowerCase(Locale.ROOT)
                .replace('\u0111', 'd')
                .replace('\u0110', 'd')
                .replaceAll("\\p{M}+", "")
                .replaceAll("[^a-z0-9]+", " ")
                .replaceAll("\\s+", " ")
                .trim();
    }
}
