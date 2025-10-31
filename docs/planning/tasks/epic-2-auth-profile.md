# Epic 2: Authentication & Profile

> **Purpose:** Implement user authentication, authorization, and profile management for the Krawl MVP.

**Epic ID:** EPIC-2  
**Priority:** 🔴 Critical  
**Status:** 🟢 Mostly Complete (90%)  
**Owner:** Backend & Frontend Developers

---

## Epic Goals

- ✅ User registration with email/password
- ✅ Login with JWT authentication
- ✅ Frontend login UI with redirect and remember-me
- 🟡 Profile viewing and editing
- ⚪ Session management and refresh tokens
- ⚪ Password reset flow

---

## Task Board

```
┌──────────────────────────────────────────────────────┐
│  To Do              In Progress            Done      │
├──────────────────────────────────────────────────────┤
│                                                       │
│                      AU-3                AU-1 ✅   │
│                                          AU-2 ✅        │
│  AU-7                                    AU-4 ✅        │
│                                           AU-5 ✅       │
│                                           AU-6 ✅       │
│                                                       │
└──────────────────────────────────────────────────────┘
```

---

## Key Tasks

### ✅ AU-1: Implement Backend User Registration

**Acceptance Criteria:**
- ✅ `POST /api/v1/auth/register` endpoint created
- ✅ Password hashing with BCrypt (cost factor 12)
- ✅ Email/username uniqueness validation
- ✅ Returns JWT token on success

#### How to Implement
- Context: Provide secure user onboarding aligned with security standards.
- Prerequisites:
  - DB schema migrations applied
  - `JWT_SECRET` configured
- Steps:
  1) Create request DTO with validation (username/email/password).
  2) Validate uniqueness on username/email (service layer + DB unique indexes).
  3) Hash password with BCrypt cost 12.
  4) Persist user and generate JWT with subject=userId.
  5) Return 201 with user info + token (no password fields).
- References:
  - Reference: `docs/reference/api-endpoints.md#authentication`
  - How-to: `docs/how-to/implement-security.md` (JWT)
  - Reference: `docs/reference/security-requirements.md`
- Acceptance Criteria (verify):
  - 201 on success; 400 on invalid; 409 on duplicate
- Test/Verification:
  - Unit tests for hashing and validator; integration test for 201/409
- Artifacts:
  - PR: "auth: add registration endpoint with BCrypt and JWT"

**Status:** Done

---

### ✅ AU-2: Implement Backend User Login

**Acceptance Criteria:**
- ✅ `POST /api/v1/auth/login` endpoint created
- ✅ JWT token generation
- ✅ Password verification
- ✅ Error handling for invalid credentials

#### How to Implement
- Context: Authenticate existing users and issue access tokens.
- Prerequisites:
  - Registration implemented (AU-1)
- Steps:
  1) Accept email/password; validate payload.
  2) Look up user by email; compare password via BCrypt.
  3) Issue JWT with 24h exp; include minimal claims.
  4) Return 200 with token; on failure, 401 generic message.
- References:
  - Reference: `docs/reference/api-endpoints.md#authentication`
  - How-to: `docs/how-to/implement-security.md`
- Acceptance Criteria (verify):
  - 200 + token on valid credentials; 401 on invalid
- Test/Verification:
  - Integration tests for valid/invalid creds; token expiry parsing
- Artifacts:
  - PR: "auth: implement login endpoint"

**Status:** Done

---

### ✅ AU-3: Implement Frontend Registration UI

**Acceptance Criteria:**
- ✅ Registration form with validation (React Hook Form + Zod)
- ✅ Password strength indicator
- ✅ Error message display (inline + API toasts for 400/409)
- ✅ Success redirect to map view

#### Implementation Summary
- Built `/signup` page using React Hook Form + Zod (`signupSchema`).
- Client validation mirrors backend policy (min 8, upper/lower/number; confirm match; username regex; terms required).
- Added `PasswordStrength` component (lightweight score + bar + label).
- API integration via `lib/auth.register` → `POST /api/v1/auth/register` using `apiFetch`.
- Error handling: inline field errors + toast via `apiFetch` on 400/409.
- On success: persist JWT and user to localStorage (`AuthContext.setSession(..., true)`) and redirect to `/` (map).

