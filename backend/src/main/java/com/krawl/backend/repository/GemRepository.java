package com.krawl.backend.repository;

import com.krawl.backend.entity.Gem;
import org.locationtech.jts.geom.Polygon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface GemRepository extends JpaRepository<Gem, UUID> {
    
    @Query(value = "SELECT * FROM gems WHERE ST_Within(location::geometry, :viewport::geometry) = true AND deleted_at IS NULL", 
           nativeQuery = true)
    List<Gem> findGemsInViewport(@Param("viewport") Polygon viewport);
    
    List<Gem> findByFounderUserId(UUID founderId);
    
    List<Gem> findByDeletedAtIsNull();
}

