# Pin Your First Gem

> **Purpose:** Learn how to use the Krawl PWA to discover and pin your first Gem on the map.

**Time Required:** 15-20 minutes  
**Difficulty:** Beginner  
**Prerequisites:** [Getting Started tutorial](./getting-started.md) completed

---

## What You'll Learn

By the end of this tutorial, you will:
- ✅ Navigate the Krawl map interface
- ✅ Find and explore existing Gems
- ✅ Pin a new Gem at a location
- ✅ Add photos and tags to your Gem
- ✅ Handle duplicate Gem warnings
- ✅ Vouch for other users' Gems

---

## Before You Begin

### What You Need

- ✅ Krawl development environment running ([Setup Guide](./getting-started.md))
- ✅ A registered user account
- ✅ Frontend PWA open at `http://localhost:3000`

### Story: The Gem You'll Create

Imagine you just discovered an amazing local isaw vendor near your office. Let's share this hidden gem with the Krawl community!

**Location:** Aling Nena's Isaw Stand  
**Address:** Corner of Katipunan Ave & Aurora Blvd, Quezon City  
**Coordinates:** 14.6330° N, 121.0798° E

---

## Step 1: Open Krawl and Log In

### Launch the App

1. Open your browser to `http://localhost:3000`
2. You'll see the **main map view** with a few Gems (if any exist)

### Log In

1. Click the **"Login"** button in the top-right corner
2. Enter your credentials:
   - **Email:** `test@example.com`
   - **Password:** `Test1234`
3. Click **"Sign In"**

**What happens:** You're redirected back to the map. Notice:
- Your avatar appears in the top-right (replacing the Login button)
- The **FAB (+) button** at the bottom-right is now **enabled** (bright green)
- Bottom navigation tabs are all active

✅ **Checkpoint:** You're logged in and ready to pin!

---

## Step 2: Explore the Map Interface

### Navigate the Map

**Try these interactions:**

- **Pan:** Click and drag the map
- **Zoom:** Use mouse wheel, pinch gesture, or +/- buttons
- **Center:** Click the "📍 Center" button to return to your location

### Find Existing Gems

1. **Zoom in** to the Metro Manila area
2. Look for **green map markers** 📍
3. **Click a Gem marker** to open its detail drawer

**What you'll see in the Gem detail drawer:**
- Gem name and description
- Star rating and vouch count
- Photos (if uploaded)
- Tags (e.g., "food", "hidden gem")
- Founder username
- Action buttons (Vouch, Rate, Report)

### Try Vouching for a Gem

1. With a Gem detail drawer open, click **"👍 Vouch"**
2. The vouch count increases by 1
3. The button changes to **"✓ Vouched"** (already vouched)

**Note:** You can only vouch once per Gem. Click again to remove your vouch.

✅ **Checkpoint:** You understand the map interface!

---

## Step 3: Navigate to Your Location

Now let's find the location where you'll pin your Gem.

### Option A: Use Search (Recommended)

1. Click the **search bar** at the top
2. Type: `"Katipunan Avenue, Quezon City"`
3. Select the location from search results
4. The map automatically pans and zooms to that area

### Option B: Manual Navigation

1. **Pan** the map to Quezon City
2. **Zoom in** until you can see street-level detail
3. Look for the intersection of Katipunan Ave and Aurora Blvd

### Option C: Use Coordinates

1. Right-click the map (or long-press on mobile)
2. Select **"Jump to Coordinates"**
3. Enter:
   - **Latitude:** `14.6330`
   - **Longitude:** `121.0798`
4. Click **"Go"**

✅ **Checkpoint:** You're at the right location!

---

## Step 4: Pin Your Gem

### Open the Add Gem Form

1. Click the **FAB (+) button** at the bottom-right
2. The **"Add New Gem"** modal slides up

**Alternative method:**
- Long-press (or right-click) directly on the map
- Select **"Pin Gem Here"**

### Fill in the Details

**Name** (Required):
```
Aling Nena's Isaw Stand
```

**Description** (Optional but recommended):
```
Best isaw in the neighborhood! Fresh, perfectly grilled, and served with spicy vinegar. Open daily from 5 PM to midnight. Cash only.
```

**Location:**
- The map thumbnail shows your selected spot with a pin 📍
- Coordinates are auto-filled (14.6330, 121.0798)
- Adjust by dragging the pin if needed

