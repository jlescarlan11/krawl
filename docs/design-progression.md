# Krawl PWA - Design Progression

> **From Wireframes to Prototypes**: A comprehensive visual and interactive design journey for key screens

---

## 📐 Design Philosophy

This document outlines the visual and interactive design progression for key screens, building upon the initial wireframes. Each screen evolves through three distinct phases:

| Phase | Focus | Deliverable |
|-------|-------|-------------|
| **Low-Fidelity Wireframe** | Core layout structure | Basic boxes and placeholder elements |
| **Mid-Fidelity Mockup** | Specific UI elements, spacing, typography | Grayscale implementation with defined components |
| **High-Fidelity Prototype** | Full color palette, interactions, animations | Production-ready interactive design |

---

## 1. 🗺️ Home / Main Map View (`/`)

### 1.1 Low-Fidelity Wireframe

**Description**: Basic boxes for header, search, map, FAB, bottom nav. Differentiates logged-in/out states by enabled/disabled buttons.

**Focus**: Core layout structure.

---

### 1.2 Mid-Fidelity Mockup (Grayscale)

#### Header
- **Krawl wordmark** (left)
- **Login/Sign Up buttons** OR **User Avatar circle** (right)
- Uses defined font styles (`H4/Body`)
- Styling: `bg-gray-100`, `border-b`

#### Search/Filter
- Search input field with **[Search Icon]** (magnifying glass) and placeholder text
- Rounded corners (`rounded-md`)
- **Filter button** [Filter Icon] adjacent
- Styling: `p-2`, `m-2`, `bg-white`, `shadow-sm`

#### Map Area
- Large container holding the Leaflet map
- Map uses **grayscale tiles**
- **Clustered gem markers** shown as simple circles with numbers
- **Individual gems** as simple dots

#### Controls
- **Re-center button** [Crosshair Icon] (bottom-left)
- **FAB** [+ Icon] (bottom-right), circular, elevated `shadow-md`
- Disabled state is visually distinct (lower opacity `opacity-50`)

#### Bottom Nav
- Standard bar with 4 labeled icons:
  - [Map Icon]
  - [Compass Icon]
  - [Bookmark Icon]
  - [User Icon]
- Active tab has subtle background highlight (`bg-gray-200`)
- Disabled tabs have lower opacity
- Styling: `bg-gray-100`, `border-t`

**Focus**: Specific UI elements, spacing (using 8px scale), typography hierarchy, grayscale implementation.

---

### 1.3 High-Fidelity Prototype (Full Color & Interaction)

