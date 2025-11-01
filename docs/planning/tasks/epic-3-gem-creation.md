# Epic 3: Gem Creation & Display

**Epic ID:** EPIC-3 | **Priority:** 🔴 Critical | **Status:** 🟡 In Progress (40%)

---

## Epic Goals

- ✅ Basic Gem creation API (GC-1)
- 🟡 Duplicate detection & warning UX (GC-2)
- 🟡 Map display with clustering (GC-3, GC-4)
- ⚪ Gem detail view (GC-5)
- ⚪ Photo upload (GC-6)

---

## Key Tasks

### ✅ GC-1: Gem Creation API

**Status:** ✅ Complete (Basic) | **Note:** Duplicate detection not yet implemented

**Endpoint:** `POST /api/v1/gems` 🔒

#### How to Implement

**Context:** Server-side Gem creation with geospatial validation and duplicate prevention.

**Prerequisites:**
- ✅ Epic 2 (Auth) completed - JWT token required
- ✅ PostGIS extension enabled in PostgreSQL
- ✅ Database schema applied (`docs/reference/database-schema.md`)
- ✅ `GEM_DUPLICATE_RADIUS_METERS` env var set (default: 50m)

**Backend Steps:**

1. **Request DTO Validation** (`GemCreateRequest.java`):
   - `name`: String, 3–255 chars, not blank
   - `description`: String, optional, max 2000 chars
   - `latitude`: Double, range [-90, 90], not null
   - `longitude`: Double, range [-180, 180], not null
   - `tags`: List<String>, max 10 items, each 1–100 chars

2. **Geospatial Validation**:
   - Verify coordinates are within valid ranges (already in DTO)
   - Transform lat/lng to PostGIS `GEOGRAPHY(Point, 4326)` using `ST_MakePoint(lng, lat)::geography`

3. **Duplicate Detection Query** (Implement in `GemRepository.java`):
   ```java
   @Query(value = """
       SELECT g.*, 
              ST_Distance(g.location, ST_MakePoint(:lng, :lat)::geography) as distance_meters
       FROM gems g
       WHERE ST_DWithin(g.location, ST_MakePoint(:lng, :lat)::geography, :radius)
         AND g.deleted_at IS NULL
       ORDER BY distance_meters ASC
       LIMIT 5
       """, nativeQuery = true)
   List<GemDistanceResult> findNearbyGems(@Param("lat") double lat, 
                                           @Param("lng") double lng, 
                                           @Param("radius") double radius);
   ```
   - Use `GEM_DUPLICATE_RADIUS_METERS` (50m default) for radius
   - Return max 5 candidates ordered by distance

4. **Service Layer Logic** (`GemServiceImpl.createGem`):
   - **If duplicates found**:
     - Build `DuplicateGemResponse` with: `gemId`, `name`, `distanceMeters`, `founderUsername`, `vouchCount`
     - Throw `DuplicateGemException` (extends `ConflictException`) with 409 status
   - **If `overrideDuplicate=true` in request**:
     - Log override with user ID and reason (if provided)
     - Proceed to create new Gem
   - **Otherwise** (no duplicates or override):
     - Create Gem entity with:
       - `approval_status = 'pending'`
       - `lifecycle_status = 'open'`
       - `vouch_count = 0`
       - `average_rating = 0.00`
       - `rating_count = 0`
     - Save to database
     - Return `GemResponse` with 201 status

5. **Error Responses**:
   - `400`: Validation failure (message: "Validation failed: {field} {reason}")
   - `401`: Missing/invalid JWT token
   - `409`: Duplicate found (body: `{"message": "Potential duplicate Gem found.", "duplicates": [...]}`)
   - `500`: Server error

**File Locations:**
- DTO: `backend/src/main/java/com/krawl/backend/dto/request/GemCreateRequest.java`
- Service: `backend/src/main/java/com/krawl/backend/service/impl/GemServiceImpl.java`
- Repository: `backend/src/main/java/com/krawl/backend/repository/GemRepository.java`
- Controller: `backend/src/main/java/com/krawl/backend/controller/v1/GemControllerV1.java`

**References:**
- API Spec: `docs/reference/api-endpoints.md#create-gem`
- Database Queries: `docs/reference/database-queries.md#proximity-search`
- Security: `docs/reference/security-requirements.md`

**Acceptance Criteria:**
- ✅ 201 Created on successful creation
- ✅ 409 Conflict with duplicates array when duplicates found
- ✅ 400 Bad Request on validation failure
- ✅ Geospatial constraints enforced (lat/lng ranges)
- ✅ Default status values set correctly

