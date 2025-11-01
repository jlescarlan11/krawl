# Password Reset Improvements

## Summary

Fixed the duplicate key constraint error and improved password reset functionality with:
1. **Token reuse** - Resends existing valid tokens instead of creating duplicates
2. **5-minute cooldown** - Prevents email spam while allowing resends when needed
3. **Spam folder notice** - Added helpful message to check spam/junk folders

## Problem Fixed

**Error**: `duplicate key value violates unique constraint "ux_password_reset_tokens_active_per_user"`

This occurred when users requested password reset multiple times quickly, causing the system to try creating multiple active tokens for the same user, which violates the database constraint that ensures only one active token per user.

## Solution

### 1. Token Reuse Logic
Instead of always creating a new token, the system now:
- **Checks for existing active tokens** first
- **Reuses the existing token** if it's still valid (not expired and not used)
- **Only creates a new token** if no active token exists

### 2. 5-Minute Cooldown Period
To prevent email spam and abuse:
- If a password reset was requested **within the last 5 minutes**, no new email is sent
- The existing token can still be used (it's just not resent)
- If a password reset is requested **after 5 minutes**, the existing token is resent
- Configurable via `APP_PASSWORD_RESET_RESEND_COOLDOWN_MINUTES` (default: 5)

### 3. Spam Folder Notice
Added helpful text in both password reset and registration emails:
- "**Can't find this email?** Please check your spam or junk folder. Some email providers may filter automated emails."

## Changes Made

### 1. Repository Enhancement
**File**: `PasswordResetTokenRepository.java`
- Added `findActiveTokenByUserId()` method to find existing active tokens

### 2. Service Logic Update
**File**: `PasswordResetServiceImpl.java`
- Enhanced `requestReset()` method with token reuse logic
- Added cooldown period checking
- Logs helpful messages for debugging

### 3. Email Template Update
**File**: `EmailTemplates.java`
- Added spam folder notice to password reset emails
- Added spam folder notice to registration emails

### 4. Configuration
**File**: `application.yaml`
- Added `app.password-reset.resend-cooldown-minutes` configuration
- Default: 5 minutes (configurable via environment variable)

## Behavior

### Scenario 1: First Request
1. User requests password reset
2. No active token exists → **Creates new token**
3. **Sends email** with reset link

### Scenario 2: Second Request Within 5 Minutes
1. User requests password reset again (within 5 minutes)
2. Active token exists → **Reuses existing token**
3. **No email sent** (cooldown active)
4. User can still use the original email link

### Scenario 3: Second Request After 5 Minutes
1. User requests password reset again (after 5 minutes)
2. Active token exists → **Reuses existing token**
3. **Sends email again** with same token (cooldown expired)

### Scenario 4: Token Expired
1. User requests password reset
2. Only expired tokens exist → **Creates new token**
3. **Sends email** with new reset link

## Configuration

### Environment Variables

```bash
# Password reset token expiry (default: 30 minutes)
APP_PASSWORD_RESET_EXPIRY_MINUTES=30

# Cooldown period before allowing resend (default: 5 minutes)
APP_PASSWORD_RESET_RESEND_COOLDOWN_MINUTES=5
```

### YAML Configuration

```yaml
app:
  password-reset:
    expiry-minutes: ${APP_PASSWORD_RESET_EXPIRY_MINUTES:30}
    resend-cooldown-minutes: ${APP_PASSWORD_RESET_RESEND_COOLDOWN_MINUTES:5}
```

## Benefits

1. ✅ **No more duplicate key errors** - Tokens are reused instead of duplicated
2. ✅ **Reduced email spam** - Cooldown prevents abuse
3. ✅ **Better user experience** - Users get helpful spam folder notice
4. ✅ **More efficient** - Reuses valid tokens instead of creating new ones
5. ✅ **Still allows resends** - After cooldown period, users can get emails resent

## Testing

To test the functionality:

1. **Test cooldown**:
   ```
   - Request password reset → Should send email
   - Request again immediately → Should NOT send email (cooldown)
   - Wait 5+ minutes → Request again → Should resend email
   ```

2. **Test token reuse**:
   ```
   - Request password reset → Get email with link
   - Request again after 5 minutes → Get same link (same token)
   - Both links should work
   ```

3. **Test new token creation**:
   ```
   - Request password reset → Get email
   - Wait 30+ minutes (for token to expire)
   - Request again → Get NEW token/link
   ```

## Logging

The service now logs helpful messages:
- `"Created new password reset token for user {}"`
- `"Password reset requested for user {} but within cooldown period ({} minutes). Existing token will be reused."`
- `"Password reset requested for user {}. Resending existing token (created {} minutes ago)."`

---

*Updated: 2024-12-19*

