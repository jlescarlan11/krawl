# 🗺️ Krawl - User Journey Maps

> *These maps illustrate typical paths users might take through the Krawl PWA to achieve their goals, based on the defined personas.*

---

## 👩‍🎓 Persona 1: Bea Santos (The Lokal Explorer)

**Scenario:** Bea hears about a new lechon place rumored to be opening near her university and wants to find it, potentially add it if it's not there, and maybe find a Krawl incorporating it for a weekend food trip with friends.

| # | Action | Touchpoint(s) | Thoughts/Feelings | Opportunities |
|---|--------|---------------|-------------------|---------------|
| **1** | **Initial Discovery**<br>Opens Krawl PWA to check her neighborhood map. | `/` (Main Map View) | *"Wonder if that new lechon spot is already pinned?"* | Ensure fast map loading & clear display of nearby Gems. |
| **2** | **Search**<br>Uses the search bar, types "lechon near USC." | Search Bar (on `/`) | *"Hope it finds specific stalls, not just big restaurants."* | Prioritize relevant Gems/Krawls in search results; filter out noise. |
| **3** | **Exploration**<br>Scans search results (Gems & Krawls); doesn't see the new spot. Zooms map. | Search Results List; Map View (`/`) | *"Hmm, not there yet. Maybe I can add it?"*<br>*"Ooh, this 'Cebu Street Eats' Krawl looks interesting though."* | Clear distinction between Gems/Krawls in results. Easy map panning/zooming. |
| **4** | **Pin Attempt**<br>Taps the "+" FAB, then taps the estimated location on the map. | FAB button; Map Interaction (`/`) | *"Okay, let's pin this!"* | Make pinning interaction intuitive. |
| **5** | **Add Gem Details**<br>Fills in the "Add Gem" form (Name: "Lechon ni Tatay", Desc, Tags: "food", "lechon"). | Add Gem Form (Modal) | *"Need to add good tags so others can find it."* | Provide relevant tag suggestions; keep form simple. |
| **6** | **Duplicate Check**<br>Submits form. System might show a nearby, older lechon spot. | Add Gem Form → (Potentially) Duplicate Warning | *"Oh, is this the same place? Let me check..."* (If duplicate)<br>*"Cool, it's new!"* (If not) | Clear duplicate warning UI with map preview and vouch counts for comparison. |
| **7** | **Gem Added**<br>(Assuming not duplicate) Sees success message & her new gray 'pending' pin. | Toast Notification; Map View (`/`) | *"Yes! First to pin it. Hope my friends vouch soon."* | Immediate visual feedback on map; clear 'pending' status. |
| **8** | **Krawl Discovery**<br>Goes to the 'Discover' tab, filters by "Food" and "Cebu City." | Bottom Navigation → `/discover` | *"Now, about that weekend food trip..."* | Robust filtering options for Krawls. |
| **9** | **Find & Save Krawl**<br>Finds the "Cebu Street Eats" Krawl, views details, saves/downloads it. | `/discover` → `/krawl/:id` → Save/Download Btn | *"This looks perfect! Downloaded for offline just in case signal is bad."* | Clear Krawl details, prominent Download button, confirmation of offline save. |
| **10** | **Share (Optional)**<br>Shares the Krawl link with her friends via a messaging app. | Share Button (on `/krawl/:id`) | *"Guys, check this out for Saturday!"* | Easy sharing functionality. |

---

## 🧳 Persona 2: Mike Chen (The Curious Traveler)

**Scenario:** Mike has just arrived in Cebu and wants to find an authentic, safe, and interesting Krawl for dinner tonight, preferably focused on local seafood, and needs it to work offline.