**Test/Verification:**
```bash
# Integration test
POST /api/v1/gems
Authorization: Bearer <token>
{
  "name": "Test Gem",
  "latitude": 14.5547,
  "longitude": 121.0244,
  "tags": ["food"]
}

# Duplicate test (create two Gems within 50m)
# Should return 409 with duplicates array
```

**Artifacts:**
- PR: `"backend: implement gem creation with duplicate detection"`

---

### 🟡 GC-2: Duplicate Warning System (Frontend)

**Status:** 🟡 In Progress | **Depends on:** GC-1 (duplicate detection)

#### How to Implement

**Context:** UX flow to handle duplicate warnings, allowing users to contribute to existing Gems or override when genuinely different.

**Prerequisites:**
- ✅ GC-1 returns 409 with duplicates array
- ✅ Modal component available (`frontend/components/common/Modal.tsx`)

**Frontend Steps:**

1. **Handle 409 Response** (`frontend/app/add/page.tsx` or form component):
   ```typescript
   try {
     await api.createGem(gemData);
   } catch (error) {
     if (error.status === 409 && error.duplicates) {
       setDuplicateCandidates(error.duplicates);
       setShowDuplicateModal(true);
       return; // Don't proceed with creation
     }
     throw error; // Re-throw other errors
   }
   ```

2. **Create DuplicateWarningModal Component** (`frontend/components/gems/DuplicateWarningModal.tsx`):
   - **Props:**
     - `isOpen: boolean`
     - `duplicates: DuplicateGem[]` (from 409 response)
     - `onSelectExisting: (gemId: string) => void`
     - `onOverride: () => void`
     - `onCancel: () => void`
   
   - **Layout (Mobile-first):**
     ```
     ┌─────────────────────────────────────┐
     │ ⚠️ Potential Duplicate Found        │
     │                                     │
     │ Found X nearby gems. Is this one?   │
     │                                     │
     │ ┌─────────────────────────────────┐ │
     │ │ Aling Nena's Isaw              │ │
     │ │ 📍 25m away                    │ │
     │ │ 👍 15 vouches • @pedro_kalye   │ │
     │ │ [View on Map] [Add to This]    │ │
     │ └─────────────────────────────────┘ │
     │                                     │
     │ [This is Different →]             │
     │ [Cancel]                           │
     └─────────────────────────────────────┘
     ```

   - **Component Structure:**
     - **Header:** Title "⚠️ Potential Duplicate Found" (font: `text-lg font-semibold text-neutral-900`)
     - **Body:** List of duplicate candidates (max 5)
     - **Each Candidate Card:**
       - Gem name (bold, `text-base font-semibold`)
       - Distance in meters (`text-sm text-neutral-600`, e.g., "📍 25m away")
       - Vouch count and founder username (`text-sm text-neutral-500`, e.g., "👍 15 vouches • @pedro_kalye")
       - Actions: 
         - "View on Map" button (ghost style, opens map centered on that Gem)
         - "Add to This Gem" button (primary style, `bg-verde-500`)
     - **Footer Actions:**
       - "This is Different →" button (secondary style, calls `onOverride`)
       - "Cancel" button (ghost style, calls `onCancel`)

3. **Action Handlers:**
   - **"View on Map"**: 
     - Close modal
     - Center map on candidate Gem's coordinates
     - Open Gem detail drawer for that Gem
     - Zoom to level 17
   
   - **"Add to This Gem"**:
     ```typescript
     const handleSelectExisting = async (gemId: string) => {
       // Navigate to existing Gem detail page
       router.push(`/gems/${gemId}`);
       // Optionally: Auto-open "Add Photo" or "Vouch" section
       setShowDuplicateModal(false);
     };
     ```
   
   - **"This is Different"**:
     ```typescript
     const handleOverride = async () => {
       // Retry creation with override flag
       try {
         const result = await api.createGem({
           ...gemData,
           overrideDuplicate: true
         });
         toast.success("Gem created successfully!");
         setShowDuplicateModal(false);
         router.push(`/gems/${result.gemId}`);
       } catch (error) {
         toast.error("Failed to create gem. Please try again.");
       }
     };
     ```

