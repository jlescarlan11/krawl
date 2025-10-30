# Glossary: Krawl

> **Purpose:** Comprehensive glossary of technical terms, acronyms, and Filipino terms used in Krawl documentation.

**Last Updated:** 2025-10-31  
**Status:** Active

---

## Quick Links

- [Technical Terms](#technical-terms)
- [Acronyms](#acronyms)
- [Filipino Terms](#filipino-terms--cultural-references)
- [Krawl-Specific Terms](#krawl-specific-terms)

---

## Technical Terms

### A

**API (Application Programming Interface)**  
Interface that allows different software applications to communicate. Krawl uses a REST API built with Spring Boot.

**API Gateway**  
Entry point for API requests, handling routing, authentication, and rate limiting.

**ASCII (American Standard Code for Information Interchange)**  
Character encoding standard used for text representation. Used in wireframes for simple diagrams.

**Authentication**  
Process of verifying user identity, typically through email/password or tokens.

**Authorization**  
Process of determining what an authenticated user is allowed to do.

### B

**Backend**  
Server-side application logic. Krawl's backend is built with Spring Boot.

**BCrypt**  
Password hashing algorithm used for secure password storage. Krawl uses cost factor 12.

**Bounding Box**  
Rectangular area defined by coordinates (NE/SW corners), used for map queries.

### C

**Cache API**  
Browser API for storing HTTP responses offline. Used in Krawl PWA for offline functionality.

**CDN (Content Delivery Network)**  
Distributed network of servers that deliver content to users based on geographic location.

**CI/CD (Continuous Integration/Continuous Deployment)**  
Automated process for building, testing, and deploying code changes.

**Cloudinary**  
Cloud-based image and video management service. Used for storing Gem photos.

**Clustering (Map)**  
Technique for grouping nearby map markers to reduce visual clutter.

**CORS (Cross-Origin Resource Sharing)**  
Security mechanism that controls how web pages can request resources from different domains.

**Cost Factor**  
Parameter in BCrypt that determines computational complexity. Higher = more secure but slower.

### D

**Database Migration**  
Version-controlled changes to database schema, managed by Flyway/Liquibase.

**Diátaxis**  
Documentation framework organizing content into Tutorials, How-to guides, Explanation, and Reference.

**Docker**  
Platform for containerizing applications. Used for local PostgreSQL development.

**Docker Compose**  
Tool for defining multi-container Docker applications via YAML files.

**DOM (Document Object Model)**  
Tree representation of HTML elements, manipulated by JavaScript.

**DOMPurify**  
Library for sanitizing HTML to prevent XSS attacks.

### E

**Endpoint**  
Specific URL path in an API (e.g., `/api/v1/gems`).

**Entity**  
Database table representation in code (e.g., `Gem`, `User`, `Krawl` entities).

**Epic**  
Large body of work broken down into smaller tasks. Krawl has 7 epics in the MVP.

### F

**FAB (Floating Action Button)**  
Circular button that floats above UI content, typically used for primary actions.

**Figma**  
Collaborative design tool for creating UI/UX mockups and prototypes.

**Flyway**  
Database migration tool that tracks and applies schema changes.

**Frontend**  
Client-side application that users interact with. Krawl's frontend is built with Next.js.

### G

**Geography (PostGIS)**  
Data type for storing geospatial coordinates on a spheroid (Earth).

**Geolocation**  
Browser API for retrieving user's geographic position via GPS/WiFi.

**GIST (Generalized Search Tree)**  
PostgreSQL index type optimized for spatial data queries.

**Git**  
Version control system for tracking code changes.

**GitHub Actions**  
CI/CD platform integrated with GitHub for automated workflows.

**GPS (Global Positioning System)**  
Satellite-based navigation system for determining location.

### H

**Hashing**  
One-way transformation of data (e.g., passwords) into fixed-length strings.

**HTTPS (HTTP Secure)**  
Encrypted version of HTTP using TLS/SSL certificates.

**HttpOnly Cookie**  
Cookie flag that prevents JavaScript access, improving security.

### I

**IndexedDB**  
Browser API for storing large amounts of structured data offline.

**ILIKE**  
PostgreSQL operator for case-insensitive pattern matching.

### J

**JPA (Java Persistence API)**  
Java specification for object-relational mapping (ORM).

**JSON (JavaScript Object Notation)**  
Lightweight data interchange format. Used for API requests/responses.

**JWT (JSON Web Token)**  
Compact, URL-safe token format for authentication. Contains header, payload, and signature.

### K

**Key-Value Store**  
Database that stores data as key-value pairs (e.g., LocalStorage).

### L

**Lazy Loading**  
Technique to defer loading resources until they're needed, improving performance.

**Let's Encrypt**  
Free, automated certificate authority providing SSL/TLS certificates.

**Liquibase**  
Alternative to Flyway for database migration management.

**LocalStorage**  
Browser API for storing key-value pairs persistently (up to ~5MB).

**Lokal Verde**  
Krawl's primary brand color (#4A7C59), representing Filipino green spaces.

### M

**MapLibre GL JS**  
Open-source library for interactive maps with WebGL rendering.

**Mapbox**  
Commercial mapping platform. MapLibre is the open-source alternative.

**Maptiler**  
Map tile hosting service providing base map styles.

**Markdown**  
Lightweight markup language for formatting text documents.

**Mermaid**  
JavaScript library for creating diagrams from text definitions.

**Middleware**  
Software layer that processes requests between client and server.

**Migration (Database)**  
Versioned changes to database schema.

**Modal**  
Overlay UI component that requires user interaction before returning to main content.

**MVP (Minimum Viable Product)**  
Initial version with core features needed to validate product concept.

### N

**Next.js**  
React framework with server-side rendering and routing. Krawl frontend framework.

**Node.js**  
JavaScript runtime for server-side development.

**NoSQL**  
Database systems that don't use traditional SQL tables (e.g., MongoDB).

**npm (Node Package Manager)**  
Package manager for JavaScript dependencies.

### O

**ORM (Object-Relational Mapping)**  
Technique for converting database records to programming language objects.

**OWASP (Open Web Application Security Project)**  
Organization providing security standards and tools.

### P

**Pagination**  
Dividing large datasets into smaller pages for better performance.

**Parameterized Query**  
SQL query using placeholders for values, preventing SQL injection.

**PostGIS**  
PostgreSQL extension adding geospatial data types and functions.

**PostgreSQL**  
Open-source relational database management system. Krawl's database.

**Progressive Web App (PWA)**  
Web application with native app-like features (offline, installable, push notifications).

**Proximity Search**  
Finding records near a geographic location within a radius.

### Q

**Query Parameter**  
Key-value pair in URL after `?` (e.g., `?limit=20&offset=40`).

### R

**Rate Limiting**  
Restricting the number of API requests within a time window.

**RBAC (Role-Based Access Control)**  
Authorization approach where permissions are assigned to roles.

**React**  
JavaScript library for building user interfaces. Used by Next.js.

**Refresh Token**  
Long-lived token used to obtain new access tokens without re-authentication.

**Render**  
Cloud platform for hosting web applications and databases.

**Repository (Git)**  
Storage location for code and version history.

**Repository (JPA)**  
Interface for database operations on specific entities.

**REST (Representational State Transfer)**  
Architectural style for web APIs using HTTP methods.

**Responsive Design**  
UI approach that adapts layout to different screen sizes.

### S

**SameSite**  
Cookie attribute controlling cross-site request behavior.

**Sanitization**  
Process of cleaning user input to prevent security vulnerabilities.

**Schema (Database)**  
Structure defining tables, columns, and relationships.

**SCRAM-SHA-256**  
Authentication mechanism for PostgreSQL using salted challenge-response.

**Semantic Versioning**  
Version numbering scheme (MAJOR.MINOR.PATCH).

**Service Worker**  
Script running in background, enabling offline functionality and caching.

**Session**  
Period of user interaction, tracked via tokens or cookies.

**Soft Delete**  
Marking records as deleted without removing from database (using `deleted_at`).

**Spring Boot**  
Java framework for building production-ready applications. Krawl's backend framework.

**SQL (Structured Query Language)**  
Language for managing relational databases.

**SQL Injection**  
Attack technique inserting malicious SQL code through user input.

**SSL/TLS (Secure Sockets Layer / Transport Layer Security)**  
Cryptographic protocols for secure communication.

**State Management**  
Handling and organizing application data across components.

**Supercluster**  
JavaScript library for fast clustering of map markers.

### T

**Tailwind CSS**  
Utility-first CSS framework. Krawl's styling approach.

**Tag**  
Category label applied to Gems (e.g., "food", "nature").

**Token (Authentication)**  
Encrypted string proving user identity, typically JWT.

**Trigger (Database)**  
Automatic function execution in response to database events.

**TypeScript**  
Typed superset of JavaScript providing static type checking.

### U

**UUID (Universally Unique Identifier)**  
128-bit identifier used as primary keys in Krawl (e.g., `550e8400-e29b-41d4-a716-446655440000`).

### V

**Validation**  
Checking user input meets specified criteria before processing.

**Vercel**  
Cloud platform for deploying frontend applications, especially Next.js.

**View (Database)**  
Virtual table based on SQL query results.

### W

**WAF (Web Application Firewall)**  
Security layer filtering malicious HTTP traffic.

**WebGL**  
JavaScript API for rendering 2D/3D graphics in browsers.

**Wireframe**  
Low-fidelity visual representation of UI layout.

### X

**XSS (Cross-Site Scripting)**  
Attack injecting malicious scripts into web pages.

### Z

**Zod**  
TypeScript-first schema validation library.

**Zustand**  
Lightweight state management library for React.

---

## Acronyms

| Acronym | Full Form | Category |
|---------|-----------|----------|
| **API** | Application Programming Interface | Technical |
| **BCrypt** | Blowfish Crypt | Security |
| **CDN** | Content Delivery Network | Infrastructure |
| **CI/CD** | Continuous Integration/Continuous Deployment | DevOps |
| **CORS** | Cross-Origin Resource Sharing | Security |
| **CSS** | Cascading Style Sheets | Frontend |
| **CRUD** | Create, Read, Update, Delete | Development |
| **DOM** | Document Object Model | Frontend |
| **DTO** | Data Transfer Object | Backend |
| **FAB** | Floating Action Button | UI/UX |
| **GDPR** | General Data Protection Regulation | Compliance |
| **GIST** | Generalized Search Tree | Database |
| **GPS** | Global Positioning System | Geolocation |
| **HSTS** | HTTP Strict Transport Security | Security |
| **HTTP** | Hypertext Transfer Protocol | Networking |
| **HTTPS** | HTTP Secure | Networking |
| **IDOR** | Insecure Direct Object Reference | Security |
| **JPA** | Java Persistence API | Backend |
| **JSON** | JavaScript Object Notation | Data Format |
| **JWT** | JSON Web Token | Security |
| **MFA** | Multi-Factor Authentication | Security |
| **MVP** | Minimum Viable Product | Product |
| **ORM** | Object-Relational Mapping | Database |
| **OWASP** | Open Web Application Security Project | Security |
| **PWA** | Progressive Web App | Frontend |
| **RBAC** | Role-Based Access Control | Security |
| **REST** | Representational State Transfer | API |
| **RPO** | Recovery Point Objective | Infrastructure |
| **RTO** | Recovery Time Objective | Infrastructure |
| **SAST** | Static Application Security Testing | Security |
| **SIEM** | Security Information and Event Management | Security |
| **SQL** | Structured Query Language | Database |
| **SSRF** | Server-Side Request Forgery | Security |
| **SSL** | Secure Sockets Layer | Security |
| **TLS** | Transport Layer Security | Security |
| **UI** | User Interface | Design |
| **UUID** | Universally Unique Identifier | Database |
| **UX** | User Experience | Design |
| **WAF** | Web Application Firewall | Security |
| **YAML** | YAML Ain't Markup Language | Configuration |
| **XSS** | Cross-Site Scripting | Security |

---

## Filipino Terms & Cultural References

### Krawl Brand Vocabulary

**Krawl**  
Platform name. A play on "crawl" (exploring slowly) combined with Filipino street culture.

**Gem**  
A hidden local spot worth discovering. Inspired by Filipino expression "hidden gem" (nakatagong yaman).

**Lokal**  
Filipino Tagalog word for "local" or "native." Emphasizes community-driven, authentic experiences.

**Lokal Verde**  
Krawl's brand name for its primary green color, meaning "Local Green."

**Lokal Secret**  
Insider tips or hidden knowledge about a Gem, shared by Krawl creators.

**Vouch**  
Endorsement system. Filipino culture values "vouching" (pagsang-ayon) or personal recommendations.

### Cultural Context

**Barangay**  
Smallest administrative division in the Philippines, similar to a neighborhood. Represents local community.

**Kalye**  
Tagalog word for "street." Represents street-level exploration.

**Kanto**  
Tagalog for "corner." Common meeting point in Filipino neighborhoods.

**Sari-sari Store**  
Small neighborhood convenience store, quintessential Filipino local business.

**Tindahan**  
Tagalog for "store" or "shop."

**Turo-turo**  
Filipino eatery where customers point to pre-cooked dishes (literally "point-point").

**Yaman**  
Tagalog for "treasure" or "wealth." Hidden gems are "yaman."

### Filipino Food Terms (Common in Krawl)

**Isaw**  
Grilled chicken or pork intestines, popular Filipino street food.

**Sisig**  
Sizzling dish made from pig's head and liver, Filipino specialty.

**Kwek-kwek**  
Deep-fried quail eggs coated in orange batter.

**Fishball**  
Popular Filipino street food snack.

---

## Krawl-Specific Terms

### User Tiers (Reputation System)

**Newcomer**  
New user with no created Krawls or limited activity.

**Trail Maker**  
User with 3+ Krawls and average creator score ≥ 3.5.

**Kanto Guide**  
Top-tier user with 10+ highly-rated Krawls. Community leader status.

### Gem Statuses

**Lifecycle Status:**
- **Open** - Currently operating
- **Closed** - Temporarily or permanently closed
- **Flagged** - Reported by users, pending review

**Approval Status:**
- **Pending** - Awaiting verification
- **Approved** - Verified by community/moderators
- **Rejected** - Spam or invalid

### Krawl Visibility

**Public**  
Visible to all users, searchable, appears in discover feed.

**Friends Only**  
Visible only to user's connections (future feature).

**Private**  
Visible only to creator (future feature).

### Report Types

**Permanently Closed**  
Business or location has shut down.

**Wrong Location**  
Gem coordinates are incorrect.

**Spam / Offensive**  
Inappropriate or malicious content.

### Map Interactions

**Pin**  
Action of creating a new Gem at a location.

**Cluster**  
Group of nearby Gem markers shown as a single icon.

**Bounds**  
Visible area of the map defined by corner coordinates.

**Proximity Search**  
Finding Gems within a radius of a location.

### Krawl Components

**Stop**  
Individual Gem within a Krawl, ordered sequentially.

**Step Order**  
Sequence number of a stop in a Krawl (1, 2, 3...).

**Creator Note**  
Personal commentary from Krawl creator about a stop.

**Lokal Secret**  
Special insider tip visible only to Krawl followers.

**Trail**  
Synonym for Krawl, emphasizing the path/route aspect.

### PWA Features

**Offline Mode**  
Ability to use app without internet connection.

**Download for Offline**  
Caching a Krawl locally for offline access.

**Install Prompt**  
Browser notification to add PWA to home screen.

**Service Worker**  
Background script enabling offline functionality.

---

## Usage Examples

### In Documentation

✅ **Correct:** "Users can create Gems (pins) at their favorite local spots."  
❌ **Incorrect:** "Users can create pins (Gems) at their favorite local spots."

*Note: Gem is the primary term; "pin" is secondary.*

✅ **Correct:** "The Krawl includes 5 stops with creator notes."  
❌ **Incorrect:** "The trail includes 5 waypoints with descriptions."

*Note: Use Krawl-specific terminology consistently.*

### In Code

```typescript
// Use clear, descriptive variable names
const gems = await fetchGems({ bounds, filters });

// Not ambiguous abbreviations
const g = await fetchG({ b, f }); // ❌ Bad
```

---

## Contributing

### Adding New Terms

When adding terms to this glossary:

1. **Alphabetical Order:** Place in correct section
2. **Definition First:** Clear, concise explanation
3. **Context:** How it's used in Krawl
4. **Examples:** Show usage when helpful
5. **Related Terms:** Cross-reference similar concepts

### Format Template

```
**Term Name**  
Clear definition in 1-2 sentences. Additional context or usage notes.
```

---

## 📚 Related Documents

- [Brand Guidelines](./brand-guidelines.md) - Brand vocabulary and voice
- [User Stories](../planning/user-story.md) - Feature terminology
- [API Documentation](./api-endpoints.md) - Technical API terms
- [Database Schema](./database-schema.md) - Database terminology

---

*Glossary maintained by Documentation Team • Last reviewed: 2025-10-31*

