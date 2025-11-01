# Epic 1: Project Setup & Environment Configuration

> **Purpose:** Initialize project structure, configure development environment, and establish foundational tooling for the Krawl MVP.

**Epic ID:** EPIC-1  
**Priority:** 🔴 Critical  
**Status:** 🟢 Complete  
**Owner:** DevOps & Lead Developers

---

## Epic Goals

- ✅ Create organized repository structure
- ✅ Configure development environments for all team members
- ✅ Set up database with PostGIS
- ✅ Initialize frontend (Next.js) and backend (Spring Boot)
- ✅ Establish CI/CD pipeline basics
- ✅ Document setup procedures

---

## Task Board

```
┌──────────────────────────────────────────────────────┐
│  To Do              In Progress            Done      │
├──────────────────────────────────────────────────────┤
│                                                       │
│                                          PS-1 ✅     │
│                                          PS-2 ✅     │
│                                          PS-3 ✅     │
│                                          PS-4 ✅     │
│                                          PS-5 ✅     │
│                                          PS-6 ✅     │
│                                          PS-7 ✅     │
│                                          PS-8 ✅     │
│                                          PS-8a ✅    │
│                                          PS-9 ✅     │
│                                                       │
└──────────────────────────────────────────────────────┘
```

---

## Tasks

### ✅ PS-1: Initialize Git Repository & Define Structure

**Description:** Create the main Git repository and set up the initial directory structure.

**Acceptance Criteria:**
- ✅ Git repository created on GitHub
- ✅ `frontend/`, `backend/`, `docs/` directories exist
- ✅ Initial `.gitignore` file configured

#### How to Implement
- Context: Create the foundational repository and baseline structure for coordinated frontend, backend, and docs work.
- Prerequisites:
  - GitHub organization/project access
  - Local SSH key configured (optional) and Git installed
- Steps:
  1) Create a new GitHub repository "krawl" (private or public).
  2) Clone locally and add base folders: `frontend/`, `backend/`, `docs/`.
  3) Add language-appropriate `.gitignore` (Node, Java, OS). Keep `.env*` ignored.
  4) Add `docs/README.md` pointing to Diátaxis hub (already present) and commit.
  5) Push to GitHub and protect `main` branch (require PRs and reviews).
- References:
  - Docs hub: `docs/README.md`
  - Tutorial: `docs/tutorials/getting-started.md`
- Acceptance Criteria (verify):
  - Repo is cloneable; folder structure matches
  - `.gitignore` prevents committing `.env*` and build artifacts
- Test/Verification:
  - `git status` clean after creating `.env` files locally
  - Repository visible on GitHub
- Artifacts:
  - PR/Commit: "repo: initialize project structure and docs hub"

**Status:** Done  
**Assignee:** Lead Dev

---

### ✅ PS-2: Establish & Document Naming Conventions

**Description:** Formally adopt naming conventions for consistent codebase organization.

**Acceptance Criteria:**
- ✅ Naming conventions documented
- ✅ Conventions cover files, variables, classes, database, Git branches
- ✅ Documentation accessible to team

#### How to Implement
- Context: Ensure consistency and readability across all codebases and docs.
- Prerequisites:
  - Agreement among leads (FE, BE, Docs)
- Steps:
  1) Create `docs/planning/conventions.md` or add to existing standards doc.
  2) Define conventions: file/folder case, React component names, Java package names, SQL identifiers, migration file naming, branch naming (`feature/`, `fix/`).
  3) Link conventions from `docs/README.md` and team onboarding notes.
- References:
  - Docs standards: `docs/reference/doc-standards.md` (if present)
  - Brand voice: `docs/reference/brand-guidelines.md`
- Acceptance Criteria (verify):
  - Conventions discoverable from docs hub
  - Examples included for each stack
- Test/Verification:
  - Open a random FE/BE file and validate it adheres to the conventions
- Artifacts:
  - PR: "docs: add naming conventions and link from docs hub"

**Status:** Done  
**Assignee:** Project Lead

---

### ✅ PS-3: Verify Prerequisites Installation

**Description:** Ensure all team members have necessary development tools installed.

**Prerequisites:**
- Git
- Node.js/nvm
- JDK 17+
- Docker/Docker Compose
- Code editor (VS Code recommended)

**Acceptance Criteria:**
- ✅ Each team member confirms installation
- ✅ Shared checklist completed

