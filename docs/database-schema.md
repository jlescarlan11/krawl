# 🗄️ Database Schema: Krawl

> **Purpose:** This document defines the complete PostgreSQL database schema for Krawl, including all tables, relationships, indexes, and geospatial configurations using PostGIS.

**Version:** 0.1.0-MVP  
**Last Updated:** 2025-10-31  
**Status:** Active  
**Owner:** Backend Team  
**Tech Stack:** PostgreSQL 14+, PostGIS 3.0+

---

> **Note:** This schema requires PostgreSQL with the PostGIS extension enabled for geographical data handling.

---

## 📋 Table of Contents

1. [Users](#1-users-table)
2. [Gems](#2-gems-table)
3. [Tags](#3-tags-table)
4. [Gem Tags](#4-gem_tags-table)
5. [Gem Photos](#5-gem_photos-table)
6. [Gem Vouches](#6-gem_vouches-table)
7. [Gem Ratings](#7-gem_ratings-table)
8. [Gem Reports](#8-gem_reports-table)
9. [Krawls](#9-krawls-table)
10. [Krawl Items](#10-krawl_items-table)
11. [Krawl Ratings](#11-krawl_ratings-table)
12. [Saved Krawls](#12-saved_krawls-table)

---

## 1. **users** Table

Stores information about registered users.

### Schema

```sql
CREATE TABLE users (
    user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    bio TEXT,
    creator_score NUMERIC(3, 2) DEFAULT 0.00,
    reputation_tier VARCHAR(50) DEFAULT 'Newcomer',
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMPTZ -- Soft delete support
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_deleted_at ON users(deleted_at);
```

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `user_id` | UUID | Primary key, auto-generated |
| `username` | VARCHAR(50) | Unique username |
| `email` | VARCHAR(255) | Unique email address |
| `password_hash` | VARCHAR(255) | Hashed password |
| `bio` | TEXT | User biography |
| `creator_score` | NUMERIC(3, 2) | Average rating of Krawls created (0.00 - 5.00) |
| `reputation_tier` | VARCHAR(50) | User reputation level (e.g., Newcomer, Trail Maker, Kanto Guide) |
| `created_at` | TIMESTAMPTZ | Account creation timestamp |
| `updated_at` | TIMESTAMPTZ | Last update timestamp |
| `deleted_at` | TIMESTAMPTZ | Last delete timestamp |

---

## 2. **gems** Table

Stores information about points of interest (Gems).

### Schema

```sql
CREATE TABLE gems (
    gem_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    location GEOGRAPHY(Point, 4326) NOT NULL,
    founder_id UUID REFERENCES users(user_id) ON DELETE SET NULL,
    vouch_count INTEGER DEFAULT 0 NOT NULL,
    average_rating NUMERIC(3, 2) DEFAULT 0.00 NOT NULL,
    rating_count INTEGER DEFAULT 0 NOT NULL,
    approval_status VARCHAR(50) DEFAULT 'pending' NOT NULL,
    lifecycle_status VARCHAR(50) DEFAULT 'open' NOT NULL,
    last_verified_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMPTZ  -- Soft delete support
);

CREATE INDEX idx_gems_location ON gems USING GIST (location);
CREATE INDEX idx_gems_founder_id ON gems(founder_id);
CREATE INDEX idx_gems_deleted_at ON gems(deleted_at);
```

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `gem_id` | UUID | Primary key, auto-generated |
| `name` | VARCHAR(255) | Name of the gem |
| `description` | TEXT | Detailed description |
| `location` | GEOGRAPHY(Point, 4326) | Geographic coordinates (PostGIS) |
| `founder_id` | UUID | User who first pinned the gem |
| `vouch_count` | INTEGER | Number of user vouches |
| `average_rating` | NUMERIC(3, 2) | Calculated average star rating |
| `rating_count` | INTEGER | Total number of ratings |
| `approval_status` | VARCHAR(50) | Status: `pending`, `approved`, `rejected` |
| `lifecycle_status` | VARCHAR(50) | Status: `open`, `closed`, `flagged` |
| `last_verified_at` | TIMESTAMPTZ | Last "Vibe Check" timestamp |
| `created_at` | TIMESTAMPTZ | Creation timestamp |
| `updated_at` | TIMESTAMPTZ | Last update timestamp |
| `deleted_at` | TIMESTAMPTZ | Soft delete timestamp (NULL if active) |

### Notes
- The spatial index (`GIST`) enables efficient location-based queries
- `average_rating` and `rating_count` are updated via triggers or application logic

---

## 3. **tags** Table

Stores available tags that can be applied to Gems.

### Schema

```sql
CREATE TABLE tags (
    tag_id SERIAL PRIMARY KEY,
    tag_name VARCHAR(100) UNIQUE NOT NULL
);

CREATE INDEX idx_tags_tag_name ON tags(tag_name);
```

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `tag_id` | SERIAL | Primary key, auto-incrementing |
| `tag_name` | VARCHAR(100) | Unique tag name |

---

## 4. **gem_tags** Table

Associates Gems with Tags (Many-to-Many relationship).

### Schema

```sql
CREATE TABLE gem_tags (
    gem_id UUID NOT NULL REFERENCES gems(gem_id) ON DELETE CASCADE,
    tag_id INTEGER NOT NULL REFERENCES tags(tag_id) ON DELETE CASCADE,
    PRIMARY KEY (gem_id, tag_id)
);

CREATE INDEX idx_gem_tags_gem_id ON gem_tags(gem_id);
CREATE INDEX idx_gem_tags_tag_id ON gem_tags(tag_id);
```

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `gem_id` | UUID | Reference to gems table |
| `tag_id` | INTEGER | Reference to tags table |

### Notes
- Composite primary key prevents duplicate gem-tag associations

---

## 5. **gem_photos** Table

Stores photos uploaded for Gems.

### Schema

```sql
CREATE TABLE gem_photos (
    photo_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    gem_id UUID NOT NULL REFERENCES gems(gem_id) ON DELETE CASCADE,
    uploader_id UUID REFERENCES users(user_id) ON DELETE SET NULL,
    photo_url VARCHAR(1024) NOT NULL,
    caption TEXT,
    is_featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_gem_photos_gem_id ON gem_photos(gem_id);
CREATE INDEX idx_gem_photos_uploader_id ON gem_photos(uploader_id);
```

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `photo_id` | UUID | Primary key, auto-generated |
| `gem_id` | UUID | Reference to gems table |
| `uploader_id` | UUID | User who uploaded the photo |
| `photo_url` | VARCHAR(1024) | URL to stored image (e.g., S3, Cloudinary) |
| `caption` | TEXT | Optional photo caption |
| `is_featured` | BOOLEAN | Whether this is the featured photo |
| `created_at` | TIMESTAMPTZ | Upload timestamp |

---

## 6. **gem_vouches** Table

Tracks which users have vouched for a Gem (prevents multiple vouches).

### Schema

```sql
CREATE TABLE gem_vouches (
    gem_id UUID NOT NULL REFERENCES gems(gem_id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (gem_id, user_id)
);

CREATE INDEX idx_gem_vouches_gem_id ON gem_vouches(gem_id);
CREATE INDEX idx_gem_vouches_user_id ON gem_vouches(user_id);
```

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `gem_id` | UUID | Reference to gems table |
| `user_id` | UUID | User who vouched |
| `created_at` | TIMESTAMPTZ | Vouch timestamp |

### Notes
- Composite primary key ensures one vouch per user per gem

---

## 7. **gem_ratings** Table

Stores individual user ratings for Gems.

### Schema

```sql
CREATE TABLE gem_ratings (
    rating_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    gem_id UUID NOT NULL REFERENCES gems(gem_id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    rating SMALLINT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (gem_id, user_id)
);

CREATE INDEX idx_gem_ratings_gem_id ON gem_ratings(gem_id);
CREATE INDEX idx_gem_ratings_user_id ON gem_ratings(user_id);
```

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `rating_id` | UUID | Primary key, auto-generated |
| `gem_id` | UUID | Reference to gems table |
| `user_id` | UUID | User who rated |
| `rating` | SMALLINT | Star rating (1-5) |
| `comment` | TEXT | Optional rating comment |
| `created_at` | TIMESTAMPTZ | Rating creation timestamp |
| `updated_at` | TIMESTAMPTZ | Last update timestamp |

### Notes
- Unique constraint ensures one rating per user per gem
- Updates to this table should trigger recalculation of `average_rating` and `rating_count` in the `gems` table

---

## 8. **gem_reports** Table

Stores user reports about issues with Gems (Closed, Spam, etc.).

### Schema

```sql
CREATE TABLE gem_reports (
    report_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    gem_id UUID NOT NULL REFERENCES gems(gem_id) ON DELETE CASCADE,
    reporter_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    report_type VARCHAR(50) NOT NULL,
    comment TEXT,
    status VARCHAR(50) DEFAULT 'pending' NOT NULL,
    reviewed_at TIMESTAMPTZ,  -- NEW: When reviewed
    reviewed_by UUID REFERENCES users(user_id) ON DELETE SET NULL,  -- NEW: Admin who reviewed
    resolution_notes TEXT,  -- NEW: Admin notes
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_gem_reports_gem_id ON gem_reports(gem_id);
CREATE INDEX idx_gem_reports_reporter_id ON gem_reports(reporter_id);
CREATE INDEX idx_gem_reports_status ON gem_reports(status);
```

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `report_id` | UUID | Primary key, auto-generated |
| `gem_id` | UUID | Reference to gems table |
| `reporter_id` | UUID | User who filed the report |
| `report_type` | VARCHAR(50) | Type: `permanently_closed`, `wrong_location`, `spam_offensive` |
| `comment` | TEXT | Additional report details |
| `status` | VARCHAR(50) | Status: `pending`, `reviewed_valid`, `reviewed_invalid` |
| `created_at` | TIMESTAMPTZ | Report timestamp |

---

## 9. **krawls** Table

Stores information about curated trails (Krawls).

### Schema

```sql
CREATE TABLE krawls (
    krawl_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    creator_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    visibility VARCHAR(50) DEFAULT 'public' NOT NULL,
    average_rating NUMERIC(3, 2) DEFAULT 0.00 NOT NULL,
    rating_count INTEGER DEFAULT 0 NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMPTZ  -- Soft delete support
);

CREATE INDEX idx_krawls_creator_id ON krawls(creator_id);
CREATE INDEX idx_krawls_deleted_at ON krawls(deleted_at);
```

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `krawl_id` | UUID | Primary key, auto-generated |
| `title` | VARCHAR(255) | Krawl title |
| `description` | TEXT | Detailed description |
| `creator_id` | UUID | User who created the Krawl |
| `visibility` | VARCHAR(50) | Visibility: `public`, `friends_only` |
| `average_rating` | NUMERIC(3, 2) | Average rating of the Krawl |
| `rating_count` | INTEGER | Total number of ratings |
| `created_at` | TIMESTAMPTZ | Creation timestamp |
| `updated_at` | TIMESTAMPTZ | Last update timestamp |
| `deleted_at` | TIMESTAMPTZ | Soft delete timestamp (NULL if active) |

### Future Enhancements
- `estimated_distance` - Calculated distance of the route
- `estimated_time` - Estimated time to complete

---

## 10. **krawl_items** Table

Defines the sequence of Gems within a Krawl and associated notes.

### Schema

```sql
CREATE TABLE krawl_items (
    krawl_item_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    krawl_id UUID NOT NULL REFERENCES krawls(krawl_id) ON DELETE CASCADE,
    gem_id UUID NOT NULL REFERENCES gems(gem_id) ON DELETE CASCADE,
    step_order INTEGER NOT NULL,
    creator_note TEXT,
    lokal_secret TEXT,
    UNIQUE (krawl_id, step_order),
    UNIQUE (krawl_id, gem_id)
);

CREATE INDEX idx_krawl_items_krawl_id ON krawl_items(krawl_id);
CREATE INDEX idx_krawl_items_gem_id ON krawl_items(gem_id);
CREATE INDEX idx_krawl_items_krawl_step ON krawl_items(krawl_id, step_order);
```

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `krawl_item_id` | UUID | Primary key, auto-generated |
| `krawl_id` | UUID | Reference to krawls table |
| `gem_id` | UUID | Reference to gems table |
| `step_order` | INTEGER | Sequence number (1, 2, 3...) |
| `creator_note` | TEXT | Personal note from creator |
| `lokal_secret` | TEXT | Special insider tip |

### Notes
- `UNIQUE (krawl_id, step_order)` ensures sequential ordering
- `UNIQUE (krawl_id, gem_id)` prevents duplicate gems in same Krawl

---

## 11. **krawl_ratings** Table

Stores user ratings for the Krawl experience itself.

### Schema

```sql
CREATE TABLE krawl_ratings (
    rating_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    krawl_id UUID NOT NULL REFERENCES krawls(krawl_id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    rating SMALLINT NOT NULL CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    flag_outdated BOOLEAN DEFAULT FALSE,
    flag_bad_route BOOLEAN DEFAULT FALSE,
    flag_low_quality_gems BOOLEAN DEFAULT FALSE,
    flag_spam_misleading BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (krawl_id, user_id)
);

CREATE INDEX idx_krawl_ratings_krawl_id ON krawl_ratings(krawl_id);
CREATE INDEX idx_krawl_ratings_user_id ON krawl_ratings(user_id);
```

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `rating_id` | UUID | Primary key, auto-generated |
| `krawl_id` | UUID | Reference to krawls table |
| `user_id` | UUID | User who rated |
| `rating` | SMALLINT | Star rating (1-5) |
| `comment` | TEXT | Optional rating comment |
| `flag_outdated` | BOOLEAN | Flag for outdated information |
| `flag_bad_route` | BOOLEAN | Flag for poor routing |
| `flag_low_quality_gems` | BOOLEAN | Flag for low-quality gems |
| `flag_spam_misleading` | BOOLEAN | Flag for spam/misleading content |
| `created_at` | TIMESTAMPTZ | Rating timestamp |

### Notes
- Unique constraint ensures one rating per user per Krawl
- Flag fields enable specific feedback collection
- Updates should trigger recalculation of `average_rating` and `rating_count` in the `krawls` table

---

## 12. **saved_krawls** Table

Tracks which users have saved or downloaded which Krawls.

### Schema

```sql
CREATE TABLE saved_krawls (
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    krawl_id UUID NOT NULL REFERENCES krawls(krawl_id) ON DELETE CASCADE,
    saved_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    is_downloaded BOOLEAN DEFAULT FALSE,
    last_downloaded_at TIMESTAMPTZ,
    PRIMARY KEY (user_id, krawl_id)
);

CREATE INDEX idx_saved_krawls_user_id ON saved_krawls(user_id);
CREATE INDEX idx_saved_krawls_krawl_id ON saved_krawls(krawl_id);
```

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `user_id` | UUID | Reference to users table |
| `krawl_id` | UUID | Reference to krawls table |
| `saved_at` | TIMESTAMPTZ | When the Krawl was saved |
| `is_downloaded` | BOOLEAN | Whether downloaded for offline use |
| `last_downloaded_at` | TIMESTAMPTZ | Last download timestamp |

### Notes
- Composite primary key prevents duplicate saves
- Supports both online bookmarking and offline usage tracking

---

## 📊 Entity Relationships

```
users (1) ──────────── (*) gems
  │                         │
  │                         ├── (*) gem_tags ──── (*) tags
  │                         ├── (*) gem_photos
  │                         ├── (*) gem_vouches ──── (*) users
  │                         ├── (*) gem_ratings ──── (*) users
  │                         └── (*) gem_reports ──── (*) users
  │
  └── (1) ──────────── (*) krawls
                            │
                            ├── (*) krawl_items ──── (*) gems
                            ├── (*) krawl_ratings ──── (*) users
                            └── (*) saved_krawls ──── (*) users
```

---

## 🔧 Implementation Notes

### Required Extensions

```sql
CREATE EXTENSION IF NOT EXISTS postgis;
```

### Triggers & Functions

Consider implementing the following triggers:

1. **Update `updated_at` timestamps automatically**
2. **Recalculate `average_rating` and `rating_count` when ratings change**
3. **Update `vouch_count` when vouches are added/removed**
4. **Update user `creator_score` based on their Krawl ratings**

### Example Trigger for `updated_at`

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables with updated_at
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_gems_updated_at
    BEFORE UPDATE ON gems
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_gem_ratings_updated_at
    BEFORE UPDATE ON gem_ratings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_krawls_updated_at
    BEFORE UPDATE ON krawls
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

### Example Trigger for Gem Rating Stats

```sql
CREATE OR REPLACE FUNCTION update_gem_rating_stats()
RETURNS TRIGGER AS $$
BEGIN
    -- Recalculate average_rating and rating_count for the affected gem
    UPDATE gems
    SET 
        average_rating = COALESCE(
            (SELECT AVG(rating)::NUMERIC(3,2) 
             FROM gem_ratings 
             WHERE gem_id = COALESCE(NEW.gem_id, OLD.gem_id)), 
            0.00
        ),
        rating_count = COALESCE(
            (SELECT COUNT(*) 
             FROM gem_ratings 
             WHERE gem_id = COALESCE(NEW.gem_id, OLD.gem_id)), 
            0
        )
    WHERE gem_id = COALESCE(NEW.gem_id, OLD.gem_id);
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_gem_rating_stats
    AFTER INSERT OR UPDATE OR DELETE ON gem_ratings
    FOR EACH ROW
    EXECUTE FUNCTION update_gem_rating_stats();
```

### Example Trigger for Gem Vouch Count

```sql
CREATE OR REPLACE FUNCTION update_gem_vouch_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE gems
    SET vouch_count = (
        SELECT COUNT(*) 
        FROM gem_vouches 
        WHERE gem_id = COALESCE(NEW.gem_id, OLD.gem_id)
    )
    WHERE gem_id = COALESCE(NEW.gem_id, OLD.gem_id);
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_gem_vouch_count
    AFTER INSERT OR DELETE ON gem_vouches
    FOR EACH ROW
    EXECUTE FUNCTION update_gem_vouch_count();
```

### Example Trigger for Krawl Rating Stats

```sql
CREATE OR REPLACE FUNCTION update_krawl_rating_stats()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE krawls
    SET 
        average_rating = COALESCE(
            (SELECT AVG(rating)::NUMERIC(3,2) 
             FROM krawl_ratings 
             WHERE krawl_id = COALESCE(NEW.krawl_id, OLD.krawl_id)), 
            0.00
        ),
        rating_count = COALESCE(
            (SELECT COUNT(*) 
             FROM krawl_ratings 
             WHERE krawl_id = COALESCE(NEW.krawl_id, OLD.krawl_id)), 
            0
        )
    WHERE krawl_id = COALESCE(NEW.krawl_id, OLD.krawl_id);
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_krawl_rating_stats
    AFTER INSERT OR UPDATE OR DELETE ON krawl_ratings
    FOR EACH ROW
    EXECUTE FUNCTION update_krawl_rating_stats();
```

### Example Trigger for User Creator Score

```sql
CREATE OR REPLACE FUNCTION update_user_creator_score()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE users
    SET creator_score = COALESCE(
        (SELECT AVG(k.average_rating)::NUMERIC(3,2)
         FROM krawls k
         WHERE k.creator_id = (
             SELECT creator_id 
             FROM krawls 
             WHERE krawl_id = COALESCE(NEW.krawl_id, OLD.krawl_id)
         )
         AND k.rating_count >= 3  -- Only count krawls with at least 3 ratings
        ),
        0.00
    )
    WHERE user_id = (
        SELECT creator_id 
        FROM krawls 
        WHERE krawl_id = COALESCE(NEW.krawl_id, OLD.krawl_id)
    );
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_user_creator_score
    AFTER INSERT OR UPDATE OR DELETE ON krawl_ratings
    FOR EACH ROW
    EXECUTE FUNCTION update_user_creator_score();
```

### Default Tags Seeding

```sql
-- Insert default tags
INSERT INTO tags (tag_name) VALUES
    ('Food & Drinks'),
    ('Nature & Parks'),
    ('Art & Culture'),
    ('Shopping'),
    ('Nightlife'),
    ('Historical'),
    ('Adventure'),
    ('Family-Friendly'),
    ('Photography'),
    ('Local Favorite'),
    ('Hidden Gem'),
    ('Budget-Friendly'),
    ('Luxury'),
    ('Seasonal');
```

### Useful Views

```sql
-- View: Active gems (not soft-deleted)
CREATE VIEW active_gems AS
SELECT * FROM gems WHERE deleted_at IS NULL;

-- View: Active users (not soft-deleted)
CREATE VIEW active_users AS
SELECT * FROM users WHERE deleted_at IS NULL;

-- View: Public krawls with creator info
CREATE VIEW public_krawls_with_creator AS
SELECT 
    k.*,
    u.username as creator_username,
    u.creator_score as creator_score,
    u.reputation_tier as creator_tier
FROM krawls k
JOIN users u ON k.creator_id = u.user_id
WHERE k.visibility = 'public' 
  AND k.deleted_at IS NULL
  AND u.deleted_at IS NULL;
```

---

## 🔍 Common Queries

### Find Gems Near a Location

```sql
SELECT gem_id, name, description,
       ST_Distance(location, ST_MakePoint(-122.4194, 37.7749)::geography) as distance_meters
FROM gems
WHERE ST_DWithin(location, ST_MakePoint(-122.4194, 37.7749)::geography, 5000)
ORDER BY distance_meters;
```

### Get Top Rated Krawls

```sql
SELECT k.krawl_id, k.title, k.average_rating, k.rating_count, u.username
FROM krawls k
JOIN users u ON k.creator_id = u.user_id
WHERE k.visibility = 'public' AND k.rating_count >= 5
ORDER BY k.average_rating DESC, k.rating_count DESC
LIMIT 10;
```

### Get User's Saved Krawls

```sql
SELECT k.*, sk.saved_at, sk.is_downloaded
FROM saved_krawls sk
JOIN krawls k ON sk.krawl_id = k.krawl_id
WHERE sk.user_id = 'user-uuid-here'
ORDER BY sk.saved_at DESC;
```

---

## 📝 Changelog

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.1.0 | 2025-10-28 | Added triggers, views, and improved formatting | Backend Team |
| 1.0.0 | 2025-10-28 | Initial database schema | Backend Team |

---

## 📚 Related Documents

- [System Architecture](./system-architecture.md) - Overall system design
- [System Design](./system-design.md) - Data flow and design patterns
- [API Documentation](./api-documentation.md) - API endpoints using this schema
- [Project Setup](./project-setup.md) - Database setup instructions
- [Database Testing Guide](./database-testing-guide.md) - Testing procedures

---

*Document maintained by Backend Team • Last reviewed: 2025-10-28*

