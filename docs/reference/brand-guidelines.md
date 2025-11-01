# 🎨 Krawl - Brand Guidelines
## *Visual Identity for Authentic Filipino Discovery*

---

## 1. 📖 Introduction

These guidelines define the visual identity of **Krawl**. Consistent application ensures a cohesive, recognizable, and trustworthy brand experience that reflects our mission: **mapping authentic Filipino culture through community**.

<div align="center">

### Our Aesthetic

**Organic • Reliable • Modern • Filipino-Inspired**

</div>

---

## 2. 🏷️ Logo Usage

Our logo represents the connection between **community**, **location**, and **discovery**. Proper usage is crucial.

### 2.1. Logo Variations
```
Primary Logo (Icon + Wordmark)
└─ Use in most standard contexts

Icon Only
└─ Favicons, app icons, social profiles, limited space

Wordmark Only
└─ When brand is already clearly established
```

> **Reference:** See Logo Design Task 0.2 in User Stories for specific layout details

---

### 2.2. 📏 Clear Space

**Maintain a minimum clear space around the logo equal to the height of the icon element.**
```
┌─────────────────────────────────┐
│     [Clear Space Zone]          │
│                                 │
│         ┌─────────┐             │
│         │  KRAWL  │             │
│         └─────────┘             │
│                                 │
│     [Clear Space Zone]          │
└─────────────────────────────────┘
```

⚠️ **Do not place text or other graphics within this zone.**

---

### 2.3. 📐 Minimum Size

| Context | Minimum Size |
|---------|--------------|
| **Primary Logo (Web)** | 32px height |
| **Icon Only (Web)** | 16px × 16px (favicon standard) |

> Ensure legibility at all sizes

---

### 2.4. 🎨 Color Usage

