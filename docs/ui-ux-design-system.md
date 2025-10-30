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

> **💡 Implementation Note:** The Krawl app uses a comprehensive design system with complete color scales (50-900) implemented in `frontend/globals.css` with CSS custom properties and Tailwind v4 integration. See `frontend/DESIGN_SYSTEM.md` for complete documentation.

#### 🌲 Primary - Verde (Green)

Represents growth, nature, and Filipino authenticity. Complete 10-shade scale available.

<table>
<tr>
<th>Class</th>
<th>Hex</th>
<th>Usage</th>
</tr>
<tr>
<td><code>verde-50</code></td>
<td><code>#e8f5e9</code></td>
<td>Very light backgrounds, subtle highlights</td>
</tr>
<tr>
<td><code>verde-100</code></td>
<td><code>#c8e6c9</code></td>
<td>Light backgrounds, hover states</td>
</tr>
<tr>
<td><code>verde-200</code></td>
<td><code>#a5d6a7</code></td>
<td>Lighter accents</td>
</tr>
<tr>
<td><code>verde-300</code></td>
<td><code>#81c784</code></td>
<td>Medium light accents</td>
</tr>
<tr>
<td><code>verde-400</code></td>
<td><code>#66bb6a</code></td>
<td>Medium accents</td>
</tr>
<tr>
<td><code>verde-500</code></td>
<td><code>#2D7A3E</code></td>
<td><strong>PRIMARY BRAND COLOR</strong> - Key actions, headers, active states</td>
</tr>
<tr>
<td><code>verde-600</code></td>
<td><code>#2e7d32</code></td>
<td>Darker primary, hover states</td>
</tr>
<tr>
<td><code>verde-700</code></td>
<td><code>#1b5e20</code></td>
<td>Dark primary, text on light backgrounds</td>
</tr>
<tr>
<td><code>verde-800</code></td>
<td><code>#145018</code></td>
<td>Very dark primary</td>
</tr>
<tr>
<td><code>verde-900</code></td>
<td><code>#0d3810</code></td>
<td>Darkest primary, strong contrast</td>
</tr>
</table>

#### 🏖️ Secondary - Sand (Beige/Tan)

Warm, earthy secondary representing Filipino beaches and natural landscapes. Complete 10-shade scale.

<table>
<tr>
<th>Class</th>
<th>Hex</th>
<th>Usage</th>
</tr>
<tr>
<td><code>sand-50</code></td>
<td><code>#fafaf8</code></td>
<td>Subtle backgrounds</td>
</tr>
<tr>
<td><code>sand-100</code></td>
<td><code>#f5f5dc</code></td>
<td>Card backgrounds, secondary surfaces</td>
</tr>
<tr>
<td><code>sand-300</code></td>
<td><code>#e0d9c0</code></td>
<td>Borders, dividers, avatar backgrounds</td>
</tr>
<tr>
<td><code>sand-500</code></td>
<td><code>#c2b896</code></td>
<td>Medium sand, decorative elements</td>
</tr>
<tr>
<td><code>sand-700</code></td>
<td><code>#8d7a4a</code></td>
<td>Dark sand for text</td>
</tr>
<tr>
<td><code>sand-800</code></td>
<td><code>#6b5d38</code></td>
<td>Text on light sand backgrounds</td>
</tr>
<tr>
<td><code>sand-900</code></td>
<td><code>#4a4028</code></td>
<td>Darkest sand</td>
</tr>
</table>

#### 🥭 Accent - Mango (Yellow/Orange)

Vibrant accent representing tropical fruits and energy. Complete 10-shade scale.

<table>
<tr>
<th>Class</th>
<th>Hex</th>
<th>Usage</th>
</tr>
<tr>
<td><code>mango-100</code></td>
<td><code>#ffecb3</code></td>
<td>Light accents, backgrounds</td>
</tr>
<tr>
<td><code>mango-400</code></td>
<td><code>#ffca28</code></td>
<td>Main accent, highlights, CTAs, map paths</td>
</tr>
<tr>
<td><code>mango-700</code></td>
<td><code>#ffa000</code></td>
<td>Darker accent, hover states</td>
</tr>
</table>

