# 📝 Krawl PWA - Page Copy Drafts (Initial)

> **Document Purpose**: This document provides initial draft copy for headlines, body text, and calls-to-action (CTAs) for key Krawl PWA screens. These drafts serve as a foundation and should be refined during development and A/B testing.

---

## 🗺️ 1. Home / Main Map View (`/`)

### Header States

#### 🚪 Logged Out State
| Element | Copy |
|---------|------|
| Logo/Title | **Krawl** |
| CTA Button | `Log In / Sign Up` |

#### 👤 Logged In State
| Element | Copy |
|---------|------|
| Logo/Title | **Krawl** |
| User Area | User Avatar (displays profile pic/initials) |

### Interactive Elements

| Element | Copy/Placeholder |
|---------|------------------|
| **Search Bar** | `"Search Gems & Krawls in Cebu City..."` <br/>_Note: Dynamically updates based on location/view_ |
| **Filter Button** | `Filters` |
| **Pin Gem FAB (+)** | Tooltip: `"Pin a New Gem"` <br/>_Shown on hover/long press_ |

### Bottom Navigation

- 🗺️ **Map**
- 🔍 **Discover**
- 📍 **My Krawls**
- 👤 **Profile**

### First-Time User Experience

> **Welcome Tooltip**: _"Welcome to Krawl! Tap the map to explore Gems, or use the '+' to share your own discoveries."_

---

## 💎 2. Gem Detail Popup/Drawer

_Overlay on main map view_

### Header Section

| Element | Copy |
|---------|------|
| **Header** | `[Gem Name]` _(Dynamic)_ |
| **Close Button** | `✕` |

### Subheader Information

```
Rating: [4.5 ★] (Dynamic)
Vouch Count: [25 Vouches] (Dynamic)
Status Badge: [Verified] | [Pending] | [⚠️ Stale] (Dynamic)
```

### Content Sections

| Section Label | Purpose |
|---------------|---------|
| **Description** | Main gem description |
| **Photos** | Photo gallery |
| **Tags** | Category/type tags |
| **Founder** | Creator attribution |
| **Community Ratings** | User reviews & ratings |

### Placeholder States

| State | Placeholder Copy |
|-------|------------------|
| **No Description** | _"No description added yet. Be the first to suggest an edit!"_ |
| **No Photos** | _"No photos yet. Add yours!"_ |
| **No Ratings** | _"Be the first to rate this Gem!"_ |

### Founder Attribution

```
👤 Founded by @[Username]
```

### Action Buttons (Logged In)

- 📸 **Add Photo**
- ⭐ **Rate this Gem**
- 👍 **Vouch**
- 🚩 **Report Issue**

---

## ➕ 3. Add Gem Form

_Modal/Overlay on main map_

### Header

| Element | Copy |
|---------|------|
| **Title** | `Pin a New Gem` |
| **Close** | `✕` |

### Form Fields

| Field | Label | Placeholder | Required |
|-------|-------|-------------|----------|
| Name | `Name*` | `"e.g., Aling Nena's Isaw Stand"` | ✓ |
| Description | `Description` | `"Tell us what makes this place special..."` | ✗ |
| Tags | `Tags` | `"Search or add tags (e.g., street food, budget-friendly, historical)"` | ✗ |

_*Required fields indicated with asterisk_

### Action Buttons

- **Cancel** _(Secondary)_
- **Submit Gem** _(Primary)_

---

## ⚠️ 4. Duplicate Gem Warning

_Modal/Overlay - Conflict Prevention_

### Header

```
⚠️ Hold On! Is This the Same Gem?
```

### Body Copy

> _"The Gem you're adding looks similar to others already pinned nearby. Help keep the map accurate!"_

