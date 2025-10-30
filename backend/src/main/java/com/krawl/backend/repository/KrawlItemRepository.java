package com.krawl.backend.repository;

import com.krawl.backend.entity.KrawlItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface KrawlItemRepository extends JpaRepository<KrawlItem, UUID> {
    List<KrawlItem> findByKrawl_KrawlIdOrderByStepOrder(UUID krawlId);
}