#### 🪨 Clay (Terracotta)

Earthy terracotta representing traditional Filipino pottery. Complete 10-shade scale.

<table>
<tr>
<th>Class</th>
<th>Hex</th>
<th>Usage</th>
</tr>
<tr>
<td><code>clay-100</code></td>
<td><code>#fde8e5</code></td>
<td>Light backgrounds, info cards</td>
</tr>
<tr>
<td><code>clay-500</code></td>
<td><code>#c95d47</code></td>
<td>Medium clay, decorative</td>
</tr>
<tr>
<td><code>clay-700</code></td>
<td><code>#af3f2e</code></td>
<td>Dark clay, text/icons</td>
</tr>
</table>

#### 💧 Teal

Cool complementary color for variety and visual interest. Complete 10-shade scale.

<table>
<tr>
<th>Class</th>
<th>Hex</th>
<th>Usage</th>
</tr>
<tr>
<td><code>teal-100</code></td>
<td><code>#b2dfdb</code></td>
<td>Light backgrounds, badges</td>
</tr>
<tr>
<td><code>teal-500</code></td>
<td><code>#009688</code></td>
<td>Medium teal, accents</td>
</tr>
<tr>
<td><code>teal-700</code></td>
<td><code>#00796b</code></td>
<td>Dark teal, text/icons</td>
</tr>
</table>

#### ⚪ Neutral Grays

Complete 10-shade grayscale palette for text, borders, and backgrounds (from `globals.css`).

<table>
<tr>
<th>Class</th>
<th>Hex</th>
<th>Usage</th>
</tr>
<tr>
<td><code>neutral-50</code></td>
<td><code>#fafafa</code></td>
<td>Main page background (off-white)</td>
</tr>
<tr>
<td><code>neutral-100</code></td>
<td><code>#f5f5f5</code></td>
<td>Card backgrounds, hover states</td>
</tr>
<tr>
<td><code>neutral-200</code></td>
<td><code>#e5e5e5</code></td>
<td>Borders, dividers</td>
</tr>
<tr>
<td><code>neutral-300</code></td>
<td><code>#d4d4d4</code></td>
<td>Lighter borders, disabled backgrounds</td>
</tr>
<tr>
<td><code>neutral-400</code></td>
<td><code>#a3a3a3</code></td>
<td>Placeholder text, disabled text</td>
</tr>
<tr>
<td><code>neutral-500</code></td>
<td><code>#737373</code></td>
<td>Secondary text, helper text</td>
</tr>
<tr>
<td><code>neutral-600</code></td>
<td><code>#525252</code></td>
<td>Secondary headings, emphasized secondary text</td>
</tr>
<tr>
<td><code>neutral-700</code></td>
<td><code>#404040</code></td>
<td>Primary text, headings</td>
</tr>
<tr>
<td><code>neutral-800</code></td>
<td><code>#262626</code></td>
<td>Dark text, strong emphasis</td>
</tr>
<tr>
<td><code>neutral-900</code></td>
<td><code>#171717</code></td>
<td>Very dark text, maximum contrast</td>
</tr>
</table>

#### 🚦 Semantic Colors

| Purpose | Class | Hex | Usage |
|---------|-------|-----|-------|
| **❌ Error** | `error` | `#d32f2f` | Error messages, destructive actions |
| **⚠️ Warning** | `warning` | `#ffa000` | Warnings, alerts, cautions |
| **✅ Success** | `success` | `#388e3c` | Success messages, confirmations |
| **ℹ️ Info** | `info` | `#1976d2` | Informational messages, tips |

#### 📝 Text Color Tokens

CSS custom properties for text colors (defined in `globals.css`):

