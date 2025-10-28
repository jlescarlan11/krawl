## 🗄️ Database Setup

### Local Development with Docker

**Prerequisites:**
- Docker and Docker Compose installed

**Quick Start:**

1. Create a `.env` file in the project root:
```env
DB_USER=krawl_user
DB_PASSWORD=krawl_dev_password_2025
```

2. Start the PostgreSQL + PostGIS container:
```bash
docker-compose up -d
```

3. Verify the container is running:
```bash
docker ps
```

**Connection Details:**

| Parameter | Value |
|-----------|-------|
| Host | `localhost` |
| Port | `5432` |
| Database | `krawl` |
| Username | `krawl_user` |
| Password | `krawl_dev_password_2025` |

**Features:**
- PostgreSQL 15 with PostGIS 3.4 extension
- Automatic PostGIS initialization
- Persistent data volume
- Health checks configured

For detailed setup instructions, see [Project Setup Documentation](docs/project-setup.md).

---

## 🧩 Naming Conventions

To maintain consistency across the project, all contributors should follow these naming conventions.

---

### 📌 General Rules

| Convention | Usage | Example |
|------------|-------|---------|
| `camelCase` | Variables, functions, file names (JS/TS/Java/Kotlin) | `userName`, `fetchGemData()` |
| `PascalCase` | React components, classes, TypeScript types/interfaces | `GemCard`, `UserEntity`, `GemType` |
| `UPPER_SNAKE_CASE` | Constants | `MAX_RETRIES`, `API_BASE_URL` |
| `kebab-case` | CSS classes, URLs, config keys, documentation files | `gem-card`, `/api/gems`, `api-timeout`, `api-documentation.md` |

---

### 🎨 Frontend (Next.js/React)

| Item | Convention | Example |
|------|------------|---------|
| **Components** | PascalCase | `GemCard.tsx`, `KrawlDetailMap.tsx` |
| **Pages/Routes** | kebab-case folders, `page.tsx` | `gems/[id]/page.tsx` |
| **Hooks** | `useCamelCase` | `useMapState.ts`, `useAuth.ts` |
| **Types/Interfaces** | PascalCase | `GemType.ts`, `KrawlStepProps` |
| **Contexts** | PascalCase + `Context` suffix | `AuthContext.tsx`, `MapStateContext.tsx` |
| **Utility Functions** | camelCase | `formatDate.ts`, `calculateDistance.ts` |
| **CSS Classes** | kebab-case | `.gem-card-container`, `.map-overlay` |

---

### ⚙️ Backend (Spring Boot - Java/Kotlin)

| Item | Convention | Example |
|------|------------|---------|
| **Classes** | PascalCase | `GemService`, `KrawlController`, `UserEntity` |
| **Methods/Variables** | camelCase | `findNearbyGems()`, `currentUser` |
| **Packages** | lowercase | `com.krawl.service`, `com.krawl.controller` |
| **DTOs** | PascalCase + Suffix | `CreateGemRequest`, `GemResponse` |
| **Entities** | PascalCase + `Entity` suffix | `UserEntity`, `GemEntity` |
| **Repositories** | PascalCase + `Repository` suffix | `GemRepository`, `UserRepository` |
| **Services** | PascalCase + `Service` suffix | `GemService`, `AuthenticationService` |
| **REST Endpoints** | kebab-case, plural nouns | `/api/gems`, `/api/krawls/{krawlId}/items` |

---

### 🗄️ Database (PostgreSQL)

| Item | Convention | Example |
|------|------------|---------|
| **Tables** | snake_case, plural | `users`, `gems`, `gem_ratings` |
| **Columns** | snake_case | `user_id`, `created_at`, `krawl_title` |
| **Primary Keys** | `[table_singular]_id` | `user_id`, `gem_id`, `krawl_id` |
| **Foreign Keys** | `[referenced_table_singular]_id` | `creator_id` (references `users`), `founder_id` |
| **Indexes** | `idx_[table]_[columns]` | `idx_gems_location`, `idx_users_email` |
| **Junction Tables** | `[table1]_[table2]` | `gem_tags`, `krawl_items` |

