# Krawl - Feature List & User Stories

> A comprehensive guide to the core features of the Krawl PWA through user stories and acceptance criteria.

---

## 0. Branding, Onboarding & Core Experience

### User Story 0.1: Understand App Purpose

**As a** new visitor,  
**I want to** quickly understand that Krawl helps discover authentic local spots and guided trails created by the community in the Philippines,  
**So that** I know if the app is relevant to my interests.

#### ✅ Acceptance Criteria:
- [ ] App name ("Krawl") and tagline ("Discover Local Gems & Trails" or similar) are clearly visible
- [ ] Initial map view (even if logged out) showcases local Gems (if available in the area) hinting at the app's function
- [ ] Brief introductory text or tooltips explain the concept of Gems and Krawls

---

### User Story 0.2: Recognize the Brand

**As a** user,  
**I want to** see a consistent and recognizable logo and brand name ("Krawl"),  
**So that** I can easily identify the app and build familiarity.

#### ✅ Acceptance Criteria:
- [ ] The designed Krawl logo is used consistently across the PWA (header, loading screens, etc.)
- [ ] The app name "Krawl" is used in titles and relevant text

---

### User Story 0.3: Experience the Visual Theme

**As a** user,  
**I want to** experience a visually appealing interface using the "Lokal Verde" color scheme (Forest Green, Sandy Beige, Mango Yellow accents),  
**So that** the app feels authentic, trustworthy, and pleasant to use, reflecting a modern Filipino aesthetic.

#### ✅ Acceptance Criteria:
- [ ] UI elements (headers, buttons, backgrounds, icons, charts) consistently use the defined "Lokal Verde" palette
- [ ] Color usage adheres to brand guidelines for primary, secondary, accent, and neutral colors
- [ ] Color combinations meet accessibility contrast standards
- [ ] The overall visual design feels clean, natural, and engaging

---

### User Story 0.4: Access Core Map Interface

**As a** user (logged in or out),  
**I want to** see the main map interface immediately upon opening the app (/),  
**So that** I can start exploring local Gems right away.

#### ✅ Acceptance Criteria:
- [ ] The root URL (/) loads the MapLibre GL JS map view as the primary interface
- [ ] The map displays Gems relevant to the user's current location or default view
- [ ] Map interactions (pan, zoom) are smooth
- [ ] Core navigation elements (Search, Filters, Bottom Nav) are present

---

## 1. Core Authentication & Profile

### User Story 1.1: New User Registration

**As a** new visitor,  
**I want to** create an account using my email and a password,  
**So that** I can contribute content (pin Gems, create Krawls) and access personalized features.

#### ✅ Acceptance Criteria:
- [ ] User provides a unique username, valid email, and password
- [ ] Password meets security requirements
- [ ] Upon success, the user is logged in and sees the full map interface
- [ ] Clear error messages are shown for failures (e.g., email exists)

---

### User Story 1.2: User Login

**As a** registered user,  
**I want to** log in using my email and password,  
**So that** I can access my profile, contributions, saved Krawls, and contribute new content.

#### ✅ Acceptance Criteria:
- [ ] Login form accepts email and password
- [ ] Credentials are validated
- [ ] Upon success, the user is logged in and sees the full map interface
- [ ] Clear error messages for invalid credentials
- [ ] "Forgot Password" option is available

---

### User Story 1.3: View User Profile

**As a** user,  
**I want to** view a user's profile (my own or another's),  
**So that** I can see their contributions, reputation (Creator Score/Tier), and learn more about them.

#### ✅ Acceptance Criteria:
- [ ] Profile displays username, bio, join date
- [ ] Shows Creator Score and Tier Badge
- [ ] Lists Krawls created by the user (with visibility indication if viewing own profile)
- [ ] (Optional) Lists Gems pinned by the user

---

### User Story 1.4: Edit My Profile

**As a** logged-in user,  
**I want to** edit my profile information (like bio, maybe username/password later),  
**So that** I can keep my information up-to-date.

#### ✅ Acceptance Criteria:
- [ ] An "Edit Profile" option is available on the user's own profile page
- [ ] User can update editable fields (e.g., bio)
- [ ] Changes are saved and reflected on the profile

---

## 2. Gem Creation & Management

### User Story 2.1: Pin a New Gem

**As a** logged-in user,  
**I want to** pin a new location (Gem) on the map by selecting a point and adding a name, description, and tags,  
**So that** I can share a place I discovered with the community.

