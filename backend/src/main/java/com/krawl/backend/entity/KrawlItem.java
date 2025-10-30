package com.krawl.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import java.util.UUID;

@Entity
@Table(name = "krawl_items", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"krawl_id", "step_order"}),
    @UniqueConstraint(columnNames = {"krawl_id", "gem_id"})
})
@Data
public class KrawlItem {
    
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(name = "UUID", strategy = "org.hibernate.id.UUIDGenerator")
    @Column(name = "krawl_item_id", updatable = false, nullable = false)
    private UUID krawlItemId;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "krawl_id", nullable = false)
    private Krawl krawl;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "gem_id", nullable = false)
    private Gem gem;
    
    @Column(name = "step_order", nullable = false)
    private Integer stepOrder;
    
    @Column(name = "creator_note", columnDefinition = "TEXT")
    private String creatorNote;
    
    @Column(name = "lokal_secret", columnDefinition = "TEXT")
    private String lokalSecret;
}

