# Design Tokens: Krawl

> **Purpose:** Core design tokens including colors, typography, spacing, and visual properties that form the foundation of Krawl's design system.

**Version:** 2.0.0  
**Last Updated:** 2025-10-31  
**Status:** Active  
**Theme:** "Lokal Verde"

---

## Quick Reference

| Token Type | Implementation | File Location |
|------------|----------------|---------------|
| Colors | CSS custom properties | `frontend/globals.css` |
| Typography | Tailwind utilities | `tailwind.config.ts` |
| Spacing | Tailwind scale | `tailwind.config.ts` |
| Shadows | CSS custom properties | `frontend/globals.css` |

**Full Documentation:** See `frontend/DESIGN_SYSTEM.md` for complete implementation details.

---

## Color Palette: "Lokal Verde"

### Primary - Verde (Green)

Represents growth, nature, and Filipino authenticity.

| Shade | Hex | Usage |
|-------|-----|-------|
| `verde-50` | `#e8f5e9` | Very light backgrounds |
| `verde-100` | `#c8e6c9` | Light backgrounds, hover |
| `verde-200` | `#a5d6a7` | Lighter accents |
| `verde-300` | `#81c784` | Medium light |
| `verde-400` | `#66bb6a` | Medium accents |
| **`verde-500`** | **`#2D7A3E`** | **PRIMARY BRAND COLOR** |
| `verde-600` | `#2e7d32` | Hover states |
| `verde-700` | `#1b5e20` | Dark primary |
| `verde-800` | `#145018` | Very dark |
| `verde-900` | `#0d3810` | Darkest, strong contrast |

**Usage:** Primary buttons, active states, headers, brand elements.

---

### Secondary - Sand (Beige/Tan)

Warm, earthy secondary representing Filipino beaches.

| Shade | Hex | Usage |
|-------|-----|-------|
| `sand-50` | `#fafaf8` | Subtle backgrounds |
| `sand-100` | `#f5f5dc` | Card backgrounds |
| `sand-300` | `#e0d9c0` | Borders, dividers |
| `sand-500` | `#c2b896` | Medium sand |
| `sand-700` | `#8d7a4a` | Dark sand text |
| `sand-900` | `#4a4028` | Darkest sand |

**Usage:** Secondary surfaces, borders, warm backgrounds.

---

### Accent - Mango (Yellow/Orange)

Vibrant accent representing tropical energy.

| Shade | Hex | Usage |
|-------|-----|-------|
| `mango-100` | `#ffecb3` | Light accents |
| **`mango-400`** | **`#ffca28`** | **Main accent, highlights, CTAs** |
| `mango-700` | `#ffa000` | Darker accent, hover |

**Usage:** Highlights, CTAs, map paths, featured elements.

---

### Clay (Terracotta)

Earthy terracotta representing traditional Filipino pottery.

| Shade | Hex | Usage |
|-------|-----|-------|
| `clay-100` | `#fde8e5` | Light backgrounds |
| `clay-500` | `#c95d47` | Medium clay |
| `clay-700` | `#af3f2e` | Dark clay text |

**Usage:** Warm accents, decorative elements.

---

### Teal

Cool complementary color for variety.

| Shade | Hex | Usage |
|-------|-----|-------|
| `teal-100` | `#b2dfdb` | Light backgrounds, badges |
| `teal-500` | `#009688` | Medium teal accents |
| `teal-700` | `#00796b` | Dark teal text |

**Usage:** Informational elements, cool accents.

---

### Neutral Grays

Complete grayscale for text, borders, backgrounds.

| Shade | Hex | Usage |
|-------|-----|-------|
| `neutral-50` | `#fafafa` | Main page background |
| `neutral-100` | `#f5f5f5` | Card backgrounds |
| `neutral-200` | `#e5e5e5` | Borders, dividers |
| `neutral-300` | `#d4d4d4` | Light borders |
| `neutral-400` | `#a3a3a3` | Placeholder text |
| `neutral-500` | `#737373` | Secondary text |
| `neutral-600` | `#525252` | Secondary headings |
| **`neutral-700`** | **`#404040`** | **Primary text** |
| `neutral-800` | `#262626` | Dark text |
| `neutral-900` | `#171717` | Very dark text |

---

### Semantic Colors

