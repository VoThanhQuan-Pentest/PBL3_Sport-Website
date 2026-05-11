package com.flarefitness.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import java.math.BigDecimal;

@Entity
@Table(name = "tbl_chi_tiet_don_hang")
public class OrderItem extends BaseEntity {

    @Id
    @Column(name = "id", nullable = false, length = 64)
    private String id;

    @Column(name = "order_id", nullable = false, length = 64)
    private String orderId;

    @Column(name = "product_id", nullable = false, length = 64)
    private String productId;

    @Column(name = "variant_id", length = 64)
    private String variantId;

    @Column(name = "ten_san_pham_snapshot", nullable = false, length = 255)
    private String tenSanPhamSnapshot;

    @Column(name = "sku_snapshot", nullable = false, length = 64)
    private String skuSnapshot;

    @Column(name = "size_snapshot", length = 50)
    private String sizeSnapshot;

    @Column(name = "mau_snapshot", length = 50)
    private String mauSnapshot;

    @Column(name = "so_luong", nullable = false)
    private Integer soLuong;

    @Column(name = "don_gia", nullable = false, precision = 15, scale = 2)
    private BigDecimal donGia;

    @Column(name = "thanh_tien", nullable = false, precision = 15, scale = 2)
    private BigDecimal thanhTien;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getOrderId() {
        return orderId;
    }

    public void setOrderId(String orderId) {
        this.orderId = orderId;
    }

    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }

    public String getVariantId() {
        return variantId;
    }

    public void setVariantId(String variantId) {
        this.variantId = variantId;
    }

    public String getTenSanPhamSnapshot() {
        return tenSanPhamSnapshot;
    }

    public void setTenSanPhamSnapshot(String tenSanPhamSnapshot) {
        this.tenSanPhamSnapshot = tenSanPhamSnapshot;
    }

    public String getSkuSnapshot() {
        return skuSnapshot;
    }

    public void setSkuSnapshot(String skuSnapshot) {
        this.skuSnapshot = skuSnapshot;
    }

    public String getSizeSnapshot() {
        return sizeSnapshot;
    }

    public void setSizeSnapshot(String sizeSnapshot) {
        this.sizeSnapshot = sizeSnapshot;
    }

    public String getMauSnapshot() {
        return mauSnapshot;
    }

    public void setMauSnapshot(String mauSnapshot) {
        this.mauSnapshot = mauSnapshot;
    }

    public Integer getSoLuong() {
        return soLuong;
    }

    public void setSoLuong(Integer soLuong) {
        this.soLuong = soLuong;
    }

    public BigDecimal getDonGia() {
        return donGia;
    }

    public void setDonGia(BigDecimal donGia) {
        this.donGia = donGia;
    }

    public BigDecimal getThanhTien() {
        return thanhTien;
    }

    public void setThanhTien(BigDecimal thanhTien) {
        this.thanhTien = thanhTien;
    }
}
