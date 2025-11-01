package com.krawl.backend.repository;

import com.krawl.backend.entity.Gem;
import com.krawl.backend.repository.projection.GemDistanceResult;
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
    long countByFounderUserId(UUID founderId);
    
    List<Gem> findByDeletedAtIsNull();
    
    /**
     * Find nearby Gems within a specified radius for duplicate detection.
     * Uses PostGIS ST_DWithin for efficient geospatial querying.
     * 
     * @param lat Latitude of the search point
     * @param lng Longitude of the search point
     * @param radius Radius in meters to search within
     * @return List of potentially duplicate Gems with distance information, ordered by distance (closest first)
     */
    @Query(value = """
        SELECT g.gem_id as gemId,
               g.name as name,
               ST_Distance(g.location, ST_MakePoint(:lng, :lat)::geography) as distanceMeters,
               g.founder_id as founderId,
               u.username as founderUsername,
               g.vouch_count as vouchCount,
               g.average_rating as averageRating
        FROM gems g
        LEFT JOIN users u ON g.founder_id = u.user_id
        WHERE ST_DWithin(g.location, ST_MakePoint(:lng, :lat)::geography, :radius)
          AND g.deleted_at IS NULL
        ORDER BY distanceMeters ASC
        LIMIT 5
        """, nativeQuery = true)
    List<GemDistanceResult> findNearbyGems(
        @Param("lat") double lat,
        @Param("lng") double lng,
        @Param("radius") double radius
    );
}