| # | Action | Touchpoint(s) | Thoughts/Feelings | Opportunities |
|---|--------|---------------|-------------------|---------------|
| **1** | **App Launch (New City)**<br>Opens Krawl PWA in Cebu. | `/` (Main Map View - Centered on Cebu) | *"Okay, let's see what the locals recommend here."* | Fast loading, accurate location detection. |
| **2** | **Krawl Discovery**<br>Taps 'Discover' tab. | Bottom Navigation → `/discover` | *"Need to find something for dinner... seafood sounds good."* | Clear navigation, intuitive Discover layout. |
| **3** | **Filtering**<br>Filters Krawls by Category: "Food", Tag: "Seafood", Location: "Cebu City". Might add "Tourist-Friendly" or filter by high Creator Rating. | Filter controls (on `/discover`) | *"Want something authentic but maybe not too intimidating for my first night. Let's see highly-rated ones."* | Granular and easy-to-use filters. Clear display of Creator Tiers. |
| **4** | **Review Krawl**<br>Selects "Cebu Seafood Fiesta Krawl" by a "Kanto Guide". Reads description, checks stops, notes, and average rating. | `/discover` → `/krawl/:id` | *"This looks promising! Good reviews, notes mention English spoken. Stops look interesting."* | Comprehensive Krawl details: clear stops, helpful notes, visible ratings. |
| **5** | **Download for Offline**<br>Taps "Download Krawl for Offline Use." Waits for confirmation. | Download Button (on `/krawl/:id`) | *"Essential step, connection here is spotty. Hope it doesn't take too long."* | Clear download progress indicator and success confirmation. Optimize download size. |
| **6** | **Start Krawl**<br>Heads out later, opens the saved Krawl from "My Krawls" tab, taps "Start Krawl". | Bottom Navigation → `/my-krawls` → `/krawl/:id` → Start Btn | *"Alright, adventure time!"* | Easy access to saved/downloaded Krawls. |
| **7** | **Follow Stop 1**<br>Follows navigation route on the map (works offline). | Krawl Mode (Map Overlay) | *"Okay, seems straightforward..."* | Reliable offline map rendering and GPS tracking. Clear route indication. |
| **8** | **Arrive at Stop 1**<br>Arrives near Gem 1. App automatically shows the Stop Detail Card. | Krawl Mode (Stop Detail Card) | *"Ah, here's the info! 'Order the grilled squid, cash only.' Perfect!"* | Accurate GPS triggering, clear display of crucial notes/secrets. |
| **9** | **Complete Stop 1**<br>Enjoys the food, taps "Check Off & Go to Next Stop." | Krawl Mode (Stop Detail Card Button) | *"That was amazing! On to the next one."* | Simple interaction to progress. |
| **10** | **Continue Krawl**<br>Repeats steps 7-9 for remaining stops, relying on downloaded data. | Krawl Mode | *(Feeling confident and immersed)* | Smooth transitions between navigation and stop details. |
| **11** | **Finish & Rate**<br>Completes Krawl, gets prompted to rate the Krawl experience. Submits rating. | Krawl Mode → Rate Krawl Prompt | *"Excellent Krawl! Definitely 5 stars. So much better than just wandering."* | Simple rating prompt upon completion. Cache rating if offline for later upload. |

---

## 🍲 Persona 3: Aling Nena Reyes (The Lokal Biz Owner)

**Scenario:** Aling Nena hears from a customer (Bea) that her carinderia is on Krawl and wants to make sure the information is correct and maybe share her daily specials.

| # | Action | Touchpoint(s) | Thoughts/Feelings | Opportunities |
|---|--------|---------------|-------------------|---------------|
| **1** | **Awareness**<br>Customer mentions Krawl. Aling Nena searches for her eatery on the Krawl PWA. | `/` (Main Map View) → Search Bar | *"Krawl? What's that? Oh, there's my place! But the hours are wrong..."* | Ensure Gems are searchable. |
| **2** | **See "Claim"**<br>Views her Gem's detail page, sees a "Is this your business? Claim this Gem" button. | Gem Detail Popup/Drawer | *"Claim? Maybe I can fix the hours."* | Make the "Claim Gem" CTA visible and clear. |
| **3** | **Learn About Claim**<br>Taps button, reads a simple explanation of the benefits (verified info, updates). | Claim Information Page/Modal | *"Okay, update hours, post specials... 500 pesos/month? Seems reasonable if it works."* | Clearly explain benefits and pricing in simple terms. |
| **4** | **Sign Up/Login**<br>Decides to claim, registers for a Krawl user account (or logs in if existing). | `/signup` or `/login` | *(Standard registration/login flow)* | Simple and quick authentication process. |
| **5** | **Claim Process**<br>Goes through a simple verification process (maybe phone call, email, or simple check). | Claim Verification Steps (Could be partly offline) | *"Hope this isn't too complicated."* | Streamlined verification process suitable for less tech-savvy users. |
| **6** | **Access Dashboard**<br>Once verified, accesses a simple "My Gem Dashboard". | Business Dashboard (Simplified UI) | *"Okay, where do I change the hours?"* | Intuitive dashboard design focusing on key actions (Edit Info, Post Update). |
| **7** | **Update Info**<br>Easily finds and updates her official opening hours and adds contact number. | Edit Gem Info Form (within Dashboard) | *"There, much better. Now people know we close at 8 PM."* | Simple forms, clear save buttons, immediate feedback on update success. |
| **8** | **Post Update**<br>Uses the "Lokal Update" feature to post "Today's Special: Adobong Pusit!" | Post Update Form (within Dashboard) | *"Easy enough. Hope people see it!"* | Simple text input for updates, maybe optional photo upload. |
| **9** | **Check Analytics**<br>Later, checks basic analytics to see how many people viewed her Gem today. | Analytics Dashboard (Simple view) | *"Wow, 45 views today! This Krawl thing is helping!"* | Simple, easy-to-understand metrics focused on visibility and engagement. |

---

## 🔑 Key Insights Across All Journeys

### 🎯 Critical Success Factors

1. **Speed & Performance** - Fast loading times and responsive interactions are essential for all personas
2. **Offline Functionality** - Must work reliably without internet connection (especially for travelers)
3. **Intuitive Navigation** - Clear, simple UI that works for all tech-savvy levels
4. **Trust & Verification** - Clear indicators of reliable information (vouches, verified businesses, creator tiers)
5. **Community Engagement** - Easy ways to contribute, share, and connect

### 💡 Design Priorities

- **Mobile-First** - All interactions optimized for touch and one-handed use
- **Visual Feedback** - Immediate confirmation of all actions
- **Contextual Help** - Information available when and where users need it
- **Accessibility** - Simple language, clear icons, readable text sizes
- **Progressive Disclosure** - Advanced features available but not overwhelming

---

*Last Updated: October 2025*

