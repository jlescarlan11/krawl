package com.krawl.backend.config.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "spring.datasource.hikari")
@Data
public class DatabaseProperties {
    private boolean autoCommit = false;
    private long connectionTimeout = 30000;
    private long idleTimeout = 600000;
    private long maxLifetime = 1800000;
    private int maximumPoolSize = 20;
    private int minimumIdle = 5;
    private long leakDetectionThreshold = 60000;
}

