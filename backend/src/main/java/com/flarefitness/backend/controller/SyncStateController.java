package com.flarefitness.backend.controller;

import com.flarefitness.backend.dto.sync.SyncStateRequest;
import com.flarefitness.backend.dto.sync.SyncStateResponse;
import com.flarefitness.backend.service.SyncStateService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/sync")
public class SyncStateController {

    private final SyncStateService syncStateService;

    public SyncStateController(SyncStateService syncStateService) {
        this.syncStateService = syncStateService;
    }

    @GetMapping("/me/{key}")
    public SyncStateResponse getMyState(@PathVariable String key, Authentication authentication) {
        return syncStateService.getCurrentUserState(key, authentication);
    }

    @PutMapping("/me/{key}")
    public SyncStateResponse saveMyState(
            @PathVariable String key,
            @RequestBody SyncStateRequest request,
            Authentication authentication
    ) {
        return syncStateService.saveCurrentUserState(key, request, authentication);
    }

    @GetMapping("/app/{key}")
    public SyncStateResponse getAppState(@PathVariable String key) {
        return syncStateService.getAppState(key);
    }

    @PutMapping("/app/{key}")
    public SyncStateResponse saveAppState(
            @PathVariable String key,
            @RequestBody SyncStateRequest request,
            Authentication authentication
    ) {
        return syncStateService.saveAppState(key, request, authentication);
    }
}
