# 🎨 Krawl - UI/UX Design System
## *Building Consistency, Usability, and Brand Cohesion*

<div align="center">

**"Lokal Verde" Theme**

*Authenticity • Community • Discovery*

</div>

---

## 1. 📖 Introduction

This document outlines the foundational elements and components of the **Krawl design system**. It ensures consistency, usability, and a cohesive brand experience across the Progressive Web App (PWA), reflecting our **"Lokal Verde"** theme and core values of **authenticity**, **community**, and **discovery**.

---

## 2. 🎯 Core Foundations

### 2.1. 🎨 Color Palette: "Lokal Verde"

<table>
<tr>
<th>Category</th>
<th>Color</th>
<th>Hex</th>
<th>Usage</th>
</tr>
<tr>
<td rowspan="2"><strong>🌲 Primary</strong></td>
<td>Forest Green</td>
<td><code>#2E7D32</code></td>
<td>Key actions, headers, active states</td>
</tr>
<tr>
<td>Primary Dark</td>
<td><code>#1B5E20</code></td>
<td>Hover/active for Primary</td>
</tr>
<tr>
<td><strong>🏖️ Secondary</strong></td>
<td>Sandy Beige</td>
<td><code>#F5F5DC</code></td>
<td>Card backgrounds, secondary surfaces</td>
</tr>
<tr>
<td rowspan="2"><strong>🥭 Accent</strong></td>
<td>Mango Yellow</td>
<td><code>#FFCA28</code></td>
<td>Highlights, CTAs, icons, map paths</td>
</tr>
<tr>
<td>Accent Dark</td>
<td><code>#FFA000</code></td>
<td>Hover/active for Accent</td>
</tr>
<tr>
<td><strong>📄 Background</strong></td>
<td>Off-White</td>
<td><code>#FAFAFA</code></td>
<td>Main page background</td>
</tr>
<tr>
<td rowspan="2"><strong>📝 Text</strong></td>
<td>Text Primary</td>
<td><code>#424242</code> Charcoal Gray</td>
<td>Main body text, headings</td>
</tr>
<tr>
<td>Text Secondary</td>
<td><code>#757575</code> Medium Gray</td>
<td>Subtitles, helper text, disabled text</td>
</tr>
<tr>
<td><strong>📐 Border</strong></td>
<td>Light Gray</td>
<td><code>#E0E0E0</code></td>
<td>Subtle borders, dividers</td>
</tr>
<tr>
<td><strong>🚫 Disabled</strong></td>
<td>Disabled Gray</td>
<td><code>#BDBDBD</code></td>
<td>Disabled elements background/text</td>
</tr>
</table>

#### 🚦 Semantic Colors

| Purpose | Color | Hex | Usage |
|---------|-------|-----|-------|
| **❌ Error** | Red | `#D32F2F` | Error messages, destructive actions |
| **⚠️ Warning** | Orange | `#FFA000` | Warnings, alerts (overlaps Accent Dark) |
| **✅ Success** | Green | `#388E3C` | Success messages, confirmations |

> **⚠️ Accessibility:** Ensure all text/background combinations meet WCAG AA contrast requirements

---

### 2.2. 📝 Typography

**Primary Font:** Inter (Fallback: system sans-serif)

#### Type Scale

<table>
<tr>
<th>Class</th>
<th>Size</th>
<th>Usage</th>
<th>Line Height</th>
</tr>
<tr>
<td><code>text-xs</code></td>
<td>12px</td>
<td>Fine print, micro labels</td>
<td>1.4</td>
</tr>
<tr>
<td><code>text-sm</code></td>
<td>14px</td>
<td>Secondary body, labels</td>
<td>1.5</td>
</tr>
<tr>
<td><code>text-base</code></td>
<td>16px</td>
<td><strong>Primary body</strong></td>
<td><strong>1.5</strong></td>
</tr>
<tr>
<td><code>text-lg</code></td>
<td>18px</td>
<td>Subheadings</td>
<td>1.4</td>
</tr>
<tr>
<td><code>text-xl</code></td>
<td>20px</td>
<td>H3, Card titles</td>
<td>1.3</td>
</tr>
<tr>
<td><code>text-2xl</code></td>
<td>24px</td>
<td>H2, Section titles</td>
<td>1.3</td>
</tr>
<tr>
<td><code>text-3xl</code></td>
<td>30px</td>
<td>H1, Page titles</td>
<td>1.2</td>
</tr>
<tr>
<td><code>text-4xl</code></td>
<td>36px</td>
<td>Hero text (rare)</td>
<td>1.2</td>
</tr>
</table>

