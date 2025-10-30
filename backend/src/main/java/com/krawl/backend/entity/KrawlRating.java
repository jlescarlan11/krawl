package com.krawl.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "krawl_ratings", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"krawl_id", "user_id"})
})
@Data
@EntityListeners(AuditingEntityListener.class)
public class KrawlRating {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "rating_id", updatable = false, nullable = false)
    private UUID ratingId;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "krawl_id", nullable = false)
    private Krawl krawl;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @Column(name = "rating", nullable = false)
    @jakarta.validation.constraints.Min(1)
    @jakarta.validation.constraints.Max(5)
    private Short rating;
    
    @Column(name = "comment", columnDefinition = "TEXT")
    private String comment;
    
    @Column(name = "flag_outdated", nullable = false)
    private Boolean flagOutdated = false;
    
    @Column(name = "flag_bad_route", nullable = false)
    private Boolean flagBadRoute = false;
    
    @Column(name = "flag_low_quality_gems", nullable = false)
    private Boolean flagLowQualityGems = false;
    
    @Column(name = "flag_spam_misleading", nullable = false)
    private Boolean flagSpamMisleading = false;
    
    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
}