**Tags** (Select up to 10):
- Click **"Food & Drinks"**
- Click **"Street Food"**
- Click **"Budget-Friendly"**
- Click **"Local Favorite"**

### Add a Photo (Optional)

1. Click **"📷 Add Photo"**
2. Choose a photo from your computer/phone
3. Add a caption: `"Fresh isaw ready to grill"`
4. Mark as **"Featured"** (this becomes the main photo)

**Tip:** Use clear, well-lit photos showing the location or food. Avoid blurry or dark images.

✅ **Checkpoint:** Form is complete!

---

## Step 5: Handle Duplicate Detection

When you click **"Submit"**, Krawl checks for nearby duplicates.

### Scenario A: No Duplicates Found

**What happens:**
- Your Gem is created instantly
- Success message: **"Gem pinned successfully! 🎉"**
- The modal closes
- Your new Gem marker appears on the map

**You're done!** Skip to [Step 6](#step-6-view-your-gem).

### Scenario B: Duplicate Warning

**What happens:**
- A warning modal appears: **"⚠️ Potential Duplicate Found"**
- You see existing Gems within 50 meters:

```
┌───────────────────────────────────────┐
│ Aling Nena's Isaw                     │
│ 25m away • 15 Vouches • @pedro_kalye  │
│ [View on Map] [Add to This Gem]       │
└───────────────────────────────────────┘
```

**Your options:**

**Option 1: This is the Same Place**
- Click **"Add to This Gem"**
- You'll be redirected to the existing Gem
- Add your photo or vouch for it instead

**Option 2: This is a Different Place**
- Click **"This is Different"** at the bottom
- Provide a brief reason: `"Different vendor, located on the other corner"`
- Your Gem will be created as a separate entry

**Why this matters:** Prevents map clutter and consolidates community knowledge about the same location.

✅ **Checkpoint:** Duplicate handled correctly!

---

## Step 6: View Your Gem

### Find Your New Gem

1. The map automatically centers on your Gem
2. You'll see a **green marker 📍** with a "new" badge
3. Click the marker to open the detail drawer

### What You'll See

```
╔═══════════════════════════════════════════╗
║ Aling Nena's Isaw Stand          [Close X]║
║ ⭐⭐⭐⭐⭐ 0.0 • 0 Vouches • Open       ║
╠═══════════════════════════════════════════╣
║                                           ║
║  [Your featured photo]                    ║
║                                           ║
╠═══════════════════════════════════════════╣
║ Description:                              ║
║ Best isaw in the neighborhood! Fresh,     ║
║ perfectly grilled, and served with...     ║
╠═══════════════════════════════════════════╣
║ Tags: 🍔 Food & Drinks  🛒 Budget-Friendly║
║       🌟 Local Favorite                   ║
╠═══════════════════════════════════════════╣
║ Founded by: @testuser (You)               ║
║ Pinned: Just now                          ║
╠═══════════════════════════════════════════╣
║ [Add Photo] [Edit] [Delete]               ║
╚═══════════════════════════════════════════╝
```

**Notice:**
- **Approval Status:** "Pending" (shown as orange badge)
- **Lifecycle Status:** "Open" (default for new Gems)
- **Founder:** Your username
- **Special buttons:** Since you created this, you can Edit or Delete

✅ **Checkpoint:** Your Gem is live on the map!

---

## Step 7: Share Your Gem

### Get the Share Link

1. In the Gem detail drawer, click **"Share"** icon
2. Choose **"Copy Link"**
3. Share the link: `http://localhost:3000/gems/550e8400-e29b...`

### Share on Social Media (Future Feature)

Once deployed, you'll be able to:
- Share directly to Facebook, Twitter, Instagram
- Generate a beautiful preview card
- Track how many people discovered your Gem

---

## Step 8: Interact with Other Gems

Now that you've created a Gem, explore the community!

### Vouch for Quality Gems

1. Find a Gem you've personally visited
2. Click **"👍 Vouch"**
3. Your vouch increases the Gem's credibility

**Vouching means:** "I've been here, and it's legit!"

### Rate a Gem

1. Open a Gem detail drawer
2. Click **"⭐ Rate"**
3. Select 1-5 stars
4. (Optional) Add a comment: `"Amazing food, friendly service!"`
5. Click **"Submit Rating"**

**Your rating updates:**
- Gem's average rating
- Your user profile (shows rated Gems)

