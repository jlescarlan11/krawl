# Krawl API Documentation (MVP)

> **Version:** 1.0.0  
> **Last Updated:** October 28, 2025  
> **Base URL:** `/api` or `/api/v1`

---

## Table of Contents

- [Overview](#overview)
- [Authentication](#authentication)
- [Data Format](#data-format)
- [Error Handling](#error-handling)
- [API Endpoints](#api-endpoints)
  - [Authentication](#1-authentication-auth)
  - [Gems](#2-gems-gems)
  - [Krawls](#3-krawls-krawls)
  - [Community Interactions](#4-community-interactions)
  - [User Profiles & Saved Krawls](#5-user-profiles--saved-krawls)

---

## Overview

This document outlines the REST API endpoints, data formats, and authentication mechanisms for the **Krawl MVP backend**, built with **Spring Boot**.

---

## Authentication

### Method
**Token-based Authentication** using JWT (JSON Web Tokens)

### Authentication Flow

1. User **registers** via `POST /auth/register` → receives a JWT
2. User **logs in** via `POST /auth/login` → receives a JWT
3. JWT must be included in the `Authorization` header for all protected endpoints

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

## Data Format

| Type | Format | Content-Type |
|------|--------|--------------|
| **Request Body** | JSON | `application/json` |
| **Response Body** | JSON | `application/json` |

---

## Error Handling

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
  "path": "/api/gems"
}
```

---

## API Endpoints

---

## 1. Authentication (`/auth`)

### Register User

**`POST /auth/register`**

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

**`POST /auth/login`**

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

## 2. Gems (`/gems`)

### Create Gem

**`POST /gems`**

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

**`GET /gems`**

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

**`GET /gems/{gemId}`**

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

**`POST /gems/{gemId}/photos`**

Uploads a photo for a Gem. Requires handling `multipart/form-data` for image upload.

| Property | Value |
|----------|-------|
| **Authentication** | Required |
| **Success Response** | `201 Created` |
| **Error Codes** | `400`, `401`, `404` |

#### Response (201 Created)

Details of the uploaded photo (URL, ID).

---

## 3. Krawls (`/krawls`)

### Create Krawl

**`POST /krawls`**

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

**`GET /krawls`**

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

**`GET /krawls/{krawlId}`**

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

**`PUT /krawls/{krawlId}`**

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

**`GET /krawls/{krawlId}/offline`**

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

**`DELETE /krawls/{krawlId}`**

Deletes a Krawl. Only accessible by the Krawl creator.

| Property | Value |
|----------|-------|
| **Authentication** | Required (Creator only) |
| **Success Response** | `204 No Content` |
| **Error Codes** | `401`, `403`, `404` |

---

## 4. Community Interactions

### Vouch for Gem

**`POST /gems/{gemId}/vouch`**

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

**`POST /gems/{gemId}/ratings`**

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

**`GET /gems/{gemId}/ratings`**

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

**`POST /krawls/{krawlId}/ratings`**

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

**`POST /gems/{gemId}/reports`**

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

**`GET /profile/{username}`**

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

**`GET /my-krawls/saved`**

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

**`POST /my-krawls/saved/{krawlId}`**

Saves a Krawl to the authenticated user's list.

| Property | Value |
|----------|-------|
| **Authentication** | Required |
| **Success Response** | `204 No Content` |
| **Error Codes** | `401`, `404` |

---

### Unsave Krawl

**`DELETE /my-krawls/saved/{krawlId}`**

Removes a Krawl from the authenticated user's saved list.

| Property | Value |
|----------|-------|
| **Authentication** | Required |
| **Success Response** | `204 No Content` |
| **Error Codes** | `401`, `404` |

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

**End of Documentation**