### Existing Gem Card

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 [Existing Gem Name]
📏 [25 meters away] | 👍 [15 Vouches]
👤 Founded by @FounderName
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[View on Map] [Add My Info to This Gem]
```

### Action Buttons

- **Cancel Pin** _(Secondary)_
- **It's a Different Gem, Pin Anyway** _(Primary)_

---

## 🔍 5. Discover Krawls Page (`/discover`)

### Header

```
🔍 Discover Krawls
```

### Search Bar

**Placeholder**: `"Search Krawls (e.g., Cebu Food Trip, Historical Walk...)"`

### Content Sections

1. ⭐ **Featured Krawls**
2. 📍 **Krawls Near You**
3. 🔥 **Popular This Week**
4. 🗂️ **Browse by Category**

### Empty State

> _"No Krawls found matching your search. Try broadening your criteria or explore a different area!"_

---

## 📍 6. My Krawls Page (`/my-krawls`)

### Header

```
📍 My Krawls
```

### Content Sections

#### Created by Me
**Empty State**: _"You haven't created any Krawls yet. Start exploring and share your journey!"_

#### Saved & Downloaded
**Empty State**: _"Find Krawls in Discover and save them here for later!"_

### Primary Action

```
+ Create New Krawl
```

---

## 🎯 7. Krawl Detail Page (`/krawl/:krawlId`)

### Header Section

| Element | Content |
|---------|---------|
| **Title** | `[Krawl Title]` _(Dynamic)_ |
| **Creator** | `Created by @[Username] [Reputation Badge]` _(Dynamic)_ |
| **Rating** | `Average Rating: [4.2 ★]` _(Dynamic)_ |
| **Description** | `[Krawl Description]` _(Dynamic)_ |

### Content Sections

1. 🗺️ **Map Overview**
2. 📍 **Stops on this Krawl**
3. ⭐ **Rate this Krawl**

### Stop List Item Format

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Stop [Number]: [Gem Name]

✏️ Your Note:
[Creator Note Text]

🤫 Lokal Secret:
[Secret Text]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Action Buttons

| Button | Visibility | Purpose |
|--------|-----------|---------|
| ⬇️ **Download for Offline** | All users | Offline access |
| ▶️ **Start Krawl** | All users | Begin navigation |
| ⭐ **Rate this Krawl** | Logged in | Leave rating |
| ✏️ **Edit Krawl** | Creator only | Modify content |

---

## 🚶 8. Krawl Mode (Active Navigation)

_State/Overlay during active navigation_

### Header

```
Stop [Number] of [Total]: [Current Gem Name]
```

**Exit Button**: `Exit Krawl`

### Navigation Info

```
📍 Next stop: [ETA/Distance] (Dynamic)
```

### Stop Detail Card

_Appears on arrival at each stop_

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 [Gem Name]

✏️ Your Guide's Note:
[Note Text]

🤫 Lokal Secret:
[Secret Text]
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Navigation Buttons

- ✓ **Done! Next Stop** _(For intermediate stops)_
- ✓ **Finish Krawl** _(For final stop)_

---

## 👤 9. User Profile Page (`/profile/:username`)

### Header

```
@[Username]
```

### Profile Information

| Element | Content |
|---------|---------|
| **Avatar** | User profile picture |
| **Bio** | `[User Bio Text]` _(Dynamic, optional)_ |
| **Join Date** | `Joined: [Date]` _(Dynamic)_ |
| **Reputation** | `[Tier Name] [Badge Icon]` _(Dynamic)_ |

### Content Section

**Section Header**: `Krawls by @[Username]`

**Empty State**: _"@[Username] hasn't published any Krawls yet."_

---

## 🔐 10. Auth Pages (`/login`, `/signup`, etc.)

### Page Headlines

| Page | Headline |
|------|----------|
| **Login** | `Welcome Back!` |
| **Sign Up** | `Join Krawl & Discover Lokal Gems` |
| **Password Reset** | `Forgot Your Password?` |

### Body Text

- **Sign Up**: Brief description of Krawl and its benefits
- **Password Reset**: Clear instructions for password recovery process

### Form Fields

Standard authentication fields:
- Email
- Username _(Sign Up only)_
- Password
- Confirm Password _(Sign Up only)_

### Call-to-Action Buttons

| Button | Page | Style |
|--------|------|-------|
| **Log In** | Login | Primary |
| **Sign Up** | Sign Up | Primary |
| **Send Reset Link** | Forgot Password | Primary |
| **Reset Password** | Password Reset | Primary |

### Navigation Links

- `"Need an account? Sign Up"` _(On Login page)_
- `"Already have an account? Log In"` _(On Sign Up page)_

### User Feedback

**Error Messages**: Clear, concise, actionable feedback  
**Success Messages**: Positive confirmation of completed actions

---

## 📊 Next Steps

### Content Refinement Process

1. **Development Phase**
   - Implement initial copy
   - Test with real data
   - Adjust for context and flow

2. **User Testing**
   - Conduct usability testing
   - Gather feedback on clarity
   - Identify pain points

3. **A/B Testing**
   - Test headline variations
   - Optimize CTA button copy
   - Measure engagement metrics

4. **Localization**
   - Consider Filipino/Cebuano phrases
   - Maintain "Lokal" brand voice
   - Test with target demographic

---

## 📝 Changelog

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.0.0 | 2025-10-28 | Initial page copy draft | Content Team |

---

## 📚 Related Documents

- [Content Plan](./content-plan.md) - Content strategy and guidelines
- [Brand Brief](./brand-brief.md) - Brand voice and tone
- [Sitemap](./sitemap.md) - Site structure
- [SEO Plan](./seo-plan.md) - SEO keywords and strategy
- [User Persona Profile](./user-persona-profile.md) - Target audience

---

<div align="center">

**Status**: 📝 Draft - Pending Review

</div>

---

*Document maintained by Content Team • Last reviewed: 2025-10-28*

