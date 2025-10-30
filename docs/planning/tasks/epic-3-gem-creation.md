# Epic 3: Gem Creation & Display

**Epic ID:** EPIC-3 | **Priority:** 🔴 Critical | **Status:** 🟡 In Progress (40%)

---

## Goals
- ✅ Pin Gems on map
- ✅ Duplicate detection
- 🟡 Map display with clustering
- 🟡 Gem detail view
- ⚪ Photo upload

## Key Tasks

### ✅ GC-1: Gem Creation API
- Endpoint: `POST /api/v1/gems`
- Duplicate detection logic
- Geospatial validation

#### How to Implement
- Context: Provide secure server-side creation of Gems with geospatial validation.
- Prerequisites:
  - Auth in place (access token required)
  - PostGIS enabled; tables per `database-schema.md`
- Steps:
  1) Create request DTO with validation (name 3–255, lat [-90..90], lng [-180..180], max 10 tags).
  2) Validate proximity: query `ST_DWithin(location, ST_MakePoint(:lng, :lat)::geography, :radius)`.
  3) If duplicates found, return 409 with candidate list (id, name, distance, vouchCount).
  4) If override flag present, proceed to insert; otherwise require client confirmation.
  5) Insert Gem; set `approval_status=pending`, `lifecycle_status=open`.
- References:
  - Reference: `docs/reference/api-endpoints.md#gems`
  - Queries: `docs/reference/database-queries.md#proximity-search`
  - Security: `docs/reference/security-requirements.md`
- Acceptance Criteria (verify):
  - 201 on success; 409 returns duplicates payload; geospatial constraints enforced
- Test/Verification:
  - Integration tests with nearby seed data; boundary lat/lng cases
- Artifacts:
  - PR: "gems: implement create with geospatial duplicate check"

### ✅ GC-2: Duplicate Warning System
- Check within 50m radius
- Return potential duplicates
- Allow override

#### How to Implement
- Context: Prevent clutter and consolidate community knowledge.
- Prerequisites:
  - GC-1 implemented (returns duplicates list)
- Steps:
  1) Frontend: after 409, show modal with candidates (name, distance, vouches, founder).
  2) Provide actions: "View on Map", "Add to This Gem" (contribute), "This is Different" (override).
  3) On override, retry POST with `overrideDuplicate=true`.
  4) Track reason text for audit.
- References:
  - Wireframe: `docs/design/wireframes/map-view.md`
  - Patterns: `docs/reference/design-patterns.md#interaction-patterns`
- Acceptance Criteria (verify):
  - UX matches wireframe; override path succeeds; contribution path navigates to existing Gem
- Test/Verification:
  - Manual flow; E2E test simulating 409 modal and override
- Artifacts:
  - PR: "gems: add duplicate warning UX and override flow"

### 🟡 GC-3: Map Display with MapLibre
- Interactive map component
- Gem markers
- Zoom-based filtering
- **In Progress**

#### How to Implement
- Context: Render map with Gem markers responsive to viewport and filters.
- Prerequisites:
  - MapLibre configured; API client ready
- Steps:
  1) Create `<MapLibreMap>` that accepts `gems`, `center`, `zoom` props.
  2) Fetch gems in bounds: `GET /gems?neLat&neLng&swLat&swLng&zoomLevel` on move/zoom (debounced).
  3) Render markers with click handler to open Gem detail drawer.
  4) Persist map state to URL (center/zoom) for shareability.
  5) Handle loading/error states with skeletons and toasts.
- References:
  - API: `docs/reference/api-endpoints.md#list-gems`
  - Wireframe: `docs/design/wireframes/map-view.md`
  - Components: `docs/reference/design-components.md` (cards, drawer)
- Acceptance Criteria (verify):
  - Smooth panning; markers refresh within 300ms debounce; state in URL
- Test/Verification:
  - Manual: pan/zoom; verify network calls and marker updates
- Artifacts:
  - PR: "map: implement viewport-based gem fetching and markers"

### 🟡 GC-4: Gem Clustering
- Cluster nearby gems
- Dynamic cluster sizing
- **In Progress**

#### How to Implement
- Context: Improve performance and readability at low zoom levels.
- Prerequisites:
  - GC-3 map in place
- Steps:
  1) Integrate Supercluster (or MapLibre clustering) on the client with current bounds.
  2) Replace individual markers with cluster markers; show count.
  3) On cluster click, zoom into bounds of cluster.
  4) Style clusters by size tiers (e.g., 10+, 50+, 100+).
- References:
  - Patterns: `docs/reference/design-patterns.md#performance-patterns`
- Acceptance Criteria (verify):
  - Clusters appear at low zoom; expand into markers on zoom-in
- Test/Verification:
  - Manual with synthetic data; performance check on mid-range devices
- Artifacts:
  - PR: "map: add clustering with animated expansion"

### ⚪ GC-5: Gem Detail View
- Modal/drawer component
- Display all gem data
- Action buttons

#### How to Implement
- Context: Present Gem information and primary actions in a focused view.
- Prerequisites:
  - Map and markers implemented
- Steps:
  1) Create bottom drawer (mobile) / side panel (desktop) per patterns.
  2) Fetch Gem details on open: name, desc, photos, tags, vouches, rating, founder.
  3) Actions: Vouch, Rate, Add Photo, Report; disable if unauthenticated.
  4) Show status badges (approval/lifecycle) using design tokens.
  5) Link to share URL and copy.
- References:
  - API: `docs/reference/api-endpoints.md#get-gem-details`
  - Components: `docs/reference/design-components.md` (drawer, badges, cards)
  - Patterns: `docs/reference/design-patterns.md#detail-view-pattern`
- Acceptance Criteria (verify):
  - Drawer matches wireframe; actions invoke correct endpoints; accessibility ok
- Test/Verification:
  - Keyboard navigation; screen reader labels; action success toasts
- Artifacts:
  - PR: "gems: implement detail drawer with actions"

### ⚪ GC-6: Photo Upload
- Image upload to Cloudinary
- Thumbnail generation
- Gallery display

#### How to Implement
- Context: Allow community to contribute visual content to Gems.
- Prerequisites:
  - Cloudinary (or provider) env vars set (never commit secrets)
- Steps:
  1) Backend: sign upload requests server-side; store `photo_url`, `is_featured`.
  2) Frontend: file input with preview; call upload; handle progress states.
  3) Generate/consume thumbnails; lazy-load gallery images.
  4) Add featured image selector; update Gem featured photo.
- References:
  - API: `docs/reference/api-endpoints.md#storage-health`
  - Security: `docs/reference/security-requirements.md#encryption-standards`
  - Patterns: `docs/reference/design-patterns.md#performance-patterns`
- Acceptance Criteria (verify):
  - Upload succeeds; thumbnails appear; featured image persists
- Test/Verification:
  - Manual upload with 3 images; offline retry behavior verified
- Artifacts:
  - PR: "gems: add photo upload, thumbnails, and gallery"

## Progress: 40%

**Dependencies:**
- Requires: Epic 1 (Setup) ✅, Epic 2 (Auth) 🟡
- Blocks: Epic 4 (Krawls), Epic 5 (Discovery)

**Related:** [API Docs - Gems](../../reference/api-endpoints.md#2-gems)

---

*Last updated: 2025-10-31*

