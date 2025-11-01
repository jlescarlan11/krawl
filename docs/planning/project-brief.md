# 🎯 Project Brief: Krawl

> **Purpose:** This document provides a high-level overview of the Krawl project, including the problem being solved, the solution approach, core objectives, stakeholders, and success metrics for the MVP phase.

**Version:** 0.1.0-MVP  
**Last Updated:** 2025-11-01  
**Status:** Active  
**Owner:** Project Lead

---

## 1. Overview

**Krawl** is a community-driven Progressive Web App (PWA) designed to map authentic, hyperlocal Filipino culture. Users pin local spots ("**Gems**") and create guided trails ("**Krawls**") with insider notes. The core feature, "**Krawl Mode**," offers an interactive, location-aware experience for following these trails, complete with offline functionality.

Krawl aims to be the go-to platform for discovering genuine Filipino experiences, powered by local knowledge, launching initially in key hubs (e.g., Cebu/Metro Manila).

---

## 2. Problem

Discovering authentic, hyperlocal Filipino culture is difficult. While the Philippines boasts incredible cultural diversity, finding genuine local experiences remains fragmented and challenging:

### 🗺️ General Map Apps (e.g., Google Maps)
- Overwhelmed with commercial listings
- Lack curated paths
- Struggle to surface truly unique, non-mainstream spots ("signal vs. noise")
- Reviews lack local context and structure for guided exploration

