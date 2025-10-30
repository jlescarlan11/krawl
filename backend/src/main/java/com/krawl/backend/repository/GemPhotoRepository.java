package com.krawl.backend.repository;

import com.krawl.backend.entity.GemPhoto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface GemPhotoRepository extends JpaRepository<GemPhoto, UUID> {
    List<GemPhoto> findByGem_GemId(UUID gemId);
}