#### ✅ Acceptance Criteria:
- [ ] User can select coordinates via map tap/click (Task FE-1)
- [ ] "Add Gem" form requires Name, allows optional Description and Tags (Task FE-2)
- [ ] System checks for nearby duplicates (Name + Proximity) before saving (Task BE-2)
- [ ] If duplicate found, user sees DuplicateWarning.tsx prompt with options (View, Add to Existing [future], This is Different, Cancel) (Task FE-3, Task 10)
- [ ] If not duplicate (or user chooses "This is Different"), Gem saved with `approvalStatus='pending'`, `lifecycleStatus='open'`, `vouch_count=0` (Task BE-3)
- [ ] New Gem appears immediately on map with 'pending' style (gray dot) (Task FE-4)
- [ ] User recorded as 'Founder'

---

### User Story 2.2: View Gem Details

**As a** user,  
**I want to** tap on a Gem pin,  
**So that** I can see its details (name, photos, rating, description, tags, founder, vouch status, warnings).

#### ✅ Acceptance Criteria:
- [ ] Tapping pin opens detail view
- [ ] Displays all relevant Gem information clearly
- [ ] Shows photos in a gallery/carousel
- [ ] Displays community rating and vouch count prominently
- [ ] Shows status/warning badges (Verified, Pending, Stale, Closed, Community Warning) clearly
- [ ] Actions (Vouch, Rate, Add Photo, Report) are accessible (if logged in)

---

### User Story 2.3: Add Photo to Gem

**As a** logged-in user,  
**I want to** upload a relevant photo to an existing Gem,  
**So that** I can visually enrich the community's information about the place.

#### ✅ Acceptance Criteria:
- [ ] User can select and upload a photo via the Gem detail view
- [ ] Photo is associated with the Gem and appears in its gallery
- [ ] Uploader is recorded

---

## 3. Krawl Creation & Management

### User Story 3.1: Create a New Krawl

**As a** logged-in user,  
**I want to** start creating a new Krawl by giving it a title, description, and setting its visibility,  
**So that** I can begin organizing Gems into a themed trail.

#### ✅ Acceptance Criteria:
- [ ] "Create Krawl" option available (e.g., in /my-krawls)
- [ ] Form requires Title, allows optional Description
- [ ] User can select Visibility ('Public' or 'Friends Only')
- [ ] Empty Krawl is saved, associated with the creator

---

### User Story 3.2: Add/Order Gems in a Krawl

**As a** Krawl creator,  
**I want to** add Gems to my Krawl, arrange them in a specific sequence, and add my personal notes and "Lokal Secrets" for each stop,  
**So that** I can craft a meaningful and helpful guided experience.

#### ✅ Acceptance Criteria:
- [ ] User can search/select existing Gems to add
- [ ] User can reorder Gems via drag-and-drop or similar
- [ ] User can input 'creator_note' and 'lokal_secret' text for each Gem within the Krawl
- [ ] Changes are saved, reflecting the order and notes
- [ ] Cannot add the same Gem twice to one Krawl

---

### User Story 3.3: View Krawl Details

**As a** user,  
**I want to** view the details of a Krawl,  
**So that** I can understand its theme, see the stops with notes, view the route overview, and decide if I want to follow or save it.

#### ✅ Acceptance Criteria:
- [ ] Displays Krawl title, description, creator (@username + tier)
- [ ] Shows Krawl's average community rating
- [ ] Lists Gems sequentially with creator notes/secrets visible
- [ ] Shows an overview map highlighting the Krawl path/stops
- [ ] "Download" and "Start Krawl" buttons are prominent

---

### User Story 3.4: Edit My Krawl

**As a** Krawl creator,  
**I want to** edit my existing Krawls (title, description, stops, notes, visibility),  
**So that** I can update or improve my shared trails.

#### ✅ Acceptance Criteria:
- [ ] Edit option available on Krawls listed in /my-krawls
- [ ] User can modify all editable fields (title, desc, visibility)
- [ ] User can add, remove, reorder Gems and edit notes
- [ ] Changes are saved and reflected in the Krawl detail view

---

### User Story 3.5: Delete My Krawl

**As a** Krawl creator,  
**I want to** delete a Krawl I created,  
**So that** I can remove content I no longer wish to share.

#### ✅ Acceptance Criteria:
- [ ] Delete option available on Krawls listed in /my-krawls
- [ ] Confirmation prompt is shown before deletion
- [ ] Upon confirmation, the Krawl and its associated items (krawl_items) are removed

---

## 4. Discovery & Exploration

### User Story 4.1: Search for Gems & Krawls

**As a** user,  
**I want to** use a single search bar to find both Gems and Krawls relevant to my query (name, tag, theme) and location,  
**So that** I can easily find specific places or guided experiences.

