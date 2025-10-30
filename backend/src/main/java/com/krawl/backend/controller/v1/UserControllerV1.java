package com.krawl.backend.controller.v1;

import com.krawl.backend.dto.response.KrawlSummaryResponse;
import com.krawl.backend.security.UserPrincipal;
import com.krawl.backend.service.KrawlService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users/me")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
public class UserControllerV1 {

    private final KrawlService krawlService;

    @GetMapping("/krawls")
    public ResponseEntity<List<KrawlSummaryResponse>> getMyKrawls(
        @AuthenticationPrincipal UserPrincipal principal,
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "20") int size
    ) {
        int cappedSize = Math.min(Math.max(size, 1), 100);
        var pageable = PageRequest.of(page, cappedSize, Sort.by(Sort.Direction.DESC, "createdAt"));
        var result = krawlService.getKrawlSummariesByCreator(principal.getUserId(), pageable);
        return ResponseEntity.ok(result.getContent());
    }
}


