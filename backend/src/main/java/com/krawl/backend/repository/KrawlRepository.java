package com.krawl.backend.repository;

import com.krawl.backend.entity.Krawl;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;
import com.krawl.backend.repository.projection.KrawlSummaryRow;

@Repository
public interface KrawlRepository extends JpaRepository<Krawl, UUID> {
    List<Krawl> findByCreator_UserId(UUID creatorId);
    long countByCreator_UserId(UUID creatorId);
    List<Krawl> findByVisibility(String visibility);
    Page<Krawl> findByCreator_UserId(UUID creatorId, Pageable pageable);

    @Query("""
        select k.krawlId as krawlId,
               k.title as title,
               k.description as description,
               k.averageRating as averageRating,
               k.createdAt as createdAt,
               count(i) as itemCount
        from Krawl k
        left join k.items i
        where k.creator.userId = :creatorId
        group by k.krawlId, k.title, k.description, k.averageRating, k.createdAt
        """)
    Page<KrawlSummaryRow> findSummariesByCreator(UUID creatorId, Pageable pageable);
}

