package com.krawl.backend.config.properties;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * Configuration properties for JWT tokens and authentication cookies.
 * Values can be configured in application.yaml or via environment variables.
 */
@Component
@ConfigurationProperties(prefix = "jwt")
@Getter
@Setter
public class JwtProperties {
    /**
     * JWT secret key for signing tokens
     */
    private String secret;
    
    /**
     * Access token expiration time in milliseconds.
     * Default: 24 hours (86400000 ms)
     */
    private long expiration = 86400000;
    
    /**
     * Refresh token expiration time in milliseconds.
     * Default: 30 days (2592000000 ms)
     */
    private long refreshExpiration = 2592000000L;
    
    /**
     * Cookie security configuration.
     * false = HTTP (local dev), true = HTTPS (production)
     * Default: false for local development
     */
    private boolean cookieSecure = false;
    
    /**
     * Refresh token cookie name.
     * Default: "refresh_token"
     */
    private String cookieName = "refresh_token";
    
    /**
     * Refresh token cookie path.
     * Default: "/api/v1/auth"
     */
    private String cookiePath = "/api/v1/auth";
    
    /**
     * Refresh token cookie max age in days.
     * Default: 30 days
     */
    private int cookieMaxAgeDays = 30;
}

