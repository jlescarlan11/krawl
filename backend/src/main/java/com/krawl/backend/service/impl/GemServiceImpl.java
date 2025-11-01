package com.krawl.backend.service.impl;

import com.krawl.backend.config.properties.GemProperties;
import com.krawl.backend.dto.request.GemCreateRequest;
import com.krawl.backend.dto.request.GemUpdateRequest;
import com.krawl.backend.dto.response.DuplicateGemResponse;
import com.krawl.backend.dto.response.GemResponse;
import com.krawl.backend.entity.Gem;
import com.krawl.backend.entity.GemTag;
import com.krawl.backend.entity.GemTagId;
import com.krawl.backend.entity.Tag;
import com.krawl.backend.exception.DuplicateGemException;
import com.krawl.backend.exception.EntityNotFoundException;
import com.krawl.backend.mapper.GemMapper;
import com.krawl.backend.repository.GemRepository;
import com.krawl.backend.repository.GemTagRepository;
import com.krawl.backend.repository.UserRepository;
import com.krawl.backend.repository.projection.GemDistanceResult;
import com.krawl.backend.service.GemService;
import com.krawl.backend.service.TagService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GemServiceImpl implements GemService {

    private final GemRepository gemRepository;
    private final UserRepository userRepository;
    private final GemMapper gemMapper;
    private final GemProperties gemProperties;
    private final TagService tagService;
    private final GemTagRepository gemTagRepository;

    @Override
    @Transactional
    public GemResponse createGem(GemCreateRequest request, UUID founderId) {
        var founder = userRepository.findById(founderId)
            .orElseThrow(() -> new EntityNotFoundException("User", founderId));

        // Check for duplicates if override is not enabled
        if (!Boolean.TRUE.equals(request.getOverrideDuplicate())) {
            List<GemDistanceResult> nearbyGems = gemRepository.findNearbyGems(
                request.getLatitude(),
                request.getLongitude(),
                gemProperties.getDuplicateRadiusMeters()
            );

            if (!nearbyGems.isEmpty()) {
                // Map to DuplicateGemResponse DTOs
                List<DuplicateGemResponse> duplicates = nearbyGems.stream()
                    .map(this::toDuplicateGemResponse)
                    .collect(Collectors.toList());

                throw new DuplicateGemException(
                    "Potential duplicate Gem found.",
                    duplicates
                );
            }
        } else {
            // Log override for audit purposes
            log.info("Gem creation duplicate override: user={}, reason={}, lat={}, lng={}",
                founderId,
                request.getOverrideReason() != null ? request.getOverrideReason() : "No reason provided",
                request.getLatitude(),
                request.getLongitude()
            );
        }

        Gem gem = gemMapper.toEntity(request);
        gem.setFounder(founder);

        Gem saved = gemRepository.save(gem);
        
        // Process and save tags if provided
        if (request.getTags() != null && !request.getTags().isEmpty()) {
            saveTagsForGem(saved, request.getTags());
        }
        
        return gemMapper.toResponse(saved);
    }

    /**
     * Processes and saves tags for a Gem.
     * Creates tags if they don't exist, then creates GemTag associations.
     * 
     * @param gem The saved Gem entity
     * @param tagNames List of tag names to associate with the Gem
     */
    private void saveTagsForGem(Gem gem, List<String> tagNames) {
        for (String tagName : tagNames) {
            if (!StringUtils.hasText(tagName)) {
                continue; // Skip empty/null tag names
            }
            
            // Normalize tag name (trim and lowercase for consistency)
            String normalizedTagName = tagName.trim().toLowerCase();
            
            // Find or create tag
            Tag tag = tagService.getTagByName(normalizedTagName)
                .orElseGet(() -> {
                    log.debug("Creating new tag: {}", normalizedTagName);
                    try {
                        return tagService.createTag(normalizedTagName);
                    } catch (Exception e) {
                        // Tag might have been created by another thread, try to fetch again
                        log.debug("Tag creation conflict, fetching existing tag: {}", normalizedTagName);
                        return tagService.getTagByName(normalizedTagName)
                            .orElseThrow(() -> new RuntimeException("Failed to create or find tag: " + normalizedTagName, e));
                    }
                });
            
            // Check if association already exists (shouldn't happen, but defensive)
            GemTagId gemTagId = new GemTagId();
            gemTagId.setGem(gem.getGemId());
            gemTagId.setTag(tag.getTagId());
            
            if (!gemTagRepository.existsById(gemTagId)) {
                // Create new GemTag association
                GemTag gemTag = new GemTag();
                gemTag.setGem(gem);
                gemTag.setTag(tag);
                gemTagRepository.save(gemTag);
                log.debug("Associated tag '{}' with gem {}", normalizedTagName, gem.getGemId());
            }
        }
    }

    /**
     * Maps a GemDistanceResult projection to DuplicateGemResponse DTO.
     */
    private DuplicateGemResponse toDuplicateGemResponse(GemDistanceResult result) {
        return DuplicateGemResponse.builder()
            .gemId(result.getGemId())
            .name(result.getName())
            .distanceMeters(result.getDistanceMeters())
            .founderUsername(result.getFounderUsername())
            .vouchCount(result.getVouchCount())
            .averageRating(result.getAverageRating() != null 
                ? result.getAverageRating() 
                : BigDecimal.ZERO)
            .build();
    }

    @Override
    public GemResponse getGemById(UUID gemId) {
        Gem gem = gemRepository.findById(gemId)
            .orElseThrow(() -> new EntityNotFoundException("Gem", gemId));
        return gemMapper.toResponse(gem);
    }

    @Override
    public Page<GemResponse> getAllGems(Pageable pageable) {
        return gemRepository.findAll(pageable).map(gemMapper::toResponse);
    }

    @Override
    @Transactional
    public GemResponse updateGem(UUID gemId, GemUpdateRequest request) {
        Gem gem = gemRepository.findById(gemId)
            .orElseThrow(() -> new EntityNotFoundException("Gem", gemId));

        gemMapper.updateEntity(gem, request);
        Gem saved = gemRepository.save(gem);
        return gemMapper.toResponse(saved);
    }

    @Override
    @Transactional
    public void deleteGem(UUID gemId) {
        if (gemRepository.existsById(gemId)) {
            gemRepository.deleteById(gemId);
        }
    }
}


