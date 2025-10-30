package com.krawl.backend.mapper;

import com.krawl.backend.dto.request.GemCreateRequest;
import com.krawl.backend.dto.request.GemUpdateRequest;
import com.krawl.backend.dto.response.GemResponse;
import com.krawl.backend.entity.Gem;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.springframework.stereotype.Component;

@Component
public class GemMapper {
    
    private static final GeometryFactory geometryFactory = new GeometryFactory();
    
    public GemResponse toResponse(Gem gem) {
        if (gem == null) {
            return null;
        }
        
        Double latitude = null;
        Double longitude = null;
        if (gem.getLocation() != null) {
            latitude = gem.getLocation().getY();
            longitude = gem.getLocation().getX();
        }
        
        return GemResponse.builder()
                .gemId(gem.getGemId())
                .name(gem.getName())
                .description(gem.getDescription())
                .latitude(latitude)
                .longitude(longitude)
                .founderId(gem.getFounder() != null ? gem.getFounder().getUserId() : null)
                .founderUsername(gem.getFounder() != null ? gem.getFounder().getUsername() : null)
                .vouchCount(gem.getVouchCount())
                .averageRating(gem.getAverageRating())
                .ratingCount(gem.getRatingCount())
                .approvalStatus(gem.getApprovalStatus())
                .lifecycleStatus(gem.getLifecycleStatus())
                .lastVerifiedAt(gem.getLastVerifiedAt())
                .createdAt(gem.getCreatedAt())
                .updatedAt(gem.getUpdatedAt())
                .build();
    }
    
    public Gem toEntity(GemCreateRequest request) {
        if (request == null) {
            return null;
        }
        
        Gem gem = new Gem();
        gem.setName(request.getName());
        gem.setDescription(request.getDescription());
        
        // Create Point from latitude/longitude
        if (request.getLatitude() != null && request.getLongitude() != null) {
            Point location = geometryFactory.createPoint(
                    new Coordinate(request.getLongitude(), request.getLatitude())
            );
            location.setSRID(4326); // WGS84
            gem.setLocation(location);
        }
        
        return gem;
    }
    
    public void updateEntity(Gem gem, GemUpdateRequest request) {
        if (gem == null || request == null) {
            return;
        }
        
        if (request.getName() != null) {
            gem.setName(request.getName());
        }
        if (request.getDescription() != null) {
            gem.setDescription(request.getDescription());
        }
        if (request.getLatitude() != null && request.getLongitude() != null) {
            Point location = geometryFactory.createPoint(
                    new Coordinate(request.getLongitude(), request.getLatitude())
            );
            location.setSRID(4326);
            gem.setLocation(location);
        }
    }
}

