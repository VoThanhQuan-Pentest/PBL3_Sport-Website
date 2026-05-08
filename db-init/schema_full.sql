
SET NAMES utf8mb4;

CREATE DATABASE IF NOT EXISTS flare_fitness
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE flare_fitness;


CREATE TABLE IF NOT EXISTS tbl_nguoi_dung (
    id VARCHAR(64) NOT NULL,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL,
    ho_ten VARCHAR(150) NOT NULL,
    email VARCHAR(150) NULL,
    avatar_url VARCHAR(500) NULL,
    trang_thai VARCHAR(30) NOT NULL DEFAULT 'Đang hoạt động',
    lan_dang_nhap_cuoi DATETIME NULL,
    ngay_tao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ngay_cap_nhat DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_deleted TINYINT(1) NOT NULL DEFAULT 0,
    PRIMARY KEY (id),
    UNIQUE KEY uk_tbl_nguoi_dung_username (username),
    KEY idx_tbl_nguoi_dung_email (email),
    KEY idx_tbl_nguoi_dung_role (role),
    KEY idx_tbl_nguoi_dung_trang_thai (trang_thai),
    KEY idx_tbl_nguoi_dung_ngay_tao (ngay_tao)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS tbl_khach_hang (
    id VARCHAR(64) NOT NULL,
    user_id VARCHAR(64) NULL,
    ten_khach VARCHAR(150) NOT NULL,
    sdt VARCHAR(30) NOT NULL,
    email VARCHAR(150) NULL,
    kenh VARCHAR(50) NULL,
    nhan VARCHAR(100) NULL,
    dia_chi VARCHAR(500) NULL,
    ghi_chu VARCHAR(500) NULL,
    tong_chi_tieu DECIMAL(15,2) NOT NULL DEFAULT 0,
    hang_khach_hang VARCHAR(50) NOT NULL DEFAULT 'ThĂ†Â°Ă¡Â»Âng',
    ngay_tao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ngay_cap_nhat DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_deleted TINYINT(1) NOT NULL DEFAULT 0,
    PRIMARY KEY (id),
    UNIQUE KEY uk_tbl_khach_hang_user_id (user_id),
    KEY idx_tbl_khach_hang_email (email),
    KEY idx_tbl_khach_hang_sdt (sdt),
    KEY idx_tbl_khach_hang_ten_khach (ten_khach),
    KEY idx_tbl_khach_hang_ngay_tao (ngay_tao),
    CONSTRAINT fk_tbl_khach_hang_user
        FOREIGN KEY (user_id) REFERENCES tbl_nguoi_dung (id)
        ON UPDATE CASCADE
        ON DELETE SET NULL
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
    hinh_anh_url VARCHAR(500) NULL,
    mo_ta_ngan TEXT NULL,
    ghi_chu VARCHAR(500) NULL,
    ngay_tao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ngay_cap_nhat DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_deleted TINYINT(1) NOT NULL DEFAULT 0,
    PRIMARY KEY (id),
    UNIQUE KEY uk_tbl_san_pham_sku (sku),
    KEY idx_tbl_san_pham_danh_muc (danh_muc),
    KEY idx_tbl_san_pham_trang_thai (trang_thai),
    KEY idx_tbl_san_pham_thuong_hieu (thuong_hieu),
    KEY idx_tbl_san_pham_ngay_tao (ngay_tao)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS tbl_bien_the_san_pham (
    id VARCHAR(64) NOT NULL,
    product_id VARCHAR(64) NOT NULL,
    sku_bien_the VARCHAR(64) NOT NULL,
    size VARCHAR(50) NOT NULL,
    mau VARCHAR(50) NOT NULL,
    ton_kho_hien_tai INT NOT NULL DEFAULT 0,
    gia_nhap DECIMAL(15,2) NOT NULL,
    gia_ban DECIMAL(15,2) NOT NULL,
    hinh_anh_url VARCHAR(500) NULL,
    trang_thai VARCHAR(50) NOT NULL DEFAULT 'Ă„Âang bÄ‚Â¡n',
    ghi_chu VARCHAR(500) NULL,
    ngay_tao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ngay_cap_nhat DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_deleted TINYINT(1) NOT NULL DEFAULT 0,
    PRIMARY KEY (id),
    UNIQUE KEY uk_tbl_bien_the_san_pham_sku_bien_the (sku_bien_the),
    UNIQUE KEY uk_tbl_bien_the_san_pham_product_size_mau (product_id, size, mau),
    KEY idx_tbl_bien_the_san_pham_product_id (product_id),
    KEY idx_tbl_bien_the_san_pham_trang_thai (trang_thai),
    CONSTRAINT fk_tbl_bien_the_san_pham_product
        FOREIGN KEY (product_id) REFERENCES tbl_san_pham (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS tbl_gio_hang (
    id VARCHAR(64) NOT NULL,
    user_id VARCHAR(64) NULL,
    customer_id VARCHAR(64) NULL,
    trang_thai VARCHAR(30) NOT NULL DEFAULT 'ACTIVE',
    tong_san_pham INT NOT NULL DEFAULT 0,
    tong_tien_tam_tinh DECIMAL(15,2) NOT NULL DEFAULT 0,
    ngay_tao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ngay_cap_nhat DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uk_tbl_gio_hang_user_id (user_id),
    UNIQUE KEY uk_tbl_gio_hang_customer_id (customer_id),
    KEY idx_tbl_gio_hang_trang_thai (trang_thai),
    CONSTRAINT fk_tbl_gio_hang_user
        FOREIGN KEY (user_id) REFERENCES tbl_nguoi_dung (id)
        ON UPDATE CASCADE
        ON DELETE SET NULL,
    CONSTRAINT fk_tbl_gio_hang_customer
        FOREIGN KEY (customer_id) REFERENCES tbl_khach_hang (id)
        ON UPDATE CASCADE
        ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS tbl_chi_tiet_gio_hang (
    id VARCHAR(64) NOT NULL,
    cart_id VARCHAR(64) NOT NULL,
    product_id VARCHAR(64) NOT NULL,
    variant_id VARCHAR(64) NOT NULL,
    so_luong INT NOT NULL DEFAULT 1,
    don_gia DECIMAL(15,2) NOT NULL,
    thanh_tien DECIMAL(15,2) NOT NULL,
    ngay_tao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ngay_cap_nhat DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uk_tbl_chi_tiet_gio_hang_cart_variant (cart_id, variant_id),
    KEY idx_tbl_chi_tiet_gio_hang_product_id (product_id),
    CONSTRAINT fk_tbl_chi_tiet_gio_hang_cart
        FOREIGN KEY (cart_id) REFERENCES tbl_gio_hang (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT fk_tbl_chi_tiet_gio_hang_product
        FOREIGN KEY (product_id) REFERENCES tbl_san_pham (id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    CONSTRAINT fk_tbl_chi_tiet_gio_hang_variant
        FOREIGN KEY (variant_id) REFERENCES tbl_bien_the_san_pham (id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS tbl_don_hang (
    id VARCHAR(64) NOT NULL,
    ma_don VARCHAR(64) NOT NULL,
    ngay_dat DATE NOT NULL,
    customer_id VARCHAR(64) NOT NULL,
    user_id VARCHAR(64) NULL,
    nguoi_nhan VARCHAR(150) NULL,
    so_dien_thoai_giao VARCHAR(30) NULL,
    trang_thai_don VARCHAR(50) NOT NULL,
    thanh_toan VARCHAR(50) NOT NULL,
    da_thanh_toan TINYINT(1) NOT NULL DEFAULT 0,
    tong_tien DECIMAL(15,2) NOT NULL,
    phi_ship DECIMAL(15,2) NULL DEFAULT 0,
    giam_gia DECIMAL(15,2) NULL DEFAULT 0,
    dia_chi_giao VARCHAR(500) NOT NULL,
    ghi_chu VARCHAR(500) NULL,
    ngay_tao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ngay_cap_nhat DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_deleted TINYINT(1) NOT NULL DEFAULT 0,
    PRIMARY KEY (id),
    UNIQUE KEY uk_tbl_don_hang_ma_don (ma_don),
    KEY idx_tbl_don_hang_customer_id (customer_id),
    KEY idx_tbl_don_hang_user_id (user_id),
    KEY idx_tbl_don_hang_trang_thai_don (trang_thai_don),
    KEY idx_tbl_don_hang_ngay_dat (ngay_dat),
    CONSTRAINT fk_tbl_don_hang_customer
        FOREIGN KEY (customer_id) REFERENCES tbl_khach_hang (id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    CONSTRAINT fk_tbl_don_hang_user
        FOREIGN KEY (user_id) REFERENCES tbl_nguoi_dung (id)
        ON UPDATE CASCADE
        ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS tbl_chi_tiet_don_hang (
    id VARCHAR(64) NOT NULL,
    order_id VARCHAR(64) NOT NULL,
    product_id VARCHAR(64) NOT NULL,
    variant_id VARCHAR(64) NULL,
    ten_san_pham_snapshot VARCHAR(255) NOT NULL,
    sku_snapshot VARCHAR(64) NOT NULL,
    size_snapshot VARCHAR(50) NULL,
    mau_snapshot VARCHAR(50) NULL,
    so_luong INT NOT NULL,
    don_gia DECIMAL(15,2) NOT NULL,
    thanh_tien DECIMAL(15,2) NOT NULL,
    ngay_tao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uk_tbl_chi_tiet_don_hang_order_variant (order_id, sku_snapshot),
    KEY idx_tbl_chi_tiet_don_hang_product_id (product_id),
    KEY idx_tbl_chi_tiet_don_hang_variant_id (variant_id),
    CONSTRAINT fk_tbl_chi_tiet_don_hang_order
        FOREIGN KEY (order_id) REFERENCES tbl_don_hang (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT fk_tbl_chi_tiet_don_hang_product
        FOREIGN KEY (product_id) REFERENCES tbl_san_pham (id)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,
    CONSTRAINT fk_tbl_chi_tiet_don_hang_variant
        FOREIGN KEY (variant_id) REFERENCES tbl_bien_the_san_pham (id)
        ON UPDATE CASCADE
        ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS tbl_thanh_toan (
    id VARCHAR(64) NOT NULL,
    order_id VARCHAR(64) NOT NULL,
    ma_giao_dich_truy_xuat VARCHAR(100) NOT NULL,
    phuong_thuc VARCHAR(50) NOT NULL,
    so_tien DECIMAL(15,2) NOT NULL,
    trang_thai VARCHAR(50) NOT NULL,
    nha_cung_cap VARCHAR(100) NULL,
    raw_response_json JSON NULL,
    thanh_toan_luc DATETIME NULL,
    ghi_chu VARCHAR(500) NULL,
    ngay_tao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ngay_cap_nhat DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uk_tbl_thanh_toan_ma_giao_dich_truy_xuat (ma_giao_dich_truy_xuat),
    KEY idx_tbl_thanh_toan_order_id (order_id),
    KEY idx_tbl_thanh_toan_trang_thai (trang_thai),
    CONSTRAINT fk_tbl_thanh_toan_order
        FOREIGN KEY (order_id) REFERENCES tbl_don_hang (id)
        ON UPDATE CASCADE
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS tbl_san_khuyen_mai (
    id VARCHAR(64) NOT NULL,
    voucher_code VARCHAR(64) NOT NULL,
    tong_so_luong INT NOT NULL,
    bat_dau DATETIME NOT NULL,
    ket_thuc DATETIME NOT NULL,
    trang_thai VARCHAR(50) NOT NULL DEFAULT 'ACTIVE',
    ngay_tao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ngay_cap_nhat DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
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

CREATE OR REPLACE VIEW view_bang_san_pham AS
SELECT
    sp.id,
    sp.ten_san_pham,
    sp.sku,
    sp.danh_muc,
    sp.thuong_hieu,
    sp.size,
    sp.mau,
    sp.gia_nhap,
    sp.gia_ban,
    sp.ton_kho,
    sp.trang_thai,
    sp.link_san_pham,
    sp.ghi_chu,
    sp.ngay_tao,
    COUNT(btsp.id) AS so_bien_the
FROM tbl_san_pham sp
LEFT JOIN tbl_bien_the_san_pham btsp ON btsp.product_id = sp.id AND btsp.is_deleted = 0
WHERE sp.is_deleted = 0
GROUP BY
    sp.id, sp.ten_san_pham, sp.sku, sp.danh_muc, sp.thuong_hieu, sp.size, sp.mau,
    sp.gia_nhap, sp.gia_ban, sp.ton_kho, sp.trang_thai, sp.link_san_pham, sp.ghi_chu, sp.ngay_tao;

CREATE OR REPLACE VIEW view_bang_khach_hang AS
SELECT
    kh.id,
    kh.ten_khach,
    kh.sdt,
    kh.email,
    kh.kenh,
    kh.nhan,
    kh.dia_chi,
    kh.ghi_chu,
    kh.tong_chi_tieu,
    kh.hang_khach_hang,
    kh.ngay_tao
FROM tbl_khach_hang kh
WHERE kh.is_deleted = 0;

CREATE OR REPLACE VIEW view_bang_don_hang AS
SELECT
    dh.id,
    dh.ma_don,
    dh.ngay_dat,
    kh.ten_khach,
    dh.trang_thai_don,
    dh.thanh_toan,
    dh.da_thanh_toan,
    dh.tong_tien,
    dh.phi_ship,
    dh.giam_gia,
    dh.dia_chi_giao,
    dh.ghi_chu,
    dh.ngay_tao
FROM tbl_don_hang dh
JOIN tbl_khach_hang kh ON kh.id = dh.customer_id
WHERE dh.is_deleted = 0;

CREATE OR REPLACE VIEW view_ton_kho_theo_bien_the AS
SELECT
    sp.id AS product_id,
    sp.ten_san_pham,
    btsp.id AS variant_id,
    btsp.sku_bien_the,
    btsp.size,
    btsp.mau,
    btsp.ton_kho_hien_tai,
    btsp.gia_ban,
    btsp.trang_thai
FROM tbl_bien_the_san_pham btsp
JOIN tbl_san_pham sp ON sp.id = btsp.product_id
WHERE btsp.is_deleted = 0 AND sp.is_deleted = 0;

INSERT INTO tbl_nguoi_dung (
    id, username, password, role, ho_ten, email, avatar_url, trang_thai,
    lan_dang_nhap_cuoi, ngay_tao, ngay_cap_nhat, is_deleted
)
VALUES
    ('user-admin-001', 'admin', '$2a$10$yCPiRjbKafwJ0Lh5802sMuLDiCn.PJtA3WW4gCAeXowC6xV7jjrlu', 'Quản trị viên', 'Hệ Thống', 'admin@flarefitness.com', NULL, 'Đang hoạt động', NULL, '2026-04-18 08:00:00', '2026-04-18 08:00:00', 0),
    ('user-staff-001', 'nhanvien01', '$2a$10$tsHqWuYvzLI2jA6GonaWu.ysxEC4nNh9wVIMubsdkrxYdrP1mRdNO', 'Nhân viên', 'Nguyễn Nhân Viên', 'nv01@flarefitness.com', NULL, 'Đang hoạt động', NULL, '2026-04-18 08:05:00', '2026-04-18 08:05:00', 0),
    ('user-customer-001', 'khachhang01', '$2a$10$.2gKv0ngr3Aez7VinUrROODe/TiSgR6/2cjmcdMenmcJ7hZzfp78e', 'Khách hàng', 'Nguyễn Văn A', 'nguyenvana@email.com', NULL, 'Đang hoạt động', NULL, '2026-04-18 08:10:00', '2026-04-18 08:10:00', 0),
    ('user-customer-002', 'khachhang02', '$2a$10$7BixmDZTk7srPoAzxwKj2.FpYE5qkHPfVBBl/gI9ZHq6b8lZaWIXi', 'Khách hàng', 'Trần Thị B', 'tranthib@email.com', NULL, 'Đang hoạt động', NULL, '2026-04-18 08:12:00', '2026-04-18 08:12:00', 0)
ON DUPLICATE KEY UPDATE
    password = VALUES(password),
    role = VALUES(role),
    ho_ten = VALUES(ho_ten),
    email = VALUES(email),
    trang_thai = VALUES(trang_thai),
    is_deleted = VALUES(is_deleted);

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

INSERT INTO tbl_khach_hang (
    id, user_id, ten_khach, sdt, email, kenh, nhan, dia_chi, ghi_chu,
    tong_chi_tieu, hang_khach_hang, ngay_tao, ngay_cap_nhat, is_deleted
)
VALUES
    ('customer-001', 'user-customer-001', 'NguyĂ¡Â»â€¦n VĂ„Æ’n A', '0901234567', 'nguyenvana@email.com', 'Website', 'VIP', '123 Ă„ÂĂ†Â°Ă¡Â»Âng LÄ‚Âª LĂ¡Â»Â£i, QuĂ¡ÂºÂ­n 1, TP.HCM', 'KhÄ‚Â¡ch hÄ‚Â ng thÄ‚Â¢n thiĂ¡ÂºÂ¿t', 1590000, 'VÄ‚Â ng', '2026-04-18 08:15:00', '2026-04-18 08:15:00', 0),
    ('customer-002', 'user-customer-002', 'TrĂ¡ÂºÂ§n ThĂ¡Â»â€¹ B', '0987654321', 'tranthib@email.com', 'Facebook', 'MĂ¡Â»â€ºi', '456 Ă„ÂĂ†Â°Ă¡Â»Âng NguyĂ¡Â»â€¦n HuĂ¡Â»â€¡, QuĂ¡ÂºÂ­n 2, TP.HCM', '', 570000, 'BĂ¡ÂºÂ¡c', '2026-04-18 08:20:00', '2026-04-18 08:20:00', 0),
    ('customer-003', NULL, 'LÄ‚Âª VĂ„Æ’n C', '0911222333', 'levanc@email.com', 'Shopee', 'Quay lĂ¡ÂºÂ¡i', '789 Ă„ÂĂ†Â°Ă¡Â»Âng TrĂ¡ÂºÂ§n PhÄ‚Âº, QuĂ¡ÂºÂ­n 3, TP.HCM', 'KhÄ‚Â¡ch mua khÄ‚Â´ng tĂ¡ÂºÂ¡o tÄ‚Â i khoĂ¡ÂºÂ£n', 0, 'ThĂ†Â°Ă¡Â»Âng', '2026-04-18 08:25:00', '2026-04-18 08:25:00', 0)
ON DUPLICATE KEY UPDATE
    user_id = VALUES(user_id),
    ten_khach = VALUES(ten_khach),
    sdt = VALUES(sdt),
    email = VALUES(email),
    kenh = VALUES(kenh),
    nhan = VALUES(nhan),
    dia_chi = VALUES(dia_chi),
    ghi_chu = VALUES(ghi_chu),
    tong_chi_tieu = VALUES(tong_chi_tieu),
    hang_khach_hang = VALUES(hang_khach_hang),
    is_deleted = VALUES(is_deleted);

INSERT INTO tbl_san_pham (
    id, ten_san_pham, sku, danh_muc, thuong_hieu, size, mau, gia_nhap, gia_ban,
    ton_kho, trang_thai, link_san_pham, hinh_anh_url, mo_ta_ngan, ghi_chu,
    ngay_tao, ngay_cap_nhat, is_deleted
)
VALUES
    ('product-001', 'GiÄ‚Â y bÄ‚Â³ng Ă„â€˜Ä‚Â¡ cĂ¡Â»Â nhÄ‚Â¢n tĂ¡ÂºÂ¡o Nike', 'FB-001', 'BÄ‚Â³ng Ă„â€˜Ä‚Â¡', 'Nike', '42-43', 'Xanh / TrĂ¡ÂºÂ¯ng xanh', 850000, 1250000, 10, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'DÄ‚Â²ng chuyÄ‚Âªn dĂ¡Â»Â¥ng cho sÄ‚Â¢n cĂ¡Â»Â nhÄ‚Â¢n tĂ¡ÂºÂ¡o.', 'MĂ¡ÂºÂ«u chĂ¡Â»Â§ lĂ¡Â»Â±c cho danh mĂ¡Â»Â¥c bÄ‚Â³ng Ă„â€˜Ä‚Â¡', '2026-04-18 08:30:00', '2026-04-18 08:30:00', 0),
    ('product-002', 'Ä‚Âo Ă„â€˜Ă¡ÂºÂ¥u CLB Manchester City 2024', 'FB-003', 'BÄ‚Â³ng Ă„â€˜Ä‚Â¡', 'Puma', 'M-L', 'Xanh dĂ†Â°Ă†Â¡ng', 300000, 550000, 25, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'ChĂ¡ÂºÂ¥t liĂ¡Â»â€¡u thoÄ‚Â¡ng khÄ‚Â­, mĂ¡ÂºÂ·c thi Ă„â€˜Ă¡ÂºÂ¥u vÄ‚Â  tĂ¡ÂºÂ­p luyĂ¡Â»â€¡n.', '', '2026-04-18 08:31:00', '2026-04-18 08:31:00', 0),
    ('product-003', 'BÄ‚Â³ng rĂ¡Â»â€¢ Spalding NBA', 'BB-002', 'BÄ‚Â³ng rĂ¡Â»â€¢', 'Spalding', 'SĂ¡Â»â€˜ 7', 'Cam', 400000, 650000, 15, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'BÄ‚Â³ng tiÄ‚Âªu chuĂ¡ÂºÂ©n dÄ‚Â¹ng cho tĂ¡ÂºÂ­p luyĂ¡Â»â€¡n vÄ‚Â  thi Ă„â€˜Ă¡ÂºÂ¥u phong trÄ‚Â o.', '', '2026-04-18 08:32:00', '2026-04-18 08:32:00', 0),
    ('product-004', 'VĂ¡Â»Â£t cĂ¡ÂºÂ§u lÄ‚Â´ng Yonex Astrox', 'BM-001', 'CĂ¡ÂºÂ§u lÄ‚Â´ng', 'Yonex', '4U-G5', 'Ă„Âen xanh', 1200000, 1850000, 8, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'VĂ¡Â»Â£t cÄ‚Â´ng thĂ¡Â»Â§ toÄ‚Â n diĂ¡Â»â€¡n, phÄ‚Â¹ hĂ¡Â»Â£p ngĂ†Â°Ă¡Â»Âi chĂ†Â¡i trung cĂ¡ÂºÂ¥p.', 'SiÄ‚Âªu nhĂ¡ÂºÂ¹, thoÄ‚Â¡t cĂ¡ÂºÂ§u nhanh', '2026-04-18 08:33:00', '2026-04-18 08:33:00', 0),
    ('product-005', 'BÄ‚Â³ng chuyĂ¡Â»Ân hĂ†Â¡i Ă„ÂĂ¡Â»â„¢ng LĂ¡Â»Â±c', 'VB-001', 'BÄ‚Â³ng chuyĂ¡Â»Ân', 'Ă„ÂĂ¡Â»â„¢ng LĂ¡Â»Â±c', 'TiÄ‚Âªu chuĂ¡ÂºÂ©n / MĂ¡Â»Âm', 'VÄ‚Â ng xanh', 80000, 120000, 30, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'DÄ‚Â²ng bÄ‚Â³ng chuyĂ¡Â»Ân hĂ†Â¡i phĂ¡Â»â€¢ biĂ¡ÂºÂ¿n cho sÄ‚Â¢n trĂ†Â°Ă¡Â»Âng vÄ‚Â  CLB.', '', '2026-04-18 08:34:00', '2026-04-18 08:34:00', 0),
    ('product-006', 'VĂ¡Â»Â£t bÄ‚Â³ng bÄ‚Â n 7 lĂ¡Â»â€ºp gĂ¡Â»â€”', 'TT-001', 'BÄ‚Â³ng bÄ‚Â n', '729-Focus', 'TiÄ‚Âªu chuĂ¡ÂºÂ©n', 'Ă„ÂĂ¡Â»Â Ă„â€˜en', 250000, 450000, 10, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'PhÄ‚Â¹ hĂ¡Â»Â£p ngĂ†Â°Ă¡Â»Âi mĂ¡Â»â€ºi tĂ¡ÂºÂ­p chĂ†Â¡i, cĂ¡ÂºÂ£m giÄ‚Â¡c bÄ‚Â³ng Ă¡Â»â€¢n Ă„â€˜Ă¡Â»â€¹nh.', 'DÄ‚Â nh cho ngĂ†Â°Ă¡Â»Âi mĂ¡Â»â€ºi tĂ¡ÂºÂ­p chĂ†Â¡i', '2026-04-18 08:35:00', '2026-04-18 08:35:00', 0)
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
    mo_ta_ngan = VALUES(mo_ta_ngan),
    ghi_chu = VALUES(ghi_chu),
    is_deleted = VALUES(is_deleted);

INSERT INTO tbl_san_pham (
    id, ten_san_pham, sku, danh_muc, thuong_hieu, size, mau, gia_nhap, gia_ban,
    ton_kho, trang_thai, link_san_pham, hinh_anh_url, mo_ta_ngan, ghi_chu,
    ngay_tao, ngay_cap_nhat, is_deleted
)
VALUES
    ('product-007', 'GiÄ‚Â y bÄ‚Â³ng Ă„â€˜Ä‚Â¡ Nike Tiempo Legend 10 Academy TF', 'FB-007', 'BÄ‚Â³ng Ă„â€˜Ä‚Â¡', 'Nike', '41-43', 'Ă„Âen / Xanh ngĂ¡Â»Âc', 1150000, 1690000, 16, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'MĂ¡ÂºÂ«u giÄ‚Â y sÄ‚Â¢n cĂ¡Â»Â nhÄ‚Â¢n tĂ¡ÂºÂ¡o thuĂ¡Â»â„¢c dÄ‚Â²ng Tiempo Legend 10 Academy.', 'Seed theo dÄ‚Â²ng sĂ¡ÂºÂ£n phĂ¡ÂºÂ©m Nike chÄ‚Â­nh hÄ‚Â£ng.', '2026-04-19 08:00:00', '2026-04-19 08:00:00', 0),
    ('product-008', 'GiÄ‚Â y bÄ‚Â³ng Ă„â€˜Ä‚Â¡ Nike Mercurial Vapor 16 Academy TF', 'FB-008', 'BÄ‚Â³ng Ă„â€˜Ä‚Â¡', 'Nike', '40-43', 'TrĂ¡ÂºÂ¯ng / HĂ¡Â»â€œng', 1250000, 1820000, 14, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'DÄ‚Â²ng Mercurial Vapor 16 Academy cho ngĂ†Â°Ă¡Â»Âi chĂ†Â¡i tĂ¡Â»â€˜c Ă„â€˜Ă¡Â»â„¢.', 'PhÄ‚Â¹ hĂ¡Â»Â£p khÄ‚Â¡ch hÄ‚Â ng Ă„â€˜Ä‚Â¡ phĂ¡Â»Â§i sÄ‚Â¢n cĂ¡Â»Â nhÄ‚Â¢n tĂ¡ÂºÂ¡o.', '2026-04-19 08:01:00', '2026-04-19 08:01:00', 0),
    ('product-009', 'GiÄ‚Â y bÄ‚Â³ng Ă„â€˜Ä‚Â¡ Nike Phantom GX 2 Academy TF', 'FB-009', 'BÄ‚Â³ng Ă„â€˜Ä‚Â¡', 'Nike', '40-43', 'Xanh lam / TrĂ¡ÂºÂ¯ng', 1280000, 1890000, 12, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'Phantom GX 2 Academy bĂ¡ÂºÂ£n turf cho kiĂ¡Â»Æ’m soÄ‚Â¡t bÄ‚Â³ng.', 'MĂ¡ÂºÂ·t upper bÄ‚Â¡m bÄ‚Â³ng tĂ¡Â»â€˜t.', '2026-04-19 08:02:00', '2026-04-19 08:02:00', 0),
    ('product-010', 'GiÄ‚Â y bÄ‚Â³ng Ă„â€˜Ä‚Â¡ adidas Predator League Turf', 'FB-010', 'BÄ‚Â³ng Ă„â€˜Ä‚Â¡', 'adidas', '40-43', 'Ă„ÂĂ¡Â»Â / Ă„Âen', 1350000, 1980000, 13, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'Predator League Turf dÄ‚Â nh cho sÄ‚Â¢n cĂ¡Â»Â nhÄ‚Â¢n tĂ¡ÂºÂ¡o.', 'DÄ‚Â²ng giÄ‚Â y kiĂ¡Â»Æ’m soÄ‚Â¡t bÄ‚Â³ng cĂ¡Â»Â§a adidas.', '2026-04-19 08:03:00', '2026-04-19 08:03:00', 0),
    ('product-011', 'GiÄ‚Â y bÄ‚Â³ng Ă„â€˜Ä‚Â¡ adidas F50 League Turf', 'FB-011', 'BÄ‚Â³ng Ă„â€˜Ä‚Â¡', 'adidas', '40-43', 'TrĂ¡ÂºÂ¯ng / Xanh', 1320000, 1940000, 11, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'F50 League Turf thiÄ‚Âªn vĂ¡Â»Â tĂ¡Â»â€˜c Ă„â€˜Ă¡Â»â„¢ vÄ‚Â  tĂ„Æ’ng tĂ¡Â»â€˜c.', 'Seed theo mĂ¡ÂºÂ«u F50 League hiĂ¡Â»â€¡n hÄ‚Â nh.', '2026-04-19 08:04:00', '2026-04-19 08:04:00', 0),
    ('product-012', 'GiÄ‚Â y bÄ‚Â³ng Ă„â€˜Ä‚Â¡ adidas Copa Pure 3 League Turf', 'FB-012', 'BÄ‚Â³ng Ă„â€˜Ä‚Â¡', 'adidas', '40-43', 'TrĂ¡ÂºÂ¯ng / Ă„Âen', 1360000, 1990000, 10, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'Copa Pure 3 League Turf cho cĂ¡ÂºÂ£m giÄ‚Â¡c bÄ‚Â³ng Ä‚Âªm chÄ‚Â¢n.', 'PhÄ‚Â¢n khÄ‚Âºc trung cĂ¡ÂºÂ¥p dĂ¡Â»â€¦ bÄ‚Â¡n.', '2026-04-19 08:05:00', '2026-04-19 08:05:00', 0),
    ('product-013', 'GiÄ‚Â y bÄ‚Â³ng Ă„â€˜Ä‚Â¡ Puma Future 7 Play TT', 'FB-013', 'BÄ‚Â³ng Ă„â€˜Ä‚Â¡', 'Puma', '40-43', 'Xanh navy / BĂ¡ÂºÂ¡c', 990000, 1490000, 15, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'Future 7 Play TT lÄ‚Â  mĂ¡ÂºÂ«u giÄ‚Â y turf phĂ¡Â»â€¢ biĂ¡ÂºÂ¿n cĂ¡Â»Â§a Puma.', 'DĂ¡Â»â€¦ phĂ¡Â»â€˜i vĂ¡Â»â€ºi Ä‚Â¡o Ă„â€˜Ă¡ÂºÂ¥u CLB.', '2026-04-19 08:06:00', '2026-04-19 08:06:00', 0),
    ('product-014', 'GiÄ‚Â y bÄ‚Â³ng Ă„â€˜Ä‚Â¡ Puma Ultra 5 Play TT', 'FB-014', 'BÄ‚Â³ng Ă„â€˜Ä‚Â¡', 'Puma', '40-43', 'VÄ‚Â ng / Ă„Âen', 980000, 1450000, 17, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'Ultra 5 Play TT thiÄ‚Âªn vĂ¡Â»Â tĂ¡Â»â€˜c Ă„â€˜Ă¡Â»â„¢ vÄ‚Â  trĂ¡Â»Âng lĂ†Â°Ă¡Â»Â£ng nhĂ¡ÂºÂ¹.', 'PhÄ‚Â¹ hĂ¡Â»Â£p ngĂ†Â°Ă¡Â»Âi chĂ†Â¡i phong trÄ‚Â o.', '2026-04-19 08:07:00', '2026-04-19 08:07:00', 0),
    ('product-015', 'GiÄ‚Â y bÄ‚Â³ng Ă„â€˜Ä‚Â¡ Mizuno Monarcida Neo III Select AS', 'FB-015', 'BÄ‚Â³ng Ă„â€˜Ä‚Â¡', 'Mizuno', '40-43', 'TrĂ¡ÂºÂ¯ng / Ă„ÂĂ¡Â»Â', 1450000, 2190000, 9, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'Monarcida Neo III Select AS lÄ‚Â  mĂ¡ÂºÂ«u AS phĂ¡Â»â€¢ biĂ¡ÂºÂ¿n cĂ¡Â»Â§a Mizuno.', 'Form giÄ‚Â y Ä‚Â´m vĂ¡Â»Â«a chÄ‚Â¢n chÄ‚Â¢u Ä‚Â.', '2026-04-19 08:08:00', '2026-04-19 08:08:00', 0),
    ('product-016', 'BÄ‚Â³ng Ă„â€˜Ä‚Â¡ Select Numero 10', 'FB-016', 'BÄ‚Â³ng Ă„â€˜Ä‚Â¡', 'Select', 'SĂ¡Â»â€˜ 5', 'TrĂ¡ÂºÂ¯ng / Xanh', 690000, 990000, 18, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'BÄ‚Â³ng thi Ă„â€˜Ă¡ÂºÂ¥u vÄ‚Â  tĂ¡ÂºÂ­p luyĂ¡Â»â€¡n nĂ¡Â»â€¢i tiĂ¡ÂºÂ¿ng cĂ¡Â»Â§a Select.', 'MĂ¡ÂºÂ«u bÄ‚Â³ng rĂ¡ÂºÂ¥t phĂ¡Â»â€¢ biĂ¡ÂºÂ¿n trÄ‚Âªn thĂ¡Â»â€¹ trĂ†Â°Ă¡Â»Âng.', '2026-04-19 08:09:00', '2026-04-19 08:09:00', 0),
    ('product-017', 'Ä‚Âo tĂ¡ÂºÂ­p bÄ‚Â³ng Ă„â€˜Ä‚Â¡ Nike Dri-FIT Academy 23', 'FB-017', 'BÄ‚Â³ng Ă„â€˜Ä‚Â¡', 'Nike', 'M-L', 'Ă„Âen', 280000, 450000, 20, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'Ä‚Âo tĂ¡ÂºÂ­p dÄ‚Â²ng Academy 23 dÄ‚Â¹ng vĂ¡ÂºÂ£i Dri-FIT.', 'CÄ‚Â³ thĂ¡Â»Æ’ bÄ‚Â¡n kÄ‚Â¨m quĂ¡ÂºÂ§n training.', '2026-04-19 08:10:00', '2026-04-19 08:10:00', 0),
    ('product-018', 'Ä‚Âo tĂ¡ÂºÂ­p bÄ‚Â³ng Ă„â€˜Ä‚Â¡ adidas Tiro 24 Training Jersey', 'FB-018', 'BÄ‚Â³ng Ă„â€˜Ä‚Â¡', 'adidas', 'M-L', 'Xanh navy', 290000, 470000, 18, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'Ä‚Âo training thuĂ¡Â»â„¢c bĂ¡Â»â„¢ sĂ†Â°u tĂ¡ÂºÂ­p Tiro 24.', 'MĂ¡ÂºÂ«u Ä‚Â¡o tĂ¡ÂºÂ­p dĂ¡Â»â€¦ lÄ‚Âªn combo Ă„â€˜Ă¡Â»â„¢i nhÄ‚Â³m.', '2026-04-19 08:11:00', '2026-04-19 08:11:00', 0),
    ('product-019', 'Ä‚Âo bÄ‚Â³ng Ă„â€˜Ä‚Â¡ Puma teamLIGA Jersey', 'FB-019', 'BÄ‚Â³ng Ă„â€˜Ä‚Â¡', 'Puma', 'M-L', 'TrĂ¡ÂºÂ¯ng / Ă„Âen', 250000, 390000, 22, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'Ä‚Âo jersey teamLIGA dÄ‚Â¹ng cÄ‚Â´ng nghĂ¡Â»â€¡ dryCELL.', 'DĂ¡Â»â€¦ bÄ‚Â¡n cho Ă„â€˜Ă¡Â»â„¢i bÄ‚Â³ng phong trÄ‚Â o.', '2026-04-19 08:12:00', '2026-04-19 08:12:00', 0),
    ('product-020', 'Ä‚Âo khoÄ‚Â¡c bÄ‚Â³ng Ă„â€˜Ä‚Â¡ Nike Dri-FIT Academy 23 Drill Top', 'FB-020', 'BÄ‚Â³ng Ă„â€˜Ä‚Â¡', 'Nike', 'M-L', 'XÄ‚Â¡m / Ă„Âen', 480000, 790000, 12, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'Drill top Academy 23 dÄ‚Â¹ng cho khĂ¡Â»Å¸i Ă„â€˜Ă¡Â»â„¢ng vÄ‚Â  tĂ¡ÂºÂ­p luyĂ¡Â»â€¡n.', 'CÄ‚Â³ khÄ‚Â³a kÄ‚Â©o 1/4 tiĂ¡Â»â€¡n dĂ¡Â»Â¥ng.', '2026-04-19 08:13:00', '2026-04-19 08:13:00', 0),
    ('product-021', 'QuĂ¡ÂºÂ§n tĂ¡ÂºÂ­p bÄ‚Â³ng Ă„â€˜Ä‚Â¡ adidas Tiro 24 Training Pants', 'FB-021', 'BÄ‚Â³ng Ă„â€˜Ä‚Â¡', 'adidas', 'M-L', 'Ă„Âen', 420000, 690000, 14, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'QuĂ¡ÂºÂ§n training thuĂ¡Â»â„¢c dÄ‚Â²ng Tiro 24 vĂ¡Â»â€ºi Ă¡Â»â€˜ng khÄ‚Â³a kÄ‚Â©o.', 'BÄ‚Â¡n tĂ¡Â»â€˜t theo set Ä‚Â¡o quĂ¡ÂºÂ§n training.', '2026-04-19 08:14:00', '2026-04-19 08:14:00', 0),
    ('product-022', 'QuĂ¡ÂºÂ§n tĂ¡ÂºÂ­p bÄ‚Â³ng Ă„â€˜Ä‚Â¡ Puma teamLIGA Training Pants', 'FB-022', 'BÄ‚Â³ng Ă„â€˜Ä‚Â¡', 'Puma', 'M-L', 'Ă„Âen', 350000, 590000, 16, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'QuĂ¡ÂºÂ§n training teamLIGA cho nhu cĂ¡ÂºÂ§u tĂ¡ÂºÂ­p luyĂ¡Â»â€¡n hĂ¡ÂºÂ±ng ngÄ‚Â y.', 'Seed theo line teamLIGA cĂ¡Â»Â§a Puma.', '2026-04-19 08:15:00', '2026-04-19 08:15:00', 0),
    ('product-023', 'Balo bÄ‚Â³ng Ă„â€˜Ä‚Â¡ Nike Academy Team Backpack', 'FB-023', 'BÄ‚Â³ng Ă„â€˜Ä‚Â¡', 'Nike', '22L', 'Ă„Âen / TrĂ¡ÂºÂ¯ng', 420000, 690000, 13, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'Balo thĂ¡Â»Æ’ thao thuĂ¡Â»â„¢c dÄ‚Â²ng Academy Team Backpack.', 'PhÄ‚Â¹ hĂ¡Â»Â£p hĂ¡Â»Âc sinh sinh viÄ‚Âªn Ă„â€˜Ä‚Â¡ bÄ‚Â³ng.', '2026-04-19 08:16:00', '2026-04-19 08:16:00', 0),
    ('product-024', 'TÄ‚Âºi trĂ¡Â»â€˜ng bÄ‚Â³ng Ă„â€˜Ä‚Â¡ adidas Tiro League Duffel Bag Medium', 'FB-024', 'BÄ‚Â³ng Ă„â€˜Ä‚Â¡', 'adidas', 'M', 'Ă„Âen', 520000, 850000, 9, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'Duffel bag thuĂ¡Â»â„¢c dÄ‚Â²ng Tiro League kÄ‚Â­ch thĂ†Â°Ă¡Â»â€ºc trung bÄ‚Â¬nh.', 'DĂ¡Â»â€¦ bÄ‚Â¡n cho Ă„â€˜Ă¡Â»â„¢i bÄ‚Â³ng vÄ‚Â  ngĂ†Â°Ă¡Â»Âi tĂ¡ÂºÂ­p gym.', '2026-04-19 08:17:00', '2026-04-19 08:17:00', 0),
    ('product-025', 'Ă¡Â»Âng Ă„â€˜Ă¡Â»â€œng bÄ‚Â³ng Ă„â€˜Ä‚Â¡ Nike Guard Lock Elite', 'FB-025', 'BÄ‚Â³ng Ă„â€˜Ä‚Â¡', 'Nike', 'M', 'TrĂ¡ÂºÂ¯ng / Ă„Âen', 390000, 620000, 19, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'Ă¡Â»Âng Ă„â€˜Ă¡Â»â€œng Guard Lock Elite cho ngĂ†Â°Ă¡Â»Âi chĂ†Â¡i bÄ‚Â³ng Ă„â€˜Ä‚Â¡.', 'PhĂ¡Â»Â¥ kiĂ¡Â»â€¡n bÄ‚Â¡n kÄ‚Â¨m giÄ‚Â y khÄ‚Â¡ Ă¡Â»â€¢n.', '2026-04-19 08:18:00', '2026-04-19 08:18:00', 0),
    ('product-026', 'GĂ„Æ’ng tay thĂ¡Â»Â§ mÄ‚Â´n adidas Predator Training', 'FB-026', 'BÄ‚Â³ng Ă„â€˜Ä‚Â¡', 'adidas', 'Size 9', 'Ă„Âen / Ă„ÂĂ¡Â»Â', 510000, 820000, 8, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'GĂ„Æ’ng tay thĂ¡Â»Â§ mÄ‚Â´n Predator Training dÄ‚Â¹ng cho tĂ¡ÂºÂ­p luyĂ¡Â»â€¡n.', 'BĂ¡Â»â€¢ sung nhÄ‚Â³m phĂ¡Â»Â¥ kiĂ¡Â»â€¡n thĂ¡Â»Â§ mÄ‚Â´n.', '2026-04-19 08:19:00', '2026-04-19 08:19:00', 0),

    ('product-027', 'VĂ¡Â»Â£t bÄ‚Â³ng bÄ‚Â n Butterfly Timo Boll CF 1000', 'TT-007', 'BÄ‚Â³ng bÄ‚Â n', 'Butterfly', 'TiÄ‚Âªu chuĂ¡ÂºÂ©n', 'Ă„ÂĂ¡Â»Â / Ă„Âen', 550000, 890000, 12, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'VĂ¡Â»Â£t lĂ¡ÂºÂ¯p sĂ¡ÂºÂµn thuĂ¡Â»â„¢c dÄ‚Â²ng Timo Boll CF 1000 cĂ¡Â»Â§a Butterfly.', 'MĂ¡ÂºÂ«u racket phĂ¡Â»â€¢ biĂ¡ÂºÂ¿n cho ngĂ†Â°Ă¡Â»Âi mĂ¡Â»â€ºi nÄ‚Â¢ng cao.', '2026-04-19 08:20:00', '2026-04-19 08:20:00', 0),
    ('product-028', 'VĂ¡Â»Â£t bÄ‚Â³ng bÄ‚Â n Butterfly Timo Boll CF 2000', 'TT-008', 'BÄ‚Â³ng bÄ‚Â n', 'Butterfly', 'TiÄ‚Âªu chuĂ¡ÂºÂ©n', 'Ă„ÂĂ¡Â»Â / Ă„Âen', 720000, 1150000, 10, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'Timo Boll CF 2000 lÄ‚Â  mĂ¡ÂºÂ«u racket recreational cao hĂ†Â¡n CF 1000.', 'ThuĂ¡Â»â„¢c line real trÄ‚Âªn Butterfly.', '2026-04-19 08:21:00', '2026-04-19 08:21:00', 0),
    ('product-029', 'VĂ¡Â»Â£t bÄ‚Â³ng bÄ‚Â n Butterfly Addoy 2000', 'TT-009', 'BÄ‚Â³ng bÄ‚Â n', 'Butterfly', 'TiÄ‚Âªu chuĂ¡ÂºÂ©n', 'Ă„ÂĂ¡Â»Â / Ă„Âen', 430000, 690000, 11, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'Addoy 2000 lÄ‚Â  vĂ¡Â»Â£t bÄ‚Â³ng bÄ‚Â n lĂ¡ÂºÂ¯p sĂ¡ÂºÂµn phÄ‚Â¹ hĂ¡Â»Â£p ngĂ†Â°Ă¡Â»Âi mĂ¡Â»â€ºi chĂ†Â¡i.', 'MĂ¡ÂºÂ«u recreational dĂ¡Â»â€¦ bÄ‚Â¡n.', '2026-04-19 08:22:00', '2026-04-19 08:22:00', 0),
    ('product-030', 'VĂ¡Â»Â£t bÄ‚Â³ng bÄ‚Â n Butterfly Wakaba 3000', 'TT-010', 'BÄ‚Â³ng bÄ‚Â n', 'Butterfly', 'TiÄ‚Âªu chuĂ¡ÂºÂ©n', 'Ă„ÂĂ¡Â»Â / Ă„Âen', 680000, 1090000, 9, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'Wakaba 3000 lÄ‚Â  vĂ¡Â»Â£t lĂ¡ÂºÂ¯p sĂ¡ÂºÂµn hĂ†Â°Ă¡Â»â€ºng tĂ¡Â»â€ºi ngĂ†Â°Ă¡Â»Âi chĂ†Â¡i trung cĂ¡ÂºÂ¥p.', 'MĂ¡ÂºÂ«u thĂ¡Â»Â±c tĂ¡ÂºÂ¿ trÄ‚Âªn catalog Butterfly.', '2026-04-19 08:23:00', '2026-04-19 08:23:00', 0),
    ('product-031', 'VĂ¡Â»Â£t bÄ‚Â³ng bÄ‚Â n DHS 4002', 'TT-011', 'BÄ‚Â³ng bÄ‚Â n', 'DHS', 'TiÄ‚Âªu chuĂ¡ÂºÂ©n', 'Ă„ÂĂ¡Â»Â / Ă„Âen', 320000, 520000, 15, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'DHS 4002 lÄ‚Â  mĂ¡ÂºÂ«u vĂ¡Â»Â£t dĂ¡Â»Â±ng sĂ¡ÂºÂµn rĂ¡ÂºÂ¥t phĂ¡Â»â€¢ biĂ¡ÂºÂ¿n trÄ‚Âªn sÄ‚Â n TMĂ„ÂT.', 'PhÄ‚Â¹ hĂ¡Â»Â£p tĂ¡Â»â€¡p khÄ‚Â¡ch beginner.', '2026-04-19 08:24:00', '2026-04-19 08:24:00', 0),
    ('product-032', 'VĂ¡Â»Â£t bÄ‚Â³ng bÄ‚Â n DHS 3002', 'TT-012', 'BÄ‚Â³ng bÄ‚Â n', 'DHS', 'TiÄ‚Âªu chuĂ¡ÂºÂ©n', 'Ă„ÂĂ¡Â»Â / Ă„Âen', 250000, 420000, 17, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'DHS 3002 lÄ‚Â  lĂ¡Â»Â±a chĂ¡Â»Ân entry-level cĂ¡Â»Â§a DHS.', 'ThĂ†Â°Ă¡Â»Âng bÄ‚Â¡n theo set kÄ‚Â¨m bÄ‚Â³ng.', '2026-04-19 08:25:00', '2026-04-19 08:25:00', 0),
    ('product-033', 'VĂ¡Â»Â£t bÄ‚Â³ng bÄ‚Â n 729 Focus 1', 'TT-013', 'BÄ‚Â³ng bÄ‚Â n', '729', 'TiÄ‚Âªu chuĂ¡ÂºÂ©n', 'Ă„ÂĂ¡Â»Â / Ă„Âen', 260000, 450000, 14, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'DÄ‚Â²ng 729 Focus 1 Ă„â€˜Ă†Â°Ă¡Â»Â£c bÄ‚Â¡n rĂ¡Â»â„¢ng rÄ‚Â£i cho ngĂ†Â°Ă¡Â»Âi mĂ¡Â»â€ºi tĂ¡ÂºÂ­p.', 'GiÄ‚Â¡ mĂ¡Â»Âm dĂ¡Â»â€¦ quay vÄ‚Â²ng tĂ¡Â»â€œn kho.', '2026-04-19 08:26:00', '2026-04-19 08:26:00', 0),
    ('product-034', 'VĂ¡Â»Â£t bÄ‚Â³ng bÄ‚Â n STIGA Pro Carbon+', 'TT-014', 'BÄ‚Â³ng bÄ‚Â n', 'STIGA', 'TiÄ‚Âªu chuĂ¡ÂºÂ©n', 'Ă„Âen / Ă„ÂĂ¡Â»Â', 1650000, 2490000, 7, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'STIGA Pro Carbon+ lÄ‚Â  mĂ¡ÂºÂ«u vĂ¡Â»Â£t offensive 5 sao.', 'PhÄ‚Â¢n khÄ‚Âºc cao hĂ†Â¡n cho ngĂ†Â°Ă¡Â»Âi chĂ†Â¡i nghiÄ‚Âªm tÄ‚Âºc.', '2026-04-19 08:27:00', '2026-04-19 08:27:00', 0),
    ('product-035', 'VĂ¡Â»Â£t bÄ‚Â³ng bÄ‚Â n Donic Waldner 700', 'TT-015', 'BÄ‚Â³ng bÄ‚Â n', 'Donic', 'TiÄ‚Âªu chuĂ¡ÂºÂ©n', 'Ă„ÂĂ¡Â»Â / Ă„Âen', 650000, 990000, 8, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'Donic Waldner 700 lÄ‚Â  vĂ¡Â»Â£t lĂ¡ÂºÂ¯p sĂ¡ÂºÂµn quen thuĂ¡Â»â„¢c cĂ¡Â»Â§a Donic.', 'TÄ‚Âªn sĂ¡ÂºÂ£n phĂ¡ÂºÂ©m cÄ‚Â³ trÄ‚Âªn nhiĂ¡Â»Âu sÄ‚Â n TMĂ„ÂT.', '2026-04-19 08:28:00', '2026-04-19 08:28:00', 0),
    ('product-036', 'VĂ¡Â»Â£t bÄ‚Â³ng bÄ‚Â n JOOLA Rosskopf Classic', 'TT-016', 'BÄ‚Â³ng bÄ‚Â n', 'JOOLA', 'TiÄ‚Âªu chuĂ¡ÂºÂ©n', 'Ă„ÂĂ¡Â»Â / Ă„Âen', 520000, 850000, 10, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'Rosskopf Classic lÄ‚Â  mĂ¡ÂºÂ«u vĂ¡Â»Â£t competition-level cĂ¡Â»Â§a JOOLA.', 'TÄ‚Âªn sĂ¡ÂºÂ£n phĂ¡ÂºÂ©m xÄ‚Â¡c thĂ¡Â»Â±c trÄ‚Âªn JOOLA USA.', '2026-04-19 08:29:00', '2026-04-19 08:29:00', 0),
    ('product-037', 'MĂ¡ÂºÂ·t vĂ¡Â»Â£t bÄ‚Â³ng bÄ‚Â n Butterfly Tenergy 05', 'TT-017', 'BÄ‚Â³ng bÄ‚Â n', 'Butterfly', '2.1 mm', 'Ă„ÂĂ¡Â»Â', 1280000, 1790000, 10, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'Tenergy 05 lÄ‚Â  mĂ¡Â»â„¢t trong cÄ‚Â¡c mĂ¡ÂºÂ·t vĂ¡Â»Â£t nĂ¡Â»â€¢i tiĂ¡ÂºÂ¿ng nhĂ¡ÂºÂ¥t cĂ¡Â»Â§a Butterfly.', 'PhÄ‚Â¹ hĂ¡Â»Â£p nhÄ‚Â³m khÄ‚Â¡ch offensive.', '2026-04-19 08:30:00', '2026-04-19 08:30:00', 0),
    ('product-038', 'MĂ¡ÂºÂ·t vĂ¡Â»Â£t bÄ‚Â³ng bÄ‚Â n Butterfly Rozena', 'TT-018', 'BÄ‚Â³ng bÄ‚Â n', 'Butterfly', '1.9 mm', 'Ă„Âen', 850000, 1250000, 11, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'Rozena lÄ‚Â  mĂ¡ÂºÂ·t vĂ¡Â»Â£t dĂ¡Â»â€¦ chĂ†Â¡i, cÄ‚Â¢n bĂ¡ÂºÂ±ng tĂ¡Â»â€˜c Ă„â€˜Ă¡Â»â„¢ vÄ‚Â  kiĂ¡Â»Æ’m soÄ‚Â¡t.', 'BÄ‚Â¡n tĂ¡Â»â€˜t cho ngĂ†Â°Ă¡Â»Âi chĂ†Â¡i trung cĂ¡ÂºÂ¥p.', '2026-04-19 08:31:00', '2026-04-19 08:31:00', 0),
    ('product-039', 'MĂ¡ÂºÂ·t vĂ¡Â»Â£t bÄ‚Â³ng bÄ‚Â n DHS Hurricane 3 Neo', 'TT-019', 'BÄ‚Â³ng bÄ‚Â n', 'DHS', '2.15 mm', 'Ă„ÂĂ¡Â»Â', 620000, 980000, 14, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'Hurricane 3 Neo lÄ‚Â  mĂ¡ÂºÂ·t vĂ¡Â»Â£t tacky rĂ¡ÂºÂ¥t nĂ¡Â»â€¢i tiĂ¡ÂºÂ¿ng cĂ¡Â»Â§a DHS.', 'MĂ¡ÂºÂ·t thuĂ¡ÂºÂ­n phĂ¡Â»â€¢ biĂ¡ÂºÂ¿n cho ngĂ†Â°Ă¡Â»Âi chĂ†Â¡i Trung QuĂ¡Â»â€˜c-style.', '2026-04-19 08:32:00', '2026-04-19 08:32:00', 0),
    ('product-040', 'MĂ¡ÂºÂ·t vĂ¡Â»Â£t bÄ‚Â³ng bÄ‚Â n Donic Bluefire M1', 'TT-020', 'BÄ‚Â³ng bÄ‚Â n', 'Donic', '2.0 mm', 'Ă„Âen', 980000, 1450000, 9, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'Bluefire M1 lÄ‚Â  mĂ¡ÂºÂ·t vĂ¡Â»Â£t tĂ¡ÂºÂ¥n cÄ‚Â´ng tĂ¡Â»â€˜c Ă„â€˜Ă¡Â»â„¢ cĂ¡Â»Â§a Donic.', 'TÄ‚Âªn sĂ¡ÂºÂ£n phĂ¡ÂºÂ©m xÄ‚Â¡c thĂ¡Â»Â±c trÄ‚Âªn Donic.', '2026-04-19 08:33:00', '2026-04-19 08:33:00', 0),
    ('product-041', 'MĂ¡ÂºÂ·t vĂ¡Â»Â£t bÄ‚Â³ng bÄ‚Â n Xiom Vega X', 'TT-021', 'BÄ‚Â³ng bÄ‚Â n', 'Xiom', '2.0 mm', 'Ă„ÂĂ¡Â»Â', 820000, 1290000, 10, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'Vega X thuĂ¡Â»â„¢c dÄ‚Â²ng mĂ¡ÂºÂ·t vĂ¡Â»Â£t offensive phĂ¡Â»â€¢ biĂ¡ÂºÂ¿n cĂ¡Â»Â§a Xiom.', 'HÄ‚Â ng phÄ‚Â¹ hĂ¡Â»Â£p khÄ‚Â¡ch nÄ‚Â¢ng cĂ¡ÂºÂ¥p setup.', '2026-04-19 08:34:00', '2026-04-19 08:34:00', 0),
    ('product-042', 'BÄ‚Â³ng bÄ‚Â³ng bÄ‚Â n Nittaku Premium 40+ 3-Star', 'TT-022', 'BÄ‚Â³ng bÄ‚Â n', 'Nittaku', '40+ 3 sao', 'TrĂ¡ÂºÂ¯ng', 160000, 290000, 24, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'Nittaku Premium 40+ 3-Star lÄ‚Â  bÄ‚Â³ng thi Ă„â€˜Ă¡ÂºÂ¥u cao cĂ¡ÂºÂ¥p.', 'Ă„ÂÄ‚Â³ng hĂ¡Â»â„¢p 3 quĂ¡ÂºÂ£.', '2026-04-19 08:35:00', '2026-04-19 08:35:00', 0),
    ('product-043', 'BÄ‚Â³ng bÄ‚Â³ng bÄ‚Â n DHS DJ40+ WTT', 'TT-023', 'BÄ‚Â³ng bÄ‚Â n', 'DHS', '40+ 3 sao', 'TrĂ¡ÂºÂ¯ng', 180000, 320000, 20, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'DJ40+ WTT lÄ‚Â  bÄ‚Â³ng thi Ă„â€˜Ă¡ÂºÂ¥u chÄ‚Â­nh thĂ¡Â»Â©c cĂ¡Â»Â§a DHS.', 'Ă„ÂÄ‚Â³ng hĂ¡Â»â„¢p 6 quĂ¡ÂºÂ£.', '2026-04-19 08:36:00', '2026-04-19 08:36:00', 0),
    ('product-044', 'BÄ‚Â³ng bÄ‚Â³ng bÄ‚Â n Butterfly R40+ 3-Star', 'TT-024', 'BÄ‚Â³ng bÄ‚Â n', 'Butterfly', '40+ 3 sao', 'TrĂ¡ÂºÂ¯ng', 150000, 280000, 22, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'R40+ 3-Star lÄ‚Â  bÄ‚Â³ng thi Ă„â€˜Ă¡ÂºÂ¥u cĂ¡Â»Â§a Butterfly.', 'Ă„ÂÄ‚Â³ng hĂ¡Â»â„¢p 3 quĂ¡ÂºÂ£.', '2026-04-19 08:37:00', '2026-04-19 08:37:00', 0),
    ('product-045', 'BĂ¡Â»â„¢ lĂ†Â°Ă¡Â»â€ºi bÄ‚Â³ng bÄ‚Â n JOOLA Essentials Table Tennis Net Set', 'TT-025', 'BÄ‚Â³ng bÄ‚Â n', 'JOOLA', 'TiÄ‚Âªu chuĂ¡ÂºÂ©n', 'Ă„Âen', 290000, 480000, 11, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'BĂ¡Â»â„¢ lĂ†Â°Ă¡Â»â€ºi kĂ¡ÂºÂ¹p bÄ‚Â n thuĂ¡Â»â„¢c dÄ‚Â²ng Essentials cĂ¡Â»Â§a JOOLA.', 'PhĂ¡Â»Â¥ kiĂ¡Â»â€¡n dĂ¡Â»â€¦ Ă„â€˜i kÄ‚Â¨m bÄ‚Â n bÄ‚Â³ng bÄ‚Â n.', '2026-04-19 08:38:00', '2026-04-19 08:38:00', 0),
    ('product-046', 'Keo dÄ‚Â¡n mĂ¡ÂºÂ·t vĂ¡Â»Â£t Butterfly Free Chack II', 'TT-026', 'BÄ‚Â³ng bÄ‚Â n', 'Butterfly', '500 ml', 'TrĂ¡ÂºÂ¯ng', 390000, 650000, 8, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'Free Chack II lÄ‚Â  keo dÄ‚Â¡n mĂ¡ÂºÂ·t vĂ¡Â»Â£t nĂ¡Â»â€¢i tiĂ¡ÂºÂ¿ng cĂ¡Â»Â§a Butterfly.', 'PhÄ‚Â¹ hĂ¡Â»Â£p nhÄ‚Â³m khÄ‚Â¡ch custom vĂ¡Â»Â£t.', '2026-04-19 08:39:00', '2026-04-19 08:39:00', 0),

    ('product-047', 'BÄ‚Â³ng chuyĂ¡Â»Ân Mikasa V200W', 'VB-002', 'BÄ‚Â³ng chuyĂ¡Â»Ân', 'Mikasa', 'SĂ¡Â»â€˜ 5', 'VÄ‚Â ng / Xanh', 1580000, 2390000, 10, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'V200W lÄ‚Â  bÄ‚Â³ng thi Ă„â€˜Ă¡ÂºÂ¥u chÄ‚Â­nh thĂ¡Â»Â©c FIVB cĂ¡Â»Â§a Mikasa.', 'TÄ‚Âªn sĂ¡ÂºÂ£n phĂ¡ÂºÂ©m xÄ‚Â¡c thĂ¡Â»Â±c trÄ‚Âªn Mikasa Sports.', '2026-04-19 08:40:00', '2026-04-19 08:40:00', 0),
    ('product-048', 'BÄ‚Â³ng chuyĂ¡Â»Ân Mikasa V330W', 'VB-003', 'BÄ‚Â³ng chuyĂ¡Â»Ân', 'Mikasa', 'SĂ¡Â»â€˜ 5', 'VÄ‚Â ng / Xanh', 980000, 1490000, 14, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'V330W lÄ‚Â  club version cĂ¡Â»Â§a V200W.', 'PhÄ‚Â¹ hĂ¡Â»Â£p tĂ¡ÂºÂ­p luyĂ¡Â»â€¡n CLB vÄ‚Â  trĂ†Â°Ă¡Â»Âng hĂ¡Â»Âc.', '2026-04-19 08:41:00', '2026-04-19 08:41:00', 0),
    ('product-049', 'BÄ‚Â³ng chuyĂ¡Â»Ân Molten V5M5000 FLISTATEC', 'VB-004', 'BÄ‚Â³ng chuyĂ¡Â»Ân', 'Molten', 'SĂ¡Â»â€˜ 5', 'Xanh / Ă„ÂĂ¡Â»Â / TrĂ¡ÂºÂ¯ng', 1650000, 2480000, 9, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'V5M5000 lÄ‚Â  bÄ‚Â³ng chuyĂ¡Â»Ân FLISTATEC cao cĂ¡ÂºÂ¥p cĂ¡Â»Â§a Molten.', 'CÄ‚Â³ trÄ‚Âªn Molten USA.', '2026-04-19 08:42:00', '2026-04-19 08:42:00', 0),
    ('product-050', 'BÄ‚Â³ng chuyĂ¡Â»Ân Molten V5M4000', 'VB-005', 'BÄ‚Â³ng chuyĂ¡Â»Ân', 'Molten', 'SĂ¡Â»â€˜ 5', 'Xanh / TrĂ¡ÂºÂ¯ng', 920000, 1390000, 13, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'V5M4000 lÄ‚Â  dÄ‚Â²ng bÄ‚Â³ng chuyĂ¡Â»Ân indoor phĂ¡Â»â€¢ biĂ¡ÂºÂ¿n cĂ¡Â»Â§a Molten.', 'PhÄ‚Â¹ hĂ¡Â»Â£p Ă„â€˜Ă¡Â»â„¢i phong trÄ‚Â o.', '2026-04-19 08:43:00', '2026-04-19 08:43:00', 0),
    ('product-051', 'BÄ‚Â³ng chuyĂ¡Â»Ân bÄ‚Â£i biĂ¡Â»Æ’n Wilson AVP OPTX Official Game Volleyball', 'VB-006', 'BÄ‚Â³ng chuyĂ¡Â»Ân', 'Wilson', 'SĂ¡Â»â€˜ 5', 'VÄ‚Â ng / Xanh', 1180000, 1790000, 11, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'AVP OPTX Official Game Volleyball lÄ‚Â  bÄ‚Â³ng beach nĂ¡Â»â€¢i tiĂ¡ÂºÂ¿ng cĂ¡Â»Â§a Wilson.', 'PhÄ‚Â¹ hĂ¡Â»Â£p nhÄ‚Â³m chĂ†Â¡i sÄ‚Â¢n cÄ‚Â¡t vÄ‚Â  biĂ¡Â»Æ’n.', '2026-04-19 08:44:00', '2026-04-19 08:44:00', 0),
    ('product-052', 'BÄ‚Â³ng chuyĂ¡Â»Ân Tachikara SV5WSC Sensi-Tec', 'VB-007', 'BÄ‚Â³ng chuyĂ¡Â»Ân', 'Tachikara', 'SĂ¡Â»â€˜ 5', 'TrĂ¡ÂºÂ¯ng / Ă„ÂĂ¡Â»Â / Xanh', 780000, 1190000, 12, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'SV5WSC Sensi-Tec lÄ‚Â  bÄ‚Â³ng training phĂ¡Â»â€¢ biĂ¡ÂºÂ¿n cĂ¡Â»Â§a Tachikara.', 'MĂ¡ÂºÂ«u bÄ‚Â³ng phĂ¡Â»â€¢ biĂ¡ÂºÂ¿n trÄ‚Âªn sÄ‚Â n TMĂ„ÂT.', '2026-04-19 08:45:00', '2026-04-19 08:45:00', 0),
    ('product-053', 'BÄ‚Â³ng chuyĂ¡Â»Ân bÄ‚Â£i biĂ¡Â»Æ’n Mikasa BV550C Beach Pro', 'VB-008', 'BÄ‚Â³ng chuyĂ¡Â»Ân', 'Mikasa', 'SĂ¡Â»â€˜ 5', 'VÄ‚Â ng / Xanh', 980000, 1490000, 10, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'BV550C Beach Pro lÄ‚Â  bÄ‚Â³ng beach cao cĂ¡ÂºÂ¥p cĂ¡Â»Â§a Mikasa.', 'BĂ¡Â»â€¢ sung nhÄ‚Â³m beach volleyball.', '2026-04-19 08:46:00', '2026-04-19 08:46:00', 0),
    ('product-054', 'BÄ‚Â³ng chuyĂ¡Â»Ân bÄ‚Â£i biĂ¡Â»Æ’n Molten V5B5000', 'VB-009', 'BÄ‚Â³ng chuyĂ¡Â»Ân', 'Molten', 'SĂ¡Â»â€˜ 5', 'Xanh / TrĂ¡ÂºÂ¯ng', 860000, 1320000, 12, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'V5B5000 lÄ‚Â  bÄ‚Â³ng beach volleyball cĂ¡Â»Â§a Molten.', 'MĂ¡ÂºÂ«u thĂ¡Â»Â±c tĂ¡ÂºÂ¿ trÄ‚Âªn nhiĂ¡Â»Âu shop thĂ¡Â»Æ’ thao.', '2026-04-19 08:47:00', '2026-04-19 08:47:00', 0),
    ('product-055', 'GiÄ‚Â y bÄ‚Â³ng chuyĂ¡Â»Ân adidas Crazyflight Mid', 'VB-010', 'BÄ‚Â³ng chuyĂ¡Â»Ân', 'adidas', '40-43', 'TrĂ¡ÂºÂ¯ng / Xanh', 1980000, 2990000, 8, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'Crazyflight Mid lÄ‚Â  mĂ¡ÂºÂ«u giÄ‚Â y bÄ‚Â³ng chuyĂ¡Â»Ân nĂ¡Â»â€¢i bĂ¡ÂºÂ­t cĂ¡Â»Â§a adidas.', 'ThiÄ‚Âªn vĂ¡Â»Â bĂ¡ÂºÂ­t nhĂ¡ÂºÂ£y vÄ‚Â  phĂ¡ÂºÂ£n hĂ¡Â»â€œi tĂ¡Â»â€˜t.', '2026-04-19 08:48:00', '2026-04-19 08:48:00', 0),
    ('product-056', 'GiÄ‚Â y bÄ‚Â³ng chuyĂ¡Â»Ân Mizuno Wave Lightning Z8', 'VB-011', 'BÄ‚Â³ng chuyĂ¡Â»Ân', 'Mizuno', '40-43', 'TrĂ¡ÂºÂ¯ng / TÄ‚Â­m', 2250000, 3390000, 7, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'Wave Lightning Z8 lÄ‚Â  giÄ‚Â y thi Ă„â€˜Ă¡ÂºÂ¥u cao cĂ¡ÂºÂ¥p cĂ¡Â»Â§a Mizuno.', 'Form quen thuĂ¡Â»â„¢c vĂ¡Â»â€ºi ngĂ†Â°Ă¡Â»Âi chĂ†Â¡i chuyĂ¡Â»Ân chuyÄ‚Âªn nghiĂ¡Â»â€¡p.', '2026-04-19 08:49:00', '2026-04-19 08:49:00', 0),
    ('product-057', 'GiÄ‚Â y bÄ‚Â³ng chuyĂ¡Â»Ân ASICS Sky Elite FF 3', 'VB-012', 'BÄ‚Â³ng chuyĂ¡Â»Ân', 'ASICS', '40-43', 'TrĂ¡ÂºÂ¯ng / Ă„ÂĂ¡Â»Â', 2380000, 3590000, 6, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'Sky Elite FF 3 lÄ‚Â  dÄ‚Â²ng giÄ‚Â y bÄ‚Â³ng chuyĂ¡Â»Ân cao cĂ¡ÂºÂ¥p cĂ¡Â»Â§a ASICS.', 'TĂ¡ÂºÂ­p trung khĂ¡ÂºÂ£ nĂ„Æ’ng bĂ¡ÂºÂ­t nhĂ¡ÂºÂ£y vÄ‚Â  Ă„â€˜Ä‚Â¡p Ă„â€˜Ă¡ÂºÂ¥t.', '2026-04-19 08:50:00', '2026-04-19 08:50:00', 0),
    ('product-058', 'GiÄ‚Â y bÄ‚Â³ng chuyĂ¡Â»Ân ASICS Gel-Rocket 11', 'VB-013', 'BÄ‚Â³ng chuyĂ¡Â»Ân', 'ASICS', '40-43', 'Ă„Âen / BĂ¡ÂºÂ¡c', 1180000, 1790000, 13, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'Gel-Rocket 11 lÄ‚Â  mĂ¡ÂºÂ«u giÄ‚Â y indoor court rĂ¡ÂºÂ¥t phĂ¡Â»â€¢ biĂ¡ÂºÂ¿n.', 'PhÄ‚Â¹ hĂ¡Â»Â£p ngĂ†Â°Ă¡Â»Âi mĂ¡Â»â€ºi chĂ†Â¡i vÄ‚Â  phong trÄ‚Â o.', '2026-04-19 08:51:00', '2026-04-19 08:51:00', 0),
    ('product-059', 'GiÄ‚Â y bÄ‚Â³ng chuyĂ¡Â»Ân Nike Zoom Hyperset 2', 'VB-014', 'BÄ‚Â³ng chuyĂ¡Â»Ân', 'Nike', '40-43', 'Ă„Âen / Volt', 2150000, 3290000, 7, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'Zoom Hyperset 2 lÄ‚Â  dÄ‚Â²ng giÄ‚Â y bÄ‚Â³ng chuyĂ¡Â»Ân cao cĂ¡ÂºÂ¥p cĂ¡Â»Â§a Nike.', 'MĂ¡ÂºÂ«u giÄ‚Â y Ă„â€˜Ă†Â°Ă¡Â»Â£c sĂ„Æ’n nhiĂ¡Â»Âu trÄ‚Âªn sÄ‚Â n quĂ¡Â»â€˜c tĂ¡ÂºÂ¿.', '2026-04-19 08:52:00', '2026-04-19 08:52:00', 0),
    ('product-060', 'BĂ¡ÂºÂ£o vĂ¡Â»â€¡ gĂ¡Â»â€˜i bÄ‚Â³ng chuyĂ¡Â»Ân Mizuno LR6 Kneepad', 'VB-015', 'BÄ‚Â³ng chuyĂ¡Â»Ân', 'Mizuno', 'M-L', 'Ă„Âen', 260000, 420000, 20, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'LR6 lÄ‚Â  mĂ¡ÂºÂ«u kneepad nĂ¡Â»â€¢i tiĂ¡ÂºÂ¿ng cĂ¡Â»Â§a Mizuno.', 'PhĂ¡Â»Â¥ kiĂ¡Â»â€¡n cĂ†Â¡ bĂ¡ÂºÂ£n cho ngĂ†Â°Ă¡Â»Âi chĂ†Â¡i chuyĂ¡Â»Ân.', '2026-04-19 08:53:00', '2026-04-19 08:53:00', 0),
    ('product-061', 'BĂ¡ÂºÂ£o vĂ¡Â»â€¡ gĂ¡Â»â€˜i bÄ‚Â³ng chuyĂ¡Â»Ân Nike Streak Volleyball Knee Pads', 'VB-016', 'BÄ‚Â³ng chuyĂ¡Â»Ân', 'Nike', 'M-L', 'Ă„Âen', 320000, 520000, 18, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'Streak Volleyball Knee Pads lÄ‚Â  mĂ¡ÂºÂ«u kneepad phĂ¡Â»â€¢ biĂ¡ÂºÂ¿n cĂ¡Â»Â§a Nike.', 'CÄ‚Â³ thĂ¡Â»Æ’ bÄ‚Â¡n theo cĂ¡ÂºÂ·p.', '2026-04-19 08:54:00', '2026-04-19 08:54:00', 0),
    ('product-062', 'Ä‚Âo thi Ă„â€˜Ă¡ÂºÂ¥u bÄ‚Â³ng chuyĂ¡Â»Ân adidas Tabela 23 Jersey', 'VB-017', 'BÄ‚Â³ng chuyĂ¡Â»Ân', 'adidas', 'M-L', 'Ă„ÂĂ¡Â»Â / TrĂ¡ÂºÂ¯ng', 220000, 360000, 24, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'Tabela 23 phÄ‚Â¹ hĂ¡Â»Â£p cho Ă„â€˜Ă¡Â»â„¢i bÄ‚Â³ng chuyĂ¡Â»Ân phong trÄ‚Â o.', 'DĂ¡Â»â€¦ Ă„â€˜Ă¡Â»â€œng bĂ¡Â»â„¢ theo Ă„â€˜Ă¡Â»â„¢i.', '2026-04-19 08:55:00', '2026-04-19 08:55:00', 0),
    ('product-063', 'Ä‚Âo bÄ‚Â³ng chuyĂ¡Â»Ân Puma teamLIGA Jersey', 'VB-018', 'BÄ‚Â³ng chuyĂ¡Â»Ân', 'Puma', 'M-L', 'TrĂ¡ÂºÂ¯ng / Ă„Âen', 230000, 370000, 21, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'teamLIGA Jersey cÄ‚Â³ thĂ¡Â»Æ’ dÄ‚Â¹ng cho bÄ‚Â³ng chuyĂ¡Â»Ân phong trÄ‚Â o.', 'NhÄ‚Â³m sĂ¡ÂºÂ£n phĂ¡ÂºÂ©m may mĂ¡ÂºÂ·c xoay vÄ‚Â²ng nhanh.', '2026-04-19 08:56:00', '2026-04-19 08:56:00', 0),
    ('product-064', 'BĂ¡ÂºÂ£o vĂ¡Â»â€¡ gĂ¡Â»â€˜i bÄ‚Â³ng chuyĂ¡Â»Ân McDavid Hex Knee Pads', 'VB-019', 'BÄ‚Â³ng chuyĂ¡Â»Ân', 'McDavid', 'M-L', 'Ă„Âen', 340000, 550000, 16, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'Hex Knee Pads lÄ‚Â  phĂ¡Â»Â¥ kiĂ¡Â»â€¡n bĂ¡ÂºÂ£o vĂ¡Â»â€¡ gĂ¡Â»â€˜i rĂ¡ÂºÂ¥t quen thuĂ¡Â»â„¢c cĂ¡Â»Â§a McDavid.', 'BĂ¡Â»â€¢ sung nhÄ‚Â³m phĂ¡Â»Â¥ kiĂ¡Â»â€¡n bĂ¡ÂºÂ£o hĂ¡Â»â„¢.', '2026-04-19 08:57:00', '2026-04-19 08:57:00', 0),
    ('product-065', 'BÄ‚Â³ng chuyĂ¡Â»Ân mini Mikasa VQ2000', 'VB-020', 'BÄ‚Â³ng chuyĂ¡Â»Ân', 'Mikasa', 'Mini', 'VÄ‚Â ng / Xanh', 210000, 350000, 15, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'VQ2000 lÄ‚Â  bÄ‚Â³ng mini phĂ¡Â»Â¥c vĂ¡Â»Â¥ tĂ¡ÂºÂ­p cĂ†Â¡ bĂ¡ÂºÂ£n vÄ‚Â  quÄ‚Â  tĂ¡ÂºÂ·ng.', 'MĂ¡ÂºÂ«u dĂ¡Â»â€¦ bÄ‚Â¡n cho hĂ¡Â»Âc sinh.', '2026-04-19 08:58:00', '2026-04-19 08:58:00', 0),
    ('product-066', 'GiÄ‚Â y bÄ‚Â³ng chuyĂ¡Â»Ân adidas Court Team Bounce 2.0', 'VB-021', 'BÄ‚Â³ng chuyĂ¡Â»Ân', 'adidas', '40-43', 'TrĂ¡ÂºÂ¯ng / Ă„Âen', 1650000, 2590000, 9, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'Court Team Bounce 2.0 dÄ‚Â¹ng tĂ¡Â»â€˜t cho cÄ‚Â¡c mÄ‚Â´n indoor court.', 'CÄ‚Â³ thĂ¡Â»Æ’ dÄ‚Â¹ng cho bÄ‚Â³ng chuyĂ¡Â»Ân vÄ‚Â  cĂ¡ÂºÂ§u lÄ‚Â´ng.', '2026-04-19 08:59:00', '2026-04-19 08:59:00', 0),

    ('product-067', 'BÄ‚Â³ng rĂ¡Â»â€¢ Spalding React TF-250', 'BB-003', 'BÄ‚Â³ng rĂ¡Â»â€¢', 'Spalding', 'SĂ¡Â»â€˜ 7', 'Cam', 420000, 690000, 16, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'React TF-250 lÄ‚Â  bÄ‚Â³ng indoor/outdoor phĂ¡Â»â€¢ biĂ¡ÂºÂ¿n cĂ¡Â»Â§a Spalding.', 'TÄ‚Âªn sĂ¡ÂºÂ£n phĂ¡ÂºÂ©m xÄ‚Â¡c thĂ¡Â»Â±c trÄ‚Âªn Spalding.', '2026-04-19 09:00:00', '2026-04-19 09:00:00', 0),
    ('product-068', 'BÄ‚Â³ng rĂ¡Â»â€¢ Spalding Excel TF-500', 'BB-004', 'BÄ‚Â³ng rĂ¡Â»â€¢', 'Spalding', 'SĂ¡Â»â€˜ 7', 'Cam', 620000, 990000, 14, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'Excel TF-500 lÄ‚Â  bÄ‚Â³ng all-surface cao hĂ†Â¡n TF-250.', 'DÄ‚Â²ng phĂ¡Â»â€¢ biĂ¡ÂºÂ¿n tĂ¡ÂºÂ¡i thĂ¡Â»â€¹ trĂ†Â°Ă¡Â»Âng quĂ¡Â»â€˜c tĂ¡ÂºÂ¿.', '2026-04-19 09:01:00', '2026-04-19 09:01:00', 0),
    ('product-069', 'BÄ‚Â³ng rĂ¡Â»â€¢ Molten BG3800', 'BB-005', 'BÄ‚Â³ng rĂ¡Â»â€¢', 'Molten', 'SĂ¡Â»â€˜ 7', 'NÄ‚Â¢u cam', 780000, 1190000, 12, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'BG3800 lÄ‚Â  bÄ‚Â³ng FIBA Approved indoor/outdoor cĂ¡Â»Â§a Molten.', 'TÄ‚Âªn sĂ¡ÂºÂ£n phĂ¡ÂºÂ©m xÄ‚Â¡c thĂ¡Â»Â±c trÄ‚Âªn Molten USA.', '2026-04-19 09:02:00', '2026-04-19 09:02:00', 0),
    ('product-070', 'BÄ‚Â³ng rĂ¡Â»â€¢ Molten BG4500', 'BB-006', 'BÄ‚Â³ng rĂ¡Â»â€¢', 'Molten', 'SĂ¡Â»â€˜ 7', 'NÄ‚Â¢u cam', 1180000, 1790000, 10, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'BG4500 lÄ‚Â  dÄ‚Â²ng bÄ‚Â³ng thi Ă„â€˜Ă¡ÂºÂ¥u cao cĂ¡ÂºÂ¥p cĂ¡Â»Â§a Molten.', 'PhÄ‚Â¹ hĂ¡Â»Â£p sÄ‚Â¢n trong nhÄ‚Â .', '2026-04-19 09:03:00', '2026-04-19 09:03:00', 0),
    ('product-071', 'BÄ‚Â³ng rĂ¡Â»â€¢ Wilson NBA DRV Pro', 'BB-007', 'BÄ‚Â³ng rĂ¡Â»â€¢', 'Wilson', 'SĂ¡Â»â€˜ 7', 'Cam', 620000, 980000, 13, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'NBA DRV Pro lÄ‚Â  bÄ‚Â³ng outdoor phĂ¡Â»â€¢ biĂ¡ÂºÂ¿n cĂ¡Â»Â§a Wilson.', 'ThuĂ¡Â»â„¢c line NBA chÄ‚Â­nh thĂ¡Â»Â©c.', '2026-04-19 09:04:00', '2026-04-19 09:04:00', 0),
    ('product-072', 'BÄ‚Â³ng rĂ¡Â»â€¢ Wilson NBA Forge Plus', 'BB-008', 'BÄ‚Â³ng rĂ¡Â»â€¢', 'Wilson', 'SĂ¡Â»â€˜ 7', 'Cam', 480000, 790000, 15, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'NBA Forge Plus lÄ‚Â  bÄ‚Â³ng basket outdoor dĂ¡Â»â€¦ tiĂ¡ÂºÂ¿p cĂ¡ÂºÂ­n cĂ¡Â»Â§a Wilson.', 'DĂ¡Â»â€¦ bÄ‚Â¡n cho sinh viÄ‚Âªn vÄ‚Â  hĂ¡Â»Âc sinh.', '2026-04-19 09:05:00', '2026-04-19 09:05:00', 0),
    ('product-073', 'GiÄ‚Â y bÄ‚Â³ng rĂ¡Â»â€¢ Nike Giannis Immortality 4', 'BB-009', 'BÄ‚Â³ng rĂ¡Â»â€¢', 'Nike', '40-43', 'TrĂ¡ÂºÂ¯ng / Xanh', 1450000, 2290000, 9, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'Giannis Immortality 4 lÄ‚Â  mĂ¡ÂºÂ«u giÄ‚Â y bÄ‚Â³ng rĂ¡Â»â€¢ cĂ¡Â»Â§a Nike.', 'TÄ‚Âªn sĂ¡ÂºÂ£n phĂ¡ÂºÂ©m xÄ‚Â¡c thĂ¡Â»Â±c trÄ‚Âªn Nike.', '2026-04-19 09:06:00', '2026-04-19 09:06:00', 0),
    ('product-074', 'GiÄ‚Â y bÄ‚Â³ng rĂ¡Â»â€¢ Nike LeBron Witness 8', 'BB-010', 'BÄ‚Â³ng rĂ¡Â»â€¢', 'Nike', '40-43', 'Ă„Âen / VÄ‚Â ng', 1680000, 2590000, 8, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'LeBron Witness 8 lÄ‚Â  giÄ‚Â y bÄ‚Â³ng rĂ¡Â»â€¢ phĂ¡Â»â€¢ biĂ¡ÂºÂ¿n phÄ‚Â¢n khÄ‚Âºc tĂ¡ÂºÂ§m trung.', 'HĂ¡Â»Â£p khÄ‚Â¡ch thÄ‚Â­ch dÄ‚Â²ng LeBron.', '2026-04-19 09:07:00', '2026-04-19 09:07:00', 0),
    ('product-075', 'GiÄ‚Â y bÄ‚Â³ng rĂ¡Â»â€¢ adidas Own The Game 3.0', 'BB-011', 'BÄ‚Â³ng rĂ¡Â»â€¢', 'adidas', '40-43', 'Ă„Âen / TrĂ¡ÂºÂ¯ng', 1180000, 1890000, 10, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'Own The Game 3.0 lÄ‚Â  mĂ¡ÂºÂ«u giÄ‚Â y bÄ‚Â³ng rĂ¡Â»â€¢ phĂ¡Â»â€¢ thÄ‚Â´ng cĂ¡Â»Â§a adidas.', 'DĂ¡Â»â€¦ bÄ‚Â¡n Ă¡Â»Å¸ tĂ¡Â»â€¡p khÄ‚Â¡ch beginner.', '2026-04-19 09:08:00', '2026-04-19 09:08:00', 0),
    ('product-076', 'GiÄ‚Â y bÄ‚Â³ng rĂ¡Â»â€¢ adidas Dame Certified 3', 'BB-012', 'BÄ‚Â³ng rĂ¡Â»â€¢', 'adidas', '40-43', 'Ă„ÂĂ¡Â»Â / Ă„Âen', 1450000, 2290000, 8, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'Dame Certified 3 lÄ‚Â  mĂ¡ÂºÂ«u signature giÄ‚Â¡ tĂ¡Â»â€˜t cĂ¡Â»Â§a adidas.', 'PhÄ‚Â¹ hĂ¡Â»Â£p khÄ‚Â¡ch cĂ¡ÂºÂ§n grip vÄ‚Â  Ă¡Â»â€¢n Ă„â€˜Ă¡Â»â€¹nh.', '2026-04-19 09:09:00', '2026-04-19 09:09:00', 0),
    ('product-077', 'GiÄ‚Â y bÄ‚Â³ng rĂ¡Â»â€¢ PUMA Court Pro', 'BB-013', 'BÄ‚Â³ng rĂ¡Â»â€¢', 'PUMA', '40-43', 'TrĂ¡ÂºÂ¯ng / Cam', 1320000, 2090000, 9, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'Court Pro lÄ‚Â  mĂ¡ÂºÂ«u giÄ‚Â y bÄ‚Â³ng rĂ¡Â»â€¢ hiĂ¡Â»â€¡n Ă„â€˜Ă¡ÂºÂ¡i cĂ¡Â»Â§a PUMA.', 'Form Ă„â€˜Ă¡ÂºÂ¹p, hĂ¡Â»Â£p xu hĂ†Â°Ă¡Â»â€ºng lifestyle.', '2026-04-19 09:10:00', '2026-04-19 09:10:00', 0),
    ('product-078', 'GiÄ‚Â y bÄ‚Â³ng rĂ¡Â»â€¢ Under Armour Curry 3Z 24', 'BB-014', 'BÄ‚Â³ng rĂ¡Â»â€¢', 'Under Armour', '40-43', 'Xanh / BĂ¡ÂºÂ¡c', 1550000, 2450000, 7, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'Curry 3Z 24 lÄ‚Â  mĂ¡ÂºÂ«u giÄ‚Â y bÄ‚Â³ng rĂ¡Â»â€¢ outdoor/indoor cĂ¡Â»Â§a Under Armour.', 'CÄ‚Â³ sĂ¡Â»Â©c hÄ‚Âºt vĂ¡Â»â€ºi fan Stephen Curry.', '2026-04-19 09:11:00', '2026-04-19 09:11:00', 0),
    ('product-079', 'BÄ‚Â³ng rĂ¡Â»â€¢ Jordan Playground 2.0 8P', 'BB-015', 'BÄ‚Â³ng rĂ¡Â»â€¢', 'Jordan', 'SĂ¡Â»â€˜ 7', 'Cam / Ă„Âen', 520000, 850000, 12, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'Jordan Playground 2.0 8P lÄ‚Â  bÄ‚Â³ng outdoor phĂ¡Â»â€¢ biĂ¡ÂºÂ¿n.', 'BĂ¡Â»â€¢ sung line Jordan cho danh mĂ¡Â»Â¥c bÄ‚Â³ng rĂ¡Â»â€¢.', '2026-04-19 09:12:00', '2026-04-19 09:12:00', 0),
    ('product-080', 'BÄ‚Â³ng rĂ¡Â»â€¢ Nike Everyday Playground 8P 2.0', 'BB-016', 'BÄ‚Â³ng rĂ¡Â»â€¢', 'Nike', 'SĂ¡Â»â€˜ 7', 'Cam / Ă„Âen', 480000, 790000, 14, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'Everyday Playground 8P 2.0 lÄ‚Â  bÄ‚Â³ng outdoor phĂ¡Â»â€¢ biĂ¡ÂºÂ¿n cĂ¡Â»Â§a Nike.', 'DĂ¡Â»â€¦ bÄ‚Â¡n cho khÄ‚Â¡ch chĂ†Â¡i sÄ‚Â¢n trĂ†Â°Ă¡Â»Âng.', '2026-04-19 09:13:00', '2026-04-19 09:13:00', 0),
    ('product-081', 'BĂ¡ÂºÂ£ng rĂ¡Â»â€¢ mini Spalding Slam Jam Over-The-Door Mini Hoop', 'BB-017', 'BÄ‚Â³ng rĂ¡Â»â€¢', 'Spalding', 'Mini', 'Ă„Âen / Ă„ÂĂ¡Â»Â', 720000, 1190000, 6, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'Mini hoop gĂ¡ÂºÂ¯n cĂ¡Â»Â­a thuĂ¡Â»â„¢c line Slam Jam cĂ¡Â»Â§a Spalding.', 'SĂ¡ÂºÂ£n phĂ¡ÂºÂ©m phĂ¡Â»Â¥ kiĂ¡Â»â€¡n/hobby bÄ‚Â¡n tĂ¡Â»â€˜t online.', '2026-04-19 09:14:00', '2026-04-19 09:14:00', 0),
    ('product-082', 'BÄ‚Â³ng rĂ¡Â»â€¢ Wilson NBA Authentic Indoor/Outdoor', 'BB-018', 'BÄ‚Â³ng rĂ¡Â»â€¢', 'Wilson', 'SĂ¡Â»â€˜ 7', 'NÄ‚Â¢u cam', 880000, 1350000, 10, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'BÄ‚Â³ng thuĂ¡Â»â„¢c line NBA Authentic cĂ¡Â»Â§a Wilson.', 'PhÄ‚Â¹ hĂ¡Â»Â£p sÄ‚Â¢n trong nhÄ‚Â  vÄ‚Â  ngoÄ‚Â i trĂ¡Â»Âi.', '2026-04-19 09:15:00', '2026-04-19 09:15:00', 0),
    ('product-083', 'Ă¡Â»Âng tay bÄ‚Â³ng rĂ¡Â»â€¢ McDavid Hex Shooter Arm Sleeve', 'BB-019', 'BÄ‚Â³ng rĂ¡Â»â€¢', 'McDavid', 'M-L', 'Ă„Âen', 190000, 320000, 18, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'Hex Shooter Arm Sleeve lÄ‚Â  phĂ¡Â»Â¥ kiĂ¡Â»â€¡n quen thuĂ¡Â»â„¢c vĂ¡Â»â€ºi ngĂ†Â°Ă¡Â»Âi chĂ†Â¡i bÄ‚Â³ng rĂ¡Â»â€¢.', 'BĂ¡Â»â€¢ sung nhÄ‚Â³m phĂ¡Â»Â¥ kiĂ¡Â»â€¡n bĂ¡ÂºÂ£o hĂ¡Â»â„¢.', '2026-04-19 09:16:00', '2026-04-19 09:16:00', 0),
    ('product-084', 'TĂ¡ÂºÂ¥t bÄ‚Â³ng rĂ¡Â»â€¢ Nike Elite Crew', 'BB-020', 'BÄ‚Â³ng rĂ¡Â»â€¢', 'Nike', 'One size', 'TrĂ¡ÂºÂ¯ng / Ă„Âen', 180000, 320000, 26, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'Nike Elite Crew lÄ‚Â  dÄ‚Â²ng tĂ¡ÂºÂ¥t bÄ‚Â³ng rĂ¡Â»â€¢ phĂ¡Â»â€¢ biĂ¡ÂºÂ¿n.', 'BÄ‚Â¡n kÄ‚Â¨m tĂ¡Â»â€˜t vĂ¡Â»â€ºi giÄ‚Â y basket.', '2026-04-19 09:17:00', '2026-04-19 09:17:00', 0),
    ('product-085', 'Ä‚Âo bÄ‚Â³ng rĂ¡Â»â€¢ Jordan Sport Dri-FIT Sleeveless Top', 'BB-021', 'BÄ‚Â³ng rĂ¡Â»â€¢', 'Jordan', 'M-L', 'Ă„Âen', 360000, 590000, 14, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'Ä‚Âo sleeveless Dri-FIT thuĂ¡Â»â„¢c line Jordan Sport.', 'PhÄ‚Â¹ hĂ¡Â»Â£p tĂ¡ÂºÂ­p luyĂ¡Â»â€¡n vÄ‚Â  casual wear.', '2026-04-19 09:18:00', '2026-04-19 09:18:00', 0),
    ('product-086', 'Balo bÄ‚Â³ng rĂ¡Â»â€¢ Nike Hoops Elite Backpack', 'BB-022', 'BÄ‚Â³ng rĂ¡Â»â€¢', 'Nike', '32L', 'Ă„Âen / XÄ‚Â¡m', 820000, 1290000, 9, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'Hoops Elite Backpack lÄ‚Â  balo rĂ¡ÂºÂ¥t phĂ¡Â»â€¢ biĂ¡ÂºÂ¿n cĂ¡Â»Â§a Nike Basketball.', 'CÄ‚Â³ thĂ¡Â»Æ’ bÄ‚Â¡n cho cĂ¡ÂºÂ£ hĂ¡Â»Âc sinh vÄ‚Â  ngĂ†Â°Ă¡Â»Âi chĂ†Â¡i sÄ‚Â¢n phĂ¡Â»Â§i.', '2026-04-19 09:19:00', '2026-04-19 09:19:00', 0),

    ('product-087', 'VĂ¡Â»Â£t cĂ¡ÂºÂ§u lÄ‚Â´ng Yonex Astrox 88 Play', 'BM-002', 'CĂ¡ÂºÂ§u lÄ‚Â´ng', 'Yonex', '4U-G5', 'Ă„Âen / BĂ¡ÂºÂ¡c', 1280000, 1890000, 10, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'Astrox 88 Play lÄ‚Â  mĂ¡ÂºÂ«u racket beginner thuĂ¡Â»â„¢c line Astrox.', 'TÄ‚Âªn sĂ¡ÂºÂ£n phĂ¡ÂºÂ©m xÄ‚Â¡c thĂ¡Â»Â±c trÄ‚Âªn Yonex.', '2026-04-19 09:20:00', '2026-04-19 09:20:00', 0),
    ('product-088', 'VĂ¡Â»Â£t cĂ¡ÂºÂ§u lÄ‚Â´ng Yonex Arcsaber 11 Play', 'BM-003', 'CĂ¡ÂºÂ§u lÄ‚Â´ng', 'Yonex', '4U-G5', 'Grayish Pearl', 1260000, 1850000, 9, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'Arcsaber 11 Play lÄ‚Â  mĂ¡ÂºÂ«u racket control thuĂ¡Â»â„¢c line Arcsaber.', 'HĂ¡Â»Â£p ngĂ†Â°Ă¡Â»Âi chĂ†Â¡i cÄ‚Â´ng thĂ¡Â»Â§ toÄ‚Â n diĂ¡Â»â€¡n.', '2026-04-19 09:21:00', '2026-04-19 09:21:00', 0),
    ('product-089', 'VĂ¡Â»Â£t cĂ¡ÂºÂ§u lÄ‚Â´ng Yonex Nanoflare 1000 Play', 'BM-004', 'CĂ¡ÂºÂ§u lÄ‚Â´ng', 'Yonex', '4U-G5', 'Lightning Yellow', 1240000, 1820000, 8, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'Nanoflare 1000 Play thiÄ‚Âªn vĂ¡Â»Â tĂ¡Â»â€˜c Ă„â€˜Ă¡Â»â„¢ vÄ‚Â  xoay trĂ¡Â»Å¸ nhanh.', 'TÄ‚Âªn sĂ¡ÂºÂ£n phĂ¡ÂºÂ©m xÄ‚Â¡c thĂ¡Â»Â±c trÄ‚Âªn Yonex.', '2026-04-19 09:22:00', '2026-04-19 09:22:00', 0),
    ('product-090', 'VĂ¡Â»Â£t cĂ¡ÂºÂ§u lÄ‚Â´ng Yonex Nanoflare 1000 Game', 'BM-005', 'CĂ¡ÂºÂ§u lÄ‚Â´ng', 'Yonex', '4U-G5', 'Lightning Yellow', 1980000, 2890000, 7, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'Nanoflare 1000 Game lÄ‚Â  bĂ¡ÂºÂ£n cao hĂ†Â¡n Play cĂ¡Â»Â§a Yonex.', 'PhÄ‚Â¹ hĂ¡Â»Â£p ngĂ†Â°Ă¡Â»Âi chĂ†Â¡i trung cĂ¡ÂºÂ¥p.', '2026-04-19 09:23:00', '2026-04-19 09:23:00', 0),
    ('product-091', 'VĂ¡Â»Â£t cĂ¡ÂºÂ§u lÄ‚Â´ng Li-Ning Windstorm 72', 'BM-006', 'CĂ¡ÂºÂ§u lÄ‚Â´ng', 'Li-Ning', '6U-G6', 'TrĂ¡ÂºÂ¯ng / Xanh', 1580000, 2390000, 8, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'Windstorm 72 lÄ‚Â  mĂ¡ÂºÂ«u vĂ¡Â»Â£t siÄ‚Âªu nhĂ¡ÂºÂ¹ nĂ¡Â»â€¢i tiĂ¡ÂºÂ¿ng cĂ¡Â»Â§a Li-Ning.', 'DĂ¡Â»â€¦ bÄ‚Â¡n cho ngĂ†Â°Ă¡Â»Âi thÄ‚Â­ch vĂ¡Â»Â£t nhĂ¡ÂºÂ¹.', '2026-04-19 09:24:00', '2026-04-19 09:24:00', 0),
    ('product-092', 'VĂ¡Â»Â£t cĂ¡ÂºÂ§u lÄ‚Â´ng Li-Ning Halbertec 2000', 'BM-007', 'CĂ¡ÂºÂ§u lÄ‚Â´ng', 'Li-Ning', '4U-G5', 'Ă„Âen / VÄ‚Â ng', 1380000, 2090000, 8, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'Halbertec 2000 lÄ‚Â  dÄ‚Â²ng vĂ¡Â»Â£t all-round cĂ¡Â»Â§a Li-Ning.', 'TÄ‚Âªn sĂ¡ÂºÂ£n phĂ¡ÂºÂ©m phĂ¡Â»â€¢ biĂ¡ÂºÂ¿n trÄ‚Âªn thĂ¡Â»â€¹ trĂ†Â°Ă¡Â»Âng.', '2026-04-19 09:25:00', '2026-04-19 09:25:00', 0),
    ('product-093', 'VĂ¡Â»Â£t cĂ¡ÂºÂ§u lÄ‚Â´ng Victor Thruster K 12 M', 'BM-008', 'CĂ¡ÂºÂ§u lÄ‚Â´ng', 'Victor', '4U-G5', 'Blast Blue', 1780000, 2690000, 6, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'Thruster K 12 M lÄ‚Â  mĂ¡ÂºÂ«u vĂ¡Â»Â£t thiÄ‚Âªn cÄ‚Â´ng cĂ¡Â»Â§a Victor.', 'SĂ¡ÂºÂ£n phĂ¡ÂºÂ©m thĂ¡Â»Â±c tĂ¡ÂºÂ¿ trÄ‚Âªn cÄ‚Â¡c shop cĂ¡ÂºÂ§u lÄ‚Â´ng lĂ¡Â»â€ºn.', '2026-04-19 09:26:00', '2026-04-19 09:26:00', 0),
    ('product-094', 'VĂ¡Â»Â£t cĂ¡ÂºÂ§u lÄ‚Â´ng Victor Auraspeed 90K II', 'BM-009', 'CĂ¡ÂºÂ§u lÄ‚Â´ng', 'Victor', '4U-G5', 'Xanh / Ă„Âen', 2150000, 3190000, 5, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'Auraspeed 90K II lÄ‚Â  mĂ¡ÂºÂ«u vĂ¡Â»Â£t speed/control cĂ¡Â»Â§a Victor.', 'DÄ‚Â²ng bÄ‚Â¡n tĂ¡Â»â€˜t Ă¡Â»Å¸ tĂ¡Â»â€¡p khÄ‚Â¡ch trung cao cĂ¡ÂºÂ¥p.', '2026-04-19 09:27:00', '2026-04-19 09:27:00', 0),
    ('product-095', 'CĂ¡ÂºÂ§u lÄ‚Â´ng lÄ‚Â´ng vĂ…Â© Yonex Aerosensa 30', 'BM-010', 'CĂ¡ÂºÂ§u lÄ‚Â´ng', 'Yonex', '12 quĂ¡ÂºÂ£', 'TrĂ¡ÂºÂ¯ng', 720000, 1090000, 13, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'Aerosensa 30 lÄ‚Â  Ă¡Â»â€˜ng cĂ¡ÂºÂ§u lÄ‚Â´ng cao cĂ¡ÂºÂ¥p cĂ¡Â»Â§a Yonex.', 'PhÄ‚Â¹ hĂ¡Â»Â£p sÄ‚Â¢n chĂ†Â¡i chĂ¡ÂºÂ¥t lĂ†Â°Ă¡Â»Â£ng cao.', '2026-04-19 09:28:00', '2026-04-19 09:28:00', 0),
    ('product-096', 'CĂ¡ÂºÂ§u lÄ‚Â´ng nhĂ¡Â»Â±a Yonex Mavis 350', 'BM-011', 'CĂ¡ÂºÂ§u lÄ‚Â´ng', 'Yonex', '6 quĂ¡ÂºÂ£', 'VÄ‚Â ng', 180000, 290000, 22, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'Mavis 350 lÄ‚Â  dÄ‚Â²ng cĂ¡ÂºÂ§u nhĂ¡Â»Â±a rĂ¡ÂºÂ¥t phĂ¡Â»â€¢ biĂ¡ÂºÂ¿n cĂ¡Â»Â§a Yonex.', 'TĂ¡Â»â€¡p hĂ¡Â»Âc sinh sinh viÄ‚Âªn mua nhiĂ¡Â»Âu.', '2026-04-19 09:29:00', '2026-04-19 09:29:00', 0),
    ('product-097', 'CĂ¡ÂºÂ§u lÄ‚Â´ng lÄ‚Â´ng vĂ…Â© Victor Master Ace', 'BM-012', 'CĂ¡ÂºÂ§u lÄ‚Â´ng', 'Victor', '12 quĂ¡ÂºÂ£', 'TrĂ¡ÂºÂ¯ng', 880000, 1320000, 11, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'Master Ace lÄ‚Â  dÄ‚Â²ng cĂ¡ÂºÂ§u lÄ‚Â´ng thi Ă„â€˜Ă¡ÂºÂ¥u cao cĂ¡ÂºÂ¥p cĂ¡Â»Â§a Victor.', 'ThuĂ¡Â»â„¢c nhÄ‚Â³m cĂ¡ÂºÂ§u premium.', '2026-04-19 09:30:00', '2026-04-19 09:30:00', 0),
    ('product-098', 'CĂ¡ÂºÂ§u lÄ‚Â´ng lÄ‚Â´ng vĂ…Â© Li-Ning No.1', 'BM-013', 'CĂ¡ÂºÂ§u lÄ‚Â´ng', 'Li-Ning', '12 quĂ¡ÂºÂ£', 'TrĂ¡ÂºÂ¯ng', 620000, 980000, 14, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'Li-Ning No.1 lÄ‚Â  Ă¡Â»â€˜ng cĂ¡ÂºÂ§u lÄ‚Â´ng rĂ¡ÂºÂ¥t phĂ¡Â»â€¢ biĂ¡ÂºÂ¿n Ă¡Â»Å¸ thĂ¡Â»â€¹ trĂ†Â°Ă¡Â»Âng chÄ‚Â¢u Ä‚Â.', 'Ă„ÂĂ¡Â»â„¢ bĂ¡Â»Ân vÄ‚Â  Ă„â€˜Ă†Â°Ă¡Â»Âng bay Ă¡Â»â€¢n Ă„â€˜Ă¡Â»â€¹nh.', '2026-04-19 09:31:00', '2026-04-19 09:31:00', 0),
    ('product-099', 'GiÄ‚Â y cĂ¡ÂºÂ§u lÄ‚Â´ng Yonex Power Cushion 65 Z3', 'BM-014', 'CĂ¡ÂºÂ§u lÄ‚Â´ng', 'Yonex', '40-43', 'TrĂ¡ÂºÂ¯ng / Xanh', 1980000, 2990000, 8, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'Power Cushion 65 Z3 lÄ‚Â  mĂ¡ÂºÂ«u giÄ‚Â y cĂ¡ÂºÂ§u lÄ‚Â´ng cao cĂ¡ÂºÂ¥p cĂ¡Â»Â§a Yonex.', 'RĂ¡ÂºÂ¥t phĂ¡Â»â€¢ biĂ¡ÂºÂ¿n vĂ¡Â»â€ºi ngĂ†Â°Ă¡Â»Âi chĂ†Â¡i phong trÄ‚Â o nÄ‚Â¢ng cao.', '2026-04-19 09:32:00', '2026-04-19 09:32:00', 0),
    ('product-100', 'GiÄ‚Â y cĂ¡ÂºÂ§u lÄ‚Â´ng Yonex Aerus Z2', 'BM-015', 'CĂ¡ÂºÂ§u lÄ‚Â´ng', 'Yonex', '40-43', 'Xanh mint', 1860000, 2850000, 7, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'Aerus Z2 lÄ‚Â  mĂ¡ÂºÂ«u giÄ‚Â y siÄ‚Âªu nhĂ¡ÂºÂ¹ cĂ¡Â»Â§a Yonex.', 'PhÄ‚Â¹ hĂ¡Â»Â£p ngĂ†Â°Ă¡Â»Âi chĂ†Â¡i Ă„â€˜Ä‚Â´i cĂ¡ÂºÂ§n di chuyĂ¡Â»Æ’n nhanh.', '2026-04-19 09:33:00', '2026-04-19 09:33:00', 0),
    ('product-101', 'GiÄ‚Â y cĂ¡ÂºÂ§u lÄ‚Â´ng Victor A970 NitroLite', 'BM-016', 'CĂ¡ÂºÂ§u lÄ‚Â´ng', 'Victor', '40-43', 'TrĂ¡ÂºÂ¯ng / Xanh', 1680000, 2590000, 7, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'A970 NitroLite lÄ‚Â  mĂ¡ÂºÂ«u giÄ‚Â y cĂ¡ÂºÂ§u lÄ‚Â´ng nĂ¡Â»â€¢i tiĂ¡ÂºÂ¿ng cĂ¡Â»Â§a Victor.', 'Form giÄ‚Â y Ă¡Â»â€¢n Ă„â€˜Ă¡Â»â€¹nh, bÄ‚Â¡m sÄ‚Â¢n tĂ¡Â»â€˜t.', '2026-04-19 09:34:00', '2026-04-19 09:34:00', 0),
    ('product-102', 'GiÄ‚Â y cĂ¡ÂºÂ§u lÄ‚Â´ng Li-Ning Ranger Lite Z1', 'BM-017', 'CĂ¡ÂºÂ§u lÄ‚Â´ng', 'Li-Ning', '40-43', 'Ă„Âen / Ă„ÂĂ¡Â»Â', 1320000, 2090000, 9, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'Ranger Lite Z1 lÄ‚Â  mĂ¡ÂºÂ«u giÄ‚Â y indoor court cĂ¡Â»Â§a Li-Ning.', 'CÄ‚Â³ thĂ¡Â»Æ’ bÄ‚Â¡n chÄ‚Â©o cho khÄ‚Â¡ch cĂ¡ÂºÂ§u lÄ‚Â´ng vÄ‚Â  bÄ‚Â³ng chuyĂ¡Â»Ân.', '2026-04-19 09:35:00', '2026-04-19 09:35:00', 0),
    ('product-103', 'CĂ†Â°Ă¡Â»â€ºc cĂ¡ÂºÂ§u lÄ‚Â´ng Yonex BG65', 'BM-018', 'CĂ¡ÂºÂ§u lÄ‚Â´ng', 'Yonex', '0.70 mm', 'TrĂ¡ÂºÂ¯ng', 120000, 190000, 26, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'BG65 lÄ‚Â  loĂ¡ÂºÂ¡i cĂ†Â°Ă¡Â»â€ºc cĂ¡ÂºÂ§u lÄ‚Â´ng rĂ¡ÂºÂ¥t phĂ¡Â»â€¢ biĂ¡ÂºÂ¿n cĂ¡Â»Â§a Yonex.', 'PhÄ‚Â¹ hĂ¡Â»Â£p nhiĂ¡Â»Âu kiĂ¡Â»Æ’u lĂ¡Â»â€˜i chĂ†Â¡i.', '2026-04-19 09:36:00', '2026-04-19 09:36:00', 0),
    ('product-104', 'CĂ†Â°Ă¡Â»â€ºc cĂ¡ÂºÂ§u lÄ‚Â´ng Yonex Nanogy 95', 'BM-019', 'CĂ¡ÂºÂ§u lÄ‚Â´ng', 'Yonex', '0.69 mm', 'VÄ‚Â ng', 160000, 260000, 20, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'Nanogy 95 lÄ‚Â  loĂ¡ÂºÂ¡i cĂ†Â°Ă¡Â»â€ºc bĂ¡Â»Ân vÄ‚Â  trĂ¡Â»Â£ lĂ¡Â»Â±c tĂ¡Â»â€˜t cĂ¡Â»Â§a Yonex.', 'BÄ‚Â¡n tĂ¡Â»â€˜t cho ngĂ†Â°Ă¡Â»Âi chĂ†Â¡i phong trÄ‚Â o.', '2026-04-19 09:37:00', '2026-04-19 09:37:00', 0),
    ('product-105', 'TÄ‚Âºi cĂ¡ÂºÂ§u lÄ‚Â´ng Yonex Expert Tournament Bag', 'BM-020', 'CĂ¡ÂºÂ§u lÄ‚Â´ng', 'Yonex', '6 cÄ‚Â¢y', 'Ă„Âen', 620000, 980000, 11, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'Expert Tournament Bag lÄ‚Â  tÄ‚Âºi cĂ¡ÂºÂ§u lÄ‚Â´ng nhiĂ¡Â»Âu ngĂ„Æ’n cĂ¡Â»Â§a Yonex.', 'PhÄ‚Â¹ hĂ¡Â»Â£p ngĂ†Â°Ă¡Â»Âi chĂ†Â¡i Ă„â€˜i sÄ‚Â¢n thĂ†Â°Ă¡Â»Âng xuyÄ‚Âªn.', '2026-04-19 09:38:00', '2026-04-19 09:38:00', 0),
    ('product-106', 'QuĂ¡ÂºÂ¥n cÄ‚Â¡n cĂ¡ÂºÂ§u lÄ‚Â´ng Yonex AC102EX Super Grap', 'BM-021', 'CĂ¡ÂºÂ§u lÄ‚Â´ng', 'Yonex', '3 cuĂ¡Â»â„¢n', 'VÄ‚Â ng', 65000, 110000, 40, 'Ă„Âang bÄ‚Â¡n', '', NULL, 'AC102EX Super Grap lÄ‚Â  quĂ¡ÂºÂ¥n cÄ‚Â¡n rĂ¡ÂºÂ¥t quen thuĂ¡Â»â„¢c cĂ¡Â»Â§a Yonex.', 'PhĂ¡Â»Â¥ kiĂ¡Â»â€¡n bÄ‚Â¡n kÄ‚Â¨m tĂ¡Â»â€˜t cho mĂ¡Â»Âi Ă„â€˜Ă†Â¡n cĂ¡ÂºÂ§u lÄ‚Â´ng.', '2026-04-19 09:39:00', '2026-04-19 09:39:00', 0)
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
    mo_ta_ngan = VALUES(mo_ta_ngan),
    ghi_chu = VALUES(ghi_chu),
    is_deleted = VALUES(is_deleted);

INSERT INTO tbl_san_pham (
    id, ten_san_pham, sku, danh_muc, thuong_hieu, size, mau,
    gia_nhap, gia_ban, ton_kho, trang_thai, link_san_pham, hinh_anh_url,
    mo_ta_ngan, ghi_chu, ngay_tao, ngay_cap_nhat, is_deleted
)
VALUES
    ('product-107', 'Nike Academy Plus Soccer Ball', 'FB-027', 'BĂ³ng Ä‘Ă¡', 'Nike', 'Sá»‘ 5', 'Tráº¯ng / Äen', 420000, 640000, 16, 'Äang bĂ¡n', '', NULL, 'BĂ³ng táº­p vĂ  thi Ä‘áº¥u phong trĂ o thuá»™c dĂ²ng Academy Plus cá»§a Nike.', 'Giá»¯ láº¡i 1 sáº£n pháº©m má»›i cho danh má»¥c bĂ³ng Ä‘Ă¡.', '2026-04-19 09:40:00', '2026-04-19 09:40:00', 0),
    ('product-108', 'STIGA Allround Evolution', 'TT-027', 'BĂ³ng bĂ n', 'STIGA', 'TiĂªu chuáº©n', 'Gá»— tá»± nhiĂªn', 680000, 1080000, 8, 'Äang bĂ¡n', '', NULL, 'Cá»‘t vá»£t STIGA Allround Evolution dĂ nh cho lá»‘i chÆ¡i cĂ´ng thá»§ toĂ n diá»‡n.', 'Giá»¯ láº¡i 1 sáº£n pháº©m má»›i cho danh má»¥c bĂ³ng bĂ n.', '2026-04-19 09:41:00', '2026-04-19 09:41:00', 0),
    ('product-109', 'Mikasa V390W', 'VB-022', 'BĂ³ng chuyá»n', 'Mikasa', 'Sá»‘ 5', 'VĂ ng / Xanh', 760000, 1180000, 14, 'Äang bĂ¡n', '', NULL, 'Mikasa V390W lĂ  bĂ³ng chuyá»n táº­p luyá»‡n phá»• biáº¿n cho trÆ°á»ng vĂ  CLB.', 'Giá»¯ láº¡i 1 sáº£n pháº©m má»›i cho danh má»¥c bĂ³ng chuyá»n.', '2026-04-19 09:42:00', '2026-04-19 09:42:00', 0),
    ('product-110', 'Wilson Evolution Game Basketball', 'BB-023', 'BĂ³ng rá»•', 'Wilson', 'Sá»‘ 7', 'Cam', 980000, 1490000, 12, 'Äang bĂ¡n', '', NULL, 'Wilson Evolution lĂ  má»™t trong nhá»¯ng bĂ³ng indoor phá»• biáº¿n nháº¥t á»Ÿ thá»‹ trÆ°á»ng Má»¹.', 'Giá»¯ láº¡i 1 sáº£n pháº©m má»›i cho danh má»¥c bĂ³ng rá»•.', '2026-04-19 09:43:00', '2026-04-19 09:43:00', 0),
    ('product-111', 'Yonex Astrox 77 Play', 'BM-022', 'Cáº§u lĂ´ng', 'Yonex', '4U-G5', 'High Orange', 1380000, 2050000, 9, 'Äang bĂ¡n', '', NULL, 'Astrox 77 Play lĂ  vá»£t cáº§u lĂ´ng dĂ nh cho ngÆ°á»i chÆ¡i thĂ­ch cáº£m giĂ¡c head-heavy vá»«a pháº£i.', 'Giá»¯ láº¡i 1 sáº£n pháº©m má»›i cho danh má»¥c cáº§u lĂ´ng.', '2026-04-19 09:44:00', '2026-04-19 09:44:00', 0)
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
    mo_ta_ngan = VALUES(mo_ta_ngan),
    ghi_chu = VALUES(ghi_chu),
    is_deleted = VALUES(is_deleted);

INSERT INTO tbl_san_pham (
    id, ten_san_pham, sku, danh_muc, thuong_hieu, size, mau,
    gia_nhap, gia_ban, ton_kho, trang_thai, link_san_pham, hinh_anh_url,
    mo_ta_ngan, ghi_chu, ngay_tao, ngay_cap_nhat, is_deleted
)
VALUES
    ('product-112', 'Nike Strike Knee-High Soccer Socks', 'FB-028', 'BĂ³ng Ä‘Ă¡', 'Nike', 'M-L', 'Tráº¯ng / Äen', 180000, 290000, 18, 'Äang bĂ¡n', '', NULL, 'DĂ²ng táº¥t bĂ³ng Ä‘Ă¡ cá»• cao thuá»™c line Nike Strike, phĂ¹ há»£p Ä‘Ă¡ sĂ¢n cá» nhĂ¢n táº¡o vĂ  sĂ¢n 7.', 'Bá»• sung nhĂ³m táº¥t bĂ³ng Ä‘Ă¡ trong danh má»¥c phá»¥ kiá»‡n.', '2026-04-20 09:00:00', '2026-04-20 09:00:00', 0),
    ('product-113', 'adidas Milano 23 Socks', 'FB-029', 'BĂ³ng Ä‘Ă¡', 'adidas', 'M-L', 'Xanh navy / Tráº¯ng', 170000, 280000, 16, 'Äang bĂ¡n', '', NULL, 'Máº«u táº¥t bĂ³ng Ä‘Ă¡ phá»• biáº¿n cá»§a adidas cho cáº§u thá»§ phong trĂ o vĂ  Ä‘á»™i nhĂ³m.', 'Bá»• sung nhĂ³m táº¥t bĂ³ng Ä‘Ă¡ trong danh má»¥c phá»¥ kiá»‡n.', '2026-04-20 09:01:00', '2026-04-20 09:01:00', 0),
    ('product-114', 'Nike Fundamental Towel Large', 'FB-030', 'BĂ³ng Ä‘Ă¡', 'Nike', 'Large', 'Äen / Tráº¯ng', 210000, 340000, 12, 'Äang bĂ¡n', '', NULL, 'KhÄƒn thá»ƒ thao cá»¡ lá»›n phĂ¹ há»£p mang theo khi táº­p bĂ³ng Ä‘Ă¡, gym hoáº·c cháº¡y bá»™.', 'Bá»• sung nhĂ³m khÄƒn lau cho bĂ³ng Ä‘Ă¡.', '2026-04-20 09:02:00', '2026-04-20 09:02:00', 0),
    ('product-115', 'adidas Sports Towel Small', 'FB-031', 'BĂ³ng Ä‘Ă¡', 'adidas', 'Small', 'Tráº¯ng / Äá»', 150000, 250000, 14, 'Äang bĂ¡n', '', NULL, 'KhÄƒn thá»ƒ thao cá»¡ nhá» cá»§a adidas dĂ¹ng tá»‘t cho táº­p luyá»‡n vĂ  thi Ä‘áº¥u phong trĂ o.', 'Bá»• sung nhĂ³m khÄƒn lau cho bĂ³ng Ä‘Ă¡.', '2026-04-20 09:03:00', '2026-04-20 09:03:00', 0),
    ('product-116', 'Mizuno Performance Plus Volleyball Crew Socks', 'VB-023', 'BĂ³ng chuyá»n', 'Mizuno', 'M-L', 'Tráº¯ng / Xanh', 190000, 320000, 15, 'Äang bĂ¡n', '', NULL, 'Máº«u táº¥t thá»ƒ thao cá»• crew cá»§a Mizuno phĂ¹ há»£p cho ngÆ°á»i chÆ¡i bĂ³ng chuyá»n indoor.', 'Bá»• sung nhĂ³m táº¥t bĂ³ng chuyá»n trong danh má»¥c phá»¥ kiá»‡n.', '2026-04-20 09:04:00', '2026-04-20 09:04:00', 0),
    ('product-117', 'Nike Everyday Plus Cushioned Crew Socks', 'VB-024', 'BĂ³ng chuyá»n', 'Nike', 'M-L', 'Äen / Tráº¯ng', 175000, 290000, 18, 'Äang bĂ¡n', '', NULL, 'Táº¥t crew Ä‘á»‡m dĂ y, phĂ¹ há»£p mang cĂ¹ng giĂ y bĂ³ng chuyá»n vĂ  cĂ¡c mĂ´n sĂ¢n trong nhĂ .', 'Bá»• sung nhĂ³m táº¥t bĂ³ng chuyá»n trong danh má»¥c phá»¥ kiá»‡n.', '2026-04-20 09:05:00', '2026-04-20 09:05:00', 0),
    ('product-118', 'Mizuno Sports Towel', 'VB-025', 'BĂ³ng chuyá»n', 'Mizuno', 'Medium', 'Xanh navy', 185000, 310000, 10, 'Äang bĂ¡n', '', NULL, 'KhÄƒn thá»ƒ thao cá»§a Mizuno phĂ¹ há»£p cho ngÆ°á»i chÆ¡i bĂ³ng chuyá»n, cáº§u lĂ´ng vĂ  gym.', 'Bá»• sung nhĂ³m khÄƒn lau cho bĂ³ng chuyá»n.', '2026-04-20 09:06:00', '2026-04-20 09:06:00', 0),
    ('product-119', 'ASICS Sports Towel', 'VB-026', 'BĂ³ng chuyá»n', 'ASICS', 'Medium', 'Tráº¯ng / Xanh', 180000, 300000, 11, 'Äang bĂ¡n', '', NULL, 'KhÄƒn lau táº­p luyá»‡n cá»¡ vá»«a, phĂ¹ há»£p cho váº­n Ä‘á»™ng viĂªn chÆ¡i bĂ³ng chuyá»n trong nhĂ .', 'Bá»• sung nhĂ³m khÄƒn lau cho bĂ³ng chuyá»n.', '2026-04-20 09:07:00', '2026-04-20 09:07:00', 0),
    ('product-120', 'Mizuno Team Backpack 23', 'VB-027', 'BĂ³ng chuyá»n', 'Mizuno', '23L', 'Äen / Xanh', 520000, 820000, 9, 'Äang bĂ¡n', '', NULL, 'Balo thá»ƒ thao cá»§a Mizuno cĂ³ ngÄƒn chá»©a Ä‘á»“ táº­p, giĂ y vĂ  phá»¥ kiá»‡n sĂ¢n trong nhĂ .', 'Bá»• sung nhĂ³m balo thá»ƒ thao cho bĂ³ng chuyá»n.', '2026-04-20 09:08:00', '2026-04-20 09:08:00', 0),
    ('product-121', 'Nike Brasilia 9.5 Training Backpack', 'VB-028', 'BĂ³ng chuyá»n', 'Nike', '24L', 'Äen', 560000, 890000, 13, 'Äang bĂ¡n', '', NULL, 'Balo training Ä‘a nÄƒng cá»§a Nike, phĂ¹ há»£p mang Ä‘i táº­p bĂ³ng chuyá»n vĂ  cĂ¡c mĂ´n indoor court.', 'Bá»• sung nhĂ³m balo thá»ƒ thao cho bĂ³ng chuyá»n.', '2026-04-20 09:09:00', '2026-04-20 09:09:00', 0),
    ('product-122', 'Jordan Jumpman Sport Towel', 'BB-024', 'BĂ³ng rá»•', 'Jordan', 'Medium', 'Äen / Äá»', 220000, 360000, 10, 'Äang bĂ¡n', '', NULL, 'KhÄƒn thá»ƒ thao phong cĂ¡ch basketball, phĂ¹ há»£p sá»­ dá»¥ng trong luyá»‡n táº­p vĂ  thi Ä‘áº¥u bĂ³ng rá»•.', 'Bá»• sung nhĂ³m khÄƒn lau cho bĂ³ng rá»•.', '2026-04-20 09:10:00', '2026-04-20 09:10:00', 0),
    ('product-123', 'Under Armour Performance Towel', 'BB-025', 'BĂ³ng rá»•', 'Under Armour', 'Medium', 'XĂ¡m / Äen', 210000, 350000, 12, 'Äang bĂ¡n', '', NULL, 'KhÄƒn thá»ƒ thao Ä‘a dá»¥ng phĂ¹ há»£p cho ngÆ°á»i chÆ¡i bĂ³ng rá»• táº­p sĂ¢n trong nhĂ  vĂ  ngoĂ i trá»i.', 'Bá»• sung nhĂ³m khÄƒn lau cho bĂ³ng rá»•.', '2026-04-20 09:11:00', '2026-04-20 09:11:00', 0),
    ('product-124', 'Butterfly Selasia Shirt', 'TT-028', 'BĂ³ng bĂ n', 'Butterfly', 'M-L', 'Äen / Xanh', 720000, 1140000, 8, 'Äang bĂ¡n', '', NULL, 'Ăo thi Ä‘áº¥u bĂ³ng bĂ n cá»§a Butterfly phĂ¹ há»£p cho CLB, giáº£i phong trĂ o vĂ  thi Ä‘áº¥u Ä‘á»™i nhĂ³m.', 'Bá»• sung nhĂ³m trang phá»¥c cho bĂ³ng bĂ n.', '2026-04-20 09:12:00', '2026-04-20 09:12:00', 0),
    ('product-125', 'JOOLA Centrela Polo Shirt', 'TT-029', 'BĂ³ng bĂ n', 'JOOLA', 'M-L', 'Black / Blue', 650000, 990000, 9, 'Äang bĂ¡n', '', NULL, 'Ăo polo bĂ³ng bĂ n cá»§a JOOLA dĂ¹ng tá»‘t cho táº­p luyá»‡n, thi Ä‘áº¥u CLB vĂ  Ä‘á»“ng phá»¥c Ä‘á»™i.', 'Bá»• sung nhĂ³m trang phá»¥c cho bĂ³ng bĂ n.', '2026-04-20 09:13:00', '2026-04-20 09:13:00', 0),
    ('product-126', 'Yonex Crew Neck Shirt 10627', 'BM-023', 'Cáº§u lĂ´ng', 'Yonex', 'M-L', 'White / Clear Mint', 890000, 1390000, 10, 'Äang bĂ¡n', '', NULL, 'Ăo cáº§u lĂ´ng chĂ­nh hĂ£ng thuá»™c line Crew Neck Shirt cá»§a Yonex, phĂ¹ há»£p táº­p luyá»‡n vĂ  thi Ä‘áº¥u.', 'Bá»• sung nhĂ³m trang phá»¥c cho cáº§u lĂ´ng.', '2026-04-20 09:14:00', '2026-04-20 09:14:00', 0),
    ('product-127', 'VICTOR Knitted Shorts R-3096 A', 'BM-024', 'Cáº§u lĂ´ng', 'Victor', 'M-L', 'White', 520000, 820000, 9, 'Äang bĂ¡n', '', NULL, 'Quáº§n shorts thá»ƒ thao cá»§a Victor dĂ nh cho ngÆ°á»i chÆ¡i cáº§u lĂ´ng, máº·c nháº¹ vĂ  khĂ´ nhanh.', 'Bá»• sung nhĂ³m trang phá»¥c cho cáº§u lĂ´ng.', '2026-04-20 09:15:00', '2026-04-20 09:15:00', 0)
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
    mo_ta_ngan = VALUES(mo_ta_ngan),
    ghi_chu = VALUES(ghi_chu),
    is_deleted = VALUES(is_deleted);

INSERT INTO tbl_san_pham (
    id, ten_san_pham, sku, danh_muc, thuong_hieu, size, mau,
    gia_nhap, gia_ban, ton_kho, trang_thai, link_san_pham, hinh_anh_url,
    mo_ta_ngan, ghi_chu, ngay_tao, ngay_cap_nhat, is_deleted
)
VALUES
    ('product-128', 'Signed Jersey Lionel Messi Argentina 2024/25', 'FB-132', 'Bóng đá', 'adidas', 'L', 'Sky Blue / White', 54000000, 89900000, 1, 'Đang bán', '', NULL, 'Autographed collectible jersey for display, collection and premium gifting.', 'Superstar signatures collection - football.', '2026-04-21 10:00:00', '2026-04-21 10:00:00', 0),
    ('product-129', 'Signed Jersey Cristiano Ronaldo Portugal 2024/25', 'FB-133', 'Bóng đá', 'Nike', 'L', 'Red / Green', 58000000, 94900000, 1, 'Đang bán', '', NULL, 'Signed Portugal jersey in premium display-ready format.', 'Superstar signatures collection - football.', '2026-04-21 10:01:00', '2026-04-21 10:01:00', 0),
    ('product-130', 'Signed Jersey Neymar Jr Brazil 2024/25', 'FB-134', 'Bóng đá', 'Nike', 'L', 'Yellow / Green', 41000000, 69900000, 1, 'Đang bán', '', NULL, 'Signed Brazil jersey aimed at collectors and luxury gifting.', 'Superstar signatures collection - football.', '2026-04-21 10:02:00', '2026-04-21 10:02:00', 0),
    ('product-131', 'Signed Jersey Kylian Mbappe France 2024/25', 'FB-135', 'Bóng đá', 'Nike', 'L', 'Blue', 46000000, 74900000, 1, 'Đang bán', '', NULL, 'Signed France jersey with high-end memorabilia positioning.', 'Superstar signatures collection - football.', '2026-04-21 10:03:00', '2026-04-21 10:03:00', 0),
    ('product-132', 'Signed Jersey Michael Jordan Chicago Bulls', 'BB-126', 'Bóng rổ', 'Jordan', 'XL', 'Red / Black', 80000000, 129000000, 1, 'Đang bán', '', NULL, 'Premium signed basketball jersey for display and serious collectors.', 'Superstar signatures collection - basketball.', '2026-04-21 10:04:00', '2026-04-21 10:04:00', 0),
    ('product-133', 'Signed Jersey LeBron James Los Angeles Lakers', 'BB-127', 'Bóng rổ', 'Nike', 'XL', 'Gold / Purple', 61000000, 98000000, 1, 'Đang bán', '', NULL, 'Signed Lakers jersey positioned as elite basketball memorabilia.', 'Superstar signatures collection - basketball.', '2026-04-21 10:05:00', '2026-04-21 10:05:00', 0),
    ('product-134', 'Signed Jersey Earvin Ngapeth France Volleyball', 'VB-129', 'Bóng chuyền', 'ASICS', 'L', 'Blue / White', 18000000, 29900000, 2, 'Đang bán', '', NULL, 'Signed volleyball jersey for premium display and gift use.', 'Superstar signatures collection - volleyball.', '2026-04-21 10:06:00', '2026-04-21 10:06:00', 0),
    ('product-135', 'Signed Jersey Yuji Nishida Japan Volleyball', 'VB-130', 'Bóng chuyền', 'Mizuno', 'L', 'Red / Black', 17000000, 27900000, 2, 'Đang bán', '', NULL, 'Signed Japan volleyball jersey in limited collector quantity.', 'Superstar signatures collection - volleyball.', '2026-04-21 10:07:00', '2026-04-21 10:07:00', 0),
    ('product-136', 'Signed Paddle Ma Long Limited Edition', 'TT-130', 'Bóng bàn', 'Butterfly', 'FL', 'Wood / Red / Black', 15000000, 24900000, 2, 'Đang bán', '', NULL, 'Limited signed paddle aimed at table tennis collectors.', 'Superstar signatures collection - table tennis.', '2026-04-21 10:08:00', '2026-04-21 10:08:00', 0),
    ('product-137', 'Signed Paddle Fan Zhendong Limited Edition', 'TT-131', 'Bóng bàn', 'DHS', 'FL', 'Wood / Red / Black', 14000000, 22900000, 2, 'Đang bán', '', NULL, 'Signed paddle for display cabinets and premium gifting.', 'Superstar signatures collection - table tennis.', '2026-04-21 10:09:00', '2026-04-21 10:09:00', 0),
    ('product-138', 'Signed Racket Lin Dan Limited Edition', 'BM-128', 'Cầu lông', 'Yonex', '3U-G5', 'Black / Gold', 22000000, 34900000, 2, 'Đang bán', '', NULL, 'Signed badminton racket in limited collector format.', 'Superstar signatures collection - badminton.', '2026-04-21 10:10:00', '2026-04-21 10:10:00', 0),
    ('product-139', 'Signed Racket Viktor Axelsen Limited Edition', 'BM-129', 'Cầu lông', 'Victor', '4U-G5', 'Black / Blue', 20000000, 31900000, 2, 'Đang bán', '', NULL, 'Signed badminton racket for display, collection and gift demand.', 'Superstar signatures collection - badminton.', '2026-04-21 10:11:00', '2026-04-21 10:11:00', 0)
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
    mo_ta_ngan = VALUES(mo_ta_ngan),
    ghi_chu = VALUES(ghi_chu),
    is_deleted = VALUES(is_deleted);

UPDATE tbl_san_pham
SET danh_muc = CASE
    WHEN sku LIKE 'FB-%' THEN 'BĂ³ng Ä‘Ă¡'
    WHEN sku LIKE 'TT-%' THEN 'BĂ³ng bĂ n'
    WHEN sku LIKE 'VB-%' THEN 'BĂ³ng chuyá»n'
    WHEN sku LIKE 'BB-%' THEN 'BĂ³ng rá»•'
    WHEN sku LIKE 'BM-%' THEN 'Cáº§u lĂ´ng'
    ELSE danh_muc
END;

UPDATE tbl_san_pham
SET hinh_anh_url = CASE
    WHEN sku LIKE 'FB-%' THEN '/assets/images/catalog/football.svg'
    WHEN sku LIKE 'TT-%' THEN '/assets/images/catalog/table-tennis.svg'
    WHEN sku LIKE 'VB-%' THEN '/assets/images/catalog/volleyball.svg'
    WHEN sku LIKE 'BB-%' THEN '/assets/images/catalog/basketball.svg'
    WHEN sku LIKE 'BM-%' THEN '/assets/images/catalog/badminton.svg'
    ELSE hinh_anh_url
END
WHERE is_deleted = 0;

INSERT INTO tbl_bien_the_san_pham (
    id, product_id, sku_bien_the, size, mau, ton_kho_hien_tai, gia_nhap, gia_ban,
    hinh_anh_url, trang_thai, ghi_chu, ngay_tao, ngay_cap_nhat, is_deleted
)
VALUES
    ('variant-001', 'product-001', 'FB-001-42-XANH', '42', 'Xanh', 6, 850000, 1250000, NULL, 'Ă„Âang bÄ‚Â¡n', '', '2026-04-18 08:40:00', '2026-04-18 08:40:00', 0),
    ('variant-002', 'product-001', 'FB-001-43-TRANGXANH', '43', 'TrĂ¡ÂºÂ¯ng xanh', 4, 850000, 1250000, NULL, 'Ă„Âang bÄ‚Â¡n', '', '2026-04-18 08:41:00', '2026-04-18 08:41:00', 0),
    ('variant-003', 'product-002', 'FB-003-M-XANHDUONG', 'M', 'Xanh dĂ†Â°Ă†Â¡ng', 12, 300000, 550000, NULL, 'Ă„Âang bÄ‚Â¡n', '', '2026-04-18 08:42:00', '2026-04-18 08:42:00', 0),
    ('variant-004', 'product-002', 'FB-003-L-XANHDUONG', 'L', 'Xanh dĂ†Â°Ă†Â¡ng', 13, 300000, 550000, NULL, 'Ă„Âang bÄ‚Â¡n', '', '2026-04-18 08:43:00', '2026-04-18 08:43:00', 0),
    ('variant-005', 'product-003', 'BB-002-SO7-CAM', 'SĂ¡Â»â€˜ 7', 'Cam', 15, 400000, 650000, NULL, 'Ă„Âang bÄ‚Â¡n', '', '2026-04-18 08:44:00', '2026-04-18 08:44:00', 0),
    ('variant-006', 'product-004', 'BM-001-4UG5-DENXANH', '4U-G5', 'Ă„Âen xanh', 8, 1200000, 1850000, NULL, 'Ă„Âang bÄ‚Â¡n', '', '2026-04-18 08:45:00', '2026-04-18 08:45:00', 0),
    ('variant-007', 'product-005', 'VB-001-TIEUCHUAN-VANGXANH', 'TiÄ‚Âªu chuĂ¡ÂºÂ©n', 'VÄ‚Â ng xanh', 18, 80000, 120000, NULL, 'Ă„Âang bÄ‚Â¡n', '', '2026-04-18 08:46:00', '2026-04-18 08:46:00', 0),
    ('variant-008', 'product-005', 'VB-001-MEM-VANGXANH', 'MĂ¡Â»Âm', 'VÄ‚Â ng xanh', 12, 75000, 115000, NULL, 'Ă„Âang bÄ‚Â¡n', '', '2026-04-18 08:47:00', '2026-04-18 08:47:00', 0),
    ('variant-009', 'product-006', 'TT-001-TIEUCHUAN-DODEN', 'TiÄ‚Âªu chuĂ¡ÂºÂ©n', 'Ă„ÂĂ¡Â»Â Ă„â€˜en', 10, 250000, 450000, NULL, 'Ă„Âang bÄ‚Â¡n', '', '2026-04-18 08:48:00', '2026-04-18 08:48:00', 0)
ON DUPLICATE KEY UPDATE
    ton_kho_hien_tai = VALUES(ton_kho_hien_tai),
    gia_nhap = VALUES(gia_nhap),
    gia_ban = VALUES(gia_ban),
    trang_thai = VALUES(trang_thai),
    is_deleted = VALUES(is_deleted);

INSERT INTO tbl_gio_hang (
    id, user_id, customer_id, trang_thai, tong_san_pham, tong_tien_tam_tinh, ngay_tao, ngay_cap_nhat
)
VALUES
    ('cart-001', 'user-customer-001', 'customer-001', 'ACTIVE', 2, 2400000, '2026-04-18 08:50:00', '2026-04-18 08:55:00'),
    ('cart-002', 'user-customer-002', 'customer-002', 'ACTIVE', 1, 550000, '2026-04-18 08:51:00', '2026-04-18 08:56:00')
ON DUPLICATE KEY UPDATE
    tong_san_pham = VALUES(tong_san_pham),
    tong_tien_tam_tinh = VALUES(tong_tien_tam_tinh),
    trang_thai = VALUES(trang_thai);

INSERT INTO tbl_chi_tiet_gio_hang (
    id, cart_id, product_id, variant_id, so_luong, don_gia, thanh_tien, ngay_tao, ngay_cap_nhat
)
VALUES
    ('cart-item-001', 'cart-001', 'product-002', 'variant-003', 1, 550000, 550000, '2026-04-18 08:52:00', '2026-04-18 08:52:00'),
    ('cart-item-002', 'cart-001', 'product-004', 'variant-006', 1, 1850000, 1850000, '2026-04-18 08:53:00', '2026-04-18 08:53:00'),
    ('cart-item-003', 'cart-002', 'product-002', 'variant-004', 1, 550000, 550000, '2026-04-18 08:54:00', '2026-04-18 08:54:00')
ON DUPLICATE KEY UPDATE
    so_luong = VALUES(so_luong),
    don_gia = VALUES(don_gia),
    thanh_tien = VALUES(thanh_tien);

INSERT INTO tbl_don_hang (
    id, ma_don, ngay_dat, customer_id, user_id, nguoi_nhan, so_dien_thoai_giao,
    trang_thai_don, thanh_toan, da_thanh_toan, tong_tien, phi_ship, giam_gia,
    dia_chi_giao, ghi_chu, ngay_tao, ngay_cap_nhat, is_deleted
)
VALUES
    ('order-001', 'DH-20260418-0001', '2026-04-18', 'customer-001', 'user-customer-001', 'NguyĂ¡Â»â€¦n VĂ„Æ’n A', '0901234567', 'HoÄ‚Â n tĂ¡ÂºÂ¥t', 'ChuyĂ¡Â»Æ’n khoĂ¡ÂºÂ£n', 1, 1590000, 30000, 50000, '123 Ă„ÂĂ†Â°Ă¡Â»Âng LÄ‚Âª LĂ¡Â»Â£i, QuĂ¡ÂºÂ­n 1, TP.HCM', 'Giao giĂ¡Â»Â hÄ‚Â nh chÄ‚Â­nh', '2026-04-18 09:00:00', '2026-04-18 09:00:00', 0),
    ('order-002', 'DH-20260418-0002', '2026-04-18', 'customer-002', 'user-customer-002', 'TrĂ¡ÂºÂ§n ThĂ¡Â»â€¹ B', '0987654321', 'Ă„Âang giao', 'COD', 0, 570000, 20000, 0, '456 Ă„ÂĂ†Â°Ă¡Â»Âng NguyĂ¡Â»â€¦n HuĂ¡Â»â€¡, QuĂ¡ÂºÂ­n 2, TP.HCM', 'GĂ¡Â»Âi trĂ†Â°Ă¡Â»â€ºc khi giao', '2026-04-18 09:10:00', '2026-04-18 09:10:00', 0),
    ('order-003', 'DH-20260418-0003', '2026-04-18', 'customer-003', NULL, 'LÄ‚Âª VĂ„Æ’n C', '0911222333', 'ChĂ¡Â»Â xÄ‚Â¡c nhĂ¡ÂºÂ­n', 'VÄ‚Â­ Ă„â€˜iĂ¡Â»â€¡n tĂ¡Â»Â­', 0, 650000, 25000, 25000, '789 Ă„ÂĂ†Â°Ă¡Â»Âng TrĂ¡ÂºÂ§n PhÄ‚Âº, QuĂ¡ÂºÂ­n 3, TP.HCM', 'Ă„ÂĂ†Â¡n hÄ‚Â ng khÄ‚Â¡ch lĂ¡ÂºÂ»', '2026-04-18 09:20:00', '2026-04-18 09:20:00', 0)
ON DUPLICATE KEY UPDATE
    customer_id = VALUES(customer_id),
    user_id = VALUES(user_id),
    nguoi_nhan = VALUES(nguoi_nhan),
    so_dien_thoai_giao = VALUES(so_dien_thoai_giao),
    trang_thai_don = VALUES(trang_thai_don),
    thanh_toan = VALUES(thanh_toan),
    da_thanh_toan = VALUES(da_thanh_toan),
    tong_tien = VALUES(tong_tien),
    phi_ship = VALUES(phi_ship),
    giam_gia = VALUES(giam_gia),
    dia_chi_giao = VALUES(dia_chi_giao),
    ghi_chu = VALUES(ghi_chu),
    is_deleted = VALUES(is_deleted);

INSERT INTO tbl_chi_tiet_don_hang (
    id, order_id, product_id, variant_id, ten_san_pham_snapshot, sku_snapshot,
    size_snapshot, mau_snapshot, so_luong, don_gia, thanh_tien, ngay_tao
)
VALUES
    ('order-item-001', 'order-001', 'product-001', 'variant-001', 'GiÄ‚Â y bÄ‚Â³ng Ă„â€˜Ä‚Â¡ cĂ¡Â»Â nhÄ‚Â¢n tĂ¡ÂºÂ¡o Nike', 'FB-001-42-XANH', '42', 'Xanh', 1, 1250000, 1250000, '2026-04-18 09:00:00'),
    ('order-item-002', 'order-001', 'product-005', 'variant-007', 'BÄ‚Â³ng chuyĂ¡Â»Ân hĂ†Â¡i Ă„ÂĂ¡Â»â„¢ng LĂ¡Â»Â±c', 'VB-001-TIEUCHUAN-VANGXANH', 'TiÄ‚Âªu chuĂ¡ÂºÂ©n', 'VÄ‚Â ng xanh', 3, 120000, 360000, '2026-04-18 09:00:00'),
    ('order-item-003', 'order-002', 'product-002', 'variant-004', 'Ä‚Âo Ă„â€˜Ă¡ÂºÂ¥u CLB Manchester City 2024', 'FB-003-L-XANHDUONG', 'L', 'Xanh dĂ†Â°Ă†Â¡ng', 1, 550000, 550000, '2026-04-18 09:10:00'),
    ('order-item-004', 'order-003', 'product-003', 'variant-005', 'BÄ‚Â³ng rĂ¡Â»â€¢ Spalding NBA', 'BB-002-SO7-CAM', 'SĂ¡Â»â€˜ 7', 'Cam', 1, 650000, 650000, '2026-04-18 09:20:00')
ON DUPLICATE KEY UPDATE
    so_luong = VALUES(so_luong),
    don_gia = VALUES(don_gia),
    thanh_tien = VALUES(thanh_tien);

INSERT INTO tbl_thanh_toan (
    id, order_id, ma_giao_dich_truy_xuat, phuong_thuc, so_tien, trang_thai,
    nha_cung_cap, raw_response_json, thanh_toan_luc, ghi_chu, ngay_tao, ngay_cap_nhat
)
VALUES
    ('payment-001', 'order-001', 'TXN-DH-20260418-0001', 'ChuyĂ¡Â»Æ’n khoĂ¡ÂºÂ£n', 1590000, 'ThÄ‚Â nh cÄ‚Â´ng', 'Vietcombank', JSON_OBJECT('status', 'success', 'bank', 'VCB'), '2026-04-18 09:02:00', 'Thanh toÄ‚Â¡n Ă„â€˜Ä‚Â£ Ă„â€˜Ă¡Â»â€˜i soÄ‚Â¡t', '2026-04-18 09:02:00', '2026-04-18 09:02:00'),
    ('payment-002', 'order-002', 'COD-DH-20260418-0002', 'COD', 570000, 'ChĂ¡Â»Â thu hĂ¡Â»â„¢', 'NĂ¡Â»â„¢i bĂ¡Â»â„¢', JSON_OBJECT('status', 'pending', 'provider', 'COD'), NULL, 'Thu tiĂ¡Â»Ân khi giao hÄ‚Â ng', '2026-04-18 09:11:00', '2026-04-18 09:11:00'),
    ('payment-003', 'order-003', 'MOMO-DH-20260418-0003', 'VÄ‚Â­ Ă„â€˜iĂ¡Â»â€¡n tĂ¡Â»Â­', 650000, 'KhĂ¡Â»Å¸i tĂ¡ÂºÂ¡o', 'MoMo', JSON_OBJECT('status', 'created', 'provider', 'MoMo'), NULL, 'ChĂ¡Â»Â khÄ‚Â¡ch xÄ‚Â¡c nhĂ¡ÂºÂ­n thanh toÄ‚Â¡n', '2026-04-18 09:21:00', '2026-04-18 09:21:00')
ON DUPLICATE KEY UPDATE
    so_tien = VALUES(so_tien),
    trang_thai = VALUES(trang_thai),
    nha_cung_cap = VALUES(nha_cung_cap),
    thanh_toan_luc = VALUES(thanh_toan_luc),
    ghi_chu = VALUES(ghi_chu);

INSERT INTO tbl_san_pham (
    id, ten_san_pham, sku, danh_muc, thuong_hieu, size, mau, gia_nhap, gia_ban,
    ton_kho, trang_thai, link_san_pham, hinh_anh_url, mo_ta_ngan, ghi_chu, ngay_tao, ngay_cap_nhat, is_deleted
)
VALUES
    ('product-140', 'Nike Pegasus 41', 'RUN-001', 'Chạy bộ', 'Nike', '40-44', 'Xanh dương / Trắng', 2490000, 3490000, 12, 'Đang bán', '', '', 'Mẫu giày chạy bộ road running thuộc dòng Pegasus 41 của Nike, phù hợp cho chạy hằng ngày với độ đàn hồi cân bằng và cảm giác ổn định.', 'Nguồn tham chiếu: Nike official - Pegasus 41.', '2026-04-23 08:00:00', '2026-04-23 08:00:00', 0),
    ('product-141', 'Nike Vomero 18', 'RUN-002', 'Chạy bộ', 'Nike', '40-44', 'Trắng / Xanh navy', 2790000, 3790000, 9, 'Đang bán', '', '', 'Giày road running thiên về êm ái thuộc dòng Vomero 18, phù hợp cho runner cần đệm dày và cảm giác mềm khi chạy quãng đường dài.', 'Nguồn tham chiếu: Nike official - Vomero 18.', '2026-04-23 08:01:00', '2026-04-23 08:01:00', 0),
    ('product-142', 'ASICS GEL-NIMBUS 27', 'RUN-003', 'Chạy bộ', 'ASICS', '40-44', 'Trắng / Bạc', 2650000, 3650000, 8, 'Đang bán', '', '', 'Mẫu giày chạy bộ cao cấp GEL-NIMBUS 27 của ASICS nổi bật với đệm êm, phù hợp cho chạy daily training và recovery run.', 'Nguồn tham chiếu: ASICS official - GEL-NIMBUS 27.', '2026-04-23 08:02:00', '2026-04-23 08:02:00', 0),
    ('product-143', 'ASICS GEL-KAYANO 31', 'RUN-004', 'Chạy bộ', 'ASICS', '40-44', 'Đen / Xanh ngọc', 2890000, 3990000, 7, 'Đang bán', '', '', 'GEL-KAYANO 31 là dòng stability running shoe của ASICS, phù hợp với runner cần hỗ trợ tốt hơn cho những buổi chạy hằng ngày.', 'Nguồn tham chiếu: ASICS official - GEL-KAYANO 31.', '2026-04-23 08:03:00', '2026-04-23 08:03:00', 0),
    ('product-144', 'Nike Miler Men''s Dri-FIT Short-Sleeve Running Top', 'RUN-005', 'Chạy bộ', 'Nike', 'M-L', 'Xám / Đen', 690000, 990000, 15, 'Đang bán', '', '', 'Áo chạy bộ tay ngắn Nike Miler dùng chất liệu Dri-FIT, thoáng khí và phù hợp cho các buổi chạy hằng ngày trong thời tiết nóng.', 'Nguồn tham chiếu: Nike official - Miler Running Top.', '2026-04-23 08:04:00', '2026-04-23 08:04:00', 0),
    ('product-145', 'Nike Stride Men''s Dri-FIT 7 inch 2-in-1 Running Shorts', 'RUN-006', 'Chạy bộ', 'Nike', 'M-L', 'Đen', 790000, 1090000, 14, 'Đang bán', '', '', 'Quần chạy bộ 2 trong 1 Nike Stride dài 7 inch, tối ưu cho vận động linh hoạt và kiểm soát mồ hôi trong các buổi chạy cường độ vừa.', 'Nguồn tham chiếu: Nike official - Stride Running Shorts.', '2026-04-23 08:05:00', '2026-04-23 08:05:00', 0),
    ('product-146', 'ASICS ROAD PACKABLE JACKET', 'RUN-007', 'Chạy bộ', 'ASICS', 'M-L', 'Xanh navy', 1390000, 1890000, 10, 'Đang bán', '', '', 'Áo khoác chạy bộ ROAD PACKABLE JACKET của ASICS có thể gấp gọn, phù hợp cho runner cần lớp ngoài nhẹ khi thời tiết thay đổi.', 'Nguồn tham chiếu: ASICS official - ROAD PACKABLE JACKET.', '2026-04-23 08:06:00', '2026-04-23 08:06:00', 0),
    ('product-147', 'Nike Metcon 9', 'GYM-001', 'Tập gym', 'Nike', '40-44', 'Đen / Trắng', 3190000, 4290000, 8, 'Đang bán', '', '', 'Nike Metcon 9 là mẫu giày workout chuyên cho tập gym, hỗ trợ các bài sức mạnh, conditioning và bài tập toàn thân trong phòng tập.', 'Nguồn tham chiếu: Nike official - Metcon 9.', '2026-04-23 08:07:00', '2026-04-23 08:07:00', 0),
    ('product-148', 'Nike Free Metcon 6', 'GYM-002', 'Tập gym', 'Nike', '40-44', 'Trắng / Xám', 2590000, 3590000, 9, 'Đang bán', '', '', 'Free Metcon 6 kết hợp độ linh hoạt của Nike Free với sự ổn định cho tập gym, phù hợp cho circuit training và bài tập cường độ cao.', 'Nguồn tham chiếu: Nike official - Free Metcon 6.', '2026-04-23 08:08:00', '2026-04-23 08:08:00', 0),
    ('product-149', 'Nike Dri-FIT Primary Men''s Training T-Shirt', 'GYM-003', 'Tập gym', 'Nike', 'M-L', 'Xanh rêu', 690000, 950000, 16, 'Đang bán', '', '', 'Áo tập gym Nike Dri-FIT Primary là lựa chọn cơ bản cho các buổi workout nhờ chất vải thấm hút tốt và phom dễ vận động.', 'Nguồn tham chiếu: Nike official - Dri-FIT Primary Training T-Shirt.', '2026-04-23 08:09:00', '2026-04-23 08:09:00', 0),
    ('product-150', 'Nike Pro Men''s Dri-FIT Fitness Tights', 'GYM-004', 'Tập gym', 'Nike', 'M-L', 'Đen', 790000, 1090000, 12, 'Đang bán', '', '', 'Quần tights Nike Pro Dri-FIT phù hợp cho squat, deadlift và các bài tập cường độ cao, hỗ trợ ôm cơ và thoát mồ hôi.', 'Nguồn tham chiếu: Nike official - Pro Fitness Tights.', '2026-04-23 08:10:00', '2026-04-23 08:10:00', 0),
    ('product-151', 'Nike Brasilia 9.5 Training Duffel Bag (Medium, 60L)', 'GYM-005', 'Tập gym', 'Nike', '60L', 'Đen / Trắng', 790000, 1090000, 11, 'Đang bán', '', '', 'Túi tập Nike Brasilia 9.5 dung tích 60L phù hợp mang giày, quần áo tập và phụ kiện cho lịch tập gym hằng ngày.', 'Nguồn tham chiếu: Nike official - Brasilia 9.5 Training Duffel Bag.', '2026-04-23 08:11:00', '2026-04-23 08:11:00', 0),
    ('product-152', 'Nike Brasilia 9.5 Training Backpack (Medium, 24L)', 'GYM-006', 'Tập gym', 'Nike', '24L', 'Đen / Trắng', 690000, 950000, 13, 'Đang bán', '', '', 'Balo Nike Brasilia 9.5 Training Backpack thích hợp cho người tập gym cần mang laptop, bình nước và quần áo tập trong một ngày.', 'Nguồn tham chiếu: Nike official - Brasilia 9.5 Training Backpack.', '2026-04-23 08:12:00', '2026-04-23 08:12:00', 0)
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
    hinh_anh_url = VALUES(hinh_anh_url),
    mo_ta_ngan = VALUES(mo_ta_ngan),
    ghi_chu = VALUES(ghi_chu),
    ngay_cap_nhat = VALUES(ngay_cap_nhat),
    is_deleted = VALUES(is_deleted);

