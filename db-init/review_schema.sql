SET NAMES utf8mb4;
USE flare_fitness;

CREATE TABLE IF NOT EXISTS tbl_danh_gia_san_pham (
    id VARCHAR(64) NOT NULL,
    product_id VARCHAR(64) NOT NULL,
    user_id VARCHAR(64) NOT NULL,
    reviewer_name VARCHAR(150) NOT NULL,
    rating INT NOT NULL,
    content VARCHAR(1000) NOT NULL,
    status VARCHAR(30) NOT NULL DEFAULT 'Hiển thị',
    ngay_tao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY idx_tbl_danh_gia_product (product_id),
    KEY idx_tbl_danh_gia_user (user_id),
    KEY idx_tbl_danh_gia_status (status),
    KEY idx_tbl_danh_gia_ngay_tao (ngay_tao),
    CONSTRAINT fk_tbl_danh_gia_product
        FOREIGN KEY (product_id) REFERENCES tbl_san_pham (id)
        ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT fk_tbl_danh_gia_user
        FOREIGN KEY (user_id) REFERENCES tbl_nguoi_dung (id)
        ON UPDATE CASCADE ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
