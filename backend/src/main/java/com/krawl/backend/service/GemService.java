package com.krawl.backend.service;

import com.krawl.backend.dto.request.GemCreateRequest;
import com.krawl.backend.dto.request.GemUpdateRequest;
import com.krawl.backend.dto.response.GemResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.UUID;

public interface GemService {
    GemResponse createGem(GemCreateRequest request, UUID founderId);
    GemResponse getGemById(UUID gemId);
    Page<GemResponse> getAllGems(Pageable pageable);
    GemResponse updateGem(UUID gemId, GemUpdateRequest request);
    void deleteGem(UUID gemId);
}

