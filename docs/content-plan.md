# 📋 Krawl PWA - Content Inventory & Plan

> A comprehensive outline of required content types for each primary page/view of the Krawl PWA, based on the sitemap.

---

## 🗺️ 1. Home / Main Map View `/`

### Static Text

| Element | Content Example |
|---------|----------------|
| **Search Bar Placeholder** | `"Search Gems & Krawls in [Current City/Area]..."` |
| **Filter Button Label** | `"Filters"` |
| **Login/Sign Up Button** | `"Log In"` / `"Sign Up"` |
| **First-Time User Tooltip** | Explaining map interaction, pinning, and basic navigation |
| **Error Messages** | • `"Could not load Gems"`<br>• `"Location access denied"` |

### Static UI Elements

- **Map Controls**: Zoom In/Out, Center on Location
- **Pin Gem FAB**: Floating Action Button with `+` icon
- **Bottom Navigation**: Map, Discover, My Krawls, Profile (with icons/labels)

### Dynamic Content / UGC Data

| Type | Description |
|------|-------------|
| **Map Tiles** | Provided by map service (e.g., Google Maps via Leaflet provider) |
| **Gem Markers** | Displayed based on fetched Gem data (status, coordinates, category icon) |
| **Cluster Markers** | Dynamically generated numbers indicating Gem count |

### Images

- Icons for map controls, FAB, bottom navigation
- Map marker icons (Pending, Verified, Stale, Warning, Cluster)

---

## 💎 2. Gem Detail Popup/Drawer (Overlay on `/`)

### Static Text

**Section Labels:**
- `"Description"` • `"Photos"` • `"Ratings"` • `"Founder"` • `"Status"`

**Button Texts:**
- `"Vouch"` • `"Rate"` • `"Add Photo"` • `"Report Issue"` • `"View on Map"`

**Placeholder Text:**
- When no description exists
- When no photos are uploaded
- When no ratings are available

### Dynamic Content / UGC Data

| Content Type | Details |
|--------------|---------|
| **Gem Name** | Text |
| **Gem Description** | Text (user-generated) |
| **Gem Tags** | Text Pills/Chips (e.g., `#coffee` `#rooftop`) |
| **Founder Username** | Text with profile link |
| **Vouch Count & Status** | Text/Badge (e.g., "✓ 12 Vouches") |
| **Average Star Rating** | Visual Stars + Number (e.g., ⭐ 4.5) |
| **User Ratings/Reviews** | Username, Star Rating, Comment Text |
| **Warning Badge** | e.g., `"STALE"` `"CLOSED"` `"COMMUNITY WARNING"` |

### Images

- 📸 User-submitted Photos of the Gem
- 🔘 Icons for Vouch, Rate, Add Photo, Report buttons
- ⭐ Star rating icons

---

## 🔍 3. Discover Krawls `/discover`

### Static Text

| Element | Content |
|---------|---------|
| **Page Title** | `"Discover Krawls"` |
| **Section Headers** | • `"Featured Krawls"`<br>• `"Nearby"`<br>• `"Popular"`<br>• `"Categories"` |
| **Search Placeholder** | `"Search Krawls by name or tag..."` |
| **Filter Button** | `"Filters"` |
| **Empty State** | `"No Krawls found. Be the first to create one!"` |

### Dynamic Content / UGC Data

**Krawl Cards** display:
- Krawl Title
- Creator Username
- Average Rating (⭐)
- Number of Stops
- Brief Description Snippet

### Images

- 🖼️ Cover Image/Thumbnail for each Krawl Card
- 🔍 Icons for search, filters, ratings (stars)

---

## 📚 4. My Krawls `/my-krawls`

### Static Text

| Element | Content |
|---------|---------|
| **Page Title** | `"My Krawls"` |
| **Section Headers** | • `"Created by Me"`<br>• `"Saved/Downloaded"` |
| **Create Button** | `"+ Create New Krawl"` |
| **Empty State** | `"You haven't created any Krawls yet. Start exploring!"` |

### Dynamic Content / UGC Data

**Krawl Cards** display:
- Krawl Title
- Status Indicators (Public/Friends Only)
- Number of Stops
- Last Modified Date
- Average Rating

### Images

- 🖼️ Cover Image/Thumbnail for each Krawl Card
- ➕ Icon for "Create New Krawl" button

