# API Versioning Guide

## Overview

The Krawl backend API uses URL-based versioning starting with **v1**. All new endpoints should be created under `/api/v1/`.

## Current Status

### Version 1 (Current)
- **Base Path:** `/api/v1/`
- **Status:** Active and recommended for new development
- **Controllers:**
  - `/api/v1/auth` - Authentication endpoints
  - `/api/v1/storage` - Image storage endpoints

### Legacy Endpoints (Deprecated)
- **Base Path:** `/api/`
- **Status:** Maintained for backward compatibility
- **Controllers:**
  - `/api/auth` - Authentication endpoints
  - `/api/storage` - Image storage endpoints

## Migration Path

### For Frontend/Client Applications

**Before (Legacy):**
```
POST /api/auth/register
POST /api/storage/upload
```

**After (Versioned):**
```
POST /api/v1/auth/register
POST /api/v1/storage/upload
```

### Best Practices

1. **Use Versioned Endpoints:** Always use `/api/v1/` endpoints for new integrations
2. **Backward Compatibility:** Legacy endpoints will remain available during transition period
3. **Future Versions:** When v2 is released, v1 endpoints will remain supported
4. **Documentation:** All API documentation reflects v1 endpoints

## Adding New Endpoints

When creating new controllers:

1. Place them in `controller.v1` package
2. Use `@RequestMapping("/api/v1/...")` annotation
3. Follow existing patterns for validation and error handling
4. Add comprehensive OpenAPI documentation

## Security

Both versioned and legacy endpoints share the same security configuration:
- JWT authentication required for protected endpoints
- Public GET endpoints remain accessible
- Same CORS and security policies apply