4. **Styling** (using design tokens from `docs/reference/design-tokens.md`):
   - Modal backdrop: `bg-black/30`
   - Modal container: `bg-white rounded-lg shadow-xl max-w-md mx-auto p-6`
   - Candidate card: `border border-neutral-200 rounded-lg p-4 mb-3 hover:bg-neutral-50`
   - Primary button: `bg-verde-500 hover:bg-verde-600 text-white px-4 py-2 rounded`
   - Secondary button: `bg-neutral-100 hover:bg-neutral-200 text-neutral-700 px-4 py-2 rounded`

**File Locations:**
- Modal: `frontend/components/gems/DuplicateWarningModal.tsx`
- Form: `frontend/app/add/page.tsx` (or wherever Gem creation form lives)
- API client: `frontend/lib/api.ts`

**References:**
- Wireframe: `docs/design/wireframes/map-view.md` (duplicate warning section)
- Design Patterns: `docs/reference/design-patterns.md#modal-overlay-patterns`
- Components: `docs/reference/design-components.md#modals-overlays`

**Acceptance Criteria:**
- ✅ Modal appears on 409 response
- ✅ Candidates displayed with name, distance, vouches, founder
- ✅ "View on Map" centers map and opens detail drawer
- ✅ "Add to This Gem" navigates to existing Gem
- ✅ "This is Different" retries creation with override flag
- ✅ Modal accessible via keyboard (ESC to close, Tab navigation)
- ✅ Works on mobile (< 768px) and desktop

**Test/Verification:**
- Manual: Create Gem near existing Gem (within 50m)
- E2E: Test all three action paths (view, contribute, override)
- Verify accessibility with screen reader

**Artifacts:**
- PR: `"frontend: add duplicate warning modal and override flow"`

---

### 🟡 GC-3: Map Display with MapLibre

**Status:** 🟡 In Progress

#### How to Implement

**Context:** Interactive map showing Gem markers that update based on viewport bounds and zoom level.

**Prerequisites:**
- ✅ MapLibre GL JS installed (`maplibre-gl` v5.10.0+)
- ✅ MapTiler API key configured (`NEXT_PUBLIC_MAPTILER_API_KEY`)
- ✅ API client configured (`frontend/lib/api.ts`)

**Frontend Steps:**

1. **Update API Endpoint** (`frontend/lib/api.ts`):
   ```typescript
   getGemsInBounds: (bounds: MapBounds, filters?: GemFilters) => {
     const params = new URLSearchParams({
       neLat: bounds.neLat.toString(),
       neLng: bounds.neLng.toString(),
       swLat: bounds.swLat.toString(),
       swLng: bounds.swLng.toString(),
       ...(filters?.zoomLevel && { zoomLevel: filters.zoomLevel.toString() }),
       ...(filters?.tags && { tags: filters.tags.join(',') }),
       ...(filters?.minRating && { minRating: filters.minRating.toString() })
     });
     return apiFetch<Gem[]>(`${API_ROUTES.GEMS.BASE}?${params}`);
   }
   ```

