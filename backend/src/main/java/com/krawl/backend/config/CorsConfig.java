package com.krawl.backend.config;

import com.krawl.backend.config.properties.CorsProperties;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Slf4j
@Configuration
@EnableConfigurationProperties(CorsProperties.class)
@RequiredArgsConstructor
public class CorsConfig {

    private final CorsProperties corsProperties;

    @Bean
    public CorsFilter corsFilter() {
        log.info("Configuring CORS with allowed origins: {}", corsProperties.getAllowedOrigins());
        
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(corsProperties.isAllowCredentials());
        config.setAllowedOrigins(corsProperties.getAllowedOriginsList());
        config.setAllowedMethods(corsProperties.getAllowedMethodsList());
        config.setAllowedHeaders(corsProperties.getAllowedHeadersList());
        config.setMaxAge(corsProperties.getMaxAge());

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return new CorsFilter(source);
    }
}