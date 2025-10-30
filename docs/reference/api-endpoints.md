# API Endpoints: Krawl

> **Purpose:** REST API reference for the Krawl backend.

**Version:** 2.0.0  
**Last Updated:** 2025-10-31  
**Status:** Active  
**Base URL:** `https://api.krawl.app/api/v1`  
**Tech Stack:** Spring Boot, JWT, PostgreSQL/PostGIS

---

## Quick Reference

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| **Authentication** ||||
| `/auth/register` | POST | ❌ | Register new user |
| `/auth/login` | POST | ❌ | Login user |
| **Gems** ||||
| `/gems` | GET | ❌ | List Gems in bounds |
| `/gems` | POST | ✅ | Create new Gem |
| `/gems/{id}` | GET | ❌ | Get Gem details |
| `/gems/{id}` | PUT | ✅ | Update Gem (owner only) |
| `/gems/{id}` | DELETE | ✅ | Delete Gem (owner only) |
| `/gems/search` | GET | ❌ | Search Gems by name/tags |
| `/gems/nearby` | GET | ❌ | Find Gems near location |
| **Krawls** ||||
| `/krawls` | GET | ❌ | List public Krawls |
| `/krawls` | POST | ✅ | Create new Krawl |
| `/krawls/{id}` | GET | ❌ | Get Krawl with stops |
| `/krawls/{id}` | PUT | ✅ | Update Krawl (creator only) |
| `/krawls/{id}` | DELETE | ✅ | Delete Krawl (creator only) |
| **Community** ||||
| `/gems/{id}/vouch` | POST | ✅ | Vouch for Gem |
| `/gems/{id}/vouch` | DELETE | ✅ | Remove vouch |
| `/gems/{id}/rate` | POST | ✅ | Rate Gem |
| `/gems/{id}/report` | POST | ✅ | Report Gem issue |
| `/krawls/{id}/rate` | POST | ✅ | Rate Krawl |
| **User & Saved** ||||
| `/users/{username}` | GET | ❌ | Get user profile |
| `/users/me` | GET | ✅ | Get my profile |
| `/users/me` | PUT | ✅ | Update my profile |
| `/users/me/gems` | GET | ✅ | Get my Gems |
| `/users/me/krawls` | GET | ✅ | Get my Krawls |
| `/saved-krawls` | GET | ✅ | Get saved Krawls |
| `/saved-krawls/{id}` | POST | ✅ | Save Krawl |
| `/saved-krawls/{id}` | DELETE | ✅ | Unsave Krawl |
| **Storage** ||||
| `/storage/health` | GET | ❌ | Check storage service |

**Auth:** ✅ = JWT Required | ❌ = Public

---

## Authentication

### Header Format

All protected endpoints require:

```
Authorization: Bearer <jwt_token>
```

### Register

`POST /api/v1/auth/register`

**Request:**
```json
{
  "username": "juandelacruz",
  "email": "juan@example.com",
  "password": "securepass123"
}
```

**Response (201):**
```json
{
  "userId": "uuid",
  "username": "juandelacruz",
  "email": "juan@example.com",
  "token": "eyJhbGc..."
}
```

**Errors:** `400` (validation), `409` (duplicate username/email)

---

### Login

`POST /api/v1/auth/login`

**Request:**
```json
{
  "email": "juan@example.com",
  "password": "securepass123"
}
```

**Response (200):**
```json
{
  "userId": "uuid",
  "username": "juandelacruz",
  "email": "juan@example.com",
  "token": "eyJhbGc..."
}
```

**Errors:** `400` (validation), `401` (invalid credentials)

---

## Gems

### Create Gem

`POST /api/v1/gems` 🔒

**Request:**
```json
{
  "name": "Aling Nena's Isaw",
  "description": "Best isaw near UP!",
  "latitude": 14.6543,
  "longitude": 121.0632,
  "tags": ["food", "street food"]
}
```

