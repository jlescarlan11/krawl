# Krawl PWA Wireframes

> **Purpose:** Visual representations of key screens and user flows for the Krawl PWA, organized by page for easy reference during development.

**Last Updated:** 2025-10-31  
**Status:** Active (In Development)  
**Design Tool:** ASCII wireframes (migrating to Figma)

---

## Overview

This folder contains wireframes for all major screens in the Krawl PWA. As pages are implemented, wireframes should be updated with:
- Screenshots of actual implementation
- Component breakdowns
- State management notes
- Responsive behavior documentation

---

## Wireframe Index

### Core Screens

| Page | Wireframe File | Implementation Status |
|------|----------------|----------------------|
| Home / Map View | [map-view.md](./map-view.md) | 🟡 In Progress |
| Other Pages | See [archived wireframe](../../archived/wireframe.md.bak) | ⚪ To Do |

**Note:** The complete set of ASCII wireframes for all pages is available in the archived wireframe document. As each page is implemented, extract the relevant wireframe and create a dedicated file following the `map-view.md` template structure.

---

## Wireframe Structure

Each wireframe file includes:

1. **ASCII Wireframe** - Low-fidelity layout
2. **Key Features** - Functional requirements
3. **Components** - UI component breakdown (to be completed)
4. **State Management** - Data flow (to be completed)
5. **Responsive Notes** - Breakpoint behavior (to be completed)
6. **Screenshots** - Actual implementation (to be added)
7. **TODO/Future** - Planned improvements

---

## Design Principles

### Mobile-First

All wireframes prioritize mobile (375px-428px) as the primary viewport.

### Progressive Web App

Designs account for:
- Offline functionality
- Installability
- App-like navigation

### Lokal Verde Aesthetic

Visual design follows the brand guidelines:
- **Primary Color:** Lokal Verde (#4A7C59)
- **Typography:** Outfit (headings), Inter (body)
- **Style:** Clean, modern, Filipino-inspired

See: [Brand Guidelines](../../reference/brand-guidelines.md)

---

## How to Use

### For Developers

1. **Before Implementation:**
   - Review wireframe for the page you're building
   - Check key features and functional requirements
   - Note any interactive elements

2. **During Implementation:**
   - Reference wireframe for layout structure
   - Consult design system for component styling
   - Flag any discrepancies or improvements

3. **After Implementation:**
   - Take screenshots of actual pages
   - Update wireframe file with implementation notes
   - Document component usage and state management
   - Note responsive behavior across breakpoints

### For Designers

1. **Migrate to Figma:** Create high-fidelity mockups based on ASCII wireframes
2. **Update Documentation:** Link Figma files in wireframe documents
3. **Iterate:** Refine designs based on user feedback and testing

---

## Wireframe Conventions

### ASCII Symbols

```
╔═══╗  ┏━━━┓  ┌───┐
║   ║  ┃   ┃  │   │  Borders and containers
╚═══╝  ┗━━━┛  └───┘

[Button]  [Link]  Action elements
{Icon}    📍      Icons and symbols
<Input>            Form fields
(Disabled)         State indicators
```

### Layout Structure

```
┌─────────────────────────────┐
│         Header              │
├─────────────────────────────┤
│                             │
│         Content             │
│                             │
├─────────────────────────────┤
│    Bottom Navigation        │
└─────────────────────────────┘
```

---

## Migration to Figma (Planned)

**Timeline:** Post-MVP launch

**Benefits:**
- Interactive prototypes
- Easier collaboration
- Component libraries
- Design system integration
- Stakeholder presentations

**Figma File Structure:**
```
Krawl PWA Design System
├── 🎨 Brand & Tokens
├── 🧩 Components
├── 📱 Mobile Wireframes
├── 💻 Desktop Wireframes
└── 🔄 User Flows
```

---

## Updates and Maintenance

### When to Update Wireframes

- **Before Sprint:** Review and refine wireframes for upcoming features
- **After Implementation:** Add screenshots and implementation notes
- **After User Testing:** Incorporate feedback and design iterations
- **Design System Changes:** Update to reflect component updates

### Version Control

Wireframe updates should be committed with descriptive messages:

```bash
git commit -m "docs(wireframes): add screenshots for map view page"
git commit -m "docs(wireframes): update krawl builder with drag-and-drop flow"
```

---

## Related Documents

- [Design System](../../reference/design-system.md) - Component library
- [Brand Guidelines](../../reference/brand-guidelines.md) - Visual identity
- [User Stories](../../planning/user-story.md) - Feature requirements
- [Site Structure](../../reference/site-structure.md) - Information architecture

---

## Status Legend

| Icon | Status | Description |
|------|--------|-------------|
| 🟢 | Complete | Implemented and documented with screenshots |
| 🟡 | In Progress | Currently being developed |
| ⚪ | To Do | Planned but not started |
| 🔴 | Blocked | Waiting on dependencies |

---

*Wireframes maintained by Design & Development Team • Updated as pages are implemented*

