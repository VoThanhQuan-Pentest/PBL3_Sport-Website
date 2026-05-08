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
