package com.flarefitness.backend.repository.sync;

import com.flarefitness.backend.entity.sync.SyncState;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SyncStateRepository extends JpaRepository<SyncState, String> {

    Optional<SyncState> findByScopeAndOwnerIdAndKeyName(String scope, String ownerId, String keyName);

    Optional<SyncState> findByScopeAndKeyNameAndOwnerIdIsNull(String scope, String keyName);
}
