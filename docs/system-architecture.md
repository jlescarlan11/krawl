# 🏗️ System Architecture: Krawl MVP

> **Purpose:** Provides a comprehensive view of the Krawl application's system architecture, component interactions, data flows, and technical stack for the MVP phase.

**Version:** 1.0.0  
**Last Updated:** 2025-10-28  
**Status:** Active  
**Owner:** Engineering Team  
**Tech Stack:** Next.js, Spring Boot, PostgreSQL + PostGIS

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
9. [Changelog](#-changelog)
10. [Related Documents](#-related-documents)

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
│   (PWA - Next.js)        │◄─────────┤  Google Maps / OSM  │
│                          │          │  (Tile Server)      │
│  • UI Rendering          │          └─────────────────────┘
│  • Client State          │
│  • Leaflet.js Maps       │
│  • JWT Auth              │
│  • Service Workers       │
│  • Offline Caching       │
│  • GPS Integration       │
└────────────┬─────────────┘
             │
             │ RESTful API
             │ /api/* endpoints
             │ JWT in Headers
             │
┌────────────▼─────────────┐          ┌─────────────────────┐
│   ⚙️  Backend Layer      │          │  📦 Image Storage   │
│   (Spring Boot API)      │◄────────►│  AWS S3 / GCS       │
│                          │          │  Cloudinary         │
│  • Business Logic        │          └─────────────────────┘
│  • Authentication        │
│  • JWT Generation        │
│  • Geospatial Queries    │
│  • Reputation System     │
│  • Status Management     │
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

**Type**: Web Browser on Mobile/Desktop

**Technology Stack**:
- HTML5
- CSS3
- JavaScript (ES6+)

**Interaction**:
- Users interact with the Krawl PWA interface
- Responsive design for both mobile and desktop experiences

---

### 2️⃣ Frontend (PWA)

**Technology Stack**:
| Component | Technology |
|-----------|------------|
| Framework | Next.js (React) |
| Styling | Tailwind CSS |
| Maps | Leaflet.js |
| State Management | React Hooks/Context |
| Offline Support | Service Workers |
| Hosting | Vercel / Netlify |

**Key Responsibilities**:

- ✅ **UI Rendering**: Maps, Lists, Forms, Modals
- ✅ **Client-Side Routing**: Seamless navigation
- ✅ **State Management**: Application state handling
- ✅ **GPS Integration**: Device location tracking
- ✅ **Map Features**: 
  - Interactive map display
  - Marker clustering
  - Custom markers
- ✅ **API Communication**: RESTful HTTP requests with JSON
- ✅ **Authentication**: JWT token storage and header management
- ✅ **PWA Features**: 
  - Offline caching of Krawl data
  - Map tile caching
  - Service worker implementation
- ✅ **Responsive Design**: Tailwind CSS styling

---

### 3️⃣ Backend (API)

**Technology Stack**:
| Component | Technology |
|-----------|------------|
| Framework | Spring Boot |
| Language | Java / Kotlin |
| API Type | RESTful |
| Hosting | Render / AWS / Google Cloud |

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
| Database | PostgreSQL |
| Extension | PostGIS |
| Hosting | AWS RDS / Google Cloud SQL / Render |

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
**Providers**: AWS S3 / Google Cloud Storage / Cloudinary

**Interaction Flow**:
1. Frontend sends image via `POST /gems/{gemId}/photos`
2. Backend receives and uploads to cloud storage
3. Backend stores resulting URL in `gem_photos` table
4. Frontend loads images directly from CDN URLs

#### 🗺️ Map Tiles/APIs
**Providers**: Google Maps Platform / OpenStreetMap

**Interaction**:
- Frontend (Leaflet) fetches map tiles for display
- Potential future integration for Geocoding/Directions APIs

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
  PWA ──────► Google Maps/OSM Tile Server ──────► Map Display
             (Direct HTTP requests for tiles)

Image Upload/Display:
  PWA ──────► Backend API ──────► S3/GCS Storage
                                        │
  PWA ◄──── Image URL stored in DB ─────┘
  PWA ──────► CDN URL (Direct Load) ──────► Image Display

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
   GET /api/gems/nearby?lat=40.7128&lng=-74.0060&radius=5000
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

6. Frontend renders markers on map using Leaflet
```

### Example: Creating a New Gem

```
1. User fills form and adds photo
   
2. Frontend → Backend
   POST /api/gems
   Body: { name, description, location, categoryId, tagIds }
   Headers: Authorization: Bearer <JWT>

3. Backend → Database
   INSERT INTO gems (...)
   Returns new gem_id

4. Frontend → Backend
   POST /api/gems/{gemId}/photos
   Body: multipart/form-data with image

5. Backend → Image Storage (S3/GCS)
   Uploads image, gets URL

6. Backend → Database
   INSERT INTO gem_photos (gem_id, photo_url, ...)

7. Backend → Frontend
   JSON response with complete gem data

8. Frontend updates UI and map
```

---

## 🔒 Security Considerations

| Layer | Security Measure |
|-------|-----------------|
| **Frontend** | JWT token stored securely (httpOnly cookies or secure localStorage) |
| **API** | JWT validation on all protected endpoints |
| **Database** | Prepared statements to prevent SQL injection |
| **Images** | Signed URLs for uploads, CDN for delivery |
| **HTTPS** | All communication encrypted via TLS/SSL |

---

## 🚀 Hosting & Deployment

### MVP Architecture

```
Frontend (PWA)         →  Vercel / Netlify
Backend (API)          →  Render / AWS / Google Cloud
Database               →  AWS RDS / Google Cloud SQL / Render PostgreSQL
Image Storage          →  AWS S3 / Google Cloud Storage / Cloudinary
```

### Scalability Considerations

- **Frontend**: Static hosting with CDN for global distribution
- **Backend**: Horizontal scaling with load balancer
- **Database**: Vertical scaling initially, read replicas for future growth
- **Images**: CDN caching for optimal delivery

---

## 📊 Technology Stack Summary

```
┌────────────────────────────────────────────────────────────┐
│                    TECHNOLOGY MATRIX                       │
├────────────────────┬───────────────────────────────────────┤
│ Layer              │ Technologies                          │
├────────────────────┼───────────────────────────────────────┤
│ Frontend           │ Next.js, React, TypeScript, Tailwind  │
│ Mapping            │ Leaflet.js                            │
│ Backend            │ Spring Boot, Java/Kotlin              │
│ Database           │ PostgreSQL + PostGIS                  │
│ Authentication     │ JWT (JSON Web Tokens)                 │
│ Image Storage      │ AWS S3 / GCS / Cloudinary             │
│ Map Tiles          │ Google Maps / OpenStreetMap           │
│ API Protocol       │ REST (JSON over HTTP/HTTPS)           │
│ PWA Features       │ Service Workers, Web App Manifest     │
└────────────────────┴───────────────────────────────────────┘
```

---

## 🎯 Key Architectural Decisions

1. **PWA First**: Enables offline functionality and mobile app-like experience
2. **PostGIS Integration**: Native geospatial queries for performance
3. **JWT Authentication**: Stateless authentication for scalability
4. **Separated Frontend/Backend**: Independent scaling and deployment
5. **Cloud Storage for Images**: Reduces database load and improves delivery
6. **RESTful API**: Standard, well-documented communication protocol
7. **Leaflet over Google Maps**: Open-source flexibility with tile provider choice

---

## 📝 Changelog

| Version | Date | Changes | Author |
|---------|------|---------|--------|
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
