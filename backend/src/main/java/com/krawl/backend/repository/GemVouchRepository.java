package com.krawl.backend.repository;

import com.krawl.backend.entity.GemVouch;
import com.krawl.backend.entity.GemVouchId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface GemVouchRepository extends JpaRepository<GemVouch, GemVouchId> {
    boolean existsByGem_GemIdAndUser_UserId(UUID gemId, UUID userId);
}

