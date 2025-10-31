package com.krawl.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.locationtech.jts.geom.Point;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "gems")
@Data
@EntityListeners(AuditingEntityListener.class)
public class Gem {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "gem_id", updatable = false, nullable = false)
    private UUID gemId;
    
    @Column(name = "name", nullable = false, length = 255)
    private String name;
    
    @Column(name = "description", columnDefinition = "TEXT")
    private String description;
    
    @Column(name = "location", nullable = false, columnDefinition = "geography(Point,4326)")
    private Point location;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "founder_id")
    private User founder;
    
    @Column(name = "vouch_count", nullable = false)
    private Integer vouchCount = 0;
    
    @Column(name = "average_rating", precision = 3, scale = 2, nullable = false)
    private java.math.BigDecimal averageRating = java.math.BigDecimal.ZERO;
    
    @Column(name = "rating_count", nullable = false)
    private Integer ratingCount = 0;
    
    @Column(name = "approval_status", length = 50, nullable = false)
    private String approvalStatus = "pending";
    
    @Column(name = "lifecycle_status", length = 50, nullable = false)
    private String lifecycleStatus = "open";
    
    @Column(name = "last_verified_at")
    private LocalDateTime lastVerifiedAt;
    
    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;
    
    @OneToMany(mappedBy = "gem", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<GemPhoto> photos;
    
    @OneToMany(mappedBy = "gem", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<GemTag> gemTags;
    
    @OneToMany(mappedBy = "gem", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<GemVouch> vouches;
    
    @OneToMany(mappedBy = "gem", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<GemRating> ratings;
}