2. **Create Map Component** (`frontend/components/map/MapLibreMap.tsx`):
   - **Props:**
     ```typescript
     interface MapLibreMapProps {
       center: [number, number]; // [lng, lat]
       zoom: number;
       gems?: Gem[];
       onMarkerClick?: (gem: Gem) => void;
       onMapMove?: (bounds: MapBounds, zoom: number) => void;
     }
     ```
   
   - **Map Initialization** (using `useMapInitialization` hook):
     ```typescript
     const map = new maplibregl.Map({
       container: mapContainerRef.current,
       style: `https://api.maptiler.com/maps/streets-v4/style.json?key=${MAPTILER_API_KEY}`,
       center: center,
       zoom: zoom,
       pitch: 60, // 3D view
       bearing: 0,
       maxPitch: 60,
     });
     ```
   
   - **Add Navigation Controls**:
     ```typescript
     map.addControl(new maplibregl.NavigationControl({
       showCompass: false,
       showZoom: true,
     }), 'bottom-left');
     ```

3. **Render Gem Markers**:
   - **Approach:** Use MapLibre `Marker` component (not custom HTML markers for performance)
   - **Marker Icon:** Use custom SVG pin (verde-500 color) or use MapLibre symbol layer
   - **Code:**
     ```typescript
     gems?.forEach(gem => {
       const el = document.createElement('div');
       el.className = 'gem-marker';
       el.innerHTML = '<svg>...</svg>'; // Pin icon
       
       const marker = new maplibregl.Marker(el)
         .setLngLat([gem.longitude, gem.latitude])
         .addTo(map);
       
       marker.getElement().addEventListener('click', () => {
         onMarkerClick?.(gem);
       });
     });
     ```
   - **Marker Styling:**
     - Size: 32px × 32px
     - Color: `verde-500` (#10B981)
     - Hover: Scale to 1.2x, cursor pointer

4. **Viewport-Based Fetching** (debounced):
   ```typescript
   const [debouncedBounds, setDebouncedBounds] = useState<MapBounds | null>(null);
   
   useEffect(() => {
     const timer = setTimeout(() => {
       if (mapBounds) {
         setDebouncedBounds(mapBounds);
       }
     }, 300); // 300ms debounce
     
     return () => clearTimeout(timer);
   }, [mapBounds]);
   
   useEffect(() => {
     if (debouncedBounds) {
       fetchGemsInBounds(debouncedBounds, { zoomLevel: currentZoom });
     }
   }, [debouncedBounds]);
   ```

5. **Map State to URL** (for shareability):
   ```typescript
   // On map move/zoom
   const updateURL = (center: [number, number], zoom: number) => {
     const params = new URLSearchParams({
       lat: center[1].toFixed(6),
       lng: center[0].toFixed(6),
       zoom: zoom.toFixed(2)
     });
     router.replace(`/?${params}`, { scroll: false });
   };
   
   // On page load, read from URL
   useEffect(() => {
     const params = new URLSearchParams(window.location.search);
     const lat = parseFloat(params.get('lat') || '14.5547');
     const lng = parseFloat(params.get('lng') || '121.0244');
     const zoom = parseFloat(params.get('zoom') || '12');
     setMapCenter([lng, lat]);
     setMapZoom(zoom);
   }, []);
   ```

6. **Loading & Error States**:
   - **Loading:** Show skeleton overlay on map (`frontend/components/skeletons/MapSkeleton.tsx`)
   - **Error:** Toast notification + retry button
   - **Empty State:** Message "No gems in this area. Be the first to pin one!"

**File Locations:**
- Map component: `frontend/components/map/MapLibreMap.tsx`
- Hook: `frontend/lib/map/hooks/useMapInitialization.ts`
- Page: `frontend/app/page.tsx`

**References:**
- API Spec: `docs/reference/api-endpoints.md#list-gems` (note: needs bounds params)
- Wireframe: `docs/design/wireframes/map-view.md`
- Components: `docs/reference/design-components.md#map-components`

**Acceptance Criteria:**
- ✅ Map renders with MapLibre using MapTiler style
- ✅ Gems fetched when viewport changes (debounced 300ms)
- ✅ Markers rendered at correct coordinates
- ✅ Marker click opens Gem detail drawer
- ✅ Map state persisted to URL (lat, lng, zoom)
- ✅ Loading skeleton shown during fetch
- ✅ Error toast on fetch failure
- ✅ Smooth pan/zoom performance (60fps on mid-range devices)

**Test/Verification:**
```bash
# Manual testing
1. Open map view
2. Pan map → verify API call after 300ms delay
3. Click marker → verify detail drawer opens
4. Share URL → verify map state restored
5. Test on mobile device (touch gestures)
```

**Artifacts:**
- PR: `"frontend: implement map viewport-based gem fetching with markers"`

---

### 🟡 GC-4: Gem Clustering

**Status:** 🟡 In Progress | **Depends on:** GC-3

#### How to Implement

**Context:** Cluster nearby Gem markers at low zoom levels to improve performance and readability.

**Prerequisites:**
- ✅ GC-3 map displaying individual markers
- ✅ Supercluster library installed (`supercluster` v7.1.5+)

**Frontend Steps:**

1. **Install Supercluster**:
   ```bash
   npm install supercluster
   ```

2. **Create Clustering Hook** (`frontend/lib/map/hooks/useGemClustering.ts`):
   ```typescript
   import Supercluster from 'supercluster';
   
   export function useGemClustering(gems: Gem[], zoom: number, bounds: MapBounds) {
     const clusterer = useMemo(() => {
       return new Supercluster({
         radius: 60, // Cluster radius in pixels
         maxZoom: 15, // Max zoom to cluster points
         minZoom: 0,
         minPoints: 2, // Minimum points to form cluster
       });
     }, []);
   
     const points = useMemo(() => {
       return gems.map(gem => ({
         type: 'Feature' as const,
         properties: { gem },
         geometry: {
           type: 'Point' as const,
           coordinates: [gem.longitude, gem.latitude],
         },
       }));
     }, [gems]);
   
     useEffect(() => {
       clusterer.load(points);
     }, [clusterer, points]);
   
     const clusters = useMemo(() => {
       const [swLng, swLat, neLng, neLat] = [
         bounds.swLng, bounds.swLat, bounds.neLng, bounds.neLat
       ];
       return clusterer.getClusters([swLng, swLat, neLng, neLat], Math.floor(zoom));
     }, [clusterer, bounds, zoom]);
   
     return clusters;
   }
   ```

