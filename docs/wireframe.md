# Krawl PWA - Low-Fidelity Wireframes

> **Purpose**: These wireframes show the basic structure and layout of key screens for the Krawl PWA. They focus on element placement and hierarchy, not visual design details.

---

## 1. Home / Main Map View (`/`) - Logged Out

```
╔═══════════════════════════════════════════════════╗
║ [Krawl Logo/Title]     [Login/Sign Up Button]    ║
╠═══════════════════════════════════════════════════╣
║ [ Search Bar (Placeholder: Search...) ] [Filter]  ║
║                                                   ║
║                                                   ║
║                  ┌───────────────────┐            ║
║                  │   Map Area        │            ║
║                  │   (Leaflet)       │            ║
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

**Key Features:**
- Map dominates the screen
- Core actions (Pin, My Krawls, Profile) are **disabled**
- Login button is **prominent**
- Search/Filter accessible for exploration
- Anonymous browsing enabled

---

## 2. Home / Main Map View (`/`) - Logged In

```
╔═══════════════════════════════════════════════════╗
║ [Krawl Logo/Title]        [User Avatar/Profile]  ║
╠═══════════════════════════════════════════════════╣
║ [ Search Bar (Placeholder: Search...) ] [Filter]  ║
║                                                   ║
║                                                   ║
║                  ┌───────────────────┐            ║
║                  │   Map Area        │            ║
║                  │   (Leaflet)       │            ║
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

**Key Features:**
- Similar to logged out view
- **FAB (+) is enabled** for adding Gems
- Bottom navigation **fully active**
- Profile icon replaces Login button
- Full functionality unlocked

---

## 3. Gem Detail Popup/Drawer (Overlay on `/`)

```
╔═══════════════════════════════════════════════════╗
║        (Map View Partially Visible Behind)        ║
║ ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓ ║
║ ┃ [Gem Name - Title]           [Close Button X]┃ ║
║ ┃ ★★★★☆ [Avg Rating] • 42 Vouches • [Status]  ┃ ║
║ ┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫ ║
║ ┃                                               ┃ ║
║ ┃     ┌─────────────────────────────┐          ┃ ║
║ ┃     │  Image Carousel /           │          ┃ ║
║ ┃     │  Placeholder                │          ┃ ║
║ ┃     └─────────────────────────────┘          ┃ ║
║ ┃                                               ┃ ║
║ ┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫ ║
║ ┃ Description:                                  ┃ ║
║ ┃ [ Gem Description Text........................┃ ║
║ ┃   .............................................┃ ║
║ ┃   ........................................... ]┃ ║
║ ┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫ ║
║ ┃ Tags: [Tag1] [Tag2] [Tag3]                   ┃ ║
║ ┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫ ║
║ ┃ Founded by: [@Username]                      ┃ ║
║ ┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫ ║
║ ┃ [Add Photo] [Rate] [Vouch] [Report]          ┃ ║
║ ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛ ║
╚═══════════════════════════════════════════════════╝
```

**Key Features:**
- Slides up or appears over the map
- Clearly displays Gem information
- Key actions available:
  - **Vouch** - Validate gem quality
  - **Rate** - Star rating
  - **Add Photo** - Community contributions
  - **Report** - Content moderation
- Only available for **logged-in users**

---

## 4. Add Gem Form (Modal/Overlay on `/`)

```
╔═══════════════════════════════════════════════════╗
║        (Map View Partially Visible Behind)        ║
║ ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓ ║
║ ┃ Add New Gem                  [Close Button X]┃ ║
║ ┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫ ║
║ ┃  ┌────────────────────────────────────────┐  ┃ ║
║ ┃  │ [Map Thumbnail showing selected loc.]  │  ┃ ║
║ ┃  │           📍 Location Pin              │  ┃ ║
║ ┃  └────────────────────────────────────────┘  ┃ ║
║ ┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫ ║
║ ┃ Name*:                                        ┃ ║
║ ┃ ┌──────────────────────────────────────────┐ ┃ ║
║ ┃ │ Input Field for Gem Name                 │ ┃ ║
║ ┃ └──────────────────────────────────────────┘ ┃ ║
║ ┃                                               ┃ ║
║ ┃ Description:                                  ┃ ║
║ ┃ ┌──────────────────────────────────────────┐ ┃ ║
║ ┃ │ Text Area for Description                 │ ┃ ║
║ ┃ │                                           │ ┃ ║
║ ┃ │                                           │ ┃ ║
║ ┃ └──────────────────────────────────────────┘ ┃ ║
║ ┃                                               ┃ ║
║ ┃ Tags:                                         ┃ ║
║ ┃ ┌──────────────────────────────────────────┐ ┃ ║
║ ┃ │ Tag Input/Selector Component             │ ┃ ║
║ ┃ └──────────────────────────────────────────┘ ┃ ║
║ ┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫ ║
║ ┃  [ Cancel Button ]      [ Submit Button ]    ┃ ║
║ ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛ ║
╚═══════════════════════════════════════════════════╝
```

