# 🔧 Developer Setup: Advanced Configuration

> **Purpose:** Advanced setup guide for developers working on Krawl, including repository structure, naming conventions, detailed configuration, and troubleshooting.

**Version:** 0.1.0-MVP  
**Last Updated:** 2025-11-01  
**Status:** Active  
**Owner:** Development Team

---

## 📋 Table of Contents

1. [Repository Structure](#-repository-structure)
2. [Naming Conventions](#-naming-conventions)
3. [Advanced Configuration](#-advanced-configuration)
4. [Storage Service Setup](#-storage-service-setup)
5. [Troubleshooting](#-troubleshooting)

---

## 📁 Repository Structure

A monorepo structure with separate directories for frontend and backend:

```
krawl/                             # ✅ ACTUAL STRUCTURE
├── frontend/                      # Next.js PWA Frontend
│   ├── app/                       # ✅ Next.js App Router (pages, layouts)
│   │   ├── add/                   # ✅ Add Gem page
│   │   │   └── page.tsx
│   │   ├── explore/               # ✅ Explore Gems page
│   │   │   └── page.tsx
│   │   ├── krawls/                # ✅ Krawls page
│   │   │   └── page.tsx
│   │   ├── profile/               # ✅ Profile page
│   │   │   └── page.tsx
│   │   ├── favicon.ico            # ✅ App icon
│   │   ├── globals.css            # ✅ Complete design system (545 lines)
│   │   ├── layout.tsx             # ✅ Root layout
│   │   ├── page.tsx               # ✅ Home/Map page
│   │   └── register-sw.tsx        # ✅ Service worker registration
│   │
│   ├── components/                # ✅ Reusable React components
│   │   ├── AppLayout.tsx          # ✅ Main layout wrapper
│   │   ├── BottomNav.tsx          # ✅ Mobile bottom navigation
│   │   ├── Header.tsx             # ✅ Desktop header
│   │   ├── MapArea.tsx            # ✅ Map display container
│   │   └── Sidebar.tsx            # ✅ Desktop sidebar navigation
│   │
│   ├── lib/                       # ✅ Utility functions, API client
│   │   └── api.ts                 # ✅ API client setup
│   │
│   ├── public/                    # ✅ Static assets
│   │   ├── manifest.json          # ✅ PWA manifest
│   │   ├── sw.js                  # ✅ Service worker
│   │   └── [other assets]
│   │
│   ├── eslint.config.mjs          # ✅ ESLint configuration
│   ├── next.config.ts             # ✅ Next.js configuration
│   ├── package.json               # ✅ Frontend dependencies
│   ├── postcss.config.mjs         # ✅ PostCSS configuration
│   └── tsconfig.json              # ✅ TypeScript configuration
│
├── backend/                       # Spring Boot Backend API
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/              # Java/Kotlin source code
│   │   │   │   └── com/
│   │   │   │       └── krawl/
│   │   │   │           ├── config/      # Spring configurations (Security, CORS)
│   │   │   │           ├── controller/  # API endpoint controllers
│   │   │   │           ├── dto/         # Data Transfer Objects (Requests, Responses)
│   │   │   │           ├── entity/      # JPA entities mapping to DB tables
│   │   │   │           ├── exception/   # Custom exception handlers
│   │   │   │           ├── repository/  # Spring Data JPA repositories
│   │   │   │           ├── security/    # JWT authentication/authorization logic
│   │   │   │           ├── service/     # Business logic services
│   │   │   │           └── util/        # Utility classes
│   │   │   └── resources/         # Configuration files, DB migrations
│   │   │       ├── db/
│   │   │       │   └── migration/ # Flyway/Liquibase migration scripts
│   │   │       └── application.yml
│   │   └── test/                  # Unit and integration tests
│   ├── pom.xml                    # Maven build configuration
│   └── mvnw                       # Maven wrapper script
│
├── docs/                          # Project documentation
├── .gitignore                     # Git ignore rules
├── README.md                      # Project overview and setup instructions
└── docker-compose.yml             # Docker configuration for local database
```

---

## 📝 Naming Conventions

For complete naming conventions across frontend, backend, database, and Git, see the [Contributing Guidelines](../../CONTRIBUTING.md#-naming-conventions).

### Quick Reference

| Convention | Usage | Example |
|------------|-------|---------|
| `PascalCase` | Components, Classes, Types | `GemCard.tsx`, `UserEntity`, `GemType` |
| `camelCase` | Variables, Functions, Methods | `userName`, `findGems()`, `createKrawl()` |
| `UPPER_SNAKE_CASE` | Constants | `MAX_RETRIES`, `API_BASE_URL` |
| `kebab-case` | CSS classes, URLs, Branches, Docs | `gem-card`, `/api/gems`, `feature/krw-15-description` |
| `snake_case` | Database tables, columns | `user_id`, `gems`, `gem_ratings` |

### Frontend Examples

- **Components:** `GemCard.tsx`, `MapArea.tsx`, `BottomNav.tsx`
- **Hooks:** `useMapState.ts`, `useAuth.ts`
- **Types:** `GemType.ts`, `UserProps`
- **Files:** `api.ts`, `utils.ts`

### Backend Examples

- **Classes:** `GemService`, `UserEntity`, `AuthController`
- **Methods:** `findNearbyGems()`, `createGem()`, `validateToken()`
- **Endpoints:** `/api/v1/gems`, `/api/v1/krawls`
- **Packages:** `com.krawl.backend.service`, `com.krawl.backend.controller`

### Database Examples

- **Tables:** `users`, `gems`, `gem_ratings`, `krawl_items`
- **Columns:** `user_id`, `created_at`, `location`
- **Indexes:** `idx_gems_location`, `idx_users_email`
- **Constraints:** `pk_users`, `fk_gems_user_id`

---

## ⚙️ Advanced Configuration

### Environment Variables

Create a `.env` file in the project root:

```env
# Database Configuration for Local Development
DB_USER=krawl_user
DB_PASSWORD=krawl_dev_password_2025

# Server Configuration
SERVER_PORT=8080

# Cloudinary Configuration
# Get these credentials from https://cloudinary.com/console
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
CLOUDINARY_FOLDER=krawl-gems

# Frontend API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

### Backend Configuration

Edit `backend/src/main/resources/application.yml`:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5434/krawl
    username: ${DB_USER}
    password: ${DB_PASSWORD}
  
  jpa:
    hibernate:
      ddl-auto: validate
    show-sql: false
    properties:
      hibernate:
        dialect: org.hibernate.spatial.dialect.postgis.PostgisDialect

server:
  port: ${SERVER_PORT:8080}
```

### Frontend Configuration

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
NEXT_PUBLIC_MAPTILER_API_KEY=your-maptiler-key
```

---

## 📸 Storage Service Setup

**Service:** Cloudinary  
**Purpose:** Host user-uploaded Gem photos with automatic optimization

### Configuration Details

| Configuration | Value |
|--------------|-------|
| **Service Provider** | Cloudinary |
| **Folder** | `krawl-gems` (configurable via `CLOUDINARY_FOLDER`) |
| **CDN URL** | `https://res.cloudinary.com/{your-cloud-name}/` |
| **Max File Size** | 10MB |
| **Supported Formats** | JPEG, PNG, WebP, HEIC |
| **Auto Optimization** | ✅ WebP conversion, quality: auto:good |
| **Max Image Size** | 1200x1200 (preserves aspect ratio) |
| **Thumbnails** | Auto-generated: 400x400 and 800x800 |

### Setup Steps

1. Create a free account at [cloudinary.com](https://cloudinary.com)
2. Go to Dashboard → Account Details
3. Copy your Cloud Name, API Key, and API Secret
4. Replace the placeholder values in `.env` with your actual credentials
5. The folder name (`krawl-gems`) will be created automatically on first upload

### Features

- ✅ Automatic image optimization (WebP format, quality auto-tuning)
- ✅ Smart resizing (max 1200x1200, only if larger)
- ✅ Thumbnail generation (400x400 and 800x800)
- ✅ CDN delivery for fast global access
- ✅ Secure HTTPS URLs
- ✅ File type validation
- ✅ File size validation (10MB limit)

### API Endpoints

- `POST /api/v1/storage/upload` - Upload image with optional gemId
- `DELETE /api/v1/storage/delete?url={imageUrl}` - Delete image by URL

### Test Upload

```bash
# Upload a test image
curl -X POST http://localhost:8080/api/v1/storage/upload \
  -F "file=@path/to/image.jpg" \
  -F "gemId=123e4567-e89b-12d3-a456-426614174000"

# Response example:
# {
#   "url": "https://res.cloudinary.com/your-cloud/image/upload/v123/krawl-gems/...",
#   "message": "Image uploaded successfully"
# }
```

---

## 🆘 Troubleshooting

### Common Issues

#### Port Already in Use

**Backend (8080):**
```bash
# Find process using port 8080
lsof -i :8080  # macOS/Linux
netstat -ano | findstr :8080  # Windows

# Kill the process or change SERVER_PORT in .env
```

**Frontend (3000):**
```bash
# Find process using port 3000
lsof -i :3000  # macOS/Linux
netstat -ano | findstr :3000  # Windows

# Kill the process or set PORT in .env.local
```

#### Database Connection Failed

**Check Docker Container:**
```bash
docker ps
docker logs krawl-postgres
```

**Verify Credentials:**
- Check `.env` file exists in project root
- Verify `DB_USER` and `DB_PASSWORD` match docker-compose.yml
- Ensure `application.yml` uses environment variables correctly

**Test Connection:**
```bash
docker exec -it krawl-postgres psql -U krawl_user -d krawl
```

#### Dependencies Installation Failed

**Frontend:**
```bash
# Clear npm cache
npm cache clean --force

# Delete and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Backend:**
```bash
# Clean and rebuild
./mvnw clean install
```

#### PostGIS Extension Issues

**Verify PostGIS is enabled:**
```sql
-- Connect to database and check
SELECT PostGIS_version();
```

**If not enabled:**
```sql
CREATE EXTENSION IF NOT EXISTS postgis;
```

---

## 📚 Additional Resources

- [Getting Started Tutorial](../tutorials/getting-started.md) - Beginner-friendly setup guide
- [Tech Stack](./tech-stack.md) - Technology choices and rationale
- [Architecture Overview](../explanation/architecture-overview.md) - System architecture and components
- [Design Patterns](../explanation/design-patterns.md) - Design patterns and data flows
- [Version Control Strategy](../planning/version-control-strategy.md) - Git workflow and branching
- [API Endpoints](./api-endpoints.md) - Backend API specifications

---

## 📝 Changelog

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0.0 | 2025-10-31 | Initial developer setup guide created from project-setup.md | Development Team |

---

*Document maintained by Development Team • Last reviewed: 2025-10-31*

