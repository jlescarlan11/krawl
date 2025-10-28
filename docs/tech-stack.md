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

**Key Dependencies:**
- `tailwindcss`: ^4
- `@tailwindcss/postcss`: ^4

**Implementation:**
- Complete design system in `globals.css` (545 lines)
- 60+ color tokens with CSS custom properties
- Typography utilities and pre-built classes
- Component utilities (patterns, containers, focus rings)
- Tailwind theme integration for seamless use

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