3. **Render Clusters vs Individual Markers**:
   ```typescript
   const clusters = useGemClustering(gems, mapZoom, mapBounds);
   
   useEffect(() => {
     // Clear existing markers
     markersRef.current.forEach(m => m.remove());
     markersRef.current = [];
   
     clusters.forEach(cluster => {
       if (cluster.properties.cluster) {
         // Render cluster marker
         const count = cluster.properties.point_count;
         const el = createClusterMarker(count);
         const marker = new maplibregl.Marker(el)
           .setLngLat([cluster.geometry.coordinates[0], cluster.geometry.coordinates[1]])
           .addTo(map);
         
         marker.getElement().addEventListener('click', () => {
           // Zoom into cluster
           const expansionZoom = Math.min(
             clusterer.getClusterExpansionZoom(cluster.id),
             map.getMaxZoom()
           );
           map.easeTo({
             center: [cluster.geometry.coordinates[0], cluster.geometry.coordinates[1]],
             zoom: expansionZoom,
             duration: 500
           });
         });
         
         markersRef.current.push(marker);
       } else {
         // Render individual Gem marker
         const gem = cluster.properties.gem;
         const marker = createGemMarker(gem);
         markersRef.current.push(marker);
       }
     });
   }, [clusters]);
   ```

4. **Cluster Marker Styling**:
   - **Small (2-9):** Circle, 40px diameter, `bg-verde-500`, white text
   - **Medium (10-49):** Circle, 50px diameter, `bg-verde-600`, white text
   - **Large (50+):** Circle, 60px diameter, `bg-verde-700`, white text
   - **Animation:** Scale from 0.8 to 1.0 on mount (300ms)

5. **Cluster Expansion Animation**:
   - When clicking cluster, smoothly zoom into bounds (500ms ease-out)
   - Clusters expand into individual markers as zoom increases

**File Locations:**
- Hook: `frontend/lib/map/hooks/useGemClustering.ts`
- Map component: `frontend/components/map/MapLibreMap.tsx`

**References:**
- Patterns: `docs/reference/design-patterns.md#performance-patterns`
- Supercluster docs: https://github.com/mapbox/supercluster

**Acceptance Criteria:**
- ✅ Clusters appear at zoom < 15
- ✅ Individual markers at zoom >= 15
- ✅ Cluster click zooms into cluster bounds
- ✅ Cluster size tiers styled differently (small/medium/large)
- ✅ Smooth expansion animation (500ms)
- ✅ Performance: < 100ms to calculate clusters for 1000+ Gems

**Test/Verification:**
- Manual: Zoom out to see clusters, zoom in to see individual markers
- Performance: Test with 1000+ synthetic Gems
- Verify cluster click expands correctly

**Artifacts:**
- PR: `"frontend: add gem marker clustering with animated expansion"`

---

### ⚪ GC-5: Gem Detail View

**Status:** ⚪ To Do | **Depends on:** GC-3

#### How to Implement

**Context:** Display Gem details in a drawer/panel with actions (vouch, rate, add photo, report).

**Prerequisites:**
- ✅ GC-3 map with markers implemented
- ✅ Drawer component available (`frontend/components/common/Drawer.tsx`)

**Frontend Steps:**

1. **Create GemDetailDrawer Component** (`frontend/components/gems/GemDetailDrawer.tsx`):
   - **Props:**
     ```typescript
     interface GemDetailDrawerProps {
       gemId: string;
       isOpen: boolean;
       onClose: () => void;
     }
     ```
   
   - **Layout (Mobile - Bottom Drawer):**
     ```
     ┌─────────────────────────────────────┐
     │ ═════ (drag handle)                │
     │                                     │
     │ [Featured Photo]                   │
     │                                     │
     │ Gem Name                    [Share]│
     │ ⭐ 4.5 (15)  👍 12 vouches         │
     │                                     │
     │ Description text...                 │
     │                                     │
     │ Tags: [Food] [Street Food]         │
     │                                     │
     │ by @founder_username                │
     │ Status: [Open] [Pending Approval]  │
     │                                     │
     │ ───────────────────────────────────│
     │                                     │
     │ [👍 Vouch] [⭐ Rate] [📷 Add Photo]│
     │                                     │
     │ [Report Issue]                     │
     │                                     │
     └─────────────────────────────────────┘
     ```
   
   - **Layout (Desktop - Side Panel, 40% width):**
     - Same content, but slides in from right
     - Width: `max-w-md` (448px)
     - Map visible on left (60%)