**Response (201):**
```json
{
  "gemId": "uuid",
  "name": "Aling Nena's Isaw",
  "description": "Best isaw near UP!",
  "latitude": 14.6543,
  "longitude": 121.0632,
  "founderId": "uuid",
  "founderUsername": "juandelacruz",
  "vouchCount": 0,
  "averageRating": 0.00,
  "ratingCount": 0,
  "approvalStatus": "pending",
  "lifecycleStatus": "open",
  "tags": ["food", "street food"],
  "createdAt": "2025-10-31T10:00:00Z"
}
```

**Duplicate Detection (409):**
```json
{
  "message": "Potential duplicate Gem found.",
  "duplicates": [
    {
      "gemId": "uuid",
      "name": "Aling Nenas Isaw",
      "distanceMeters": 25.5,
      "founderUsername": "pedro_kalye",
      "vouchCount": 15
    }
  ]
}
```

---

### List Gems

`GET /api/v1/gems`

**Query Params:**
- `neLat`, `neLng`, `swLat`, `swLng` (required) - Map bounds
- `zoomLevel` (optional) - Current map zoom
- `tags` (optional) - Filter by tags (comma-separated)
- `minRating` (optional) - Minimum rating filter

**Response (200):**
```json
[
  {
    "gemId": "uuid",
    "name": "Aling Nena's Isaw",
    "latitude": 14.6543,
    "longitude": 121.0632,
    "vouchCount": 5,
    "averageRating": 4.5,
    "lifecycleStatus": "open",
    "primaryTag": "food"
  }
]
```

---

### Get Gem Details

`GET /api/v1/gems/{gemId}`

**Response (200):**
```json
{
  "gemId": "uuid",
  "name": "Aling Nena's Isaw",
  "description": "Best isaw near UP!",
  "latitude": 14.6543,
  "longitude": 121.0632,
  "founderId": "uuid",
  "founderUsername": "juandelacruz",
  "vouchCount": 5,
  "averageRating": 4.5,
  "ratingCount": 3,
  "approvalStatus": "approved",
  "lifecycleStatus": "open",
  "tags": ["food", "street food"],
  "photos": [
    {
      "photoId": "uuid",
      "photoUrl": "https://...",
      "isFeatured": true
    }
  ],
  "userVouched": false,
  "userRating": null,
  "createdAt": "2025-10-31T10:00:00Z",
  "updatedAt": "2025-10-31T10:00:00Z"
}
```

---

### Update Gem

`PUT /api/v1/gems/{gemId}` 🔒

**Request:**
```json
{
  "name": "Aling Nena's Famous Isaw",
  "description": "Updated description",
  "tags": ["food", "street food", "budget-friendly"]
}
```

**Response (200):** Updated Gem object

**Errors:** `403` (not owner), `404` (not found)

---

### Delete Gem

`DELETE /api/v1/gems/{gemId}` 🔒

**Response (204):** No content

**Errors:** `403` (not owner), `404` (not found)

---

### Search Gems

`GET /api/v1/gems/search`

**Query Params:**
- `q` (required) - Search term
- `tags` (optional) - Filter by tags
- `limit` (optional) - Results limit (default 20)

**Response (200):** Array of Gem objects

---

### Find Nearby Gems

`GET /api/v1/gems/nearby`

**Query Params:**
- `lat`, `lng` (required) - Center coordinates
- `radius` (required) - Radius in meters (max 10,000)
- `limit` (optional) - Results limit (default 20)

**Response (200):**
```json
[
  {
    "gemId": "uuid",
    "name": "Aling Nena's Isaw",
    "latitude": 14.6543,
    "longitude": 121.0632,
    "distanceMeters": 125.5,
    "averageRating": 4.5,
    "vouchCount": 5
  }
]
```

---

## Krawls

### Create Krawl

`POST /api/v1/krawls` 🔒