#### How to Implement
- Context: Reduce setup friction by validating core tools are installed.
- Prerequisites: None
- Steps:
  1) Verify Git: `git --version`.
  2) Verify Node: `node -v` (18+), `npm -v`.
  3) Verify Java: `java -version` (17+), `javac -version`.
  4) Verify Docker: `docker --version`, `docker compose version`.
  5) Record confirmations in a shared checklist (README or issue template).
- References:
  - Tutorial: `docs/tutorials/getting-started.md`
- Acceptance Criteria (verify):
  - All teammates tick off the checklist
- Test/Verification:
  - Screenshot/terminal output per dev for versions
- Artifacts:
  - PR: "docs: add setup checklist to README"

**Status:** Done  
**Assignee:** All Team Members

---

### ✅ PS-4: Configure Docker for Database

**Description:** Create and test `docker-compose.yml` for PostgreSQL + PostGIS.

**Acceptance Criteria:**
- ✅ `docker-compose.yml` file exists
- ✅ `docker-compose up -d` starts database successfully
- ✅ PostGIS extension enabled
- ✅ Connection verified via DB client
- ✅ Default credentials documented

#### How to Implement
- Context: Provide a consistent local PostgreSQL + PostGIS environment.
- Prerequisites:
  - Docker Desktop running
- Steps:
  1) Create `docker-compose.yml` with `postgres:14` + PostGIS (or use a PostGIS image).
  2) Set env: `POSTGRES_DB=krawl_db`, `POSTGRES_USER=krawl_user`, `POSTGRES_PASSWORD=krawl_password`.
  3) Start: `docker compose up -d` and wait 10–15s.
  4) Enable PostGIS: `docker exec -it <container> psql -U krawl_user -d krawl_db -c "CREATE EXTENSION IF NOT EXISTS postgis;"`.
  5) Document connection string for backend: `jdbc:postgresql://localhost:5432/krawl_db`.
- References:
  - How-to: `docs/how-to/test-database.md`
  - Reference: `docs/reference/database-schema.md`
- Acceptance Criteria (verify):
  - `SELECT PostGIS_Full_Version();` returns version string
- Test/Verification:
  - `docker ps` shows container Up; psql connects and queries succeed
- Artifacts:
  - PR: "devops: add docker-compose for postgres/postgis and docs"

**Status:** Done  
**Assignee:** Backend Dev

**Related:** [Database Testing Guide](../../how-to/test-database.md)

---

### ✅ PS-5: Initialize Backend Project (Spring Boot)

**Description:** Set up Spring Boot project structure with required dependencies.

**Acceptance Criteria:**
- ✅ Spring Boot project generated
- ✅ Directory structure follows documentation
- ✅ `application.yml` created with DB placeholders
- ✅ Project builds successfully
- ✅ Flyway/Liquibase configured for migrations
- ✅ Spring Scheduler configured
- ✅ Logging framework configured (SLF4J/Logback)
- ✅ Environment variable handling configured

#### How to Implement
- Context: Scaffold the API service with required dependencies and config.
- Prerequisites:
  - DB container running (PS-4)
- Steps:
  1) Generate Spring Boot (3.x) with Web, Validation, Security, JPA, PostgreSQL, Flyway.
  2) Add `application.yml` using `${DATABASE_URL}`, `${DB_USERNAME}`, `${DB_PASSWORD}` (no secrets in repo).
  3) Add Flyway `V1__initial_schema.sql` aligned with `docs/reference/database-schema.md`.
  4) Build: `./mvnw clean install`
  5) Add base packages: `controllers`, `services`, `repositories`, `config`.
- References:
  - Reference: `docs/reference/api-endpoints.md`
  - How-to: `docs/how-to/implement-security.md`
  - Reference: `docs/reference/database-schema.md`
- Acceptance Criteria (verify):
  - Build succeeds locally; app starts without errors
- Test/Verification:
  - `./mvnw spring-boot:run` then hit `/actuator/health` (if enabled)
- Artifacts:
  - PR: "backend: initialize Spring Boot project and Flyway"

**Status:** Done  
**Assignee:** Backend Dev

**Tech Stack:**
- Spring Boot 3.5.7
- Java 17+
- Maven
- PostgreSQL driver
- PostGIS support

---

### ✅ PS-6: Configure Backend Database Connection & Migrations

