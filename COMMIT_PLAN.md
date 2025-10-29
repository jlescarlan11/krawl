# Commit Plan for PS-11: Configure External Storage Service

## Branch
```bash
git checkout -b feature/PS-11-configure-external-storage
```

## Commit 1: Backend - Add Cloudinary dependencies and configuration

```bash
git add backend/pom.xml
git add backend/src/main/resources/application.yaml
git add backend/src/main/java/com/krawl/backend/config/CloudinaryConfig.java
git add backend/src/main/java/com/krawl/backend/config/CorsConfig.java

git commit -m "feat(storage): add Cloudinary configuration and dependencies

- Added cloudinary-http44 and cloudinary-taglib dependencies to pom.xml
- Configured Cloudinary credentials via environment variables
- Created CloudinaryConfig bean for Spring integration
- Added CorsConfig to allow frontend uploads
- Configured multipart file upload (max 10MB)

Relates to PS-11"
```

## Commit 2: Backend - Implement storage service and endpoints

```bash
git add backend/src/main/java/com/krawl/backend/service/StorageService.java
git add backend/src/main/java/com/krawl/backend/controller/StorageController.java

git commit -m "feat(storage): implement image upload and delete endpoints

- Created StorageService with Cloudinary integration
- Automatic image optimization (WebP, quality:auto:good)
- Smart resizing (max 1200x1200, preserves aspect ratio)
- Thumbnail generation (400x400 and 800x800)
- File validation (type, size, format)
- Created StorageController with upload and delete endpoints
- POST /api/storage/upload - Upload images with optimization
- DELETE /api/storage/delete - Delete images from Cloudinary

Relates to PS-11"
```

## Commit 3: Documentation - Add storage configuration and testing guides

```bash
git add backend/README.md
git add docs/storage-testing-guide.md
git add docs/api-documentation.md
git add docs/project-setup.md

git commit -m "docs(storage): add comprehensive storage documentation

- Created backend README with storage service details
- Added storage-testing-guide.md with test commands and examples
- Updated api-documentation.md with storage endpoints
- Updated project-setup.md with Cloudinary configuration steps
- Documented image optimization features and CDN details

Relates to PS-11"
```

## Push to Remote

```bash
git push origin feature/PS-11-configure-external-storage
```

## Open Pull Request

Title: `feat(storage): configure Cloudinary external storage service`

Description:
```markdown
## Description
Implements external storage service using Cloudinary for hosting user-uploaded Gem photos with automatic optimization.

## Related Task
Closes PS-11

## Type of Change
- [x] Feature
- [ ] Bug Fix
- [ ] Chore/Refactor
- [ ] Documentation

## Implementation Details

### Backend
- ✅ Cloudinary integration with Spring Boot
- ✅ Image upload endpoint with optimization
- ✅ Image delete endpoint
- ✅ Automatic WebP conversion
- ✅ Smart resizing (max 1200x1200)
- ✅ Thumbnail generation (400x400, 800x800)
- ✅ File validation (type, size)
- ✅ CORS configuration for web uploads

### Configuration
- ✅ Environment variables for Cloudinary credentials
- ✅ Max file size: 10MB
- ✅ Supported formats: JPEG, PNG, WebP, HEIC
- ✅ CDN delivery via Cloudinary

### Documentation
- ✅ Backend README with storage details
- ✅ Storage testing guide with examples
- ✅ API documentation updated
- ✅ Project setup guide updated

## Acceptance Criteria
- [x] Storage service account created (Cloudinary)
- [x] Access credentials configured in environment variables
- [x] CORS configured for web uploads
- [x] Upload and retrieval endpoints implemented
- [x] Storage configuration documented
- [x] Image optimization/resizing configured

## Testing
- [x] Tested locally with cURL
- [x] Test endpoints documented in storage-testing-guide.md
- [x] Example commands provided
- [ ] Integration tests (to be added)

## API Endpoints

**Upload:**
```bash
POST /api/storage/upload
- file (required): Image file
- gemId (optional): UUID
```

**Delete:**
```bash
DELETE /api/storage/delete?url={imageUrl}
```

## Next Steps
- Add authentication to storage endpoints
- Create integration tests
- Monitor Cloudinary usage/quota

## Checklist
- [x] Code follows project conventions
- [x] Self-reviewed code
- [x] Updated documentation
- [x] No console errors/warnings
```