#### Header
- `bg-verde-700` (Forest Green #1b5e20)
- White **Krawl wordmark**
- White **Login/Sign Up** text OR **User Avatar** image

#### Search/Filter
- `bg-white`, `text-neutral-700` (Charcoal Gray #404040)
- Icons use `neutral-700`

#### Map Area
- **Full-color map tiles**

| Element | Styling | Interaction |
|---------|---------|-------------|
| **Clusters** | `bg-mango-400` (#ffca28) with `text-neutral-700` number, size varies with count | Tapping cluster smoothly animates zoom towards the cluster bounds |
| **Pending Gems** | Small `bg-neutral-300` (#d4d4d4) dots | — |
| **Verified Gems** | `bg-verde-700` (#1b5e20) map pins (custom icon) | Tapping pin smoothly opens Gem Detail Drawer from bottom |

#### Controls
- **Re-center button**: `bg-white` with `text-verde-700` icon
- **FAB**: `bg-mango-400` (#ffca28) with `text-neutral-700` icon, subtle shadow (`shadow-lg`)
- **Interaction**: Tapping FAB animates open the Add Gem modal

#### Bottom Nav
- `bg-white`, `border-t border-neutral-200`
- Icons are `text-neutral-500` (#737373)
- Active tab icon and label are `text-verde-700` (#1b5e20)
- **Interaction**: Tapping tabs smoothly transitions content (if applicable) or navigates

**Focus**: Applying "Lokal Verde" palette from `globals.css`, specific icon choices (Lucide React), interactive states (hover effects using CSS custom properties), animations (zoom, modal transitions using `--transition-*` variables).

---

## 2. 💎 Gem Detail Popup/Drawer

### 2.1 Low-Fidelity Wireframe

**Description**: Box sliding over map with placeholders for name, rating, image, description, tags, founder, buttons.

**Focus**: Content hierarchy and basic layout.

---

### 2.2 Mid-Fidelity Mockup (Grayscale)

#### Layout
- Card slides up from bottom
- Rounded top corners (`rounded-t-lg`)
- `bg-white`, `shadow-lg`
- Takes ~**70-80% of screen height**
- Map visible behind (dimmed overlay `bg-black/30`)

#### Header
- **Gem Name** (`text-xl font-semibold`)
- **Close button** [X Icon] top-right

#### Sub-Header
Row layout with:
- **Star rating component** ([Star Icon] × 5, filled/empty)
- **Vouch count text** ([Check Icon] 15 Vouches)
- **Status Badge** (Verified / Pending text in pill `rounded-full px-2 py-0.5 bg-gray-200 text-gray-700`)
- Spaced row using flexbox

#### Image
- Placeholder for carousel/image
- `aspect-video bg-gray-300 rounded-md`

#### Content Sections
Clear headings (`text-lg font-medium`) for:
- **Description**
- **Tags** (shown as pills: `rounded-full px-2 py-0.5 bg-gray-200 text-gray-700`)
- **Founder** (shown as `@username`)

Body text: `text-sm text-gray-700`  
Sections separated by dividers (`border-b`)

#### Actions
Row of icon buttons:
- **Add Photo** [Camera Icon]
- **Rate** [Star Icon]
- **Vouch** [Check Icon]
- **Report** [Flag Icon]

Buttons have clear touch targets (`p-2`)

**Focus**: Card structure, typography, spacing, clear sectioning, button placement, use of badges/pills.

---

### 2.3 High-Fidelity Prototype (Full Color & Interaction)

#### Layout
- Card is `bg-neutral-50` (#fafafa)
- Dim overlay `bg-black/50`

#### Header
- Name `text-neutral-700` (#404040)
- Close icon `text-neutral-500` (#737373)

#### Sub-Header
- **Stars**: `text-mango-400` (#ffca28) fill
- **Vouch count**: `text-verde-700` (#1b5e20)

**Status Badges**:

| Status | Styling |
|--------|---------|
| Verified | `bg-verde-700 text-white` (#1b5e20) |
| Pending | `bg-neutral-200 text-neutral-700` (#e5e5e5 / #404040) |
| Stale | `bg-mango-400 text-neutral-800` (#ffca28 / #262626) |
| Closed | `bg-error text-white` (#d32f2f) |

#### Image
- Displays actual user photos in a **swipeable carousel**

#### Content Sections
- **Headings**: `text-verde-700` (#1b5e20)
- **Body text**: `text-neutral-700` (#404040)
- **Tags**: `bg-sand-100 text-neutral-800` (#f5f5dc / #262626)
- **Founder** `@username` can be a link (`text-verde-700`)
- **Dividers**: `border-neutral-200` (#e5e5e5)

#### Actions
- Icons use `text-verde-700` (#1b5e20)
- **Interactions**:
  - **Vouch button**: Provides visual feedback (e.g., fills icon, briefly shows "+1"), then might disable if user already vouched
  - **Rate**: Opens rating modal
  - **Add Photo**: Opens file picker
  - **Report**: Opens report reason modal

#### Animation
Drawer slides up smoothly from the bottom on pin tap using `--transition-base` (200ms).

---

## 3. ➕ Add Gem Form (Modal)

### 3.1 Low-Fidelity Wireframe

**Description**: Modal box with map thumbnail, input fields for Name, Desc, Tags, Cancel/Submit buttons.

**Focus**: Basic form elements.

---

### 3.2 Mid-Fidelity Mockup (Grayscale)

#### Layout
- Centered modal window
- `bg-white rounded-lg shadow-xl p-6 w-11/12 max-w-md`
- Backdrop dim overlay (`bg-black/30`)

#### Header
- Title: **"Add New Gem"**
- Close button [X Icon]

#### Map Preview
- Small static map image showing selected pin location
- `rounded-md border`

#### Form
Standard form layout with labels above inputs:

| Field | Styling | Required |
|-------|---------|----------|
| **Name** | `border rounded-md p-2 w-full` | ✓ (asterisk *) |
| **Description** | `border rounded-md p-2 w-full h-24` (textarea) | — |
| **Tags** | Chips input `border rounded-md p-2 w-full` (multiple predefined or custom) | — |

#### Actions
- **Cancel button** (secondary): `bg-gray-200 text-gray-800 rounded-md px-4 py-2`
- **Submit button** (primary): `bg-gray-700 text-white rounded-md px-4 py-2`
- Aligned right

**Focus**: Modal structure, standard form element styling, clear visual distinction between primary/secondary actions.

---

### 3.3 High-Fidelity Prototype (Full Color & Interaction)

#### Layout
- Modal: `bg-neutral-50` (#fafafa)
- Overlay: `bg-black/50`

#### Header
- Title: `text-neutral-700` (#404040)

#### Map Preview
- Uses actual map tile snapshot

#### Form
- **Labels**: `text-neutral-700` (#404040)
- **Inputs**: `border-neutral-300 focus:border-verde-700 focus:ring-verde-700/50` (#d4d4d4 → #1b5e20)
- **Tags component**: Uses `bg-sand-100` (#f5f5dc) for selected tag chips

#### Actions
- **Cancel button**: `bg-neutral-200 text-neutral-700 hover:bg-neutral-300` (#e5e5e5 / #404040)
- **Submit button**: `bg-verde-700 text-white hover:bg-verde-800` (#1b5e20 → #145018)

#### Interaction
- Modal appears with a subtle **scale/fade-in animation**
- **Form validation errors** highlight relevant fields (e.g., red border, error message `text-red-600`)
- **Submit button** shows loading spinner during API call
- **Success** closes modal with animation
- **Failure** shows error message within modal

---

## 4. 🧭 Krawl Detail Page (`/krawl/:krawlId`)

### 4.1 Low-Fidelity Wireframe

**Description**: Standard page layout. Header, Title, Creator, Rating, Desc, Map Overview Box, List of Stops Box, Action Buttons Footer.

**Focus**: Page structure and main content blocks.

---

### 4.2 Mid-Fidelity Mockup (Grayscale)

#### Header
- **Back button** [< Icon]
- **Page Title** ("Krawl Details" or Krawl Name)
- **User Avatar**
- Styling: `bg-gray-100 border-b`

#### Content Area (`p-4`)

**Header Section**:
- **Krawl Title** (`text-2xl font-bold mb-1`)
- **Creator Info**: `@username` link, Reputation Badge ([Badge Icon] Kanto Guide) — `text-sm text-gray-600 mb-2`
- **Rating**: Star display, average rating text (`text-sm mb-3`)
- **Description**: Body text (`text-base mb-4`)

**Map Overview**:
- Container with static map image showing route
- `aspect-video bg-gray-300 rounded-md mb-4`

**Stops Section**:
- Heading: **"Stops"**
- Scrollable list container

Each **Stop Item**:
- Numbered (1., 2.)
- **Gem Name** (`font-semibold`)
- **Creator Note** (`text-sm text-gray-700 italic`)
- **Lokal Secret** (`text-sm text-gray-700`)
- Padding between items (`py-2 border-b`)

#### Footer Actions (Sticky or at bottom)
- **Download button** ([Download Icon] Download Offline)
- **Start Krawl button** (Primary style `bg-gray-700 text-white`)
- Styling: `p-4 bg-white border-t`

#### Bottom Nav
Standard component

**Focus**: Clear information hierarchy, readable typography, scrollable stops list, prominent action buttons.

---

### 4.3 High-Fidelity Prototype (Full Color & Interaction)

#### Header
- `bg-verde-700` (#1b5e20)
- White icons/text

#### Content Area
- `bg-neutral-50` (#fafafa)
- **Title**: `text-neutral-800` (#262626)
- **Creator link**: `text-verde-700` (#1b5e20)
- **Reputation badge**: Uses appropriate color/icon
- **Stars**: `text-mango-400` (#ffca28)
- **Description**: `text-neutral-700` (#404040)
- **Map**: Uses color tiles

**Stops List**:
- **Headings**: `text-verde-700` (#1b5e20)
- **Gem names**: `text-neutral-800 font-semibold` (#262626)
- **Notes/Secrets**: `text-neutral-600` (#525252)
- **Dividers**: `border-neutral-200` (#e5e5e5)

#### Footer Actions
- `bg-white border-t border-neutral-200`
- **Download button**: `border border-verde-700 text-verde-700 hover:bg-verde-50` (#1b5e20)
- **Start Krawl button**: `bg-verde-700 text-white hover:bg-verde-800` (#1b5e20 → #145018)

#### Interaction
- **Scrolling** the page might subtly shrink/fade the header
- **Tapping a Gem name** in the list could potentially highlight it on the map overview
- **Tapping Download** shows progress indicator
- **Tapping Start** transitions smoothly into Krawl Mode

---

## 5. 🚶 Krawl Mode (Overlay/State)

### 5.1 Low-Fidelity Wireframe

**Description**: Map view focused on route. Header showing progress. Box for arriving/showing stop details. Button to advance.

**Focus**: State change and core Krawl Mode elements.

---

### 5.2 Mid-Fidelity Mockup (Grayscale)

#### Header
- Minimal bar showing **"Stop X of Y: [Current Gem Name]"**
- **Exit button** [X Icon]
- Styling: `bg-gray-800 text-white p-2`

#### Map Area
- **Dominant map view**
- Route line is thick, clearly indicating path to next stop pin
- User location marker prominent
- Other map elements (unrelated gems) are hidden or heavily deemphasized (very low opacity)

#### Navigation Info
- Small overlay showing **ETA/Distance** to next stop (bottom-left)

#### Stop Detail Card (Appears on arrival)
- Slides up from bottom
- `bg-white rounded-t-lg shadow-lg p-4`
- Contains headings:
  - **"Your Note"**
  - **"Lokal Secret"**
- Body text
- **Check Off button** (primary style `bg-gray-700 text-white`)

**Focus**: Minimalist UI, map focus, clear route, automatic card appearance logic, single primary action ("Next").

---

### 5.3 High-Fidelity Prototype (Full Color & Interaction)

#### Header
- `bg-verde-700 text-white` (#1b5e20)

#### Map Area
- **Route line**: Uses bright `stroke-mango-400` (#ffca28) or `stroke-info` (#1976d2) for high visibility
- **Next stop pin**: Emphasized (larger, maybe pulsing slightly using CSS animations)
- **User location marker**: Standard blue dot

#### Navigation Info
- `bg-black/50 text-white rounded-md p-2` (uses `--radius-md`)

#### Stop Detail Card
- `bg-neutral-50` (#fafafa)
- **Headings**: `text-verde-700` (#1b5e20)
- **Notes/Secrets**: `text-neutral-700` (#404040)
- **Check Off button**: `bg-verde-700 text-white hover:bg-verde-800` (#1b5e20 → #145018)

#### Interaction
- **Card slides up smoothly** when GPS indicates arrival zone
- **Map zooms/pans** slightly to focus on the arrival area
- **Tapping "Check Off" button** provides visual feedback (e.g., checkmark animation)
- Card slides down
- Map updates to show route to the **next** stop

---

## 📊 Design Progression Summary

| Screen | Key Interactive Elements | Primary Color Usage (from globals.css) | Critical Animations |
|--------|-------------------------|-------------------|-------------------|
| **Home/Map** | Cluster zoom, pin tap, FAB modal | `verde-700` (nav), `mango-400` (clusters, FAB) | Zoom transitions, drawer slide-up (`--transition-base`) |
| **Gem Detail** | Vouch, Rate, Photo actions | `verde-700` (verified), `mango-400` (stars) | Drawer slide-up, interaction feedback |
| **Add Gem Form** | Form validation, tag selection | `verde-700` (submit, focus), `sand-100` (tags) | Modal scale/fade-in, loading states |
| **Krawl Detail** | Stop list, map preview, action buttons | `verde-700` (header, links, buttons) | Header shrink, highlight effects |
| **Krawl Mode** | GPS arrival, check-off actions | `verde-700` (header), `mango-400`/`info` (route) | Card slide-up, map pan/zoom, checkmark animation |

> **Color Reference:** All colors are implemented as CSS custom properties in `frontend/globals.css` and available through Tailwind utility classes.

---

## ✅ Design Checklist

### Visual Consistency
- [ ] All screens use "Lokal Verde" color palette consistently
- [ ] Typography hierarchy follows defined H1-H6 and Body styles
- [ ] 8px spacing scale applied throughout
- [ ] Icons use consistent style and sizing

### Interaction Design
- [ ] All touch targets minimum 44x44px
- [ ] Hover states defined for all interactive elements
- [ ] Loading states for async actions
- [ ] Error states and validation feedback

### Accessibility
- [ ] Color contrast meets WCAG AA standards
- [ ] Focus indicators visible for keyboard navigation
- [ ] Screen reader labels for icon-only buttons
- [ ] Form fields have associated labels

### Responsiveness
- [ ] Layouts adapt to different screen sizes
- [ ] Touch-friendly spacing on mobile
- [ ] Readable font sizes across devices
- [ ] Map controls positioned for thumb reach

---

## 📝 Changelog

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.1.0 | 2025-10-28 | **Updated all color references to match `globals.css` implementation:** Replaced generic color names (forest-green, charcoal-gray, sandy-beige, etc.) with accurate Tailwind classes and hex values from globals.css (verde-700, neutral-700, sand-100, mango-400, etc.); updated all component styling with specific hex color codes; added CSS custom property references for transitions and animations; updated Design Progression Summary table with accurate color tokens; added note about color implementation in globals.css | Design Team |
| 1.0.0 | 2025-10-28 | Initial design progression documentation | Design Team |

---

## 📚 Related Documents

- [Wireframe](./wireframe.md) - Low-fidelity wireframes
- [UI/UX Design System](./ui-ux-design-system.md) - Design system components
- [Brand Guidelines](./brand-guidelines.md) - Brand application standards
- [Mood Board](./mood-board.md) - Visual inspiration

---

*Document maintained by Design Team • Last reviewed: 2025-10-28*