---

### 🌿 Git Branching & Commits

#### Branch Naming

**Format**: `[type]/[task-id]-[short-description]`

| Branch Type | Purpose | Example |
|-------------|---------|---------|
| `feature/` | New features or enhancements | `feature/KRW-15-add-gem-pinning-ui` |
| `fix/` | Bug fixes | `fix/KRW-21-map-zoom-performance` |
| `chore/` | Maintenance tasks, refactoring, dependency updates | `chore/KRW-35-update-nextjs` |
| `docs/` | Documentation updates | `docs/KRW-10-api-documentation` |
| `style/` | Code style, formatting changes | `style/PS-2-establish-document-naming-conventions` |
| `refactor/` | Code refactoring without feature changes | `refactor/KRW-40-extract-map-logic` |
| `test/` | Adding or updating tests | `test/KRW-50-add-gem-service-tests` |
| `release/` | Preparing a production release | `release/v0.1.0` |
| `hotfix/` | Urgent fixes directly off main | `hotfix/KRW-42-fix-login-crash` |

**Branch Naming Guidelines:**
- **Task ID**: Reference the corresponding Kanban/Issue tracker ID (e.g., `KRW-15`, `PS-2`)
- **Short Description**: Use kebab-case, brief and descriptive (2-5 words)

#### Commit Messages (Conventional Commits)

**Format**:
```
<type>(<scope>): <subject>

<body> (Optional)

<footer> (Optional: e.g., Closes KRW-XX)
```

**Commit Types:**
- `feat`: New feature
- `fix`: Bug fix
- `chore`: Build/config changes
- `docs`: Documentation
- `style`: Formatting, code style
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Testing changes

**Commit Guidelines:**
- **Type**: Required
- **Scope** (Optional): Module or area affected (e.g., `auth`, `map`, `gem-pinning`, `krawl-mode`)
- **Subject**: Imperative mood, concise (max 50 chars), lowercase
- **Body** (Optional): Detailed explanation of changes
- **Footer** (Optional): Reference related issues/tasks

**Examples:**
```
feat(gem-pinning): add duplicate check warning UI
```
```
fix(auth): correct JWT expiration validation
```
```
refactor(map): optimize gem marker rendering

Switched from individual markers to layer group for better performance
when displaying large numbers of gems.

Closes KRW-65
```

---

### 📄 Documentation Files

| Type | Convention | Example |
|------|------------|---------|
| **Main Docs** | kebab-case with descriptive names | `api-documentation.md`, `database-schema.md` |
| **Project Docs** | kebab-case, prefixed by category if applicable | `project-setup.md`, `tech-stack.md` |
| **Design Docs** | kebab-case | `ui-ux-design-system.md`, `wireframe.md` |
| **Planning Docs** | kebab-case | `kanban-task.md`, `milestone-and-timeline.md` |

---

### ✅ Best Practices

1. **Consistency is Key**: Always follow the conventions for the specific area you're working in
2. **Be Descriptive**: Names should clearly convey purpose and intent
3. **Avoid Abbreviations**: Unless widely understood (e.g., `id`, `url`, `api`)
4. **Use Meaningful Names**: Prefer `userCreatedAt` over `date1`
5. **Follow Language Idioms**: Java uses `getUserName()`, JavaScript uses `getUserName` or `userName`
6. **Keep Names Concise**: But not at the expense of clarity
7. **Review Before Commit**: Ensure your code follows naming conventions before opening a PR

---

### 📚 Additional Resources

For more detailed information, refer to:
- [Version Control Strategy](docs/version-control-strategy.md) - Git workflow and branching details
- [Project Setup](docs/project-setup.md) - Development environment and structure
- [Database Schema](docs/database-schema.md) - Complete database naming examples

---

**Last Updated:** October 28, 2025