### 📱 Social Media (e.g., TikTok, Instagram, Facebook Groups)
- Offer inspiration (#HiddenGemsPH) but lack practical navigation
- Missing structured information
- No reliable offline capability
- Inconsistent quality control
- Discovery is passive and disorganized ("inspiration without a plan")

### 📖 Travel Blogs/Guides
- Often cater primarily to tourists
- Become outdated quickly
- Lack real-time, granular detail
- Missing community validation of a constantly updated local map

### 💡 The Gap

**There is no dedicated platform that effectively combines community-sourced local knowledge with structured, navigable experiences**, leading to missed opportunities for both locals seeking deeper connection with their surroundings and travelers craving genuine cultural immersion.

---

## 3. Solution

Krawl addresses this gap by providing a platform centered around community curation and guided experiences, delivered via an accessible PWA:

### 📍 Community-Driven Mapping ("Gems")
Locals pin and describe places they know and love, creating a rich database prioritizing authenticity over commercial volume. A community vouching and rating system ensures quality emerges organically. Gems appear instantly in a 'pending' state, visible to all.

### 🚶 Curated Trails ("Krawls")
Users connect Gems into themed, ordered trails (food crawls, history walks, art tours), adding personal notes and "**Lokal Secrets**" for each stop. This provides structure, narrative, and invaluable insider context.

### 🧭 Interactive "Krawl Mode" *(Core Differentiator)*
Users follow a Krawl step-by-step, receiving location-triggered guidance, creator notes, and photos directly within the app, turning discovery into an immersive, guided adventure ("plan with inspiration").

### ✅ Community Quality Control
Built-in systems for vouching (verification), rating (quality), flagging outdated/closed spots (lifecycleStatus), and creator reputation ensure data remains fresh and trustworthy without relying solely on administrators.

### 📴 Offline Functionality
Downloadable Krawls (including map tiles and notes) ensure the guided experience works reliably even in areas with inconsistent connectivity, critical for the Philippine context.

### 💼 Freemium for Businesses
A non-intrusive revenue model allows local businesses to "claim" their Gem (which remains free on the map) to provide verified info (hours, menu) and real-time updates ("**Lokal Updates**"), enhancing data quality for users without compromising the community vibe or user experience.

---

## 4. Objectives (Initial Phase: ~12 Weeks MVP)

### 🎯 Core Goals

- **Launch MVP**  
  Deploy a functional PWA with core features (Auth, Gem Pinning, Krawl Creation, Krawl Mode w/ Offline, Basic Vouch/Rating/Reporting)

- **Seed Content**  
  Populate 1-2 initial districts (e.g., within Cebu City) with 100+ Gems and 10+ Krawls

- **Validate Engagement**  
  Achieve initial user adoption (100-500 active users) in the launch area, showing usage of core features

- **Gather Feedback**  
  Collect user data on UX and feature usability for iteration

- **Test Revenue**  
  Pilot the "Claim Your Gem" model with 5-10 local businesses

---

## 5. Target Audience

### 🎯 Primary Audience
**Young Filipino Adults (18-35)**
- Living in urban/semi-urban areas (initially Cebu/Metro Manila)
- Digitally savvy and socially connected
- Keen on exploring local culture, food, and hidden spots
- Value authenticity, community recommendations, and unique experiences

### 🧳 Secondary Audience
**Domestic & International Travelers**
- Seeking authentic, off-the-beaten-path experiences
- Desire reliable local guidance beyond generic tourist information

---

## 6. Stakeholders
```
👥 Users
   ├─ Primary: Young Filipino Adults
   └─ Secondary: Travelers

🏪 Local Businesses ("Gems")
   └─ Locations featured on the map

👨‍💻 Development Team / Project Owners
   └─ Builders & maintainers

⭐ "Founding Users" / Community Ambassadors
   └─ Early content contributors
```

---

## 7. Success Metrics (Initial Phase)

### 📊 Quantitative Metrics

| Metric | Target |
|--------|--------|
| **MVP Launch** | PWA successfully deployed |
| **Content Density** | 100+ Gems / 10+ Krawls seeded in launch area(s) |
| **User Adoption** | 100-500 Monthly Active Users (MAU) in launch area(s) |

### 📈 Core Feature Engagement (Tracked Weekly)

- ✅ New Gems pinned
- ✅ Krawls created
- ✅ Krawl Mode sessions started
- ✅ Krawl completion %
- ✅ Vouches/Ratings submitted

### 💬 Qualitative Metrics

- Positive trends in user surveys/interviews
- Successful onboarding & positive feedback from pilot businesses

---

## 8. Timeline & Budget

### 📅 Timeline
**MVP Development: 12 Weeks**
- Weeks 1-2: Project Setup & Foundation
- Weeks 3-6: Core Feature Development (Auth, Gems, Krawls, Map)
- Weeks 7-8: Community & Quality Features
- Weeks 9-10: Krawl Mode & Offline Implementation
- Week 11: Testing, Bug Fixing & Deployment
- Week 12: Content Seeding & Launch Readiness

For detailed milestones, deliverables, and success criteria for each phase, see [Milestone and Timeline](./milestone-and-timeline.md).

### 💰 Budget Overview
**MVP Phase (3 Months):**
- **Sweat Equity Approach:** ₱2,700 - 7,200 (domain, seeding, contingency)
- **Freelance Approach:** ₱182,000 - 527,000+ (includes development costs)

**Strategy:** Leverage free tiers (hosting, tools) and community-driven content for lean launch.

For detailed budget breakdown by category, cost optimization strategies, and resource allocation, see [Budget and Resource](./budget-and-resource.md).

---

## 📝 Changelog

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.1.0 | 2025-10-31 | Merged business case from project-proposal.md; added Target Audience, detailed Problem/Solution sections, Timeline, and Budget overview | Project Lead |
| 1.0.0 | 2025-10-28 | Initial project brief created | Project Lead |

---

## 📚 Related Documents

- [Scope of Work](./scope-of-work.md) - Detailed feature scope and deliverables
- [Milestone and Timeline](./milestone-and-timeline.md) - 12-week development timeline
- [Budget and Resource](./budget-and-resource.md) - Detailed budget analysis
- [Tech Stack](../reference/tech-stack.md) - Technology choices and rationale
- [User Stories](./user-story.md) - Detailed feature requirements
- [User Personas](../explanation/user-persona-profile.md) - Target audience profiles

---

<div align="center">

## 🚀 The Vision

**Krawl bridges the gap between discovery and guided experience for exploring Filipino culture**

*Community-First • Authenticity-Driven • Built for the Philippines*

---

### Key Differentiators

🧭 **Krawl Mode** • 📴 **Offline-First** • 👥 **Community-Curated** • 🇵🇭 **Hyperlocal Focus**

---

**Krawl: Discover the Philippines, One Krawl at a Time**

*Powered by Local Knowledge • Built for Community*

</div>

---

*Document maintained by Project Lead • Last reviewed: 2025-10-28*