package com.krawl.backend.controller.v1;

import com.krawl.backend.dto.request.GemCreateRequest;
import com.krawl.backend.dto.response.GemResponse;
import com.krawl.backend.security.UserPrincipal;
import com.krawl.backend.service.GemService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
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
@RequestMapping("/api/v1/gems")
@RequiredArgsConstructor
@Tag(name = "Gems V1", description = "Gem listing, retrieval, and creation endpoints")
public class GemControllerV1 {

    private final GemService gemService;

    @Operation(summary = "List gems", description = "Returns a paginated list of gems")
    @GetMapping
    public ResponseEntity<List<GemResponse>> list(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "20") int size
    ) {
        int cappedSize = Math.min(Math.max(size, 1), 100);
        var pageable = PageRequest.of(page, cappedSize, Sort.by(Sort.Direction.DESC, "createdAt"));
        var result = gemService.getAllGems(pageable);
        return ResponseEntity.ok(result.getContent());
    }

    @Operation(summary = "Get gem details", description = "Returns gem details by ID")
    @GetMapping("/{id}")
    public ResponseEntity<GemResponse> getById(@PathVariable("id") UUID id) {
        return ResponseEntity.ok(gemService.getGemById(id));
    }

    @Operation(summary = "Create a new gem")
    @SecurityRequirement(name = "bearerAuth")
    @PostMapping
    public ResponseEntity<GemResponse> create(
        @Valid @RequestBody GemCreateRequest request,
        @AuthenticationPrincipal UserPrincipal principal
    ) {
        GemResponse created = gemService.createGem(request, principal.getUserId());
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }
}


