package com.krawl.backend.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;
import java.util.UUID;

@Data
@EqualsAndHashCode
public class SavedKrawlId implements Serializable {
    private UUID user;
    private UUID krawl;
}

