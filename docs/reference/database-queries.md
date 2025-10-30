# Common Database Queries

> **Purpose:** Reference collection of frequently used SQL queries for the Krawl database with PostGIS geospatial operations.

**Version:** 1.0.0  
**Last Updated:** 2025-10-31  
**Status:** Active  
**Owner:** Backend Team

---

## Quick Reference

| Query Type | Description |
|------------|-------------|
| [Proximity Search](#proximity-search) | Find Gems near a location |
| [Top Rated Content](#top-rated-queries) | Get highest-rated Gems/Krawls |
| [User Content](#user-content-queries) | Fetch user's Gems, Krawls, etc. |
| [Statistics](#statistics-queries) | Aggregate data for dashboards |
| [Geospatial](#advanced-geospatial) | Advanced PostGIS operations |

---

## Proximity Search

### Find Gems Near a Location

```sql
-- Find Gems within 5km of a point
SELECT 
    gem_id, 
    name, 
    description,
    ST_Distance(location, ST_MakePoint(121.0244, 14.5547)::geography) as distance_meters
FROM gems
WHERE ST_DWithin(
    location, 
    ST_MakePoint(121.0244, 14.5547)::geography,  -- Manila coordinates
    5000  -- 5km radius in meters
)
AND deleted_at IS NULL
ORDER BY distance_meters
LIMIT 20;
```

**Parameters:**
- `121.0244, 14.5547` - Longitude, Latitude (Manila)
- `5000` - Radius in meters

---

### Find Gems in Bounding Box

```sql
-- Find all Gems in a rectangular area (e.g., visible map bounds)
SELECT gem_id, name, 
       ST_Y(location::geometry) as latitude,
       ST_X(location::geometry) as longitude
FROM gems
WHERE ST_Within(
    location::geometry,
    ST_MakeEnvelope(
        120.9, 14.4,  -- Southwest corner (lng, lat)
        121.1, 14.7,  -- Northeast corner (lng, lat)
        4326
    )
)
AND deleted_at IS NULL;
```

---

## Top Rated Queries

### Top Rated Gems

```sql
SELECT 
    g.gem_id,
    g.name,
    g.average_rating,
    g.rating_count,
    g.vouch_count,
    u.username as founder_username
FROM gems g
JOIN users u ON g.founder_id = u.user_id
WHERE g.rating_count >= 5  -- Minimum ratings for reliability
  AND g.deleted_at IS NULL
  AND u.deleted_at IS NULL
ORDER BY g.average_rating DESC, g.rating_count DESC
LIMIT 10;
```

---

### Top Rated Krawls

```sql
SELECT 
    k.krawl_id,
    k.title,
    k.description,
    k.average_rating,
    k.rating_count,
    u.username as creator_username,
    u.creator_score,
    u.reputation_tier,
    COUNT(ki.krawl_item_id) as stop_count
FROM krawls k
JOIN users u ON k.creator_id = u.user_id
LEFT JOIN krawl_items ki ON k.krawl_id = ki.krawl_id
WHERE k.visibility = 'public'
  AND k.rating_count >= 5
  AND k.deleted_at IS NULL
  AND u.deleted_at IS NULL
GROUP BY k.krawl_id, u.user_id
ORDER BY k.average_rating DESC, k.rating_count DESC
LIMIT 10;
```

---

## User Content Queries

### Get User's Created Gems

```sql
SELECT 
    g.gem_id,
    g.name,
    g.description,
    g.average_rating,
    g.rating_count,
    g.vouch_count,
    g.lifecycle_status,
    g.created_at,
    ST_Y(g.location::geometry) as latitude,
    ST_X(g.location::geometry) as longitude
FROM gems g
WHERE g.founder_id = :userId
  AND g.deleted_at IS NULL
ORDER BY g.created_at DESC;
```

---

### Get User's Created Krawls

```sql
SELECT 
    k.krawl_id,
    k.title,
    k.description,
    k.visibility,
    k.average_rating,
    k.rating_count,
    k.created_at,
    COUNT(ki.krawl_item_id) as stop_count
FROM krawls k
LEFT JOIN krawl_items ki ON k.krawl_id = ki.krawl_id
WHERE k.creator_id = :userId
  AND k.deleted_at IS NULL
GROUP BY k.krawl_id
ORDER BY k.created_at DESC;
```

---

### Get User's Saved Krawls

```sql
SELECT 
    k.krawl_id,
    k.title,
    k.description,
    k.average_rating,
    u.username as creator_username,
    sk.saved_at,
    sk.is_downloaded,
    sk.last_downloaded_at,
    COUNT(ki.krawl_item_id) as stop_count
FROM saved_krawls sk
JOIN krawls k ON sk.krawl_id = k.krawl_id
JOIN users u ON k.creator_id = u.user_id
LEFT JOIN krawl_items ki ON k.krawl_id = ki.krawl_id
WHERE sk.user_id = :userId
  AND k.deleted_at IS NULL
GROUP BY k.krawl_id, u.username, sk.saved_at, sk.is_downloaded, sk.last_downloaded_at
ORDER BY sk.saved_at DESC;
```

---

## Krawl Detail Queries

### Get Krawl with All Stops (Ordered)

```sql
SELECT 
    k.krawl_id,
    k.title,
    k.description,
    k.average_rating,
    k.rating_count,
    u.username as creator_username,
    u.creator_score,
    json_agg(
        json_build_object(
            'step_order', ki.step_order,
            'gem_id', g.gem_id,
            'gem_name', g.name,
            'gem_description', g.description,
            'latitude', ST_Y(g.location::geometry),
            'longitude', ST_X(g.location::geometry),
            'creator_note', ki.creator_note,
            'lokal_secret', ki.lokal_secret,
            'average_rating', g.average_rating,
            'vouch_count', g.vouch_count
        ) ORDER BY ki.step_order
    ) as stops
FROM krawls k
JOIN users u ON k.creator_id = u.user_id
LEFT JOIN krawl_items ki ON k.krawl_id = ki.krawl_id
LEFT JOIN gems g ON ki.gem_id = g.gem_id
WHERE k.krawl_id = :krawlId
  AND k.deleted_at IS NULL
GROUP BY k.krawl_id, u.user_id;
```

---

## Statistics Queries

### User Profile Statistics

```sql
SELECT 
    u.user_id,
    u.username,
    u.creator_score,
    u.reputation_tier,
    COUNT(DISTINCT g.gem_id) as gems_created,
    COUNT(DISTINCT k.krawl_id) as krawls_created,
    COUNT(DISTINCT gv.gem_id) as gems_vouched,
    COUNT(DISTINCT kr.krawl_id) as krawls_rated
FROM users u
LEFT JOIN gems g ON u.user_id = g.founder_id AND g.deleted_at IS NULL
LEFT JOIN krawls k ON u.user_id = k.creator_id AND k.deleted_at IS NULL
LEFT JOIN gem_vouches gv ON u.user_id = gv.user_id
LEFT JOIN krawl_ratings kr ON u.user_id = kr.user_id
WHERE u.user_id = :userId
  AND u.deleted_at IS NULL
GROUP BY u.user_id;
```

---

### Platform Statistics (Dashboard)

```sql
SELECT 
    (SELECT COUNT(*) FROM users WHERE deleted_at IS NULL) as total_users,
    (SELECT COUNT(*) FROM gems WHERE deleted_at IS NULL) as total_gems,
    (SELECT COUNT(*) FROM krawls WHERE deleted_at IS NULL) as total_krawls,
    (SELECT COUNT(*) FROM gem_ratings) as total_ratings,
    (SELECT AVG(average_rating)::NUMERIC(3,2) FROM gems WHERE rating_count >= 5) as avg_gem_rating,
    (SELECT AVG(average_rating)::NUMERIC(3,2) FROM krawls WHERE rating_count >= 3) as avg_krawl_rating;
```

---

## Search Queries

### Search Gems by Name or Description

```sql
SELECT 
    g.gem_id,
    g.name,
    g.description,
    g.average_rating,
    g.vouch_count,
    u.username as founder_username,
    ST_Y(g.location::geometry) as latitude,
    ST_X(g.location::geometry) as longitude
FROM gems g
JOIN users u ON g.founder_id = u.user_id
WHERE (g.name ILIKE '%' || :searchTerm || '%' 
       OR g.description ILIKE '%' || :searchTerm || '%')
  AND g.deleted_at IS NULL
  AND u.deleted_at IS NULL
ORDER BY g.average_rating DESC, g.vouch_count DESC
LIMIT 20;
```

---

### Search Gems by Tag

```sql
SELECT 
    g.gem_id,
    g.name,
    g.average_rating,
    g.vouch_count,
    array_agg(t.tag_name) as tags
FROM gems g
JOIN gem_tags gt ON g.gem_id = gt.gem_id
JOIN tags t ON gt.tag_id = t.tag_id
WHERE t.tag_name = :tagName
  AND g.deleted_at IS NULL
GROUP BY g.gem_id
ORDER BY g.average_rating DESC
LIMIT 20;
```

---

## Advanced Geospatial

### Calculate Distance Between Two Gems

```sql
SELECT 
    ST_Distance(
        (SELECT location FROM gems WHERE gem_id = :gemId1),
        (SELECT location FROM gems WHERE gem_id = :gemId2)
    ) as distance_meters;
```

---

### Find Gems Along a Route (Buffer)

```sql
-- Find Gems within 500m of a route (line)
WITH route AS (
    SELECT ST_MakeLine(ARRAY[
        ST_SetSRID(ST_MakePoint(121.0, 14.5), 4326)::geography,
        ST_SetSRID(ST_MakePoint(121.1, 14.6), 4326)::geography
    ]) as line
)
SELECT g.gem_id, g.name,
       ST_Distance(g.location, route.line) as distance_from_route
FROM gems g, route
WHERE ST_DWithin(g.location, route.line, 500)
  AND g.deleted_at IS NULL
ORDER BY distance_from_route;
```

---

### Calculate Krawl Total Distance

```sql
-- Calculate total walking distance of a Krawl
WITH ordered_stops AS (
    SELECT 
        ki.krawl_id,
        ki.step_order,
        g.location,
        LEAD(g.location) OVER (PARTITION BY ki.krawl_id ORDER BY ki.step_order) as next_location
    FROM krawl_items ki
    JOIN gems g ON ki.gem_id = g.gem_id
    WHERE ki.krawl_id = :krawlId
)
SELECT 
    krawl_id,
    SUM(ST_Distance(location, next_location))::INTEGER as total_distance_meters
FROM ordered_stops
WHERE next_location IS NOT NULL
GROUP BY krawl_id;
```

---

## Moderation Queries

### Get Pending Reports

```sql
SELECT 
    gr.report_id,
    gr.report_type,
    gr.comment,
    gr.created_at,
    g.gem_id,
    g.name as gem_name,
    u.username as reporter_username
FROM gem_reports gr
JOIN gems g ON gr.gem_id = g.gem_id
JOIN users u ON gr.reporter_id = u.user_id
WHERE gr.status = 'pending'
ORDER BY gr.created_at DESC;
```

---

### Get Flagged Gems

```sql
SELECT 
    g.gem_id,
    g.name,
    g.lifecycle_status,
    COUNT(gr.report_id) as report_count,
    array_agg(DISTINCT gr.report_type) as report_types
FROM gems g
JOIN gem_reports gr ON g.gem_id = gr.gem_id
WHERE gr.status = 'pending'
GROUP BY g.gem_id
HAVING COUNT(gr.report_id) >= 3
ORDER BY report_count DESC;
```

---

## Performance Tips

### Use Indexes

All queries leverage these indexes:
- `idx_gems_location` (GIST) - proximity searches
- `idx_gems_founder_id` - user content queries
- `idx_krawls_creator_id` - user krawls
- `idx_gem_ratings_gem_id` - rating aggregations

### Optimize Queries

- **Use `LIMIT`** for pagination
- **Add `WHERE deleted_at IS NULL`** to filter soft-deleted records
- **Use `EXPLAIN ANALYZE`** to check query plans
- **Consider materialized views** for complex dashboards

---

## 📚 Related Documents

- [Database Schema](./database-schema.md) - Table definitions
- [Database Triggers](../how-to/database-triggers.md) - Automated functions
- [Database Testing](../how-to/test-database.md) - Testing procedures
- [API Documentation](./api-endpoints.md) - API endpoints using these queries

---

*Document maintained by Backend Team • Last reviewed: 2025-10-31*