#### ✅ Acceptance Criteria:
- [ ] Search bar accepts text input
- [ ] Results include both matching Gems and Krawls, visually distinguished
- [ ] Results are relevant to the current map view or specified location
- [ ] Default sorting uses a weighted "Best Match" algorithm (Gem Score/Krawl Rating, Freshness)

---

### User Story 4.2: Filter Gems & Krawls

**As a** user,  
**I want to** filter Gems and Krawls shown on the map or in lists based on criteria (tags, rating, status, Krawl length, etc.),  
**So that** I can narrow down discoveries to match my specific interests or needs.

#### ✅ Acceptance Criteria:
- [ ] Filter options are accessible from the Map and Discover views
- [ ] User can apply filters like category tags, minimum rating, "Open Now" (future), Gem status, Krawl duration, etc.
- [ ] Map and lists update instantly to reflect active filters
- [ ] Filters can be easily cleared

---

### User Story 4.3: Browse Krawls

**As a** user,  
**I want to** browse curated lists of Krawls (e.g., Featured, Nearby, Popular by Category) in a dedicated section,  
**So that** I can discover interesting trails without a specific search term.

#### ✅ Acceptance Criteria:
- [ ] /discover tab exists in the bottom navigation
- [ ] Displays Krawls organized into logical sections (Featured, Nearby, etc.)
- [ ] Krawls are presented attractively (e.g., using cards with images/summaries)
- [ ] Tapping a Krawl leads to its detail view

---

## 5. Krawl Mode (Core Experience)

### User Story 5.1: Start and Navigate a Krawl

**As a** user,  
**I want to** tap "Start Krawl" to enter a focused navigation mode,  
**So that** I can be guided step-by-step along the trail.

#### ✅ Acceptance Criteria:
- [ ] App enters Krawl Mode
- [ ] Map displays route to the first stop
- [ ] User's location is shown
- [ ] Basic distance/ETA to the next stop is displayed
- [ ] UI is minimal to focus on navigation

---

### User Story 5.2: View Stop Details upon Arrival

**As a** user in Krawl Mode,  
**When I** arrive near a stop,  
**I want to** automatically see the creator's notes, Lokal Secret, and photos for that stop,  
**So that** I get timely, contextual insider information.

#### ✅ Acceptance Criteria:
- [ ] Proximity to stop coordinates triggers the Stop Detail Card
- [ ] Card displays relevant Krawl Item notes (creator_note, lokal_secret) and Gem photos
- [ ] Card includes button to progress to the next stop

---

### User Story 5.3: Progress Through Krawl

**As a** user in Krawl Mode,  
**I want to** easily mark a stop as visited and get navigation to the next one,  
**So that** I can seamlessly follow the entire Krawl sequence.

#### ✅ Acceptance Criteria:
- [ ] "Check Off & Go to Next Stop" button marks current stop visually
- [ ] Navigation updates to route towards the next stop in the sequence
- [ ] Progress indicator (e.g., "Stop X of Y") is updated
- [ ] Final stop triggers a "Krawl Complete" state

---

### User Story 5.4: Exit Krawl Mode

**As a** user in Krawl Mode,  
**I want to** be able to exit the guided experience at any time,  
**So that** I can return to general map browsing if needed.

#### ✅ Acceptance Criteria:
- [ ] An "Exit Krawl" button is clearly visible in Krawl Mode
- [ ] Tapping it confirms exit and returns the user to the standard map view (/)
- [ ] Krawl progress might be optionally saved

---

## 6. Community Interaction & Quality Control

### User Story 6.1: Vouch for a Gem

**As a** logged-in user,  
**I want to** "Vouch" for a Gem I know is accurate and valuable,  
**So that** I can contribute to community verification and help good spots become 'verified'.

#### ✅ Acceptance Criteria:
- [ ] Vouch button present on Gem details
- [ ] Tapping increments vouch_count and records vouch in gem_vouches
- [ ] User can only vouch once per Gem
- [ ] Reaching vouch threshold (e.g., 3) automatically changes Gem lifecycleStatus to 'verified' (Backend logic)
- [ ] Verified Gems display with a distinct style (e.g., Primary Green marker)

---

### User Story 6.2: Rate a Gem

**As a** logged-in user,  
**I want to** give a Gem a star rating (1-5) and optionally add a comment,  
**So that** I can share my opinion on its quality with the community.

#### ✅ Acceptance Criteria:
- [ ] Rating input (stars) available on Gem details
- [ ] User can select 1-5 stars
- [ ] Optional comment field available
- [ ] Rating is saved in gem_ratings
- [ ] Gem's average_rating and rating_count are updated (Backend logic)
- [ ] User can only rate a Gem once (editing might be allowed)

