CREATE TABLE IF NOT EXISTS tbl_sync_state (
    id VARCHAR(180) NOT NULL,
    scope VARCHAR(20) NOT NULL,
    owner_id VARCHAR(64) NULL,
    state_key VARCHAR(80) NOT NULL,
    payload LONGTEXT NOT NULL,
    ngay_cap_nhat DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uk_sync_state_scope_owner_key (scope, owner_id, state_key),
    KEY idx_sync_state_scope_key (scope, state_key),
    CONSTRAINT fk_sync_state_user
        FOREIGN KEY (owner_id) REFERENCES tbl_nguoi_dung(id)
        ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
