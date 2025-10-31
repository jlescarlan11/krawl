# How to Implement Database Triggers

> **Purpose:** Implementation guide for PostgreSQL triggers and functions that automate data integrity and calculations in the Krawl database.

**Version:** 1.0.0  
**Last Updated:** 2025-10-31  
**Status:** Active  
**Owner:** Backend Team

---

## Overview

These triggers automate:
- Timestamp updates
- Rating aggregations
- Vouch count updates
- User reputation calculations

**All triggers should be implemented during database setup.**

---

## 1. Auto-Update `updated_at` Timestamps

### Function

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;
```

### Apply to Tables

```sql
-- Users table
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Gems table
CREATE TRIGGER update_gems_updated_at
    BEFORE UPDATE ON gems
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Gem ratings table
CREATE TRIGGER update_gem_ratings_updated_at
    BEFORE UPDATE ON gem_ratings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Krawls table
CREATE TRIGGER update_krawls_updated_at
    BEFORE UPDATE ON krawls
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

**Why:** Ensures `updated_at` timestamps are always accurate without application logic.

---

## 2. Auto-Update Gem Rating Statistics

### Function

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
```

### Trigger

```sql
CREATE TRIGGER trigger_update_gem_rating_stats
    AFTER INSERT OR UPDATE OR DELETE ON gem_ratings
    FOR EACH ROW
    EXECUTE FUNCTION update_gem_rating_stats();
```

**Why:** Keeps `gems.average_rating` and `gems.rating_count` synchronized automatically.

**Performance Note:** For high-traffic scenarios, consider updating stats asynchronously via batch job.

---

## 3. Auto-Update Gem Vouch Count

### Function

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
```

### Trigger

```sql
CREATE TRIGGER trigger_update_gem_vouch_count
    AFTER INSERT OR DELETE ON gem_vouches
    FOR EACH ROW
    EXECUTE FUNCTION update_gem_vouch_count();
```

**Why:** Maintains accurate vouch counts without application-side logic.

---

## 4. Auto-Update Krawl Rating Statistics

### Function

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
```

### Trigger

```sql
CREATE TRIGGER trigger_update_krawl_rating_stats
    AFTER INSERT OR UPDATE OR DELETE ON krawl_ratings
    FOR EACH ROW
    EXECUTE FUNCTION update_krawl_rating_stats();
```

**Why:** Keeps Krawl statistics accurate in real-time.

---

## 5. Auto-Update User Creator Score

### Function

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
```

### Trigger

```sql
CREATE TRIGGER trigger_update_user_creator_score
    AFTER INSERT OR UPDATE OR DELETE ON krawl_ratings
    FOR EACH ROW
    EXECUTE FUNCTION update_user_creator_score();
```

**Why:** Maintains user reputation based on their Krawl ratings.

**Business Rule:** Only Krawls with 3+ ratings are included to prevent score manipulation.

---

## Installation Script

**Run this script after creating all tables:**

```sql
-- 1. Auto-update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_gems_updated_at
    BEFORE UPDATE ON gems FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_gem_ratings_updated_at
    BEFORE UPDATE ON gem_ratings FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_krawls_updated_at
    BEFORE UPDATE ON krawls FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 2. Gem rating statistics
CREATE OR REPLACE FUNCTION update_gem_rating_stats()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE gems
    SET 
        average_rating = COALESCE(
            (SELECT AVG(rating)::NUMERIC(3,2) FROM gem_ratings 
             WHERE gem_id = COALESCE(NEW.gem_id, OLD.gem_id)), 0.00),
        rating_count = COALESCE(
            (SELECT COUNT(*) FROM gem_ratings 
             WHERE gem_id = COALESCE(NEW.gem_id, OLD.gem_id)), 0)
    WHERE gem_id = COALESCE(NEW.gem_id, OLD.gem_id);
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_gem_rating_stats
    AFTER INSERT OR UPDATE OR DELETE ON gem_ratings FOR EACH ROW
    EXECUTE FUNCTION update_gem_rating_stats();

-- 3. Gem vouch count
CREATE OR REPLACE FUNCTION update_gem_vouch_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE gems
    SET vouch_count = (
        SELECT COUNT(*) FROM gem_vouches 
        WHERE gem_id = COALESCE(NEW.gem_id, OLD.gem_id))
    WHERE gem_id = COALESCE(NEW.gem_id, OLD.gem_id);
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_gem_vouch_count
    AFTER INSERT OR DELETE ON gem_vouches FOR EACH ROW
    EXECUTE FUNCTION update_gem_vouch_count();

-- 4. Krawl rating statistics
CREATE OR REPLACE FUNCTION update_krawl_rating_stats()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE krawls
    SET 
        average_rating = COALESCE(
            (SELECT AVG(rating)::NUMERIC(3,2) FROM krawl_ratings 
             WHERE krawl_id = COALESCE(NEW.krawl_id, OLD.krawl_id)), 0.00),
        rating_count = COALESCE(
            (SELECT COUNT(*) FROM krawl_ratings 
             WHERE krawl_id = COALESCE(NEW.krawl_id, OLD.krawl_id)), 0)
    WHERE krawl_id = COALESCE(NEW.krawl_id, OLD.krawl_id);
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_krawl_rating_stats
    AFTER INSERT OR UPDATE OR DELETE ON krawl_ratings FOR EACH ROW
    EXECUTE FUNCTION update_krawl_rating_stats();

-- 5. User creator score
CREATE OR REPLACE FUNCTION update_user_creator_score()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE users
    SET creator_score = COALESCE(
        (SELECT AVG(k.average_rating)::NUMERIC(3,2) FROM krawls k
         WHERE k.creator_id = (SELECT creator_id FROM krawls 
                               WHERE krawl_id = COALESCE(NEW.krawl_id, OLD.krawl_id))
         AND k.rating_count >= 3), 0.00)
    WHERE user_id = (SELECT creator_id FROM krawls 
                     WHERE krawl_id = COALESCE(NEW.krawl_id, OLD.krawl_id));
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_user_creator_score
    AFTER INSERT OR UPDATE OR DELETE ON krawl_ratings FOR EACH ROW
    EXECUTE FUNCTION update_user_creator_score();
```

