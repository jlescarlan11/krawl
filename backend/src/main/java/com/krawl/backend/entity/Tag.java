package com.krawl.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "tags")
@Data
public class Tag {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tag_id")
    private Integer tagId;
    
    @Column(name = "tag_name", unique = true, nullable = false, length = 100)
    private String tagName;
}

