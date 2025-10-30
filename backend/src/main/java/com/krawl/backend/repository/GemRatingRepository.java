package com.krawl.backend.repository;

import com.krawl.backend.entity.GemRating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface GemRatingRepository extends JpaRepository<GemRating, UUID> {
    Optional<GemRating> findByGem_GemIdAndUser_UserId(UUID gemId, UUID userId);
    List<GemRating> findByGem_GemId(UUID gemId);
}