| Token | Value | Usage |
|-------|-------|-------|
| `--color-text-primary` | `#424242` | Primary body text, default color |
| `--color-text-secondary` | `#757575` | Secondary text, captions |
| `--color-text-tertiary` | `#9e9e9e` | Tertiary text, placeholders |
| `--color-text-disabled` | `#bdbdbd` | Disabled text and elements |

#### 🎨 Surface Color Tokens

CSS custom properties for backgrounds and surfaces:

| Token | Value | Usage |
|-------|-------|-------|
| `--color-background` | `#fafafa` | Main page background |
| `--color-background-secondary` | `#ffffff` | Secondary backgrounds |
| `--color-surface` | `#ffffff` | Card and component surfaces |
| `--color-surface-hover` | `#f5f5f5` | Hover state for surfaces |

#### 🔲 Border Color Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--color-border` | `#e0e0e0` | Default borders |
| `--color-border-light` | `#eeeeee` | Light borders, subtle dividers |
| `--color-border-dark` | `#bdbdbd` | Emphasized borders |
| `--color-divider` | `#e0e0e0` | Section dividers |

> **⚠️ Accessibility:** All color combinations in this system meet WCAG AA contrast requirements. The complete system uses CSS custom properties for easy theming and global updates.

> **📚 Full Documentation:** See `frontend/DESIGN_SYSTEM.md` for complete color system documentation with 60+ color tokens, usage examples, and implementation details.

---

### 2.2. 📝 Typography

> **💡 Implementation Note:** The design system includes comprehensive typography utilities implemented in `frontend/globals.css` with pre-built classes like `.heading-1` through `.heading-6`, `.body-lg`, `.body-sm`, etc. See `frontend/DESIGN_SYSTEM.md` for complete typography documentation.

**Primary Font:** Manrope (Fallback: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif)

> **Design System Implementation:** The font family is defined as CSS custom property `--font-family-sans: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;` in `globals.css` and automatically applied to all text via Tailwind's font-sans class.

#### Type Scale

<table>
<tr>
<th>Class</th>
<th>Size</th>
<th>Usage</th>
<th>Line Height</th>
<th>Pre-built Class</th>
</tr>
<tr>
<td><code>text-xs</code></td>
<td>12px (0.75rem)</td>
<td>Fine print, micro labels</td>
<td>1.4</td>
<td><code>.body-xs</code>, <code>.text-caption</code></td>
</tr>
<tr>
<td><code>text-sm</code></td>
<td>14px (0.875rem)</td>
<td>Secondary body, labels</td>
<td>1.5</td>
<td><code>.body-sm</code>, <code>.text-label</code></td>
</tr>
<tr>
<td><code>text-base</code></td>
<td>16px (1rem)</td>
<td><strong>Primary body</strong></td>
<td><strong>1.5</strong></td>
<td><code>.body-base</code></td>
</tr>
<tr>
<td><code>text-lg</code></td>
<td>18px (1.125rem)</td>
<td>Subheadings, large body</td>
<td>1.4</td>
<td><code>.body-lg</code></td>
</tr>
<tr>
<td><code>text-xl</code></td>
<td>20px (1.25rem)</td>
<td>H3, Card titles</td>
<td>1.3</td>
<td><code>.heading-3</code></td>
</tr>
<tr>
<td><code>text-2xl</code></td>
<td>24px (1.5rem)</td>
<td>H2, Section titles</td>
<td>1.3</td>
<td><code>.heading-2</code></td>
</tr>
<tr>
<td><code>text-3xl</code></td>
<td>30px (1.875rem)</td>
<td>H1, Page titles</td>
<td>1.2</td>
<td><code>.heading-1</code></td>
</tr>
<tr>
<td><code>text-4xl</code></td>
<td>36px (2.25rem)</td>
<td>Display text, hero headings</td>
<td>1.2</td>
<td><code>.text-display</code></td>
</tr>
<tr>
<td><code>text-5xl</code></td>
<td>48px (3rem)</td>
<td>Large display text (rare)</td>
<td>1.1</td>
<td><code>.text-display-lg</code></td>
</tr>
</table>