| Purpose | Color | Hex | Usage |
|---------|-------|-----|-------|
| **❌ Error** | `error` | `#d32f2f` | Error messages, destructive actions |
| **⚠️ Warning** | `warning` | `#ffa000` | Warnings, cautions |
| **✅ Success** | `success` | `#388e3c` | Success messages, confirmations |
| **ℹ️ Info** | `info` | `#1976d2` | Informational messages |

---

## CSS Custom Properties

### Text Colors

```css
--color-text-primary: #424242;    /* Primary body text */
--color-text-secondary: #757575;  /* Secondary text, captions */
--color-text-tertiary: #9e9e9e;   /* Tertiary text, placeholders */
--color-text-disabled: #bdbdbd;   /* Disabled text */
```

### Surface Colors

```css
--color-background: #fafafa;            /* Main page background */
--color-background-secondary: #ffffff;  /* Secondary backgrounds */
--color-surface: #ffffff;               /* Card surfaces */
--color-surface-hover: #f5f5f5;         /* Hover state */
```

### Border Colors

```css
--color-border: #e0e0e0;        /* Default borders */
--color-border-light: #eeeeee;  /* Light borders */
--color-border-dark: #bdbdbd;   /* Emphasized borders */
--color-divider: #e0e0e0;       /* Section dividers */
```

---

## Typography

### Font Family

**Primary Font:** Manrope  
**Fallback Stack:** `-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif`

```css
--font-family-sans: 'Manrope', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
```

---

### Type Scale

| Class | Size | Usage | Line Height |
|-------|------|-------|-------------|
| `text-xs` | 12px (0.75rem) | Fine print, micro labels | 1.4 |
| `text-sm` | 14px (0.875rem) | Secondary body, labels | 1.5 |
| **`text-base`** | **16px (1rem)** | **Primary body text** | **1.5** |
| `text-lg` | 18px (1.125rem) | Large body, subheadings | 1.4 |
| `text-xl` | 20px (1.25rem) | H3, Card titles | 1.3 |
| `text-2xl` | 24px (1.5rem) | H2, Section titles | 1.3 |
| `text-3xl` | 30px (1.875rem) | H1, Page titles | 1.2 |
| `text-4xl` | 36px (2.25rem) | Display text | 1.2 |
| `text-5xl` | 48px (3rem) | Hero text | 1.1 |

**Default Body:** `text-base` (16px)

---

### Font Weights

| Class | Weight | Usage |
|-------|--------|-------|
| `font-normal` | 400 | Body text |
| `font-medium` | 500 | Subheadings, emphasized text |
| `font-semibold` | 600 | Headings, buttons |
| `font-bold` | 700 | Strong emphasis, large headings |
| `font-extrabold` | 800 | Display text, hero headings |

---

### Pre-built Typography Classes

```css
.heading-1     /* 30px, semibold, 1.2 line-height */
.heading-2     /* 24px, semibold, 1.3 line-height */
.heading-3     /* 20px, semibold, 1.3 line-height */
.body-lg       /* 18px, normal, 1.4 line-height */
.body-base     /* 16px, normal, 1.5 line-height */
.body-sm       /* 14px, normal, 1.5 line-height */
.body-xs       /* 12px, normal, 1.4 line-height */
.text-caption  /* 12px, normal, 1.4 line-height, neutral-500 */
.text-label    /* 14px, medium, 1.5 line-height */
.text-display  /* 36px, bold, 1.2 line-height */
```

---

## Spacing Scale

### Standard Scale (Tailwind)

| Class | Value | Usage |
|-------|-------|-------|
| `0` | 0px | No spacing |
| `1` | 4px | Minimum gap |
| `2` | 8px | Tight spacing |
| `3` | 12px | Default gap |
| `4` | 16px | Standard spacing |
| `5` | 20px | Comfortable spacing |
| `6` | 24px | Generous spacing |
| `8` | 32px | Section spacing |
| `10` | 40px | Large spacing |
| `12` | 48px | Major section spacing |
| `16` | 64px | Page section spacing |
| `20` | 80px | Very large spacing |

**Component-specific:**
- **Buttons:** `px-4 py-2` (horizontal: 16px, vertical: 8px)
- **Cards:** `p-4` (16px all sides)
- **Sections:** `py-8` or `py-12` (vertical: 32px or 48px)

---

## Border Radius

