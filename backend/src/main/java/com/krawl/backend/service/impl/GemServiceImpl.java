package com.krawl.backend.service.impl;

import com.krawl.backend.dto.request.GemCreateRequest;
import com.krawl.backend.dto.request.GemUpdateRequest;
import com.krawl.backend.dto.response.GemResponse;
import com.krawl.backend.entity.Gem;
import com.krawl.backend.mapper.GemMapper;
import com.krawl.backend.repository.GemRepository;
import com.krawl.backend.repository.UserRepository;
import com.krawl.backend.service.GemService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GemServiceImpl implements GemService {

    private final GemRepository gemRepository;
    private final UserRepository userRepository;
    private final GemMapper gemMapper;

    @Override
    @Transactional
    public GemResponse createGem(GemCreateRequest request, UUID founderId) {
        var founder = userRepository.findById(founderId)
            .orElseThrow(() -> new IllegalArgumentException("Founder not found"));

        Gem gem = gemMapper.toEntity(request);
        gem.setFounder(founder);

        Gem saved = gemRepository.save(gem);
        return gemMapper.toResponse(saved);
    }

    @Override
    public GemResponse getGemById(UUID gemId) {
        Gem gem = gemRepository.findById(gemId)
            .orElseThrow(() -> new IllegalArgumentException("Gem not found"));
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
            .orElseThrow(() -> new IllegalArgumentException("Gem not found"));

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


