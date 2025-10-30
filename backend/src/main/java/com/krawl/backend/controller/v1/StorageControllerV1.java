package com.krawl.backend.controller.v1;

import com.krawl.backend.dto.ApiResponse;
import com.krawl.backend.dto.response.ImageUploadResponse;
import com.krawl.backend.service.StorageService;
import com.krawl.backend.validation.ValidImageFile;
import com.krawl.backend.validation.ValidUUID;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.NotBlank;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("/api/v1/storage")
@RequiredArgsConstructor
@Validated
@Tag(
    name = "Storage V1", 
    description = "Image upload and management endpoints using Cloudinary. " +
                  "Supports JPEG, PNG, WebP, and HEIC formats. Maximum file size: 10MB."
)
@SecurityRequirement(name = "bearerAuth")
public class StorageControllerV1 {

    private final StorageService storageService;

    @Operation(
        summary = "Upload an image",
        description = "Uploads an image to Cloudinary with automatic optimization and thumbnail generation. " +
                     "The image is automatically converted to WebP format for optimal performance. " +
                     "Thumbnails are generated at 400x400 and 800x800 pixels. " +
                     "Supports JPEG, PNG, WebP, and HEIC formats. Maximum file size: 10MB."
    )
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "200",
            description = "Image uploaded successfully",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = ImageUploadResponse.class),
                examples = @ExampleObject(
                    name = "Success Response",
                    value = """
                        {
                          "url": "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/krawl-gems/123e4567-e89b-12d3-a456-426614174000/uuid.webp",
                          "message": "Image uploaded successfully",
                          "publicId": "krawl-gems/123e4567-e89b-12d3-a456-426614174000/uuid"
                        }
                        """
                )
            )
        ),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "400",
            description = "Bad request - validation error",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = com.krawl.backend.dto.ErrorResponse.class),
                examples = @ExampleObject(
                    name = "Validation Error",
                    value = """
                        {
                          "error": "VALIDATION_ERROR",
                          "message": "File is empty",
                          "status": 400,
                          "timestamp": "2025-01-15T10:30:00",
                          "path": "/api/v1/storage/upload"
                        }
                        """
                )
            )
        ),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "413",
            description = "Payload too large - file exceeds 10MB limit",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = com.krawl.backend.dto.ErrorResponse.class)
            )
        ),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "401",
            description = "Unauthorized - JWT token required",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = com.krawl.backend.dto.ErrorResponse.class)
            )
        )
    })
    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse<ImageUploadResponse>> uploadImage(
            @Parameter(
                description = "Image file to upload (JPEG, PNG, WebP, HEIC). Must be under 10MB.",
                required = true,
                content = @Content(mediaType = MediaType.MULTIPART_FORM_DATA_VALUE)
            )
            @RequestParam("file") 
            @ValidImageFile
            MultipartFile file,
            
            @Parameter(
                description = "Optional Gem ID (UUID) to organize uploads. If not provided, a random UUID will be generated.",
                example = "123e4567-e89b-12d3-a456-426614174000"
            )
            @RequestParam(value = "gemId", required = false) 
            @ValidUUID(message = "Gem ID must be a valid UUID format")
            String gemId
    ) {
        UUID id = gemId != null ? UUID.fromString(gemId) : UUID.randomUUID();
        String imageUrl = storageService.uploadImage(file, id);
        
        ImageUploadResponse response = new ImageUploadResponse(imageUrl, "Image uploaded successfully");
        return ResponseEntity.ok(ApiResponse.success("Image uploaded successfully", response));
    }

    @Operation(
        summary = "Delete an image",
        description = "Deletes an image from Cloudinary using its full URL. " +
                     "The URL must be a valid Cloudinary URL format."
    )
    @ApiResponses({
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "200",
            description = "Image deleted successfully",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = ApiResponse.class),
                examples = @ExampleObject(
                    name = "Success Response",
                    value = """
                        {
                          "success": true,
                          "message": "Image deleted successfully",
                          "data": null,
                          "timestamp": "2025-01-15T10:30:00"
                        }
                        """
                )
            )
        ),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "400",
            description = "Bad request - invalid URL format",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = com.krawl.backend.dto.ErrorResponse.class),
                examples = @ExampleObject(
                    name = "Invalid URL Error",
                    value = """
                        {
                          "error": "VALIDATION_ERROR",
                          "message": "Invalid Cloudinary URL",
                          "status": 400,
                          "timestamp": "2025-01-15T10:30:00",
                          "path": "/api/v1/storage/delete"
                        }
                        """
                )
            )
        ),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "401",
            description = "Unauthorized - JWT token required",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = com.krawl.backend.dto.ErrorResponse.class)
            )
        ),
        @io.swagger.v3.oas.annotations.responses.ApiResponse(
            responseCode = "500",
            description = "Internal server error - failed to delete image",
            content = @Content(
                mediaType = "application/json",
                schema = @Schema(implementation = com.krawl.backend.dto.ErrorResponse.class)
            )
        )
    })
    @DeleteMapping("/delete")
    public ResponseEntity<ApiResponse<String>> deleteImage(
            @Parameter(
                description = "Full Cloudinary URL of the image to delete",
                required = true,
                example = "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/krawl-gems/123e4567-e89b-12d3-a456-426614174000/uuid.webp"
            )
            @RequestParam("url") 
            @NotBlank(message = "Image URL is required")
            String imageUrl
    ) {
        storageService.deleteImage(imageUrl);
        return ResponseEntity.ok(ApiResponse.success("Image deleted successfully"));
    }
}