**Description:** Configure Spring Boot to connect to local Dockerized database.

**Acceptance Criteria:**
- ✅ `application.yml` configured with local DB credentials
- ✅ CORS configuration implemented
- ✅ Global exception handler created
- ✅ Backend starts and connects to database successfully
- ✅ Initial database migration runs successfully

#### How to Implement
- Context: Wire up the API to the local database with migrations and essentials.
- Prerequisites:
  - PS-4 and PS-5 complete
- Steps:
  1) Configure datasource in `application.yml` using env vars (no hardcoded secrets).
  2) Add CORS config to allow `http://localhost:3000` (dev), see security docs.
  3) Add global exception handler for validation errors (400) and auth errors (401).
  4) Run migrations: `./mvnw flyway:migrate` or on startup.
  5) Verify schema applied matches `database-schema.md`.
- References:
  - How-to: `docs/how-to/implement-security.md`
  - Reference: `docs/reference/database-schema.md`
- Acceptance Criteria (verify):
  - API boots; DB tables exist; basic queries run
- Test/Verification:
  - `SELECT COUNT(*) FROM information_schema.tables WHERE table_schema='public';`
- Artifacts:
  - PR: "backend: configure datasource, CORS, global exception handling"

**Status:** Done  
**Assignee:** Backend Dev

---

### ✅ PS-7: Initialize Frontend Project (Next.js)

**Description:** Set up Next.js project with TypeScript and App Router.

**Acceptance Criteria:**
- ✅ Next.js project created using App Router
- ✅ Directory structure matches documentation
- ✅ TypeScript configured (`tsconfig.json`)
- ✅ Dependencies install successfully
- ✅ Project runs in development mode

#### How to Implement
- Context: Scaffold the PWA frontend with TypeScript and App Router.
- Prerequisites:
  - Node 18+
- Steps:
  1) `npx create-next-app@latest frontend --ts --eslint`.
  2) Add Tailwind: `npm install -D tailwindcss postcss autoprefixer` and init config.
  3) Add base folders: `src/app`, `src/components`, `src/lib`.
  4) Run dev: `npm run dev` and verify `http://localhost:3000`.
- References:
  - Reference: `docs/reference/design-tokens.md`, `docs/reference/design-components.md`
  - Wireframes: `docs/design/wireframes/README.md`
- Acceptance Criteria (verify):
  - App compiles; base page renders
- Test/Verification:
  - ESLint runs clean; TypeScript no errors
- Artifacts:
  - PR: "frontend: initialize Next.js app with Tailwind"

**Status:** Done  
**Assignee:** Frontend Dev

**Tech Stack:**
- Next.js 16.0.0
- React 19.2.0
- TypeScript 5.7.2

---

### ✅ PS-8: Configure Frontend (Tailwind, API URL, Basic Layout)

**Description:** Configure Tailwind CSS, API communication, and implement basic PWA layout.

**Acceptance Criteria:**
- ✅ `tailwind.config.ts` configured with "Lokal Verde" theme
- ✅ Global CSS includes Tailwind directives
- ✅ MapLibre GL JS installed
- ✅ Basic map component created and renders
- ✅ API requests configured to `http://localhost:8080/api`
- ✅ Environment variable handling configured
- ✅ Global error handling and toast notifications setup
- ✅ Basic layout structure (Header, Content, Bottom Nav)
- ✅ Basic PWA manifest and service worker initiated

#### How to Implement
- Context: Apply design tokens, wire API calls, and establish base layout.
- Prerequisites:
  - PS-7 complete; Backend running (PS-6)
- Steps:
  1) Configure Tailwind theme colors per `design-tokens.md`.
  2) Create a centralized API client using `NEXT_PUBLIC_API_URL`.
  3) Install MapLibre GL JS; render a basic map component.
  4) Implement base layout: Header, Content area, Bottom Nav.
  5) Add toast notifications and error boundary.
  6) Add basic manifest and register service worker stub.
- References:
  - Tokens/Components: `docs/reference/design-tokens.md`, `docs/reference/design-components.md`
  - Wireframes: `docs/design/wireframes/map-view.md`
  - API: `docs/reference/api-endpoints.md`
- Acceptance Criteria (verify):
  - Map renders; API client returns sample data; layout matches wireframes
- Test/Verification:
  - Toggle network offline to see graceful error toasts
