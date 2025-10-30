package com.krawl.backend.service;

import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

public interface StorageService {
    String uploadImage(MultipartFile file, UUID gemId);
    void deleteImage(String imageUrl);
    String getThumbnailUrl(String originalUrl, int width, int height);
}
