# 📸 Storage Service Testing Guide

> **Purpose:** This guide provides instructions for testing the Cloudinary storage integration, including upload and delete operations.

**Version:** 0.1.0-MVP  
**Last Updated:** 2025-10-31  
**Status:** Active  
**Owner:** Backend Team

---

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Test Upload Endpoint](#test-upload-endpoint)
3. [Test Delete Endpoint](#test-delete-endpoint)
4. [Verification Steps](#verification-steps)
5. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before testing, ensure you have:

- ✅ Backend server running on `http://localhost:8080`
- ✅ Cloudinary credentials configured in `.env` file
- ✅ Test image file (JPEG, PNG, WebP, or HEIC format, max 10MB)
- ✅ API testing tool (cURL, Postman, or similar)

---

## Test Upload Endpoint

### Using cURL

#### Basic Upload

```bash
# Navigate to a directory with a test image
curl -X POST http://localhost:8080/api/v1/storage/upload \
  -F "file=@test-image.jpg"
```

#### Upload with Gem ID

```bash
curl -X POST http://localhost:8080/api/v1/storage/upload \
  -F "file=@test-image.jpg" \
  -F "gemId=123e4567-e89b-12d3-a456-426614174000"
```

#### Expected Success Response

```json
{
  "url": "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/krawl-gems/123e4567-e89b-12d3-a456-426614174000/uuid.webp",
  "message": "Image uploaded successfully"
}
```

#### Expected Error Responses

**Empty File:**
```json
{
  "error": "File is empty"
}
```

**File Too Large (>10MB):**
```json
{
  "error": "File size exceeds 10MB limit"
}
```

**Invalid File Type:**
```json
{
  "error": "Unsupported image format. Allowed: JPEG, PNG, WebP, HEIC"
}
```

### Using Postman

1. **Create New Request:**
   - Method: `POST`
   - URL: `http://localhost:8080/api/v1/storage/upload`

2. **Configure Body:**
   - Select `form-data`
   - Add key `file` with type `File`, select your test image
   - (Optional) Add key `gemId` with type `Text`, enter a valid UUID

3. **Send Request:**
   - Click "Send"
   - Verify response contains `url` and `message` fields

### Using PowerShell (Windows)

```powershell
# Create form data
$form = @{
    file = Get-Item -Path "test-image.jpg"
    gemId = "123e4567-e89b-12d3-a456-426614174000"
}

# Send request
Invoke-RestMethod -Uri "http://localhost:8080/api/v1/storage/upload" `
    -Method Post -Form $form
```

---

## Test Delete Endpoint

### Using cURL

```bash
# Replace with actual image URL from upload response
curl -X DELETE "http://localhost:8080/api/v1/storage/delete?url=https://res.cloudinary.com/your-cloud/image/upload/v1234567890/krawl-gems/123e4567-e89b-12d3-a456-426614174000/uuid.webp"
```

### Expected Success Response

```json
{
  "message": "Image deleted successfully"
}
```

### Using Postman

1. **Create New Request:**
   - Method: `DELETE`
   - URL: `http://localhost:8080/api/v1/storage/delete`

2. **Add Query Parameter:**
   - Key: `url`
   - Value: `https://res.cloudinary.com/your-cloud/image/upload/...`

3. **Send Request:**
   - Verify response contains success message

### Using PowerShell (Windows)

```powershell
# URL encode the image URL
$imageUrl = "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/krawl-gems/123e4567-e89b-12d3-a456-426614174000/uuid.webp"
$encodedUrl = [System.Web.HttpUtility]::UrlEncode($imageUrl)

# Send delete request
Invoke-RestMethod -Uri "http://localhost:8080/api/v1/storage/delete?url=$encodedUrl" `
    -Method Delete
```

---

## Verification Steps

### 1. Upload Verification

After successful upload:

- ✅ Copy the returned URL
- ✅ Open the URL in a browser
- ✅ Verify the image loads correctly
- ✅ Check image is in WebP format
- ✅ Verify image quality is good

### 2. Cloudinary Dashboard Verification

1. Log in to [Cloudinary Console](https://cloudinary.com/console)
2. Navigate to **Media Library**
3. Look for folder `krawl-gems` (or your configured folder name)
4. Verify uploaded images appear in the folder
5. Check that thumbnails are generated (400x400 and 800x800)

### 3. Image Optimization Verification

Check the uploaded image:

- **Format:** Should be `.webp`
- **Max Size:** Should not exceed 1200x1200 pixels
- **Quality:** Should have good visual quality
- **File Size:** Should be optimized (smaller than original)

### 4. Delete Verification

After successful delete:

- ✅ Try accessing the URL in browser
- ✅ Should return 404 or "Resource not found"
- ✅ Verify image is removed from Cloudinary Media Library

---

## Troubleshooting

### 401 Unauthorized / 403 Forbidden

**Problem:** Invalid Cloudinary credentials

**Solution:**
1. Verify credentials in `.env` file
2. Check Cloudinary dashboard for correct values
3. Restart backend server after updating `.env`

### Connection Refused

**Problem:** Backend server not running

**Solution:**
```bash
# Start backend server
cd backend
./mvnw spring-boot:run
```

### Invalid Gem ID

**Problem:** Provided gemId is not a valid UUID

**Solution:**
- Use valid UUID format: `123e4567-e89b-12d3-a456-426614174000`
- Or omit gemId parameter to auto-generate

### Image Upload Fails

**Check:**
- ✅ File is a valid image (JPEG, PNG, WebP, HEIC)
- ✅ File size is under 10MB
- ✅ File is not corrupted
- ✅ CORS is configured correctly
- ✅ Internet connection is available (for Cloudinary upload)

### Delete Fails

**Check:**
- ✅ URL is from Cloudinary (contains `cloudinary.com`)
- ✅ URL is properly encoded
- ✅ Image exists in Cloudinary
- ✅ Credentials have delete permissions

---

## Complete Test Workflow

### End-to-End Test

```bash
# 1. Upload a test image
echo "Testing upload..."
UPLOAD_RESPONSE=$(curl -X POST http://localhost:8080/api/v1/storage/upload \
  -F "file=@test-image.jpg" \
  -F "gemId=123e4567-e89b-12d3-a456-426614174000")

echo "Upload Response: $UPLOAD_RESPONSE"

# 2. Extract URL from response (requires jq)
IMAGE_URL=$(echo $UPLOAD_RESPONSE | jq -r '.url')
echo "Image URL: $IMAGE_URL"

# 3. Verify image is accessible
echo "Verifying image..."
curl -I "$IMAGE_URL"

# 4. Delete the image
echo "Testing delete..."
DELETE_RESPONSE=$(curl -X DELETE "http://localhost:8080/api/v1/storage/delete?url=$IMAGE_URL")
echo "Delete Response: $DELETE_RESPONSE"

# 5. Verify image is deleted (should return 404)
echo "Verifying deletion..."
curl -I "$IMAGE_URL"
```

### Expected Output

```
Testing upload...
Upload Response: {"url":"https://res.cloudinary.com/...","message":"Image uploaded successfully"}
Image URL: https://res.cloudinary.com/...
Verifying image...
HTTP/2 200
Testing delete...
Delete Response: {"message":"Image deleted successfully"}
Verifying deletion...
HTTP/2 404
```

---

## Additional Tests

### Test Multiple Formats

```bash
# Test JPEG
curl -X POST http://localhost:8080/api/v1/storage/upload -F "file=@test.jpg"

# Test PNG
curl -X POST http://localhost:8080/api/v1/storage/upload -F "file=@test.png"

# Test WebP
curl -X POST http://localhost:8080/api/v1/storage/upload -F "file=@test.webp"

# Test HEIC (if available)
curl -X POST http://localhost:8080/api/v1/storage/upload -F "file=@test.heic"
```

### Test File Size Limits

```bash
# Test small file (should succeed)
curl -X POST http://localhost:8080/api/v1/storage/upload -F "file=@small-image.jpg"

# Test large file (should fail if > 10MB)
curl -X POST http://localhost:8080/api/v1/storage/upload -F "file=@large-image.jpg"
```

### Test Invalid Inputs

```bash
# Test with no file (should fail)
curl -X POST http://localhost:8080/api/v1/storage/upload

# Test with invalid file type (should fail)
curl -X POST http://localhost:8080/api/v1/storage/upload -F "file=@document.pdf"

# Test with invalid UUID (should fail)
curl -X POST http://localhost:8080/api/v1/storage/upload \
  -F "file=@test.jpg" \
  -F "gemId=invalid-uuid"
```

---

## Performance Testing

### Batch Upload Test

```bash
# Upload multiple images
for i in {1..5}; do
  echo "Uploading image $i..."
  curl -X POST http://localhost:8080/api/v1/storage/upload \
    -F "file=@test-image-$i.jpg"
  echo ""
done
```

### Measure Upload Time

```bash
# Time the upload
time curl -X POST http://localhost:8080/api/v1/storage/upload \
  -F "file=@test-image.jpg"
```

---

## Success Checklist

After completing all tests, verify:

- ✅ Upload endpoint accepts valid images
- ✅ Upload endpoint rejects invalid files
- ✅ Upload endpoint validates file size
- ✅ Upload endpoint validates file type
- ✅ Images are optimized to WebP format
- ✅ Images are resized if larger than 1200x1200
- ✅ Thumbnails are generated automatically
- ✅ Uploaded images are accessible via CDN
- ✅ Delete endpoint removes images from Cloudinary
- ✅ CORS allows uploads from frontend
- ✅ Error messages are clear and helpful

---

## Related Documents

- [Project Setup Guide](./project-setup.md) - Initial configuration
- [API Documentation](./api-documentation.md) - Complete API reference
- [System Architecture](./system-architecture.md) - System design

---

*Document maintained by Backend Team • Last reviewed: 2025-10-29*


