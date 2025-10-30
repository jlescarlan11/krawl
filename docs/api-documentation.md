# 🔧 API Documentation: Krawl MVP

> **Purpose:** Complete REST API reference for the Krawl MVP backend, covering authentication, endpoints, data formats, and error handling for developers integrating with the platform.

**Version:** 1.2.0  
**Last Updated:** 2025-10-30  
**Status:** Active  
**Owner:** Backend Team  
**Tech Stack:** Spring Boot, JWT, PostgreSQL/PostGIS  
**Base URL:** `/api/v1` (primary)  
**Legacy Base URL:** `/api` (deprecated - maintained for backward compatibility)

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Authentication](#-authentication)
- [Data Format](#-data-format)
- [Error Handling](#️-error-handling)
- [API Endpoints](#-api-endpoints)
  - [Authentication](#1-authentication-auth)
  - [Gems](#2-gems-gems)
  - [Krawls](#3-krawls-krawls)
  - [Community Interactions](#4-community-interactions)
  - [User Profiles & Saved Krawls](#5-user-profiles--saved-krawls)
  - [Storage](#6-storage-storage)
- [Additional Notes](#additional-notes)
- [Changelog](#-changelog)
- [Related Documents](#-related-documents)

---

## 📋 Overview

This document outlines the REST API endpoints, data formats, and authentication mechanisms for the **Krawl MVP backend**, built with **Spring Boot**.

---

## 🔐 Authentication

### Method
**Token-based Authentication** using JWT (JSON Web Tokens)

### Authentication Flow

1. User **registers** via `POST /api/v1/auth/register` → receives a JWT
2. User **logs in** via `POST /api/v1/auth/login` → receives a JWT
3. JWT must be included in the `Authorization` header for all protected endpoints

**Note:** Legacy endpoints under `/api/auth` are still available but deprecated. Use `/api/v1/auth` for new integrations.

**Header Format:**
```
Authorization: Bearer <your_jwt_token>
```

### Endpoint Access

| Endpoint Type | Authentication Required |
|--------------|------------------------|
| **Protected Endpoints** | All `POST`, `PUT`, `DELETE` and user-specific `GET` endpoints |
| **Public Endpoints** | `GET` endpoints for public Gems, Krawls, and user profiles |

---

## 📊 Data Format

| Type | Format | Content-Type |
|------|--------|--------------|
| **Request Body** | JSON | `application/json` |
| **Response Body** | JSON | `application/json` |

---

## ⚠️ Error Handling

All error responses follow a standard structure with appropriate HTTP status codes.

### Standard HTTP Status Codes

| Code | Meaning |
|------|---------|
| `400` | Bad Request - Validation errors |
| `401` | Unauthorized - Authentication required or invalid |
| `403` | Forbidden - Insufficient permissions |
| `404` | Not Found - Resource doesn't exist |
| `409` | Conflict - Duplicate or conflicting data |
| `500` | Internal Server Error |

### Error Response Format

```json
{
  "timestamp": "2025-10-28T16:03:00.123Z",
  "status": 400,
  "error": "Bad Request",
  "message": "Validation failed: Gem name cannot be empty.",
  "path": "/api/v1/gems"
}
```

---

## 🌐 API Endpoints

---

## 1. Authentication (`/api/v1/auth`)

### Register User

**`POST /api/v1/auth/register`**

Creates a new user account.

| Property | Value |
|----------|-------|
| **Authentication** | Public |
| **Success Response** | `201 Created` |
| **Error Codes** | `400`, `409` |

#### Request Body

```json
{
  "username": "juandelacruz",
  "email": "juan@example.com",
  "password": "securepassword123"
}
```

#### Response (201 Created)

```json
{
  "userId": "uuid-user-123",
  "username": "juandelacruz",
  "email": "juan@example.com",
  "token": "generated.jwt.token"
}
```

#### Errors
- `400` - Validation Error
- `409` - Username/Email already exists

---

### Login User

**`POST /api/v1/auth/login`**

Authenticates a user and returns a JWT.

| Property | Value |
|----------|-------|
| **Authentication** | Public |
| **Success Response** | `200 OK` |
| **Error Codes** | `400`, `401` |

#### Request Body

```json
{
  "email": "juan@example.com",
  "password": "securepassword123"
}
```

#### Response (200 OK)

```json
{
  "userId": "uuid-user-123",
  "username": "juandelacruz",
  "email": "juan@example.com",
  "token": "generated.jwt.token"
}
```

#### Errors
- `400` - Validation Error
- `401` - Invalid Credentials

---

## 2. Gems (`/api/v1/gems`)

### Create Gem

**`POST /api/v1/gems`**

Creates a new Gem (pin). Handles duplicate checks automatically.

| Property | Value |
|----------|-------|
| **Authentication** | Required (Bearer Token) |
| **Success Response** | `201 Created` or `409 Conflict` (duplicates) |
| **Error Codes** | `400`, `401`, `409` |

#### Request Body

```json
{
  "name": "Aling Nena's Isaw",
  "description": "Best isaw near UP!",
  "latitude": 14.6543,
  "longitude": 121.0632,
  "tags": ["food", "street food", "isaw"]
}
```

#### Response (201 Created - No Duplicate)

```json
{
  "gemId": "uuid-gem-456",
  "name": "Aling Nena's Isaw",
  "description": "Best isaw near UP!",
  "latitude": 14.6543,
  "longitude": 121.0632,
  "founderId": "uuid-user-123",
  "founderUsername": "juandelacruz",
  "vouchCount": 0,
  "averageRating": 0.00,
  "ratingCount": 0,
  "approvalStatus": "pending",
  "lifecycleStatus": "open",
  "tags": ["food", "street food", "isaw"],
  "createdAt": "...",
  "updatedAt": "..."
}
```

#### Response (409 Conflict - Duplicate Found)

```json
{
  "message": "Potential duplicate Gem found.",
  "duplicates": [
    {
      "gemId": "uuid-gem-existing-789",
      "name": "Aling Nenas Isaw",
      "distanceMeters": 25.5,
      "founderUsername": "pedro_kalye",
      "vouchCount": 15
    }
  ]
}
```

#### Errors
- `400` - Validation Error
- `401` - Unauthorized

---

### List Gems (Map View)

**`GET /api/v1/gems`**

Retrieves Gems within a given map viewport/boundary. Used for map display.

| Property | Value |
|----------|-------|
| **Authentication** | Public |
| **Success Response** | `200 OK` |
| **Error Codes** | `400` |

#### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `neLat` | Number | Yes | Northeast latitude of map bounds |
| `neLng` | Number | Yes | Northeast longitude of map bounds |
| `swLat` | Number | Yes | Southwest latitude of map bounds |
| `swLng` | Number | Yes | Southwest longitude of map bounds |
| `zoomLevel` | Number | No | Current map zoom level |
| `tags` | String | No | Comma-separated list of tags to filter by |
| `minRating` | Number | No | Minimum average rating filter |

#### Response (200 OK)

```json
[
  {
    "gemId": "uuid-gem-456",
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

#### Errors
- `400` - Invalid query parameters

---

### Get Gem Details

**`GET /api/v1/gems/{gemId}`**

Retrieves detailed information for a specific Gem.

| Property | Value |
|----------|-------|
| **Authentication** | Public |
| **Success Response** | `200 OK` |
| **Error Codes** | `404` |

#### Path Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `gemId` | UUID | Unique identifier of the Gem |

#### Response (200 OK)

Similar to POST `/gems` success response, potentially includes photos, recent ratings/comments.

#### Errors
- `404` - Gem Not Found

---

### Upload Gem Photo

**`POST /api/v1/gems/{gemId}/photos`**

Uploads a photo for a Gem. Requires handling `multipart/form-data` for image upload.

| Property | Value |
|----------|-------|
| **Authentication** | Required |
| **Success Response** | `201 Created` |
| **Error Codes** | `400`, `401`, `404` |

#### Response (201 Created)

Details of the uploaded photo (URL, ID).

---

## 3. Krawls (`/api/v1/krawls`)

### Create Krawl

**`POST /api/v1/krawls`**

Creates a new, empty Krawl.

| Property | Value |
|----------|-------|
| **Authentication** | Required |
| **Success Response** | `201 Created` |
| **Error Codes** | `400`, `401` |

#### Request Body

```json
{
  "title": "My Cebu Lechon Adventure",
  "description": "Finding the best lechon in Cebu City!",
  "visibility": "public"
}
```

**Visibility Options:** `public`, `friends_only`

#### Response (201 Created)

Details of the newly created Krawl.

---

### List Krawls (Discover)

**`GET /api/v1/krawls`**

Retrieves a list of Krawls (e.g., for Discover page). Supports filtering and pagination.

| Property | Value |
|----------|-------|
| **Authentication** | Public (for public Krawls) |
| **Success Response** | `200 OK` |
| **Error Codes** | `400` |

#### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `city` | String | Filter by city |
| `category` | String | Filter by category |
| `creatorId` | UUID | Filter by creator |
| `sortBy` | String | Sort order: `popular`, `recent` |
| `page` | Number | Page number for pagination |
| `limit` | Number | Number of results per page |

#### Response (200 OK)

Array of Krawl summary objects (title, description snippet, creator, rating, first few Gem names/photos).

---

### Get Krawl Details

**`GET /api/v1/krawls/{krawlId}`**

Retrieves detailed information for a specific Krawl, including its ordered Gems and notes.

| Property | Value |
|----------|-------|
| **Authentication** | Public (if Krawl is public) |
| **Success Response** | `200 OK` |
| **Error Codes** | `403`, `404` |

#### Response (200 OK)

Full Krawl details, including an ordered array of `krawl_items` with Gem info and creator notes.

#### Errors
- `404` - Krawl Not Found
- `403` - Private Krawl (unauthorized access)

---

### Update Krawl

**`PUT /api/v1/krawls/{krawlId}`**

Updates a Krawl (title, description, visibility, adding/removing/reordering Gems, updating notes).

| Property | Value |
|----------|-------|
| **Authentication** | Required (Creator only) |
| **Success Response** | `200 OK` |
| **Error Codes** | `400`, `401`, `403`, `404` |

#### Request Body

Contains updated Krawl details and/or the full ordered list of `krawl_items`.

#### Response (200 OK)

Updated Krawl details.

---

### Get Krawl for Offline Use

**`GET /api/v1/krawls/{krawlId}/offline`**

Retrieves all necessary data for a Krawl to be used offline.

| Property | Value |
|----------|-------|
| **Authentication** | Public (if Krawl is public) |
| **Success Response** | `200 OK` |
| **Error Codes** | `403`, `404` |

#### Response (200 OK)

A comprehensive JSON object containing:
- Krawl details
- All associated Gem details
- Notes
- Photo URLs
- All data needed for offline mode

---

### Delete Krawl

**`DELETE /api/v1/krawls/{krawlId}`**

Deletes a Krawl. Only accessible by the Krawl creator.

| Property | Value |
|----------|-------|
| **Authentication** | Required (Creator only) |
| **Success Response** | `204 No Content` |
| **Error Codes** | `401`, `403`, `404` |

---

## 4. Community Interactions

### Vouch for Gem

**`POST /api/v1/gems/{gemId}/vouch`**

Adds a vouch from the authenticated user to the Gem.

| Property | Value |
|----------|-------|
| **Authentication** | Required |
| **Success Response** | `200 OK` or `204 No Content` |
| **Error Codes** | `401`, `404`, `409` |
| **Idempotent** | User can only vouch once |

#### Response

Confirmation, potentially updated vouch count.

#### Errors
- `409` - Already Vouched

---

### Rate Gem

**`POST /api/v1/gems/{gemId}/ratings`**

Submits a star rating (1-5) and optional comment for a Gem. Updates existing rating if user rated before.

| Property | Value |
|----------|-------|
| **Authentication** | Required |
| **Success Response** | `201 Created` or `200 OK` |
| **Error Codes** | `400`, `401`, `404` |

#### Request Body

```json
{
  "rating": 5,
  "comment": "Amazing isaw!"
}
```

#### Response

Saved rating details, updated Gem average rating.

---

### Get Gem Ratings

**`GET /api/v1/gems/{gemId}/ratings`**

Retrieves ratings/comments for a Gem (paginated).

| Property | Value |
|----------|-------|
| **Authentication** | Public |
| **Success Response** | `200 OK` |

#### Response (200 OK)

```json
[
  {
    "ratingId": "uuid-rating-123",
    "userId": "uuid-user-123",
    "username": "juandelacruz",
    "rating": 5,
    "comment": "Amazing isaw!",
    "createdAt": "2025-10-28T16:03:00.123Z"
  }
]
```

---

### Rate Krawl

**`POST /api/v1/krawls/{krawlId}/ratings`**

Submits a star rating (1-5), optional comment, and feedback flags for a Krawl experience.

| Property | Value |
|----------|-------|
| **Authentication** | Required |
| **Success Response** | `201 Created` or `200 OK` |
| **Error Codes** | `400`, `401`, `404` |

#### Request Body

```json
{
  "rating": 4,
  "comment": "Great route!",
  "flagOutdated": false
}
```

#### Response

Saved rating details, updated Krawl average rating.

---

### Report Gem

**`POST /api/v1/gems/{gemId}/reports`**

Submits a report about a Gem (e.g., closed, spam).

| Property | Value |
|----------|-------|
| **Authentication** | Required |
| **Success Response** | `202 Accepted` |
| **Error Codes** | `400`, `401`, `404` |

#### Request Body

```json
{
  "reportType": "permanently_closed",
  "comment": "Sign says closed since last month."
}
```

**Report Types:**
- `permanently_closed`
- `temporarily_closed`
- `spam`
- `inappropriate`
- `incorrect_location`
- `duplicate`

#### Response (202 Accepted)

Report received and queued for review.

---

## 5. User Profiles & Saved Krawls

### Get User Profile

**`GET /api/v1/profile/{username}`**

Retrieves public profile information for a user.

| Property | Value |
|----------|-------|
| **Authentication** | Public |
| **Success Response** | `200 OK` |
| **Error Codes** | `404` |

#### Response (200 OK)

```json
{
  "userId": "uuid-user-123",
  "username": "juandelacruz",
  "bio": "Food enthusiast and street food explorer!",
  "joinDate": "2025-01-15T10:30:00.123Z",
  "creatorScore": 250,
  "creatorTier": "Explorer",
  "publicKrawls": [
    {
      "krawlId": "uuid-krawl-789",
      "title": "Manila Street Food Tour",
      "averageRating": 4.5,
      "completionCount": 32
    }
  ]
}
```

---

### Get Saved Krawls

**`GET /api/v1/my-krawls/saved`**

Retrieves the list of Krawls saved/downloaded by the authenticated user.

| Property | Value |
|----------|-------|
| **Authentication** | Required |
| **Success Response** | `200 OK` |
| **Error Codes** | `401` |

#### Response (200 OK)

Array of saved Krawl summary objects.

---

### Save Krawl

**`POST /api/v1/my-krawls/saved/{krawlId}`**

Saves a Krawl to the authenticated user's list.

| Property | Value |
|----------|-------|
| **Authentication** | Required |
| **Success Response** | `204 No Content` |
| **Error Codes** | `401`, `404` |

---

### Unsave Krawl

**`DELETE /api/v1/my-krawls/saved/{krawlId}`**

Removes a Krawl from the authenticated user's saved list.

| Property | Value |
|----------|-------|
| **Authentication** | Required |
| **Success Response** | `204 No Content` |
| **Error Codes** | `401`, `404` |

---

## 6. Storage (`/api/v1/storage`)

### Upload Image

**`POST /api/v1/storage/upload`**

Uploads an image to Cloudinary with automatic optimization and thumbnail generation.

| Property | Value |
|----------|-------|
| **Authentication** | Public (for testing) |
| **Content-Type** | `multipart/form-data` |
| **Success Response** | `200 OK` |
| **Error Codes** | `400` |

#### Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `file` | File | Yes | Image file (JPEG, PNG, WebP, HEIC, max 10MB) |
| `gemId` | UUID | No | Gem ID to organize uploads (auto-generated if not provided) |

#### Response (200 OK)

```json
{
  "url": "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/krawl-gems/123e4567-e89b-12d3-a456-426614174000/uuid.webp",
  "message": "Image uploaded successfully"
}
```

#### Error Response (400 Bad Request)

```json
{
  "error": "File size exceeds 10MB limit"
}
```

**Possible Error Messages:**
- `"File is empty"`
- `"File size exceeds 10MB limit"`
- `"File must be an image"`
- `"Unsupported image format. Allowed: JPEG, PNG, WebP, HEIC"`

#### Image Processing

The uploaded image is automatically:
- ✅ Converted to WebP format for optimal compression
- ✅ Resized to max 1200x1200 (only if larger, preserves aspect ratio)
- ✅ Quality optimized (auto:good)
- ✅ Thumbnails generated (400x400 and 800x800)

#### cURL Example

```bash
curl -X POST http://localhost:8080/api/v1/storage/upload \
  -F "file=@image.jpg" \
  -F "gemId=123e4567-e89b-12d3-a456-426614174000"
```

---

### Delete Image

**`DELETE /api/v1/storage/delete`**

Deletes an image from Cloudinary.

| Property | Value |
|----------|-------|
| **Authentication** | Public (for testing) |
| **Success Response** | `200 OK` |
| **Error Codes** | `400` |

#### Query Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `url` | String | Yes | Full Cloudinary image URL to delete |

#### Response (200 OK)

```json
{
  "message": "Image deleted successfully"
}
```

#### Error Response (400 Bad Request)

```json
{
  "error": "Invalid Cloudinary URL"
}
```

#### cURL Example

```bash
curl -X DELETE "http://localhost:8080/api/v1/storage/delete?url=https://res.cloudinary.com/your-cloud/image/upload/v1234567890/krawl-gems/123e4567-e89b-12d3-a456-426614174000/uuid.webp"
```

---

## Additional Notes

This documentation covers the core endpoints anticipated for the **Krawl MVP** based on the defined features and data flow. Additional endpoints for the following may be added in future iterations:

- **Tags Management** - CRUD operations for tag taxonomy
- **Admin Functions** - Content moderation, user management
- **Advanced Search** - Complex queries and filtering
- **Analytics** - Usage statistics and insights
- **Notifications** - Push notification management
- **Social Features** - Following, friends, sharing

---

## 📝 Changelog

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 1.2.0 | 2025-10-30 | Clarified `/api/v1` as primary base URL; updated all endpoint paths and cURL examples; marked `/api` as legacy/deprecated | Backend Team |
| 1.1.0 | 2025-10-29 | Added Storage endpoints for image upload and delete with Cloudinary integration | Backend Team |
| 1.0.0 | 2025-10-28 | Initial API documentation for MVP | Backend Team |

---

## 📚 Related Documents

- [Database Schema](./database-schema.md)
- [System Design](./system-design.md)
- [Security Plan](./security-plan.md)
- [Testing Plan](./testing-plan.md)
- [Project Setup](./project-setup.md)
- [Storage Testing Guide](./storage-testing-guide.md)

---

*API documentation maintained by Backend Team • Last reviewed: 2025-10-30*

