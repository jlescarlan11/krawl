# 🗺️ Sitemap: Krawl PWA

> **Purpose:** This sitemap outlines the primary pages/views, navigational structure, and user flows of the Krawl Progressive Web App, defining the information architecture and access patterns.

**Version:** 0.1.0-MVP  
**Last Updated:** 2025-10-31  
**Status:** Active  
**Owner:** Product Team

---

## 📊 Site Structure Overview
```
Krawl PWA
│
├─ 🗺️  /                     (Home / Main Map View)
├─ 🔍 /discover              (Discover Krawls)
├─ 📚 /my-krawls             (User's Krawls)
├─ 🚶 /krawl/:krawlId        (Krawl Detail View)
├─ 👤 /profile/:username     (User Profile View)
│
├─ 🔐 Authentication
│   ├─ /login               (Login Page)
│   ├─ /signup              (Sign Up Page)
│   └─ /forgot-password     (Password Reset Flow)
│       └─ /reset-password/:token
│
└─ ⚙️  /settings              (App Settings - Optional)
```

---

## 1. 🗺️ `/` (Home / Main Map View)

<div align="center">

**Core Experience**

*Interactive map (MapLibre GL JS) showing Gems (clustered/filtered by zoom)*

</div>

### 🎯 Primary Features
```
Map Display
├─ Interactive MapLibre GL JS map
├─ Gem markers (clustered)
├─ Zoom-based filtering
├─ User GPS location
└─ Krawl paths visualization
```

---

### 🔄 Conditional UI States

<table>
<tr>
<th width="50%">👤 Logged Out</th>
<th width="50%">✅ Logged In</th>
</tr>
<tr>
<td>

**Available:**
- View basic map
- Browse Gems (limited)
- Search functionality
- Discover tab access
- View Gem details

**Restricted:**
- Pin Gem (triggers login)
- Vouch/Rate (triggers login)
- My Krawls (not accessible)
- Create Krawls (not accessible)

**UI Elements:**
- Login/Sign Up prompts
- "Sign in to contribute" messages

</td>
<td>

**Full Access:**
- ✅ All map interactions
- ✅ Pin Gem (FAB visible)
- ✅ Vouch/Rate Gems
- ✅ Create/Edit Krawls
- ✅ Download offline
- ✅ User-specific areas

**UI Elements:**
- Pin Gem FAB
- Full action buttons
- Profile access
- My Krawls tab

</td>
</tr>
</table>

---

### 📦 Overlays & Components
```
Map View Components
│
├─ 🔍 Search Bar
│   └─ Searches Gems & Krawls
│
├─ 🎛️  Filter Controls
│   ├─ Category filters
│   ├─ Status filters
│   └─ Distance radius
│
├─ ➕ Pin Gem Button (FAB)
│   └─ Logged In Only
│
├─ 💎 Gem Detail Popup/Drawer
│   └─ Triggered by tapping Gem pin
│
├─ 🚶 Nearby Krawls Panel
│   └─ Optional slide-up drawer
│
└─ 🧭 Bottom Navigation Bar
    ├─ Map
    ├─ Discover
    ├─ Add (Pin Gem)
    ├─ My Krawls
    └─ Profile
```

---

## 2. 🔍 `/discover` (Discover Krawls)

<div align="center">

**Explore Curated Trails**

*Browse and discover Krawls created by the community*

</div>

### 📋 Page Features

| Section | Description |
|---------|-------------|
| **🌟 Featured Krawls** | Curated, high-quality Krawls |
| **📍 Nearby Krawls** | Krawls close to user location |
| **🔥 Popular Krawls** | Most followed/completed Krawls |
| **📂 Categories** | Krawls grouped by theme |

### 🎯 Content Categories
```
Krawl Categories
├─ 🍜 Food & Drinks
├─ 🏛️  History & Heritage
├─ 🎨 Art & Culture
├─ 🌳 Nature & Parks
├─ 🌃 Nightlife
└─ 🏙️  Urban Exploration
```

### 🔍 Functionality

- **Search/Filter** specific to Krawls
- **Sort Options** (Popular, New, Distance)
- **Card-based Layout** with preview info
- **Tap to View** → Leads to `/krawl/:krawlId`

### 🧭 Access

**Via:** Bottom Navigation → "Discover" tab

---

## 3. 📚 `/my-krawls` (User's Krawls)

<div align="center">

**Personal Krawl Library**

*Manage created and saved Krawls*

</div>

