-- =============================================================================
-- Registration Tokens
-- Version: 4
-- Description: Creates table for email-verified registration tokens with single active token per email/username
-- =============================================================================

CREATE TABLE IF NOT EXISTS registration_tokens (
    token_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL,
    username VARCHAR(50) NOT NULL,
    token VARCHAR(255) NOT NULL UNIQUE,
    expires_at TIMESTAMPTZ NOT NULL,
    used_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Helpful indexes for lookup
CREATE INDEX IF NOT EXISTS ix_registration_tokens_email ON registration_tokens(email);
CREATE INDEX IF NOT EXISTS ix_registration_tokens_username ON registration_tokens(username);

-- Ensure only one unused token per email
CREATE UNIQUE INDEX IF NOT EXISTS ux_registration_tokens_active_email
    ON registration_tokens(email)
    WHERE used_at IS NULL;

-- Ensure only one unused token per username
CREATE UNIQUE INDEX IF NOT EXISTS ux_registration_tokens_active_username
    ON registration_tokens(username)
    WHERE used_at IS NULL;


