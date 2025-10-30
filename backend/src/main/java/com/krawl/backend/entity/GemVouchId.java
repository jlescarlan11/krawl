package com.krawl.backend.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;
import java.util.UUID;

@Data
@EqualsAndHashCode
public class GemVouchId implements Serializable {
    private UUID gem;
    private UUID user;
}

