# Epic 6: Community Interaction & Quality

**Epic ID:** EPIC-6 | **Priority:** 🟡 High | **Status:** ⚪ To Do (0%)

---

## Goals
- Vouch for Gems
- Rate Gems and Krawls
- Report issues
- Calculate reputation scores
- Display creator tiers

## Key Tasks

### ⚪ CI-1: Vouch System
- Vouch API endpoint
- Vouch button UI
- Vouch count display
- One vouch per user per Gem

#### How to Implement
- Context: Let users endorse quality Gems and prevent duplicate vouches.
- Prerequisites:
  - `gem_vouches` table with PK `(gem_id, user_id)`
- Steps:
  1) Backend: `POST /gems/{id}/vouch` inserts row; idempotent (conflict ignored or 200).
  2) Backend: `DELETE /gems/{id}/vouch` removes row; update vouch_count trigger.
  3) Frontend: Toggle button showing current state; optimistic update; handle 401.
  4) Update detail drawer count live on success.
- References:
  - API: `docs/reference/api-endpoints.md#community-interactions`
  - Triggers: `docs/how-to/database-triggers.md#3-auto-update-gem-vouch-count`
- Acceptance Criteria (verify):
  - One vouch per user enforced; count accurate after toggle
- Test/Verification:
  - Integration tests for POST/DELETE; UI toggle e2e
- Artifacts:
  - PR: "community: implement vouch toggle and count sync"

### ⚪ CI-2: Rating System
- Rating API (1-5 stars)
- Rating UI component
- Average rating calculation
- Rating distribution display

#### How to Implement
- Context: Allow users to rate Gems and Krawls; keep stats up-to-date.
- Prerequisites:
  - Tables `gem_ratings`, `krawl_ratings`; rating triggers
- Steps:
  1) Backend: `POST /gems/{id}/rate` upsert (unique gem_id+user_id); same for krawls.
  2) Triggers update `average_rating` and `rating_count` on parent records.
  3) Frontend: star rating component (1–5), optional comment; throttle edits.
  4) Distribution UI (future): show histogram when `rating_count >= 5`.
- References:
  - API: `docs/reference/api-endpoints.md#community-interactions`
  - Triggers: `docs/how-to/database-triggers.md#2-auto-update-gem-rating-statistics`
- Acceptance Criteria (verify):
  - Re-rating updates prior rating; averages recalc immediately
- Test/Verification:
  - Unit for averages; e2e UI rate then verify displayed avg
- Artifacts:
  - PR: "ratings: add rating upsert and live average updates"

### ⚪ CI-3: Report Functionality
- Report API endpoint
- Report form UI
- Report types (closed, spam, etc.)
- Moderator review queue

#### How to Implement
- Context: Enable quality control through user-reported issues.
- Prerequisites:
  - `gem_reports` with status, reviewed fields
- Steps:
  1) Backend: `POST /gems/{id}/report` (
     `report_type`, `comment`); rate limit to prevent abuse; generic responses.
  2) Frontend: report modal with predefined types; require short reason.
  3) Admin: moderation list (status=pending), actions to set `reviewed_valid/invalid`.
  4) If valid and type=permanently_closed, set gem lifecycle to `closed`.
- References:
  - API: `docs/reference/api-endpoints.md#report-gem`
  - Security: `docs/reference/security-requirements.md#api-security-requirements`
- Acceptance Criteria (verify):
  - Reports created; moderation updates status; lifecycle changes on valid closure
- Test/Verification:
  - Seed reports; moderate; verify gem lifecycle
- Artifacts:
  - PR: "moderation: add report flow and admin queue"

### ⚪ CI-4: Reputation System
- Calculate creator score
- Assign reputation tiers
- Display badges
- Update based on ratings

#### How to Implement
- Context: Reward reliable creators and surface quality.
- Prerequisites:
  - Trigger `update_user_creator_score` active
- Steps:
  1) Calculate creator score as avg of their krawls with `rating_count >= 3` (trigger already provided).
  2) Map score to tiers: Newcomer (<3.0), Trail Maker (>=3.5 & 3+ krawls), Kanto Guide (>=4.2 & 10+ high-rated krawls).
  3) Frontend: show tier badges on profile and krawl cards.
  4) Refresh score async nightly (optional job) to avoid heavy load.
- References:
  - Triggers: `docs/how-to/database-triggers.md#5-auto-update-user-creator-score`
  - Glossary: `docs/reference/glossary.md#user-tiers-reputation-system`
- Acceptance Criteria (verify):
  - Score updates after ratings; tiers shown correctly
- Test/Verification:
  - Simulate ratings; verify tier transitions
- Artifacts:
  - PR: "reputation: display tiers and compute creator score"

### ⚪ CI-5: Gem Status Management
- Lifecycle status (open, closed, flagged)
- Approval status (pending, verified)
- Warning badges
- Automated stale detection

#### How to Implement
- Context: Communicate gem state and keep information fresh.
- Prerequisites:
  - Status fields on `gems` table
- Steps:
  1) Frontend: display badges (Open/Closed/Flagged, Pending/Verified) using tokens.
  2) Backend: endpoints to update lifecycle/approval for moderators.
  3) Stale detection (future job): flag entries untouched >12 months for review.
  4) Surface warnings in detail drawer; prompt community to verify.
- References:
  - Design: `docs/reference/design-components.md#badges--pills`
  - API: `docs/reference/api-endpoints.md#gems`
- Acceptance Criteria (verify):
  - Badges reflect current DB values; mod updates persist; stale flagged items visible
- Test/Verification:
  - Manual: change status; UI updates; badge colors accessible
- Artifacts:
  - PR: "moderation: status management and stale detection hooks"

## Progress: 0%

**Dependencies:**
- Requires: Epic 2 (Auth) 🟡, Epic 3 (Gems) 🟡, Epic 4 (Krawls) ⚪
- Blocks: None

**Related:** [User Stories - Community](../user-story.md#6-community-interaction)

---

*Last updated: 2025-10-31*

