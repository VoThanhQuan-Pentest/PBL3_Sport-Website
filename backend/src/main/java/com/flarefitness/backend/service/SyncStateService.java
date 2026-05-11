package com.flarefitness.backend.service;

import com.flarefitness.backend.dto.sync.SyncStateRequest;
import com.flarefitness.backend.dto.sync.SyncStateResponse;
import com.flarefitness.backend.entity.User;
import com.flarefitness.backend.entity.sync.SyncState;
import com.flarefitness.backend.exception.BadRequestException;
import com.flarefitness.backend.exception.UnauthorizedException;
import com.flarefitness.backend.repository.sync.SyncStateRepository;
import com.flarefitness.backend.security.CurrentUserPrincipal;
import java.time.LocalDateTime;
import java.util.Locale;
import java.util.Set;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SyncStateService {

    private static final String SCOPE_USER = "USER";
    private static final String SCOPE_APP = "APP";
    private static final int MAX_PAYLOAD_LENGTH = 1_000_000;

    private static final Set<String> USER_KEYS = Set.of(
            "cart",
            "wishlist",
            "address-book",
            "search-history",
            "voucher-assignments"
    );

    private static final Set<String> PUBLIC_APP_KEYS = Set.of(
            "home-showcase-visible",
            "category-registry",
            "managed-reviews",
            "managed-vouchers"
    );

    private final SyncStateRepository syncStateRepository;

    public SyncStateService(SyncStateRepository syncStateRepository) {
        this.syncStateRepository = syncStateRepository;
    }

    @Transactional(readOnly = true)
    public SyncStateResponse getCurrentUserState(String key, Authentication authentication) {
        User user = requireUser(authentication);
        String normalizedKey = normalizeUserKey(key);
        return syncStateRepository.findByScopeAndOwnerIdAndKeyName(SCOPE_USER, user.getId(), normalizedKey)
                .map(this::toResponse)
                .orElse(new SyncStateResponse(SCOPE_USER, user.getId(), normalizedKey, null, null));
    }

    @Transactional
    public SyncStateResponse saveCurrentUserState(String key, SyncStateRequest request, Authentication authentication) {
        User user = requireCustomer(authentication);
        String normalizedKey = normalizeUserKey(key);
        return saveState(SCOPE_USER, user.getId(), normalizedKey, request);
    }

    @Transactional(readOnly = true)
    public SyncStateResponse getAppState(String key) {
        String normalizedKey = normalizeAppKey(key);
        return syncStateRepository.findByScopeAndKeyNameAndOwnerIdIsNull(SCOPE_APP, normalizedKey)
                .map(this::toResponse)
                .orElse(new SyncStateResponse(SCOPE_APP, null, normalizedKey, null, null));
    }

    @Transactional
    public SyncStateResponse saveAppState(String key, SyncStateRequest request, Authentication authentication) {
        User user = requireUser(authentication);
        String normalizedKey = normalizeAppKey(key);
        if (!isStaffOrAdmin(user)) {
            throw new UnauthorizedException("Ban khong co quyen cap nhat du lieu dung chung.");
        }
        return saveState(SCOPE_APP, null, normalizedKey, request);
    }

    private SyncStateResponse saveState(String scope, String ownerId, String key, SyncStateRequest request) {
        String payload = request == null ? null : request.payload();
        if (payload == null) {
            throw new BadRequestException("Payload khong duoc de trong.");
        }
        if (payload.length() > MAX_PAYLOAD_LENGTH) {
            throw new BadRequestException("Payload vuot qua gioi han cho phep.");
        }

        SyncState state = findState(scope, ownerId, key);
        if (state.getId() == null) {
            state.setId(buildId(scope, ownerId, key));
            state.setScope(scope);
            state.setOwnerId(ownerId);
            state.setKeyName(key);
        }
        state.setPayload(payload);
        state.setUpdatedAt(LocalDateTime.now());
        return toResponse(syncStateRepository.save(state));
    }

    private SyncState findState(String scope, String ownerId, String key) {
        if (ownerId == null) {
            return syncStateRepository.findByScopeAndKeyNameAndOwnerIdIsNull(scope, key).orElseGet(SyncState::new);
        }
        return syncStateRepository.findByScopeAndOwnerIdAndKeyName(scope, ownerId, key).orElseGet(SyncState::new);
    }

    private SyncStateResponse toResponse(SyncState state) {
        return new SyncStateResponse(
                state.getScope(),
                state.getOwnerId(),
                state.getKeyName(),
                state.getPayload(),
                state.getUpdatedAt()
        );
    }

    private String normalizeUserKey(String key) {
        String normalized = normalizeKey(key);
        if (!USER_KEYS.contains(normalized)) {
            throw new BadRequestException("Sync key khong hop le.");
        }
        return normalized;
    }

    private String normalizeAppKey(String key) {
        String normalized = normalizeKey(key);
        if (!PUBLIC_APP_KEYS.contains(normalized)) {
            throw new BadRequestException("Sync key khong hop le.");
        }
        return normalized;
    }

    private String normalizeKey(String key) {
        String normalized = String.valueOf(key == null ? "" : key)
                .toLowerCase(Locale.ROOT)
                .replaceAll("[^a-z0-9-]", "")
                .trim();
        if (normalized.isBlank()) {
            throw new BadRequestException("Sync key khong hop le.");
        }
        return normalized;
    }

    private String buildId(String scope, String ownerId, String key) {
        return scope.toLowerCase(Locale.ROOT) + ":" + (ownerId == null ? "global" : ownerId) + ":" + key;
    }

    private User requireUser(Authentication authentication) {
        if (authentication == null || !(authentication.getPrincipal() instanceof CurrentUserPrincipal principal)) {
            throw new UnauthorizedException("Phien dang nhap khong hop le.");
        }
        return principal.getUser();
    }

    private User requireCustomer(Authentication authentication) {
        User user = requireUser(authentication);
        if (!isCustomer(user)) {
            throw new UnauthorizedException("Chuc nang nay chi danh cho khach hang.");
        }
        return user;
    }

    private boolean isCustomer(User user) {
        String authority = CurrentUserPrincipal.toAuthority(user.getRole());
        return !"ROLE_ADMIN".equals(authority) && !"ROLE_STAFF".equals(authority);
    }

    private boolean isStaffOrAdmin(User user) {
        String authority = CurrentUserPrincipal.toAuthority(user.getRole());
        return "ROLE_ADMIN".equals(authority) || "ROLE_STAFF".equals(authority);
    }
}
