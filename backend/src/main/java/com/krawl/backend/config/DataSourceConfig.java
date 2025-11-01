package com.krawl.backend.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.util.StringUtils;

import javax.sql.DataSource;
import java.net.URI;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;

/**
 * DataSource Configuration
 * 
 * Handles both PostgreSQL URI format (from Render.com: postgresql://user:pass@host:port/db)
 * and JDBC URL format (jdbc:postgresql://host:port/db) for compatibility.
 */
@Slf4j
@Configuration
public class DataSourceConfig {

    @Value("${spring.datasource.url:}")
    private String datasourceUrl;

    @Value("${spring.datasource.username:}")
    private String username;

    @Value("${spring.datasource.password:}")
    private String password;

    @Value("${spring.datasource.hikari.connection-timeout:30000}")
    private long connectionTimeout;

    @Value("${spring.datasource.hikari.idle-timeout:600000}")
    private long idleTimeout;

    @Value("${spring.datasource.hikari.max-lifetime:1800000}")
    private long maxLifetime;

    @Value("${spring.datasource.hikari.maximum-pool-size:20}")
    private int maximumPoolSize;

    @Value("${spring.datasource.hikari.minimum-idle:3}")
    private int minimumIdle;

    @Value("${spring.datasource.hikari.leak-detection-threshold:60000}")
    private long leakDetectionThreshold;

    @Value("${spring.datasource.hikari.auto-commit:false}")
    private boolean autoCommit;

    @Value("${DB_SSLMODE:prefer}")
    private String sslMode;

    /**
     * Result of database URL normalization, including extracted credentials.
     */
    private static class DatabaseConnectionInfo {
        final String jdbcUrl;
        final String extractedUsername;
        final String extractedPassword;

        DatabaseConnectionInfo(String jdbcUrl, String extractedUsername, String extractedPassword) {
            this.jdbcUrl = jdbcUrl;
            this.extractedUsername = extractedUsername;
            this.extractedPassword = extractedPassword;
        }
    }

    /**
     * Converts PostgreSQL URI to JDBC URL format if needed.
     * Handles formats:
     * - postgresql://user:pass@host:port/dbname -> jdbc:postgresql://host:port/dbname
     * - jdbc:postgresql://host:port/dbname -> unchanged
     * 
     * Also extracts credentials from URI if present.
     */
    private DatabaseConnectionInfo normalizeDatabaseUrl(String url) {
        if (!StringUtils.hasText(url)) {
            return new DatabaseConnectionInfo(url, null, null);
        }

        // If it's already a JDBC URL, return as-is
        if (url.startsWith("jdbc:postgresql://")) {
            return new DatabaseConnectionInfo(url, null, null);
        }

        // Handle PostgreSQL URI format (from Render.com, Heroku, etc.)
        if (url.startsWith("postgresql://") || url.startsWith("postgres://")) {
            try {
                // Parse the PostgreSQL URI
                URI uri = new URI(url);
                
                String host = uri.getHost();
                int port = uri.getPort() == -1 ? 5432 : uri.getPort();
                String path = uri.getPath();
                String dbName = path.startsWith("/") ? path.substring(1) : path;
                String query = uri.getQuery();
                
                // Extract user info if present (user:password@host)
                String extractedUsername = null;
                String extractedPassword = null;
                String userInfo = uri.getUserInfo();
                if (userInfo != null && userInfo.contains(":")) {
                    String[] parts = userInfo.split(":", 2);
                    extractedUsername = URLDecoder.decode(parts[0], StandardCharsets.UTF_8);
                    extractedPassword = URLDecoder.decode(parts[1], StandardCharsets.UTF_8);
                } else if (userInfo != null) {
                    extractedUsername = URLDecoder.decode(userInfo, StandardCharsets.UTF_8);
                }

                // Build JDBC URL
                StringBuilder jdbcUrl = new StringBuilder("jdbc:postgresql://");
                jdbcUrl.append(host);
                if (port != 5432) {
                    jdbcUrl.append(":").append(port);
                }
                jdbcUrl.append("/").append(dbName);

                // Handle query parameters
                StringBuilder queryParams = new StringBuilder();
                if (StringUtils.hasText(query)) {
                    queryParams.append("?").append(query);
                }
                
                // Add SSL mode if not already present
                if (!queryParams.toString().contains("sslmode")) {
                    queryParams.append(queryParams.length() == 0 ? "?" : "&");
                    queryParams.append("sslmode=").append(sslMode);
                }
                
                // Add prepareThreshold for performance
                if (!queryParams.toString().contains("prepareThreshold")) {
                    queryParams.append("&prepareThreshold=0");
                }
                
                jdbcUrl.append(queryParams);

                log.info("Converted PostgreSQL URI to JDBC URL format");
                log.debug("Original URI: {}, Converted JDBC URL: {}", url, 
                    jdbcUrl.toString().replaceAll("password=[^&]*", "password=***"));
                
                return new DatabaseConnectionInfo(jdbcUrl.toString(), extractedUsername, extractedPassword);
            } catch (Exception e) {
                log.error("Failed to parse PostgreSQL URI: {}", url, e);
                throw new IllegalArgumentException("Invalid DATABASE_URL format: " + url, e);
            }
        }

        // Unknown format, return as-is (will likely fail, but preserves original behavior)
        log.warn("Unknown DATABASE_URL format, using as-is: {}", 
            url.replaceAll("password=[^&]*", "password=***"));
        return new DatabaseConnectionInfo(url, null, null);
    }

