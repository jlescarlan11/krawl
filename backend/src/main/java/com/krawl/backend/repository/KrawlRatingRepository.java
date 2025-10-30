package com.krawl.backend.repository;

import com.krawl.backend.entity.KrawlRating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface KrawlRatingRepository extends JpaRepository<KrawlRating, UUID> {
    Optional<KrawlRating> findByKrawl_KrawlIdAndUser_UserId(UUID krawlId, UUID userId);
    List<KrawlRating> findByKrawl_KrawlId(UUID krawlId);
}