**Request:**
```json
{
  "title": "Best Food Spots in Makati",
  "description": "A foodie's dream route!",
  "visibility": "public",
  "krawlItems": [
    {
      "gemId": "uuid-gem-1",
      "stepOrder": 1,
      "creatorNote": "Start here!",
      "lokalSecret": "Ask for the special sauce."
    },
    {
      "gemId": "uuid-gem-2",
      "stepOrder": 2,
      "creatorNote": "Best sizzling sisig!",
      "lokalSecret": null
    }
  ]
}
```

**Response (201):**
```json
{
  "krawlId": "uuid",
  "title": "Best Food Spots in Makati",
  "description": "A foodie's dream route!",
  "creatorId": "uuid",
  "creatorUsername": "juandelacruz",
  "visibility": "public",
  "averageRating": 0.00,
  "ratingCount": 0,
  "stopCount": 2,
  "createdAt": "2025-10-31T10:00:00Z"
}
```

---

### List Krawls

`GET /api/v1/krawls`

**Query Params:**
- `sort` (optional) - `rating`, `recent`, `popular` (default: `recent`)
- `limit` (optional) - Results limit (default 20)
- `offset` (optional) - Pagination offset

**Response (200):** Array of Krawl objects

---

### Get Krawl Details

`GET /api/v1/krawls/{krawlId}`

**Response (200):**
```json
{
  "krawlId": "uuid",
  "title": "Best Food Spots in Makati",
  "description": "A foodie's dream route!",
  "creatorId": "uuid",
  "creatorUsername": "juandelacruz",
  "creatorScore": 4.50,
  "creatorTier": "Trail Maker",
  "visibility": "public",
  "averageRating": 4.2,
  "ratingCount": 8,
  "stops": [
    {
      "stepOrder": 1,
      "gem": {
        "gemId": "uuid",
        "name": "Aling Nena's Isaw",
        "latitude": 14.6543,
        "longitude": 121.0632,
        "averageRating": 4.5,
        "vouchCount": 5
      },
      "creatorNote": "Start here!",
      "lokalSecret": "Ask for the special sauce."
    }
  ],
  "isSaved": false,
  "isDownloaded": false,
  "createdAt": "2025-10-31T10:00:00Z"
}
```

---

### Update Krawl

`PUT /api/v1/krawls/{krawlId}` 🔒

**Request:** Same as Create (partial updates supported)

**Response (200):** Updated Krawl object

**Errors:** `403` (not creator), `404` (not found)

---

### Delete Krawl

`DELETE /api/v1/krawls/{krawlId}` 🔒

**Response (204):** No content

**Errors:** `403` (not creator), `404` (not found)

---

## Community Interactions

### Vouch for Gem

`POST /api/v1/gems/{gemId}/vouch` 🔒

**Response (200):**
```json
{
  "success": true,
  "newVouchCount": 6
}
```

**Note:** One vouch per user per Gem. Idempotent.

---

### Remove Vouch

`DELETE /api/v1/gems/{gemId}/vouch` 🔒

**Response (200):**
```json
{
  "success": true,
  "newVouchCount": 5
}
```

---

### Rate Gem

`POST /api/v1/gems/{gemId}/rate` 🔒

**Request:**
```json
{
  "rating": 5,
  "comment": "Amazing place!"
}
```

**Response (200):**
```json
{
  "ratingId": "uuid",
  "gemId": "uuid",
  "rating": 5,
  "comment": "Amazing place!",
  "createdAt": "2025-10-31T10:00:00Z"
}
```

**Note:** Updates if user already rated. `rating` must be 1-5.

---

### Report Gem

`POST /api/v1/gems/{gemId}/report` 🔒

**Request:**
```json
{
  "reportType": "permanently_closed",
  "comment": "This place has closed down."
}
```

**Report Types:**
- `permanently_closed`
- `wrong_location`
- `spam_offensive`

**Response (201):**
```json
{
  "reportId": "uuid",
  "status": "pending"
}
```

---

### Rate Krawl

`POST /api/v1/krawls/{krawlId}/rate` 🔒

**Request:**
```json
{
  "rating": 4,
  "comment": "Great route!",
  "flagOutdated": false,
  "flagBadRoute": false,
  "flagLowQualityGems": false,
  "flagSpamMisleading": false
}
```

