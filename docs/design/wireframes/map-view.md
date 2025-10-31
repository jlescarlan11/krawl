# Map View Wireframe

> **Purpose:** Main screen of the Krawl PWA showing the interactive map with Gems.

**Page:** `/` (Home)  
**Status:** 🟡 In Progress  
**Last Updated:** 2025-10-31

---

## ASCII Wireframe

### Logged Out State

```
╔═══════════════════════════════════════════════════╗
║ [Krawl Logo/Title]     [Login/Sign Up Button]    ║
╠═══════════════════════════════════════════════════╣
║ [ Search Bar (Placeholder: Search...) ] [Filter]  ║
║                                                   ║
║                                                   ║
║                  ┌───────────────────┐            ║
║                  │   Map Area        │            ║
║                  │   (MapLibre GL JS)│            ║
║                  │ Showing Clustered │            ║
║                  │     Gems          │            ║
║                  │                   │            ║
║                  │                   │            ║
║                  └───────────────────┘            ║
║                                                   ║
║ [Center Map Btn]                   [FAB +]        ║
║                                   (Disabled)      ║
╠═══════════════════════════════════════════════════╣
║ [Map Tab]  [Discover]  [My Krawls]   [Profile]   ║
║ (Active)               (Disabled)    (Disabled)   ║
╚═══════════════════════════════════════════════════╝
```

### Logged In State

```
╔═══════════════════════════════════════════════════╗
║ [Krawl Logo/Title]        [User Avatar/Profile]  ║
╠═══════════════════════════════════════════════════╣
║ [ Search Bar (Placeholder: Search...) ] [Filter]  ║
║                                                   ║
║                                                   ║
║                  ┌───────────────────┐            ║
║                  │   Map Area        │            ║
║                  │   (MapLibre GL JS)│            ║
║                  │ Showing Clustered │            ║
║                  │     Gems          │            ║
║                  │                   │            ║
║                  │                   │            ║
║                  └───────────────────┘            ║
║                                                   ║
║ [Center Map Btn]                   [FAB +]        ║
║                                    (Enabled)      ║
╠═══════════════════════════════════════════════════╣
║ [Map Tab]  [Discover]  [My Krawls]   [Profile]   ║
║ (Active)                                          ║
╚═══════════════════════════════════════════════════╝
```

---

## Key Features

### Anonymous Browsing
- ✅ Users can view Gems without logging in
- ✅ Map exploration fully functional
- ✅ Search and filter available
- ❌ Cannot add Gems or access profile features

### Authenticated Features
- ✅ FAB (+) button enabled to add new Gems
- ✅ Full bottom navigation access
- ✅ Profile icon in header
- ✅ Save/bookmark functionality

### Map Interactions
- Pan and zoom
- Tap Gem marker to view details
- Cluster expansion on zoom
- User location detection (with permission)
- Center map button to re-center

---

## Component Breakdown

### Layout Structure

```
<MapViewPage>
├── <Header>
│   ├── <Logo />
│   └── <AuthButton /> or <UserAvatar />
├── <SearchBar>
│   ├── <SearchInput />
│   └── <FilterButton />
├── <MapContainer>
│   ├── <MapLibreMap>
│   │   ├── <GemMarker /> (multiple)
│   │   └── <ClusterMarker /> (multiple)
│   ├── <CenterMapButton />
│   └── <FAB /> (+ Add Gem)
└── <BottomNav>
    ├── <NavItem label="Map" active />
    ├── <NavItem label="Discover" />
    ├── <NavItem label="My Krawls" disabled={!authenticated} />
    └── <NavItem label="Profile" disabled={!authenticated} />
</MapViewPage>
```

### Component Details

**Header:**
- Component: `<Header />`
- File: `src/app/components/Header.tsx`
- Props: `{ authenticated, user }`

**Map:**
- Component: `<MapLibreMap />`
- File: `src/app/components/MapLibreMap.tsx`
- Library: `maplibre-gl-js`
- Props: `{ gems, center, zoom, onMarkerClick }`

**Bottom Navigation:**
- Component: `<BottomNav />`
- File: `src/app/components/BottomNav.tsx`
- Props: `{ activeTab, authenticated }`

---

## State Management

### Local State (useState)

