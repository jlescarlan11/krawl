# 🏗️ System Architecture: Krawl MVP

> **Purpose:** Provides a comprehensive view of the Krawl application's system architecture, component interactions, data flows, and technical stack for the MVP phase.

**Version:** 0.1.0-MVP  
**Last Updated:** 2025-10-31  
**Status:** Active  
**Owner:** Engineering Team  
**Tech Stack:** Next.js 16, Spring Boot 3.5.7, PostgreSQL 15 + PostGIS 3.3, MapLibre GL JS, MapTiler, IndexedDB (idb)

---

## 📋 Table of Contents

1. [Architecture Overview](#-architecture-overview)
2. [Core Components](#-core-components)
3. [Data Flow Overview](#-data-flow-overview)
4. [API Communication Patterns](#-api-communication-patterns)
5. [Security Considerations](#-security-considerations)
6. [Hosting & Deployment](#-hosting--deployment)
7. [Technology Stack Summary](#-technology-stack-summary)
8. [Key Architectural Decisions](#-key-architectural-decisions)
9. [Development Environment](#️-development-environment)
10. [Changelog](#-changelog)
11. [Related Documents](#-related-documents)

---

## 📐 Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              KRAWL SYSTEM ARCHITECTURE                      │
└─────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────┐
│   👤 Client Layer        │
│   (User Device)          │
│                          │
│  Web Browser             │
│  Mobile/Desktop          │
│  PWA Application         │
└────────────┬─────────────┘
             │
             │ HTTP/HTTPS
             │ REST API Calls
             │ JSON Payload
             │
┌────────────▼─────────────┐          ┌─────────────────────┐
│   🎨 Frontend Layer      │          │  🗺️  Map Tiles      │
│   (PWA - Next.js)        │◄─────────┤  MapTiler           │
│                          │          │  (Vector Tiles)     │
│  • UI Rendering          │          └─────────────────────┘
│  • Client State          │
│  • MapLibre GL JS Maps   │
│  • 3D Map Visualization  │
│  • JWT Auth              │
│  • Service Workers       │
│  • Offline Caching       │
│  • GPS Integration       │
│  • IndexedDB Storage     │
│  • Sync Queue Manager    │
└────────────┬─────────────┘
             │
             │ RESTful API
             │ /api/* endpoints
             │ JWT in Headers
             │
┌────────────▼─────────────┐          ┌─────────────────────┐
│   ⚙️  Backend Layer      │          │  📦 Image Storage   │
│   (Spring Boot API)      │◄────────►│  Cloudinary         │
│                          │          │  (Primary: CDN +    │
│  • Business Logic        │          │   Transformations)  │
│  • Authentication        │          └─────────────────────┘
│  • JWT Generation        │
│  • Geospatial Queries    │
│  • Reputation System     │
│  • Status Management     │
│  • Duplicate Detection   │
└────────────┬─────────────┘
             │
             │ SQL Queries
             │ PostGIS Functions
             │ CRUD Operations
             │
┌────────────▼─────────────┐
│   🗄️  Database Layer     │
│   (PostgreSQL + PostGIS) │
│                          │
│  • User Data             │
│  • Gems & Krawls         │
│  • Tags & Ratings        │
│  • Geospatial Data       │
│  • Complex Queries       │
└──────────────────────────┘
```

---

## 🧩 Core Components

### 1️⃣ Client (User Device)

**Type**: Web Browser on Mobile/Desktop (PWA-Compatible)

**Required Capabilities**:
- Modern web browser (Chrome, Safari, Firefox, Edge)
- GPS/Location services
- Service Worker support
- IndexedDB support
- Cache API support
- localStorage support

**Interaction**:
- Users access Krawl PWA through web browser
- Progressive Web App installable on mobile/desktop
- Responsive design adapts to all screen sizes
- Works offline after initial load and download

---

### 2️⃣ Frontend (PWA)

**Technology Stack**:
| Component | Technology |
|-----------|------------|
| Framework | Next.js 16.0.0 (React 19.2.0) |
| Styling | Tailwind CSS v4 |
| Maps | MapLibre GL JS v5.10.0 |
| Map Provider | MapTiler (Vector Tiles) |
| State Management | React Hooks/Context |
| Offline Support | Service Workers (506 lines) |
| Local Storage | IndexedDB (idb v8.0.3), Cache API, LocalStorage |
| Offline Database | KrawlDB v2 (7 object stores) |
| Hosting | Vercel (Primary) / Netlify |
| Version Control | Git + GitHub |

**Key Responsibilities**:

- ✅ **UI Rendering**: Maps, Lists, Forms, Modals
- ✅ **Client-Side Routing**: Seamless navigation
- ✅ **State Management**: Application state handling
- ✅ **GPS Integration**: Device location tracking
- ✅ **Map Features**: 
  - Interactive 3D map display with WebGL rendering
  - Tilted view (60° pitch) with custom camera controls
  - 3D building extrusion with verde-themed colors
  - Custom compass/3D toggle control
  - Marker clustering (in progress)
  - Custom verde-colored markers
  - Geolocation with high accuracy
- ✅ **API Communication**: RESTful HTTP requests with JSON
- ✅ **Authentication**: JWT token storage and header management
- ✅ **PWA Features**: 
  - Offline caching of Krawl data
  - Map tile caching
  - Service worker implementation
- ✅ **Offline Storage**:
  - **IndexedDB (~50 MB)** - KrawlDB v2 with 7 object stores:
    - `gems` - Gem data with geospatial indexes
    - `krawls` - Krawl trails and itineraries
    - `users` - User profiles and creator info
    - `tags` - Tag taxonomy for categorization
    - `photos` - Gem photo metadata
    - `syncQueue` - Offline-first sync queue
    - `settings` - App configuration and preferences
  - **Cache API (~100 MB)** - Map tiles (MapTiler), static images, assets
  - **LocalStorage (~5 MB)** - Auth tokens (JWT), user settings, preferences
- ✅ **Responsive Design**: Tailwind CSS v4 styling

---

### 3️⃣ Backend (API)

**Technology Stack**:
| Component | Technology |
|-----------|------------|
| Framework | Spring Boot |
| Language | Java / Kotlin |
| API Type | RESTful (JSON over HTTP/HTTPS) |
| Build Tool | Maven / Gradle |
| Hosting | Render (Primary) / Heroku / AWS / Google Cloud |
| Password Hashing | bcrypt (cost factor 12) |

**Key Responsibilities**:

- 🔐 **Authentication & Authorization**:
  - User authentication
  - JWT generation and validation
  - Secure endpoint protection

- 📊 **Business Logic**:
  - Creating and managing Gems
  - Creating and managing Krawls
  - Duplicate detection and prevention
  - Reputation score calculation
  - Status management (Active/Completed/Cancelled)

- 🗺️ **Geospatial Operations**:
  - PostGIS integration
  - Proximity searches
  - Location-based queries

- 🔌 **API Endpoints**: 
  - RESTful endpoints under `/api/*`
  - CRUD operations for all entities
  - Image upload handling

- 🖼️ **External Service Integration**:
  - Image storage service interaction
  - URL generation for uploaded photos

---

### 4️⃣ Database

**Technology Stack**:
| Component | Technology |
|-----------|------------|
| Database | PostgreSQL 14+ |
| Extension | PostGIS 3.0+ |
| Hosting | Render PostgreSQL / Supabase / AWS RDS / Google Cloud SQL / Neon |
| Migration Tool | Flyway / Liquibase |

**Key Responsibilities**:

- 💾 **Data Persistence**:
  - Users
  - Gems
  - Krawls
  - Tags
  - Ratings
  - Comments
  - Photos

- 🌍 **Geospatial Storage**:
  - `geography` type for Gem locations
  - Efficient spatial indexing

- 🔍 **Query Execution**:
  - Complex SQL queries
  - Spatial queries using PostGIS functions
  - Examples: `ST_DWithin`, `ST_Distance`, `ST_MakePoint`

---

### 5️⃣ External Services

#### 📸 Image Storage
**Primary Provider**: Cloudinary (AWS S3 / Google Cloud Storage as alternatives)

**Why Cloudinary?**
- Generous free tier (25GB storage, 25GB bandwidth/month)
- Built-in image transformations and optimization
- Integrated CDN for fast global delivery
- Simple API integration

**Interaction Flow**:
1. Frontend sends image via `POST /gems/{gemId}/photos`
2. Backend receives and uploads to Cloudinary
3. Backend stores resulting CDN URL in `gem_photos` table
4. Frontend loads optimized images directly from Cloudinary CDN URLs

#### 🗺️ Map Tiles/APIs
**Primary Provider**: MapTiler

**Why MapTiler?**
- Vector tiles for smooth rendering and smaller file sizes
- Generous free tier (100,000 tile loads/month)
- Built-in CDN for fast global delivery
- Multiple style options (streets-v4, outdoor, satellite, hybrid)
- WebGL-optimized for modern browsers
- Excellent performance on mobile devices

**Interaction**:
- Frontend (MapLibre GL JS) fetches vector tiles for display
- Offline map tile caching via Service Worker
- 3D building data included in tiles
- Future integration possibilities: Geocoding/Directions APIs

**OpenStreetMap**: Data source (via MapTiler processing)

---

## 🔄 Data Flow Overview

### Complete Request-Response Cycle

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         DATA FLOW ARCHITECTURE                          │
└─────────────────────────────────────────────────────────────────────────┘

  ┌─────────────────┐
  │  User via PWA   │
  │ (Next.js/Leaflet)│
  └────────┬────────┘
           │
           │ 1. HTTP Request (JSON)
           │    - Headers: JWT Token
           │    - Method: GET/POST/PUT/DELETE
           │
           ▼
  ┌─────────────────┐      2. SQL Queries       ┌─────────────────┐
  │ Spring Boot API │◄────────────────────────►│   PostgreSQL    │
  │    (Backend)    │   - SELECT/INSERT/UPDATE  │  (DB + PostGIS) │
  │                 │   - PostGIS Functions     │                 │
  └────────┬────────┘                           └─────────────────┘
           │
           │ 3. HTTP Response (JSON)
           │    - Status Code
           │    - Data Payload
           │
           ▼
  ┌─────────────────┐
  │  User via PWA   │
  │   (UI Update)   │
  └─────────────────┘


┌──────────────────────────────────────────────────────────────────┐
│                    PARALLEL DATA FLOWS                           │
└──────────────────────────────────────────────────────────────────┘

Map Tile Loading:
  PWA ──────► MapTiler Tile Server (Vector) ──────► 3D Map Display
             (Direct HTTPS requests for tiles)        (MapLibre GL JS)
             └──────► Service Worker Cache (Offline)

Image Upload/Display:
  PWA ──────► Backend API ──────► Cloudinary Storage
                                       │
  PWA ◄──── Image CDN URL stored in DB ─┘
  PWA ──────► Cloudinary CDN (Direct Load) ──────► Image Display

Geospatial Queries:
  PWA ──────► Backend API ──────► PostgreSQL PostGIS
                                  (ST_DWithin, ST_Distance)
                                        │
  PWA ◄──── Filtered Gems/Krawls ───────┘
```

---

## 📡 API Communication Patterns

### Example: Viewing Nearby Gems

```
1. User opens map in PWA
   └─► Frontend gets GPS coordinates

2. Frontend → Backend
   GET /api/v1/gems/nearby?lat=40.7128&lng=-74.0060&radius=5000
   Headers: Authorization: Bearer <JWT>

3. Backend → Database
   SELECT * FROM gems 
   WHERE ST_DWithin(
     location::geography,
     ST_MakePoint(-74.0060, 40.7128)::geography,
     5000
   )

4. Database → Backend
   Returns list of gems within 5km

5. Backend → Frontend
   JSON response with gem data

6. Frontend renders markers on 3D map using MapLibre GL JS
```

### Example: Creating a New Gem

```
1. User fills form and adds photo
   
2. Frontend → Backend
   POST /api/v1/gems
   Body: { name, description, location, categoryId, tagIds }
   Headers: Authorization: Bearer <JWT>

3. Backend → Database
   INSERT INTO gems (...)
   Returns new gem_id

4. Frontend → Backend
   POST /api/v1/gems/{gemId}/photos
   Body: multipart/form-data with image

5. Backend → Image Storage (Cloudinary)
   Uploads image with transformations, gets CDN URL

6. Backend → Database
   INSERT INTO gem_photos (gem_id, photo_url, ...)

7. Backend → Frontend
   JSON response with complete gem data

8. Frontend updates UI and map
```

---

## 🔒 Security Considerations

| Layer | Security Measure | Implementation |
|-------|-----------------|----------------|
| **Frontend** | JWT token storage | HttpOnly cookies or secure localStorage |
| **Transport** | HTTPS only | TLS/SSL 1.3+ enforced |
| **API** | JWT validation | Verify signature on every protected request |
| **API** | Rate limiting | Max 100 req/min per IP/user |
| **Database** | SQL injection prevention | Prepared statements (JPA/Hibernate) |
| **Database** | Password hashing | bcrypt with cost factor 12 |
| **Images** | Secure uploads | Cloudinary signed URLs for uploads |
| **Images** | Content delivery | Cloudinary CDN with optimizations |
| **CORS** | Cross-origin policy | Properly configured for frontend domain |

---

## 🚀 Hosting & Deployment

**Infrastructure Overview:**
- **Frontend:** Vercel (PWA with global CDN)
- **Backend:** Render (containerized Spring Boot API)
- **Database:** Supabase/Render (PostgreSQL with PostGIS)
- **Images:** Cloudinary (cloud storage with CDN)

For complete deployment strategy, CI/CD workflow, database migration, cost breakdown, and monitoring setup, see [hosting-deployment-plan.md](hosting-deployment-plan.md).

---

## 📊 Technology Stack Summary

```
┌────────────────────────────────────────────────────────────┐
│                    TECHNOLOGY MATRIX                       │
├────────────────────┬───────────────────────────────────────┤
│ Layer              │ Technologies                          │
├────────────────────┼───────────────────────────────────────┤
│ Frontend           │ Next.js 16, React 19, TypeScript, Tailwind v4│
│ Mapping            │ MapLibre GL JS v5.10.0                │
│ Map Provider       │ MapTiler (Vector Tiles)               │
│ Offline Storage    │ IndexedDB (idb v8.0.3) - KrawlDB v2   │
│ Backend            │ Spring Boot 3.5.7, Java 25            │
│ Database           │ PostgreSQL 15 with PostGIS 3.3        │
│ Authentication     │ JWT, bcrypt (cost factor 12)          │
│ Image Storage      │ Cloudinary (Primary)                  │
│ API Protocol       │ REST (JSON over HTTP/HTTPS)           │
│ PWA Features       │ Service Workers, Web App Manifest     │
│ Build Tools        │ npm/pnpm (Frontend), Maven/Gradle (BE)│
│ Migration Tool     │ Flyway / Liquibase                    │
│ Version Control    │ Git + GitHub                          │
│ CI/CD              │ Vercel/Render auto-deploy from Git    │
│ Hosting (Frontend) │ Vercel (Primary), Netlify             │
│ Hosting (Backend)  │ Render (Primary), Heroku, AWS, GCP    │
│ Hosting (Database) │ Render PostgreSQL, Supabase, AWS RDS  │
└────────────────────┴───────────────────────────────────────┘
```

---

## 🎯 Key Architectural Decisions

1. **PWA First**: Enables offline functionality and mobile app-like experience
   - IndexedDB for Krawl data (~50 MB)
   - Cache API for map tiles and images (~100 MB)
   - LocalStorage for auth tokens and settings (~5 MB)

2. **PostGIS Integration**: Native geospatial queries for performance
   - Efficient proximity searches using `ST_DWithin`
   - Accurate distance calculations with geography type
   - Spatial indexing with GIST for fast queries

3. **JWT Authentication**: Stateless authentication for scalability
   - bcrypt password hashing (cost factor 12)
   - Token expiration: 24 hours (access), 30 days (refresh)
   - Secure storage in HttpOnly cookies or secure localStorage

4. **Separated Frontend/Backend**: Independent scaling and deployment
   - Frontend: Static hosting with global CDN (Vercel)
   - Backend: Containerized API with zero-downtime deploys (Render)
   - Enables independent version updates and rollbacks

5. **Cloudinary for Images**: Optimized image delivery and management
   - 25GB free tier suitable for MVP
   - Built-in transformations and optimizations
   - Integrated CDN for fast global delivery
   - Simple API integration

6. **RESTful API**: Standard, well-documented communication protocol
   - JSON over HTTP/HTTPS
   - Rate limiting: 100 req/min per IP/user
   - Comprehensive endpoint structure under `/api/*`

7. **MapLibre GL JS + MapTiler**: Modern WebGL mapping with vector tiles
   - Superior performance with WebGL rendering
   - Native 3D building support with custom styling
   - Vector tiles for smaller file sizes and smooth zooming
   - Generous free tier (100,000 tile loads/month)
   - Offline map tile caching capability
   - Better mobile performance than raster tiles
   - Open-source library with no vendor lock-in

8. **IndexedDB (idb library)**: Structured offline-first data storage
   - KrawlDB v2 with 7 specialized object stores
   - ~50MB storage for gems, krawls, and metadata
   - Fast indexed queries (by-creator, by-status, by-synced)
   - Sync queue for offline operations
   - Better than localStorage for complex data structures
   - Asynchronous API prevents UI blocking

9. **Free/Low-Cost Hosting**: Enables MVP launch with minimal costs
   - Start with free tiers (Vercel, Render, Supabase/Render DB)
   - Pay-as-you-grow model
   - Easy upgrade paths without architecture changes

10. **Database Migration Management**: Version-controlled schema changes
    - Flyway/Liquibase for controlled migrations
    - Prevents manual schema drift
    - Automated deployment integration

11. **Git-Based CI/CD**: Automated deployments from version control
    - GitHub as central repository
    - Auto-deploy on push to main branch
    - Automated testing before production deploy

---

## 🛠️ Development Environment

### Local Development Setup

**Prerequisites**:
- Git (version control)
- Node.js (Latest LTS) - Frontend development
- JDK 17+ - Backend development
- Docker & Docker Compose - Local database
- Code Editor (VS Code, IntelliJ IDEA, etc.)

**Repository Structure**:
```
krawl/
├── frontend/          # Next.js PWA Frontend
├── backend/           # Spring Boot Backend API
├── docs/              # Project documentation
├── init-scripts/      # Database initialization scripts
├── docker-compose.yml # Local PostgreSQL + PostGIS setup
└── README.md
```

**Local Services**:
| Service | Port | URL |
|---------|------|-----|
| Frontend (Next.js) | 3000 | http://localhost:3000 |
| Backend (Spring Boot) | 8080 | http://localhost:8080 |
| PostgreSQL + PostGIS | 5432 | localhost:5432 |

**Database Connection (Local)**:
```
Host: localhost
Port: 5432
Database: krawl
User: krawl_user
Password: (from .env file)
Connection String: postgresql://krawl_user:password@localhost:5432/krawl
```

### Development Workflow

1. Clone repository from GitHub
2. Start PostgreSQL + PostGIS via Docker Compose
3. Run backend (Spring Boot) - auto-runs migrations
4. Run frontend (Next.js)
5. Access app at http://localhost:3000

---

## 📝 Changelog

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.3.0 | 2025-10-29 | **Major Update:** Replaced Leaflet.js with MapLibre GL JS v5.10.0; Changed map provider from OpenStreetMap to MapTiler (vector tiles); Added comprehensive IndexedDB section (KrawlDB v2 with 7 object stores); Updated offline storage architecture with idb v8.0.3 library; Added 3D map visualization features (60° pitch, custom camera controls, 3D buildings with verde colors); Updated technology matrix with current versions (Next.js 16, React 19, Spring Boot 3.5.7, PostgreSQL 15, PostGIS 3.3); Expanded architectural decisions to include IndexedDB rationale | Engineering Team |
| 1.1.0 | 2025-10-28 | Updated with comprehensive details from all docs: specific hosting recommendations (Vercel, Render, Cloudinary, Supabase), offline storage breakdown, cost structure, development environment, expanded architectural decisions, security details | Engineering Team |
| 1.0.0 | 2025-10-28 | Initial system architecture documentation | Engineering Team |

---

## 📚 Related Documents

- [API Documentation](./api-documentation.md)
- [Database Schema](./database-schema.md)
- [Tech Stack](./tech-stack.md)
- [System Design](./system-design.md)
- [Security Plan](./security-plan.md)
- [Hosting & Deployment Plan](./hosting-deployment-plan.md)

---

*Technical documentation maintained by Engineering Team • Last reviewed: 2025-10-28*