#### Font Weights

Implemented in design system with CSS custom properties (`globals.css`):

```css
Regular (400)    →  Body text, default (--font-weight-normal)
Medium (500)     →  Labels, emphasis (--font-weight-medium)
Semibold (600)   →  Headings, buttons (--font-weight-semibold)
Bold (700)       →  Strong emphasis, H1 (--font-weight-bold)
```

> All font weights are defined as CSS custom properties in `:root` and can be referenced throughout the application.

#### Pre-built Typography Classes

The design system includes ready-to-use typography classes (defined in `globals.css`):

```css
/* Headings */
.heading-1  →  36px (2.25rem), Bold (700), 1.25 line-height, -0.025em letter-spacing
.heading-2  →  30px (1.875rem), Bold (700), 1.25 line-height, -0.025em letter-spacing
.heading-3  →  24px (1.5rem), Semibold (600), 1.25 line-height, -0.025em letter-spacing
.heading-4  →  20px (1.25rem), Semibold (600), 1.5 line-height
.heading-5  →  18px (1.125rem), Semibold (600), 1.5 line-height
.heading-6  →  16px (1rem), Semibold (600), 1.5 line-height

/* Body Text */
.body-lg    →  18px (1.125rem), Regular (400), 1.75 line-height
.body-base  →  16px (1rem), Regular (400), 1.5 line-height
.body-sm    →  14px (0.875rem), Regular (400), 1.5 line-height
.body-xs    →  12px (0.75rem), Regular (400), 1.5 line-height

/* Special */
.text-label   →  14px (0.875rem), Medium (500), 1.5 line-height
.text-caption →  12px (0.75rem), Regular (400), 1.5 line-height
.text-display →  48px (3rem), Bold (700), 1.25 line-height, -0.025em letter-spacing
```

> **Responsive Typography:** `.heading-1` and `.heading-2` automatically scale down on mobile (≤640px) for better readability.

#### Default Styles

| Element | Style | Implementation |
|---------|-------|----------------|
| **Body Text** | `text-base`, Regular (400), neutral-700 | `.body-base` or default |
| **Headings** | Semibold (600) or Bold (700), neutral-900 | `.heading-1` through `.heading-6` |
| **Secondary Text** | `text-sm`, Regular (400), neutral-500 | `.body-sm text-neutral-500` |
| **Labels** | `text-sm`, Medium (500), neutral-600 | `.text-label` |
| **Captions** | `text-xs`, Regular (400), neutral-500 | `.text-caption` |

---

### 2.3. 📏 Spacing System (8px Base Grid)

**Base Unit:** 8px

Use multiples of 4px and 8px for margins, padding, and gaps.

#### Spacing Scale

Comprehensive spacing scale defined as CSS custom properties in `globals.css`:

```
--spacing-0   →    0px     (0 unit)
--spacing-1   →    4px     (0.25rem, 0.5 unit)
--spacing-2   →    8px     (0.5rem, 1 unit)
--spacing-3   →   12px     (0.75rem, 1.5 units)
--spacing-4   →   16px     (1rem, 2 units)
--spacing-5   →   20px     (1.25rem, 2.5 units)
--spacing-6   →   24px     (1.5rem, 3 units)
--spacing-8   →   32px     (2rem, 4 units)
--spacing-10  →   40px     (2.5rem, 5 units)
--spacing-12  →   48px     (3rem, 6 units)
--spacing-16  →   64px     (4rem, 8 units)
--spacing-20  →   80px     (5rem, 10 units)
--spacing-24  →   96px     (6rem, 12 units)
```

**Apply consistently for:**
- Layout spacing
- Component internal padding
- Element margins
- Grid/flex gaps