**Response (200):** Rating object

---

## User & Profile

### Get User Profile

`GET /api/v1/users/{username}`

**Response (200):**
```json
{
  "userId": "uuid",
  "username": "juandelacruz",
  "bio": "Local foodie and explorer",
  "creatorScore": 4.50,
  "reputationTier": "Trail Maker",
  "gemsCreated": 12,
  "krawlsCreated": 3,
  "createdAt": "2025-01-15T10:00:00Z"
}
```

---

### Get My Profile

`GET /api/v1/users/me` 🔒

**Response (200):** Extended profile with email

---

### Update My Profile

`PUT /api/v1/users/me` 🔒

**Request:**
```json
{
  "bio": "Updated bio text"
}
```

**Response (200):** Updated profile

---

### Get My Gems

`GET /api/v1/users/me/gems` 🔒

**Response (200):** Array of user's Gems

---

### Get My Krawls

`GET /api/v1/users/me/krawls` 🔒

**Response (200):** Array of user's Krawls

---

## Saved Krawls

### Get Saved Krawls

`GET /api/v1/saved-krawls` 🔒

**Response (200):** Array of saved Krawl objects with `savedAt` timestamp

---

### Save Krawl

`POST /api/v1/saved-krawls/{krawlId}` 🔒

**Response (200):**
```json
{
  "success": true,
  "savedAt": "2025-10-31T10:00:00Z"
}
```

---

### Unsave Krawl

`DELETE /api/v1/saved-krawls/{krawlId}` 🔒

**Response (204):** No content

---

## Storage Health

### Check Storage Service

`GET /api/v1/storage/health`

**Response (200):**
```json
{
  "status": "healthy",
  "cloudinary": "connected",
  "database": "connected"
}
```

---

## Error Responses

All errors follow this format:

```json
{
  "timestamp": "2025-10-31T10:00:00Z",
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed: Gem name cannot be empty.",
  "path": "/api/v1/gems"
}
```

### Common Status Codes

| Code | Description |
|------|-------------|
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - Missing/invalid token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource doesn't exist |
| 409 | Conflict - Duplicate/conflicting data |
| 429 | Too Many Requests - Rate limit exceeded |
| 500 | Internal Server Error |

---

## Rate Limiting

| Endpoint Category | Rate Limit | Window |
|-------------------|------------|--------|
| Authentication | 5 requests | 15 minutes |
| Gem Creation | 10 requests | 1 hour |
| Krawl Creation | 5 requests | 1 hour |
| Ratings/Vouches | 50 requests | 1 hour |
| General API | 100 requests | 1 minute |
| Search | 200 requests | 1 minute |

**Response on limit exceeded (429):**
```json
{
  "error": "Rate limit exceeded",
  "retryAfter": 3600
}
```

---

## Best Practices

### Pagination

For list endpoints, use `limit` and `offset`:

```
GET /api/v1/krawls?limit=20&offset=40
```

### Filtering

Combine query parameters for complex filters:

```
GET /api/v1/gems?tags=food,budget-friendly&minRating=4.0
```

### Error Handling

Always check HTTP status codes and parse error messages:

```typescript
try {
  const response = await fetch('/api/v1/gems', { ...options });
  if (!response.ok) {
    const error = await response.json();
    console.error(error.message);
  }
} catch (err) {
  console.error('Network error:', err);
}
```

---

## 📚 Related Documents

- [Database Schema](./database-schema.md) - Data structures
- [Security Requirements](./security-requirements.md) - Authentication details
- [Database Queries](./database-queries.md) - SQL examples
- [System Architecture](../explanation/architecture-overview.md) - API design

---

## 📝 Changelog

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 2.0.0 | 2025-10-31 | Added quick reference, condensed format, moved to reference folder | Backend Team |
| 1.0.0 | 2025-10-28 | Initial API documentation | Backend Team |

---

*Document maintained by Backend Team • Last reviewed: 2025-10-31*

