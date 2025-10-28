# 🔧 Tech Stack: Krawl MVP

> **Purpose:** This document outlines the core technologies, frameworks, libraries, and deployment strategies chosen for building the Krawl Progressive Web App MVP, with rationale for each decision.

**Version:** 1.0.0  
**Last Updated:** 2025-10-28  
**Status:** Active  
**Owner:** Development Team

---

## 📋 Technology Overview

| Layer | Technology | Version/Type |
|-------|-----------|--------------|
| **Frontend Framework** | Next.js | React Framework |
| **Backend Framework** | Spring Boot | Java/Kotlin |
| **Database** | PostgreSQL | with PostGIS Extension |
| **Styling** | Tailwind CSS | v4 |
| **Mapping Library** | Leaflet.js | with plugins |

---

## 🎨 Frontend Stack

### **Next.js** (React Framework)

**Version:** 16.0.0  
**Language:** TypeScript

**Rationale:**
- Enables rapid development of a performant, server-rendered/statically-generated PWA
- Supports features crucial for SEO and PWA functionality (like service workers for offline support)
- Aligns with potential team familiarity with React/JavaScript
- Built-in optimization for production deployments
- App Router provides modern routing and layout patterns

**Key Dependencies:**
- `next`: 16.0.0
- `react`: 19.2.0
- `react-dom`: 19.2.0
- `typescript`: ^5

---

## ⚙️ Backend Stack

### **Spring Boot** (Java/Kotlin)

**Rationale:**
- Provides a robust, mature, and scalable framework for building the REST API
- Offers strong database integration and security features
- Large ecosystem with extensive community support
- Kotlin is a viable, modern language option within this framework

**Language:** Java or Kotlin

---

## 🗄️ Database

### **PostgreSQL** with **PostGIS Extension**

**Rationale:**
- Powerful open-source relational database
- **PostGIS** provides essential, high-performance geospatial data types and functions
- Required for storing Gem locations and performing proximity queries
- Supports duplicate checks and nearby searches efficiently
- Battle-tested for production workloads

---

## 🎨 Styling Framework

### **Tailwind CSS v4**

**Rationale:**
- Utility-first CSS framework for rapid UI development
- Easy implementation of the "Lokal Verde" design system directly within markup
- Minimal CSS bundle size with tree-shaking
- Excellent developer experience with modern tooling
- Integrated with Next.js via @tailwindcss/postcss
- New `@theme` directive for seamless CSS custom property integration

**Key Dependencies:**
- `tailwindcss`: ^4
- `@tailwindcss/postcss`: ^4

**Implementation:** Complete design system in `frontend/app/globals.css` (545 lines)

#### CSS Architecture

The styling system is organized into five distinct layers:

**1. Design Tokens (CSS Custom Properties)**
```css
:root {
  /* Color Palette */
  --color-verde-50 through --color-verde-900  /* 10 shades */
  --color-sand-50 through --color-sand-900    /* 10 shades */
  --color-mango-50 through --color-mango-900  /* 10 shades */
  --color-clay-50 through --color-clay-900    /* 10 shades */
  --color-teal-50 through --color-teal-900    /* 10 shades */
  --color-neutral-50 through --color-neutral-900  /* 10 shades */
  
  /* Semantic Colors */
  --color-text-primary, --color-text-secondary, --color-text-tertiary
  --color-background, --color-surface, --color-border
  --color-error, --color-warning, --color-success, --color-info
  
  /* Typography */
  --font-family-sans: 'Manrope', -apple-system, ...
  --font-size-xs through --font-size-5xl  /* 9 sizes */
  --font-weight-normal, --font-weight-medium, --font-weight-semibold, --font-weight-bold
  --line-height-tight, --line-height-normal, --line-height-relaxed
  
  /* Spacing (8px base grid) */
  --spacing-0 through --spacing-24  /* 13 values */
  
  /* Border Radius */
  --radius-none, --radius-sm, --radius-md, --radius-lg, --radius-xl, --radius-2xl, --radius-full
  
  /* Shadows */
  --shadow-xs, --shadow-sm, --shadow-md, --shadow-lg, --shadow-xl
  
  /* Z-Index Scale */
  --z-index-dropdown, --z-index-sticky, --z-index-fixed, --z-index-modal, etc.
  
  /* Transitions */
  --transition-fast, --transition-base, --transition-slow
}
```

