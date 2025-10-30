package com.krawl.backend.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;
import java.util.UUID;

@Data
@EqualsAndHashCode
public class GemTagId implements Serializable {
    private UUID gem;
    private Integer tag;
}

