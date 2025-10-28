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

**Rationale:**
- Enables rapid development of a performant, server-rendered/statically-generated PWA
- Supports features crucial for SEO and PWA functionality (like service workers for offline support)
- Aligns with potential team familiarity with React/JavaScript
- Built-in optimization for production deployments

**Language:** JavaScript/TypeScript

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

## 🔧 Additional Considerations

### Development Tools
- **Version Control:** Git + GitHub/GitLab
- **API Testing:** Postman or Insomnia
- **Package Management:** npm/pnpm (Frontend), Maven/Gradle (Backend)

### Future Enhancements
- **Authentication:** Consider Auth0, Firebase Auth, or Spring Security
- **Analytics:** Google Analytics 4 or Plausible
- **Monitoring:** Sentry for error tracking
- **CI/CD:** GitHub Actions or GitLab CI

---

## 📝 Changelog

| Version | Date | Changes | Author |
|---------|------|---------|--------|
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

