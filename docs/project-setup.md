# 🛠️ Project Setup Guide: Krawl

> **Purpose:** This guide outlines the repository structure, naming conventions, environment setup steps, and configuration needed to begin development on the Krawl PWA.

**Version:** 1.0.0  
**Last Updated:** 2025-10-28  
**Status:** Active  
**Owner:** Development Team

---

## 📋 Table of Contents

1. [Repository Structure](#-repository-structure)
2. [Naming Conventions](#-naming-conventions)
3. [Prerequisites](#-prerequisites)
4. [Setup Steps](#-setup-steps)
5. [Configuration](#-configuration)
6. [Verification](#-verification)

---

## 📁 Repository Structure

A monorepo structure (using a tool like Nx, Turborepo, or simple npm/yarn workspaces) is recommended to manage the frontend and backend code together, but separate directories within a single Git repository also work.

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
│   │   ├── file.svg
│   │   ├── globe.svg
│   │   ├── next.svg
│   │   ├── vercel.svg
│   │   └── window.svg
│   │
│   ├── COLOR_PALETTE.md           # ✅ Color reference documentation
│   ├── DESIGN_SYSTEM.md           # ✅ Complete design system guide (584 lines)
│   ├── DESIGN_SYSTEM_CHANGELOG.md # ✅ Design system changes
│   ├── DESIGN_SYSTEM_INDEX.md     # ✅ Documentation navigation
│   ├── DESIGN_SYSTEM_README.md    # ✅ Design system overview
│   ├── DESIGN_TOKENS.md           # ✅ Quick reference for developers
│   ├── REFACTOR_SUMMARY.md        # ✅ Implementation summary
│   ├── eslint.config.mjs          # ✅ ESLint configuration
│   ├── next.config.ts             # ✅ Next.js configuration
│   ├── next-env.d.ts              # ✅ Next.js TypeScript definitions
│   ├── package.json               # ✅ Frontend dependencies
│   ├── postcss.config.mjs         # ✅ PostCSS configuration
│   ├── README.md                  # ✅ Frontend README
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
│   ├── build.gradle(.kts)         # Gradle build configuration (or pom.xml)
│   ├── gradlew                    # Gradle wrapper script
│   └── ...
│
├── docs/                          # Project documentation
│
├── .gitignore                     # Git ignore rules
├── README.md                      # Project overview and setup instructions
└── ...                            # Other config files (Dockerfile, docker-compose.yml)
```

---

## 📝 Naming Conventions

Consistency in naming is crucial for maintainability.

### General Rules

| Convention | Usage | Example |
|------------|-------|---------|
| `camelCase` | Variables, functions, file names (JS/TS/Java/Kotlin) | `userName`, `fetchGemData()` |
| `PascalCase` | React components, classes, TypeScript types/interfaces | `GemCard`, `UserEntity`, `GemType` |
| `UPPER_SNAKE_CASE` | Constants | `MAX_RETRIES`, `API_BASE_URL` |
| `kebab-case` | CSS classes, URLs, config keys | `gem-card`, `/api/gems`, `api-timeout` |

### Frontend (Next.js/React)

| Item | Convention | Example |
|------|------------|---------|
| **Components** | PascalCase | `GemCard.tsx`, `KrawlDetailMap.tsx` |
| **Pages/Routes** | kebab-case folders, `page.tsx` | `gems/[id]/page.tsx` |
| **Hooks** | `useCamelCase` | `useMapState.ts`, `useAuth.ts` |
| **Types** | PascalCase | `GemType.ts`, `KrawlStepProps` |

### Backend (Spring Boot - Java/Kotlin)

| Item | Convention | Example |
|------|------------|---------|
| **Classes** | PascalCase | `GemService`, `KrawlController`, `UserEntity` |
| **Methods/Variables** | camelCase | `findNearbyGems()`, `currentUser` |
| **Packages** | lowercase | `com.krawl.service`, `com.krawl.controller` |
| **DTOs** | PascalCase + Suffix | `CreateGemRequest`, `GemResponse` |
| **Entities** | PascalCase + Entity | `UserEntity`, `GemEntity` |
| **Repositories** | PascalCase + Repository | `GemRepository`, `UserRepository` |
| **REST Endpoints** | kebab-case, plural nouns | `/api/gems`, `/api/krawls/{krawlId}/items` |

### Database (PostgreSQL)

| Item | Convention | Example |
|------|------------|---------|
| **Tables** | snake_case, plural | `users`, `gem_ratings` |
| **Columns** | snake_case | `user_id`, `created_at`, `krawl_title` |
| **Primary Keys** | `[table_singular]_id` | `user_id`, `gem_id` |
| **Foreign Keys** | `[referenced_table_singular]_id` | `creator_id` (references `users`) |
| **Indexes** | `idx_[table]_[columns]` | `idx_gems_location` |

### Git Branches

| Branch Type | Convention | Example |
|-------------|------------|---------|
| **Main** | `main` or `master` | `main` |
| **Feature** | `feature/[ticket-id]-[description]` | `feature/KRW-15-add-gem-pinning` |
| **Bugfix** | `fix/[ticket-id]-[description]` | `fix/KRW-21-map-zoom-issue` |
| **Release** | `release/v[version]` | `release/v0.1.0` |

---

## 🛠️ Development Environment Setup

### Prerequisites

Before starting, ensure you have the following installed:

| Tool | Version | Download Link |
|------|---------|---------------|
| **Git** | Latest | [Install Git](https://git-scm.com/downloads) |
| **Node.js** | Latest LTS | [Install Node.js](https://nodejs.org/) |
| **JDK** | 17 or later | [Install JDK](https://adoptium.net/) |
| **Docker & Docker Compose** | Latest | [Install Docker](https://www.docker.com/get-started) |
| **Code Editor** | Any | VS Code, IntelliJ IDEA, etc. |

> **💡 Tip:** Consider using `nvm` (Node Version Manager) for managing Node.js versions.

---

### Setup Steps

#### 1️⃣ Clone the Repository

```bash
git clone <repository-url> krawl-app
cd krawl-app
```

---

#### 2️⃣ Run Database

##### Using Docker (Recommended)

**Create Environment File:**

Create a `.env` file in the project root with the following content:

```env
# Database Configuration for Local Development
DB_USER=krawl_user
DB_PASSWORD=krawl_dev_password_2025
```

**Start the PostgreSQL + PostGIS Container:**

```bash
docker-compose up -d
```

**Verify the Container is Running:**

```bash
docker ps
```

You should see the `krawl-postgres` container running.

**Database Connection Details:**

| Parameter | Value |
|-----------|-------|
| Host | `localhost` |
| Port | `5432` |
| Database | `krawl` |
| Username | `krawl_user` (from .env) |
| Password | `krawl_dev_password_2025` (from .env) |
| Connection String | `postgresql://krawl_user:krawl_dev_password_2025@localhost:5432/krawl` |

**PostGIS Extension:**

The PostGIS extension is automatically enabled via the init script at `init-scripts/01-init-postgis.sql`.

> **Alternative:** Install PostgreSQL + PostGIS locally and configure connection details manually.

---

#### 3️⃣ Setup Backend

Navigate to the backend directory:

```bash
cd backend
```

**Configure Database Connection:**

Edit `src/main/resources/application.yml` (or `.properties`) with your local database credentials:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/krawl_db
    username: your_username
    password: your_password
```

**Build the Project:**

```bash
./gradlew build
# Or for Maven: ./mvnw package
```

**Run Database Migrations:**

Flyway/Liquibase migrations are typically integrated into the build or run command.

**Run the Spring Boot Application:**

```bash
./gradlew bootRun
# Or for Maven: ./mvnw spring-boot:run
```

✅ The backend API should now be running at **http://localhost:8080**

---

#### 4️⃣ Setup Frontend

Open a new terminal window and navigate to the frontend directory:

```bash
cd ../frontend
```

**Install Dependencies:**

```bash
npm install
```

> **📦 Dependencies Installed:**
> - Next.js 16.0.0
> - React 19.2.0
> - TypeScript ^5
> - Tailwind CSS v4
> - React Icons (Lucide) v5.5.0

**Configure API Base URL:**

Create a `.env.local` file or configure the API client to point to:

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api
```

**Run the Next.js Development Server:**

```bash
npm run dev
```

✅ The frontend PWA should now be accessible at **http://localhost:3000**

**What You'll See:**
- ✅ Sidebar navigation (desktop) with collapsible menu
- ✅ Bottom navigation (mobile) with 5 tabs
- ✅ Complete design system with "Lokal Verde" colors
- ✅ Responsive layout adapting to screen size
- ✅ Pages: Map (home), Explore, Krawls, Add Gem, Profile
- ✅ PWA features (service worker, manifest)

---

### ✅ Verification

1. **Access the Frontend:**
   - Open [http://localhost:3000](http://localhost:3000) in your browser
   - You should see the Krawl PWA map interface

2. **Test Basic Navigation:**
   - Try navigating the map
   - Explore different features

3. **Test Backend Communication:**
   - Try registering/logging in (if implemented)
   - Check browser dev tools (Network tab) for API calls
   - Monitor backend logs for any errors

4. **Verify Database Connection:**
   - Check that the backend connects to PostgreSQL successfully
   - Verify migrations have run

---

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [PostGIS Documentation](https://postgis.net/documentation/)
- [Docker Documentation](https://docs.docker.com/)

---

## 🆘 Troubleshooting

### Common Issues

**Port Already in Use:**
- Backend (8080): Check if another application is using port 8080
- Frontend (3000): Check if another Next.js app is running

**Database Connection Failed:**
- Verify Docker container is running: `docker ps`
- Check database credentials in `application.yml`
- Ensure PostgreSQL is accepting connections

**Dependencies Installation Failed:**
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and reinstall
- For Gradle issues, try: `./gradlew clean build`

---

## 🤝 Contributing

Please ensure you follow the naming conventions and project structure outlined in this document when contributing to the Krawl project.

---

## 📝 Changelog

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.1.0 | 2025-10-28 | Updated with actual frontend structure: App Router pages (add, explore, krawls, profile), components (Sidebar, BottomNav, AppLayout, Header, MapArea), design system files, PWA features, dependencies (Next.js 16, React 19, Tailwind v4, React Icons) | Development Team |
| 1.0.0 | 2025-10-28 | Initial project setup guide | Development Team |

---

## 📚 Related Documents

- [Tech Stack](./tech-stack.md) - Technology choices and rationale
- [System Architecture](./system-architecture.md) - System design and architecture
- [Version Control Strategy](./version-control-strategy.md) - Git workflow and branching
- [Database Schema](./database-schema.md) - Database structure and setup
- [API Documentation](./api-documentation.md) - Backend API specifications

---

*Document maintained by Development Team • Last reviewed: 2025-10-28*

