package com.flarefitness.backend.service;

import com.flarefitness.backend.dto.promo.CreatePromoHuntCampaignRequest;
import com.flarefitness.backend.dto.promo.PromoHuntCampaignResponse;
import com.flarefitness.backend.entity.User;
import com.flarefitness.backend.entity.promo.PromoHuntCampaign;
import com.flarefitness.backend.entity.promo.PromoHuntClaim;
import com.flarefitness.backend.exception.BadRequestException;
import com.flarefitness.backend.exception.ResourceNotFoundException;
import com.flarefitness.backend.exception.UnauthorizedException;
import com.flarefitness.backend.repository.promo.PromoHuntCampaignRepository;
import com.flarefitness.backend.repository.promo.PromoHuntClaimRepository;
import com.flarefitness.backend.security.CurrentUserPrincipal;
import java.text.Normalizer;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.function.Function;
import java.util.stream.Collectors;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PromoHuntService {

    private static final String STATUS_ACTIVE_CODE = "ACTIVE";
    private static final String STATUS_DISABLED_CODE = "DISABLED";
    private static final String STATUS_ACTIVE_LABEL = "Ho\u1ea1t \u0111\u1ed9ng";
    private static final String STATUS_DISABLED_LABEL = "T\u1ea1m kh\u00f3a";
    private static final Set<String> ALLOWED_STATUS_CODES = Set.of(STATUS_ACTIVE_CODE, STATUS_DISABLED_CODE);

    private final PromoHuntCampaignRepository campaignRepository;
    private final PromoHuntClaimRepository claimRepository;

    public PromoHuntService(
            PromoHuntCampaignRepository campaignRepository,
            PromoHuntClaimRepository claimRepository
    ) {
        this.campaignRepository = campaignRepository;
        this.claimRepository = claimRepository;
    }

    @Transactional(readOnly = true)
    public List<PromoHuntCampaignResponse> getCampaigns(Authentication authentication) {
        User user = getAuthenticatedUser(authentication);
        List<PromoHuntCampaign> campaigns = campaignRepository.findAllByOrderByEndAtAsc();
        List<String> campaignIds = campaigns.stream().map(PromoHuntCampaign::getId).toList();
        Map<String, PromoHuntClaim> userClaims = user == null || campaignIds.isEmpty()
                ? Map.of()
                : claimRepository.findByCampaignIdInAndUserId(campaignIds, user.getId()).stream()
                .collect(Collectors.toMap(PromoHuntClaim::getCampaignId, Function.identity(), (left, right) -> left));

        return campaigns.stream()
                .map(campaign -> toResponse(campaign, userClaims.containsKey(campaign.getId())))
                .toList();
    }

    @Transactional
    public PromoHuntCampaignResponse createCampaign(CreatePromoHuntCampaignRequest request) {
        LocalDateTime now = LocalDateTime.now();
        if (!request.endAt().isAfter(request.startAt())) {
            throw new BadRequestException("Thoi gian ket thuc phai sau thoi gian bat dau.");
        }

        PromoHuntCampaign campaign = new PromoHuntCampaign();
        campaign.setId("hunt-" + UUID.randomUUID());
        campaign.setVoucherCode(String.valueOf(request.voucherCode()).trim().toUpperCase());
        campaign.setTotalQuantity(request.totalQuantity());
        campaign.setStartAt(request.startAt());
        campaign.setEndAt(request.endAt());
        campaign.setStatus(resolveStatus(request.status()));
        campaign.setCreatedAt(now);
        campaign.setUpdatedAt(now);
        campaignRepository.save(campaign);
        return toResponse(campaign, false);
    }

    @Transactional
    public void deleteCampaign(String campaignId) {
        PromoHuntCampaign campaign = campaignRepository.findById(campaignId)
                .orElseThrow(() -> new ResourceNotFoundException("Khong tim thay chien dich san khuyen mai."));
        campaignRepository.delete(campaign);
    }

    @Transactional
    public PromoHuntCampaignResponse claimCampaign(Authentication authentication, String campaignId) {
        User user = requireCustomerUser(authentication);
        PromoHuntCampaign campaign = campaignRepository.findByIdForUpdate(campaignId)
                .orElseThrow(() -> new ResourceNotFoundException("Khong tim thay chien dich san khuyen mai."));
        LocalDateTime now = LocalDateTime.now();

        if (!isActiveStatus(campaign.getStatus())) {
            throw new BadRequestException("Chien dich dang tam khoa.");
        }
        if (campaign.getStartAt().isAfter(now)) {
            throw new BadRequestException("Chua den thoi gian san ma.");
        }
        if (campaign.getEndAt().isBefore(now)) {
            throw new BadRequestException("Da het thoi gian san ma.");
        }
        if (claimRepository.existsByCampaignIdAndUserId(campaign.getId(), user.getId())) {
            throw new BadRequestException("Tai khoan nay da nhan ma khuyen mai.");
        }

        long claimedCount = claimRepository.countByCampaignId(campaign.getId());
        if (claimedCount >= campaign.getTotalQuantity()) {
            throw new BadRequestException("Ma khuyen mai da het.");
        }

        PromoHuntClaim claim = new PromoHuntClaim();
        claim.setId("claim-" + UUID.randomUUID());
        claim.setCampaignId(campaign.getId());
        claim.setUserId(user.getId());
        claim.setCreatedAt(now);
        claimRepository.save(claim);

        campaign.setUpdatedAt(now);
        campaignRepository.save(campaign);
        return toResponse(campaign, true);
    }

    private PromoHuntCampaignResponse toResponse(PromoHuntCampaign campaign, boolean userClaimed) {
        long claimedCount = claimRepository.countByCampaignId(campaign.getId());
        long remaining = Math.max(0, campaign.getTotalQuantity() - claimedCount);
        return new PromoHuntCampaignResponse(
                campaign.getId(),
                campaign.getVoucherCode(),
                campaign.getTotalQuantity(),
                claimedCount,
                remaining,
                userClaimed,
                campaign.getStartAt(),
                campaign.getEndAt(),
                toStatusLabel(campaign.getStatus()),
                campaign.getCreatedAt(),
                campaign.getUpdatedAt()
        );
    }

    private String resolveStatus(String status) {
        String statusCode = toStatusCode(status);
        if (statusCode == null || !ALLOWED_STATUS_CODES.contains(statusCode)) {
            throw new BadRequestException("Trang thai chien dich khong hop le.");
        }
        return statusCode;
    }

    private boolean isActiveStatus(String status) {
        return STATUS_ACTIVE_CODE.equals(toStatusCode(status));
    }

    private String toStatusLabel(String status) {
        if (STATUS_DISABLED_CODE.equals(toStatusCode(status))) {
            return STATUS_DISABLED_LABEL;
        }
        return STATUS_ACTIVE_LABEL;
    }

    private String toStatusCode(String status) {
        String normalized = normalizeStatus(status);
        if (normalized.isBlank()) {
            return STATUS_ACTIVE_CODE;
        }
        if (STATUS_ACTIVE_CODE.toLowerCase().equals(normalized)
                || "hoat dong".equals(normalized)
                || "dang mo".equals(normalized)
                || "ho t ng".equals(normalized)
                || "hoa t a ng".equals(normalized)) {
            return STATUS_ACTIVE_CODE;
        }
        if (STATUS_DISABLED_CODE.toLowerCase().equals(normalized)
                || "tam khoa".equals(normalized)
                || "ta m khoa".equals(normalized)
                || "ta m kha a".equals(normalized)) {
            return STATUS_DISABLED_CODE;
        }
        return null;
    }

    private String normalizeStatus(String status) {
        return Normalizer.normalize(String.valueOf(status == null ? "" : status), Normalizer.Form.NFD)
                .toLowerCase()
                .replace('\u0111', 'd')
                .replace('\u0110', 'd')
                .replaceAll("\\p{M}+", "")
                .replaceAll("[^a-z0-9]+", " ")
                .replaceAll("\\s+", " ")
                .trim();
    }

    private User getAuthenticatedUser(Authentication authentication) {
        if (authentication == null || !(authentication.getPrincipal() instanceof CurrentUserPrincipal principal)) {
            return null;
        }
        return principal.getUser();
    }

    private User requireCustomerUser(Authentication authentication) {
        User user = getAuthenticatedUser(authentication);
        if (user == null) {
            throw new UnauthorizedException("Ban can dang nhap de san khuyen mai.");
        }
        String authority = CurrentUserPrincipal.toAuthority(user.getRole());
        if ("ROLE_ADMIN".equals(authority) || "ROLE_STAFF".equals(authority)) {
            throw new UnauthorizedException("Tai khoan nhan vien va quan tri vien chi duoc xem san khuyen mai.");
        }
        return user;
    }
}