**2. Tailwind Theme Extensions**

Uses Tailwind v4's `@theme` directive to map CSS custom properties to Tailwind utilities:

```css
@theme {
  --color-verde-*: initial;
  --color-verde-50: var(--color-verde-50);
  /* ... maps all 60+ color tokens */
  
  --font-family-sans: var(--font-family-sans);
}
```

This enables seamless use of design tokens through Tailwind classes:
- `text-verde-700` → `var(--color-verde-700)`
- `bg-sand-100` → `var(--color-sand-100)`
- `font-sans` → `var(--font-family-sans)`

**3. Base Styles**
- Global resets and defaults
- Body styling with Manrope font
- Typography base styles

**4. Component Utilities**
```css
.pattern-woven-subtle  /* Cross-hatch background pattern */
.pattern-dots          /* Dot grid pattern */
.focus-ring            /* Accessible focus indicator */
.container-narrow      /* 640px centered container */
.container-medium      /* 1024px centered container */
.container-wide        /* 1280px centered container */
```

**5. Typography System**

Pre-built typography classes for consistent text styling:
```css
.heading-1, .heading-2, .heading-3, .heading-4, .heading-5, .heading-6
.body-lg, .body-base, .body-sm, .body-xs
.text-label, .text-caption, .text-display
```

Each class includes appropriate font-size, weight, line-height, and letter-spacing.

#### Benefits of This Architecture

✅ **Single Source of Truth:** All design tokens in one place  
✅ **Easy Theming:** Update CSS variables to change entire theme  
✅ **Type Safety:** Works with Tailwind's autocomplete in IDEs  
✅ **Performance:** Minimal CSS output with Tailwind's JIT compiler  
✅ **Maintainability:** Clear separation of concerns  
✅ **Scalability:** Easy to add new tokens or utilities  
✅ **Accessibility:** Built-in patterns like `.focus-ring` for a11y  
✅ **Dark Mode Ready:** Structure supports future theme variants

---

## 🎨 Icon Library

### **React Icons** (Lucide Icons)

**Version:** 5.5.0  
**Icon Set:** Lucide React (`react-icons/lu`)

**Rationale:**
- Comprehensive, well-designed icon set with consistent style
- Tree-shakeable - only imports icons actually used
- Native React components with TypeScript support
- Line-based icons matching our design system aesthetic
- Excellent accessibility and customization options

**Usage:**
```tsx
import { LuMapPin, LuSearch, LuPlus } from 'react-icons/lu';

<LuMapPin size={20} className="text-verde-700" />
```

**Implemented Icons:**
- Navigation: LuMap, LuMapPin, LuSearch, LuRoute, LuPlus, LuUser
- UI Controls: LuChevronLeft, LuChevronRight, LuSettings
- And more as needed

---

## 🗺️ Mapping Library

### **Leaflet.js**

**With Potential Plugins:**
- `Leaflet.markercluster` - For handling Gem density visualization

**Rationale:**
- Lightweight, flexible, open-source JavaScript library for interactive maps
- Well-suited for PWA implementation
- Excellent plugin ecosystem for extended functionality
- Mobile-friendly and performant
- Active community and comprehensive documentation

---

## 🚀 Deployment Strategy (MVP Phase)

### Frontend (PWA)

| Platform | Tier | Use Case |
|----------|------|----------|
| **Vercel** | Free/Low-cost | Primary recommendation for Next.js |
| **Netlify** | Free/Low-cost | Alternative deployment option |

### Backend (REST API)

| Platform | Tier | Use Case |
|----------|------|----------|
| **Render** | Free/Low-cost | Simple deployment for Spring Boot |
| **Heroku** | Free/Low-cost | Traditional PaaS option |
| **AWS Elastic Beanstalk** | Free/Low-cost | AWS ecosystem integration |
| **Google Cloud Run** | Free/Low-cost | Containerized deployment |

### Database (PostgreSQL + PostGIS)

