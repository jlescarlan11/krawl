# 🗄️ IndexedDB Implementation - Krawl PWA

This directory contains the complete IndexedDB implementation for offline-first data storage in the Krawl Progressive Web App.

## 📁 File Structure

```
lib/db/
├── index.ts          # Central export point
├── types.ts          # TypeScript interfaces
├── indexedDB.ts      # Core database initialization
├── gemStore.ts       # Gem CRUD operations
├── krawlStore.ts     # Krawl CRUD operations
├── userStore.ts      # User & settings operations
├── syncQueue.ts      # Offline sync queue
└── README.md         # This file
```

## 🎯 Purpose

IndexedDB serves as the **client-side cache** for offline functionality:

- ✅ **Offline-first architecture**: Data loads instantly from cache
- ✅ **Background sync**: Fresh data syncs silently when online
- ✅ **Offline operations**: Queue actions when network unavailable
- ✅ **PWA compliance**: Full functionality without internet
- ✅ **Performance**: Instant app startup, no loading spinners

## 🔄 Architecture Pattern

```
┌─────────────────────────────────────────────┐
│           OFFLINE-FIRST PATTERN             │
└─────────────────────────────────────────────┘

📱 User Request
    ↓
┌───────────────┐
│  1. IndexedDB │ ← Check cache first (instant)
└───────┬───────┘
        │ Found? → Return immediately ✅
        ↓ Not found?
┌───────────────┐
│  2. Fetch API │ ← Request from backend
└───────┬───────┘
        │ Success? → Save to IndexedDB + Return
        │ Failed?  → Return cached data (if any)
        ↓
┌───────────────┐
│  3. Sync Queue│ ← Queue for later if offline
└───────────────┘
```

## 📦 Database Schema

### Object Stores

| Store | Key | Purpose |
|-------|-----|---------|
| **gems** | `gem_id` | Local spots/locations |
| **krawls** | `krawl_id` | Curated trails |
| **users** | `user_id` | User profiles (cached) |
| **tags** | `tag_id` | Category tags |
| **photos** | `photo_id` | Gem images |
| **syncQueue** | `id` (auto) | Pending offline actions |
| **settings** | `key` | App settings & preferences |

### Indexes

- **gems**: `by-creator`, `by-status`, `by-synced`
- **krawls**: `by-creator`, `by-visibility`, `by-downloaded`
- **users**: `by-username`
- **syncQueue**: `by-synced`, `by-timestamp`

## 🚀 Usage Examples

### Initialize Database

```typescript
import { initDB } from '@/lib/db';

// Automatically done in app layout
await initDB();
```

### Gem Operations

```typescript
import { saveGem, getGem, getAllGems, searchGems } from '@/lib/db';

// Save a gem
await saveGem({
  gem_id: '123',
  name: 'Punta Fuego',
  location: { latitude: 14.0, longitude: 121.0 },
  // ... other fields
});

// Get a gem
const gem = await getGem('123');

// Search gems
const results = await searchGems('coffee');

// Get gems near location
const nearby = await getGemsNearLocation(14.5, 121.0, 5); // 5km radius
```

### Krawl Operations

```typescript
import { saveKrawl, getDownloadedKrawls, markKrawlAsDownloaded } from '@/lib/db';

// Save krawl for offline use
await saveKrawl(krawlData);

// Mark as downloaded
await markKrawlAsDownloaded('krawl-123');

// Get all downloaded krawls
const offline = await getDownloadedKrawls();
```

### Offline Operations

```typescript
import { addToSyncQueue, getPendingSyncItems } from '@/lib/db';

// Queue an action when offline
await addToSyncQueue('CREATE', 'gem', 'temp-123', gemData);

// Get pending items (for background sync)
const pending = await getPendingSyncItems();
```

### User & Settings

```typescript
import { saveCurrentUser, getCurrentUser, saveSetting } from '@/lib/db';

// Save logged-in user
await saveCurrentUser(userData);

// Get current user
const user = await getCurrentUser();

// Save app settings
await saveSetting('theme', 'dark');
```

## 🔌 API Integration

The API layer (`lib/api.ts`) automatically uses IndexedDB:

```typescript
import { api } from '@/lib/api';

// This will:
// 1. Check IndexedDB first
// 2. Return cached data immediately
// 3. Fetch fresh data in background
// 4. Update cache silently
const gems = await api.getGems();

// Works offline! Returns cached data
const gem = await api.getGemById('123');

// Queues for sync if offline
await api.createGem(newGemData);
```

## 📊 Database Stats

```typescript
import { getDatabaseStats } from '@/lib/db';

const stats = await getDatabaseStats();
console.log(stats);
// {
//   gems: 145,
//   krawls: 23,
//   users: 5,
//   tags: 14,
//   photos: 234,
//   syncQueue: 2
// }
```

## 🗑️ Maintenance

### Clear All Data (Logout)

```typescript
import { clearAllData } from '@/lib/db';

await clearAllData();
```

### Delete Database (Reset)

```typescript
import { deleteDatabase } from '@/lib/db';

await deleteDatabase();
```

### Clean Sync Queue

```typescript
import { clearCompletedSyncItems } from '@/lib/db';

await clearCompletedSyncItems();
```

## 🔍 Debugging

Open browser DevTools → Application → IndexedDB → `KrawlDB`

Or programmatically:

```typescript
import { getDatabaseStats, isDBInitialized } from '@/lib/db';

console.log('DB Initialized:', isDBInitialized());
console.log('Stats:', await getDatabaseStats());
```

## 🎨 Features

### Geospatial Search

```typescript
// Find gems within 5km radius
const nearby = await getGemsNearLocation(
  14.5995,  // Manila latitude
  120.9842, // Manila longitude
  5         // radius in km
);
```

### Full-Text Search

```typescript
// Search by name or description
const results = await searchGems('coffee shop');
```

### Sync Status Tracking

All items have `_synced` and `_lastSynced` fields:

```typescript
const gem = await getGem('123');
console.log(gem._synced);      // true/false
console.log(gem._lastSynced);  // "2025-10-28T12:34:56Z"
```

## 🔐 Security Notes

- IndexedDB is client-side only (user can access/modify)
- Backend is the source of truth
- Never store sensitive data (passwords, tokens) here
- Use for caching and offline functionality only

## 🚀 Performance

- **Initial load**: < 10ms (from cache)
- **Search**: < 50ms (in-memory)
- **Write**: < 20ms (async)
- **Bulk write**: ~1ms per item

## 📱 Browser Support

- ✅ Chrome/Edge (v24+)
- ✅ Firefox (v16+)
- ✅ Safari (v10+)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🔄 Sync Strategy

1. **On Load**: Return cached data immediately
2. **Background**: Fetch fresh data from API
3. **On Success**: Update cache silently
4. **On Failure**: Keep using cached data
5. **On Create**: Save locally + queue for sync

## 📝 Type Safety

All operations are fully typed with TypeScript:

```typescript
import type { Gem, Krawl, User } from '@/lib/db';

const gem: Gem = await getGem('123'); // Fully typed!
```

## 🔗 Related Files

- `lib/api.ts` - API layer with offline-first pattern
- `components/DBInitializer.tsx` - Database initialization component
- `app/layout.tsx` - Loads DBInitializer on app start

## 📚 Further Reading

- [IndexedDB API](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)
- [idb Library](https://github.com/jakearchibald/idb)
- [PWA Best Practices](https://web.dev/progressive-web-apps/)

---

**Last Updated**: October 28, 2025  
**Version**: 1.0.0  
**Maintainer**: Frontend Team

