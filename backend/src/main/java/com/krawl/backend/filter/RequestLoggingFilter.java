package com.krawl.backend.filter;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.MDC;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.UUID;

@Slf4j
@Component
@Order(1)
public class RequestLoggingFilter implements Filter {
    
    private static final String REQUEST_ID_HEADER = "X-Request-ID";
    private static final String MDC_REQUEST_ID = "requestId";
    
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        
        // Get or generate request ID
        String requestId = httpRequest.getHeader(REQUEST_ID_HEADER);
        if (requestId == null || requestId.isEmpty()) {
            requestId = UUID.randomUUID().toString();
        }
        
        // Add to MDC for logging context
        MDC.put(MDC_REQUEST_ID, requestId);
        
        // Add to response header
        if (response instanceof jakarta.servlet.http.HttpServletResponse) {
            ((jakarta.servlet.http.HttpServletResponse) response).setHeader(REQUEST_ID_HEADER, requestId);
        }
        
        try {
            long startTime = System.currentTimeMillis();
            
            chain.doFilter(request, response);
            
            long duration = System.currentTimeMillis() - startTime;
            
            log.debug("Request {} {} completed in {}ms", 
                httpRequest.getMethod(), 
                httpRequest.getRequestURI(), 
                duration);
            
        } finally {
            // Clean up MDC
            MDC.clear();
        }
    }
}

