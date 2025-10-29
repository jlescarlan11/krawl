package com.krawl.backend.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.Map;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class StorageService {

    private final Cloudinary cloudinary;

    @Value("${cloudinary.folder}")
    private String folder;

    /**
     * Upload image to Cloudinary with optimization
     * @param file The multipart file to upload
     * @param gemId The gem ID to organize uploads
     * @return The secure URL of the uploaded image
     */
    public String uploadImage(MultipartFile file, UUID gemId) throws IOException {
        log.info("Uploading image for gem: {}", gemId);

        // Validate file
        validateImage(file);

        // Create unique public ID
        String publicId = String.format("%s/%s/%s", 
            folder, 
            gemId.toString(), 
            UUID.randomUUID().toString()
        );

        // Upload with transformations
        Map uploadResult = cloudinary.uploader().upload(file.getBytes(),
            ObjectUtils.asMap(
                "public_id", publicId,
                "folder", folder,
                "resource_type", "image",
                "format", "webp", // Convert to WebP for better compression
                "quality", "auto:good", // Auto quality optimization
                "transformation", new com.cloudinary.Transformation()
                    .width(1200)
                    .height(1200)
                    .crop("limit") // Resize only if larger than 1200x1200
                    .fetchFormat("auto") // Auto format selection
                    .quality("auto:good"),
                "eager", Arrays.asList(
                    new com.cloudinary.Transformation()
                        .width(400).height(400).crop("fill").gravity("auto"), // Thumbnail
                    new com.cloudinary.Transformation()
                        .width(800).height(800).crop("limit") // Medium size
                )
            )
        );

        String secureUrl = (String) uploadResult.get("secure_url");
        log.info("Image uploaded successfully: {}", secureUrl);

        return secureUrl;
    }

    /**
     * Delete image from Cloudinary
     * @param imageUrl The URL of the image to delete
     */
    public void deleteImage(String imageUrl) throws IOException {
        // Extract public ID from URL
        String publicId = extractPublicId(imageUrl);
        
        if (publicId != null) {
            log.info("Deleting image: {}", publicId);
            cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
        }
    }

    /**
     * Generate thumbnail URL from original URL
     * @param originalUrl The original image URL
     * @param width Thumbnail width
     * @param height Thumbnail height
     * @return Transformed URL
     */
    public String getThumbnailUrl(String originalUrl, int width, int height) {
        return cloudinary.url()
            .transformation(new com.cloudinary.Transformation()
                .width(width)
                .height(height)
                .crop("fill")
                .gravity("auto")
                .quality("auto:good")
                .fetchFormat("auto"))
            .generate(extractPublicId(originalUrl));
    }

    private void validateImage(MultipartFile file) {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("File is empty");
        }

        // Check file size (max 10MB)
        if (file.getSize() > 10 * 1024 * 1024) {
            throw new IllegalArgumentException("File size exceeds 10MB limit");
        }

        // Check file type
        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) {
            throw new IllegalArgumentException("File must be an image");
        }

        // Allowed types: JPEG, PNG, WebP, HEIC
        if (!contentType.matches("image/(jpeg|jpg|png|webp|heic)")) {
            throw new IllegalArgumentException("Unsupported image format. Allowed: JPEG, PNG, WebP, HEIC");
        }
    }

    private String extractPublicId(String imageUrl) {
        if (imageUrl == null || !imageUrl.contains("cloudinary.com")) {
            return null;
        }

        // Extract public ID from Cloudinary URL
        // Example: https://res.cloudinary.com/cloud-name/image/upload/v123456/folder/gem-id/image-id.webp
        // Public ID: folder/gem-id/image-id
        try {
            String[] parts = imageUrl.split("/upload/");
            if (parts.length > 1) {
                String pathPart = parts[1];
                // Remove version number if present
                pathPart = pathPart.replaceFirst("v\\d+/", "");
                // Remove extension
                return pathPart.substring(0, pathPart.lastIndexOf('.'));
            }
        } catch (Exception e) {
            log.error("Error extracting public ID from URL: {}", imageUrl, e);
        }
        return null;
    }
}