### 🔐 Access Control
```
🔒 Logged In Only
└─ Redirects to /login if not authenticated
```

**Via:** Bottom Navigation → "My Krawls" tab

---

### 📂 Page Sections

<table>
<tr>
<th>Section</th>
<th>Content</th>
<th>Actions</th>
</tr>
<tr>
<td><strong>✍️ Created by Me</strong></td>
<td>
- Krawls user has created<br>
- Draft Krawls<br>
- Published Krawls
</td>
<td>
- Edit<br>
- Delete<br>
- Publish/Unpublish
</td>
</tr>
<tr>
<td><strong>💾 Saved/Downloaded</strong></td>
<td>
- Krawls saved for later<br>
- Krawls downloaded offline<br>
- Manage offline storage
</td>
<td>
- Start Krawl<br>
- Remove from saved<br>
- Clear offline data
</td>
</tr>
<tr>
<td><strong>➕ Create New</strong></td>
<td colspan="2">
Prominent button to start creating a new Krawl
</td>
</tr>
</table>

### 🔗 Navigation

**Leads to:**
- `/krawl/:krawlId` (for viewing/editing own Krawls)
- Krawl creation flow

---

## 4. 🚶 `/krawl/:krawlId` (Krawl Detail View)

<div align="center">

**Individual Krawl Details**

*Everything you need to know before starting a Krawl*

</div>

### 📄 Page Structure
```
Krawl Detail View
│
├─ 📸 Header Section
│   ├─ Hero image/map preview
│   ├─ Krawl title
│   ├─ Creator info (username + tier)
│   └─ Rating & stats
│
├─ 📝 Description Section
│   └─ Full Krawl description
│
├─ 🗺️  Overview Map
│   ├─ All stops visualized
│   ├─ Path highlighted
│   └─ Interactive preview
│
├─ 📍 Stops List
│   ├─ Ordered list of Gems
│   ├─ Step numbers
│   ├─ Creator notes per stop
│   ├─ "Lokal Secrets" highlights
│   └─ Photos for each stop
│
├─ 📊 Metadata
│   ├─ Total distance
│   ├─ Estimated duration
│   ├─ Difficulty level
│   ├─ Category/tags
│   └─ Times completed
│
└─ 🎬 Action Buttons
    ├─ "Start Krawl" (Primary CTA)
    ├─ "Download Offline"
    ├─ "Save for Later"
    └─ "Rate Krawl" (after completion)
```

---

### 🔐 Creator-Only Features

**If viewing own Krawl:**
```
Additional Actions
├─ ✏️  Edit Krawl Details
├─ 📍 Add/Remove Stops
├─ 🔄 Reorder Gems
├─ 📝 Edit Lokal Secrets
├─ 🗑️  Delete Krawl
└─ 👁️  Toggle Visibility
```

---

### 🔗 Access Points

