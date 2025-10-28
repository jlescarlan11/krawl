# 📋 Kanban Task Board: Krawl MVP

> **Purpose:** This document contains the comprehensive task breakdown for the Krawl MVP development, organized by epics covering project setup, frontend features, backend API development, and deployment.

**Version:** 1.0.0  
**Last Updated:** 2025-10-28  
**Status:** Active  
**Owner:** Project Lead

---

## 📋 Table of Contents

1. [Board Columns](#-board-columns)
2. [Epic 1: Initial Project Setup](#-epic-1-initial-project-setup--environment-configuration)
3. [Epic 2: Core Authentication & Profile](#-epic-2-core-authentication--profile-us-1x)
4. [Epic 3: Gem Creation & Display](#-epic-3-gem-creation--display-us-2x)
5. [Epic 4: Krawl Creation & Display](#-epic-4-krawl-creation--display-us-3x)
6. [Epic 5: Discovery & Exploration](#-epic-5-discovery--exploration-us-4x)
7. [Epic 6: Community Interaction & Quality](#-epic-6-community-interaction--quality-us-6x)
8. [Epic 7: Krawl Mode & Offline](#-epic-7-krawl-mode--offline-us-5x-us-8x)

---

## 📊 Board Columns

```
┌─────────────┬──────────────┬──────────┐
│   To Do     │ In Progress  │   Done   │
└─────────────┴──────────────┴──────────┘
```

---

## 🎯 Epic 1: Initial Project Setup & Environment Configuration

### Task PS-1: Initialize Git Repository & Define Structure

**Description:** Create the main Git repository and set up the initial frontend, backend, and docs directory structure as outlined in the documentation.

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ Git repository created on the chosen platform (GitHub, GitLab, etc.)
- ✅ `frontend/`, `backend/`, `docs/` directories exist at the root
- ✅ Initial `.gitignore` file created covering Node.js, Java/Gradle/Maven, and OS-specific files

**Assignee:** [Lead Dev / DevOps]

---

### Task PS-2: Establish & Document Naming Conventions

**Description:** Formally adopt and document the naming conventions (General, Frontend, Backend, DB, Git) in the project's `README.md` or a dedicated `CONTRIBUTING.md` file.

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ Naming conventions section added to project documentation
- ✅ Conventions cover all areas specified (files, variables, classes, DB, Git branches)
- ✅ Documentation is clear and accessible to the team

**Assignee:** [Project Lead / Lead Dev]

---

### Task PS-3: Verify Prerequisites Installation (Team)

**Description:** Ensure all team members have the necessary prerequisite software installed (Git, Node.js/nvm, JDK, Docker/Docker Compose, preferred Code Editor).

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ Each team member confirms successful installation and basic functionality of all prerequisites
- ✅ A shared checklist or confirmation thread is completed

**Assignee:** [Each Team Member]

---

### Task PS-4: Configure Docker for Database (PostgreSQL + PostGIS)

**Description:** Create and test the `docker-compose.yml` file to run the PostgreSQL database with the PostGIS extension containerized.

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ `docker-compose.yml` file exists in the repository root (or designated location)
- ✅ Running `docker-compose up -d` successfully starts the database container
- ✅ Database container includes the PostGIS extension
- ✅ Basic connection to the Dockerized DB is possible (e.g., using a DB client)
- ✅ Default credentials and DB name are documented for local setup

**Assignee:** [Backend Dev / DevOps]

---

### Task PS-5: Initialize Backend Project (Spring Boot)

**Description:** Set up the basic Spring Boot project structure within the `backend/` directory using Gradle or Maven, including initial configuration.

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ Spring Boot project generated (`build.gradle` or `pom.xml` exists)
- ✅ Directory structure matches the documentation (`com.krawl` packages, etc.)
- ✅ Initial `application.yml` (or `.properties`) created with placeholders for DB connection
- ✅ Project builds successfully (`./gradlew build` or `mvnw package`)
- ✅ Basic database migration tool (Flyway/Liquibase) configured

**Assignee:** [Backend Dev]

---

### Task PS-6: Configure Backend Local Database Connection & Migrations

**Description:** Configure the Spring Boot backend to connect to the local Dockerized database and run initial database migrations (including schema from `Krawl_DatabaseSchema.md`).

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ `application.yml` correctly configured with local DB credentials
- ✅ Backend application starts successfully (`./gradlew bootRun` or `mvnw spring-boot:run`) and connects to the database
- ✅ Initial database migration script(s) reflecting the full MVP schema run successfully on startup

**Assignee:** [Backend Dev]

---

### Task PS-7: Initialize Frontend Project (Next.js)

**Description:** Set up the basic Next.js project structure within the `frontend/` directory using `create-next-app` (or similar) with TypeScript.

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ Next.js project created using the App Router
- ✅ Directory structure matches the documentation (`app/`, `components/`, `lib/`, etc.)
- ✅ TypeScript is configured (`tsconfig.json`)
- ✅ Project installs dependencies (`npm install` or `yarn install`)
- ✅ Project runs successfully in development mode (`npm run dev` or `yarn dev`)

**Assignee:** [Frontend Dev]

---

### Task PS-8: Configure Frontend (Tailwind, API URL, Basic Layout)

**Description:** Configure Tailwind CSS V4, set up API communication, and implement the basic PWA layout structure (Header, Map Area, Bottom Nav).

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ `tailwind.config.ts` created and configured with "Lokal Verde" theme tokens
- ✅ Global CSS includes Tailwind directives
- ✅ Frontend is configured to send API requests to `http://localhost:8080/api`
- ✅ Basic layout structure (Header, Content Area, Bottom Nav) is in place using Tailwind
- ✅ Basic PWA manifest (`public/manifest.json`) and service worker setup initiated

**Assignee:** [Frontend Dev]

---

### Task PS-9: Create Initial README.md & Contribution Guidelines

**Description:** Write the initial `README.md` and `CONTRIBUTING.md` including project overview, setup instructions, naming conventions, and basic contribution workflow.

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ `README.md` exists with overview and setup steps
- ✅ `CONTRIBUTING.md` exists with naming conventions and branch strategy
- ✅ Links to `docs/` folder provided

**Assignee:** [Project Lead / Lead Dev]

---

### Task PS-10: Verify Full Local Setup (End-to-End)

**Description:** Have a team member (ideally someone not involved in the initial setup) follow the `README.md` to ensure the entire local environment can be successfully started from scratch.

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ A team member successfully clones the repo
- ✅ Runs `docker-compose up -d` successfully
- ✅ Runs the backend successfully (`./gradlew bootRun`)
- ✅ Runs the frontend successfully (`npm run dev`)
- ✅ Accesses the running application in the browser at `http://localhost:3000`
- ✅ Any setup issues are documented and resolved

**Assignee:** [Designated Tester / Another Dev]

---

## 🔐 Epic 2: Core Authentication & Profile (US 1.x)

### Task FE-AUTH-1: Build Registration Form UI

**Description:** Create the frontend React component for the user registration form, including input fields, labels, basic styling, and client-side validation hints.

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ Registration component (`SignupForm.tsx` or similar) exists
- ✅ Includes fields for Username, Email, Password, Confirm Password
- ✅ Styled according to the Design System (`Krawl_DesignSystem.md`)
- ✅ Basic HTML5 or JavaScript validation provides immediate feedback (e.g., required fields, email format, password match)
- ✅ Form is responsive

**Assignee:** [Frontend Dev]

---

### Task FE-AUTH-2: Build Login Form UI

**Description:** Create the frontend React component for the user login form, including input fields, labels, styling, and basic validation.

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ Login component (`LoginForm.tsx` or similar) exists
- ✅ Includes fields for Email and Password
- ✅ Styled according to the Design System
- ✅ Basic validation hints are present
- ✅ Includes a "Forgot Password?" link (functionality TBD)
- ✅ Form is responsive

**Assignee:** [Frontend Dev]

---

### Task FE-AUTH-3: Implement Auth API Calls & State Management

**Description:** Implement the frontend logic to call the backend registration and login APIs, handle the JWT response, store the token securely (e.g., `localStorage`, `sessionStorage`), and manage the application's authentication state globally (e.g., using React Context or Zustand).

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ `onSubmit` handlers in forms call the correct backend endpoints (`/api/auth/register`, `/api/auth/login`)
- ✅ Loading state is shown during API calls
- ✅ Successful login stores the received JWT and updates the global auth state (e.g., `isAuthenticated = true`, user object)
- ✅ Successful registration logs the user in automatically (stores JWT, updates state)
- ✅ API errors are caught and displayed appropriately to the user
- ✅ Authenticated state persists across page reloads (using stored token)

**Assignee:** [Frontend Dev]

---

### Task FE-AUTH-4: Implement Logout Functionality

**Description:** Create a logout button/action that clears the stored authentication token and updates the global state.

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ A logout mechanism (e.g., button in profile menu) exists
- ✅ Clicking logout removes the JWT from storage
- ✅ Global auth state is updated (`isAuthenticated = false`, `user = null`)
- ✅ User is redirected to the main map (`/`) in a logged-out state

**Assignee:** [Frontend Dev]

---

### Task FE-AUTH-5: Build Basic User Profile Page UI

**Description:** Create the frontend page (`/profile/[username]`) to display basic user information fetched from the backend, including their creator score and tier.

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ Profile page component exists and fetches data from `/api/users/{username}` based on route param
- ✅ Displays Username, Bio (if available), Join Date
- ✅ Displays Creator Score (e.g., "4.2 Stars")
- ✅ Displays Reputation Tier Badge (e.g., "🥇 Kanto Guide") based on score/tier data from backend
- ✅ Styled according to the Design System
- ✅ Handles cases where the user is not found

**Assignee:** [Frontend Dev]

---

### Task BE-AUTH-1: Implement User Registration Endpoint

**Description:** Create the `POST /api/auth/register` endpoint in Spring Boot to handle new user sign-ups, validate input, hash passwords, and save the user to the database.

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ Endpoint exists and accepts `RegisterRequest` DTO
- ✅ Performs validation (username/email uniqueness, password complexity)
- ✅ Hashes the password securely (e.g., using BCrypt)
- ✅ Saves the new `UserEntity` to the database with default score/tier
- ✅ Returns a success response (e.g., user details or just 201 Created)
- ✅ Returns appropriate error responses (e.g., 400 for validation, 409 for duplicate username/email)

**Assignee:** [Backend Dev]

---

### Task BE-AUTH-2: Implement User Login Endpoint

**Description:** Create the `POST /api/auth/login` endpoint to authenticate users based on email and password, and generate a JWT upon success.

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ Endpoint exists and accepts `LoginRequest` DTO
- ✅ Validates input credentials against the database (comparing hashed passwords)
- ✅ If valid, generates a signed JWT containing user identifiers (e.g., user ID, username, roles/tier)
- ✅ Returns the JWT in the response (e.g., `{ "token": "..." }`)
- ✅ Returns appropriate error responses for invalid credentials (e.g., 401 Unauthorized)

**Assignee:** [Backend Dev]

---

### Task BE-AUTH-3: Configure Spring Security & JWT

**Description:** Set up Spring Security to protect relevant API endpoints, configure JWT filters for validating incoming tokens, and implement a `UserDetailsService` to load user data for authentication checks.

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ Spring Security dependencies added
- ✅ Security configuration class exists, defining public (`/api/auth/**`) and protected endpoints
- ✅ JWT filter correctly intercepts requests, validates tokens, and sets authentication context
- ✅ `UserDetailsService` implementation correctly loads user data by username/email
- ✅ Unauthorized requests to protected endpoints return 401/403 errors
- ✅ CORS configured correctly

**Assignee:** [Backend Dev]

---

### Task BE-AUTH-4: Implement User Profile Endpoint

**Description:** Create the `GET /api/users/{username}` endpoint to retrieve public profile information for a given user.

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ Endpoint exists and accepts username path variable
- ✅ Fetches user data (excluding sensitive info like password hash) from the database
- ✅ Returns user profile data (username, bio, join date, score, tier) in a `UserProfileResponse` DTO
- ✅ Returns 404 Not Found if the user doesn't exist
- ✅ Endpoint is publicly accessible (no auth required)

**Assignee:** [Backend Dev]

---

### Task T-AUTH-1: Test Authentication Flow

**Description:** Perform comprehensive testing (Unit, Integration, E2E) of the entire authentication and profile viewing process.

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ Users can successfully register
- ✅ Users cannot register with duplicate email/username
- ✅ Users can successfully log in with correct credentials
- ✅ Users cannot log in with incorrect credentials
- ✅ JWT is received upon login and stored correctly
- ✅ Protected API endpoints are inaccessible without a valid JWT
- ✅ Protected API endpoints are accessible with a valid JWT
- ✅ Users can log out successfully
- ✅ User profile pages display correct information for existing users
- ✅ User profile pages handle non-existent users gracefully (404)

**Assignee:** [QA / Dev]

---

## 📍 Epic 3: Gem Creation & Display (US 2.x)

### Task FE-GEM-1: Implement Map Interaction & Pin Placement UI

**Description:** Enable users to select a location on the Leaflet map and trigger the "Add Gem" process, passing the coordinates.

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ Clicking/tapping the map places a temporary visual marker
- ✅ Latitude/Longitude coordinates are accurately captured from the map event
- ✅ The "Add Gem" form/modal opens, pre-filled or aware of the selected coordinates
- ✅ Interaction works smoothly on both desktop (click) and mobile (tap)

**Assignee:** [Frontend Dev]

---

### Task FE-GEM-2: Build "Add Gem" Form UI

**Description:** Create the frontend React component for the "Add Gem" form, including inputs for name, description, tags, and action buttons, styled according to the design system.

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ `AddGemForm.tsx` component exists (likely as a modal)
- ✅ Includes required 'Name' input, optional 'Description' textarea, and a 'Tags' input/selector
- ✅ Styled using Tailwind based on "Lokal Verde" theme and Design System components
- ✅ Client-side validation (e.g., Name is required) provides user feedback
- ✅ 'Submit' and 'Cancel' buttons are present and styled correctly

**Assignee:** [Frontend Dev]

---

### Task FE-GEM-3: Handle "Add Gem" Form Submission & API Call

**Description:** Implement the logic within the "Add Gem" form to gather data, send the POST request to `/api/gems`, and handle success or error responses (excluding duplicate check initially).

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ Form submission bundles name, description, tags, and coordinates
- ✅ POST request is sent to `/api/gems` with the correct payload and auth token
- ✅ Loading state is visually indicated during the API call
- ✅ Successful response (201) closes the modal and shows a success notification
- ✅ Error responses (e.g., 400, 500) display an appropriate error message to the user without closing the modal

**Assignee:** [Frontend Dev]

---

### Task FE-GEM-4: Implement Duplicate Warning UI

**Description:** Create the `DuplicateWarning.tsx` component to display potential duplicates returned by the backend, providing context and action options.

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ Component exists and accepts a list of potential duplicate Gems as props
- ✅ Displays a clear warning message ("This might already exist!")
- ✅ Renders each potential duplicate as a card showing Name, Distance, Founder, Vouch Count
- ✅ Includes "View on Map", "Add to This Gem" (placeholder/disabled for now), "This is Different", and "Cancel" buttons for each or overall
- ✅ Styled with alert colors (Yellow/Orange) and `AlertTriangle` icon

**Assignee:** [Frontend Dev]

---

### Task FE-GEM-5: Integrate Duplicate Flow in Form Submission

**Description:** Modify the form submission logic (from FE-GEM-3) to handle the specific "duplicate detected" response (e.g., 409 Conflict) from the backend by showing the `DuplicateWarning.tsx` component instead of an error, and handle the user's choice from that component.

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ If the `/api/gems` POST returns a duplicate response (e.g., 409 with duplicate data), the `DuplicateWarning` component is displayed instead of the Add Gem form
- ✅ Clicking "Cancel" in the warning dismisses it and returns to the Add Gem form (or closes)
- ✅ Clicking "This is Different" might trigger a resubmission to the backend with a flag indicating override (requires BE modification) or simply closes the warning allowing user to try again
- ✅ "Add to This Gem" functionality is noted as future work for now

**Assignee:** [Frontend Dev]

---

### Task FE-GEM-6: Display Gems on Map

**Description:** Fetch Gem data from the `/api/gems` endpoint based on the current map view bounds and display them on the Leaflet map using markers, including clustering.

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ Map component fetches Gems from `/api/gems`, passing current map viewport coordinates (latitude/longitude bounds) as query parameters
- ✅ Fetched Gems are rendered as markers on the Leaflet map
- ✅ `Leaflet.markercluster` plugin is implemented and correctly groups nearby markers at lower zoom levels
- ✅ Map updates displayed Gems when the user pans or zooms (refetching based on new bounds)

**Assignee:** [Frontend Dev]

---

### Task FE-GEM-7: Differentiate Gem Markers by Status

**Description:** Style the Leaflet markers differently based on the Gem's `lifecycleStatus` (always 'open' for visible ones in MVP) and `vouchCount` to indicate pending vs. verified status.

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ Gems with `vouchCount` below threshold (e.g., < 3) are displayed using the 'pending' style (small gray dot)
- ✅ Gems with `vouchCount` at or above threshold are displayed using the 'verified' style (Primary Green pin)
- ✅ Marker styles are defined according to the Design System
- ✅ Clustering reflects the underlying marker types if possible/needed

**Assignee:** [Frontend Dev]

---

### Task FE-GEM-8: Build Gem Detail Popup/Drawer UI

**Description:** Create the UI component that appears when a user taps on a Gem marker, displaying its details.

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ Tapping a Gem marker (verified or pending) opens a modal or bottom drawer
- ✅ Component (`GemDetailDisplay.tsx` or similar) fetches full Gem details from `/api/gems/{gemId}` or uses data already fetched
- ✅ Displays Name, Description, Tags, Founder Username, Vouch Count, Average Rating (stars), and Status Badges (Stale, Closed, Warning - if implemented)
- ✅ Includes a section/carousel to display photos fetched from `/api/gems/{gemId}/photos`
- ✅ Includes action buttons (Vouch, Rate, Add Photo, Report - functionality implemented in Epic 6)
- ✅ Styled according to the Design System

**Assignee:** [Frontend Dev]

---

### Task FE-GEM-9: Implement Add Photo UI & Upload

**Description:** Add a button/mechanism within the Gem Detail view to allow users to select and upload a photo for that Gem, calling the backend endpoint.

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ "Add Photo" button exists in the Gem Detail view for logged-in users
- ✅ Clicking the button opens the device's file selector
- ✅ Selected image file is uploaded via a POST request to `/api/gems/{gemId}/photos`
- ✅ Loading state is shown during upload
- ✅ Success response refreshes the photo gallery in the Gem Detail view
- ✅ Error handling is implemented for upload failures

**Assignee:** [Frontend Dev]

---

### Task BE-GEM-1: Implement Fetch Gems Endpoint

**Description:** Create the `GET /api/gems` endpoint to return Gems based on geographic bounding box and potentially status filters.

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ Endpoint exists and accepts query parameters for latitude/longitude bounds (e.g., `minLat`, `maxLat`, `minLon`, `maxLon`)
- ✅ Uses PostGIS spatial query (`ST_MakeEnvelope`, `&&` operator or similar) to efficiently find Gems within the requested bounds
- ✅ Filters results to only include Gems with `lifecycleStatus = 'open'`
- ✅ Returns a list of Gems (potentially summary data for map display, including `gemId`, `name`, `location`, `vouchCount`, `averageRating`)
- ✅ Endpoint is publicly accessible

**Assignee:** [Backend Dev]

---

### Task BE-GEM-2: Implement Add Gem Endpoint

**Description:** Refine the `POST /api/gems` endpoint ensuring it requires authentication.

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ Endpoint is protected by Spring Security, requiring a valid JWT
- ✅ Unauthorized requests return 401
- ✅ Authenticated user's ID is correctly extracted and used as `founder_id`

**Assignee:** [Backend Dev]

---

### Task BE-GEM-3: Implement Duplicate Check Logic

**Description:** Implement the service-layer logic for detecting potential duplicate Gems based on proximity (PostGIS `ST_DWithin`) and name similarity before saving a new Gem.

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ `GemService` method exists to check for duplicates given new Gem coordinates and name
- ✅ Uses `ST_DWithin` query against the indexed location column
- ✅ Applies a name similarity algorithm (e.g., Levenshtein distance threshold) to nearby results
- ✅ Returns a list of potential duplicate `GemEntity` objects (or IDs/names) if found
- ✅ Integrated into the create Gem flow to trigger the 409 response

**Assignee:** [Backend Dev]

---

### Task BE-GEM-4: Implement Gem Saving Logic

**Description:** Ensure the service layer correctly creates and saves a `GemEntity` with the initial default values (`approvalStatus='pending'`, `lifecycleStatus='open'`, `vouch_count=0`).

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ `GemService.createGem` method persists a new `GemEntity` using `GemRepository`
- ✅ Saved entity has correct founder ID, coordinates, name, description, tags (linking via `gem_tags` table)
- ✅ `approval_status` defaults to 'pending'
- ✅ `lifecycle_status` defaults to 'open'
- ✅ `vouch_count` defaults to 0
- ✅ `average_rating` defaults to 0.00, `rating_count` to 0
- ✅ Returns the newly created `GemEntity` or its DTO representation

**Assignee:** [Backend Dev]

---

### Task BE-GEM-5: Implement Fetch Single Gem Endpoint

**Description:** Create the `GET /api/gems/{gemId}` endpoint to retrieve detailed information for a specific Gem.

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ Endpoint exists, accepts `gemId` path variable
- ✅ Fetches the Gem data from the database, including associated tags and founder info
- ✅ Returns detailed Gem data in a `GemDetailResponse` DTO
- ✅ Returns 404 Not Found if the Gem ID is invalid or the Gem is not visible (`lifecycleStatus != 'open'`)
- ✅ Endpoint is publicly accessible

**Assignee:** [Backend Dev]

---

### Task BE-GEM-6: Implement Add Photo Endpoint

**Description:** Create the `POST /api/gems/{gemId}/photos` endpoint to handle image uploads, store the image (e.g., to S3/Cloudinary), and save the photo metadata to the database.

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ Endpoint exists, requires authentication
- ✅ Accepts multipart/form-data image upload
- ✅ Validates file type and size
- ✅ Uploads image to configured external storage (e.g., S3)
- ✅ Saves photo metadata (`gem_id`, `uploader_id`, `photo_url`, optional caption) to `gem_photos` table
- ✅ Returns success response with photo metadata or URL
- ✅ Handles upload errors gracefully

**Assignee:** [Backend Dev]

---

### Task BE-GEM-7: Implement Fetch Gem Photos Endpoint

**Description:** Create the `GET /api/gems/{gemId}/photos` endpoint to retrieve a list of photo URLs associated with a specific Gem.

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ Endpoint exists and is publicly accessible
- ✅ Fetches records from `gem_photos` table for the given `gemId`
- ✅ Returns a list of photo URLs (and potentially IDs, captions)
- ✅ Returns empty list if no photos exist

**Assignee:** [Backend Dev]

---

### Task T-GEM-1: Test Gem Pinning Flow

**Description:** Perform comprehensive testing (Unit, Integration, E2E) of the entire process of adding a new Gem, including duplicate handling.

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ User can select a point on map, fill form, and submit successfully
- ✅ New 'pending' Gem appears on the map
- ✅ Submission fails with appropriate errors for invalid data (missing name, invalid coords)
- ✅ Submission triggering a duplicate shows the warning UI
- ✅ Choosing "This is Different" (if implemented for override) successfully creates the Gem
- ✅ Choosing "Cancel" returns user appropriately

**Assignee:** [QA / Dev]

---

### Task T-GEM-2: Test Gem Display & Details

**Description:** Perform testing (Unit, Integration, E2E) to ensure Gems are displayed correctly on the map and their details are accurate.

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ Gems within map bounds are loaded and displayed
- ✅ Clustering works correctly at various zoom levels
- ✅ Marker styles correctly differentiate pending vs. verified Gems
- ✅ Tapping a marker opens the detail popup/drawer
- ✅ Detail view shows correct Name, Description, Tags, Founder, Rating, Vouch Count, Photos
- ✅ Detail view handles Gems with no photos/description gracefully

**Assignee:** [QA / Dev]

---

### Task T-GEM-3: Test Add Photo Flow

**Description:** Perform testing (Unit, Integration, E2E) for the photo upload functionality.

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ User can select and upload a valid image file
- ✅ Uploaded image appears in the Gem's photo gallery
- ✅ Invalid file types/sizes are rejected with appropriate error messages
- ✅ Only logged-in users can access the upload function

**Assignee:** [QA / Dev]

---

## 🗺️ Epic 4: Krawl Creation & Display (US 3.x)

### Task FE-KRAWL-1: Build "Create New Krawl" Form UI

**Description:** Create the initial form/modal for users to input the title, description, and visibility setting for a new Krawl.

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ UI component exists (e.g., accessed from My Krawls page)
- ✅ Includes input for Title (required), Textarea for Description (optional), Toggle/Select for Visibility ('Public'/'Friends Only')
- ✅ Styled according to the Design System
- ✅ Submit/Cancel buttons present

**Assignee:** [Frontend Dev]

---

### Task FE-KRAWL-2: Build Krawl Editor UI

**Description:** Create the main interface for adding Gems to a Krawl, reordering them, and adding creator notes/secrets for each step.

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ Editor UI exists (likely a dedicated page route like `/krawl/{id}/edit`)
- ✅ Displays the current list of Krawl items (Gems)
- ✅ Includes functionality to search/add existing Gems (e.g., via a map overlay or search modal)
- ✅ Allows drag-and-drop reordering of Krawl items to set `step_order`
- ✅ Provides input fields (Textareas) next to each Krawl item for 'Creator Note' and 'Lokal Secret'
- ✅ Includes a 'Save Krawl' button

**Assignee:** [Frontend Dev]

---

### Task FE-KRAWL-3: Implement Save Krawl Logic

**Description:** Implement the frontend logic to handle saving the Krawl details (title, desc) and the ordered list of Krawl items (Gem IDs, order, notes) by calling the relevant backend APIs.

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ Saving triggers API calls to `POST /api/krawls` (for new) or `PUT /api/krawls/{id}` (for update) and `PUT /api/krawls/{krawlId}/items`
- ✅ The payload for `/items` includes the array of `{ gemId, stepOrder, creatorNote, lokalSecret }`
- ✅ Loading state shown during save
- ✅ Success/error handling implemented with user feedback

**Assignee:** [Frontend Dev]

---

### Task FE-KRAWL-4: Build Krawl Detail Page UI

**Description:** Create the frontend page (`/krawl/[krawlId]`) to display the full details of a specific Krawl fetched from the backend.

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ Page exists and fetches data from `/api/krawls/{krawlId}`
- ✅ Displays Krawl Title, Description, Creator Username & Reputation Badge
- ✅ Displays Average Krawl Rating (stars)
- ✅ Includes a Map Overview component showing all Gem pins and the route path
- ✅ Lists all Stops (Krawl Items) in order, showing Gem Name, Creator Note, and Lokal Secret for each
- ✅ Displays "Download Krawl" and "Start Krawl" buttons prominently
- ✅ If the current user is the creator, an "Edit Krawl" button is visible

**Assignee:** [Frontend Dev]

---

### Task BE-KRAWL-1: Implement Create Krawl Endpoint

**Description:** Create the `POST /api/krawls` endpoint to save a new Krawl's basic details (title, description, visibility) associated with the authenticated user.

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ Endpoint exists, requires authentication
- ✅ Accepts `CreateKrawlRequest` DTO (title, description, visibility)
- ✅ Saves a new `KrawlEntity` linked to the `creator_id`
- ✅ Initial `average_rating` and `rating_count` are 0
- ✅ Returns the newly created Krawl's ID and details (201 Created)

**Assignee:** [Backend Dev]

---

### Task BE-KRAWL-2: Implement Add/Update Krawl Items Endpoint

**Description:** Create the `PUT /api/krawls/{krawlId}/items` endpoint to receive the full ordered list of Gems and notes for a Krawl, replacing the existing items.

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ Endpoint exists, requires authentication
- ✅ Verifies the authenticated user is the creator of the Krawl
- ✅ Accepts a list of `KrawlItemRequest` DTOs (`gemId`, `stepOrder`, `creatorNote`, `lokalSecret`)
- ✅ Deletes existing `krawl_items` for the given `krawlId`
- ✅ Inserts the new list of `krawl_items` into the database
- ✅ Handles validation (e.g., unique `stepOrder`, valid `gemId`)
- ✅ Returns success (e.g., 200 OK or 204 No Content)

**Assignee:** [Backend Dev]

---

### Task BE-KRAWL-3: Implement Fetch Krawl Details Endpoint

**Description:** Create the `GET /api/krawls/{krawlId}` endpoint to retrieve all details for a Krawl, including its ordered items with Gem info and creator notes.

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ Endpoint exists, publicly accessible (respects Krawl visibility setting later if needed)
- ✅ Fetches `KrawlEntity` details
- ✅ Fetches associated `krawl_items` ordered by `step_order`
- ✅ For each item, fetches basic `GemEntity` info (name, location)
- ✅ Fetches creator `UserEntity` info (username, tier)
- ✅ Combines data into a `KrawlDetailResponse` DTO
- ✅ Returns 404 if Krawl not found or not public (if visibility enforced)

**Assignee:** [Backend Dev]

---

### Task T-KRAWL-1: Test Krawl Creation & Editing

**Description:** Perform testing (Unit, Integration, E2E) for creating a new Krawl and editing its steps.

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ User can create a Krawl with title/desc
- ✅ User can add Gems to the Krawl
- ✅ User can reorder Gems in the Krawl editor
- ✅ User can add/edit notes and secrets for each step
- ✅ Saving the Krawl correctly persists changes to the backend
- ✅ Only the creator can edit their Krawl

**Assignee:** [QA / Dev]

---

### Task T-KRAWL-2: Test Krawl Detail Display

**Description:** Perform testing (E2E) to ensure the Krawl Detail page accurately renders all information.

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ Correct Krawl title, description, creator info, and rating are shown
- ✅ Map overview displays correct pins and route approximation
- ✅ Stops list is displayed in the correct order (`step_order`)
- ✅ Each stop shows the correct Gem Name, Creator Note, and Lokal Secret
- ✅ Download and Start buttons are visible and functional (triggering respective actions)

**Assignee:** [QA / Dev]

---

## 🔍 Epic 5: Discovery & Exploration (US 4.x)

### Task FE-DISC-1: Implement Universal Search Bar UI/Logic

**Description:** Build the search bar component and implement client-side logic to trigger searches for both Gems and Krawls, displaying mixed results.

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ Search bar component exists in the header/main layout
- ✅ Typing in the bar triggers API calls to relevant backend search endpoints (Gems & Krawls)
- ✅ A dropdown or results list displays both Gem and Krawl results clearly differentiated (e.g., icons, labels)
- ✅ Selecting a result navigates to the appropriate detail view (Gem popup or Krawl page)

**Assignee:** [Frontend Dev]

---

### Task FE-DISC-2: Implement Filter UI

**Description:** Create the UI components (modals, drawers, or sidebars) for users to select filters (tags, rating, status, open now, Krawl length, etc.).

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ A filter button exists near the search bar or map
- ✅ Clicking the button opens a well-structured UI for selecting various filter criteria
- ✅ Filter options are populated dynamically where necessary (e.g., tags from API)
- ✅ User selections are maintained in the UI state
- ✅ Apply/Clear buttons are present

**Assignee:** [Frontend Dev]

---

### Task FE-DISC-3: Apply Filters to Map & Search Results

**Description:** Implement the logic to apply selected filters to both the main map display and search result lists.

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ Clicking "Apply" in the filter UI triggers new API calls or refines existing data with the selected filter parameters
- ✅ Gem markers shown on the map update according to the filters
- ✅ Search results lists update according to the filters
- ✅ Applied filters are visually indicated (e.g., badges near the filter button)
- ✅ Filters can be cleared, reverting the map/lists to the default state

**Assignee:** [Frontend Dev]

---

### Task FE-DISC-4: Build "Discover Krawls" Page UI

**Description:** Create the dedicated page (`/discover`) for browsing Krawls using lists and cards.

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ `/discover` page exists and is accessible via bottom navigation
- ✅ Displays sections for Featured, Nearby, Popular Krawls (initially might be simpler lists)
- ✅ Uses `KrawlCard` or `KrawlListItem` components for display
- ✅ Includes Krawl-specific search and filter options
- ✅ Krawl items link to their respective detail pages (`/krawl/:id`)

**Assignee:** [Frontend Dev]

---

### Task BE-DISC-1: Enhance Fetch Gems Endpoint for Search/Filter

**Description:** Modify the `GET /api/gems` endpoint to accept query parameters for text search (name/description), tags, min rating, status, etc., in addition to map bounds.

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ Endpoint accepts parameters like `?q=lugaw`, `?tags=food,streetfood`, `?minRating=4`, `?status=verified`
- ✅ Backend logic filters Gems based on provided parameters using database queries (including text search, tag joins, and potentially spatial context)
- ✅ Endpoint returns the filtered list of Gems
- ✅ Query parameters are documented in API documentation

**Assignee:** [Backend Dev]

---

### Task BE-DISC-2: Implement Fetch Krawls Endpoint with Search/Filter

**Description:** Create/Modify the `GET /api/krawls` endpoint to accept query parameters for text search (title/description), location context (nearby Gems within), tags (derived from Gems within), creator reputation, etc.

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ Endpoint accepts parameters like `?q=Intramuros`, `?lat=...&lon=...&radius=...`, `?minCreatorTier=KantoGuide`, `?tags=history`
- ✅ Backend logic filters Krawls based on parameters. Nearby requires joining with `krawl_items` and `gems` and using spatial queries. Tag filtering requires joins
- ✅ Endpoint returns the filtered list of Krawls (summary data)
- ✅ Query parameters are documented

**Assignee:** [Backend Dev]

---

### Task T-DISC-1: Test Search Functionality

**Description:** Verify that searching finds relevant Gems and Krawls and that the ranking appears logical.

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ E2E tests confirm searching by name/tag returns expected Gems
- ✅ E2E tests confirm searching by title/keyword returns expected Krawls
- ✅ Mixed results (Gems & Krawls) are displayed correctly in universal search
- ✅ Basic check that results seem relevant to the search term
- ✅ Search respects map bounds/location context where applicable

**Assignee:** [QA / Dev]

---

### Task T-DISC-2: Test Filtering

**Description:** Ensure that applying filters correctly reduces the Gems and Krawls shown on the map and in lists.

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ E2E tests confirm applying Gem filters (tags, rating, etc.) updates the map markers shown
- ✅ E2E tests confirm applying Krawl filters updates the lists on the Discover page
- ✅ E2E tests confirm clearing filters restores the default view
- ✅ Filtering by location context (e.g., "Nearby Krawls") works correctly

**Assignee:** [QA / Dev]

---

## ⭐ Epic 6: Community Interaction & Quality (US 6.x)

### Task FE-QUAL-1: Implement Vouch Button UI & Logic

**Description:** Add a Vouch button to the Gem Detail view and implement the logic to call the backend vouch endpoint on click.

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ Vouch button ([Check Icon] Vouch) is displayed in Gem Detail view for logged-in users
- ✅ Button displays current `vouch_count`
- ✅ Clicking the button sends a POST request to `/api/gems/{gemId}/vouch`
- ✅ Button provides visual feedback on success (e.g., increments count, changes state to 'Vouched')
- ✅ Button is disabled or visually distinct if the user has already vouched
- ✅ Error handling is implemented

**Assignee:** [Frontend Dev]

---

### Task FE-QUAL-2: Implement Rating UI & Logic

**Description:** Add a star rating component and comment field to the Gem Detail view, allowing users to submit ratings via the backend API.

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ Star rating input (1-5 stars) and optional comment textarea exist in Gem Detail view for logged-in users
- ✅ Submit button triggers a POST request to `/api/gems/{gemId}/ratings` with rating and comment
- ✅ Existing rating (if any) by the current user might pre-fill the form
- ✅ Success response updates the Gem's displayed average rating and potentially shows the new comment
- ✅ Error handling is implemented

**Assignee:** [Frontend Dev]

---

### Task FE-QUAL-3: Implement Report Gem UI & Logic

**Description:** Add a Report button/link to the Gem Detail view, opening a modal for selecting a reason and submitting the report via the backend API.

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ Report button ([Flag Icon] Report) exists in Gem Detail view for logged-in users
- ✅ Clicking opens a modal with report reasons (e.g., 'Permanently Closed', 'Wrong Location', 'Spam/Offensive')
- ✅ Submitting the report sends a POST request to `/api/gems/{gemId}/reports` with the selected reason and optional comment
- ✅ Success feedback is shown to the user (e.g., "Report submitted")
- ✅ Error handling is implemented

**Assignee:** [Frontend Dev]

---

### Task FE-QUAL-4: Implement Rate Krawl UI & Logic

**Description:** Implement the prompt that appears upon Krawl completion, allowing users to rate the Krawl (1-5 stars) and provide optional feedback (comment/flags).

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ Rating prompt (modal or dedicated screen) appears after completing the last step in Krawl Mode
- ✅ Includes star rating input, optional comment field, and checkboxes for specific issues (Outdated, Bad Route, Low Quality Gems, Spam)
- ✅ Submitting sends a POST request to `/api/krawls/{krawlId}/ratings`
- ✅ Success feedback is shown
- ✅ Error handling is implemented

**Assignee:** [Frontend Dev]

---

### Task FE-QUAL-5: Display Creator Score/Tier on Profiles

**Description:** Ensure the User Profile page correctly fetches and displays the `creator_score` and `reputation_tier` data from the backend.

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ Profile page (`/profile/[username]`) displays the user's average Krawl rating score
- ✅ Profile page displays the corresponding Reputation Tier Badge (e.g., using icons/colors defined in Design System)
- ✅ Data is fetched from the `/api/users/{username}` endpoint

**Assignee:** [Frontend Dev]

---

### Task FE-QUAL-6: Display Gem Status Badges

**Description:** Implement the display of status badges (Stale, Closed, Community Warning) on Gem Detail views and potentially on map markers/list items based on data fetched from the backend.

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ Gem detail view displays appropriate badges (e.g., "⚠️ Stale - Info might be outdated") based on Gem properties (`last_verified_at`, low `average_rating`, `lifecycleStatus='closed'`)
- ✅ Badges use distinct styling (colors/icons) defined in the Design System
- ✅ Map markers or list items may also show simplified indicators for these statuses

**Assignee:** [Frontend Dev]

---

### Task BE-QUAL-1: Implement Vouch Gem Endpoint

**Description:** Create the `POST /api/gems/{gemId}/vouch` endpoint to handle user vouches, update the count, and potentially trigger the status change to 'verified'.

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ Endpoint exists, requires authentication
- ✅ Checks if the user has already vouched (using `gem_vouches` table). If so, returns an error (e.g., 409 Conflict)
- ✅ If not vouched, inserts a record into `gem_vouches`
- ✅ Increments `vouch_count` on the `gems` table
- ✅ Checks if `vouch_count` meets the threshold (e.g., >= 3). If so, updates `gems.approval_status` potentially (or just relies on count for FE styling)
- ✅ Returns success response (e.g., 200 OK with updated vouch count)

**Assignee:** [Backend Dev]

---

### Task BE-QUAL-2: Implement Rate Gem Endpoint

**Description:** Create the `POST /api/gems/{gemId}/ratings` endpoint to save a user's rating and comment for a Gem, and update the Gem's average rating.

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ Endpoint exists, requires authentication
- ✅ Accepts `RateGemRequest` DTO (rating 1-5, optional comment)
- ✅ Checks if user already rated (unique constraint `gem_id`, `user_id` on `gem_ratings`). If so, updates existing rating, else inserts new
- ✅ Recalculates and updates `gems.average_rating` and `gems.rating_count` based on all ratings for that Gem (can be done via trigger or in service logic)
- ✅ Returns success response (e.g., 200 OK with updated average rating)

**Assignee:** [Backend Dev]

---

### Task BE-QUAL-3: Implement Report Gem Endpoint

**Description:** Create the `POST /api/gems/{gemId}/reports` endpoint to save user reports about Gems and potentially trigger automatic flagging based on report count/type.

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ Endpoint exists, requires authentication
- ✅ Accepts `ReportGemRequest` DTO (`reportType`, optional comment)
- ✅ Saves the report details to the `gem_reports` table
- ✅ Checks if the number of recent, pending reports of a certain type (e.g., 'permanently_closed', 'spam_offensive') exceeds a threshold (e.g., 3)
- ✅ If threshold met, update `gems.lifecycle_status` to 'flagged' or 'closed' as appropriate
- ✅ Returns success response (e.g., 200 OK)

**Assignee:** [Backend Dev]

---

### Task BE-QUAL-4: Implement Rate Krawl Endpoint

**Description:** Create the `POST /api/krawls/{krawlId}/ratings` endpoint to save a user's rating and feedback for a Krawl experience, updating the Krawl's average rating.

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ Endpoint exists, requires authentication
- ✅ Accepts `RateKrawlRequest` DTO (rating 1-5, optional comment, flags)
- ✅ Saves/updates rating in `krawl_ratings` table (unique constraint check)
- ✅ Recalculates and updates `krawls.average_rating` and `krawls.rating_count`
- ✅ Returns success response

**Assignee:** [Backend Dev]

---

### Task BE-QUAL-5: Implement Creator Score Calculation

**Description:** Implement logic (e.g., a scheduled job or database trigger/function) to periodically calculate and update the `creator_score` and `reputation_tier` in the `users` table based on the average ratings of the Krawls they have created.

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ Mechanism exists to update `users.creator_score`
- ✅ Score is calculated as the average of `average_rating` for all `krawls` where `creator_id` matches the user and `rating_count > 0` (or similar logic)
- ✅ `users.reputation_tier` is updated based on defined score thresholds (e.g., 0-2.4 = Newcomer, 2.5-3.4 = Trail Maker, etc.)
- ✅ Updates run periodically or are triggered by Krawl rating changes

**Assignee:** [Backend Dev]

---

### Task BE-QUAL-6: Implement Gem Status Logic

**Description:** Implement backend logic (e.g., scheduled job or within `GET /api/gems` endpoints) to determine and potentially flag Gems as 'Stale' or having a 'Community Warning'.

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ Logic identifies Gems where `last_verified_at` is older than a threshold (e.g., 6 months) to indicate 'Stale'
- ✅ Logic identifies Gems where `average_rating` is below a threshold (e.g., < 2.5) and `rating_count` is sufficient (e.g., > 10) to indicate 'Community Warning'
- ✅ This status information is included in the Gem data returned by API endpoints (either as a specific field or derived)
- ✅ Logic handles Gems reported as 'Closed' by updating `lifecycle_status`

**Assignee:** [Backend Dev]

---

### Task T-QUAL-1: Test Vouching & Rating

**Description:** Perform testing (Unit, Integration, E2E) for vouching and rating Gems/Krawls.

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ Vouching increments count and prevents duplicates
- ✅ Rating a Gem updates its average and count correctly
- ✅ Rating a Krawl updates its average and count correctly
- ✅ Users can only vouch/rate once
- ✅ UI reflects updated counts/averages after action

**Assignee:** [QA / Dev]

---

### Task T-QUAL-2: Test Reporting & Flagging

**Description:** Perform testing (Unit, Integration, E2E) for reporting Gems and the automatic flagging mechanism.

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ User can submit a report with a reason
- ✅ Report is saved in the database
- ✅ Submitting multiple reports (e.g., 3 'spam' reports) automatically changes the Gem's `lifecycle_status` to 'flagged'
- ✅ Flagged Gems are hidden or marked appropriately on the frontend
- ✅ Reports for 'Closed' status correctly update `lifecycle_status`

**Assignee:** [QA / Dev]

---

### Task T-QUAL-3: Test Reputation & Badges

**Description:** Perform testing (Unit, Integration, E2E) to verify creator scores update correctly and status badges appear as expected.

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ Rating multiple Krawls by a creator correctly updates their `creator_score` and `reputation_tier` (after calculation runs)
- ✅ Profile pages display the correct score and tier badge
- ✅ Gem detail views display 'Stale', 'Closed', 'Warning' badges based on backend logic/data
- ✅ Map markers potentially reflect these statuses visually

**Assignee:** [QA / Dev]

---

## 📱 Epic 7: Krawl Mode & Offline (US 5.x, US 8.x)

### Task FE-OFF-1: Implement "Download Krawl" Functionality

**Description:** Implement the logic triggered by the "Download" button on the Krawl Detail page to fetch all necessary data (Krawl details, Gem details, photos) and cache it locally using PWA APIs (Service Worker, Cache API, IndexedDB).

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ Clicking "Download" fetches required data from relevant API endpoints
- ✅ Data (JSON for Krawl/Gems, image files) is stored successfully in browser cache/IndexedDB
- ✅ User receives feedback on download progress and completion/failure
- ✅ Downloaded Krawls are marked as 'downloaded' in the UI (e.g., in My Krawls list)

**Assignee:** [Frontend Dev]

---

### Task FE-OFF-2: Implement Offline Map Tile Caching

**Description:** Configure the Service Worker to intercept requests for map tiles (from Leaflet) for the geographic area covered by downloaded Krawls and cache them for offline use.

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ Service worker correctly intercepts map tile requests
- ✅ Tiles corresponding to the bounding box of downloaded Krawls are stored in the Cache API
- ✅ When offline, Leaflet map successfully loads tiles from the cache for the downloaded areas

**Assignee:** [Frontend Dev]

---

### Task FE-KMODE-1: Build Krawl Mode UI

**Description:** Create the dedicated UI state/view for Krawl Mode, featuring a focused map, clear route line, progress indicator, and exit controls.

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ Entering Krawl Mode displays a map focused on the route to the current stop
- ✅ A header shows progress ("Stop X of Y: Gem Name")
- ✅ An 'Exit Krawl' button is present
- ✅ UI elements unrelated to active navigation are hidden or minimized
- ✅ Styled according to Design System for clarity and focus

**Assignee:** [Frontend Dev]

---

### Task FE-KMODE-2: Implement Krawl Mode Navigation

**Description:** Use the device's Geolocation API to display the user's current location and show the path/direction towards the next stop on the (potentially offline) map.

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ User's live location is displayed as a marker on the map
- ✅ A route line (or direction indicator) points towards the coordinates of the current Krawl stop
- ✅ Map view potentially auto-pans/rotates to follow user orientation/progress (optional)
- ✅ Works correctly using cached map tiles when offline

**Assignee:** [Frontend Dev]

---

### Task FE-KMODE-3: Implement Location Trigger for Stop Details

**Description:** Use the Geolocation API (e.g., watching position) to detect when the user arrives within a certain radius of the current Krawl stop's coordinates and automatically display the Stop Detail Card with cached data.

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ App continuously (or periodically) checks user's proximity to the target Gem coordinates
- ✅ When within the defined arrival radius (e.g., 50 meters), the Stop Detail Card automatically appears/slides up
- ✅ Card displays the correct cached Creator Note, Lokal Secret, and photos for that specific stop

**Assignee:** [Frontend Dev]

---

### Task FE-KMODE-4: Implement Krawl Progression Logic

**Description:** Handle the user action of checking off a stop, advancing to the next stop in the sequence, and managing the Krawl completion state.

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ Clicking the "Check Off & Go to Next Stop" button on the Stop Detail Card hides the card
- ✅ The application updates the target stop to the next Gem in the Krawl's `step_order`
- ✅ Map view updates to show the route to the new target stop
- ✅ Header progress indicator updates ("Stop X+1 of Y...")
- ✅ After the last stop is checked off, a "Krawl Complete" state is triggered, prompting for Krawl rating

**Assignee:** [Frontend Dev]

---

### Task FE-OFF-3: Handle Offline Submission Queuing

**Description:** Implement logic to store actions performed while offline (e.g., rating a Gem/Krawl, vouching) locally and automatically sync/submit them to the backend when connectivity is restored.

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ Actions like Vouch/Rate performed while offline provide immediate UI feedback but store the request data locally (e.g., IndexedDB or localStorage)
- ✅ App detects when network connectivity is restored (e.g., using browser's `navigator.onLine` or Service Worker events)
- ✅ Upon regaining connection, queued requests are automatically sent to the appropriate backend endpoints
- ✅ Successfully synced requests are removed from the queue. Failed syncs are handled gracefully (e.g., retry later)

**Assignee:** [Frontend Dev]

---

### Task T-KMODE-1: Test Krawl Mode Online

**Description:** Perform E2E testing of the Krawl Mode functionality while connected to the internet.

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ User can successfully start a Krawl
- ✅ Navigation directs user to the first stop
- ✅ Arriving at a stop correctly triggers the Stop Detail Card
- ✅ Checking off a stop advances to the next stop and updates navigation
- ✅ Completing the Krawl triggers the rating prompt
- ✅ Exiting Krawl Mode works correctly

**Assignee:** [QA / Dev]

---

### Task T-OFF-1: Test Krawl Download & Offline Mode

**Description:** Perform comprehensive testing (Unit, Integration, E2E) for downloading Krawls and using them offline in Krawl Mode.

**Status:** `To Do`

**Acceptance Criteria:**
- ✅ User can successfully download a Krawl and receives appropriate feedback
- ✅ Downloaded Krawl data (details, Gems, photos) is stored correctly in cache/IndexedDB
- ✅ Map tiles for the Krawl area are cached successfully
- ✅ User can view downloaded Krawls while offline
- ✅ User can start and navigate a Krawl in Krawl Mode while completely offline
- ✅ Offline map tiles load correctly and cover the Krawl route
- ✅ Stop Detail Cards display with correct cached information (notes, secrets, photos)
- ✅ Actions performed offline (ratings, vouches) are queued correctly
- ✅ Queued actions sync successfully when connection is restored
- ✅ User receives appropriate feedback about offline status
- ✅ Edge cases handled (partial downloads, storage limits, failed syncs)

**Assignee:** [QA / Dev]

---

## 📈 Progress Summary

| Epic | Total Tasks | To Do | In Progress | Done |
|------|-------------|-------|-------------|------|
| Epic 1: Project Setup | 10 | 10 | 0 | 0 |
| Epic 2: Auth & Profile | 9 | 9 | 0 | 0 |
| Epic 3: Gem Creation | 16 | 16 | 0 | 0 |
| Epic 4: Krawl Creation | 7 | 7 | 0 | 0 |
| Epic 5: Discovery | 6 | 6 | 0 | 0 |
| Epic 6: Quality & Community | 15 | 15 | 0 | 0 |
| Epic 7: Krawl Mode & Offline | 9 | 9 | 0 | 0 |
| **TOTAL** | **72** | **72** | **0** | **0** |

---

## 🏷️ Task Status Legend

- `To Do` - Task has not been started
- `In Progress` - Task is currently being worked on
- `Done` - Task has been completed and verified

---

## 👥 Role Assignments

- **[Lead Dev / DevOps]** - Infrastructure, CI/CD, Docker setup
- **[Project Lead]** - Documentation, standards, coordination
- **[Backend Dev]** - Spring Boot API development, database
- **[Frontend Dev]** - Next.js UI/UX, PWA features, client logic
- **[QA / Dev]** - Testing, quality assurance

---

## 📝 Notes

- All tasks follow the acceptance criteria defined in the project documentation
- Tasks should be moved to "In Progress" when work begins
- Completed tasks require verification before moving to "Done"
- Dependencies between tasks should be considered when planning sprints
- Regular stand-ups should track progress and blockers

---

## 📝 Changelog

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0.0 | 2025-10-28 | Initial Kanban task board | Project Lead |

---

## 📚 Related Documents

- [Scope of Work](./scope-of-work.md) - Feature specifications and requirements
- [Milestone and Timeline](./milestone-and-timeline.md) - Overall project timeline
- [User Stories](./user-story.md) - Detailed user stories and acceptance criteria
- [Version Control Strategy](./version-control-strategy.md) - Git workflow and task branches
- [Project Setup](./project-setup.md) - Development environment setup

---

*Document maintained by Project Lead • Last reviewed: 2025-10-28*

