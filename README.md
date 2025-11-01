<div align="center">

<img src="design/logo/final/krawl-lockup-color.svg" alt="Krawl logo" width="220" />

<strong>Discover the Philippines, One Krawl at a Time</strong>

<em>Community‑driven PWA for authentic, hyperlocal experiences</em>

[![Version](https://img.shields.io/badge/version-0.1.0--MVP-green.svg)](./CHANGELOG.md)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](./LICENSE)

[Quick Start](#-quick-start) • [Documentation Hub](#documentation-hub) • [Contributing](CONTRIBUTING.md)

</div>

---

## 🚀 Quick Start (< 5 minutes)

### Prerequisites Checklist

Before starting, verify you have these installed:

- [ ] **Git** - `git --version` (latest)
- [ ] **Node.js 18+** - `node --version` (check: ≥18.0.0)
- [ ] **JDK 17+** - `java --version` (check: ≥17)
- [ ] **Docker & Docker Compose** - `docker --version` and `docker-compose --version`

> 💡 **Don't have these?** See [installation guide](docs/tutorials/getting-started.md#before-you-begin)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <repo-url> krawl && cd krawl
   ```

2. **Start the database**
   ```bash
   docker-compose up -d
   ```
   Wait 10-15 seconds for PostgreSQL to initialize.

3. **Start the backend** (in one terminal)
   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```
   ✅ Backend running at `http://localhost:8080`

4. **Start the frontend** (in a new terminal)
   ```bash
   cd frontend
   npm install && npm run dev
   ```
   ✅ Frontend running at `http://localhost:3000`

### Example: First API Call

Once both services are running, test the backend API:

```bash
# Health check
curl http://localhost:8080/api/v1/storage/health

# Expected response:
# {"status":"UP","timestamp":"2025-10-31T..."}
```

### Example: Frontend Development

```bash
# Install dependencies (first time only)
cd frontend
npm install

# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Run production build locally
npm start
```

### Verification

Open your browser and verify:
- ✅ Frontend loads at http://localhost:3000
- ✅ Backend health check: http://localhost:8080/api/v1/storage/health (should return status)

> 📚 **Full setup guide:** [docs/tutorials/getting-started.md](docs/tutorials/getting-started.md)  
> 🆘 **Problems?** Check [troubleshooting](docs/tutorials/getting-started.md#troubleshooting) section

---

# Documentation Hub

> **Welcome to the Krawl documentation!** This hub helps you find the right information quickly using the Diátaxis framework.

**Last Updated:** 2025-11-01  
**Status:** Active

---

## 🧭 Quick Navigation

**New to Krawl?** → Start with [Tutorials](#-tutorials)  
**Need to complete a task?** → Check [How-to Guides](#-how-to-guides)  
**Want to understand the system?** → Read [Explanation](#-explanation)  
**Looking for technical specs?** → Browse [Reference](#-reference)

---

## 📚 Documentation Framework

This documentation follows the **Diátaxis framework** (Tutorials, How-to, Explanation, Reference).

---

## 📚 Tutorials

**Learn by doing** - Step-by-step guides for beginners

### Getting Started
- [Getting Started Guide](docs/tutorials/getting-started.md) - Complete setup walkthrough ⭐
- [Pin Your First Gem](docs/tutorials/first-gem-tutorial.md) - Learn the basics of adding locations
- [Create Your First Krawl](docs/tutorials/create-first-krawl.md) - Build your first guided trail

---

## 📖 How-to Guides

**Solve specific problems** - Task-focused instructions

- [Implement Security](docs/how-to/implement-security.md)
- [Database Triggers](docs/how-to/database-triggers.md)
- [Database Testing Guide](docs/how-to/database-testing-guide.md)
- [Storage Testing Guide](docs/how-to/storage-testing-guide.md)

---

## 💡 Explanation

**Understand the system** - Concepts and decisions

### Architecture & Design
- [Architecture Overview](docs/explanation/architecture-overview.md) - System architecture and components ⭐
- [Design Patterns](docs/explanation/design-patterns.md) - Detailed data flows and algorithms
- [Technology Choices](docs/explanation/technology-choices.md) - Why we chose these technologies
- [Security Approach](docs/explanation/security-approach.md) - Security strategy and principles

### Product & UX
- [User Personas](docs/explanation/user-persona-profile.md) - Target users and audience
- [User Journey](docs/explanation/user-journey.md) - User experience flows

### Technical Details
- [Tech Stack](docs/reference/tech-stack.md) - Complete technical specifications

---

## 📋 Reference

**Look up details** - Technical specifications and standards

### API & Database
- [API Endpoints](docs/reference/api-endpoints.md)
- [Database Schema](docs/reference/database-schema.md)
- [Database Queries](docs/reference/database-queries.md)

### Design System
- [Design Tokens](docs/reference/design-tokens.md)
- [Design Components](docs/reference/design-components.md)
- [Design Patterns](docs/reference/design-patterns.md)
- [Brand Guidelines](docs/reference/brand-guidelines.md)

### Content & Structure
- [Sitemap](docs/reference/sitemap.md)
- [Content Plan](docs/reference/content-plan.md)
- [Page Copy Draft](docs/reference/page-copy-draft.md)
- [SEO Plan](docs/reference/seo-plan.md)

### Standards
- [Documentation Template](docs/reference/documentation-template.md)
- [Security Requirements](docs/reference/security-requirements.md)

---

## 📁 Planning Documents

Project planning and management resources

- [Project Brief](docs/planning/project-brief.md)
- [Scope of Work](docs/planning/scope-of-work.md)
- [Milestone and Timeline](docs/planning/milestone-and-timeline.md)
- [Task Epics (Kanban)](docs/planning/tasks/README.md)
- [User Stories](docs/planning/user-story.md)
- [Budget and Resource](docs/planning/budget-and-resource.md)
- [Version Control Strategy](docs/planning/version-control-strategy.md)

---

## 🎨 Design Resources

- [Wireframes Overview](docs/design/wireframes/README.md)
- [Design Progression](docs/design/design-progression.md)
- [Mood Board](docs/design/mood-board.md)

---

## 🔍 Find What You Need

**New Developer** → Getting Started → Architecture → API Endpoints  
**Designer** → Brand Guidelines → Design Tokens/Components → Wireframes  
**Project Manager** → Brief → Timeline → Task Epics  
**Security** → Security Approach → Security Requirements → Implement Security

---

## 🤝 Contributing to Documentation

See: [Documentation Template](docs/documentation-template.md)

---

<div align="center">

**Need help?** Check the [Glossary](docs/reference/glossary.md).

**Still stuck?** Open an issue on GitHub or contact the team.

</div>

---

## 🙌 Community & Conduct

Participation in this project is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). Please read it to understand expected behavior and how to report issues.