**From:**
- `/discover` (browsing Krawls)
- `/my-krawls` (user's library)
- `/profile/:username` (creator's profile)
- Map view (nearby Krawls panel)
- Search results

---

## 5. 👤 `/profile/:username` (User Profile View)

<div align="center">

**Community Member Profile**

*View contributions and reputation*

</div>

### 📊 Profile Structure
```
User Profile
│
├─ 🎭 Header Section
│   ├─ Avatar/Profile picture
│   ├─ Username
│   ├─ Join date
│   ├─ Bio (optional)
│   └─ Location (optional)
│
├─ 🏆 Reputation Section
│   ├─ Creator Score (calculated)
│   ├─ Tier Badge ("Kanto Guide", etc.)
│   ├─ Total contributions
│   │   ├─ Gems pinned
│   │   └─ Krawls created
│   └─ Community stats
│       ├─ Total vouches received
│       └─ Average rating
│
├─ 🚶 Public Krawls
│   ├─ List/grid of created Krawls
│   ├─ Krawl previews (card format)
│   └─ Link to full Krawl details
│
└─ ⚙️  Settings (Own Profile Only)
    └─ Link to /settings
```

---

### 🔗 Access Points

<table>
<tr>
<th>Scenario</th>
<th>Navigation</th>
</tr>
<tr>
<td><strong>Own Profile</strong></td>
<td>Bottom Navigation → "Profile" tab</td>
</tr>
<tr>
<td><strong>Other User</strong></td>
<td>
- Tap username on Gem details<br>
- Tap creator name on Krawl<br>
- Search for user
</td>
</tr>
</table>

---

## 6. 🔐 Authentication Pages

### 6.1. `/login` (Login Page)

**Standard login interface**
```
Login Form
│
├─ 📧 Email Input
├─ 🔒 Password Input
├─ 👁️  Show/Hide Password Toggle
├─ ✅ Remember Me (optional)
│
├─ 🔘 Login Button (Primary)
│
├─ 🔗 Links
│   ├─ → /signup ("Don't have an account?")
│   └─ → /forgot-password ("Forgot password?")
│
└─ 🔄 Redirects to / on success
```

---

### 6.2. `/signup` (Sign Up Page)

**User registration form**
```
Sign Up Form
│
├─ 👤 Username Input
│   └─ Availability check
│
├─ 📧 Email Input
│   └─ Validation
│
├─ 🔒 Password Input
│   ├─ Strength indicator
│   └─ Requirements checklist
│
├─ 🔒 Confirm Password Input
│
├─ ✅ Terms & Conditions checkbox
│
├─ 🔘 Sign Up Button (Primary)
│
├─ 🔗 Link → /login ("Already have an account?")
│
└─ 🔄 Redirects to / on success (auto-login)
```

---

### 6.3. `/forgot-password` (Password Reset Flow)

#### Initial Page
```
Password Reset Request
│
├─ 📧 Email Input
│   └─ "Enter your registered email"
│
├─ 🔘 Send Reset Link Button
│
├─ ✅ Success Message
│   └─ "Check your email for reset link"
│
└─ 🔗 Link → /login ("Back to login")
```

#### Reset Token Page

**`/reset-password/:token`**
```
New Password Form
│
├─ 🔒 New Password Input
│   └─ Strength indicator
│
├─ 🔒 Confirm New Password Input
│
├─ 🔘 Reset Password Button
│
├─ ✅ Success → Redirect to /login
│
└─ ❌ Invalid/Expired Token handling
```

---

## 7. ⚙️ `/settings` (App Settings)

<div align="center">

**Optional Feature**

*User preferences and account management*

</div>

### 🔐 Access

**Via:** Profile page → Settings icon/button

**Requires:** Logged in user

---

### 📋 Settings Sections
```
App Settings
│
├─ 👤 Account Settings
│   ├─ Change password
│   ├─ Update email
│   ├─ Edit profile info
│   └─ Delete account
│
├─ 🔔 Notification Preferences
│   ├─ Email notifications
│   ├─ In-app notifications
│   └─ Notification types toggle
│
├─ 📴 Offline Data Management
│   ├─ View cached Krawls
│   ├─ Storage usage indicator
│   ├─ Clear all offline data
│   └─ Auto-download settings
│
├─ 🎨 Appearance (Future)
│   ├─ Theme selection
│   └─ Display preferences
│
├─ 🌐 Language & Region (Future)
│   └─ Language selection
│
└─ 📖 About & Support
    ├─ App version
    ├─ Privacy policy
    ├─ Terms of service
    └─ Contact support
```

---

## 🎭 Special States & Overlays

### Not Separate Pages in Sitemap

These are implemented as modals/overlays rather than distinct routes:
```
Modal/Overlay Components
│
├─ 🧭 Krawl Mode
│   └─ State overlaid on map view (/)
│   └─ Active navigation interface
│   └─ Can also overlay /krawl/:krawlId
│
├─ ➕ Add Gem Form
│   └─ Modal/drawer over map view (/)
│   └─ Triggered by FAB button
│
├─ 💎 Gem Detail View
│   └─ Modal/drawer/bottom sheet
│   └─ Overlaid on map view (/)
│   └─ Triggered by tapping Gem marker
│
├─ ⚠️  Duplicate Warning
│   └─ Alert modal during Gem creation
│
└─ 📸 Photo Upload/Gallery
    └─ Modal overlay for image management
```

---

## 🧭 Bottom Navigation Structure
```
┌─────────────────────────────────────────────┐
│                                             │
│  🗺️       🔍      ➕       📚       👤      │
│  Map    Discover  Add   My Krawls Profile  │
│   /     /discover  (*)  /my-krawls   (**)  │
│                                             │
└─────────────────────────────────────────────┘

(*)  Triggers Add Gem modal (if logged in) or login prompt
(**) Links to /profile/:username (current user)
```

---

## 🔄 User Flow Examples

### Flow 1: New User Journey
```
1. Land on /
2. Browse map (limited)
3. Tap "Sign Up" → /signup
4. Register account
5. Redirected to /
6. Onboarding tooltip
7. Pin first Gem (FAB)
8. Explore /discover
```

### Flow 2: Starting a Krawl
```
1. Navigate to /discover
2. Browse featured Krawls
3. Tap Krawl card → /krawl/:krawlId
4. Review details
5. Tap "Start Krawl"
6. Krawl Mode activates (overlay on /)
7. Follow step-by-step
8. Complete → Rate Krawl
```

### Flow 3: Creating a Krawl
```
1. Navigate to /my-krawls
2. Tap "Create New Krawl"
3. Enter Krawl details form
4. Search & add Gems
5. Reorder stops
6. Add Lokal Secrets for each stop
7. Preview on map
8. Publish
9. View at /krawl/:krawlId
```

### Flow 4: Contributing a Gem
```
1. On map view (/)
2. Long-press location or tap FAB
3. Add Gem form modal opens
4. Fill details (name, description, tags)
5. Duplicate check runs
6. Either:
   ├─ Confirm unique → Save
   └─ View duplicates → Choose action
7. Gem appears as "pending" on map
8. Community vouches → Verified
```

---

## 📊 Page Access Matrix

<table>
<tr>
<th>Page</th>
<th>Logged Out</th>
<th>Logged In</th>
<th>Creator Only</th>
</tr>
<tr>
<td><strong>/</strong></td>
<td>✅ View Only</td>
<td>✅ Full Access</td>
<td>-</td>
</tr>
<tr>
<td><strong>/discover</strong></td>
<td>✅ Browse</td>
<td>✅ Browse + Save</td>
<td>-</td>
</tr>
<tr>
<td><strong>/my-krawls</strong></td>
<td>❌ Redirect to /login</td>
<td>✅ Full Access</td>
<td>-</td>
</tr>
<tr>
<td><strong>/krawl/:krawlId</strong></td>
<td>✅ View Only</td>
<td>✅ View + Actions</td>
<td>✅ Edit/Delete</td>
</tr>
<tr>
<td><strong>/profile/:username</strong></td>
<td>✅ View Public</td>
<td>✅ View Public</td>
<td>✅ Edit Own</td>
</tr>
<tr>
<td><strong>/login</strong></td>
<td>✅ Access</td>
<td>➡️ Redirect to /</td>
<td>-</td>
</tr>
<tr>
<td><strong>/signup</strong></td>
<td>✅ Access</td>
<td>➡️ Redirect to /</td>
<td>-</td>
</tr>
<tr>
<td><strong>/settings</strong></td>
<td>❌ Redirect to /login</td>
<td>✅ Full Access</td>
<td>-</td>
</tr>
</table>

---

## 🔍 SEO & Meta Information

### Suggested Page Titles
```
/                    → "Krawl | Discover Filipino Culture"
/discover            → "Discover Krawls | Krawl"
/my-krawls           → "My Krawls | Krawl"
/krawl/:krawlId      → "[Krawl Name] | Krawl"
/profile/:username   → "@[username] | Krawl"
/login               → "Login | Krawl"
/signup              → "Sign Up | Krawl"
/settings            → "Settings | Krawl"
```

---

<div align="center">

## 🗺️ Navigation Philosophy

**Simple • Intuitive • Community-Focused**
```
Core Principle
└─ Maximum 3 taps to any feature
   ├─ Map is always accessible
   ├─ Bottom nav for primary functions
   └─ Clear back navigation
```

---

### 🎯 Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| **Map as Home** | Discovery starts with location context |
| **Bottom Navigation** | Mobile-first, thumb-friendly access |
| **Modals for Actions** | Keep map context, reduce navigation |
| **Krawl Mode as Overlay** | Seamless transition to guided experience |
| **Flat Structure** | Minimize nesting, quick access |

---

*This sitemap provides the structural foundation for intuitive navigation and seamless user experience throughout the Krawl PWA.*

</div>

---

## 📝 Changelog

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0.0 | 2025-10-28 | Initial sitemap | Product Team |

---

## 📚 Related Documents

- [Wireframe](./wireframe.md) - Page layouts and wireframes
- [User Journey](./user-journey.md) - User flow through site
- [Content Plan](./content-plan.md) - Content for each page
- [UI/UX Design System](./ui-ux-design-system.md) - Navigation patterns
- [Scope of Work](./scope-of-work.md) - Feature pages

---

*Document maintained by Product Team • Last reviewed: 2025-10-28*