#### Font Weights
```
Regular (400)    →  Body text, default
Medium (500)     →  Labels, emphasis
Semibold (600)   →  Headings, buttons
Bold (700)       →  Strong emphasis, H1
```

#### Default Styles

| Element | Style |
|---------|-------|
| **Body Text** | `text-base`, Regular (400), Charcoal Gray (#424242) |
| **Headings** | Semibold (600) or Bold (700), Charcoal Gray (#424242) |
| **Secondary Text** | `text-sm`, Regular (400), Medium Gray (#757575) |
| **Labels** | `text-sm`, Medium (500), Medium Gray (#757575) |

---

### 2.3. 📏 Spacing System (8px Base Grid)

**Base Unit:** 8px

Use multiples of 4px and 8px for margins, padding, and gaps.

#### Spacing Scale
```
space-1    →    4px     (0.5 unit)
space-2    →    8px     (1 unit)
space-3    →   12px     (1.5 units)
space-4    →   16px     (2 units)
space-6    →   24px     (3 units)
space-8    →   32px     (4 units)
space-10   →   40px     (5 units)
space-12   →   48px     (6 units)
space-16   →   64px     (8 units)
```

**Apply consistently for:**
- Layout spacing
- Component internal padding
- Element margins
- Grid/flex gaps

---

### 2.4. ⚪ Border Radius

| Size | Class | Value | Usage |
|------|-------|-------|-------|
| **Small** | `rounded` | 4px | Inputs, tags, small elements |
| **Medium** | `rounded-md` | 8px | **Buttons, cards, modals (Default)** |
| **Large** | `rounded-lg` | 12px | Larger containers, image galleries |
| **Full** | `rounded-full` | 9999px | Pills, circular avatars/icons |

---

### 2.5. 🌑 Shadows / Elevation

Use subtle shadows to create depth and hierarchy.

<table>
<tr>
<th>Shadow</th>
<th>Class</th>
<th>Usage</th>
</tr>
<tr>
<td><strong>Small</strong></td>
<td><code>shadow-sm</code></td>
<td>Slight elevation (hover effects)</td>
</tr>
<tr>
<td><strong>Medium</strong></td>
<td><code>shadow-md</code></td>
<td><strong>Standard elevation for Cards, Buttons (Default)</strong></td>
</tr>
<tr>
<td><strong>Large</strong></td>
<td><code>shadow-lg</code></td>
<td>Modals, dropdowns, prominent elements</td>
</tr>
<tr>
<td><strong>Extra Large</strong></td>
<td><code>shadow-xl</code></td>
<td>Very prominent elements (use sparingly)</td>
</tr>
</table>

---

## 3. 🧩 Component Library

### 3.1. 🔘 Buttons

#### Base Style
```css
py-2 px-4
rounded-md
text-base
font-semibold
shadow-md
transition property
```

#### Button Variants

<table>
<tr>
<th>Type</th>
<th>Classes</th>
<th>States</th>
</tr>
<tr>
<td><strong>Primary</strong></td>
<td>
<code>bg-green-700</code><br>
<code>text-white</code>
</td>
<td>
<strong>Hover:</strong> <code>bg-green-800</code><br>
<strong>Active:</strong> <code>bg-green-900</code><br>
<strong>Disabled:</strong> <code>bg-gray-300 text-gray-500</code>
</td>
</tr>
<tr>
<td><strong>Secondary</strong></td>
<td>
<code>border border-green-700</code><br>
<code>text-green-700</code><br>
<code>bg-white</code>
</td>
<td>
<strong>Hover:</strong> <code>bg-green-50</code><br>
<strong>Active:</strong> <code>bg-green-100</code><br>
<strong>Disabled:</strong> <code>border-gray-300 text-gray-400</code>
</td>
</tr>
<tr>
<td><strong>Accent</strong></td>
<td>
<code>bg-yellow-400</code><br>
<code>text-gray-800</code>
</td>
<td>
<strong>Hover:</strong> <code>bg-yellow-500</code><br>
<strong>Active:</strong> <code>bg-yellow-600</code><br>
<strong>Disabled:</strong> <code>bg-gray-300 text-gray-500</code><br>
<em>Use for specific, highlighted CTAs</em>
</td>
</tr>
<tr>
<td><strong>Text/Link</strong></td>
<td>
<code>text-green-700</code><br>
<em>No background/border</em>
</td>
<td>
<strong>Hover:</strong> <code>underline</code><br>
<strong>Active:</strong> <code>text-green-800</code><br>
<strong>Disabled:</strong> <code>text-gray-400</code>
</td>
</tr>
<tr>
<td><strong>Icon Button</strong></td>
<td colspan="2">
Square/Circular shape, contains only an icon, appropriate padding.<br>
Use color styles like above based on importance.
</td>
</tr>
</table>

---

### 3.2. 🃏 Cards

#### Base Style
```css
bg-beige-100  (or bg-white)
rounded-md
shadow-md
p-4  (or p-6 for larger cards)
```

#### Content Structure

| Element | Style |
|---------|-------|
| **Title** | `text-xl font-semibold text-gray-800` |
| **Body** | `text-base text-gray-800` |
| **Secondary Info** | `text-sm text-gray-600` |

#### Use Cases
- 💎 Gem previews
- 🚶 Krawl list items
- 👤 User profile sections

---

### 3.3. 📝 Input Fields

#### Base Style
```css
border border-gray-300
rounded
px-3 py-2
text-base
text-gray-800
bg-white
```

#### States & Associated Elements

<table>
<tr>
<th>Element/State</th>
<th>Style</th>
</tr>
<tr>
<td><strong>Focus State</strong></td>
<td>
<code>focus:outline-none</code><br>
<code>focus:ring-2 focus:ring-green-600</code><br>
<code>focus:border-transparent</code>
</td>
</tr>
<tr>
<td><strong>Labels</strong></td>
<td>
<code>&lt;label&gt;</code> with <code>text-sm font-medium text-gray-600</code>
</td>
</tr>
<tr>
<td><strong>Helper Text</strong></td>
<td>
<code>text-xs text-gray-500</code> (below input)
</td>
</tr>
<tr>
<td><strong>Error State</strong></td>
<td>
- Border changes to Error Red (<code>#D32F2F</code>)<br>
- Optional error icon<br>
- Error message text in Error Red below input
</td>
</tr>
</table>

---

### 3.4. 📍 Map Markers (Leaflet)

Use custom markers via `L.DivIcon` or custom icon classes styled with CSS/Tailwind.

#### Marker Types

<table>
<tr>
<th>Type</th>
<th>Style</th>
<th>Visual</th>
</tr>
<tr>
<td><strong>Pending Gem</strong></td>
<td>
- Small circle<br>
- <code>bg-gray-400</code><br>
- Low opacity
</td>
<td>⚪ (small, faded)</td>
</tr>
<tr>
<td><strong>Verified Gem</strong></td>
<td>
- Default pin shape (or custom Krawl icon)<br>
- <code>bg-green-700</code><br>
- White icon inside<br>
- Slightly larger than pending
</td>
<td>📍 (green pin)</td>
</tr>
<tr>
<td><strong>Claimed/Verified Gem</strong></td>
<td>
- Verified Gem style<br>
- + Subtle checkmark badge<br>
- Small blue circle overlay
</td>
<td>📍✓ (green pin + check)</td>
</tr>
<tr>
<td><strong>Stale Gem</strong></td>
<td>
- Verified Gem style<br>
- + Orange (<code>#FFA000</code>) warning icon overlay
</td>
<td>📍⚠️ (green pin + warning)</td>
</tr>
<tr>
<td><strong>Warning Gem<br>(Low Rated)</strong></td>
<td>
- Verified Gem style<br>
- + Yellow (<code>#FFCA28</code>) warning icon overlay
</td>
<td>📍⚡ (green pin + caution)</td>
</tr>
<tr>
<td><strong>Cluster Marker</strong></td>
<td>
- Circle<br>
- <code>bg-green-600</code><br>
- White text (count)<br>
- Size scales with count
</td>
<td>🔵 15 (cluster bubble)</td>
</tr>
<tr>
<td><strong>Krawl Path</strong></td>
<td>
- Dashed or solid line<br>
- Accent Yellow (<code>#FFCA28</code>)<br>
- Medium thickness
</td>
<td>- - - - (yellow path)</td>
</tr>
</table>

---

### 3.5. 🧭 Navigation

#### Bottom Navigation Bar (Mobile)
```css
bg-white  (or bg-beige-100)
shadow-lg  (inverted shadow)
```

**Icons:**
- Default: Medium Gray (`#757575`)
- Active Tab: Forest Green (`#2E7D32`)

**Structure:**
```
┌─────────────────────────────────────┐
│  🗺️      🔍      ➕      📚      👤  │
│  Map   Explore  Add   Krawls  Profile│
└─────────────────────────────────────┘
```

#### Header (Desktop/Optional)
```css
bg-green-700
White/Off-white text/logo
```

**May contain:**
- Logo
- Search bar
- Login button
- Navigation links

---

### 3.6. 🪟 Modals & Popups

#### Overlay
```css
bg-black bg-opacity-50
```
Semi-transparent dark background

#### Container
```css
bg-white  (or bg-beige-100)
rounded-lg
shadow-lg
p-6
max-w-[appropriate size]
```

#### Header/Footer
- Clear separation using borders (Light Gray `#E0E0E0`)
- Or subtle background differences

**Structure:**
```
┌──────────────────────────────────┐
│  Modal Title              [X]    │
├──────────────────────────────────┤
│                                  │
│  Modal Content                   │
│                                  │
├──────────────────────────────────┤
│  [Cancel]           [Confirm]    │
└──────────────────────────────────┘
```

---

### 3.7. 🏷️ Tags/Pills

#### Base Style
```css
inline-block
bg-green-100
text-green-800
text-xs  (or text-sm)
font-medium
px-2.5 py-0.5
rounded-full
```

#### Color Variants

| Type | Background | Text |
|------|------------|------|
| **Default** | `bg-green-100` | `text-green-800` |
| **Warning** | `bg-yellow-100` | `text-yellow-800` |
| **Error** | `bg-red-100` | `text-red-800` |
| **Info** | `bg-blue-100` | `text-blue-800` |

**Use for:** Categories, statuses, tag systems

---

### 3.8. 🔔 Alerts / Notifications

#### Base Style
```css
p-4
rounded-md
```
Distinct background and text colors

#### Variants

<table>
<tr>
<th>Type</th>
<th>Classes</th>
<th>Usage</th>
</tr>
<tr>
<td><strong>✅ Success</strong></td>
<td>
<code>bg-green-50</code><br>
<code>text-green-700</code>
</td>
<td>Successful actions, confirmations</td>
</tr>
<tr>
<td><strong>⚠️ Warning</strong></td>
<td>
<code>bg-yellow-50</code><br>
<code>text-yellow-700</code>
</td>
<td>Warnings, cautions, alerts</td>
</tr>
<tr>
<td><strong>❌ Error</strong></td>
<td>
<code>bg-red-50</code><br>
<code>text-red-700</code>
</td>
<td>Error messages, failed actions</td>
</tr>
<tr>
<td><strong>ℹ️ Info</strong></td>
<td>
<code>bg-blue-50</code><br>
<code>text-blue-700</code>
</td>
<td>Informational messages, tips</td>
</tr>
</table>

> **Note:** Success green uses lighter shade than primary action green to avoid confusion

---

## 4. 🎯 Iconography

**Reference:** Brand Guidelines Section 6

### Icon System
```
Library: Lucide Icons (or similar consistent set)
Format: SVG via component library
Style: Line-based, consistent weight
```

### Color Guidelines

| Context | Color | Hex |
|---------|-------|-----|
| **Default** | Text Gray (Dark) | `#424242` |
| **Secondary** | Text Gray (Medium) | `#757575` |
| **Interactive/Hover** | Primary Green | `#2E7D32` |
| **Accent/Emphasis** | Mango Yellow | `#FFCA28` |

### Implementation
```javascript
import { MapPin, Heart, Star } from 'lucide-react';

<MapPin className="text-gray-800" size={20} />
<Heart className="text-green-700 hover:text-green-800" size={24} />
<Star className="text-yellow-400" size={16} />
```

---

## 5. 📸 Imagery

**Reference:** Brand Guidelines Section 8

### Guidelines

✅ **Prioritize:**
- Authentic User-Generated Content (UGC)
- Clear, well-composed photos
- Real-world Filipino scenes
- Local perspective

### Display Best Practices
```css
/* Image Container */
rounded-lg
overflow-hidden
shadow-md  (optional)

/* Within Cards/Modals */
Clean presentation
Appropriate aspect ratios
```

### Accessibility
```html
<img 
  src="gem-photo.jpg" 
  alt="Descriptive text for screen readers"
  loading="lazy"
/>
```

**Always provide appropriate alt text for accessibility**

---

## 6. 📱 Responsive Design

### Breakpoint Strategy
```
Mobile First Approach

Base     →  < 640px   (Mobile)
sm:      →  640px+    (Large mobile/small tablet)
md:      →  768px+    (Tablet)
lg:      →  1024px+   (Laptop)
xl:      →  1280px+   (Desktop)
2xl:     →  1536px+   (Large desktop)
```

### Component Adaptations

| Component | Mobile | Desktop |
|-----------|--------|---------|
| **Navigation** | Bottom bar | Top header + sidebar |
| **Cards** | Full width (with padding) | Grid layout |
| **Modals** | Full screen/bottom sheet | Centered popup |
| **Forms** | Stacked fields | Multi-column layout |

---

## 7. ♿ Accessibility Guidelines

### WCAG AA Compliance
```
Minimum Requirements
├─ Color Contrast: 4.5:1 for normal text
├─ Large Text: 3:1 for 18px+ or 14px+ bold
├─ Interactive Elements: Clear focus states
└─ Alt Text: All images and icons
```

### Focus States

All interactive elements must have visible focus indicators:
```css
focus:outline-none
focus:ring-2
focus:ring-green-600
focus:ring-offset-2
```

### Keyboard Navigation

- All interactive elements accessible via keyboard
- Logical tab order
- Skip links for main content
- Clear focus indicators

---

## 8. 🎨 Design Patterns

### Common Layouts

#### List View Pattern
```
┌────────────────────────────────┐
│  [Image]  Title                │
│           Description...       │
│           [Tags] [Rating] ⭐   │
└────────────────────────────────┘
```

#### Detail View Pattern
```
┌────────────────────────────────┐
│         Hero Image             │
├────────────────────────────────┤
│  Title                    [★]  │
│  Meta info | Status            │
│                                │
│  Description text...           │
│                                │
│  [Action Button]               │
└────────────────────────────────┘
```

#### Form Pattern
```
┌────────────────────────────────┐
│  Label                         │
│  [Input Field]                 │
│  Helper text                   │
│                                │
│  Label                         │
│  [Input Field]                 │
│  Helper text                   │
│                                │
│  [Cancel]  [Submit]            │
└────────────────────────────────┘
```

---

## 9. 🔄 State Management Patterns

### Loading States
```
Skeleton Screens
├─ Use during initial load
├─ Match component structure
└─ Animate with pulse effect
```

### Empty States
```
Centered content with:
├─ Illustrative icon (large)
├─ Clear message
└─ Actionable CTA
```

### Error States
```
Display:
├─ Error icon/illustration
├─ Clear error message
├─ Suggested action/retry button
└─ Optional support link
```

---

## 10. 📐 Layout Grid System

### Container Widths

| Breakpoint | Max Width |
|------------|-----------|
| **sm:** | 640px |
| **md:** | 768px |
| **lg:** | 1024px |
| **xl:** | 1280px |
| **2xl:** | 1536px |

### Grid Columns
```
Mobile (default):  1 column
sm:                2 columns
md:                2-3 columns
lg:                3-4 columns
xl:                4+ columns
```

---

## 11. ✅ Component Checklist

When creating new components, ensure:

- [ ] Uses "Lokal Verde" color palette
- [ ] Applies 8px spacing system
- [ ] Uses Inter font with correct scale
- [ ] Includes appropriate border radius (default: `rounded-md`)
- [ ] Has proper shadow elevation
- [ ] Meets WCAG AA contrast requirements
- [ ] Includes hover/active/focus states
- [ ] Is responsive (mobile-first)
- [ ] Has accessible labels/alt text
- [ ] Uses consistent iconography
- [ ] Follows established patterns

---

<div align="center">

## 🎯 Design System Principles
```
🎨 Consistency Over Creativity
├─ Use established patterns
└─ Maintain visual harmony

♿ Accessibility First
├─ Design for everyone
└─ Test with assistive technologies

📱 Mobile-First Approach
├─ Optimize for smallest screens
└─ Enhance progressively

🚀 Performance Matters
├─ Optimize images
└─ Minimize CSS/JS

🇵🇭 Celebrate Filipino Culture
├─ Authentic representation
└─ Local-first perspective
```

---

### 📚 Additional Resources

- **Brand Guidelines:** See full brand guidelines document
- **Component Library:** Storybook/Figma (when available)
- **Icons:** [Lucide Icons](https://lucide.dev)
- **Tailwind CSS:** [Documentation](https://tailwindcss.com/docs)

---

*This design system is a living document. Update as the product evolves while maintaining core principles.*

**Version 1.0** • Last Updated: October 2025

</div>