2. **Fetch Gem Details**:
   ```typescript
   const { data: gem, isLoading, error } = useQuery(
     ['gem', gemId],
     () => api.getGemById(gemId),
     { enabled: isOpen && !!gemId }
   );
   ```

3. **Component Sections (in order):**
   
   **a. Header (Sticky):**
   - Drag handle (mobile only): `w-12 h-1 bg-neutral-300 rounded mx-auto mt-2`
   - Close button (X): Top-right, icon button style
   
   **b. Featured Photo:**
   - If `gem.photos?.find(p => p.isFeatured)` exists, display (aspect ratio 16:9)
   - Fallback: Placeholder image with Gem icon
   - Height: 200px (mobile), 250px (desktop)
   
   **c. Gem Name & Stats:**
   - Name: `text-2xl font-bold text-neutral-900 mb-2`
   - Stats row:
     - Rating: `⭐ ${gem.averageRating.toFixed(1)} (${gem.ratingCount})`
     - Vouches: `👍 ${gem.vouchCount} vouches`
     - Font: `text-base text-neutral-600`
     - Layout: Flex row, space between
   
   **d. Description:**
   - Text: `text-base text-neutral-700 mb-4`
   - Max height: 150px with scroll (if long)
   
   **e. Tags:**
   - Display as pills: `bg-verde-50 text-verde-700 px-3 py-1 rounded-full text-sm`
   - Wrap: flex-wrap
   
   **f. Founder Info:**
   - Text: `text-sm text-neutral-500`
   - Format: "by @{founderUsername}"
   - Link to founder profile: `/users/${founderUsername}`
   
   **g. Status Badges:**
   - Approval: `bg-mango-100 text-mango-700` if pending, `bg-verde-100 text-verde-700` if approved
   - Lifecycle: `bg-verde-100 text-verde-700` if open, `bg-neutral-100 text-neutral-700` if closed
   - Size: `text-xs px-2 py-1 rounded-full`
   
   **h. Action Buttons (Grid, 2 columns on mobile):**
   - **Vouch Button:**
     - Icon: 👍
     - Text: "Vouch" or "Vouched" (if user already vouched)
     - Style: Primary if not vouched, Secondary if vouched
     - Disabled if `!isAuthenticated`
     - Action: `POST /api/v1/gems/{id}/vouch`
   
   - **Rate Button:**
     - Icon: ⭐
     - Text: "Rate" or "{rating}/5" if already rated
     - Style: Primary
     - Disabled if `!isAuthenticated`
     - Action: Opens rating modal (Epic 6)
   
   - **Add Photo Button:**
     - Icon: 📷
     - Text: "Add Photo"
     - Style: Secondary
     - Disabled if `!isAuthenticated`
     - Action: Opens photo upload (GC-6)
   
   - **Report Button:**
     - Icon: 🚩
     - Text: "Report Issue"
     - Style: Ghost (text only)
     - Disabled if `!isAuthenticated`
     - Action: Opens report modal (Epic 6)
   
   **i. Share Section:**
   - Button: "Share" with link icon
   - Copies URL to clipboard: `${window.location.origin}/gems/${gemId}`
   - Toast: "Link copied to clipboard!"

4. **Responsive Behavior:**
   - **Mobile (< 768px):** Bottom drawer, `max-h-[80vh]`, swipe down to close
   - **Desktop (>= 768px):** Side panel, slides from right, `w-96` (384px)

5. **Accessibility:**
   - ARIA labels on all buttons
   - Keyboard navigation: Tab through elements, ESC to close
   - Screen reader: Announce Gem name and stats on open
   - Focus trap within drawer when open

**File Locations:**
- Component: `frontend/components/gems/GemDetailDrawer.tsx`
- Page: `frontend/app/gems/[id]/page.tsx` (standalone detail page, optional)

**References:**
- API Spec: `docs/reference/api-endpoints.md#get-gem-details`
- Components: `docs/reference/design-components.md#bottom-drawer-mobile`
- Patterns: `docs/reference/design-patterns.md#detail-view-pattern`

