package com.krawl.backend.service.impl;

import com.krawl.backend.repository.GemRepository;
import com.krawl.backend.repository.KrawlRepository;
import com.krawl.backend.service.UserStatsService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class UserStatsServiceImpl implements UserStatsService {

    private final GemRepository gemRepository;
    private final KrawlRepository krawlRepository;

    @Override
    public Counts getCounts(UUID userId) {
        long gems = gemRepository.countByFounderUserId(userId);
        long krawls = krawlRepository.countByCreator_UserId(userId);
        int gemsCount = (int) Math.min(gems, Integer.MAX_VALUE);
        int krawlsCount = (int) Math.min(krawls, Integer.MAX_VALUE);
        return new Counts(gemsCount, krawlsCount);
    }
}


