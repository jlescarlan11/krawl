package com.krawl.backend.controller.v1;

import com.krawl.backend.dto.request.KrawlCreateRequest;
import com.krawl.backend.dto.response.KrawlResponse;
import com.krawl.backend.security.UserPrincipal;
import com.krawl.backend.service.KrawlService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/krawls")
@RequiredArgsConstructor
@Tag(name = "Krawls V1", description = "Krawl listing, retrieval, and creation endpoints")
public class KrawlControllerV1 {

    private final KrawlService krawlService;

    @Operation(summary = "List krawls", description = "Returns a paginated list of public krawls")
    @GetMapping
    public ResponseEntity<List<KrawlResponse>> list(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "20") int size
    ) {
        int cappedSize = Math.min(Math.max(size, 1), 100);
        var pageable = PageRequest.of(page, cappedSize, Sort.by(Sort.Direction.DESC, "createdAt"));
        var result = krawlService.getAllKrawls(pageable);
        return ResponseEntity.ok(result.getContent());
    }

    @Operation(summary = "Get krawl details", description = "Returns krawl details by ID")
    @GetMapping("/{id}")
    public ResponseEntity<KrawlResponse> getById(@PathVariable("id") UUID id) {
        return ResponseEntity.ok(krawlService.getKrawlById(id));
    }

    @Operation(summary = "Create a new krawl")
    @SecurityRequirement(name = "bearerAuth")
    @PostMapping
    public ResponseEntity<KrawlResponse> create(
        @Valid @RequestBody KrawlCreateRequest request,
        @AuthenticationPrincipal UserPrincipal principal
    ) {
        KrawlResponse created = krawlService.createKrawl(request, principal.getUserId());
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
}


