package com.krawl.backend.config.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@ConfigurationProperties(prefix = "cors")
@Data
public class CorsProperties {
    private String allowedOrigins;
    private String allowedMethods;
    private String allowedHeaders;
    private boolean allowCredentials = true;
    private long maxAge = 3600;
    
    public List<String> getAllowedOriginsList() {
        return List.of(allowedOrigins.split(","));
    }
    
    public List<String> getAllowedMethodsList() {
        return List.of(allowedMethods.split(","));
    }
    
    public List<String> getAllowedHeadersList() {
        if ("*".equals(allowedHeaders)) {
            return List.of("*");
        }
        return List.of(allowedHeaders.split(","));
    }
}

