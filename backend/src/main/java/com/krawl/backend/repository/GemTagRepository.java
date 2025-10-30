package com.krawl.backend.repository;

import com.krawl.backend.entity.GemTag;
import com.krawl.backend.entity.GemTagId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GemTagRepository extends JpaRepository<GemTag, GemTagId> {
}

