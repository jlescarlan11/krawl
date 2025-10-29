package com.krawl.backend.controller;

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

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Slf4j
@RestController
@RequestMapping("/api/storage")
@RequiredArgsConstructor
@Tag(name = "Storage", description = "Image upload and management endpoints using Cloudinary")
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
                            schema = @Schema(implementation = Map.class),
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
                            examples = @ExampleObject(
                                    value = """
                                            {
                                              "error": "File size exceeds 10MB limit"
                                            }
                                            """
                            )
                    )
            )
    })
    @PostMapping(value = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Map<String, String>> uploadImage(
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
        try {
            UUID id = gemId != null ? UUID.fromString(gemId) : UUID.randomUUID();
            String imageUrl = storageService.uploadImage(file, id);
            
            Map<String, String> response = new HashMap<>();
            response.put("url", imageUrl);
            response.put("message", "Image uploaded successfully");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error uploading image", e);
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
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
                            examples = @ExampleObject(
                                    value = """
                                            {
                                              "message": "Image deleted successfully"
                                            }
                                            """
                            )
                    )
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Bad request - invalid URL",
                    content = @Content(
                            mediaType = "application/json",
                            examples = @ExampleObject(
                                    value = """
                                            {
                                              "error": "Invalid Cloudinary URL"
                                            }
                                            """
                            )
                    )
            )
    })
    @DeleteMapping("/delete")
    public ResponseEntity<Map<String, String>> deleteImage(
            @Parameter(
                    description = "Full Cloudinary URL of the image to delete",
                    required = true,
                    example = "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/krawl-gems/123e4567-e89b-12d3-a456-426614174000/uuid.webp"
            )
            @RequestParam("url") String imageUrl
    ) {
        try {
            storageService.deleteImage(imageUrl);
            
            Map<String, String> response = new HashMap<>();
            response.put("message", "Image deleted successfully");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error deleting image", e);
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}