package com.krawl.backend.service.impl;

import com.krawl.backend.dto.request.KrawlCreateRequest;
import com.krawl.backend.dto.request.KrawlUpdateRequest;
import com.krawl.backend.dto.response.KrawlResponse;
import com.krawl.backend.dto.response.KrawlSummaryResponse;
import com.krawl.backend.entity.Krawl;
import com.krawl.backend.repository.KrawlRepository;
import com.krawl.backend.service.KrawlService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.stream.Collectors;
import java.util.UUID;
import com.krawl.backend.repository.projection.KrawlSummaryRow;

@Service
@RequiredArgsConstructor
public class KrawlServiceImpl implements KrawlService {

    private final KrawlRepository krawlRepository;

    @Override
    @Transactional(readOnly = true)
    public Page<KrawlResponse> getKrawlsByCreator(UUID creatorId, Pageable pageable) {
        return krawlRepository.findByCreator_UserId(creatorId, pageable)
                .map(this::toResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<KrawlSummaryResponse> getKrawlSummariesByCreator(UUID creatorId, Pageable pageable) {
        return krawlRepository.findSummariesByCreator(creatorId, pageable)
                .map(this::toSummary);
    }

    private KrawlResponse toResponse(Krawl krawl) {
        var items = krawl.getItems() == null ? java.util.List.<KrawlResponse.KrawlItemResponse>of() :
            krawl.getItems().stream().map(it -> KrawlResponse.KrawlItemResponse.builder()
                .krawlItemId(it.getKrawlItemId())
                .gemId(it.getGem().getGemId())
                .gemName(it.getGem().getName())
                .stepOrder(it.getStepOrder())
                .creatorNote(it.getCreatorNote())
                .lokalSecret(it.getLokalSecret())
                .build()).collect(Collectors.toList());

        return KrawlResponse.builder()
            .krawlId(krawl.getKrawlId())
            .title(krawl.getTitle())
            .description(krawl.getDescription())
            .creatorId(krawl.getCreator().getUserId())
            .creatorUsername(krawl.getCreator().getUsername())
            .creatorScore(krawl.getCreator().getCreatorScore())
            .visibility(krawl.getVisibility())
            .averageRating(krawl.getAverageRating())
            .ratingCount(krawl.getRatingCount())
            .items(items)
            .createdAt(krawl.getCreatedAt())
            .updatedAt(krawl.getUpdatedAt())
            .build();
    }

    private KrawlSummaryResponse toSummary(KrawlSummaryRow row) {
        return new KrawlSummaryResponse(
            row.getKrawlId().toString(),
            row.getTitle(),
            row.getDescription(),
            row.getAverageRating(),
            (int) row.getItemCount(),
            row.getCreatedAt()
        );
    }

    // The remaining methods are not in scope for this task
    @Override
    public KrawlResponse createKrawl(KrawlCreateRequest request, UUID creatorId) {
        throw new UnsupportedOperationException("Not implemented");
    }

    @Override
    @Transactional(readOnly = true)
    public KrawlResponse getKrawlById(UUID krawlId) {
        throw new UnsupportedOperationException("Not implemented");
    }

    @Override
    @Transactional(readOnly = true)
    public Page<KrawlResponse> getAllKrawls(Pageable pageable) {
        throw new UnsupportedOperationException("Not implemented");
    }

    @Override
    public KrawlResponse updateKrawl(UUID krawlId, KrawlUpdateRequest request) {
        throw new UnsupportedOperationException("Not implemented");
    }

    @Override
    public void deleteKrawl(UUID krawlId) {
        throw new UnsupportedOperationException("Not implemented");
    }
}


