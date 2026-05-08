package com.flarefitness.backend.repository.promo;

import com.flarefitness.backend.entity.promo.PromoHuntCampaign;
import jakarta.persistence.LockModeType;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;

public interface PromoHuntCampaignRepository extends JpaRepository<PromoHuntCampaign, String> {

    List<PromoHuntCampaign> findAllByOrderByEndAtAsc();

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("select campaign from PromoHuntCampaign campaign where campaign.id = :id")
    Optional<PromoHuntCampaign> findByIdForUpdate(String id);
}
