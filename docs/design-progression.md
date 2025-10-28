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
- `bg-forest-green`
- White **Krawl wordmark**
- White **Login/Sign Up** text OR **User Avatar** image

#### Search/Filter
- `bg-white`, `text-charcoal-gray`
- Icons use `charcoal-gray`

#### Map Area
- **Full-color map tiles**

| Element | Styling | Interaction |
|---------|---------|-------------|
| **Clusters** | `mango-yellow` background with `charcoal-gray` number, size varies with count | Tapping cluster smoothly animates zoom towards the cluster bounds |
| **Pending Gems** | Small `neutral-gray-light` dots | — |
| **Verified Gems** | `forest-green` map pins (custom icon) | Tapping pin smoothly opens Gem Detail Drawer from bottom |

#### Controls
- **Re-center button**: `bg-white` with `forest-green` icon
- **FAB**: `mango-yellow` with `charcoal-gray` icon, subtle shadow (`shadow-lg`)
- **Interaction**: Tapping FAB animates open the Add Gem modal

#### Bottom Nav
- `bg-white`, `border-t`
- Icons are `neutral-gray-medium`
- Active tab icon and label are `forest-green`
- **Interaction**: Tapping tabs smoothly transitions content (if applicable) or navigates

**Focus**: Applying "Lokal Verde" palette, specific icon choices, interactive states (hover effects on buttons using darker shades), animations (zoom, modal transitions).

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
- Card is `bg-off-white`
- Dim overlay `bg-black/50`

#### Header
- Name `text-charcoal-gray`
- Close icon `neutral-gray-medium`

#### Sub-Header
- **Stars**: `mango-yellow` fill
- **Vouch count**: `text-forest-green`

**Status Badges**:

| Status | Styling |
|--------|---------|
| Verified | `bg-forest-green text-white` |
| Pending | `bg-neutral-gray-light text-charcoal-gray` |
| Stale | `bg-mango-yellow text-charcoal-gray` |
| Closed | `bg-red-600 text-white` |

#### Image
- Displays actual user photos in a **swipeable carousel**

#### Content Sections
- **Headings**: `text-forest-green`
- **Body text**: `text-charcoal-gray`
- **Tags**: `bg-sandy-beige text-charcoal-gray`
- **Founder** `@username` can be a link (`text-forest-green`)
- **Dividers**: `border-neutral-gray-light`

#### Actions
- Icons use `forest-green`
- **Interactions**:
  - **Vouch button**: Provides visual feedback (e.g., fills icon, briefly shows "+1"), then might disable if user already vouched
  - **Rate**: Opens rating modal
  - **Add Photo**: Opens file picker
  - **Report**: Opens report reason modal

#### Animation
Drawer slides up smoothly from the bottom on pin tap.

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
- Modal: `bg-off-white`
- Overlay: `bg-black/50`

#### Header
- Title: `text-charcoal-gray`

#### Map Preview
- Uses actual map tile snapshot

#### Form
- **Labels**: `text-charcoal-gray`
- **Inputs**: `border-neutral-gray-light focus:border-forest-green focus:ring-forest-green/50`
- **Tags component**: Uses `sandy-beige` for selected tag chips

#### Actions
- **Cancel button**: `bg-neutral-gray-light text-charcoal-gray hover:bg-neutral-gray-medium`
- **Submit button**: `bg-forest-green text-white hover:bg-forest-green-dark`

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
- `bg-forest-green`
- White icons/text

#### Content Area
- `bg-off-white`
- **Title**: `text-charcoal-gray`
- **Creator link**: `text-forest-green`
- **Reputation badge**: Uses appropriate color/icon
- **Stars**: `mango-yellow`
- **Description**: `text-charcoal-gray`
- **Map**: Uses color tiles

**Stops List**:
- **Headings**: `text-forest-green`
- **Gem names**: `text-charcoal-gray font-semibold`
- **Notes/Secrets**: `text-neutral-gray-dark`
- **Dividers**: `border-neutral-gray-light`

#### Footer Actions
- `bg-white border-t`
- **Download button**: `border border-forest-green text-forest-green hover:bg-forest-green/10`
- **Start Krawl button**: `bg-forest-green text-white hover:bg-forest-green-dark`

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
- `bg-forest-green text-white`

#### Map Area
- **Route line**: Uses bright `mango-yellow` or a distinct vibrant blue for high visibility
- **Next stop pin**: Emphasized (larger, maybe pulsing slightly)
- **User location marker**: Standard blue dot

#### Navigation Info
- `bg-black/50 text-white rounded-md p-1`

#### Stop Detail Card
- `bg-off-white`
- **Headings**: `text-forest-green`
- **Notes/Secrets**: `text-charcoal-gray`
- **Check Off button**: `bg-forest-green text-white hover:bg-forest-green-dark`

#### Interaction
- **Card slides up smoothly** when GPS indicates arrival zone
- **Map zooms/pans** slightly to focus on the arrival area
- **Tapping "Check Off" button** provides visual feedback (e.g., checkmark animation)
- Card slides down
- Map updates to show route to the **next** stop

---

## 📊 Design Progression Summary

| Screen | Key Interactive Elements | Primary Color Usage | Critical Animations |
|--------|-------------------------|-------------------|-------------------|
| **Home/Map** | Cluster zoom, pin tap, FAB modal | Forest green (nav), Mango yellow (clusters, FAB) | Zoom transitions, drawer slide-up |
| **Gem Detail** | Vouch, Rate, Photo actions | Forest green (verified), Mango yellow (stars) | Drawer slide-up, interaction feedback |
| **Add Gem Form** | Form validation, tag selection | Forest green (submit, focus) | Modal scale/fade-in, loading states |
| **Krawl Detail** | Stop list, map preview, action buttons | Forest green (header, links, buttons) | Header shrink, highlight effects |
| **Krawl Mode** | GPS arrival, check-off actions | Forest green (header), Mango yellow (route) | Card slide-up, map pan/zoom, checkmark animation |

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

*Last Updated: Design Progression Documentation*