---

## 📍 5. Krawl Detail View `/krawl/:krawlId`

### Static Text

**Section Labels:**
- `"Created by"` • `"Description"` • `"Stops"` • `"Map Overview"` • `"Ratings"`

**Button Texts:**
- `"🚀 Start Krawl"`
- `"💾 Download Krawl"`
- `"⭐ Rate this Krawl"`
- `"✏️ Edit Krawl"` (if creator)

**Stop Numbering:**
- `"Stop 1:"` • `"Stop 2:"` • etc.

### Dynamic Content / UGC Data

| Content Type | Details |
|--------------|---------|
| **Krawl Title** | Text |
| **Krawl Description** | Text (user-generated) |
| **Creator Info** | Username & Reputation Tier/Badge |
| **Average Rating** | Visual Stars + Number |
| **List of Gems (Stops)** | • Gem Name<br>• Creator's Note for this stop<br>• Lokal Secret for this stop |
| **Map Overview** | Pins and route line visualization |
| **Krawl Ratings** | Username, Star Rating, Comment Text |

### Images

- 🗺️ Map Overview visual
- 📸 Primary photo for each Gem in stops
- 🔘 Icons for Start, Download, Rate, Edit buttons
- ⭐ Star rating icons

---

## 🎯 6. Krawl Mode (Active State/Overlay)

### Static Text

**Navigation Instructions:**
- `"Proceed to [Next Stop Name]"`
- Distance/ETA text (e.g., `"0.3 mi • 6 min walk"`)

**Stop Detail Labels:**
- `"Your Note:"` • `"Lokal Secret:"` • `"Photos:"`

**Button Texts:**
- `"✓ Check Off & Go to Next Stop"`
- `"🏁 Finish Krawl"`
- `"✕ Exit Krawl Mode"`

**Progress Indicator:**
- `"Stop 3 of 5"` with visual progress bar

### Dynamic Content / UGC Data

| Content Type | Details |
|--------------|---------|
| **Map Tiles** | Potentially offline-capable |
| **Route Line** | To the next stop |
| **User Location** | Real-time position marker |
| **Stop Details** | Gem Name, Creator's Note, Lokal Secret (cached for offline) |

### Images

- 📍 Map marker for user location
- 📸 Photos associated with current stop (cached)
- 🧭 Icons for navigation cues, check-off button

---

## 👤 7. User Profile View `/profile/:username`

### Static Text

**Labels:**
- `"Joined:"` • `"Krawls Created:"` • `"Total Stops:"` • `"Bio:"`

**Empty State:**
- `"This user hasn't created any public Krawls yet."`

### Dynamic Content / UGC Data

| Content Type | Details |
|--------------|---------|
| **Username** | Text |
| **User Bio** | Text (optional, user-editable) |
| **Join Date** | Text (e.g., "Joined March 2024") |
| **Creator Score/Tier** | Badge (🥉 Bronze, 🥈 Silver, 🥇 Gold) |
| **Public Krawls** | List/Cards of Krawls created by user |

### Images

- 👤 User Profile Picture/Avatar (optional)
- 🏆 Creator Tier Badge Icon
- 🖼️ Thumbnails for Krawl cards

---

## 🔐 8. Authentication Pages

### `/login` - Log In Page

**Static Text:**
- Page Title: `"Welcome Back"`
- Form Labels: `Username or Email` • `Password`
- Button: `"Log In"`
- Links: `"Don't have an account? Sign Up"` • `"Forgot Password?"`
- Error Messages: `"Invalid credentials"` • `"Account not found"`

---

### `/signup` - Sign Up Page

**Static Text:**
- Page Title: `"Join the Krawl Community"`
- Form Labels: `Username` • `Email` • `Password` • `Confirm Password`
- Button: `"Sign Up"`
- Password Requirements: `"At least 8 characters, 1 number, 1 special character"`
- Links: `"Already have an account? Log In"`
- Error Messages: `"Username already taken"` • `"Email already registered"`

---

### `/forgot-password` - Password Reset Request

**Static Text:**
- Page Title: `"Reset Your Password"`
- Instructions: `"Enter your email address and we'll send you a reset link"`
- Form Label: `Email`
- Button: `"Send Reset Link"`
- Success Message: `"Check your email for reset instructions"`

