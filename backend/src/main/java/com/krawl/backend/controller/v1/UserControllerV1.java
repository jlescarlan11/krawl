package com.krawl.backend.controller.v1;

import com.krawl.backend.dto.request.UpdateProfileRequest;
import com.krawl.backend.dto.response.KrawlSummaryResponse;
import com.krawl.backend.dto.response.UserResponse;
import com.krawl.backend.security.UserPrincipal;
import com.krawl.backend.service.KrawlService;
import com.krawl.backend.service.UserService;
import com.krawl.backend.service.UserStatsService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/users/me")
@RequiredArgsConstructor
@SecurityRequirement(name = "bearerAuth")
public class UserControllerV1 {

    private final KrawlService krawlService;
    private final UserService userService;
    private final UserStatsService userStatsService;

    @GetMapping
    public ResponseEntity<UserResponse> getMe(
        @AuthenticationPrincipal UserPrincipal principal
    ) {
        var me = userService.getUserById(principal.getUserId());
        if (me == null) {
            return ResponseEntity.notFound().build();
        }
        var counts = userStatsService.getCounts(principal.getUserId());
        me.setGemsCreated(counts.getGemsCreated());
        me.setKrawlsCreated(counts.getKrawlsCreated());
        return ResponseEntity.ok(me);
    }

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

    @PatchMapping
    public ResponseEntity<UserResponse> updateMe(
        @AuthenticationPrincipal UserPrincipal principal,
        @Valid @RequestBody UpdateProfileRequest request
    ) {
        var updated = userService.updateUser(principal.getUserId(), request);
        return ResponseEntity.ok(updated);
    }

    @PutMapping
    public ResponseEntity<UserResponse> updateMePut(
        @AuthenticationPrincipal UserPrincipal principal,
        @Valid @RequestBody UpdateProfileRequest request
    ) {
        var updated = userService.updateUser(principal.getUserId(), request);
        return ResponseEntity.ok(updated);
    }
}