**Key Features:**
- Triggered by **FAB (+)** button
- Simple, focused form structure
- Location coordinates passed **implicitly**
- Map thumbnail confirms selected location
- Required fields marked with `*`

---

## 5. Duplicate Gem Warning (Modal/Overlay)

```
╔═══════════════════════════════════════════════════╗
║    (Add Gem Form or Map Visible Behind)           ║
║ ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓ ║
║ ┃ ⚠️  Warning: Potential Duplicate Found        ┃ ║
║ ┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫ ║
║ ┃ The Gem you're adding might already exist:    ┃ ║
║ ┃                                               ┃ ║
║ ┃ ┌───────────────────────────────────────────┐ ┃ ║
║ ┃ │ [Existing Gem Name 1]                     │ ┃ ║
║ ┃ │ 50m away • 28 Vouches • @founder_username │ ┃ ║
║ ┃ │                                           │ ┃ ║
║ ┃ │ [View on Map]    [Add to This Gem]        │ ┃ ║
║ ┃ └───────────────────────────────────────────┘ ┃ ║
║ ┃                                               ┃ ║
║ ┃ ┌───────────────────────────────────────────┐ ┃ ║
║ ┃ │ [Existing Gem Name 2]                     │ ┃ ║
║ ┃ │ 120m away • 15 Vouches • @another_user    │ ┃ ║
║ ┃ │                                           │ ┃ ║
║ ┃ │ [View on Map]    [Add to This Gem]        │ ┃ ║
║ ┃ └───────────────────────────────────────────┘ ┃ ║
║ ┃                                               ┃ ║
║ ┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫ ║
║ ┃  [ Cancel ]      [ This is Different ]        ┃ ║
║ ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛ ║
╚═══════════════════════════════════════════════════╝
```

**Key Features:**
- Appears **after submitting** "Add Gem" if duplicates detected
- Lists potential matches with:
  - Distance from new location
  - Vouch count (credibility indicator)
  - Founder username
- Clear action buttons:
  - **View on Map** - Inspect existing gem
  - **Add to This Gem** - Contribute instead
  - **This is Different** - Proceed with new gem

---

## 6. Discover Krawls Page (`/discover`)

```
╔═══════════════════════════════════════════════════╗
║ Discover Krawls                  [User Avatar]    ║
╠═══════════════════════════════════════════════════╣
║ [ Search Bar (Search Krawls...) ]      [Filter]   ║
╠═══════════════════════════════════════════════════╣
║ Featured Krawls                                   ║
║ ┌─────────┐ ┌─────────┐ ┌─────────┐              ║
║ │ Krawl   │ │ Krawl   │ │ Krawl   │ →            ║
║ │ Card    │ │ Card    │ │ Card    │              ║
║ │ ★★★★☆   │ │ ★★★★★   │ │ ★★★★☆   │              ║
║ └─────────┘ └─────────┘ └─────────┘              ║
║ (Horizontal Scroll)                               ║
╠═══════════════════════════════════════════════════╣
║ Nearby Krawls                                     ║
║ ┌───────────────────────────────────────────────┐ ║
║ │ [ Krawl List Item / Card ]                    │ ║
║ │ Distance • Rating • Creator                   │ ║
║ └───────────────────────────────────────────────┘ ║
║ ┌───────────────────────────────────────────────┐ ║
║ │ [ Krawl List Item / Card ]                    │ ║
║ │ Distance • Rating • Creator                   │ ║
║ └───────────────────────────────────────────────┘ ║
║ ┌───────────────────────────────────────────────┐ ║
║ │ [ Krawl List Item / Card ]                    │ ║
║ │ Distance • Rating • Creator                   │ ║
║ └───────────────────────────────────────────────┘ ║
║ (Vertical Scroll)                                 ║
╠═══════════════════════════════════════════════════╣
║ [Map]  [Discover]  [My Krawls]      [Profile]    ║
║        (Active)                                   ║
╚═══════════════════════════════════════════════════╝
```

**Key Features:**
- Dedicated Krawl browsing interface
- **Featured Krawls** (horizontal scroll carousel)
- **Nearby Krawls** (vertical scrolling list)
- Search and filter specific to Krawls
- Card-based design for easy scanning

---

## 7. Krawl Detail Page (`/krawl/:krawlId`)

