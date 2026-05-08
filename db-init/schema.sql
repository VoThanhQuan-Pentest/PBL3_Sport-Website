CREATE DATABASE IF NOT EXISTS flare_fitness
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE flare_fitness;

SHOW DATABASES;
USE flare_fitness;
SHOW TABLES;
SELECT * FROM tbl_nguoi_dung;


CREATE TABLE IF NOT EXISTS tbl_nguoi_dung (
    id VARCHAR(64) NOT NULL,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    ho_ten VARCHAR(150) NOT NULL,
    email VARCHAR(150) NULL,
    ngay_tao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uk_tbl_nguoi_dung_username (username),
    KEY idx_tbl_nguoi_dung_role (role),
    KEY idx_tbl_nguoi_dung_ngay_tao (ngay_tao)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS tbl_khach_hang (
    id VARCHAR(64) NOT NULL,
    ten_khach VARCHAR(150) NOT NULL,
    sdt VARCHAR(30) NOT NULL,
    email VARCHAR(150) NULL,
    kenh VARCHAR(50) NULL,
    nhan VARCHAR(100) NULL,
    dia_chi VARCHAR(500) NULL,
    ghi_chu VARCHAR(500) NULL,
    ngay_tao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_tbl_khach_hang_email (email),
    KEY idx_tbl_khach_hang_ten_khach (ten_khach),
    KEY idx_tbl_khach_hang_ngay_tao (ngay_tao)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS tbl_san_pham (
    id VARCHAR(64) NOT NULL,
    ten_san_pham VARCHAR(255) NOT NULL,
    sku VARCHAR(64) NOT NULL,
    danh_muc VARCHAR(100) NOT NULL,
    thuong_hieu VARCHAR(100) NULL,
    size VARCHAR(50) NULL,
    mau VARCHAR(50) NULL,
    gia_nhap DECIMAL(15,2) NOT NULL,
    gia_ban DECIMAL(15,2) NOT NULL,
    ton_kho INT NOT NULL DEFAULT 0,
    trang_thai VARCHAR(50) NOT NULL,
    link_san_pham VARCHAR(500) NULL,
    ghi_chu VARCHAR(500) NULL,
    ngay_tao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uk_tbl_san_pham_sku (sku),
    KEY idx_tbl_san_pham_danh_muc (danh_muc),
    KEY idx_tbl_san_pham_trang_thai (trang_thai),
    KEY idx_tbl_san_pham_ngay_tao (ngay_tao)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS tbl_don_hang (
    id VARCHAR(64) NOT NULL,
    ma_don VARCHAR(64) NOT NULL,
    ngay_dat DATE NOT NULL,
    customer_id VARCHAR(64) NOT NULL,
    trang_thai_don VARCHAR(50) NOT NULL,
    thanh_toan VARCHAR(50) NOT NULL,
    da_thanh_toan TINYINT(1) NOT NULL DEFAULT 0,
    tong_tien DECIMAL(15,2) NOT NULL,
    phi_ship DECIMAL(15,2) NULL DEFAULT 0,
    giam_gia DECIMAL(15,2) NULL DEFAULT 0,
    dia_chi_giao VARCHAR(500) NOT NULL,
    ghi_chu VARCHAR(500) NULL,
    ngay_tao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uk_tbl_don_hang_ma_don (ma_don),
    KEY idx_tbl_don_hang_customer_id (customer_id),
    KEY idx_tbl_don_hang_trang_thai_don (trang_thai_don),
    KEY idx_tbl_don_hang_ngay_tao (ngay_tao),
    CONSTRAINT fk_tbl_don_hang_customer
        FOREIGN KEY (customer_id) REFERENCES tbl_khach_hang (id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS tbl_san_khuyen_mai (
    id VARCHAR(64) NOT NULL,
    voucher_code VARCHAR(64) NOT NULL,
    tong_so_luong INT NOT NULL,
    bat_dau DATETIME NOT NULL,
    ket_thuc DATETIME NOT NULL,
    trang_thai VARCHAR(50) NOT NULL DEFAULT 'ACTIVE',
    ngay_tao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ngay_cap_nhat DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_promo_hunt_voucher (voucher_code),
    KEY idx_promo_hunt_time (bat_dau, ket_thuc),
    KEY idx_promo_hunt_status (trang_thai)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS tbl_luot_nhan_khuyen_mai (
    id VARCHAR(64) NOT NULL,
    campaign_id VARCHAR(64) NOT NULL,
    user_id VARCHAR(64) NOT NULL,
    ngay_tao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uk_promo_hunt_claim_user (campaign_id, user_id),
    KEY idx_promo_hunt_claim_campaign (campaign_id),
    KEY idx_promo_hunt_claim_user (user_id),
    CONSTRAINT fk_promo_hunt_claim_campaign
        FOREIGN KEY (campaign_id) REFERENCES tbl_san_khuyen_mai (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT fk_promo_hunt_claim_user
        FOREIGN KEY (user_id) REFERENCES tbl_nguoi_dung (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO tbl_nguoi_dung (id, username, password, role, ho_ten, email, ngay_tao)
VALUES
    ('user-admin-001', 'admin', '$2a$10$yCPiRjbKafwJ0Lh5802sMuLDiCn.PJtA3WW4gCAeXowC6xV7jjrlu', 'Quản trị viên', 'Hệ Thống', 'admin@flarefitness.com', '2026-04-18 08:00:00'),
    ('user-staff-001', 'nhanvien01', '$2a$10$tsHqWuYvzLI2jA6GonaWu.ysxEC4nNh9wVIMubsdkrxYdrP1mRdNO', 'Nhân viên', 'Nguyễn Nhân Viên', 'nv01@flarefitness.com', '2026-04-18 08:05:00'),
    ('user-customer-001', 'khachhang01', '$2a$10$.2gKv0ngr3Aez7VinUrROODe/TiSgR6/2cjmcdMenmcJ7hZzfp78e', 'Khách hàng', 'Nguyễn Văn A', 'nguyenvana@email.com', '2026-04-18 08:10:00')
ON DUPLICATE KEY UPDATE
    password = VALUES(password),
    role = VALUES(role),
    ho_ten = VALUES(ho_ten),
    email = VALUES(email);

INSERT INTO tbl_san_khuyen_mai (
    id, voucher_code, tong_so_luong, bat_dau, ket_thuc, trang_thai, ngay_tao, ngay_cap_nhat
)
VALUES
    ('hunt-hotdeal10', 'HOTDEAL10', 30, DATE_SUB(NOW(), INTERVAL 1 DAY), DATE_ADD(NOW(), INTERVAL 45 DAY), 'ACTIVE', NOW(), NOW()),
    ('hunt-seagames15', 'SEAGAMES15', 20, DATE_SUB(NOW(), INTERVAL 1 DAY), DATE_ADD(NOW(), INTERVAL 45 DAY), 'ACTIVE', NOW(), NOW()),
    ('hunt-rungym18', 'RUNGYM18', 15, DATE_SUB(NOW(), INTERVAL 1 DAY), DATE_ADD(NOW(), INTERVAL 45 DAY), 'ACTIVE', NOW(), NOW())
ON DUPLICATE KEY UPDATE
    voucher_code = VALUES(voucher_code),
    tong_so_luong = VALUES(tong_so_luong),
    trang_thai = VALUES(trang_thai);

INSERT INTO tbl_khach_hang (id, ten_khach, sdt, email, kenh, nhan, dia_chi, ghi_chu, ngay_tao)
VALUES
    ('customer-001', 'Nguyễn Văn A', '0901234567', 'nguyenvana@email.com', 'Website', 'VIP', '123 Đường Lê Lợi, Quận 1, TP.HCM', 'Khách hàng thân thiết', '2026-04-18 08:15:00'),
    ('customer-002', 'Trần Thị B', '0987654321', 'tranthib@email.com', 'Facebook', 'Mới', '456 Đường Nguyễn Huệ, Quận 2, TP.HCM', '', '2026-04-18 08:20:00')
ON DUPLICATE KEY UPDATE
    sdt = VALUES(sdt),
    email = VALUES(email),
    kenh = VALUES(kenh),
    nhan = VALUES(nhan),
    dia_chi = VALUES(dia_chi),
    ghi_chu = VALUES(ghi_chu);

INSERT INTO tbl_san_pham (
    id, ten_san_pham, sku, danh_muc, thuong_hieu, size, mau,
    gia_nhap, gia_ban, ton_kho, trang_thai, link_san_pham, ghi_chu, ngay_tao
)
VALUES
    ('product-001', 'Giày bóng đá cỏ nhân tạo Nike', 'FB-001', 'Bóng đá', 'Nike', '42', 'Xanh', 850000, 1250000, 10, 'Đang bán', '', 'Dòng chuyên dụng cho sân cỏ nhân tạo', '2026-04-18 08:30:00'),
    ('product-002', 'Áo đấu CLB Manchester City 2024', 'FB-003', 'Bóng đá', 'Puma', 'M', 'Xanh dương', 300000, 550000, 25, 'Đang bán', '', 'Chất liệu Dry-cell thoáng khí', '2026-04-18 08:31:00'),
    ('product-003', 'Bóng rổ Spalding NBA', 'BB-002', 'Bóng rổ', 'Spalding', 'Số 7', 'Cam', 400000, 650000, 15, 'Đang bán', '', '', '2026-04-18 08:32:00'),
    ('product-004', 'Vợt cầu lông Yonex Astrox', 'BM-001', 'Cầu lông', 'Yonex', '4U-G5', 'Đen Xanh', 1200000, 1850000, 8, 'Đang bán', '', 'Siêu nhẹ, thoát cầu nhanh', '2026-04-18 08:33:00'),
    ('product-005', 'Bóng chuyền hơi Động Lực', 'VB-001', 'Bóng chuyền', 'Động Lực', 'Tiêu chuẩn', 'Vàng Xanh', 80000, 120000, 30, 'Đang bán', '', '', '2026-04-18 08:34:00'),
    ('product-006', 'Vợt bóng bàn 7 lớp gỗ', 'TT-001', 'Bóng bàn', '729-Focus', 'Tiêu chuẩn', 'Đỏ Đen', 250000, 450000, 10, 'Đang bán', '', 'Dành cho người mới tập chơi', '2026-04-18 08:35:00')
ON DUPLICATE KEY UPDATE
    ten_san_pham = VALUES(ten_san_pham),
    danh_muc = VALUES(danh_muc),
    thuong_hieu = VALUES(thuong_hieu),
    size = VALUES(size),
    mau = VALUES(mau),
    gia_nhap = VALUES(gia_nhap),
    gia_ban = VALUES(gia_ban),
    ton_kho = VALUES(ton_kho),
    trang_thai = VALUES(trang_thai),
    link_san_pham = VALUES(link_san_pham),
    ghi_chu = VALUES(ghi_chu);

INSERT INTO tbl_don_hang (
    id, ma_don, ngay_dat, customer_id, trang_thai_don, thanh_toan, da_thanh_toan,
    tong_tien, phi_ship, giam_gia, dia_chi_giao, ghi_chu, ngay_tao
)
VALUES
    ('order-001', 'DH-20260418-0001', '2026-04-18', 'customer-001', 'Hoàn tất', 'Chuyển khoản', 1, 1800000, 30000, 50000, '123 Đường Lê Lợi, Quận 1, TP.HCM', 'Giao giờ hành chính', '2026-04-18 09:00:00'),
    ('order-002', 'DH-20260418-0002', '2026-04-18', 'customer-002', 'Đang giao', 'COD', 0, 570000, 20000, 0, '456 Đường Nguyễn Huệ, Quận 2, TP.HCM', 'Gọi trước khi giao', '2026-04-18 09:10:00')
ON DUPLICATE KEY UPDATE
    ngay_dat = VALUES(ngay_dat),
    customer_id = VALUES(customer_id),
    trang_thai_don = VALUES(trang_thai_don),
    thanh_toan = VALUES(thanh_toan),
    da_thanh_toan = VALUES(da_thanh_toan),
    tong_tien = VALUES(tong_tien),
    phi_ship = VALUES(phi_ship),
    giam_gia = VALUES(giam_gia),
    dia_chi_giao = VALUES(dia_chi_giao),
    ghi_chu = VALUES(ghi_chu);
