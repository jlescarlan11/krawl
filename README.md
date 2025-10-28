# 🗺️ Krawl

<div align="center">

**Discover the Philippines, One Krawl at a Time**

*A community-driven Progressive Web App for mapping authentic, hyperlocal Filipino culture*

[![Version](https://img.shields.io/badge/version-0.1.0--MVP-green.svg)](https://github.com/yourusername/krawl)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

[Features](#-features) • [Quick Start](#-quick-start) • [Tech Stack](#-tech-stack) • [Documentation](#-documentation) • [Contributing](#-contributing)

</div>

---

## 📖 Overview

**Krawl** is a Progressive Web App (PWA) that empowers locals to share authentic Filipino experiences through:

- 📍 **Gems**: Pin local spots (cafes, landmarks, hidden spots) on an interactive map
- 🚶 **Krawls**: Create guided trails connecting Gems with insider notes and context
- 📱 **Krawl Mode**: Interactive, location-aware navigation with offline functionality
- ⭐ **Community Quality**: Vouching, ratings, and flagging to ensure fresh, accurate content

### The Problem We're Solving

Discovering authentic, hyperlocal Filipino culture is difficult:
- 🗺️ Map apps are cluttered with commercial listings
- 📱 Social media lacks structure and navigation
- 📖 Travel guides are often outdated or tourist-focused

**Krawl combines community-sourced knowledge with guided, navigable experiences.**

---

## ✨ Features

### Current Implementation (MVP Phase)

- ✅ **Responsive PWA Layout**: Mobile-first design with desktop support
- ✅ **Navigation System**: Bottom navigation (mobile) + Sidebar (desktop)
- ✅ **Design System**: Complete "Lokal Verde" design system with 60+ tokens
- ✅ **Offline Support**: Service worker for offline functionality
- ✅ **Core Pages**: Map view, Explore, Krawls, Add Gem, Profile
- ✅ **Database**: PostgreSQL with PostGIS for geospatial data
- ✅ **Backend API**: Spring Boot REST API foundation

### Coming Soon

- 🔜 User authentication & profiles
- 🔜 Gem pinning with location services
- 🔜 Krawl creation and management
- 🔜 Interactive map with Leaflet.js
- 🔜 Vouching and rating system
- 🔜 Business claim feature

---

## 🚀 Quick Start

### Prerequisites

Ensure you have the following installed:

| Tool | Version | Download |
|------|---------|----------|
| **Node.js** | LTS (18+) | [nodejs.org](https://nodejs.org/) |
| **JDK** | 17+ | [adoptium.net](https://adoptium.net/) |
| **Docker** | Latest | [docker.com](https://www.docker.com/get-started) |
| **Git** | Latest | [git-scm.com](https://git-scm.com/) |

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url> krawl
   cd krawl
   ```

2. **Set up the database**
   
   Create a `.env` file in the project root:
   ```env
   DB_USER=krawl_user
   DB_PASSWORD=krawl_dev_password_2025
   ```

   Start PostgreSQL + PostGIS container:
   ```bash
   docker-compose up -d
   ```

3. **Run the backend**
   ```bash
   cd backend
   ./mvnw spring-boot:run
   ```
   
   Backend will be available at `http://localhost:8080`

4. **Run the frontend**
   
   Open a new terminal:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   
   Frontend will be available at `http://localhost:3000`

### Verify Setup

- Open [http://localhost:3000](http://localhost:3000) in your browser
- You should see the Krawl PWA interface with navigation
- Check that the design system is loaded (Lokal Verde color scheme)

---

## 🛠️ Tech Stack

Krawl is built with a modern, mobile-first tech stack optimized for PWA performance:

- **Frontend:** Next.js 16 with TypeScript, Tailwind CSS v4, React 19
- **Backend:** Spring Boot REST API (Java/Kotlin) with Spring Data JPA
- **Database:** PostgreSQL 15 with PostGIS 3.4 for geospatial queries
- **Infrastructure:** Docker, Vercel (frontend), Render (backend)

For detailed technology choices, architecture decisions, and rationale, see:
- [docs/tech-stack.md](docs/tech-stack.md) - Complete technology stack and CSS architecture
- [docs/system-architecture.md](docs/system-architecture.md) - System design and component interactions

---

## 📁 Project Structure

```
krawl/
├── frontend/              # Next.js PWA Frontend
│   ├── app/               # App Router pages
│   │   ├── add/           # Add Gem page
│   │   ├── explore/       # Explore Gems
│   │   ├── krawls/        # Krawls page
│   │   ├── profile/       # User profile
│   │   ├── layout.tsx     # Root layout
│   │   ├── page.tsx       # Home/Map page
│   │   └── globals.css    # Design system (545 lines)
│   ├── components/        # Reusable components
│   │   ├── AppLayout.tsx
│   │   ├── BottomNav.tsx
│   │   ├── Header.tsx
│   │   ├── MapArea.tsx
│   │   └── Sidebar.tsx
│   ├── lib/               # Utilities & API client
│   └── public/            # Static assets + PWA files
│
├── backend/               # Spring Boot Backend
│   ├── src/main/java/     # Java source code
│   │   └── com/krawl/backend/
│   │       ├── config/
│   │       ├── controller/
│   │       ├── dto/
│   │       ├── entity/
│   │       ├── repository/
│   │       ├── security/
│   │       └── service/
│   └── src/main/resources/
│       ├── application.yaml
│       └── db/migration/  # Flyway migrations
│
├── docs/                  # Project documentation (38 files)
│   ├── project-brief.md
│   ├── tech-stack.md
│   ├── project-setup.md
│   ├── system-architecture.md
│   ├── database-schema.md
│   └── ...
│
├── docker-compose.yml     # Database container setup
├── README.md              # This file
└── CONTRIBUTING.md        # Contribution guidelines
```

---

## 📚 Documentation

Comprehensive documentation is available in the [`docs/`](docs/) folder:

### 📋 Getting Started
- [Project Brief](docs/project-brief.md) - High-level overview and objectives
- [Project Setup](docs/project-setup.md) - Detailed setup instructions
- [Tech Stack](docs/tech-stack.md) - Technology choices and rationale

### 🏗️ Architecture & Design
- [System Architecture](docs/system-architecture.md) - System design overview
- [System Design](docs/system-design.md) - Detailed design patterns
- [Database Schema](docs/database-schema.md) - Database structure and relationships
- [UI/UX Design System](docs/ui-ux-design-system.md) - Design guidelines

### 📝 Development
- [API Documentation](docs/api-documentation.md) - Backend API specifications
- [Version Control Strategy](docs/version-control-strategy.md) - Git workflow
- [Testing Plan](docs/testing-plan.md) - Testing strategies
- [Security Plan](docs/security-plan.md) - Security considerations

### 📊 Planning
- [Scope of Work](docs/scope-of-work.md) - Feature scope and deliverables
- [Milestone and Timeline](docs/milestone-and-timeline.md) - 12-week development timeline
- [Kanban Task](docs/kanban-task.md) - Task management
- [User Stories](docs/user-story.md) - Feature requirements

### 🎨 Design
- [Brand Guidelines](docs/brand-guidelines.md) - Brand identity
- [Wireframe](docs/wireframe.md) - Interface mockups
- [User Journey](docs/user-journey.md) - User flows
- [Design Progression](docs/design-progression.md) - Design evolution

### 🚀 Deployment
- [Hosting Deployment Plan](docs/hosting-deployment-plan.md) - Deployment infrastructure
- [Budget and Resource](docs/budget-and-resource.md) - Resource planning

---

## 🗄️ Database Setup

The project uses **PostgreSQL 15 with PostGIS 3.4** for geospatial features. The database runs in a Docker container for consistent local development.

For complete setup instructions, connection details, schema documentation, and testing procedures, see:
- [docs/project-setup.md](docs/project-setup.md) - Initial setup and configuration steps
- [docs/database-schema.md](docs/database-schema.md) - Complete schema, relationships, and queries
- [docs/database-testing-guide.md](docs/database-testing-guide.md) - Testing and verification procedures

---


## 🤝 Contributing

We welcome contributions to Krawl! To get started:

1. Read the [Contributing Guidelines](CONTRIBUTING.md) for detailed workflow, coding standards, and best practices
2. Review the [Version Control Strategy](docs/version-control-strategy.md) for branching and commit conventions
3. Check the [Project Setup Guide](docs/project-setup.md) to configure your development environment

**Quick workflow:** Fork → Create feature branch → Make changes → Test → Commit with conventional format → Open PR

For questions or issues, please open a GitHub issue or join the discussion in existing pull requests.

---

## 📈 Project Status

**Current Phase**: MVP Development (Week 1-12)

**Completed**:
- ✅ Project setup and documentation
- ✅ Frontend foundation (Next.js + Tailwind)
- ✅ Backend foundation (Spring Boot)
- ✅ Database setup (PostgreSQL + PostGIS)
- ✅ Design system implementation
- ✅ PWA infrastructure
- ✅ Navigation components

**In Progress**:
- 🔄 User authentication system
- 🔄 Gem pinning functionality
- 🔄 Map integration with Leaflet.js

**Next Steps**:
- 📋 Krawl creation and management
- 📋 Vouching and rating system
- 📋 Offline data synchronization
- 📋 Business claim feature

For detailed timeline, see [Milestone and Timeline](docs/milestone-and-timeline.md).

---


---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🆘 Support

- **Documentation**: Check the [docs/](docs/) folder
- **Issues**: Report bugs via GitHub Issues
- **Questions**: Reach out to the development team

---

## 🙏 Acknowledgments

- Local Filipino communities for inspiration
- Open source contributors
- Early adopters and testers

---

<div align="center">

**Built with ❤️ for the Filipino community**

*Powered by Local Knowledge • Built for Community*

[⬆ back to top](#-krawl)

</div>

---

**Last Updated**: October 28, 2025  
**Version**: 0.1.0-MVP  
**Maintainer**: Development Team
