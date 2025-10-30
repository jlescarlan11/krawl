package com.krawl.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "saved_krawls")
@Data
@EntityListeners(AuditingEntityListener.class)
@IdClass(SavedKrawlId.class)
public class SavedKrawl {
    
    @Id
    @Column(name = "user_id", nullable = false)
    private UUID user;
    
    @Id
    @Column(name = "krawl_id", nullable = false)
    private UUID krawl;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    private User userEntity;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "krawl_id", insertable = false, updatable = false)
    private Krawl krawlEntity;
    
    @CreatedDate
    @Column(name = "saved_at", nullable = false, updatable = false)
    private LocalDateTime savedAt;
    
    @Column(name = "is_downloaded", nullable = false)
    private Boolean isDownloaded = false;
    
    @Column(name = "last_downloaded_at")
    private LocalDateTime lastDownloadedAt;
}