    @Bean
    @Primary
    public DataSource dataSource() {
        DatabaseConnectionInfo connectionInfo = normalizeDatabaseUrl(datasourceUrl);
        
        // Use credentials from URI if available, otherwise use injected values
        String finalUsername = StringUtils.hasText(connectionInfo.extractedUsername) 
            ? connectionInfo.extractedUsername 
            : username;
        String finalPassword = StringUtils.hasText(connectionInfo.extractedPassword) 
            ? connectionInfo.extractedPassword 
            : password;
        
        HikariConfig config = new HikariConfig();
        config.setJdbcUrl(connectionInfo.jdbcUrl);
        config.setUsername(finalUsername);
        config.setPassword(finalPassword);
        config.setConnectionTimeout(connectionTimeout);
        config.setIdleTimeout(idleTimeout);
        config.setMaxLifetime(maxLifetime);
        config.setMaximumPoolSize(maximumPoolSize);
        config.setMinimumIdle(minimumIdle);
        config.setLeakDetectionThreshold(leakDetectionThreshold);
        config.setAutoCommit(autoCommit);
        
        // Connection pool name for monitoring
        config.setPoolName("KrawlHikariPool");
        
        // Connection test query
        config.setConnectionTestQuery("SELECT 1");
        
        // PostgreSQL-specific optimizations
        config.addDataSourceProperty("cachePrepStmts", "true");
        config.addDataSourceProperty("prepStmtCacheSize", "250");
        config.addDataSourceProperty("prepStmtCacheSqlLimit", "2048");
        config.addDataSourceProperty("useServerPrepStmts", "true");
        config.addDataSourceProperty("useLocalSessionState", "true");
        config.addDataSourceProperty("rewriteBatchedStatements", "true");
        config.addDataSourceProperty("cacheResultSetMetadata", "true");
        config.addDataSourceProperty("cacheServerConfiguration", "true");
        config.addDataSourceProperty("elideSetAutoCommits", "true");
        config.addDataSourceProperty("maintainTimeStats", "false");

        HikariDataSource dataSource = new HikariDataSource(config);
        
        log.info("HikariCP DataSource configured successfully");
        log.debug("JDBC URL: {}", connectionInfo.jdbcUrl.replaceAll("password=[^&]*", "password=***"));
        
        return dataSource;
    }
}

