# 🎯 Project Proposal: Krawl

> **Purpose:** This proposal presents the comprehensive business case for Krawl, including problem statement, solution approach, target audience, goals, timeline, and budget for the MVP phase.

**Version:** 1.0.0  
**Last Updated:** 2025-10-28  
**Status:** Active  
**Owner:** Project Lead

---

## 📋 Table of Contents

1. [Overview](#1--overview)
2. [Problem Statement](#2--problem-statement)
3. [Solution: Krawl](#3--solution-krawl)
4. [Goals (Initial Phase)](#4--goals-initial-phase---approx-12-weeks-mvp)
5. [Target Audience](#5--target-audience)
6. [Timeline](#6--timeline-high-level---12-weeks-mvp)
7. [Budget](#7--budget-initial-phase---mvp-estimate-in-php)

---

## 1. 🎯 Overview

**The Living Map of Filipino Culture**

**Krawl** is a community-driven Progressive Web App (PWA) designed to map and share authentic, hyperlocal Filipino culture. Moving beyond generic listings, Krawl empowers users ("**Locals**") to pin points of interest ("**Gems**") – from hidden food stalls and street art to historical markers – and weave them into curated, step-by-step trails ("**Krawls**").

Its unique "**Krawl Mode**" offers a guided, location-aware experience, turning discovery into an interactive adventure led by local insights.

> **Mission:** To be the go-to platform for discovering the Philippines' rich cultural tapestry, one Krawl at a time, starting with key hubs like Cebu or Metro Manila.

---

## 2. ❌ Problem Statement

While the Philippines boasts incredible cultural diversity, discovering authentic, hyperlocal experiences remains fragmented and challenging. Existing tools fall short:

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

## 3. ✨ Solution: Krawl

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

## 4. 🎯 Goals (Initial Phase - Approx. 12 Weeks MVP)

| Goal | Description | Target |
|------|-------------|--------|
| **🚀 Develop & Launch MVP (PWA)** | Build and deploy a functional PWA featuring core functionalities | Full deployment |
| | *Features: User authentication, Gem pinning (with duplicate check), Krawl creation/viewing, Krawl Mode (including offline download/navigation), basic community vouching/rating/reporting* | |
| **🌱 Seed Initial Content** | Populate 1-2 key districts (e.g., within Cebu City) | 100+ Gems, 10+ Krawls |
| | *Via team efforts ("User Zero") and recruited local "Founding Users"* | |
| **✅ Validate Core Loop** | Achieve initial user adoption within the launch area | 100-500 active users |
| | *Demonstrating engagement with Gem pinning, Krawl creation, and significant Krawl Mode usage* | |
| **📊 Gather User Feedback** | Collect qualitative and quantitative data | Ongoing |
| | *Focus: User experience (especially Krawl Mode), feature usability, and community dynamics to inform the next iteration* | |
| **💰 Test Revenue Model** | Onboard a small pilot group of local businesses | 5-10 businesses |
| | *Validate "Claim Your Gem" freemium model appeal and technical feasibility* | |

---

## 5. 👥 Target Audience

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

## 6. 📅 Timeline (High-Level - 12 Weeks MVP)
```
Week 1-2   │ 🏗️  Project Setup & Foundation
           │     Architecture, Design System Basics
           │
Week 3-6   │ ⚙️  Core Feature Development
           │     Auth, Gem Pinning, Krawl Creation, Map Display
           │
Week 7-8   │ 👥 Community & Quality Features
           │     Vouching, Rating, Reporting, Profiles
           │
Week 9-10  │ 🧭 Krawl Mode & Offline Implementation
           │     Location-aware guidance, Offline downloads
           │
Week 11    │ 🧪 Testing, Bug Fixing & Deployment Prep
           │     QA, Performance optimization
           │
Week 12    │ 🌱 Content Seeding & Launch Readiness
           │     Final content push, Go-live
```

---

## 7. 💰 Budget (Initial Phase - MVP Estimate in PHP)

### 📊 Budget Breakdown

| Category | Cost (Sweat Equity) | Cost (Freelance) |
|----------|---------------------|------------------|
| **👨‍💻 Human Resources** | Sweat Equity | ₱170,000 - 510,000+ |
| | *Primarily founders/team* | *Development/design freelancers* |
| **☁️ Infrastructure** | ₱0 - 4,000 | ₱0 - 4,000 |
| | *Free tiers for hosting PWA, backend API, database* | *3 months, minimal cost unless scaling needed* |
| **🌐 Domain Name** | ₱700/year | ₱700/year |
| **🗺️ Map API Costs** | ₱0 | ₱0 |
| | *Google Maps free tier likely sufficient for MVP* | |
| **🛠️ Tools** | ₱0 | ₱0 |
| | *Free tiers for design/project management* | |
| **📣 Marketing/Seeding** | ₱1,000 - 2,500 | ₱1,000 - 2,500 |
| | *Small incentives for "Founding Users"* | |
| **🔧 Contingency** | ₱1,000 | ₱10,000 |
| | | |
| **💵 TOTAL (3 Months)** | **₱2,700 - 7,200** | **₱182,000 - 527,000+** |

### 💡 Budget Strategy

- **Lean Start:** Leverage free tiers and open-source tools
- **Community-First:** Rely on "Founding Users" for initial content
- **Scalable:** Infrastructure costs only increase with success

---

<div align="center">

## 🚀 The Vision

**Krawl bridges the gap between discovery and guided experience for exploring Filipino culture**

*Community-First • Authenticity-Driven • Built for the Philippines*

---

### Key Differentiators

🧭 **Krawl Mode** • 📴 **Offline-First** • 👥 **Community-Curated** • 🇵🇭 **Hyperlocal Focus**

---

*This proposal outlines Krawl's unique value in bridging the gap between discovery and guided experience for exploring Filipino culture, leveraging a community-first approach and a practical PWA launch strategy.*

</div>

---

## 📝 Changelog

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0.0 | 2025-10-28 | Initial project proposal | Project Lead |

---

## 📚 Related Documents

- [Project Brief](./project-brief.md) - High-level project overview
- [Scope of Work](./scope-of-work.md) - Detailed feature specifications
- [Milestone and Timeline](./milestone-and-timeline.md) - Detailed 12-week breakdown
- [Budget and Resource](./budget-and-resource.md) - Detailed budget analysis
- [User Personas](./user-persona-profile.md) - Target audience profiles

---

*Document maintained by Project Lead • Last reviewed: 2025-10-28*