#### Primary (Full Color)
Use the full **"Lokal Verde"** color logo on White (#FFFFFF) or Off-White (#FAFAFA) backgrounds primarily.

#### Single Color (Forest Green)
Use **#2E7D32** on light backgrounds when full color is not feasible or desired.

#### White/Reversed
Use the white version on dark backgrounds:
- Forest Green (#2E7D32)
- Charcoal Gray (#424242)

#### Black
For specific monochrome print or limited-color applications.

---

### 2.5. ❌ Incorrect Usage (Don'ts)

<table>
<tr>
<td width="50%">

**❌ Don't Do This**
- Stretch, skew, or distort
- Change colors outside palette
- Add effects (shadows, gradients, outlines)
- Rotate or flip
- Use on busy backgrounds
- Rearrange or remove elements

</td>
<td width="50%">

**✅ Do This Instead**
- Maintain original proportions
- Use approved color variations
- Keep original design intact
- Use correct orientation
- Ensure proper contrast
- Keep logo complete

</td>
</tr>
</table>

---

## 3. 🎨 Color Palette: "Lokal Verde"

This palette evokes **nature**, **trustworthiness**, and **Filipino warmth**.

> **Implementation:** Complete color system with 10-shade scales (50-900) for all brand colors is defined as CSS custom properties in `frontend/globals.css`. This enables consistent theming and easy color management across the entire application.

> **Accessibility:** Ensure sufficient contrast for WCAG AA minimum compliance. All color combinations are tested for accessibility.

### 3.1. 🌿 Primary Colors

<table>
<tr>
<td width="33%">

**Forest Green**
```
#2E7D32
RGB: 46, 125, 50
```
**Use For:**
- Headers
- Primary buttons
- Key UI elements
- Active states

**Evokes:** Nature, growth, trust

**Complete Scale:** `--color-verde-50` through `--color-verde-900` (10 shades) available in `globals.css`

</td>
<td width="33%">

**Sandy Beige**
```
#F5F5DC
RGB: 245, 245, 220
```
**Use For:**
- Secondary backgrounds
- Cards
- Neutral surfaces

**Evokes:** Earthy, clean

**Complete Scale:** `--color-sand-50` through `--color-sand-900` (10 shades) available in `globals.css`

</td>
<td width="33%">

**Mango Yellow**
```
#FFCA28
RGB: 255, 202, 40
```
**Use For:**
- Accents & highlights
- Icons
- CTAs
- Krawl paths/markers

**Evokes:** Energy, sunshine, Filipino vibrancy

**Complete Scale:** `--color-mango-50` through `--color-mango-900` (10 shades) available in `globals.css`

</td>
</tr>
</table>

> **Additional Color Families:** Complete scales for Clay (terracotta) and Teal are also available in `globals.css`. See `ui-ux-design-system.md` for full color documentation.

---

### 3.2. ⚫ Neutral Colors

Complete 10-shade grayscale palette for versatile UI needs:

| Color | Variable | Hex | Use Case |
|-------|----------|-----|----------|
| **Neutral 50** | `--color-neutral-50` | `#fafafa` | Main background color for clean, airy feel |
| **Neutral 100** | `--color-neutral-100` | `#f5f5f5` | Card backgrounds, hover states |
| **Neutral 200** | `--color-neutral-200` | `#e5e5e5` | Borders, dividers |
| **Neutral 300** | `--color-neutral-300` | `#d4d4d4` | Lighter borders |
| **Neutral 400** | `--color-neutral-400` | `#a3a3a3` | Placeholder text |
| **Neutral 500** | `--color-neutral-500` | `#737373` | Secondary text, helper text |
| **Neutral 600** | `--color-neutral-600` | `#525252` | Secondary headings |
| **Neutral 700** | `--color-neutral-700` | `#404040` | Primary body text |
| **Neutral 800** | `--color-neutral-800` | `#262626` | Dark text, strong emphasis |
| **Neutral 900** | `--color-neutral-900` | `#171717` | Very dark text, maximum contrast |

> **Semantic Tokens:** `--color-text-primary` (#424242), `--color-text-secondary` (#757575), `--color-text-tertiary` (#9e9e9e), and `--color-text-disabled` (#bdbdbd) are also defined for consistent text color usage.

---

### 3.3. 🔄 State Variations
```
Hover & Active States

Primary Dark (#1B5E20)
└─ Hover/active state for Forest Green buttons

Accent Dark (#FFA000)
└─ Hover/active state for Mango Yellow elements
```

---

### 3.4. 🚦 Semantic Colors

**Use Sparingly for Specific Contexts**

| Color | Hex | Usage |
|-------|-----|-------|
| **Error Red** | `#D32F2F` | Error messages, destructive actions |
| **Warning Orange** | `#FFA000` | Warnings, 'Stale' badges |
| **Success Green** | `#388E3C` | Success messages |

> **Note:** Warning Orange overlaps with Accent Dark

---

## 4. 📝 Typography

Readability, modernity, and warmth guide our typography.

### 4.1. 🔤 Primary Font

**Manrope**

> A clean, modern sans-serif font with excellent legibility for UI. Manrope features slightly rounded forms that complement our "Lokal Verde" aesthetic.

**Implementation:** Defined in `frontend/globals.css` as:
```css
--font-family-sans: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
```

**Fallback Stack:** System fonts ensure text displays correctly even before Manrope loads.

---

### 4.2. 📊 Scale & Weights

#### Type Scale

Implemented as CSS custom properties in `globals.css`:

```
12px (0.75rem)   ─  Small text, captions (--font-size-xs)
14px (0.875rem)  ─  Body text, secondary (--font-size-sm)
16px (1rem)      ─  Body text, primary (--font-size-base)
18px (1.125rem)  ─  Large body, subheadings (--font-size-lg)
20px (1.25rem)   ─  H4, Card titles (--font-size-xl)
24px (1.5rem)    ─  H3, Section headers (--font-size-2xl)
30px (1.875rem)  ─  H2, Page titles (--font-size-3xl)
36px (2.25rem)   ─  H1, Hero headings (--font-size-4xl)
48px (3rem)      ─  Display text (--font-size-5xl)
```

> All sizes are available as both Tailwind classes (`text-xs`, `text-sm`, etc.) and pre-built typography classes (`.heading-1`, `.body-base`, etc.).

#### Weight Applications

<table>
<tr>
<th>Element</th>
<th>Size</th>
<th>Weight</th>
<th>Color</th>
</tr>
<tr>
<td><strong>Body Text</strong></td>
<td>14px or 16px</td>
<td>Regular (400)</td>
<td>Charcoal Gray (#424242)</td>
</tr>
<tr>
<td><strong>H1 Heading</strong></td>
<td>32px</td>
<td>Semibold (600) or Bold (700)</td>
<td>Charcoal Gray (#424242)</td>
</tr>
<tr>
<td><strong>H2 Heading</strong></td>
<td>24px</td>
<td>Semibold (600) or Bold (700)</td>
<td>Charcoal Gray (#424242)</td>
</tr>
<tr>
<td><strong>H3 Heading</strong></td>
<td>20px</td>
<td>Semibold (600) or Bold (700)</td>
<td>Charcoal Gray (#424242)</td>
</tr>
<tr>
<td><strong>Secondary Text</strong></td>
<td>12px or 14px</td>
<td>Regular (400)</td>
<td>Medium Gray (#757575)</td>
</tr>
<tr>
<td><strong>Buttons/Labels</strong></td>
<td>14px or 16px</td>
<td>Medium (500) or Semibold (600)</td>
<td>Context-dependent</td>
</tr>
</table>

---

### 4.3. 📏 Line Height

Implemented as CSS custom properties in `globals.css`:

```
Body Text
├─ --line-height-normal: 1.5 (24px for 16px text)
└─ Use for: Body copy, paragraphs, descriptions

Headings
├─ --line-height-tight: 1.25 (tighter for impact)
└─ Use for: H1-H3, display text

Relaxed
├─ --line-height-relaxed: 1.75
└─ Use for: Long-form content, blog posts
```

### 4.4. 🎯 Font Weights

Defined as CSS custom properties in `globals.css`:

```css
--font-weight-normal: 400     /* Regular, default body text */
--font-weight-medium: 500     /* Labels, emphasis */
--font-weight-semibold: 600   /* Headings, buttons */
--font-weight-bold: 700       /* Strong emphasis, H1-H2 */
```

> Optimize for readability and visual hierarchy

---

## 5. 🔘 Buttons

Buttons should be **clear**, **accessible**, and follow the **color hierarchy**.

**Border Radius:** 8px (Medium)

### Button Variants

<table>
<tr>
<th>Type</th>
<th>Style</th>
<th>Use Case</th>
</tr>
<tr>
<td><strong>Primary Button</strong></td>
<td>
- Background: Forest Green (#2E7D32)<br>
- Text: White<br>
- Hover/Active: Primary Dark (#1B5E20)
</td>
<td>Main actions, form submissions</td>
</tr>
<tr>
<td><strong>Secondary Button</strong></td>
<td>
- Border: Forest Green (#2E7D32)<br>
- Text: Forest Green<br>
- Background: Transparent/Off-White<br>
- Hover/Active: Light Forest Green fill
</td>
<td>Secondary actions, cancellations</td>
</tr>
<tr>
<td><strong>Accent Button</strong></td>
<td>
- Background: Mango Yellow (#FFCA28)<br>
- Text: Charcoal Gray<br>
- Hover/Active: Accent Dark (#FFA000)<br>
- <em>Use sparingly</em>
</td>
<td>Special CTAs, featured actions</td>
</tr>
<tr>
<td><strong>Text/Link Button</strong></td>
<td>
- Text: Forest Green (#2E7D32)<br>
- No border or background<br>
- Underline on hover
</td>
<td>Tertiary actions, navigation links</td>
</tr>
<tr>
<td><strong>Disabled Button</strong></td>
<td>
- Background: Disabled Gray (#BDBDBD)<br>
- Text: Disabled Gray
</td>
<td>Inactive/unavailable actions</td>
</tr>
</table>

---

## 6. 🎯 Iconography

Icons should be **simple**, **clear**, and **consistent**.

### Style Guidelines
```
Icon System
├─ Style: Line-based, consistent weight
├─ Library: Lucide Icons (via lucide-react) or similar
├─ Format: SVG (inline via components)
└─ Rule: Never mix icon styles
```

### Color Usage

| State | Color | Hex |
|-------|-------|-----|
| **Default** | Charcoal Gray | `#424242` |
| **Secondary** | Medium Gray | `#757575` |
| **Interactive (Hover/Active)** | Forest Green | `#2E7D32` |
| **Accent/Emphasis** | Mango Yellow | `#FFCA28` |

### Implementation

✅ **Preferred:**
- Icon font libraries (Lucide, Feather)
- Inline SVGs managed via components
- Scalable and performant

❌ **Avoid:**
- Raster images (PNG, JPG) for icons
- Mixed icon styles
- Inconsistent sizing

> **Note:** Standard icon libraries using SVG are acceptable for UI elements

---

## 7. 📐 Spacing & Layout

Consistent spacing creates **visual rhythm** and **clarity**.

### 7.1. 🎯 Base Unit System

**8px Base Unit**

Comprehensive spacing system defined as CSS custom properties in `globals.css`:

```
Spacing Scale (CSS Variables)
├─ 0px   →  --spacing-0
├─ 4px   →  --spacing-1   (0.5 unit)
├─ 8px   →  --spacing-2   (1 unit)
├─ 12px  →  --spacing-3   (1.5 units)
├─ 16px  →  --spacing-4   (2 units)
├─ 20px  →  --spacing-5   (2.5 units)
├─ 24px  →  --spacing-6   (3 units)
├─ 32px  →  --spacing-8   (4 units)
├─ 40px  →  --spacing-10  (5 units)
├─ 48px  →  --spacing-12  (6 units)
├─ 64px  →  --spacing-16  (8 units)
├─ 80px  →  --spacing-20  (10 units)
└─ 96px  →  --spacing-24  (12 units)
```

**Use for:** Margins, padding, layout gaps

> **Tailwind Integration:** Fully compatible with Tailwind's spacing utilities (e.g., `p-4` = 16px, `m-6` = 24px).

---

### 7.2. 🧱 Layout System

#### Responsive Grid
```
Utilize Tailwind CSS utilities:
├─ Grid (for structured layouts)
├─ Flexbox (for flexible components)
└─ Maintain ample whitespace
```

#### Container Components

**Cards**
- Background: Off-White (#FAFAFA) or Sandy Beige (#F5F5DC)
- Shadow: Medium (`shadow-md`)
- Border Radius: 8px (Medium)
- Purpose: Group related content

**Example Structure:**
```
Card Component
├─ Padding: 16px or 24px
├─ Margin: 16px between cards
└─ Shadow for depth
```

---

### 7.3. 📱 Responsive Breakpoints
```
Mobile First Approach

sm:  640px   (Small tablets)
md:  768px   (Tablets)
lg:  1024px  (Laptops)
xl:  1280px  (Desktops)
2xl: 1536px  (Large screens)
```

---

## 8. 📸 Imagery

Imagery should feel **authentic** and **user-centric**.

### 8.1. 🌟 Primary Source

**User-Generated Content (UGC)**

Photos uploaded by the community for Gems

**Priorities:**
- ✅ Clear composition
- ✅ Well-lit
- ✅ Real-world authenticity
- ✅ Local perspective

---

### 8.2. ❌ What to Avoid
```
Don't Use
├─ Generic stock photos
├─ Overly staged images
├─ Non-Filipino contexts
└─ Low-quality/blurry photos
```

**If Placeholder/Fallback Needed:**
- Simple, clean graphics
- Abstract patterns in brand colors
- Solid color backgrounds with icons

---

### 8.3. 💡 Display Guidelines

#### Image Galleries
```
Gem Detail View
├─ Carousel or grid gallery
├─ Optimized for web (compressed)
├─ Lazy loading for performance
└─ User attribution visible
```

#### Best Practices

| Aspect | Guideline |
|--------|-----------|
| **Format** | WebP (fallback to JPG) |
| **Optimization** | Compress for web use |
| **Attribution** | Always credit uploader |
| **Alt Text** | Descriptive for accessibility |
| **Aspect Ratio** | Consistent within galleries |

---

## 9. 🎭 UI Components Summary

### Component Hierarchy
```
Primary Components
├─ 🔘 Buttons (Primary, Secondary, Accent)
├─ 🗺️  Map Interface (MapLibre GL JS-based)
├─ 💎 Gem Cards (Info display)
├─ 🚶 Krawl Cards (Trail preview)
└─ 📝 Forms (Input fields, validation)

Navigation Components
├─ 🧭 Bottom Navigation Bar
├─ 🔍 Search Bar
├─ 🍔 Menu (hamburger/drawer)
└─ 🔙 Back Button

Interactive Elements
├─ ⭐ Rating Stars (1-5)
├─ 👍 Vouch Button
├─ 🚩 Report Button
├─ 📷 Photo Upload
└─ 📥 Download Offline
```

---

## 10. 🎨 Design Principles

<div align="center">

### Core Principles

| Principle | Application |
|-----------|-------------|
| **🌿 Organic** | Natural shapes, earthy colors, Filipino inspiration |
| **✅ Reliable** | Clear hierarchy, consistent patterns, trustworthy |
| **📱 Modern** | Clean interfaces, contemporary design trends |
| **🇵🇭 Local** | Celebrate Filipino culture without stereotypes |
| **♿ Accessible** | WCAG AA compliance, high contrast, clear labels |

</div>

---

## 11. ✅ Brand Checklist

Use this checklist to ensure brand consistency:

### Visual Elements
- [ ] Logo used in approved variation
- [ ] Clear space maintained around logo
- [ ] Colors from "Lokal Verde" palette
- [ ] Sufficient contrast (WCAG AA)
- [ ] Inter/Poppins font used consistently
- [ ] 8px spacing unit applied
- [ ] Icons from consistent library

### Content
- [ ] Tone is authentic and local
- [ ] Filipino references feel natural
- [ ] Community-focused language
- [ ] User-generated photos prioritized
- [ ] Proper attribution given

### Accessibility
- [ ] Color contrast meets WCAG AA
- [ ] Text is legible at all sizes
- [ ] Interactive elements clearly labeled
- [ ] Alt text provided for images
- [ ] Keyboard navigation supported

---

## 12. 🚫 Common Mistakes to Avoid
```
❌ Don't
├─ Mix multiple icon styles
├─ Use colors outside the palette
├─ Ignore spacing system
├─ Compromise accessibility for aesthetics
├─ Use generic stock photos
├─ Overuse accent colors
└─ Modify the logo

✅ Do
├─ Stay consistent with guidelines
├─ Prioritize user experience
├─ Test on multiple devices
├─ Maintain brand integrity
├─ Celebrate authentic Filipino culture
├─ Use accent colors sparingly
└─ Keep logo intact
```

---

<div align="center">

## 🎯 Brand Essence

**Authentic • Community-Driven • Filipino • Trustworthy**

---

### Questions?

For brand guideline clarifications or special use cases, refer to the design system documentation or contact the design team.

---

*These guidelines ensure Krawl maintains a cohesive, recognizable, and authentic brand identity across all touchpoints.*

</div>

---

## 📝 Changelog

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.1.0 | 2025-10-28 | **Updated to reflect `globals.css` implementation:** Changed primary font from Inter/Poppins to Manrope with implementation details; documented complete 10-shade color scales for all brand colors (Verde, Sand, Mango) with CSS variable names; updated Neutral colors table with accurate hex values from globals.css and added semantic text color tokens; expanded type scale to include all 9 sizes with CSS variable references; added font weight CSS variables; updated line-height with CSS variables; expanded spacing scale from 8 to 13 values with CSS variable names; added Tailwind integration notes | Design Team |
| 1.0.0 | 2025-10-28 | Initial brand guidelines | Design Team |

---

## 📚 Related Documents

- [Brand Brief](./brand-brief.md) - Brand identity and values
- [Mood Board](./mood-board.md) - Visual inspiration  
- [UI/UX Design System](./ui-ux-design-system.md) - Design system implementation
- [Content Plan](./content-plan.md) - Content strategy and voice

---

*Document maintained by Design Team • Last reviewed: 2025-10-28*