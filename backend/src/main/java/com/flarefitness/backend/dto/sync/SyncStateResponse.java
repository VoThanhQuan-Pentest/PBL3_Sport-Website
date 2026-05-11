package com.flarefitness.backend.dto.sync;

import java.time.LocalDateTime;

public record SyncStateResponse(
        String scope,
        String ownerId,
        String key,
        String payload,
        LocalDateTime updatedAt
) {
}
