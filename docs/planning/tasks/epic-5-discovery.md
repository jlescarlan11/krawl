# Epic 5: Discovery & Exploration

**Epic ID:** EPIC-5 | **Priority:** 🟡 High | **Status:** ⚪ To Do (0%)

---

## Goals
- Search Gems and Krawls
- Filter by category, tags, location
- Discover page with recommendations
- Browse popular/featured content

## Key Tasks

### ⚪ DE-1: Search Functionality
- Search API endpoint
- Full-text search for Gems/Krawls
- Autocomplete suggestions
- Search UI component

#### How to Implement
- Context: Enable users to quickly find relevant Gems and Krawls.
- Prerequisites:
  - Gems and Krawls endpoints live; indexes on name/description
- Steps:
  1) Backend: add `/search?q=` endpoint or reuse `/gems/search` and `/krawls` with `q` param.
  2) Implement ILIKE search on name/description; limit and offset; optional tag filter.
  3) Frontend: search input with 300ms debounce; empty state and recent searches.
  4) Autocomplete dropdown returning top 5 results per type (gem/krawl).
- References:
  - Queries: `docs/reference/database-queries.md#search-queries`
  - Patterns: `docs/reference/design-patterns.md#interaction-patterns`
  - Components: `docs/reference/design-components.md#search-input`
- Acceptance Criteria (verify):
  - Debounced calls; accurate results; keyboard navigation in suggestions
- Test/Verification:
  - Manual: type queries; measure network calls; verify highlighting
- Artifacts:
  - PR: "discovery: implement search API + autocomplete UI"

### ⚪ DE-2: Filter System
- Filter by tags
- Filter by distance
- Filter by rating
- Filter UI components

#### How to Implement
- Context: Allow narrowing search results and map listings.
- Prerequisites:
  - Tags taxonomy seeded; map bounds accessible
- Steps:
  1) Backend: support `tags`, `minRating`, `distance` filters in list endpoints.
  2) Frontend: filter panel with chips/toggles; sync to URL query params.
  3) Persist filters in local storage; show active filter count badge.
  4) Update results on change with debounce; reset button.
- References:
  - API: `docs/reference/api-endpoints.md#list-gems`
  - Tokens/Components: `docs/reference/design-components.md` (badges, pills)
- Acceptance Criteria (verify):
  - Filters reflected in URL; results match filters; reset clears all
- Test/Verification:
  - Manual: combine filters; paging; back/forward browser navigation
- Artifacts:
  - PR: "discovery: add filters (tags, distance, rating) with URL sync"

### ⚪ DE-3: Discover Page
- Featured Krawls section
- Nearby Krawls section
- Popular Krawls section
- Category browsing

#### How to Implement
- Context: Curated discovery surface for new and returning users.
- Prerequisites:
  - Krawl ratings and counts populated
- Steps:
  1) Layout sections: Featured, Nearby, Popular, Categories.
  2) Backend queries: top-rated Krawls (rating_count >= 5), nearby by location (optional fallback city center).
  3) Cards link to detail pages; lazy-load image thumbnails.
  4) Pagination or "Load more" for Popular.
- References:
  - Queries: `docs/reference/database-queries.md#top-rated-queries`
  - Patterns: `docs/reference/design-patterns.md#listgrid-view-pattern`
- Acceptance Criteria (verify):
  - Sections load independently; graceful fallback when empty
- Test/Verification:
  - Manual: toggle location permissions; verify nearby fallback
- Artifacts:
  - PR: "discovery: implement discover page sections and queries"

### ⚪ DE-4: Recommendation Engine
- Basic recommendations based on location
- Popular content algorithm
- Personalized suggestions (future)

#### How to Implement
- Context: Provide simple, high-signal recommendations for MVP.
- Prerequisites:
  - Usage data available (views, saves) optional; otherwise heuristics
- Steps:
  1) MVP algorithm: combine top-rated + nearby + recent popular (weighted).
  2) Expose `/recommendations` endpoint returning mixed list with reason tags.
  3) Frontend: Recommendation rail on discover; show "Because it's near you" labels.
  4) Future: personalize by tags from user's saves/ratings.
- References:
  - Explanation: `docs/explanation/target-users.md` (if available)
  - Queries: `docs/reference/database-queries.md#statistics-queries`
- Acceptance Criteria (verify):
  - Reason labels present; diversity across sections; fast response (<300ms cached)
- Test/Verification:
  - Seed data scenario tests; manual validation of mix
- Artifacts:
  - PR: "discovery: add simple recommendation engine and rail"

## Progress: 0%

**Dependencies:**
- Requires: Epic 3 (Gems) 🟡, Epic 4 (Krawls) ⚪
- Blocks: None

**Related:** [Sitemap - Discover](../../reference/site-structure.md#discover)

---

*Last updated: 2025-10-31*