#### Verification
- Manual happy path: account created → token stored → redirected to `/` map view.
- Manual failure paths: invalid input shows inline errors; duplicate email emits error toast.

#### Artifacts
- PR title: `feat(auth): add registration UI with validation and redirects`

**Status:** Done  
**Assignee:** Frontend Dev

---

### ✅ AU-4: Implement Frontend Login UI

**Acceptance Criteria:**
- ✅ Login form with validation
- ✅ JWT token storage
- ✅ "Remember me" functionality
- ✅ Redirect to intended page after login

#### Implementation Summary
- Built `/login` page using Zod validation (`loginSchema`) with reusable `makeZodValidator` adapter.
- Client validation enforces password requirements (min 8, upper/lower/number/special).
- API integration via `lib/auth.login` → `POST /api/v1/auth/login` using `apiFetch`.
- "Remember me" implemented: checked = localStorage (persists), unchecked = memory-only (no storage).
- Redirect handling: server-side parsing of `redirect` query param in page component, passed as prop to avoid Suspense boundary requirement.
- Error handling: 401 invalid credentials shown via toast (handled by `apiFetch`/`ApiError`).
- On success: persist JWT and user based on remember flag and redirect to intended page (or `/`).

#### Verification
- Manual happy path: login with remember → token stored in localStorage; without remember → token in memory only; redirects to intended page.
- Manual failure paths: invalid credentials show 401 toast; invalid form shows inline errors.
- Build verification: no `useSearchParams()` Suspense errors; prerenders successfully.

#### Artifacts
- PR title: `feat(auth): implement login UI with remember-me and redirects`

**Status:** Done  
**Assignee:** Frontend Dev

---

### ✅ AU-5: Implement Profile View & Edit

**Description:** Display user profile and allow editing.

**Acceptance Criteria:**
- ✅ `GET /api/v1/users/{username}` endpoint (public profile with counts)
- ✅ `PUT /api/v1/users/me` endpoint (edit username and bio)
- ✅ Profile page UI (self and public)
- ✅ Edit profile via modal
- ✅ Creator score and tier banner (consistent card style)
- ✅ Display created gems/krawls counts

#### Implementation Summary
- Built `/profile` (self) and `/users/[username]` (public) pages
- Public profiles permitted via security config; self-profile requires auth
- Added `UserProfileResponse` with `gemsCreated` and `krawlsCreated`; wired via `UserStatsService`
- Self-profile `UserResponse` now includes counts; controller populates via `UserStatsService`
- Frontend `TierScoreBanner` for creator score/tier (card style, accessible, white text)
- Frontend `ProfileStats` now card-style for Gems and Krawls (consistent spacing/padding)
- Edit profile modal to update username and bio
- `AuthContext` session persistence fixed (sessionStorage for non-remember, localStorage for remember)
- Sidebar now reflects logged-in user (initials, username/email, profile link) instead of Guest
- Header alignment unified with `PageHeaderBar`; map/profile/public pages consistent
- References:
  - Reference: `docs/reference/api-endpoints.md#user--profile`
  - Queries: `docs/reference/database-queries.md#user-content-queries`
- Acceptance Criteria (verify):
  - Profile loads and updates; creator metrics visible
- Test/Verification:
  - Manual: edit bio; reload shows persisted value
- Artifacts:
  - PR: "profile: implement view/edit and creator metrics"

**Status:** Done

---

### ✅ AU-6: Implement Password Reset Flow

**Description:** Allow users to reset forgotten passwords via email.

**Acceptance Criteria:**
- ✅ Reset request endpoint
- ✅ Email integration
- ✅ Reset token validation
- ✅ New password endpoint
- ✅ Frontend reset flow

#### Implementation Summary
- Backend endpoints:
  - `POST /api/v1/auth/password/reset-request` and `POST /api/v1/auth/password/reset` in `AuthPasswordController`
  - `PasswordResetServiceImpl` issues single-use tokens, emails link, validates/consumes token, rotates password
  - Rate limiting for password reset endpoints via `AuthPasswordRateLimitFilter` (Bucket4j 5 per 15m/IP)
- Frontend:
  - `/forgot-password` request page and `/reset-password` (query and path token variants) implemented
  - `lib/auth.forgotPassword` and `lib/auth.resetPassword` integrated
