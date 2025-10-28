-- =============================================================================
-- Krawl Database Schema - Initial Migration
-- Version: 1.0.0
-- Description: Creates all tables, indexes, triggers, views, and seed data
-- =============================================================================

-- Enable Required Extensions
-- =============================================================================
CREATE EXTENSION IF NOT EXISTS postgis;

-- =============================================================================
-- TABLE DEFINITIONS
-- =============================================================================

-- 1. users - Stores information about registered users
-- =============================================================================
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

-- 2. gems - Stores information about points of interest (Gems)
-- =============================================================================
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

-- 3. tags - Stores available tags that can be applied to Gems
-- =============================================================================
CREATE TABLE tags (
    tag_id SERIAL PRIMARY KEY,
    tag_name VARCHAR(100) UNIQUE NOT NULL
);

CREATE INDEX idx_tags_tag_name ON tags(tag_name);

-- 4. gem_tags - Associates Gems with Tags (Many-to-Many relationship)
-- =============================================================================
CREATE TABLE gem_tags (
    gem_id UUID NOT NULL REFERENCES gems(gem_id) ON DELETE CASCADE,
    tag_id INTEGER NOT NULL REFERENCES tags(tag_id) ON DELETE CASCADE,
    PRIMARY KEY (gem_id, tag_id)
);

CREATE INDEX idx_gem_tags_gem_id ON gem_tags(gem_id);
CREATE INDEX idx_gem_tags_tag_id ON gem_tags(tag_id);

-- 5. gem_photos - Stores photos uploaded for Gems
-- =============================================================================
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

-- 6. gem_vouches - Tracks which users have vouched for a Gem
-- =============================================================================
CREATE TABLE gem_vouches (
    gem_id UUID NOT NULL REFERENCES gems(gem_id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (gem_id, user_id)
);

CREATE INDEX idx_gem_vouches_gem_id ON gem_vouches(gem_id);
CREATE INDEX idx_gem_vouches_user_id ON gem_vouches(user_id);

-- 7. gem_ratings - Stores individual user ratings for Gems
-- =============================================================================
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

-- 8. gem_reports - Stores user reports about issues with Gems
-- =============================================================================
CREATE TABLE gem_reports (
    report_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    gem_id UUID NOT NULL REFERENCES gems(gem_id) ON DELETE CASCADE,
    reporter_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    report_type VARCHAR(50) NOT NULL,
    comment TEXT,
    status VARCHAR(50) DEFAULT 'pending' NOT NULL,
    reviewed_at TIMESTAMPTZ,
    reviewed_by UUID REFERENCES users(user_id) ON DELETE SET NULL,
    resolution_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_gem_reports_gem_id ON gem_reports(gem_id);
CREATE INDEX idx_gem_reports_reporter_id ON gem_reports(reporter_id);
CREATE INDEX idx_gem_reports_status ON gem_reports(status);

-- 9. krawls - Stores information about curated trails (Krawls)
-- =============================================================================
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

-- 10. krawl_items - Defines the sequence of Gems within a Krawl
-- =============================================================================
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

-- 11. krawl_ratings - Stores user ratings for Krawls
-- =============================================================================
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

-- 12. saved_krawls - Tracks saved/downloaded Krawls by users
-- =============================================================================
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

-- =============================================================================
-- TRIGGER FUNCTIONS
-- =============================================================================

-- Function: Automatically update updated_at timestamp
-- =============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function: Update gem rating statistics
-- =============================================================================
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

-- Function: Update gem vouch count
-- =============================================================================
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

-- Function: Update krawl rating statistics
-- =============================================================================
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

-- Function: Update user creator score
-- =============================================================================
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

-- =============================================================================
-- TRIGGERS
-- =============================================================================

-- Triggers for updated_at columns
-- =============================================================================
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

-- Trigger for gem rating statistics
-- =============================================================================
CREATE TRIGGER trigger_update_gem_rating_stats
    AFTER INSERT OR UPDATE OR DELETE ON gem_ratings
    FOR EACH ROW
    EXECUTE FUNCTION update_gem_rating_stats();

-- Trigger for gem vouch count
-- =============================================================================
CREATE TRIGGER trigger_update_gem_vouch_count
    AFTER INSERT OR DELETE ON gem_vouches
    FOR EACH ROW
    EXECUTE FUNCTION update_gem_vouch_count();

-- Trigger for krawl rating statistics
-- =============================================================================
CREATE TRIGGER trigger_update_krawl_rating_stats
    AFTER INSERT OR UPDATE OR DELETE ON krawl_ratings
    FOR EACH ROW
    EXECUTE FUNCTION update_krawl_rating_stats();

-- Trigger for user creator score
-- =============================================================================
CREATE TRIGGER trigger_update_user_creator_score
    AFTER INSERT OR UPDATE OR DELETE ON krawl_ratings
    FOR EACH ROW
    EXECUTE FUNCTION update_user_creator_score();

-- =============================================================================
-- VIEWS
-- =============================================================================

-- View: Active gems (not soft-deleted)
-- =============================================================================
CREATE VIEW active_gems AS
SELECT * FROM gems WHERE deleted_at IS NULL;

-- View: Active users (not soft-deleted)
-- =============================================================================
CREATE VIEW active_users AS
SELECT * FROM users WHERE deleted_at IS NULL;

-- View: Public krawls with creator info
-- =============================================================================
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

-- =============================================================================
-- SEED DATA
-- =============================================================================

-- Insert default tags
-- =============================================================================
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

-- =============================================================================
-- END OF MIGRATION
-- =============================================================================
