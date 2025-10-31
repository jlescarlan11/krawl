# 📋 Scope of Work: Krawl PWA (MVP)

> **Purpose:** This document defines the complete scope of work for the Krawl MVP, detailing all in-scope and out-of-scope features, pages, integrations, and development phases.

**Version:** 0.1.0-MVP  
**Last Updated:** 2025-10-31  
**Status:** Active  
**Owner:** Project Lead

---

## 📋 Table of Contents

1. [Project Overview](#1--project-overview)
2. [In-Scope Pages / Views](#2--in-scope-pages--views-pwa)
3. [In-Scope Features](#3--in-scope-features-mvp)
4. [Integrations](#4--integrations-in-scope)
5. [Out-of-Scope](#5--out-of-scope-for-mvp)
6. [Feature Priority Matrix](#-feature-priority-matrix)
7. [MVP Success Criteria](#-mvp-success-criteria)
8. [Development Approach](#-development-approach)

---

## 1. 🎯 Project Overview

**Krawl** is a community-driven Progressive Web App (PWA) designed to map authentic, hyperlocal Filipino culture. It allows users to discover, pin, and share local points of interest ("**Gems**") and create guided, step-by-step trails ("**Krawls**") with insider notes. 

The core "**Krawl Mode**" feature provides an interactive, location-aware navigation experience, available offline.

### 📦 MVP Scope
- **Timeline:** ~3 months
- **Launch Area:** Initial hub (e.g., Cebu City)
- **Tech Stack:** Next.js, Spring Boot, PostgreSQL/PostGIS, MapLibre GL JS

> **Goal:** Deliver a focused MVP that validates the core Krawl concept and provides immediate value to users in the initial launch area.

---

## 2. 📱 In-Scope Pages / Views (PWA)

The MVP will include the following primary user interface views:

### 2.1. 🗺️ Map View (`/`)

**Description:** The primary application interface, showing Gems on an interactive map. This is the default view upon app load.

**Details:**
- Displays Gems using MapLibre GL JS markers
- Incorporates clustering at lower zoom levels
- Zoom-dependent visibility logic
- Standard map controls (zoom, pan, locate user)
- Integrated search bar trigger and filter options
- UI element (e.g., FAB) to initiate Gem pinning
- Adaptive UI based on user login status

---

### 2.2. 💎 Gem Detail View

**Description:** A view (modal, panel, or bottom sheet) presenting comprehensive information about a specific Gem selected from the map or search results.

**Details:**

| Element | Description |
|---------|-------------|
| **Basic Info** | Name, description, tags |
| **Media** | User-uploaded photos (gallery/carousel) |
| **Community Data** | Average star rating, Vouch count |
| **Status** | Verification status (pending/verified) |
| **Attribution** | Founder username |
| **Warnings** | Automated badges (Stale, Closed, Community Warning) |
| **Actions** | "Vouch", "Rate", "Add Photo" buttons |

---

### 2.3. ➕ Add Gem Form

**Description:** A form (modal or panel) used to input details for a new Gem.

**Details:**
```
Trigger: Map View (after location selection)

Fields:
├─ Name (required)
├─ Description (optional)
├─ Tags (multi-select)
└─ Coordinates (auto-captured)

Actions:
├─ Submit
└─ Cancel
```

---

### 2.4. ⚠️ Duplicate Warning View

**Description:** A modal displayed during the "Add Gem" process if the backend identifies potential duplicates.

**Details:**

**Displays:**
- Clear warning message
- List of potential duplicate Gems nearby
  - Name
  - Distance
  - Founder
  - Vouch count

**Options:**
- 🗺️ "View on Map" (for each duplicate)
- ➕ "Add to This Gem" (future feature placeholder)
- ✅ "This is Different" (proceed with saving)
- ❌ "Cancel"

> Styled as an alert modal

---

### 2.5. 🚶 Krawl Detail View

**Description:** A dedicated view showing the full information for a selected Krawl before a user decides to follow it.

**Details:**
```
Header Section
├─ Krawl title
├─ Description
└─ Creator info (username + reputation tier)

Stops Section
├─ List of Gems in step_order
└─ Creator notes ("Lokal Secrets") for each

Map Section
└─ Overview map with path and Gem locations

Actions
├─ "Start Krawl" (primary)
├─ "Download Offline"
└─ "Rate Krawl"
```

---

### 2.6. 🧭 Krawl Mode View

**Description:** The dedicated interface used while actively navigating a Krawl.

**Details:**

| Feature | Implementation |
|---------|----------------|
| **Map Display** | Focused on Krawl path only |
| **Next Stop** | Highlighted on map |
| **Navigation** | Basic guidance (distance/direction) |
| **Location Triggers** | Auto-display stop detail cards on arrival |
| **Stop Cards** | Creator notes, secrets, and photos |
| **Controls** | "Next Stop" button, Exit session |

> **Key Feature:** Location-triggered content delivery as you explore

---

### 2.7. 🔐 Authentication Views (`/login`, `/signup`)

**Description:** Standard forms for user account creation and login.

**Details:**

#### Signup Fields
- Username
- Email
- Password

#### Login Fields
- Email
- Password
- "Forgot Password" link

**Implementation:** Can be modals overlaid on the map or separate pages

**Validation:** Basic client-side validation

**Password Reset:** Email reset link functionality

---

### 2.8. 👤 User Profile View (`/profile/{username}`)

**Description:** A public page displaying a user's basic information and contributions.

**Details:**
```
Profile Header
├─ Username
├─ Optional bio
└─ Join date

Reputation Section
├─ Creator Score (calculated)
└─ Tier Badge (e.g., "Kanto Guide")

Contributions
└─ List of public Krawls created
```

---

### 2.9. 🔍 Discover/Explore Krawls View

**Description:** A dedicated section, likely accessible via main navigation (e.g., bottom bar), for browsing and discovering Krawls.

**Details:**

**Curated Lists:**
- 🌟 Featured Krawls
- 📍 Nearby Krawls
- 🔥 Popular Krawls

**Theme Categories:**
- 🍜 Food
- 🏛️ History
- 🎨 Art
- *...and more*

> Facilitates Krawl discovery separate from the main Gem map

---

### 2.10. 📚 My Krawls View

**Description:** A private section for logged-in users to manage their Krawls.

**Details:**
```
My Creations
├─ Krawls I created
├─ Edit option
└─ Delete option

My Library
├─ Saved Krawls
└─ Downloaded Krawls (offline)
```

---

## 3. ✨ In-Scope Features (MVP)

### 3.1. 🔐 User Authentication
```
✅ Email/password registration
✅ Secure login
✅ JWT session management
✅ Password reset (email link)
```

---

### 3.2. 🗺️ Map Display & Interaction

| Feature | Description |
|---------|-------------|
| **Gem Rendering** | MapLibre GL JS markers from backend API |
| **Clustering** | MapLibre GL JS clustering for density management |
| **Zoom Logic** | Show/hide markers based on zoom level |
| **GPS Location** | Display user's current position |
| **Pending Gems** | Hidden when zoomed out |

---

### 3.3. 💎 Gem Management

**Full Workflow:**
```
1. Map Selection
   └─ User selects location on map

2. Add Gem Form
   └─ Input name, description, tags

3. Backend Validation
   └─ Data validation checks

4. Duplicate Check
   ├─ Spatial query (PostGIS)
   └─ Name similarity check

5. Duplicate Warning UI
   └─ Display if matches found

6. Save to Database
   ├─ status = 'pending'
   ├─ vouch_count = 0
   └─ founder_id = current user
```

**Additional Features:**
- Display Gem details from API
- Photo upload capability (≥1 photo per Gem)
- Cloud storage integration (AWS S3/Cloudinary)

---

### 3.4. 🚶 Krawl Management

**Core Functionality:**

| Action | Implementation |
|--------|----------------|
| **Create Krawl** | Title, description, creator ID, visibility |
| **Add Gems** | Search/select existing Gems interface |
| **Reorder Stops** | Drag-and-drop or similar UI for step_order |
| **Add Notes** | "Lokal Secrets" for each step (krawl_item) |
| **Display Details** | Ordered list of stops with notes |

---

### 3.5. 🧭 Krawl Mode

**Interactive Navigation Features:**
```
Session Management
├─ Initiate Krawl Mode
└─ Exit session

Map Display
├─ Focused view of Krawl path
└─ Highlighted next stop

Navigation
└─ Basic point-to-point guidance
    ├─ Distance to next stop
    └─ Direction indicator

Location Triggers
└─ GPS proximity detection
    └─ Auto-display stop detail cards

Content Display
├─ Cached creator notes
├─ Photos
└─ Lokal Secrets

Controls
├─ "Next Stop" (manual advance)
└─ Exit button
```

> **Note:** No turn-by-turn voice navigation in MVP

---

### 3.6. 📴 Offline Functionality

**Download System:**
```
"Download Krawl" Action
│
├─ Cache Krawl Data (JSON)
│   └─ To IndexedDB/localStorage
│
└─ Cache Map Tiles
    └─ Using MapLibre GL JS with MapTiler tiles
```

**Offline Operation:**
- ✅ Krawl Mode works with cached data
- ✅ Map tiles render offline
- ✅ Creator notes/photos accessible
- ✅ Clear cache mechanism

> **Critical Feature:** Ensures reliability in areas with inconsistent connectivity

---

### 3.7. 👥 Community & Quality (Basic Implementation)

#### Vouching System
```
User Action: Click "Vouch" button
    ↓
API Call: Increment vouch_count
    ↓
Backend Logic: Check threshold (≥3)
    ↓
Auto-Update: status = 'verified'
```

#### Rating System

| Type | Implementation |
|------|----------------|
| **Gem Rating** | 1-5 stars via API |
| **Krawl Rating** | 1-5 stars via API |
| **Average Calculation** | Backend computation |
| **Display** | Show on detail views |

#### Creator Reputation
```
Creator Score Calculation
└─ Average rating of public Krawls

Display Locations
├─ User Profile
└─ Krawl Detail View (creator info)

Tier Badges
└─ e.g., "Kanto Guide", "Local Legend"
```

#### Reporting System

**"Report Issue" Button**
```
User Selection
├─ 📍 Closed
├─ 🚫 Spam
└─ ⚠️ Inaccurate

Backend Action
└─ Increment report count
    └─ If threshold met:
        ├─ lifecycleStatus = 'flagged'
        └─ Hide from general view
```

#### Staleness Detection
```
Backend Logic
└─ Check verification_timestamp
    └─ If old (or never verified):
        └─ Mark as "STALE"

Frontend Display
└─ Show "STALE" badge
```

---

## 4. 🔌 Integrations (In Scope)

| Integration | Technology | Purpose |
|-------------|------------|---------|
| **🗺️ Mapping Library** | MapLibre GL JS | Interactive maps, clustering, offline tiles |
| **🌍 Map Tiles** | MapTiler (Vector Tiles) | Base map layer (free tier) |
| **📍 Geospatial Database** | PostgreSQL + PostGIS | Store coordinates, spatial queries |
| **🔐 Authentication** | Spring Security + JWT | Email/password auth, session management |
| **📸 Cloud Storage** | AWS S3 / Cloudinary | User-uploaded Gem photos (free tier) |

---

## 5. 🚫 Out-of-Scope (for MVP)

### ❌ Not Included in Initial Launch

<details>
<summary><strong>🔍 Advanced Search/Filtering</strong></summary>

- Complex filtering combinations
- Natural language search
- Advanced query builders
</details>

<details>
<summary><strong>👥 Social Features</strong></summary>

- Following users
- Commenting on Krawls/Gems
- Direct messaging
- Friend systems
- Social feeds
</details>

<details>
<summary><strong>🎮 Advanced Gamification</strong></summary>

- Detailed points system beyond Creator Score
- Complex badge systems
- Leaderboards
- Achievement tracking
</details>

<details>
<summary><strong>🚗 Turn-by-Turn Navigation</strong></summary>

- Voice guidance
- Complex route optimization
- Real-time traffic integration
</details>

<details>
<summary><strong>🤝 Real-time Collaboration</strong></summary>

- Multiple users editing same Krawl
- Live updates
- Collaborative mapping
</details>

<details>
<summary><strong>🛠️ Admin Dashboard</strong></summary>

- Comprehensive content moderation tools
- User management interface
- Analytics dashboard
- Queue management system
</details>

<details>
<summary><strong>💼 "Claim Your Gem" Full Feature Set</strong></summary>

- Payment integration
- Detailed analytics dashboard
- Advanced "Lokal Update" features
- Business subscription management
</details>

<details>
<summary><strong>📱 Native Mobile Apps</strong></summary>

- iOS app
- Android app
- Platform-specific features
</details>

<details>
<summary><strong>🤖 Advanced Recommendation Engine</strong></summary>

- Collaborative filtering
- Machine learning recommendations
- Personalized discovery algorithms
</details>

<details>
<summary><strong>🌐 Internationalization (i18n)</strong></summary>

- Multiple language support in UI
- Full localization (l10n)

> **Note:** App interface primarily in English, though user content can be Filipino/Taglish
</details>

<details>
<summary><strong>♿ Extensive Accessibility Audit</strong></summary>

- Full WCAG compliance audit
- Screen reader optimization

> **Note:** Basic accessibility considerations included
</details>

<details>
<summary><strong>🔒 API Rate Limiting / Advanced Security</strong></summary>

- Complex throttling mechanisms
- DDoS protection
- Advanced security features

> **Note:** Basic security measures included
</details>

<details>
<summary><strong>🔔 Push Notifications</strong></summary>

- Native push notifications
- Real-time alerts
- Notification preferences
</details>

---

## 📊 Feature Priority Matrix
```
┌─────────────────────────────────────────────────────┐
│                                                     │
│  High Priority (MVP Core)                           │
│  ├─ 🗺️  Map Display & Interaction                   │
│  ├─ 💎 Gem Management                               │
│  ├─ 🚶 Krawl Management                             │
│  ├─ 🧭 Krawl Mode                                   │
│  └─ 📴 Offline Functionality                        │
│                                                     │
│  Medium Priority (MVP Essential)                    │
│  ├─ 🔐 User Authentication                          │
│  ├─ 👥 Basic Community Features                    │
│  └─ ⚠️  Quality Control Systems                     │
│                                                     │
│  Low Priority (Post-MVP)                            │
│  ├─ 🔍 Advanced Search                              │
│  ├─ 👥 Social Features                              │
│  ├─ 🎮 Gamification                                 │
│  └─ 💼 Business Features                            │
│                                                     │
└─────────────────────────────────────────────────────┘
```

---

## 🎯 MVP Success Criteria

| Metric | Target | Notes |
|--------|--------|-------|
| **✅ Core Features** | 100% functional | All in-scope features working |
| **🗺️ Map Performance** | Smooth interaction | No lag with 1000+ Gems |
| **📴 Offline Reliability** | 100% functional | Krawl Mode works without internet |
| **👥 User Onboarding** | <2 minutes | From landing to first Gem pinned |
| **🚶 Krawl Mode UX** | Intuitive navigation | No tutorial needed |
| **🐛 Critical Bugs** | Zero | All blocking issues resolved |

---

## 🚀 Development Approach

### Phase 1: Foundation (Weeks 1-2)
```
├─ Repository setup
├─ Tech stack configuration
├─ Design system basics
└─ CI/CD pipeline
```

### Phase 2: Core Build (Weeks 3-6)
```
├─ Authentication
├─ Map display
├─ Gem management
└─ Krawl creation
```

### Phase 3: Community (Weeks 7-8)
```
├─ Vouching system
├─ Rating system
└─ Reporting system
```

### Phase 4: Krawl Mode (Weeks 9-10)
```
├─ Offline download
├─ GPS navigation
└─ Location triggers
```

### Phase 5: Polish (Week 11)
```
├─ Testing
├─ Bug fixes
└─ Performance optimization
```

### Phase 6: Launch (Week 12)
```
├─ Content seeding
├─ User onboarding
└─ Go live
```

---

<div align="center">

## 🎉 Deliverable

**A focused, functional MVP that validates the core Krawl concept and provides immediate value to users in the initial launch area.**

---

### 💡 Post-MVP Roadmap

Subsequent phases will build upon this foundation with:
- Enhanced social features
- Advanced gamification
- Business tools expansion
- Native mobile apps
- International markets

---

*Built for the Philippines, by Filipinos, celebrating local culture one Krawl at a time.*

</div>

---

## 📝 Changelog

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0.0 | 2025-10-28 | Initial scope of work document | Project Lead |

---

## 📚 Related Documents

- [Project Brief](./project-brief.md) - High-level project overview
- [Project Proposal](./project-proposal.md) - Business case and proposal
- [Milestone and Timeline](./milestone-and-timeline.md) - Development schedule
- [User Stories](./user-story.md) - Detailed feature requirements
- [System Architecture](./system-architecture.md) - Technical architecture
- [API Documentation](./api-documentation.md) - API specifications

---

*Document maintained by Project Lead • Last reviewed: 2025-10-28*