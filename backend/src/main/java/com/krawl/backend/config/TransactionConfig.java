package com.krawl.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableTransactionManagement
public class TransactionConfig {
    // Transaction management is enabled globally
    // Use @Transactional on service methods for explicit transaction boundaries
}

