# Epic 4: Krawl Creation & Display

**Epic ID:** EPIC-4 | **Priority:** 🔴 Critical | **Status:** ⚪ To Do (0%)

---

## Goals
- Create Krawls (trails)
- Add Gems to Krawls
- Reorder stops
- Add notes and secrets
- Display Krawl details

## Key Tasks

### ⚪ KC-1: Krawl Creation API
- Endpoint: `POST /api/v1/krawls`
- Create empty Krawl
- Set visibility (public/friends_only)

#### How to Implement
- Context: Backend support for creating curated trails with ordered stops.
- Prerequisites:
  - Auth required; tables `krawls`, `krawl_items` exist
- Steps:
  1) Define request: title (req), description (opt), visibility, optional `krawlItems[]` with `{gemId, stepOrder, creatorNote, lokalSecret}`.
  2) Validate title (<=255), visibility in {public,friends_only}.
  3) Insert Krawl with `creator_id` from token.
  4) If items provided, insert into `krawl_items` enforcing unique `(krawl_id, step_order)` and `(krawl_id, gem_id)`.
  5) Return 201 with summary (id, title, stopCount, createdAt).
- References:
  - Reference: `docs/reference/api-endpoints.md#create-krawl`
  - Schema: `docs/reference/database-schema.md#10-krawl_items-table`
  - Queries: `docs/reference/database-queries.md#krawl-detail-queries`
- Acceptance Criteria (verify):
  - 201 on success; constraints enforced; invalid visibility rejected
- Test/Verification:
  - Integration: create with and without items; uniqueness violations
- Artifacts:
  - PR: "krawls: add create endpoint with items validation"

### ⚪ KC-2: Krawl Builder UI
- Trail builder interface
- Add/remove Gems
- Drag-and-drop reordering
- Save/publish flow

#### How to Implement
- Context: Provide an intuitive interface for composing Krawls.
- Prerequisites:
  - Map view and Gems available (Epic 3)
- Steps:
  1) Create `/krawls/new` builder page with two panes: map and stops list.
  2) Add Gem via search or map click; append to list with default `stepOrder`.
  3) Implement drag-and-drop reordering; update `stepOrder` on drop.
  4) Provide fields for title, description, visibility; autosave draft to local storage.
  5) Save/Publish: POST to `/krawls` (draft save), then mark published state.
- References:
  - Wireframes: `docs/design/wireframes/README.md`
  - Patterns: `docs/reference/design-patterns.md#form-layout-pattern`
  - Components: `docs/reference/design-components.md` (cards, modals, buttons)
- Acceptance Criteria (verify):
  - Reordering persists; draft recoverable after refresh; publish returns new Krawl id
- Test/Verification:
  - Manual reorder; reload draft; publish and navigate to detail page
- Artifacts:
  - PR: "krawls: implement builder UI with DnD and autosave"

### ⚪ KC-3: Krawl Detail Page
- Display Krawl info
- Show ordered stops
- Map overview with route
- Action buttons (Start, Download)

#### How to Implement
- Context: Public-facing Krawl page for viewing and following the trail.
- Prerequisites:
  - API details endpoint
- Steps:
  1) Create `/krawls/[id]` that fetches Krawl + ordered stops (join with Gems).
  2) Show overview: title, description, creator, rating, stop count, estimated distance (optional extra query).
  3) Render map with polyline connecting stops in order; numbered markers.
  4) Actions: Start Krawl Mode (Epic 7), Save, Download for Offline.
- References:
  - Queries: `docs/reference/database-queries.md#krawl-detail-queries`
  - Patterns: `docs/reference/design-patterns.md#layout-patterns`
- Acceptance Criteria (verify):
  - Stops displayed in correct order; map route correct; actions visible
- Test/Verification:
  - Manual verify order correctness; save and download buttons enabled
- Artifacts:
  - PR: "krawls: add detail page with map route and actions"

### ⚪ KC-4: Notes & Secrets
- Add creator notes per stop
- Add "Lokal Secrets"
- Rich text editor (optional)

#### How to Implement
- Context: Add contextual guidance and insider tips to each stop.
- Prerequisites:
  - Builder UI (KC-2)
- Steps:
  1) For each stop, provide fields: `creatorNote` (text), `lokalSecret` (optional, sensitive).
  2) Validate length; sanitize HTML if rich text is enabled (DOMPurify).
  3) Persist on save/publish; display in detail page with proper labeling.
  4) Consider privacy: Lokal Secrets are visible to all followers; avoid PII.
- References:
  - Glossary: `docs/reference/glossary.md#krawl-specific-terms`
  - Security: `docs/how-to/implement-security.md#5-implement-xss-prevention`
- Acceptance Criteria (verify):
  - Notes and secrets persist; sanitized; show in Krawl detail and Krawl Mode
- Test/Verification:
  - Attempt XSS payload; verify sanitized output; UI renders correctly
- Artifacts:
  - PR: "krawls: add per-stop notes and lokal secrets with sanitization"

### ⚪ KC-5: Edit Krawl
- Edit endpoint
- Update UI
- Version history (future)

#### How to Implement
- Context: Allow creators to revise title, visibility, and stops safely.
- Prerequisites:
  - Create and detail flows complete
- Steps:
  1) Backend: `PUT /krawls/{id}`; authorize creator only; partial updates allowed.
  2) Frontend: Add "Edit" action from detail page to open builder with existing data.
  3) Apply optimistic updates; handle conflicts via 412 (if implementing ETag versioning).
  4) Future: store change history for versioning.
- References:
  - API: `docs/reference/api-endpoints.md#krawls`
  - Patterns: `docs/reference/design-patterns.md#interaction-patterns`
- Acceptance Criteria (verify):
  - Only creator can edit; changes persist; ordering constraints maintained
- Test/Verification:
  - Attempt edit as non-creator (403); edit as creator (200)
- Artifacts:
  - PR: "krawls: implement edit endpoint and builder edit mode"

## Progress: 0%

**Dependencies:**
- Requires: Epic 2 (Auth) 🟡, Epic 3 (Gems) 🟡
- Blocks: Epic 5 (Discovery), Epic 7 (Krawl Mode)

**Related:** [API Docs - Krawls](../../reference/api-endpoints.md#3-krawls)

---

*Last updated: 2025-10-31*