**Acceptance Criteria:**
- ✅ Drawer opens on marker click
- ✅ All Gem data displayed correctly
- ✅ Action buttons invoke correct endpoints
- ✅ Buttons disabled when unauthenticated
- ✅ Share button copies URL to clipboard
- ✅ Drawer closes on ESC key, backdrop click, or swipe down (mobile)
- ✅ Keyboard navigation works
- ✅ Screen reader announces content
- ✅ Loading skeleton shown while fetching
- ✅ Error message shown on fetch failure

**Test/Verification:**
- Manual: Click marker, verify drawer opens and displays data
- Test all action buttons (mock API calls)
- Test keyboard navigation
- Test on mobile device (swipe gestures)

**Artifacts:**
- PR: `"frontend: implement gem detail drawer with actions"`

---

### ⚪ GC-6: Photo Upload

**Status:** ⚪ To Do | **Depends on:** GC-5

#### How to Implement

**Context:** Allow users to upload photos to Gems, with thumbnail generation and gallery display.

**Prerequisites:**
- ✅ Cloudinary account created
- ✅ Cloudinary env vars set: `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
- ✅ Frontend env: `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`

**Backend Steps:**

1. **Photo Upload Endpoint** (`POST /api/v1/gems/{gemId}/photos`):
   - Accept `multipart/form-data` with `file` field
   - Validate file:
     - Type: `image/jpeg`, `image/png`, `image/webp`
     - Size: Max 10MB
     - Dimensions: Optional validation (min 200×200px recommended)
   
   - Upload to Cloudinary:
     ```java
     Map<String, Object> params = Map.of(
       "folder", "gems/" + gemId,
       "public_id", UUID.randomUUID().toString(),
       "transformation", "w_1200,h_800,c_fill,q_auto"
     );
     Cloudinary.uploader().upload(file.getBytes(), params);
     ```
   
   - Store in database (`gem_photos` table):
     - `photo_url`: Full URL from Cloudinary
     - `uploader_id`: Current user ID
     - `is_featured`: Boolean (first photo is featured by default)
     - `caption`: Optional text from request
   
   - Return `PhotoResponse` with:
     - `photoId`, `photoUrl`, `thumbnailUrl` (Cloudinary auto-generates), `isFeatured`, `caption`

2. **Set Featured Photo Endpoint** (`PUT /api/v1/gems/{gemId}/photos/{photoId}/featured`):
   - Unset current featured photo
   - Set new featured photo
   - Return updated photo list

**Frontend Steps:**

1. **Create PhotoUpload Component** (`frontend/components/gems/PhotoUpload.tsx`):
   - **Props:**
     ```typescript
     interface PhotoUploadProps {
       gemId: string;
       onUploadComplete: (photo: Photo) => void;
     }
     ```
   
   - **File Input:**
     ```tsx
     <input
       type="file"
       accept="image/jpeg,image/png,image/webp"
       multiple
       onChange={handleFileSelect}
       className="hidden"
       id="photo-upload"
     />
     <label htmlFor="photo-upload" className="cursor-pointer">
       📷 Add Photo
     </label>
     ```
   
   - **File Validation (client-side):**
     ```typescript
     const validateFile = (file: File): string | null => {
       const MAX_SIZE = 10 * 1024 * 1024; // 10MB
       const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
       
       if (!ALLOWED_TYPES.includes(file.type)) {
         return 'Invalid file type. Use JPEG, PNG, or WebP.';
       }
       if (file.size > MAX_SIZE) {
         return 'File too large. Maximum 10MB.';
       }
       return null;
     };
     ```

2. **Upload Flow with Progress:**
   ```typescript
   const uploadPhoto = async (file: File) => {
     const formData = new FormData();
     formData.append('file', file);
     
     try {
       const response = await fetch(`/api/v1/gems/${gemId}/photos`, {
         method: 'POST',
         headers: {
           'Authorization': `Bearer ${token}`,
         },
         body: formData,
       });
       
       if (!response.ok) throw new Error('Upload failed');
       
       const photo = await response.json();
       onUploadComplete(photo);
       toast.success('Photo uploaded!');
     } catch (error) {
       toast.error('Failed to upload photo');
     }
   };
   ```

3. **Photo Gallery Display** (`frontend/components/gems/GemPhotoGallery.tsx`):
   - **Layout:** Grid, 3 columns on mobile, 4 on desktop
   - **Featured Photo:** Shown larger (first in grid, spans 2 columns)
   - **Thumbnails:** Lazy-loaded using Next.js `Image` component
   - **Click:** Opens full-size photo in lightbox/modal
   
   - **Code:**
     ```tsx
     <div className="grid grid-cols-3 gap-2">
       {photos.map(photo => (
         <div
           key={photo.photoId}
           className={photo.isFeatured ? 'col-span-2 row-span-2' : ''}
         >
           <Image
             src={photo.thumbnailUrl || photo.photoUrl}
             alt={photo.caption || `Photo of ${gemName}`}
             width={400}
             height={300}
             loading="lazy"
             className="rounded-lg object-cover"
           />
         </div>
       ))}
     </div>
     ```

4. **Featured Photo Selector:**
   - In gallery, show "Set as Featured" button on hover (desktop) or long-press (mobile)
   - Call `PUT /api/v1/gems/{gemId}/photos/{photoId}/featured`

**File Locations:**
- Backend controller: `backend/src/main/java/com/krawl/backend/controller/v1/GemPhotoController.java`
- Backend service: `backend/src/main/java/com/krawl/backend/service/impl/GemPhotoServiceImpl.java`
- Frontend component: `frontend/components/gems/PhotoUpload.tsx`
- Frontend gallery: `frontend/components/gems/GemPhotoGallery.tsx`

**References:**
- API Spec: `docs/reference/api-endpoints.md#storage-health` (for health check)
- Security: `docs/reference/security-requirements.md#file-uploads`
- Patterns: `docs/reference/design-patterns.md#performance-patterns` (image optimization)