```
╔═══════════════════════════════════════════════════╗
║ [← Back] Krawl Title             [User Avatar]    ║
╠═══════════════════════════════════════════════════╣
║                                                   ║
║ [ Krawl Title - Large Heading ]                   ║
║                                                   ║
║ Created by: [@Username] [⭐ Reputation Badge]     ║
║ ★★★★☆ [Avg Krawl Rating]                          ║
║                                                   ║
║ [ Krawl Description ..............................║
║   ...................................................║
║   ............................................. ] ║
║                                                   ║
╠═══════════════════════════════════════════════════╣
║                                                   ║
║     ┌─────────────────────────────────┐          ║
║     │ Map Overview Showing Route      │          ║
║     │ & Stops (1→2→3→4→5)             │          ║
║     │         📍📍📍📍📍              │          ║
║     └─────────────────────────────────┘          ║
║                                                   ║
╠═══════════════════════════════════════════════════╣
║ Stops:                                            ║
║                                                   ║
║ 1️⃣ [Gem Name 1]                                   ║
║    Creator Note:                                  ║
║    [ Note Text ................................ ] ║
║    Lokal Secret:                                  ║
║    [ Secret Text .............................. ] ║
║                                                   ║
║ 2️⃣ [Gem Name 2]                                   ║
║    Creator Note:                                  ║
║    [ Note Text ................................ ] ║
║    Lokal Secret:                                  ║
║    [ Secret Text .............................. ] ║
║                                                   ║
║ 3️⃣ [Gem Name 3]                                   ║
║    ...                                            ║
║ (Scrollable List)                                 ║
║                                                   ║
╠═══════════════════════════════════════════════════╣
║  [ Download Krawl ]       [ Start Krawl ]         ║
╠═══════════════════════════════════════════════════╣
║ [Map]  [Discover]  [My Krawls]      [Profile]    ║
╚═══════════════════════════════════════════════════╝
```

**Key Features:**
- Complete Krawl information display
- **Ordered stops** with creator notes and Lokal Secrets
- Map preview of entire route
- Primary actions:
  - **Download Krawl** - Save for offline use
  - **Start Krawl** - Begin navigation
- Edit button visible if **user is creator**

---

## 8. Krawl Mode (Active Navigation State)

```
╔═══════════════════════════════════════════════════╗
║ Stop 3 of 5: [Current Gem Name]   [Exit Krawl]   ║
╠═══════════════════════════════════════════════════╣
║                                                   ║
║                  ┌───────────────────┐            ║
║                  │   Map Area        │            ║
║                  │   (Leaflet)       │            ║
║                  │                   │            ║
║              •   │  ╔═══╗            │            ║
║              │   │  ║ 3 ║ ← Current  │            ║
║         Route│   │  ╚═══╝   Stop     │            ║
║              │   │    ↑               │            ║
║              ●   │   You              │            ║
║           (User) │                   │            ║
║                  └───────────────────┘            ║
║                                                   ║
║ 📍 ETA: 5 min • 400m away                         ║
╠═══════════════════════════════════════════════════╣
║ ┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓ ║
║ ┃ Stop Details Card (Auto-appears on arrival)  ┃ ║
║ ┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫ ║
║ ┃ Your Note:                                    ┃ ║
║ ┃ [ Note Text ................................ ]┃ ║
║ ┃                                               ┃ ║
║ ┃ Lokal Secret:                                 ┃ ║
║ ┃ [ Secret Text .............................. ]┃ ║
║ ┃                                               ┃ ║
║ ┣━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┫ ║
║ ┃        [ ✓ Check Off & Go to Next Stop ]      ┃ ║
║ ┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛ ║
╚═══════════════════════════════════════════════════╝
```

**Key Features:**
- **Active navigation** to current stop
- Progress indicator (Stop X of Y)
- Map shows:
  - Route to current stop
  - User location marker
  - Next destination
- **ETA and distance** prominently displayed
- **Stop Details Card** auto-appears on arrival
- Features:
  - Creator's note
  - Lokal Secret (revealed on arrival)
  - Check-off to advance to next stop
- **Exit Krawl** button always accessible

---

## Navigation Patterns

### Bottom Navigation Bar

All main screens include a bottom navigation bar with 4 tabs:

| Tab | Icon | State Logic |
|-----|------|-------------|
| **Map** | 🗺️ | Always active |
| **Discover** | 🔍 | Always active |
| **My Krawls** | 📱 | Disabled when logged out |
| **Profile** | 👤 | Disabled when logged out |

### Authentication Flow

**Logged Out:**
- Limited browsing capability
- FAB (+) disabled
- "Login/Sign Up" button in header
- My Krawls and Profile tabs disabled

**Logged In:**
- Full functionality
- User avatar in header
- FAB (+) enabled
- All tabs active

---

## Design Principles Applied

1. **Mobile-First**: All layouts optimized for small screens
2. **Progressive Enhancement**: Core features work logged out, full features when authenticated
3. **Context Preservation**: Overlays don't hide the map completely
4. **Clear Hierarchy**: Primary actions are prominent (FAB, Start Krawl)
5. **Feedback Loops**: Duplicate detection, arrival notifications
6. **Offline-Ready**: Download functionality for Krawls

---

## Next Steps

- [ ] High-fidelity mockups with brand colors and typography
- [ ] Interaction prototypes for gesture navigation
- [ ] Accessibility annotations (ARIA labels, focus states)
- [ ] Responsive breakpoints for tablet/desktop views
- [ ] Animation specifications for transitions

