package com.krawl.backend.repository;

import com.krawl.backend.entity.SavedKrawl;
import com.krawl.backend.entity.SavedKrawlId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface SavedKrawlRepository extends JpaRepository<SavedKrawl, SavedKrawlId> {
    List<SavedKrawl> findByUser(UUID userId);
    boolean existsByUserAndKrawl(UUID userId, UUID krawlId);
}

