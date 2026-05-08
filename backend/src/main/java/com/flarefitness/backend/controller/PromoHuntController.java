package com.flarefitness.backend.controller;

import com.flarefitness.backend.dto.promo.CreatePromoHuntCampaignRequest;
import com.flarefitness.backend.dto.promo.PromoHuntCampaignResponse;
import com.flarefitness.backend.service.PromoHuntService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class PromoHuntController {

    private final PromoHuntService promoHuntService;

    public PromoHuntController(PromoHuntService promoHuntService) {
        this.promoHuntService = promoHuntService;
    }

    @GetMapping("/promo-hunt/campaigns")
    public ResponseEntity<List<PromoHuntCampaignResponse>> getCampaigns(Authentication authentication) {
        return ResponseEntity.ok(promoHuntService.getCampaigns(authentication));
    }

    @PostMapping("/promo-hunt/campaigns/{campaignId}/claim")
    public ResponseEntity<PromoHuntCampaignResponse> claimCampaign(
            Authentication authentication,
            @PathVariable String campaignId
    ) {
        return ResponseEntity.ok(promoHuntService.claimCampaign(authentication, campaignId));
    }

    @PostMapping("/admin/promo-hunt/campaigns")
    @ResponseStatus(HttpStatus.CREATED)
    public PromoHuntCampaignResponse createCampaign(@Valid @RequestBody CreatePromoHuntCampaignRequest request) {
        return promoHuntService.createCampaign(request);
    }

    @DeleteMapping("/admin/promo-hunt/campaigns/{campaignId}")
    public ResponseEntity<Void> deleteCampaign(@PathVariable String campaignId) {
        promoHuntService.deleteCampaign(campaignId);
        return ResponseEntity.noContent().build();
    }
}
