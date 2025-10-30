package com.krawl.backend.repository;

import com.krawl.backend.entity.GemReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface GemReportRepository extends JpaRepository<GemReport, UUID> {
    List<GemReport> findByGem_GemId(UUID gemId);
    List<GemReport> findByStatus(String status);
}