---

### User Story 6.3: Report an Issue with a Gem ("Vibe Check" - Negative)

**As a** logged-in user,  
**I want to** report an issue with a Gem (e.g., Permanently Closed, Wrong Location, Spam/Offensive),  
**So that** I can help maintain the accuracy and safety of the map data.

#### ✅ Acceptance Criteria:
- [ ] "Report Issue" option available on Gem details
- [ ] User can select a predefined reason (Closed, Wrong Location, Spam, etc.)
- [ ] Optional comment field
- [ ] Report is saved in gem_reports
- [ ] Reaching report threshold (e.g., 3 'Closed' reports) automatically changes Gem lifecycleStatus to 'closed' (Backend logic)
- [ ] Reaching flag threshold (e.g., 3 'Spam' reports) changes Gem lifecycleStatus to 'flagged' (Backend logic)
- [ ] Closed/Flagged Gems are hidden or clearly marked on the map

---

### User Story 6.4: Confirm Gem Freshness ("Vibe Check" - Positive)

**As a** logged-in user visiting a Gem,  
**I want to** quickly confirm that the Gem is still open and relevant ("Still a Gem!"),  
**So that** I can update its freshness data for other users.

#### ✅ Acceptance Criteria:
- [ ] Simple confirmation button ("Still a Gem!", "Vibe Check OK") available on Gem details (perhaps prompted by proximity)
- [ ] Tapping updates the Gem's last_verified_at timestamp
- [ ] Gems not verified recently receive a "STALE" badge (Backend logic / Frontend display)

---

### User Story 6.5: Rate a Krawl

**As a** user who has completed or used a Krawl,  
**I want to** rate the Krawl experience (1-5 stars) and provide specific feedback (e.g., outdated stops, bad route),  
**So that** I can inform other users about the Krawl's quality and help improve the creator's reputation.

#### ✅ Acceptance Criteria:
- [ ] Rating prompt appears after completing/exiting a Krawl
- [ ] User selects 1-5 stars
- [ ] If low rating, optional checkboxes for specific issues appear
- [ ] Rating saved in krawl_ratings
- [ ] Krawl's average_rating and rating_count are updated
- [ ] Creator's creator_score is recalculated based on their Krawls' average ratings (Backend logic)

---

### User Story 6.6: See Creator Reputation

**As a** user,  
**I want to** see the reputation tier (e.g., Kanto Guide badge) of Krawl creators,  
**So that** I can gauge the trustworthiness and quality of their Krawls.

#### ✅ Acceptance Criteria:
- [ ] Creator username and tier badge are displayed on Krawl detail pages and User Profile pages
- [ ] Tiers are calculated based on the creator_score

---

### User Story 6.7: Experience Algorithmic Consequences (Implicit)

**As a** user,  
**I want the** app to automatically surface high-quality Krawls and Gems and deprioritize low-quality or outdated ones,  
**So that** my discovery experience is relevant and trustworthy.

#### ✅ Acceptance Criteria:
- [ ] Search results and discovery feeds prioritize Krawls/Gems with good ratings, high vouch counts, and recent verifications
- [ ] Krawls with low average ratings receive warning badges and are ranked lower
- [ ] Krawls by creators with low reputation scores are less likely to be recommended initially ("sandbox")
- [ ] Gems reported as closed/flagged are hidden. Stale gems are marked

---

## 7. Business Features (Freemium)

### User Story 7.1: Discover Claim Option

**As a** local business owner,  
**I want to** easily find an option to "Claim this Gem" if my business is listed on Krawl,  
**So that** I can learn about managing my business's presence.

#### ✅ Acceptance Criteria:
- [ ] A clear CTA ("Is this your business? Claim Gem") is visible on unclaimed Gem detail pages

---

### User Story 7.2: Understand Claim Benefits

**As a** local business owner,  
**I want to** understand the benefits of claiming my Gem (verified info, updates, analytics) and the associated cost,  
**So that** I can decide if the subscription is worthwhile.

#### ✅ Acceptance Criteria:
- [ ] Tapping "Claim Gem" leads to a clear explanation of premium features and pricing

---

### User Story 7.3: Claim My Gem

**As a** logged-in business owner,  
**I want to** go through a simple verification process to claim my Gem listing,  
**So that** I can gain access to the business management features.

#### ✅ Acceptance Criteria:
- [ ] A defined verification workflow exists (details TBD - could involve phone, email, or simple checks)
- [ ] Upon successful verification (and payment processing if applicable), the Gem is marked as 'Claimed'/'Verified by Owner'

---

### User Story 7.4: Manage Official Gem Info

