package com.krawl.backend.config.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@ConfigurationProperties(prefix = "storage.validation")
@Data
public class StorageValidationProperties {
    private long maxFileSize = 10 * 1024 * 1024; // 10MB default
    private List<String> allowedContentTypes = List.of(
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
        "image/heic"
    );
}