---

### `/reset-password/:token` - Password Reset

**Static Text:**
- Page Title: `"Create New Password"`
- Form Labels: `New Password` • `Confirm New Password`
- Button: `"Reset Password"`
- Success Message: `"Password updated successfully! Redirecting to login..."`

---

### Shared Auth Elements

**Images:**
- 🎨 Krawl Logo (prominently displayed)
- 🔒 Icons for password fields
- ✉️ Email icons

---

## ⚙️ 9. App Settings `/settings` (Optional)

### Static Text

**Page Title:** `"Settings"`

**Section Headers:**
- `"Account"` • `"Notifications"` • `"Privacy"` • `"Offline Data"` • `"About"`

**Account Settings:**
- `"Change Password"` • `"Email Preferences"` • `"Delete Account"`

**Notification Settings:**
- `"Email Notifications"` • `"Push Notifications"` • `"New Follower Alerts"`

**Offline Data:**
- `"Manage Downloaded Krawls"` • `"Clear Offline Data"` • `"Storage Used"`

**Buttons:**
- `"Save Changes"` • `"Delete Account"` • `"Clear Offline Data"` • `"Log Out"`

### Dynamic Content / UGC Data

| Content Type | Details |
|--------------|---------|
| **Downloaded Krawls** | List with Names, Size, Last Accessed |
| **Current Settings** | User preferences and toggle states |
| **Storage Info** | e.g., "Using 45 MB of 100 MB" |

### Images

- 🔧 Icons for different settings categories
- 💾 Storage indicators
- ⚠️ Warning icons for destructive actions

---

## 📝 Content Creation & Management Notes

### 🎨 UGC is Core
The primary content (Gems, Krawls, Photos, Ratings) is **user-generated**. The platform needs robust tools for users to create and manage this content effectively.

### ✍️ Static Text (Copywriting)
All instructional text, labels, button text, and error messages need:
- **Clear & Concise** language
- **Brand-Aligned** tone (Friendly, encouraging, authentic, helpful)
- **Accessibility** considerations (screen reader friendly)
- **Consistent** terminology across the app

### 🖼️ Placeholders
Design clear **placeholder states** for empty content:
- `"No Krawls found in your area. Be the first to create one!"`
- `"No photos yet. Add the first one!"`
- `"This Gem hasn't been rated yet. Be the first!"`

### 📸 Imagery Guidelines

**System Icons:**
- Should align with design system
- Consistent style (outline, filled, or two-tone)
- Appropriate sizing for different contexts

**User-Submitted Photos:**
- Key dynamic content requiring:
  - Proper storage infrastructure
  - Image optimization/compression
  - Moderation flags system
  - Responsive display handling
  - Offline caching capabilities

### 🌐 Localization Considerations
- All static text should be externalized for easy translation
- Consider cultural differences in iconography
- Date/time formatting should respect locale

### ♿ Accessibility
- All images require alt text
- Icons should have ARIA labels
- Form fields need proper labels and error associations
- Color contrast compliance (WCAG AA minimum)

---

## 📊 Content Types Summary

| Category | Examples | Ownership |
|----------|----------|-----------|
| **Static UI Text** | Button labels, Form labels, Section headers | Product Team |
| **Instructional Copy** | Tooltips, Help text, Error messages | Content Team |
| **UGC Text** | Gem descriptions, Krawl notes, Reviews | Users |
| **System Icons** | Navigation, Actions, Status indicators | Design Team |
| **UGC Media** | Gem photos, Profile pictures | Users |
| **Map Data** | Tiles, Routes, Markers | Map Provider + System |

---

## 🚀 Implementation Priority

1. **Phase 1 - Core Content** ✅
   - Home page UI text
   - Gem detail content structure
   - Basic auth page copy

2. **Phase 2 - Discovery & Social** 🔄
   - Discover page content
   - Profile page content
   - Rating/review templates

3. **Phase 3 - Advanced Features** 📋
   - Krawl Mode instructions
   - Settings page content
   - Advanced error states

4. **Phase 4 - Polish** ✨
   - Micro-copy refinement
   - Onboarding flow
   - Empty state illustrations

---

**Last Updated:** October 27, 2025  
**Version:** 1.0  
**Owner:** Krawl Product Team

