package com.krawl.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "krawls")
@Data
@EntityListeners(AuditingEntityListener.class)
public class Krawl {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "krawl_id", updatable = false, nullable = false)
    private UUID krawlId;
    
    @Column(name = "title", nullable = false, length = 255)
    private String title;
    
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "creator_id", nullable = false)
    private User creator;
    
    @Column(name = "visibility", length = 50, nullable = false)
    private String visibility = "public";
    
    @Column(name = "average_rating", precision = 3, scale = 2, nullable = false)
    private java.math.BigDecimal averageRating = java.math.BigDecimal.ZERO;
    
    @Column(name = "rating_count", nullable = false)
    private Integer ratingCount = 0;
    
    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;
    
    @OneToMany(mappedBy = "krawl", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("stepOrder ASC")
    private List<KrawlItem> items;
    
    @OneToMany(mappedBy = "krawl", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<KrawlRating> ratings;
}

