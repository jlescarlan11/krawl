package com.krawl.backend.config.properties;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * Configuration properties for Gem-related settings.
 * Values can be configured in application.yaml or via environment variables.
 */
@Component
@ConfigurationProperties(prefix = "gem")
@Getter
@Setter
public class GemProperties {
    /**
     * Duplicate detection radius in meters.
     * Default: 50 meters
     */
    private double duplicateRadiusMeters = 50.0;
}

