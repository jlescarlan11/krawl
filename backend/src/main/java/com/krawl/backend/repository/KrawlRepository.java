package com.krawl.backend.repository;

import com.krawl.backend.entity.Krawl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface KrawlRepository extends JpaRepository<Krawl, UUID> {
    List<Krawl> findByCreator_UserId(UUID creatorId);
    List<Krawl> findByVisibility(String visibility);
}