```typescript
const [mapCenter, setMapCenter] = useState({ lat: 14.5547, lng: 121.0244 });
const [mapZoom, setMapZoom] = useState(12);
const [selectedGem, setSelectedGem] = useState<Gem | null>(null);
const [showAddGemModal, setShowAddGemModal] = useState(false);
```

### Global State (Context/Zustand)

```typescript
// Auth state
const { user, isAuthenticated } = useAuthStore();

// Gems data
const { gems, loading, fetchGems } = useGemStore();

// UI state
const { showDrawer, openDrawer, closeDrawer } = useUIStore();
```

### Data Fetching

```typescript
useEffect(() => {
  // Fetch Gems in current map bounds
  fetchGems({
    bounds: mapBounds,
    filters: activeFilters,
  });
}, [mapBounds, activeFilters]);
```

---

## Interactive Elements

### FAB (+) Button

**State:** Enabled when authenticated  
**Action:** Opens "Add Gem" modal  
**Shortcut:** Long-press map for quick pin

```typescript
const handleFABClick = () => {
  if (!isAuthenticated) {
    router.push('/login');
    return;
  }
  setShowAddGemModal(true);
};
```

### Gem Markers

**Action:** Tap to open Gem detail drawer  
**Visual:** Lokal Verde pin icon  
**Clustering:** Groups of 10+ Gems

```typescript
const handleMarkerClick = (gem: Gem) => {
  setSelectedGem(gem);
  openDrawer('gem-detail');
};
```

### Search Bar

**Action:** Focus opens search overlay  
**Debounce:** 300ms  
**Results:** Real-time as you type

---

## Responsive Behavior

### Mobile (375px - 768px)

- Full-screen map
- Bottom navigation sticky
- FAB bottom-right corner
- Drawer overlays from bottom

### Tablet (768px - 1024px)

- Map takes 70% width
- Side panel (30%) for Gem details
- Bottom nav transforms to side nav
- FAB remains bottom-right

### Desktop (1024px+)

- Map takes 60% width
- Side panel (40%) with search + results
- Top navigation bar
- FAB in map container

---

## Accessibility

- ✅ Semantic HTML (`<nav>`, `<button>`, `<input>`)
- ✅ ARIA labels for map controls
- ✅ Keyboard navigation support
- ✅ Focus indicators visible
- ✅ Screen reader announcements for Gem clusters

---

## Performance Considerations

### Map Optimization

- **Lazy Loading:** Load Gems in viewport only
- **Clustering:** Supercluster library for marker aggregation
- **Debouncing:** Limit API calls on map move
- **Caching:** Cache Gem data in IndexedDB

### Bundle Size

- MapLibre GL JS: ~400KB (gzipped)
- Lazy load map component on route
- Prefetch critical Gem data

---

## Screenshots

> **Status:** To be added during implementation

**Planned Screenshots:**
1. Map view (logged out)
2. Map view (logged in)
3. Gem marker cluster
4. Gem detail drawer open
5. Add Gem modal

---

## Implementation Notes

### Map Library

**Decision:** MapLibre GL JS (vs. Mapbox GL JS)
- Open-source, no vendor lock-in
- Same API as Mapbox
- Free tile hosting via Maptiler

### Geolocation

```typescript
const requestLocation = async () => {
  if (!navigator.geolocation) {
    toast.error('Geolocation not supported');
    return;
  }
  
  navigator.geolocation.getCurrentPosition(
    (position) => {
      setMapCenter({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
      setMapZoom(15);
    },
    (error) => {
      console.error('Location error:', error);
      toast.error('Unable to get your location');
    }
  );
};
```

---

## TODO / Future Improvements

- [ ] Add map style switcher (standard/satellite)
- [ ] Implement heat map for popular areas
- [ ] Add custom map controls (zoom in/out buttons)
- [ ] Show user location with live tracking
- [ ] Add route preview for nearby Krawls
- [ ] Implement map theme (day/night mode)
- [ ] Add gesture controls for mobile (pinch zoom)
- [ ] Show distance to Gems from user location
- [ ] Add "Explore nearby" suggestions

---

## Related Documents

- [Add Gem Wireframe](./add-gem.md)
- [Gem Detail Wireframe](./gem-detail.md)
- [Design System](../../reference/design-system.md)
- [User Stories - Map](../../planning/user-story.md#map-exploration)

---

*Last reviewed: 2025-10-31 • Update with screenshots as implemented*

