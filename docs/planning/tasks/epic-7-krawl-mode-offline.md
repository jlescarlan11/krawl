# Epic 7: Krawl Mode & Offline

**Epic ID:** EPIC-7 | **Priority:** 🔴 Critical (Core Differentiator) | **Status:** ⚪ To Do (0%)

---

## Goals
- Interactive Krawl Mode navigation
- GPS integration
- Location-based triggers
- Offline data caching
- Offline map tiles
- Sync mechanism

## Key Tasks

### ⚪ KM-1: Krawl Mode UI
- Krawl Mode interface
- Progress indicator (Stop X of Y)
- Navigation instructions
- Exit Krawl button

#### How to Implement
- Context: Guided, step-by-step navigation through the Krawl.
- Prerequisites:
  - Krawl detail page in place; stops ordered
- Steps:
  1) Create `/krawls/[id]/mode` full-screen view with map and bottom panel.
  2) Show current stop (X of Y), distance to next, and instructions.
  3) Provide controls: Next/Previous, Exit; respect device safe areas.
  4) Persist progress state to local storage for resume.
- References:
  - Patterns: `docs/reference/design-patterns.md#interaction-patterns`
  - Tokens: `docs/reference/design-tokens.md`
- Acceptance Criteria (verify):
  - UI responsive; progress persists across reloads
- Test/Verification:
  - Manual: navigate across stops; reload continues at same stop
- Artifacts:
  - PR: "krawl-mode: implement UI shell with progress"

### ⚪ KM-2: GPS Integration
- Request location permissions
- Real-time location tracking
- Proximity detection (arrival at stops)
- Navigation guidance

#### How to Implement
- Context: Use geolocation to guide users and auto-advance on arrival.
- Prerequisites:
  - HTTPS locally (or localhost exception) for geolocation API
- Steps:
  1) Request permission; handle denied state with manual advance.
  2) Watch position with suitable `enableHighAccuracy` and throttle.
  3) Compute distance to current stop; arrival threshold e.g., 30–50m.
  4) Show guidance: arrow/compass or heading; update every tick.
- References:
  - Patterns: `docs/reference/design-patterns.md#performance-patterns`
- Acceptance Criteria (verify):
  - Arrival detected reliably; denied permission still usable
- Test/Verification:
  - Simulate GPS in devtools; test thresholds
- Artifacts:
  - PR: "krawl-mode: add GPS tracking and proximity detection"

### ⚪ KM-3: Stop Detail Cards
- Auto-display on arrival
- Show creator notes
- Show Lokal Secrets
- Display photos
- "Check off" button

#### How to Implement
- Context: Present stop content when user arrives.
- Prerequisites:
  - KM-2 proximity detection
- Steps:
  1) On arrival, reveal bottom sheet with stop content.
  2) Display creator notes and Lokal Secrets; sanitize any rich text.
  3) Show gallery; lazy-load images.
  4) Provide "I'm here / Next" to advance; mark complete.
- References:
  - Security: `docs/how-to/implement-security.md#5-implement-xss-prevention`
  - Components: `docs/reference/design-components.md#modals--overlays`
- Acceptance Criteria (verify):
  - Auto-open on arrival; content accessible; next advances
- Test/Verification:
  - Manual arrival simulation; keyboard navigation
- Artifacts:
  - PR: "krawl-mode: add stop detail sheet and complete control"

### ⚪ KM-4: Download Krawl for Offline
- Download API endpoint
- Package Krawl data
- Cache map tiles
- Store in IndexedDB
- Progress indicator

#### How to Implement
- Context: Allow offline completion of a Krawl.
- Prerequisites:
  - Service Worker scaffolding; IndexedDB helpers
- Steps:
  1) Backend: `/krawls/{id}/download` bundles krawl metadata and stops.
  2) Frontend: Download data; store in IndexedDB (`krawls`, `stops`).
  3) Pre-cache map tiles for stop areas (radius); show progress bar.
  4) Provide "Remove download" action to free space.
- References:
  - Patterns: `docs/reference/design-patterns.md#performance-patterns`
- Acceptance Criteria (verify):
  - Krawl playable fully offline after download
- Test/Verification:
  - Devtools offline mode; storage usage within quota
- Artifacts:
  - PR: "offline: add krawl download with tiles precaching"

### ⚪ KM-5: Offline Mode
- Service Worker caching
- Offline map rendering
- Cached Krawl data access
- GPS works offline
- "Offline" indicator

#### How to Implement
- Context: Ensure robust offline experience.
- Prerequisites:
  - KM-4 data downloaded
- Steps:
  1) SW: cache-first strategy for tiles; stale-while-revalidate for images.
  2) Use cached Krawl data when network absent; show Offline badge.
  3) Disable network-only actions; queue them for sync.
- References:
  - Tutorial: `docs/tutorials/getting-started.md` (PWA section)
  - Patterns: `docs/reference/design-patterns.md#performance-patterns`
- Acceptance Criteria (verify):
  - App remains usable; clear offline indicator states
- Test/Verification:
  - Toggle offline; verify no network errors block navigation
- Artifacts:
  - PR: "offline: implement robust offline mode behaviors"

### ⚪ KM-6: Sync Mechanism
- Queue offline actions
- Sync when online
- Conflict resolution
- Sync status indicator

#### How to Implement
- Context: Replay mutations made offline safely when connectivity returns.
- Prerequisites:
  - Background sync or app resume detection
- Steps:
  1) Queue writes (e.g., vouch, rating, progress) in IndexedDB with intent and payload.
  2) On regain online, process queue sequentially; handle 401 retries after refresh.
  3) Conflict resolution: last-write-wins for simple items; flag for manual review otherwise.
  4) UI: small syncing indicator and error toast for failures.
- References:
  - Security: `docs/reference/security-requirements.md#session-management-standards`
- Acceptance Criteria (verify):
  - No data loss; user informed of sync state; errors recoverable
- Test/Verification:
  - Simulate offline actions; reconnect; verify server state matches
- Artifacts:
  - PR: "offline: add action queue and sync with conflict handling"

## Progress: 0%

**Dependencies:**
- Requires: Epic 4 (Krawls) ⚪
- Blocks: MVP Launch

**Critical Path:** This epic is essential for MVP and differentiates Krawl from competitors.

**Technical Challenges:**
- Map tile caching strategy
- IndexedDB quota management
- GPS accuracy and battery usage
- Sync conflict resolution

**Related:**
- [PWA Architecture](../../explanation/architecture-overview.md)
- [Offline Strategy](../../how-to/implement-offline.md) *(to be created)*

---

*Last updated: 2025-10-31*

