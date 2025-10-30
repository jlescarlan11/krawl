# Epic 2: Authentication & Profile

> **Purpose:** Implement user authentication, authorization, and profile management for the Krawl MVP.

**Epic ID:** EPIC-2  
**Priority:** 🔴 Critical  
**Status:** 🟡 In Progress (65%)  
**Owner:** Backend & Frontend Developers

---

## Epic Goals

- ✅ User registration with email/password
- ✅ Login with JWT authentication
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
│  AU-5                  AU-3                AU-1 ✅   │
│  AU-6                  AU-4                AU-2 ✅   │
│  AU-7                                                 │
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

### 🟡 AU-3: Implement Frontend Registration UI

**Acceptance Criteria:**
- ✅ Registration form with validation
- ✅ Password strength indicator
- 🟡 Error message display
- ⚪ Success redirect to map view

#### How to Implement
- Context: Client-side registration flow consistent with API and security.
- Prerequisites:
  - API `/auth/register` live; `NEXT_PUBLIC_API_URL` set
- Steps:
  1) Create `/register` page with React Hook Form + Zod schema.
  2) Validate fields (email format, password length/complexity).
  3) POST to `/api/v1/auth/register`; handle 201/400/409.
  4) On success, save JWT (localStorage) and redirect `/`.
  5) Show inline errors and disable submit while loading.
- References:
  - Reference: `docs/reference/api-endpoints.md#authentication`
  - How-to: `docs/how-to/implement-security.md` (token storage)
  - Components: `docs/reference/design-components.md` (inputs/buttons)
- Acceptance Criteria (verify):
  - Redirect to map on success; error banners for 400/409
- Test/Verification:
  - Manual UI flow; component tests for validator
- Artifacts:
  - PR: "auth: add registration UI with validation and redirects"

**Status:** In Progress  
**Assignee:** Frontend Dev

---

### 🟡 AU-4: Implement Frontend Login UI

**Acceptance Criteria:**
- ✅ Login form with validation
- ✅ JWT token storage
- 🟡 "Remember me" functionality
- ⚪ Redirect to intended page after login

#### How to Implement
- Context: Provide secure login with token handling and UX polish.
- Prerequisites:
  - API `/auth/login` live
- Steps:
  1) Create `/login` form (email/password) with Zod validation.
  2) POST to `/api/v1/auth/login`; on 200 store token.
  3) Implement "Remember me" to persist token; otherwise memory-only.
  4) Redirect to last intended route (use query param or state).
  5) Show error messages for 401 invalid credentials.
- References:
  - How-to: `docs/how-to/implement-security.md`
  - Patterns: `docs/reference/design-patterns.md#interaction-patterns`
- Acceptance Criteria (verify):
  - 401 message visible; happy path redirects
- Test/Verification:
  - E2E test: invalid then valid login
- Artifacts:
  - PR: "auth: implement login UI with remember-me and redirects"

**Status:** In Progress  
**Assignee:** Frontend Dev

---

### ⚪ AU-5: Implement Profile View & Edit

**Description:** Display user profile and allow editing.

**Acceptance Criteria:**
- ⚪ `GET /api/v1/users/{username}` endpoint
- ⚪ `PUT /api/v1/users/me` endpoint
- ⚪ Profile page UI
- ⚪ Edit profile form
- ⚪ Creator score and tier display

#### How to Implement
- Context: Allow users to view and edit their profile and see creator metrics.
- Prerequisites:
  - Auth in place; tokens attached to requests
- Steps:
  1) Build `/profile` (self) and `/users/[username]` (public) pages.
  2) Fetch profile via GET; show username, bio, creator score/tier.
  3) Create edit form for bio/avatar; PUT `/users/me` on save.
  4) Handle 401 by redirecting to login; optimistic UI for edits.
  5) Display created gems/krawls counts (queries in `database-queries.md`).
- References:
  - Reference: `docs/reference/api-endpoints.md#user--profile`
  - Queries: `docs/reference/database-queries.md#user-content-queries`
- Acceptance Criteria (verify):
  - Profile loads and updates; creator metrics visible
- Test/Verification:
  - Manual: edit bio; reload shows persisted value
- Artifacts:
  - PR: "profile: implement view/edit and creator metrics"

**Status:** To Do

---

### ⚪ AU-6: Implement Password Reset Flow

**Description:** Allow users to reset forgotten passwords via email.

**Acceptance Criteria:**
- ⚪ Reset request endpoint
- ⚪ Email integration
- ⚪ Reset token validation
- ⚪ New password endpoint
- ⚪ Frontend reset flow

#### How to Implement
- Context: Provide secure account recovery.
- Prerequisites:
  - Email provider credentials (env only)
- Steps:
  1) Backend: `POST /auth/password/reset-request` accepts email; send token link.
  2) Backend: `POST /auth/password/reset` with token + new password; rotate creds.
  3) Frontend: `/forgot-password` form (email), `/reset-password?token=` form.
  4) Rate limit requests; generic responses to avoid user enumeration.
  5) Invalidate existing tokens on reset.
- References:
  - Security: `docs/reference/security-requirements.md` (rate limits)
- Acceptance Criteria (verify):
  - End-to-end reset works; tokens single-use, time-limited
- Test/Verification:
  - Integration tests mocking email sender
- Artifacts:
  - PR: "auth: add password reset flow (backend+frontend)"

**Status:** To Do

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

## Progress: 65%

- [x] Backend authentication infrastructure
- [x] JWT implementation
- [ ] Frontend auth UI (80% complete)
- [ ] Profile management
- [ ] Password reset
- [ ] Session refresh

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
- ⚪ Rate limiting on auth endpoints
- ⚪ Account lockout after failed attempts

See: [Security Requirements](../../reference/security-requirements.md)

---

## Related Documents

- [Security Implementation](../../how-to/implement-security.md)
- [API Documentation](../../reference/api-endpoints.md)
- [User Stories](../user-story.md) - US-1.x

---

*Epic maintained by Project Team • Last reviewed: 2025-10-31*