- Artifacts:
  - PR: "frontend: configure theme, API client, base layout, map"

**Status:** Done  
**Assignee:** Frontend Dev

**Design System:** [Design System Reference](../../reference/design-system.md)

---

### ✅ PS-8a: Configure Full PWA Infrastructure

**Description:** Complete PWA setup including service worker, caching, and offline capabilities.

**Acceptance Criteria:**
- ✅ Service Worker registered with caching strategies
- ✅ PWA manifest fully configured
- ✅ Cache API initialized for offline storage
- ✅ IndexedDB setup and tested
- ✅ Network detection utilities implemented
- ✅ App installable as PWA on mobile
- ✅ Offline fallback page created

#### How to Implement
- Context: Enable offline-first behaviors and installability.
- Prerequisites:
  - PS-8 complete
- Steps:
  1) Implement service worker with caching strategies (static, API, images).
  2) Create IndexedDB store for offline entities (gems, krawls, tiles pointers).
  3) Add network status hook and UI indicator; queue mutations when offline.
  4) Configure manifest icons and meta for install prompt.
  5) Add offline fallback route/page.
- References:
  - Pattern: `docs/reference/design-patterns.md#performance-patterns`
  - Tutorial: `docs/tutorials/getting-started.md`
- Acceptance Criteria (verify):
  - App installable; basic flows work without network; sync resumes on reconnect
- Test/Verification:
  - Chrome Lighthouse PWA checks; devtools offline mode
- Artifacts:
  - PR: "pwa: add service worker, offline caching, IndexedDB, install prompt"

**Status:** Done  
**Assignee:** Frontend Dev

**Dependencies:** PS-7, PS-8

---

### ✅ PS-9: Create Initial README & Contribution Guidelines

**Description:** Write `README.md` and `CONTRIBUTING.md` with setup instructions.

**Acceptance Criteria:**
- ✅ README includes project overview
- ✅ Setup instructions documented
- ✅ Naming conventions included
- ✅ Contribution workflow documented

#### How to Implement
- Context: Provide onboarding documentation and contribution standards.
- Prerequisites: None
- Steps:
  1) Author `README.md` with overview, architecture, setup (link to tutorials).
  2) Add `CONTRIBUTING.md`: branch strategy, PR reviews, commit style, issue templates.
  3) Link to Diátaxis docs hub and key references.
- References:
  - Tutorials: `docs/tutorials/getting-started.md`
  - Docs hub: `docs/README.md`
- Acceptance Criteria (verify):
  - New contributor can go from zero to running app with docs only
- Test/Verification:
  - Fresh clone walkthrough by a teammate
- Artifacts:
  - PR: "docs: add README and CONTRIBUTING with onboarding"

**Status:** Done  
**Assignee:** Project Lead

---

## Epic Completion Criteria

- [x] All team members can run the project locally
- [x] Database is accessible and migrations work
- [x] Backend API is accessible
- [x] Frontend can communicate with backend
- [x] Basic PWA functionality working
- [x] Documentation is complete and accurate

---

## Dependencies

**Prerequisites:**
- None (This is the foundation epic)

**Blocks:**
- Epic 2 (Authentication) - requires setup completion
- Epic 3 (Gem Creation) - requires setup completion

---

## Notes & Lessons Learned

### Challenges Encountered
- Docker PostgreSQL configuration on Windows required specific setup
- MapLibre GL JS integration needed careful configuration
- PWA service worker caching strategy required iteration

### Best Practices Established
- Use environment variables for all configuration
- Document setup steps immediately
- Test on multiple operating systems
- Keep development and production configs separate

### Technical Decisions
- **Docker for Database:** Ensures consistent environment across team
- **Tailwind CSS v4:** Modern utility-first approach with design tokens
- **MapLibre GL JS:** Open-source alternative to Mapbox GL JS

---

## Related Documents

- [Project Setup Guide](../../tutorials/getting-started.md)
- [System Architecture](../../explanation/architecture-overview.md)
- [Database Testing Guide](../../how-to/test-database.md)
- [Tech Stack](../../explanation/technology-choices.md)

---

## 📝 Changelog

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.1.0 | 2025-10-31 | Split from kanban-task.md | Project Team |
| 1.0.0 | 2025-10-28 | Initial task breakdown | Project Team |

---

*Epic maintained by Project Team • Last reviewed: 2025-10-31*

