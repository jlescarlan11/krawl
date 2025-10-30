package com.krawl.backend.service;

import com.krawl.backend.dto.request.KrawlCreateRequest;
import com.krawl.backend.dto.request.KrawlUpdateRequest;
import com.krawl.backend.dto.response.KrawlResponse;
import com.krawl.backend.dto.response.KrawlSummaryResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface KrawlService {
    KrawlResponse createKrawl(KrawlCreateRequest request, UUID creatorId);
    KrawlResponse getKrawlById(UUID krawlId);
    Page<KrawlResponse> getAllKrawls(Pageable pageable);
    Page<KrawlResponse> getKrawlsByCreator(UUID creatorId, Pageable pageable);
    Page<KrawlSummaryResponse> getKrawlSummariesByCreator(UUID creatorId, Pageable pageable);
    KrawlResponse updateKrawl(UUID krawlId, KrawlUpdateRequest request);
    void deleteKrawl(UUID krawlId);
}

