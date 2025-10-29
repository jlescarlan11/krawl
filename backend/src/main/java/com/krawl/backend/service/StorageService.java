package com.krawl.backend.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.krawl.backend.exception.ImageValidationException;
import com.krawl.backend.exception.StorageException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class StorageService {

    private final Cloudinary cloudinary;

    @Value("${cloudinary.folder}")
    private String folder;

    // Constants for validation
    private static final long MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    private static final Set<String> ALLOWED_CONTENT_TYPES = Set.of(
        "image/jpeg", "image/jpg", "image/png", "image/webp", "image/heic"
    );

    public String uploadImage(MultipartFile file, UUID gemId) {
        log.info("Uploading image for gem: {}", gemId);

        // Validate - throws ImageValidationException if invalid
        validateImage(file);

        String publicId = String.format("%s/%s/%s", 
            folder, 
            gemId.toString(), 
            UUID.randomUUID().toString()
        );

        try {
            Map uploadResult = cloudinary.uploader().upload(file.getBytes(),
                ObjectUtils.asMap(
                    "public_id", publicId,
                    "folder", folder,
                    "resource_type", "image",
                    "format", "webp",
                    "quality", "auto:good",
                    "transformation", new com.cloudinary.Transformation()
                        .width(1200)
                        .height(1200)
                        .crop("limit")
                        .fetchFormat("auto")
                        .quality("auto:good"),
                    "eager", Arrays.asList(
                        new com.cloudinary.Transformation()
                            .width(400).height(400).crop("fill").gravity("auto"),
                        new com.cloudinary.Transformation()
                            .width(800).height(800).crop("limit")
                    )
                )
            );

            String secureUrl = (String) uploadResult.get("secure_url");
            log.info("Image uploaded successfully: {}", secureUrl);

            return secureUrl;
        } catch (IOException e) {
            log.error("Failed to upload image to Cloudinary", e);
            throw new StorageException("Failed to upload image", e);
        }
    }

    public void deleteImage(String imageUrl) {
        String publicId = extractPublicId(imageUrl);
        
        if (publicId == null) {
            throw new ImageValidationException("Invalid Cloudinary URL");
        }

        try {
            log.info("Deleting image: {}", publicId);
            cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
        } catch (IOException e) {
            log.error("Failed to delete image from Cloudinary", e);
            throw new StorageException("Failed to delete image", e);
        }
    }

    public String getThumbnailUrl(String originalUrl, int width, int height) {
        String publicId = extractPublicId(originalUrl);
        if (publicId == null) {
            throw new ImageValidationException("Invalid Cloudinary URL");
        }

        return cloudinary.url()
            .transformation(new com.cloudinary.Transformation()
                .width(width)
                .height(height)
                .crop("fill")
                .gravity("auto")
                .quality("auto:good")
                .fetchFormat("auto"))
            .generate(publicId);
    }

    private void validateImage(MultipartFile file) {
        if (file.isEmpty()) {
            throw new ImageValidationException("File is empty");
        }

        if (file.getSize() > MAX_FILE_SIZE) {
            throw new ImageValidationException(
                String.format("File size exceeds %dMB limit", MAX_FILE_SIZE / (1024 * 1024))
            );
        }

        String contentType = file.getContentType();
        if (contentType == null || !ALLOWED_CONTENT_TYPES.contains(contentType.toLowerCase())) {
            throw new ImageValidationException(
                "Unsupported image format. Allowed: JPEG, PNG, WebP, HEIC"
            );
        }
    }

    private String extractPublicId(String imageUrl) {
        if (imageUrl == null || !imageUrl.contains("cloudinary.com")) {
            return null;
        }

        try {
            String[] parts = imageUrl.split("/upload/");
            if (parts.length > 1) {
                String pathPart = parts[1];
                pathPart = pathPart.replaceFirst("v\\d+/", "");
                return pathPart.substring(0, pathPart.lastIndexOf('.'));
            }
        } catch (Exception e) {
            log.error("Error extracting public ID from URL: {}", imageUrl, e);
        }
        return null;
    }
}