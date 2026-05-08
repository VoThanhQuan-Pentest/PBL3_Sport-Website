package com.flarefitness.backend.repository.promo;

import com.flarefitness.backend.entity.promo.PromoHuntClaim;
import java.util.Collection;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PromoHuntClaimRepository extends JpaRepository<PromoHuntClaim, String> {

    long countByCampaignId(String campaignId);

    boolean existsByCampaignIdAndUserId(String campaignId, String userId);

    List<PromoHuntClaim> findByCampaignIdInAndUserId(Collection<String> campaignIds, String userId);
}