- Email integration:
  - `EmailSender` used to send reset links (`app.frontend-url` + pretty path)
- Tokens:
  - 30-minute expiry by default; invalidates existing tokens on new request and after successful reset

#### Verification
- Manual: request link returns 200 (generic); email sender mocked in tests; reset with valid token updates password and redirects

**Status:** Done

---

### ⚪ AU-7: Implement Session Management

**Description:** Handle token refresh and session expiration.

**Acceptance Criteria:**
- ⚪ Refresh token endpoint
- ⚪ Automatic token refresh
- ⚪ Logout functionality
- ⚪ Token blacklist for revocation

#### How to Implement
- Context: Maintain user sessions with refresh tokens and secure logout.
- Prerequisites:
  - JWT provider, token store/blacklist
- Steps:
  1) Backend: issue access (24h) + refresh (30d) token (HttpOnly cookie for refresh).
  2) Add `/auth/refresh` to mint new access token if refresh valid.
  3) Frontend: auto-refresh before expiry; intercept 401 to retry once.
  4) Implement `/auth/logout` to revoke/blacklist tokens and clear cookies.
  5) Force logout on password change.
- References:
  - How-to: `docs/how-to/implement-security.md#2-implement-jwt-authentication`
  - Security: `docs/reference/security-requirements.md#session-management-standards`
- Acceptance Criteria (verify):
  - Silent refresh works; explicit logout revokes tokens
- Test/Verification:
  - E2E: token-expiry simulation; logout flow
- Artifacts:
  - PR: "auth: implement refresh and logout (frontend+backend)"

**Status:** To Do

---

## Progress: 95%

- [x] Backend authentication infrastructure
- [x] JWT implementation
- [x] Frontend auth UI (registration + login complete)
- [x] Profile management (view/edit, counts, tier banner)
- [x] Password reset
- [ ] Session refresh

---

### ✅ AU-8: Email-Verified Registration (Auto-login + CAPTCHA)

Description: Users start sign-up with username + email. We email a link to complete registration by setting a password. CAPTCHA is required on request. On completion, user is auto-logged-in.

Implementation Summary
- Backend
  - Endpoints: `POST /api/v1/auth/register/request`, `POST /api/v1/auth/register/complete`
  - Table: `registration_tokens` with single active token per email/username
  - Service: token issuance/verification; creates user transactionally
  - Auto-login: returns `AuthResponse { token, type, userId, email, username }`
  - Rate limiting: same filter covers register request/complete
  - CAPTCHA: pluggable (hCaptcha default, reCAPTCHA supported)
- Frontend
  - Pages: `/register-start` (username, email, hCaptcha), `/register/complete/[token]` (set password)
  - Lib: `registerRequest`, `registerComplete`

Configuration
- Backend env
  - `APP_REGISTRATION_EXPIRY_MINUTES=60`
  - `CAPTCHA_PROVIDER=hcaptcha` | `recaptcha`
  - `CAPTCHA_SECRET=<server-secret-key>`
- Frontend env
  - `NEXT_PUBLIC_HCAPTCHA_SITEKEY=<site-key>` (or `NEXT_PUBLIC_RECAPTCHA_SITEKEY` if switching)

Status: Done

#### UI update
- Default signup route is `/signup` and collects username + email, sends verification via Invisible reCAPTCHA.
- Legacy `/register` redirects to `/signup`.
- Password completion page uses the same helper text and `PasswordStrength` indicator as signup, with show/hide toggles.

---

## Dependencies

**Requires:**
- Epic 1 (Project Setup) - ✅ Complete

**Blocks:**
- Epic 3 (Gem Creation) - Needs auth
- Epic 4 (Krawl Creation) - Needs auth

---

## Security Considerations

- ✅ Passwords hashed with BCrypt
- ✅ JWT secrets in environment variables
- ✅ HTTPS only in production
- ✅ Rate limiting on password reset endpoints
- ⚪ Account lockout after failed attempts

See: [Security Requirements](../../reference/security-requirements.md)

---

## Related Documents

- [Security Implementation](../../how-to/implement-security.md)
- [API Documentation](../../reference/api-endpoints.md)
- [User Stories](../user-story.md) - US-1.x

---

*Epic maintained by Project Team • Last reviewed: 2025-10-31*