**As a** verified business owner,  
**I want to** access a simple dashboard to update my official business hours, contact info, and menu,  
**So that** Krawl users see accurate and up-to-date information.

#### ✅ Acceptance Criteria:
- [ ] A dedicated, easy-to-use dashboard is accessible for claimed Gems
- [ ] Owner can edit predefined fields (hours, phone, website, menu URL/upload)
- [ ] Changes are reflected on the Gem detail page, marked as 'Verified'

---

### User Story 7.5: Post Lokal Updates

**As a** verified business owner,  
**I want to** post short, timely updates (specials, events, temporary closures) to my Gem page,  
**So that** I can communicate relevant news directly to interested Krawl users.

#### ✅ Acceptance Criteria:
- [ ] "Lokal Updates" section available in the business dashboard
- [ ] Simple interface to post text updates (maybe optional photo)
- [ ] Updates appear in a dedicated section on the Gem detail page, ordered chronologically

---

### User Story 7.6: View Basic Analytics

**As a** verified business owner,  
**I want to** see simple analytics about my Gem's performance on Krawl (e.g., views, Krawl inclusions),  
**So that** I understand the value Krawl is bringing to my business.

#### ✅ Acceptance Criteria:
- [ ] Basic analytics (view counts, Krawl inclusion count) are displayed in the dashboard

---

## 8. Offline Functionality

### User Story 8.1: Download Krawl for Offline Use

**As a** user (logged in),  
**I want to** download a specific Krawl, including its map tiles, Gem info, and creator notes,  
**So that** I can follow the Krawl reliably even without an internet connection.

#### ✅ Acceptance Criteria:
- [ ] "Download Krawl" button is present on Krawl detail page
- [ ] Tapping initiates download of required data (Krawl steps/notes/photos, Gem basics, map tiles for the route area)
- [ ] Clear progress indication and success/failure message
- [ ] Downloaded status is indicated on the Krawl listing (e.g., in /my-krawls)

---

### User Story 8.2: Access Downloaded Krawls

**As a** user,  
**I want to** easily find and access my downloaded Krawls, even when offline,  
**So that** I can start an offline Krawl Mode session.

#### ✅ Acceptance Criteria:
- [ ] /my-krawls tab shows downloaded Krawls clearly
- [ ] This section is accessible and functional even when the device is offline
- [ ] User can tap a downloaded Krawl to view its details (using cached data)

---

### User Story 8.3: Use Krawl Mode Offline

**As a** user following a downloaded Krawl without internet,  
**I want** Krawl Mode to function using my device's GPS and the cached data, including map display and stop details,  
**So that** I can complete the guided experience without interruption.

#### ✅ Acceptance Criteria:
- [ ] "Start Krawl" button works for downloaded Krawls when offline
- [ ] Krawl Mode displays the map using cached tiles
- [ ] GPS location is shown on the cached map
- [ ] Navigation cues (point-to-point) work based on GPS and cached route
- [ ] Arriving at stops triggers the display of cached creator notes and photos
- [ ] User can progress through stops

---

### User Story 8.4: Cache Offline Actions

**As a** user performing actions offline (e.g., rating a Krawl, attempting a Vibe Check),  
**I want the** app to save my input and automatically sync it when I regain connectivity,  
**So that** my contributions aren't lost due to temporary lack of internet.

#### ✅ Acceptance Criteria:
- [ ] Actions like rating, vouching, reporting performed offline are queued locally
- [ ] App provides feedback that the action is queued for sync
- [ ] Upon regaining internet connection, the app automatically submits queued actions to the backend

---

## Summary

This document contains **47 user stories** across **9 feature categories**, providing a comprehensive roadmap for the Krawl PWA development.

### Feature Categories:
1. **Branding & Core Experience** - 4 stories
2. **Authentication & Profile** - 4 stories
3. **Gem Management** - 3 stories
4. **Krawl Management** - 5 stories
5. **Discovery & Exploration** - 3 stories
6. **Krawl Mode** - 4 stories
7. **Community Interaction** - 7 stories
8. **Business Features** - 6 stories
9. **Offline Functionality** - 4 stories

---

## 📝 Changelog

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0.0 | 2025-10-28 | Initial user stories | Product Team |

---

## 📚 Related Documents

- [User Persona Profile](./user-persona-profile.md) - Target user profiles
- [User Journey](./user-journey.md) - User journey maps
- [Scope of Work](./planning/scope-of-work.md) - Feature scope and deliverables
- [Kanban Task](./kanban-task.md) - Task breakdown from user stories
- [Testing Plan](./testing-plan.md) - Testing based on user stories

---

*Document maintained by Product Team • Last reviewed: 2025-10-28*