**Acceptance Criteria:**
- ✅ Upload accepts JPEG, PNG, WebP (max 10MB)
- ✅ Thumbnails generated automatically by Cloudinary
- ✅ Photos displayed in gallery with featured photo highlighted
- ✅ "Set as Featured" updates featured photo
- ✅ Lazy loading for gallery images
- ✅ Progress indicator during upload
- ✅ Error handling for invalid files or upload failures
- ✅ Offline: Queue uploads for sync when online

**Test/Verification:**
- Upload 3 images (different formats)
- Verify thumbnails appear
- Set different photo as featured
- Test offline upload queueing

**Artifacts:**
- PR: `"backend: implement photo upload with Cloudinary"`
- PR: `"frontend: add photo upload and gallery display"`

---

## Progress Tracking

**Overall:** 40% Complete

| Task | Status | Progress |
|------|--------|----------|
| GC-1: Gem Creation API | ✅ | 100% (duplicate detection pending) |
| GC-2: Duplicate Warning UX | 🟡 | 0% |
| GC-3: Map Display | 🟡 | 60% (basic map done, markers pending) |
| GC-4: Clustering | 🟡 | 0% |
| GC-5: Detail View | ⚪ | 0% |
| GC-6: Photo Upload | ⚪ | 0% |

---

## Dependencies

**Requires:**
- ✅ Epic 1: Project Setup (Complete)
- 🟡 Epic 2: Authentication (In Progress - JWT required for creation)

**Blocks:**
- Epic 4: Krawl Creation (needs Gem selection)
- Epic 5: Discovery (needs Gem display)

---

## Technical Notes

### API Endpoint Mismatch
**Issue:** Current `GET /api/v1/gems` doesn't support bounds filtering.  
**Fix Required:** Update endpoint to accept `neLat`, `neLng`, `swLat`, `swLng` query params.

### Duplicate Detection Implementation Status
**Issue:** GC-1 marked complete but duplicate detection not implemented in code.  
**Fix Required:** Implement `findNearbyGems` query and 409 response handling in `GemServiceImpl`.

### Scalability Considerations
- **Marker Rendering:** Use symbol layers instead of DOM markers for 1000+ Gems
- **Clustering:** Supercluster handles 10,000+ points efficiently
- **Photo Storage:** Cloudinary CDN handles scaling automatically
- **Database:** GIST index on `gems.location` optimizes proximity queries

### Maintainability
- All components follow React best practices (hooks, TypeScript)
- API endpoints versioned (`/api/v1/`)
- Error handling centralized in API client
- Design tokens used consistently

---

**Related Documents:**
- [API Documentation - Gems](../../reference/api-endpoints.md#gems)
- [Database Schema](../../reference/database-schema.md)
- [Design Wireframes](../../design/wireframes/map-view.md)

---

*Last updated: 2025-11-01*