-- =============================================================================
-- Refresh Tokens & Token Blacklist
-- Version: 5
-- Description: Creates tables for refresh token management and token blacklist
--              to support secure session management with token rotation and revocation
-- =============================================================================

-- Refresh Tokens Table (stores active refresh tokens for 30-day sessions)
-- =============================================================================
CREATE TABLE IF NOT EXISTS refresh_tokens (
    token_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    token_hash VARCHAR(255) NOT NULL UNIQUE, -- SHA-256 hash of token
    expires_at TIMESTAMPTZ NOT NULL,
    revoked_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    last_used_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS ix_refresh_tokens_user_id ON refresh_tokens(user_id);
CREATE INDEX IF NOT EXISTS ix_refresh_tokens_token_hash ON refresh_tokens(token_hash);
CREATE INDEX IF NOT EXISTS ix_refresh_tokens_expires_at ON refresh_tokens(expires_at);

-- Index for finding active tokens by user
CREATE INDEX IF NOT EXISTS ix_refresh_tokens_active 
    ON refresh_tokens(user_id, expires_at) 
    WHERE revoked_at IS NULL;

-- Token Blacklist Table (stores revoked access tokens until their natural expiry)
-- =============================================================================
CREATE TABLE IF NOT EXISTS token_blacklist (
    token_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    token_hash VARCHAR(255) NOT NULL UNIQUE, -- SHA-256 hash of access token
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    expires_at TIMESTAMPTZ NOT NULL, -- When the token naturally expires
    revoked_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    reason VARCHAR(50) -- 'logout', 'password_change', 'security_breach'
);

-- Indexes for fast blacklist checking and cleanup
CREATE INDEX IF NOT EXISTS ix_token_blacklist_token_hash ON token_blacklist(token_hash);
CREATE INDEX IF NOT EXISTS ix_token_blacklist_expires_at ON token_blacklist(expires_at);
CREATE INDEX IF NOT EXISTS ix_token_blacklist_user_id ON token_blacklist(user_id);

-- Comments for documentation
COMMENT ON TABLE refresh_tokens IS 'Stores refresh tokens for 30-day sessions with rotation support';
COMMENT ON TABLE token_blacklist IS 'Temporarily stores revoked access tokens until natural expiry';
COMMENT ON COLUMN refresh_tokens.token_hash IS 'SHA-256 hash of the refresh token for secure storage';
COMMENT ON COLUMN token_blacklist.token_hash IS 'SHA-256 hash of the revoked access token';
COMMENT ON COLUMN token_blacklist.reason IS 'Reason for revocation: logout, password_change, or security_breach';