| Class | Value | Usage |
|-------|-------|-------|
| `rounded-none` | 0px | Sharp corners |
| `rounded-sm` | 2px | Subtle rounding |
| `rounded` | 4px | Default, buttons, inputs |
| `rounded-md` | 6px | Cards, panels |
| `rounded-lg` | 8px | Large cards, modals |
| `rounded-xl` | 12px | Prominent elements |
| `rounded-2xl` | 16px | Very prominent |
| `rounded-3xl` | 24px | Extra prominent |
| `rounded-full` | 9999px | Circular elements, pills |

**Default:** `rounded` (4px) for most interactive elements.

---

## Shadows

### Elevation System

| Class | Usage | Box Shadow |
|-------|-------|------------|
| `shadow-sm` | Subtle lift (cards) | `0 1px 2px 0 rgba(0,0,0,0.05)` |
| `shadow` | Default elevation | `0 1px 3px 0 rgba(0,0,0,0.1), 0 1px 2px 0 rgba(0,0,0,0.06)` |
| `shadow-md` | Hover state | `0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)` |
| `shadow-lg` | Modals, drawers | `0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)` |
| `shadow-xl` | Floating elements | `0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)` |

**Custom CSS:**

```css
--shadow-soft: 0 2px 8px rgba(0,0,0,0.08);           /* Soft, subtle shadow */
--shadow-lifted: 0 4px 12px rgba(0,0,0,0.12);        /* Lifted appearance */
--shadow-floating: 0 8px 24px rgba(0,0,0,0.15);      /* Floating elements */
```

---

## Z-Index Scale

| Layer | Value | Usage |
|-------|-------|-------|
| Base | 0 | Default layer |
| Dropdown | 10 | Dropdowns, tooltips |
| Fixed | 50 | Fixed headers, footers |
| Modal Backdrop | 100 | Modal overlays |
| Modal | 110 | Modal content |
| Popover | 200 | Popovers, context menus |
| Toast | 300 | Notifications |

---

## Breakpoints

### Responsive Design

| Breakpoint | Width | Target Devices |
|------------|-------|----------------|
| `sm` | 640px | Large phones (landscape) |
| `md` | 768px | Tablets (portrait) |
| `lg` | 1024px | Tablets (landscape), small laptops |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Large desktops |

**Mobile-First Approach:** Design for smallest screen first, then enhance.

---

## Accessibility

### Contrast Requirements

All color combinations meet **WCAG AA standards**:
- **Normal text:** Minimum 4.5:1 contrast ratio
- **Large text:** Minimum 3:1 contrast ratio

### Focus States

```css
/* Default focus ring */
.focus-ring {
  @apply focus:outline-none focus:ring-2 focus:ring-verde-500 focus:ring-offset-2;
}
```

---

## Usage Guidelines

### Color Usage

✅ **Do:**
- Use `verde-500` for primary actions
- Use `neutral-700` for body text
- Use semantic colors for feedback messages
- Maintain consistent color meaning

❌ **Don't:**
- Mix primary brand colors inconsistently
- Use low-contrast color combinations
- Override semantic color meanings

### Typography Usage

✅ **Do:**
- Use heading scale consistently (H1 → H2 → H3)
- Keep body text at 16px minimum
- Use appropriate line-height for readability

❌ **Don't:**
- Use too many font weights in one view
- Make body text smaller than 14px
- Skip heading levels

### Spacing Usage

✅ **Do:**
- Use spacing scale consistently
- Apply more spacing around important elements
- Maintain vertical rhythm

❌ **Don't:**
- Use arbitrary spacing values
- Cram elements too closely
- Over-space content

---

## Implementation

### Tailwind Configuration

Colors and spacing are defined in `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      verde: { /* 50-900 scale */ },
      sand: { /* 50-900 scale */ },
      mango: { /* 100-900 scale */ },
      // ...
    }
  }
}
```

### CSS Custom Properties

Global tokens in `frontend/globals.css`:

```css
:root {
  --color-text-primary: #424242;
  --color-surface: #ffffff;
  --font-family-sans: 'Manrope', sans-serif;
  /* ... */
}
```

---

## 📚 Related Documents

- [Design Components](./design-components.md) - UI component specifications
- [Design Patterns](./design-patterns.md) - Layout and interaction patterns
- [Brand Guidelines](./brand-guidelines.md) - Brand identity and voice
- [Accessibility Guide](../how-to/accessibility.md) *(to be created)*

---

*Design tokens maintained by Design Team • Last reviewed: 2025-10-31*