### Report Issues

If you find a problem:

1. Click **"🚩 Report"**
2. Select report type:
   - **Permanently Closed** - Business shut down
   - **Wrong Location** - Coordinates are incorrect
   - **Spam / Offensive** - Inappropriate content
3. Add details
4. Submit

**What happens:** Moderators review the report and take action (update status, delete, etc.).

---

## Common Scenarios

### Scenario 1: Business Has Closed

**Problem:** You pinned a Gem, but the place closed down.

**Solution:**
1. Open your Gem
2. Click **"Edit"**
3. Update **Lifecycle Status** to **"Closed"**
4. Save changes

**Alternative:** Report it yourself using "Permanently Closed" option.

### Scenario 2: Wrong Coordinates

**Problem:** You accidentally pinned the wrong spot.

**Solution:**
1. Open your Gem
2. Click **"Edit"**
3. Drag the pin on the map to the correct location
4. Save changes

**Note:** Major location changes (>100m) may trigger duplicate detection again.

### Scenario 3: Want to Delete Your Gem

**Problem:** You created a duplicate or made a mistake.

**Solution:**
1. Open your Gem
2. Click **"Delete"** button
3. Confirm deletion
4. The Gem is soft-deleted (hidden but recoverable by admins)

---

## What You've Accomplished

Amazing work! 🎉 You now know how to:

- ✅ Navigate the Krawl map interface
- ✅ Pin a new Gem with photos and tags
- ✅ Handle duplicate detection responsibly
- ✅ Vouch for and rate community Gems
- ✅ Report issues and maintain quality
- ✅ Edit and manage your own Gems

---

## Next Steps

### Create Your First Krawl

Now that you have Gems, create a trail:
- **[Create Your First Krawl Tutorial](./create-first-krawl.md)** - Curate a route

### Explore Advanced Features

- **Browse Discover Page** - Find popular and trending Gems
- **Filter by Tags** - Narrow down by category
- **Save Gems** - Bookmark favorites for later
- **Check Notifications** - See vouches and ratings on your Gems

### Best Practices

**When Pinning Gems:**
- ✅ Use clear, specific names (not "Restaurant")
- ✅ Add helpful descriptions with hours/price range
- ✅ Take high-quality photos
- ✅ Choose accurate, relevant tags
- ✅ Check for duplicates before submitting
- ❌ Don't pin your own business (self-promotion)
- ❌ Don't pin large chains (focus on local spots)
- ❌ Don't add fake or spam Gems

---

## Troubleshooting

### Can't Click the FAB (+) Button

**Problem:** Button is grayed out or disabled.

**Solution:**
- Make sure you're logged in (avatar visible in top-right)
- If still disabled, try refreshing the page

### Photo Upload Fails

**Problem:** "Failed to upload image" error.

**Solution:**
- Check file size (max 5MB)
- Use JPG, PNG, or WebP format
- Ensure backend is running
- Check network connection

### Gem Doesn't Appear on Map

**Problem:** You created a Gem but can't see it.

**Solution:**
1. Refresh the page
2. Zoom to the exact location (14.6330, 121.0798)
3. Clear filters (if any are active)
4. Check if it's outside the current map bounds

### Duplicate Warning Won't Go Away

**Problem:** You insist it's different, but the system disagrees.

**Solution:**
- Provide a detailed explanation in the "This is Different" field
- Mention specific differences (e.g., "Different floor," "Adjacent building")
- Add a distinct photo showing the difference
- If still blocked, contact moderators

---

## Additional Resources

- **[User Stories](../planning/user-story.md#gem-pinning)** - Feature specifications
- **[API Documentation](../reference/api-endpoints.md#gems)** - Backend API details
- **[Design System](../reference/design-system.md)** - UI components
- **[Brand Guidelines](../reference/brand-guidelines.md)** - Content tone and style

---

## Community Guidelines

**Be a Good Community Member:**

- 🤝 Vouch only for places you've personally visited
- 📸 Share genuine photos (not from Google)
- 💬 Write helpful, honest descriptions
- 🚫 Don't spam or self-promote
- 🎯 Focus on local, independent spots
- ❤️ Support small businesses and community

---

**You're now a Krawl contributor!** Keep exploring and sharing! 🗺️

*Tutorial maintained by Product Team • Last updated: 2025-10-31*

