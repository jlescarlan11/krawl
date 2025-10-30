package com.krawl.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "gem_tags")
@Data
@IdClass(GemTagId.class)
public class GemTag {
    
    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "gem_id", nullable = false)
    private Gem gem;
    
    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tag_id", nullable = false)
    private Tag tag;
}

