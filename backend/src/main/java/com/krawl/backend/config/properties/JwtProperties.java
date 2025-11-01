package com.krawl.backend.config.properties;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "jwt")
@Getter
@Setter
public class JwtProperties {
    private String secret;
    private long expiration = 86400000; // 24 hours in milliseconds
    private long refreshExpiration = 2592000000L; // 30 days in milliseconds
    private boolean cookieSecure = false; // Default false for local dev, set true in production
}

