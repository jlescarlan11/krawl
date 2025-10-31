-- =============================================================================
-- Password Reset Tokens
-- Version: 2
-- Description: Creates table for password reset tokens with single active token per user
-- =============================================================================

CREATE TABLE IF NOT EXISTS password_reset_tokens (
    token_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(user_id) ON DELETE CASCADE,
    token VARCHAR(255) NOT NULL UNIQUE,
    expires_at TIMESTAMPTZ NOT NULL,
    used_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Mark expired unused tokens as non-active so the unique index can be created
UPDATE password_reset_tokens
SET used_at = COALESCE(used_at, NOW())
WHERE used_at IS NULL AND expires_at <= NOW();

-- Ensure only one unused token per user (time condition removed to keep predicate immutable)
CREATE UNIQUE INDEX IF NOT EXISTS ux_password_reset_tokens_active_per_user
    ON password_reset_tokens(user_id)
    WHERE used_at IS NULL;


