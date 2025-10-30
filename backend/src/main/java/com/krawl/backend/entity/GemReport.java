package com.krawl.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "gem_reports")
@Data
@EntityListeners(AuditingEntityListener.class)
public class GemReport {
    
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "report_id", updatable = false, nullable = false)
    private UUID reportId;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "gem_id", nullable = false)
    private Gem gem;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reporter_id", nullable = false)
    private User reporter;
    
    @Column(name = "report_type", nullable = false, length = 50)
    private String reportType;
    
    @Column(name = "comment", columnDefinition = "TEXT")
    private String comment;
    
    @Column(name = "status", length = 50, nullable = false, columnDefinition = "VARCHAR(50) DEFAULT 'pending'")
    private String status = "pending";
    
    @Column(name = "reviewed_at")
    private LocalDateTime reviewedAt;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reviewed_by")
    private User reviewedBy;
    
    @Column(name = "resolution_notes", columnDefinition = "TEXT")
    private String resolutionNotes;
    
    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
}