> **Tailwind Integration:** These spacing values are fully compatible with Tailwind's spacing utilities (e.g., `p-4`, `m-6`, `gap-8`).

---

### 2.4. ⚪ Border Radius

Defined as CSS custom properties in `globals.css`:

| Size | Class | CSS Variable | Value | Usage |
|------|-------|--------------|-------|-------|
| **None** | `rounded-none` | `--radius-none` | 0 | Sharp corners |
| **Small** | `rounded-sm` | `--radius-sm` | 4px (0.25rem) | Inputs, tags, small elements |
| **Medium** | `rounded-md` | `--radius-md` | 8px (0.5rem) | **Buttons, cards, modals (Default)** |
| **Large** | `rounded-lg` | `--radius-lg` | 12px (0.75rem) | Larger containers, image galleries |
| **Extra Large** | `rounded-xl` | `--radius-xl` | 16px (1rem) | Featured sections, hero cards |
| **2X Large** | `rounded-2xl` | `--radius-2xl` | 24px (1.5rem) | Very large containers |
| **Full** | `rounded-full` | `--radius-full` | 9999px | Pills, circular avatars/icons |

---

### 2.5. 🌑 Shadows / Elevation

Use subtle shadows to create depth and hierarchy. Defined as CSS custom properties in `globals.css`:

<table>
<tr>
<th>Shadow</th>
<th>Class</th>
<th>CSS Variable</th>
<th>Usage</th>
</tr>
<tr>
<td><strong>Extra Small</strong></td>
<td><code>shadow-xs</code></td>
<td><code>--shadow-xs</code></td>
<td>Minimal elevation, subtle borders alternative</td>
</tr>
<tr>
<td><strong>Small</strong></td>
<td><code>shadow-sm</code></td>
<td><code>--shadow-sm</code></td>
<td>Slight elevation (hover effects)</td>
</tr>
<tr>
<td><strong>Medium</strong></td>
<td><code>shadow-md</code></td>
<td><code>--shadow-md</code></td>
<td><strong>Standard elevation for Cards, Buttons (Default)</strong></td>
</tr>
<tr>
<td><strong>Large</strong></td>
<td><code>shadow-lg</code></td>
<td><code>--shadow-lg</code></td>
<td>Modals, dropdowns, prominent elements</td>
</tr>
<tr>
<td><strong>Extra Large</strong></td>
<td><code>shadow-xl</code></td>
<td><code>--shadow-xl</code></td>
<td>Very prominent elements (use sparingly)</td>
</tr>
</table>

> **Design Note:** All shadows use subtle black with opacity (0.05-0.1) for a natural, non-intrusive appearance.

---

### 2.6. 🎨 Utility Classes

The design system includes specialized utility classes in `globals.css` for common patterns:

#### Pattern Backgrounds

```css
/* Woven Pattern (Subtle) */
.pattern-woven-subtle
→ Sandy beige background with cross-hatch pattern
→ Use for: Section backgrounds, decorative areas

/* Dot Pattern */
.pattern-dots
→ Subtle dot grid pattern
→ Use for: Empty states, texture backgrounds
```

#### Focus Ring

```css
.focus-ring
→ 2px verde-500 outline with 2px offset
→ Use for: Accessible focus indicators on custom elements
```

#### Container Utilities

Pre-built container classes with automatic centering and padding:

| Class | Max Width | Padding | Usage |
|-------|-----------|---------|-------|
| `.container-narrow` | 640px | 16px (1rem) | Forms, single-column content |
| `.container-medium` | 1024px | 16px (1rem) | Standard content sections |
| `.container-wide` | 1280px | 16px (1rem) | Wide layouts, dashboards |

> **Usage Tip:** These containers automatically center content and add horizontal padding for consistent layouts.

---

### 2.7. 🎯 Z-Index Scale

Standardized z-index values defined in `globals.css` to prevent conflicts:

```css
--z-index-dropdown:       1000
--z-index-sticky:         1020
--z-index-fixed:          1030
--z-index-modal-backdrop: 1040
--z-index-modal:          1050
--z-index-popover:        1060
--z-index-tooltip:        1070
```

> **Best Practice:** Always use these predefined values to maintain proper stacking context.

---

### 2.8. ⚡ Transitions

Standardized transition durations in `globals.css`:

```css
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1)
→ Use for: Micro-interactions, hover effects

--transition-base: 200ms cubic-bezier(0.4, 0, 0.2, 1)
→ Use for: Standard interactions (default)

--transition-slow: 300ms cubic-bezier(0.4, 0, 0.2, 1)
→ Use for: Complex animations, page transitions
```

> **Easing Function:** All transitions use a smooth cubic-bezier easing (0.4, 0, 0.2, 1) for natural motion.

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

### 3.4. 📍 Map Markers (MapLibre GL JS)

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

> **💡 Implementation Note:** The Krawl app uses **Lucide React Icons** (react-icons/lu) as the primary icon library, implementing the design system's icon guidelines consistently across all components.

**Reference:** Brand Guidelines Section 6

### Icon System
```
Library: Lucide React Icons (react-icons/lu) - IMPLEMENTED
Package: react-icons v5.5.0
Format: SVG via React component library
Style: Line-based, consistent weight
Size: 16px, 20px, 22px, 24px (standard sizes)
```

### Implemented Icons

The following Lucide icons are actively used in the application:

| Component | Icons Used | Purpose |
|-----------|-----------|---------|
| **Sidebar** | `LuMapPin`, `LuSearch`, `LuRoute`, `LuPlus`, `LuUser`, `LuSettings`, `LuChevronLeft`, `LuChevronRight` | Navigation, actions, user profile |
| **BottomNav** | `LuMap`, `LuSearch`, `LuPlus`, `LuRoute`, `LuUser` | Mobile navigation |
| **Header** | Various utility icons | Header actions |

### Color Guidelines

| Context | Color Class | Hex | Usage |
|---------|-------------|-----|-------|
| **Default** | `text-neutral-700` | `#424242` | Default icon color |
| **Secondary** | `text-neutral-500` | `#757575` | Secondary/inactive icons |
| **Interactive/Active** | `text-verde-700` | `#1b5e20` | Active navigation items |
| **Hover** | `text-neutral-900` | `#1a1a1a` | Hover state for clickable icons |
| **Accent/Emphasis** | `text-mango-400` | `#ffca28` | Special emphasis, highlights |
| **On Dark Background** | `text-white` | `#ffffff` | Icons on verde/dark backgrounds |

### Implementation Examples

```tsx
// Import from react-icons/lu (Lucide)
import { LuMapPin, LuHeart, LuStar, LuSearch } from 'react-icons/lu';

// Basic usage
<LuMapPin className="text-neutral-700" size={20} />

// Interactive icon with hover
<LuHeart className="text-neutral-500 hover:text-verde-700 transition-colors" size={24} />

// Active state (navigation)
<LuSearch className="text-verde-700 bg-verde-100" size={22} />

// Icon with label
<button className="flex items-center gap-2">
  <LuPlus size={20} />
  <span>Add Gem</span>
</button>
```

### Icon Sizing Standards

```css
/* Standard icon sizes */
size={16}  →  Small icons, inline with text
size={20}  →  Default size for navigation, buttons
size={22}  →  Mobile bottom navigation
size={24}  →  Large interactive elements
size={32}  →  Feature icons, empty states
size={48}  →  Hero sections, large displays
```

### Accessibility

Always provide accessible labels for icon-only buttons:

```tsx
<button 
  onClick={onToggle}
  aria-label="Expand sidebar"
  title="Expand sidebar"
>
  <LuChevronRight size={20} />
</button>
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

- [ ] Uses "Lokal Verde" color palette with complete color scales (50-900)
- [ ] Applies 8px spacing system (uses CSS custom properties from `globals.css`)
- [ ] Uses Manrope font with correct type scale
- [ ] Includes appropriate border radius (default: `rounded-md`, uses `--radius-*` variables)
- [ ] Has proper shadow elevation (uses `--shadow-*` variables)
- [ ] Meets WCAG AA contrast requirements
- [ ] Includes hover/active/focus states with proper transitions (`--transition-*` variables)
- [ ] Is responsive (mobile-first)
- [ ] Has accessible labels/alt text
- [ ] Uses consistent iconography (Lucide React)
- [ ] Follows established patterns
- [ ] Leverages pre-built typography classes (`.heading-*`, `.body-*`)
- [ ] Uses utility classes where applicable (`.pattern-*`, `.container-*`, `.focus-ring`)

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

</div>

---

## 12. ✅ Implemented Components

> **Status:** The following components have been implemented with the complete design system in the frontend codebase.

### Navigation Components

#### Sidebar (Desktop)
**File:** `frontend/components/Sidebar.tsx`

**Features:**
- Collapsible sidebar (80px collapsed, 320px expanded)
- Navigation links: Map, Explore Gems, Krawls, Add Gem
- Active state highlighting with verde-100 background
- User profile section with avatar
- Activity statistics (Saved Gems, Your Krawls, Contributions)
- Smooth transitions and animations
- Responsive (hidden on mobile)

**Design System Usage:**
- Colors: `verde-100`, `verde-700`, `neutral-100-900`, `sand-300`, `sand-800`
- Icons: Lucide React (LuMapPin, LuSearch, LuRoute, LuPlus, LuUser, LuSettings, LuChevronLeft, LuChevronRight)
- Spacing: Consistent with 8px grid
- Typography: Proper font weights and sizes

#### BottomNav (Mobile)
**File:** `frontend/components/BottomNav.tsx`

**Features:**
- Fixed bottom navigation bar for mobile devices
- 5 navigation items: Map, Explore, Add, Krawls, Profile
- Active state with verde accent color
- Touch-friendly 64px height
- Hidden on desktop (md: breakpoint)

**Design System Usage:**
- Colors: `verde-700`, `verde-100`, `neutral-500`, `neutral-100`
- Icons: Lucide React (LuMap, LuSearch, LuPlus, LuRoute, LuUser)
- Responsive design with Tailwind breakpoints

#### AppLayout
**File:** `frontend/components/AppLayout.tsx`

**Features:**
- Main layout wrapper component
- Integrates Sidebar and BottomNav
- Responsive margin adjustments for sidebar states
- Manages bottom nav visibility per page
- Full-height layout with overflow handling

**Props:**
- `children`: ReactNode (page content)
- `showBottomNav`: boolean (toggle mobile bottom nav)

### Page Components

#### Map Page (Home)
**File:** `frontend/app/page.tsx`

**Features:**
- Main map interface
- Integrated with AppLayout
- Bottom navigation enabled for mobile

#### Explore Page
**File:** `frontend/app/explore/page.tsx`

**Features:**
- Gem discovery and exploration interface
- Clay color theme (`clay-100`, `clay-700`)
- Bottom navigation enabled

#### Krawls Page
**File:** `frontend/app/krawls/page.tsx`

**Features:**
- Krawl management and viewing
- Clay color theme
- Bottom navigation enabled

#### Add Gem Page
**File:** `frontend/app/add/page.tsx`

**Features:**
- Gem creation interface
- Teal color theme (`teal-100`, `teal-700`)
- Bottom navigation enabled

#### Profile Page
**File:** `frontend/app/profile/page.tsx`

**Features:**
- User profile and settings
- Sand color theme (`sand-100`, `sand-800`)
- Bottom navigation enabled

### Layout Components

#### Header
**File:** `frontend/components/Header.tsx`

**Features:**
- Application header (desktop)
- Branding and navigation
- User actions

#### MapArea
**File:** `frontend/components/MapArea.tsx`

**Features:**
- Map display container
- Prepared for MapLibre GL JS integration
- Sand pattern background

### PWA Features

#### Service Worker
**File:** `frontend/public/sw.js`

**Features:**
- Offline caching strategy
- Asset precaching
- Network-first/cache-fallback

#### Web App Manifest
**File:** `frontend/public/manifest.json`

**Features:**
- PWA metadata
- App icons and theme colors
- Display mode configuration

#### Service Worker Registration
**File:** `frontend/app/register-sw.tsx`

**Features:**
- Client-side SW registration
- Lifecycle management
- Update handling

### Design System Documentation

**Implementation Files:**
- `frontend/globals.css` - Complete design tokens (545 lines)
- `frontend/DESIGN_SYSTEM.md` - Comprehensive documentation (~584 lines)
- `frontend/DESIGN_TOKENS.md` - Quick reference for developers
- `frontend/COLOR_PALETTE.md` - Visual color reference
- `frontend/DESIGN_SYSTEM_CHANGELOG.md` - Change documentation
- `frontend/DESIGN_SYSTEM_INDEX.md` - Navigation hub
- `frontend/DESIGN_SYSTEM_README.md` - Getting started guide
- `frontend/REFACTOR_SUMMARY.md` - Implementation summary

**Design System Features:**
- 60+ color tokens across 5 brand color families
- Complete 10-shade scales (50-900) for all colors
- 12 pre-built typography classes
- Pattern utilities (woven-subtle, dots)
- Container utilities (narrow, medium, wide)
- Focus ring utilities
- CSS custom properties for theming
- Tailwind v4 integration
- Dark mode ready structure

### Component Quality Standards

All implemented components follow:
- ✅ "Lokal Verde" color palette with complete scales (50-900 for all colors)
- ✅ 8px spacing system with CSS custom properties (`--spacing-*`)
- ✅ Manrope font with correct type scale
- ✅ Appropriate border radius (default: `rounded-md`, uses `--radius-*` variables)
- ✅ Proper shadow elevation (uses `--shadow-*` variables)
- ✅ WCAG AA contrast requirements
- ✅ Hover/active/focus states with transitions (uses `--transition-*` variables)
- ✅ Responsive design (mobile-first)
- ✅ Accessible labels and ARIA attributes
- ✅ Consistent Lucide React iconography
- ✅ Established design patterns
- ✅ Pre-built typography classes (`.heading-*`, `.body-*`, `.text-*`)
- ✅ Utility classes for patterns and containers

---

## 📝 Changelog

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.2.0 | 2025-10-28 | **Major Update:** Documented complete `globals.css` implementation including: Manrope font (changed from Inter), accurate neutral color values, comprehensive spacing scale (13 values), complete border radius scale (7 values), shadow scale (5 values), z-index scale, transition system, pattern utilities, container utilities, focus ring utility, semantic color tokens (text, surface, border), updated typography classes with accurate sizes and line-heights, responsive typography behavior | Design Team |
| 1.1.0 | 2025-10-28 | Updated with comprehensive design system implementation: complete color scales (60+ tokens), typography classes, Lucide React icons, implemented components (Sidebar, BottomNav, AppLayout, pages), PWA features | Design Team |
| 1.0.0 | 2025-10-28 | Initial UI/UX design system | Design Team |

---

## 📚 Related Documents

- [Brand Brief](./brand-brief.md) - Brand identity and values
- [Brand Guidelines](./brand-guidelines.md) - Detailed brand standards
- [Mood Board](./mood-board.md) - Visual inspiration
- [Wireframe](./wireframe.md) - Layout wireframes
- [Design Progression](./design-progression.md) - Design evolution

---

*Document maintained by Design Team • Last reviewed: 2025-10-28*