| Platform | Type | Tier |
|----------|------|------|
| **AWS RDS** | Managed PostgreSQL | Free/Low-cost |
| **Google Cloud SQL** | Managed PostgreSQL | Free/Low-cost |
| **Azure Database** | Managed PostgreSQL | Free/Low-cost |
| **Supabase** | PostgreSQL-as-a-Service | Free/Low-cost |
| **Neon** | Serverless PostgreSQL | Free/Low-cost |
| **Render** | Managed PostgreSQL | Free/Low-cost |

---

## 💡 Stack Benefits

This technology stack balances several key requirements for the MVP phase:

```
✓ Rapid Development    → Next.js + Tailwind CSS
✓ Backend Robustness   → Spring Boot
✓ Geospatial Support   → PostgreSQL + PostGIS
✓ Cost Effectiveness   → Free/low-cost deployment tiers
✓ Scalability          → Production-ready technologies
✓ Developer Experience → Modern tooling and frameworks
```

---

## 📱 PWA Features

### Service Worker
**Status:** ✅ Implemented

**Files:**
- `frontend/public/sw.js` - Service worker script
- `frontend/app/register-sw.tsx` - Registration component
- `frontend/public/manifest.json` - Web app manifest

**Capabilities:**
- Offline caching strategy
- Asset precaching for faster loads
- Network-first with cache fallback
- Background sync (future enhancement)

**Rationale:**
- Enables offline functionality critical for local exploration
- Provides app-like experience on mobile devices
- Improves performance through intelligent caching
- Installable on home screen

---

## 🔧 Additional Considerations

### Development Tools
- **Version Control:** Git + GitHub ✅ Active
- **API Testing:** Postman or Insomnia
- **Package Management:** npm (Frontend) ✅ Active, Maven (Backend) ✅ Active
- **Code Editor:** VS Code, IntelliJ IDEA
- **Linting:** ESLint (Frontend) ✅ Active

### Implemented Features
- ✅ **Design System:** Complete CSS custom properties + Tailwind integration
- ✅ **Component Library:** Navigation components (Sidebar, BottomNav, AppLayout)
- ✅ **PWA Foundation:** Service worker, manifest, offline support
- ✅ **TypeScript:** Full type safety across frontend
- ✅ **Icon System:** Lucide React icons library
- ✅ **Responsive Design:** Mobile-first approach with Tailwind

### Future Enhancements
- **Authentication:** Consider Auth0, Firebase Auth, or Spring Security
- **Analytics:** Google Analytics 4 or Plausible
- **Monitoring:** Sentry for error tracking
- **CI/CD:** GitHub Actions or GitLab CI
- **Leaflet.js:** Map integration (prepared infrastructure)
- **API Integration:** Connect frontend to Spring Boot backend

---

## 📝 Changelog

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.2.0 | 2025-10-28 | **Major Update:** Documented complete CSS architecture and Tailwind v4 integration from `globals.css`: Added detailed CSS Architecture section explaining 5-layer system (Design Tokens, Tailwind Theme Extensions, Base Styles, Component Utilities, Typography System); documented 60+ CSS custom properties for colors, typography, spacing, shadows, z-index, and transitions; explained `@theme` directive usage for seamless Tailwind integration; documented Manrope font as primary typeface; added Benefits of This Architecture section highlighting scalability, maintainability, and performance advantages | Development Team |
| 1.1.0 | 2025-10-28 | Updated with implemented features: Next.js 16.0.0, React 19.2.0, TypeScript, Tailwind CSS v4 with complete design system, React Icons (Lucide) v5.5.0, PWA features (service worker, manifest), component library status | Development Team |
| 1.0.0 | 2025-10-28 | Initial tech stack document | Development Team |

---

## 📚 Related Documents

- [Project Setup](./project-setup.md) - Development environment configuration
- [System Architecture](./system-architecture.md) - System design and architecture
- [System Design](./system-design.md) - Detailed system design patterns
- [Database Schema](./database-schema.md) - PostgreSQL/PostGIS schema
- [Hosting Deployment Plan](./hosting-deployment-plan.md) - Deployment infrastructure

---

*Document maintained by Development Team • Last reviewed: 2025-10-28*

