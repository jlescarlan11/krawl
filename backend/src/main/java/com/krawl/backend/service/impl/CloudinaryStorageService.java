package com.krawl.backend.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.krawl.backend.config.properties.CloudinaryProperties;
import com.krawl.backend.config.properties.StorageValidationProperties;
import com.krawl.backend.exception.ImageValidationException;
import com.krawl.backend.exception.StorageException;
import com.krawl.backend.service.StorageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
public class CloudinaryStorageService implements StorageService {

    private final Cloudinary cloudinary;
    private final CloudinaryProperties cloudinaryProperties;
    private final StorageValidationProperties validationProperties;

    @Override
    public String uploadImage(MultipartFile file, UUID gemId) {
        log.info("Uploading image for gem: {}", gemId);

        // Validate - throws ImageValidationException if invalid
        validateImage(file);

        String publicId = String.format("%s/%s/%s", 
            cloudinaryProperties.getFolder(), 
            gemId.toString(), 
            UUID.randomUUID().toString()
        );

        try {
            @SuppressWarnings("unchecked")
            Map<String, Object> uploadResult = cloudinary.uploader().upload(file.getBytes(),
                ObjectUtils.asMap(
                    "public_id", publicId,
                    "folder", cloudinaryProperties.getFolder(),
                    "resource_type", "image",
                    "format", "webp",
                    "quality", "auto:good",
                    "transformation", new com.cloudinary.Transformation<>()
                        .width(1200)
                        .height(1200)
                        .crop("limit")
                        .fetchFormat("auto")
                        .quality("auto:good"),
                    "eager", Arrays.asList(
                        new com.cloudinary.Transformation<>()
                            .width(400).height(400).crop("fill").gravity("auto"),
                        new com.cloudinary.Transformation<>()
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

    @Override
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

    @Override
    public String getThumbnailUrl(String originalUrl, int width, int height) {
        String publicId = extractPublicId(originalUrl);
        if (publicId == null) {
            throw new ImageValidationException("Invalid Cloudinary URL");
        }

        return cloudinary.url()
            .transformation(new com.cloudinary.Transformation<>()
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

        if (file.getSize() > validationProperties.getMaxFileSize()) {
            throw new ImageValidationException(
                String.format("File size exceeds %dMB limit", validationProperties.getMaxFileSize() / (1024 * 1024))
            );
        }

        String contentType = file.getContentType();
        Set<String> allowedTypes = Set.copyOf(validationProperties.getAllowedContentTypes());
        if (contentType == null || !allowedTypes.contains(contentType.toLowerCase())) {
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

