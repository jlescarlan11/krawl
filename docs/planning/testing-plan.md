# 🧪 Testing Plan: Krawl MVP

> **Purpose:** This document outlines the comprehensive testing strategy for the Krawl MVP, covering unit testing, integration testing, and user acceptance testing (UAT) to ensure application quality, functionality, and user satisfaction.

**Version:** 0.1.0-MVP  
**Last Updated:** 2025-10-31  
**Status:** Active  
**Owner:** QA Team

---

## 📋 Table of Contents

1. [Overall Goal](#1-overall-goal)
2. [Testing Types & Scope](#2-testing-types--scope)
3. [User Acceptance Testing (UAT)](#3-user-acceptance-testing-uat)
4. [Test Environment](#4-test-environment)
5. [Testing Schedule](#5-testing-schedule)
6. [Tools & Frameworks](#6-tools--frameworks)
7. [Success Criteria](#7-success-criteria)

---

## 1. Overall Goal

To verify that the Krawl PWA meets the functional and non-functional requirements defined in the User Stories (`user-story.md`) and Scope of Work (`scope-of-work.md`), providing a **stable, usable, and valuable experience** for initial users.

---

## 2. Testing Types & Scope

### 2.1 Unit Testing

**Goal:** Verify individual components (React components, utility functions, backend services, controllers, repositories) work correctly in isolation.

#### Scope

| Layer | Components Tested | Testing Framework |
|-------|------------------|-------------------|
| **Frontend (Next.js)** | React components (rendering, props, basic state changes)<br>Utility functions (date formatting, validation helpers)<br>Custom hooks | Jest<br>React Testing Library |
| **Backend (Spring Boot)** | Service layer methods (business logic, Gem Score calculations)<br>Controller input validation/mapping<br>Utility classes | JUnit<br>Mockito |

#### Approach

- Developers write unit tests alongside their code
- Focus on testing logic, edge cases, and expected outputs/state changes based on specific inputs
- Mock dependencies extensively
- Maintain high code coverage for critical business logic

---

### 2.2 Integration Testing

**Goal:** Verify the interaction and data flow between different components of the system.

#### Scope

**Backend Integration:**
- **Controller → Service → Repository → Database** interactions
- Test API endpoint behavior, request/response cycles
- Database persistence and retrieval operations
- **Frameworks:** Spring Boot Test (`@SpringBootTest`), Testcontainers (for DB integration), JUnit

**Frontend Integration:**
- Interaction between UI components and the API client
- Data fetching and form submissions
- Mock the API layer initially, then test against live (local/staging) backend
- **Frameworks:** Jest, React Testing Library, MSW (Mock Service Worker)

#### Approach

- Test the interfaces between layers
- For backend: Focus on API contracts and data integrity across layers
- For frontend: Ensure data fetched from the API is correctly displayed and form submissions reach the API as expected
- Validate error handling and edge cases at integration points

---

### 2.3 End-to-End (E2E) / User Acceptance Testing (UAT)

**Goal:** Validate complete user flows from the user's perspective, ensuring the application behaves as expected and meets the acceptance criteria defined in the user stories.

#### Scope

All major user journeys defined in `user-journey.md` and `user-story.md`:

- User Registration & Login
- Pinning a New Gem (including duplicate flow)
- Viewing Gem Details & Adding Photos
- Creating and Editing a Krawl
- Searching & Filtering Gems/Krawls
- Vouching, Rating, Reporting Gems
- Following a Krawl in Krawl Mode (Online & Offline)
- Downloading a Krawl

#### Approach

- **Manual testing** performed by team members (acting as users), potentially early adopters ("Founding Users"), or dedicated QA
- Follow predefined test scenarios based on user stories
- Testing occurs on target devices:
  - Desktop browsers (Chrome, Firefox, Safari, Edge)
  - Mobile browsers (iOS Safari, Chrome Mobile)
- Simulate real-world conditions (varying network quality for offline tests)
- **Automation** (Cypress or Playwright) can be considered for critical path regression testing later

---

## 3. Key Areas & Scenarios for UAT

*Based on Epics in `kanban-task.md`*

### 3.1 Authentication & Profile

- [ ] Can a user successfully register?
- [ ] Can a user log in with correct credentials?
- [ ] Are login errors handled correctly?
- [ ] Can a user log out?
- [ ] Does the profile page display the correct username, score, and tier?

---

### 3.2 Gem Creation & Display

- [ ] Can a user select a location on the map?
- [ ] Can a user fill out and submit the "Add Gem" form?
- [ ] Does the duplicate warning appear when expected?
- [ ] Does choosing "This is Different" (or equivalent) allow saving?
- [ ] Does the new 'pending' Gem appear on the map?
- [ ] Are Gems clustered correctly at different zoom levels?
- [ ] Do marker styles differentiate pending/verified Gems?
- [ ] Does tapping a Gem show the correct details (name, desc, photos, rating, vouch, founder)?
- [ ] Can a user successfully upload a photo to a Gem?

---

### 3.3 Krawl Creation & Display

- [ ] Can a user create a new Krawl (title, desc, visibility)?
- [ ] Can a user add Gems to a Krawl?
- [ ] Can a user reorder Gems within a Krawl?
- [ ] Can a user add/edit notes and secrets for Krawl steps?
- [ ] Does saving the Krawl persist all changes?
- [ ] Does the Krawl detail page show all information correctly (title, creator, map, ordered steps with notes)?

---

### 3.4 Discovery & Exploration

- [ ] Does the search bar find relevant Gems and Krawls by name/keyword?
- [ ] Are search results clearly differentiated?
- [ ] Do filters (tags, rating, etc.) correctly update the map display?
- [ ] Do filters correctly update the lists on the Discover page?

---

### 3.5 Community Interaction & Quality

- [ ] Can a user vouch for a Gem?
- [ ] Does the vouch count update?
- [ ] Is vouching limited to once per user?
- [ ] Can a user rate a Gem (stars + comment)?
- [ ] Does the average rating update?
- [ ] Can a user report a Gem?
- [ ] Does it trigger flagging logic after multiple reports?
- [ ] Can a user rate a Krawl after completion?
- [ ] Does it affect the Krawl's average and the creator's score?
- [ ] Do Gem status badges (Stale, Closed, Warning) appear correctly based on conditions?

---

### 3.6 Krawl Mode & Offline

- [ ] Can a user download a Krawl successfully?
- [ ] Can a user start a downloaded Krawl while offline?
- [ ] Does Krawl Mode navigation work using GPS and cached map tiles offline?
- [ ] Do the Stop Detail Cards appear automatically on arrival using cached data offline?
- [ ] Can the user progress through all stops offline?
- [ ] Are actions performed offline (ratings, vouches) queued and synced upon reconnection?

---

## 4. Testing Environment

| Environment | Purpose | Details |
|------------|---------|---------|
| **Local Development** | Unit & initial integration tests | Run locally by developers during development |
| **Staging Environment** | Integration Testing, E2E/UAT, pre-release validation | Mirrors production setup<br>Hosted on Vercel/Render/etc.<br>Uses separate staging database |
| **Production Environment** | Live environment | Post-launch monitoring<br>Limited smoke testing after deployments |

---

## 5. Tools

### Unit Testing

| Layer | Tools |
|-------|-------|
| Frontend | Jest, React Testing Library |
| Backend | JUnit, Mockito |

### Integration Testing

| Layer | Tools |
|-------|-------|
| Backend | Spring Boot Test, Testcontainers |
| Frontend | Jest, MSW (Mock Service Worker) - Optional |

### E2E/UAT Testing

| Purpose | Tools |
|---------|-------|
| Manual Testing | Test scenarios based on user stories |
| Cross-Device Testing | BrowserStack/Sauce Labs (Optional) |
| Automation | Cypress/Playwright (Optional, for regression) |

### Issue Tracking

- Kanban Board (Trello, Jira, GitHub Projects) for tracking bugs found during testing

---

## 6. Defect Management

All bugs found during testing will be logged as issues/cards on the Kanban board.

### Bug Report Template

Each bug report should include the following information:

| Field | Description |
|-------|-------------|
| **Title** | Clear, concise summary of the issue |
| **Description** | Steps to reproduce<br>Expected vs. actual results |
| **Severity** | Blocker / Critical / Major / Minor |
| **Environment** | Where the bug was found (local, staging, production) |
| **Attachments** | Screenshots, logs, console errors (if applicable) |

### Severity Definitions

| Severity | Definition | Example |
|----------|------------|---------|
| **Blocker** | Prevents further testing or critical functionality is broken | Cannot log in, app crashes on launch |
| **Critical** | Major feature doesn't work, no workaround | Cannot create Krawls, map doesn't load |
| **Major** | Feature works but with significant issues | Search returns incorrect results |
| **Minor** | Cosmetic issues, minor bugs with workarounds | Button alignment off, typos |

---

## 7. Test Execution Timeline

```
Phase 1: Unit Testing (Ongoing during development)
├── Frontend component tests
└── Backend service/controller tests

Phase 2: Integration Testing (Sprint-end)
├── Backend API integration tests
└── Frontend-API integration tests

Phase 3: UAT (Pre-release)
├── Manual test scenarios execution
├── Cross-browser/device testing
└── Offline functionality validation

Phase 4: Production Monitoring (Post-launch)
├── Smoke tests after deployments
└── User feedback monitoring
```

---

## 8. Acceptance Criteria

The Krawl MVP is ready for launch when:

- [ ] All critical and major bugs are resolved
- [ ] Core user journeys pass UAT on target devices
- [ ] Offline functionality works reliably for downloaded Krawls
- [ ] Performance metrics meet targets (load time, map rendering)
- [ ] Security vulnerabilities are addressed
- [ ] User feedback from early testing is incorporated

---

## 9. Success Metrics

| Metric | Target |
|--------|--------|
| Unit Test Coverage | > 80% for critical paths |
| Integration Test Pass Rate | 100% before staging deployment |
| UAT Pass Rate | > 95% for critical user journeys |
| Critical Bugs in Production | 0 (within first week) |
| User-Reported Issues | < 5 critical issues per week |

---

## 📝 Changelog

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0.0 | 2025-10-28 | Initial testing plan | QA Team |

---

## 📚 Related Documents

- [User Stories](./user-story.md) - Feature requirements and acceptance criteria
- [Scope of Work](./planning/scope-of-work.md) - Detailed feature scope
- [Architecture Overview](./explanation/architecture-overview.md) - System components to test
- [Design Patterns](./explanation/design-patterns.md) - Design patterns to verify
- [API Documentation](./api-documentation.md) - API endpoints for integration testing
- [Database Testing Guide](./database-testing-guide.md) - Database testing procedures
- [Version Control Strategy](./planning/version-control-strategy.md) - CI/CD integration

---

*Document maintained by QA Team • Last reviewed: 2025-10-28*