---

## Verification

### Test Gem Rating Trigger

```sql
-- Insert test data
INSERT INTO users (user_id, username, email, password_hash) 
VALUES ('00000000-0000-0000-0000-000000000001', 'testuser', 'test@example.com', 'hash');

INSERT INTO gems (gem_id, name, location, founder_id) 
VALUES ('00000000-0000-0000-0000-000000000002', 'Test Gem', 
        ST_SetSRID(ST_MakePoint(121.0, 14.0), 4326)::geography,
        '00000000-0000-0000-0000-000000000001');

-- Add ratings
INSERT INTO gem_ratings (gem_id, user_id, rating) 
VALUES ('00000000-0000-0000-0000-000000000002', '00000000-0000-0000-0000-000000000001', 5);

-- Verify average_rating and rating_count updated
SELECT gem_id, name, average_rating, rating_count FROM gems 
WHERE gem_id = '00000000-0000-0000-0000-000000000002';
-- Expected: average_rating = 5.00, rating_count = 1
```

---

## Troubleshooting

### Trigger Not Firing

Check if trigger exists:

```sql
SELECT * FROM pg_trigger WHERE tgname = 'trigger_update_gem_rating_stats';
```

### Performance Issues

If triggers cause slow inserts/updates:

1. **Add indexes** to foreign key columns
2. **Batch updates** in application code instead
3. **Use async jobs** for stat calculations
4. **Monitor query plans** with `EXPLAIN ANALYZE`

---

## Maintenance

### Disable Triggers Temporarily (for bulk operations)

```sql
-- Disable specific trigger
ALTER TABLE gem_ratings DISABLE TRIGGER trigger_update_gem_rating_stats;

-- Re-enable trigger
ALTER TABLE gem_ratings ENABLE TRIGGER trigger_update_gem_rating_stats;
```

### Recalculate All Statistics Manually

```sql
-- Recalculate all gem stats
UPDATE gems SET 
    average_rating = COALESCE((SELECT AVG(rating)::NUMERIC(3,2) 
                               FROM gem_ratings WHERE gem_id = gems.gem_id), 0.00),
    rating_count = COALESCE((SELECT COUNT(*) 
                             FROM gem_ratings WHERE gem_id = gems.gem_id), 0),
    vouch_count = COALESCE((SELECT COUNT(*) 
                            FROM gem_vouches WHERE gem_id = gems.gem_id), 0);

-- Recalculate all krawl stats
UPDATE krawls SET 
    average_rating = COALESCE((SELECT AVG(rating)::NUMERIC(3,2) 
                               FROM krawl_ratings WHERE krawl_id = krawls.krawl_id), 0.00),
    rating_count = COALESCE((SELECT COUNT(*) 
                             FROM krawl_ratings WHERE krawl_id = krawls.krawl_id), 0);

-- Recalculate all user creator scores
UPDATE users SET 
    creator_score = COALESCE((SELECT AVG(k.average_rating)::NUMERIC(3,2) 
                              FROM krawls k WHERE k.creator_id = users.user_id 
                              AND k.rating_count >= 3), 0.00);
```

---

## 📚 Related Documents

- [Database Schema](../reference/database-schema.md) - Table definitions
- [Database Queries](../reference/database-queries.md) - Common queries
- [Database Testing](./test-database.md) - Testing procedures

---

*Document maintained by Backend Team • Last reviewed: 2025-10-31*

