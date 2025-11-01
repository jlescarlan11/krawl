package com.krawl.backend.controller;

import com.krawl.backend.dto.response.ImageUploadResponse;
import com.krawl.backend.service.StorageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

/**
 * Legacy storage controller.
 * 
 * @deprecated This controller is deprecated. Please use {@link com.krawl.backend.controller.v1.StorageControllerV1} instead.
 * The legacy endpoints under {@code /api/storage} will be removed in a future release.
 * Migration path: Replace {@code /api/storage} with {@code /api/v1/storage} in your API calls.
 * 
 * @since 1.0.0
 * @see com.krawl.backend.controller.v1.StorageControllerV1
 */
@Deprecated(since = "1.0.0", forRemoval = true)
@Slf4j
@RestController
@RequestMapping("/api/storage")
@RequiredArgsConstructor
@Tag(name = "Storage (Legacy)", description = "DEPRECATED: Use /api/v1/storage endpoints instead. Legacy image upload and management endpoints using Cloudinary")
@SecurityRequirement(name = "bearerAuth")
public class StorageController {

    private final StorageService storageService;

    @Operation(
            summary = "Upload an image",
            description = "Uploads an image to Cloudinary with automatic optimization and thumbnail generation. " +
                         "Supports JPEG, PNG, WebP, and HEIC formats. Maximum file size: 10MB."
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Image uploaded successfully",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = ImageUploadResponse.class),
                            examples = @ExampleObject(
                                    value = """
                                            {
                                              "url": "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/krawl-gems/123e4567-e89b-12d3-a456-426614174000/uuid.webp",
                                              "message": "Image uploaded successfully"
                                            }
                                            """
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Bad request - validation error",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = com.krawl.backend.dto.ErrorResponse.class)
                    )
            )
    })
    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ImageUploadResponse> uploadImage(
            @Parameter(
                    description = "Image file to upload (JPEG, PNG, WebP, HEIC)",
                    required = true,
                    content = @Content(mediaType = MediaType.MULTIPART_FORM_DATA_VALUE)
            )
            @RequestParam("file") MultipartFile file,
            
            @Parameter(
                    description = "Optional Gem ID to organize uploads. Auto-generated if not provided.",
                    example = "123e4567-e89b-12d3-a456-426614174000"
            )
            @RequestParam(value = "gemId", required = false) String gemId
    ) {
        UUID id = gemId != null ? UUID.fromString(gemId) : UUID.randomUUID();
        String imageUrl = storageService.uploadImage(file, id);
        
        return ResponseEntity.ok(
            new ImageUploadResponse(imageUrl, "Image uploaded successfully")
        );
    }

    @Operation(
            summary = "Delete an image",
            description = "Deletes an image from Cloudinary using its full URL"
    )
    @ApiResponses({
            @ApiResponse(
                    responseCode = "200",
                    description = "Image deleted successfully",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = com.krawl.backend.dto.ApiResponse.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Bad request - invalid URL",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = com.krawl.backend.dto.ErrorResponse.class)
                    )
            )
    })
    @DeleteMapping("/delete")
    public ResponseEntity<com.krawl.backend.dto.ApiResponse<String>> deleteImage(
            @Parameter(
                    description = "Full Cloudinary URL of the image to delete",
                    required = true,
                    example = "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/krawl-gems/123e4567-e89b-12d3-a456-426614174000/uuid.webp"
            )
            @RequestParam("url") String imageUrl
    ) {
        storageService.deleteImage(imageUrl);
        return ResponseEntity.ok(
            com.krawl.backend.dto.ApiResponse.success("Image deleted successfully")
        );
    }
}