# Krawl Backend API

Spring Boot backend for the Krawl PWA - a local discovery platform for finding and sharing hidden gems.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Configuration](#configuration)
- [Storage Service](#storage-service)
- [API Documentation](#api-documentation)
- [Database](#database)

---

## 🚀 Features

- ✅ RESTful API with Spring Boot
- ✅ PostgreSQL + PostGIS for spatial data
- ✅ Flyway database migrations
- ✅ JWT authentication
- ✅ Cloudinary image storage integration
- ✅ CORS configuration for frontend
- ✅ Image optimization and thumbnail generation

---

## 🛠️ Tech Stack

- **Framework:** Spring Boot 3.5.7
- **Language:** Java 25
- **Database:** PostgreSQL with PostGIS extension
- **Migration:** Flyway
- **Storage:** Cloudinary
- **Security:** Spring Security + JWT
- **Build Tool:** Maven

---

## 🏁 Getting Started

### Prerequisites

- Java 17 or later
- Docker & Docker Compose
- Maven

### 1. Clone the Repository

```bash
git clone <repository-url>
cd krawl/backend
```

### 2. Set Up Environment Variables

Create a `.env` file in the **project root** (not in backend directory):

```env
# Database Configuration
DB_USER=krawl_user
DB_PASSWORD=krawl_dev_password_2025

# Server Configuration
SERVER_PORT=8080

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
CLOUDINARY_FOLDER=krawl-gems
```

> 📸 **Get Cloudinary Credentials:**
> 1. Sign up at [cloudinary.com](https://cloudinary.com)
> 2. Go to Dashboard → Account Details
> 3. Copy Cloud Name, API Key, and API Secret

### 3. Start Database

```bash
cd ..  # Go to project root
docker-compose up -d
```

This starts PostgreSQL with PostGIS on port `5434`.

### 4. Build and Run

```bash
cd backend
./mvnw spring-boot:run
```

The API will be available at `http://localhost:8080`

---

## ⚙️ Configuration

### Database Configuration

Connection details in `application.yaml`:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5434/krawl
    username: ${DB_USER}
    password: ${DB_PASSWORD}
```

### File Upload Configuration

Maximum file sizes for image uploads:

```yaml
spring:
  servlet:
    multipart:
      max-file-size: 10MB
      max-request-size: 10MB
```

### CORS Configuration

Configured in `CorsConfig.java`:

- Allowed origins: `http://localhost:3000` (development)
- Allowed methods: GET, POST, PUT, DELETE, OPTIONS, PATCH
- Credentials: Enabled

---

## 📸 Storage Service

The backend uses **Cloudinary** for image storage with automatic optimization.

### Features

- ✅ Automatic WebP conversion
- ✅ Smart resizing (max 1200x1200)
- ✅ Quality optimization (auto:good)
- ✅ Thumbnail generation (400x400 and 800x800)
- ✅ CDN delivery
- ✅ Secure HTTPS URLs

### API Endpoints

#### Upload Image

```bash
POST /api/storage/upload
Content-Type: multipart/form-data

Parameters:
- file (required): Image file (JPEG, PNG, WebP, HEIC, max 10MB)
- gemId (optional): UUID for organizing uploads
```

**Example:**

```bash
curl -X POST http://localhost:8080/api/storage/upload \
  -F "file=@image.jpg" \
  -F "gemId=123e4567-e89b-12d3-a456-426614174000"
```

**Response:**

```json
{
  "url": "https://res.cloudinary.com/.../krawl-gems/.../image.webp",
  "message": "Image uploaded successfully"
}
```

#### Delete Image

```bash
DELETE /api/storage/delete?url={imageUrl}
```

**Example:**

```bash
curl -X DELETE "http://localhost:8080/api/storage/delete?url=https://res.cloudinary.com/.../image.webp"
```

### Configuration Details

| Setting | Value |
|---------|-------|
| **Max File Size** | 10MB |
| **Supported Formats** | JPEG, PNG, WebP, HEIC |
| **Output Format** | WebP (auto-optimized) |
| **Max Dimensions** | 1200x1200 (preserves aspect ratio) |
| **Thumbnails** | 400x400, 800x800 |
| **CDN** | Cloudinary CDN |

---

## 📚 API Documentation

Full API documentation is available in the docs:

- [API Documentation](../docs/api-documentation.md)
- [Storage Testing Guide](../docs/storage-testing-guide.md)
- [Project Setup Guide](../docs/project-setup.md)

### Available Endpoints

**Note:** This backend uses API versioning. All new endpoints are under `/api/v1/`. Legacy endpoints under `/api/` are maintained for backward compatibility but deprecated.

#### ✅ Implemented Endpoints

1. **Authentication** (`/api/v1/auth` or `/api/auth` - legacy)
   - ✅ POST `/api/v1/auth/register` - Register new user
   - ✅ POST `/api/v1/auth/login` - User login

2. **Storage** (`/api/v1/storage` or `/api/storage` - legacy)
   - ✅ POST `/api/v1/storage/upload` - Upload image
   - ✅ DELETE `/api/v1/storage/delete` - Delete image

#### 🚧 Planned Endpoints (Documented but not yet implemented)

3. **Gems** (`/api/v1/gems`)
   - 🚧 GET `/api/v1/gems` - List all gems
   - 🚧 POST `/api/v1/gems` - Create new gem
   - 🚧 GET `/api/v1/gems/{id}` - Get gem details
   - 🚧 PUT `/api/v1/gems/{id}` - Update gem
   - 🚧 DELETE `/api/v1/gems/{id}` - Delete gem

4. **Krawls** (`/api/v1/krawls`)
   - 🚧 GET `/api/v1/krawls` - List all krawls
   - 🚧 POST `/api/v1/krawls` - Create new krawl
   - 🚧 GET `/api/v1/krawls/{id}` - Get krawl details
   - 🚧 PUT `/api/v1/krawls/{id}` - Update krawl
   - 🚧 DELETE `/api/v1/krawls/{id}` - Delete krawl

5. **Community** (`/api/v1/gems/{id}/...`)
   - 🚧 POST `/api/v1/gems/{id}/vouch` - Vouch for a gem
   - 🚧 POST `/api/v1/gems/{id}/ratings` - Rate a gem
   - 🚧 POST `/api/v1/gems/{id}/reports` - Report a gem

For complete API documentation, see [API Documentation](../docs/api-documentation.md).

---

## 🗄️ Database

### Connection Details

| Parameter | Value |
|-----------|-------|
| **Host** | localhost |
| **Port** | 5434 |
| **Database** | krawl |
| **Username** | krawl_user (from .env) |
| **Password** | krawl_dev_password_2025 (from .env) |

### Schema Management

Database schema is managed by **Flyway** migrations located in:

```
src/main/resources/db/migration/
```

Migrations run automatically on application startup.

### PostGIS Extension

The PostGIS extension for spatial data is automatically enabled via:

```
init-scripts/01-init-postgis.sql
```

---

## 🧪 Testing

### Test Storage Endpoints

```bash
# Test upload
curl -X POST http://localhost:8080/api/v1/storage/upload \
  -F "file=@test-image.jpg"

# Test delete
curl -X DELETE "http://localhost:8080/api/v1/storage/delete?url=<image-url>"
```

See [Storage Testing Guide](../docs/storage-testing-guide.md) for comprehensive testing instructions.

---

## 📝 Development

### Build Project

```bash
./mvnw clean package
```

### Run Tests

```bash
./mvnw test
```

### Check Dependencies

```bash
./mvnw dependency:tree
```

---

## 🐛 Troubleshooting

### Port Already in Use

Change the port in `.env`:

```env
SERVER_PORT=8081
```

### Database Connection Failed

1. Check Docker container is running: `docker ps`
2. Verify credentials in `.env`
3. Ensure PostgreSQL is accepting connections on port 5434

### Cloudinary Upload Fails

1. Verify credentials in `.env`
2. Check internet connection
3. Verify file size is under 10MB
4. Ensure file is a valid image format

---

## 📚 Related Documentation

- [Project Setup Guide](../docs/project-setup.md)
- [API Documentation](../docs/api-documentation.md)
- [Storage Testing Guide](../docs/storage-testing-guide.md)
- [Database Schema](../docs/database-schema.md)
- [System Architecture](../docs/system-architecture.md)

---

## 📄 License

Copyright © 2025 Krawl Team

---

*Backend maintained by Backend Team • Last updated: 2025-10-29*


