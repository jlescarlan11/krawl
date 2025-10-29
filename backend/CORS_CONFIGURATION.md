# CORS Configuration Guide

## Overview

This application uses **externalized CORS configuration**, allowing you to change allowed origins without rebuilding the application. This follows the [12-Factor App](https://12factor.net/config) methodology and industry best practices.

## Quick Start

### Local Development

The default configuration works out of the box for local development:
- `http://localhost:3000`
- `http://localhost:3001`

```bash
# Just run the application
./mvnw spring-boot:run
```

### Custom Origins

Set the `CORS_ALLOWED_ORIGINS` environment variable:

**Linux/Mac:**
```bash
export CORS_ALLOWED_ORIGINS=http://localhost:3000,https://my-preview.vercel.app
./mvnw spring-boot:run
```

**Windows PowerShell:**
```powershell
$env:CORS_ALLOWED_ORIGINS="http://localhost:3000,https://my-preview.vercel.app"
./mvnw spring-boot:run
```

## Configuration Files

### application.yaml (Default)
```yaml
cors:
  allowed-origins: ${CORS_ALLOWED_ORIGINS:http://localhost:3000,http://localhost:3001}
  allowed-methods: GET,POST,PUT,DELETE,OPTIONS,PATCH
  allowed-headers: "*"
  allow-credentials: true
  max-age: 3600
```

### application-dev.yaml (Development Profile)
Activated with: `SPRING_PROFILES_ACTIVE=dev`

Includes additional local development origins:
- `http://localhost:3000`
- `http://localhost:3001`
- `http://127.0.0.1:3000`

### application-prod.yaml (Production Profile)
Activated with: `SPRING_PROFILES_ACTIVE=prod`

Features:
- Requires explicit `CORS_ALLOWED_ORIGINS` environment variable
- Reduced logging for better performance
- Disabled SQL query logging

## Environment Variables

### CORS_ALLOWED_ORIGINS

**Format:** Comma-separated list of URLs (no spaces)

**Examples:**

```bash
# Single origin
CORS_ALLOWED_ORIGINS=https://krawl.app

# Multiple origins
CORS_ALLOWED_ORIGINS=https://krawl.app,https://www.krawl.app,https://admin.krawl.app

# With Vercel preview URLs
CORS_ALLOWED_ORIGINS=https://krawl.vercel.app,https://preview-*.vercel.app

# Local development with multiple ports
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:3001,http://127.0.0.1:3000
```

### SPRING_PROFILES_ACTIVE

**Options:** `dev`, `prod`

Controls which `application-{profile}.yaml` file is loaded.

## Deployment Examples

### Local Development

```bash
# Option 1: Use default configuration
./mvnw spring-boot:run

# Option 2: Use dev profile
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev

# Option 3: Custom origins
export CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:8080
./mvnw spring-boot:run
```

### Staging Environment

```bash
export CORS_ALLOWED_ORIGINS=https://staging.krawl.com,https://test.krawl.com
export SPRING_PROFILES_ACTIVE=prod
./mvnw spring-boot:run
```

### Production Environment

```bash
export CORS_ALLOWED_ORIGINS=https://krawl.app,https://www.krawl.app
export SPRING_PROFILES_ACTIVE=prod
java -jar backend.jar
```

### Docker

```dockerfile
# Dockerfile
ENV CORS_ALLOWED_ORIGINS=https://krawl.app
ENV SPRING_PROFILES_ACTIVE=prod
```

Or with docker-compose:

```yaml
# docker-compose.yml
services:
  backend:
    environment:
      - CORS_ALLOWED_ORIGINS=https://krawl.app,https://www.krawl.app
      - SPRING_PROFILES_ACTIVE=prod
```

### Cloud Platforms

#### Render
1. Go to Environment section
2. Add environment variable: `CORS_ALLOWED_ORIGINS`
3. Value: `https://krawl.vercel.app,https://www.krawl.vercel.app`

#### Heroku
```bash
heroku config:set CORS_ALLOWED_ORIGINS=https://krawl.app,https://www.krawl.app
heroku config:set SPRING_PROFILES_ACTIVE=prod
```

#### AWS Elastic Beanstalk
Add to `.ebextensions/environment.config`:
```yaml
option_settings:
  - option_name: CORS_ALLOWED_ORIGINS
    value: https://krawl.app,https://www.krawl.app
  - option_name: SPRING_PROFILES_ACTIVE
    value: prod
```

## Troubleshooting

### Check Active Configuration

When the application starts, look for this log line:
```
INFO: Configuring CORS with allowed origins: https://krawl.app,https://www.krawl.app
```

This shows exactly which origins are allowed.

### Common Issues

**Issue:** CORS error in browser
```
Access to fetch at 'http://localhost:8080/api/...' from origin 'http://localhost:3000' has been blocked by CORS policy
```

**Solution:**
1. Check the backend logs for: `Configuring CORS with allowed origins:`
2. Verify your frontend URL is in the allowed origins list
3. Make sure there are no spaces in the `CORS_ALLOWED_ORIGINS` value
4. Restart the backend after changing environment variables

**Issue:** Changes not taking effect

**Solution:**
- Environment variables are read at startup only
- Restart the application after changing values
- Verify environment variable is set: `echo $CORS_ALLOWED_ORIGINS`

**Issue:** Wildcard not working

**Note:** Spring's CORS implementation doesn't support wildcards in domains
- ❌ Won't work: `https://*.vercel.app`
- ✅ Will work: List each preview URL separately

## Security Best Practices

### ✅ DO

- Use specific origins in production
- Keep production origins in environment variables (not in code)
- Use different origins for different environments
- Review and update allowed origins regularly
- Use HTTPS origins in production

### ❌ DON'T

- Don't use `*` (allow all origins) in production
- Don't commit production URLs to git
- Don't allow HTTP origins in production
- Don't allow unnecessary origins

## Testing CORS

### Browser Console
```javascript
fetch('http://localhost:8080/api/health')
  .then(res => res.json())
  .then(data => console.log('Success:', data))
  .catch(err => console.error('CORS Error:', err));
```

### curl
```bash
curl -H "Origin: http://localhost:3000" \
     -H "Access-Control-Request-Method: GET" \
     -X OPTIONS \
     --verbose \
     http://localhost:8080/api/health
```

Look for these headers in the response:
```
Access-Control-Allow-Origin: http://localhost:3000
Access-Control-Allow-Credentials: true
```

## Additional Resources

- [Spring CORS Documentation](https://docs.spring.io/spring-framework/reference/web/webmvc-cors.html)
- [MDN CORS Guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [12-Factor App Config](https://12factor.net/config)

## Support

If you encounter issues:
1. Check the backend logs for the CORS configuration line
2. Verify environment variables are set correctly
3. Ensure the frontend URL exactly matches the allowed origin
4. Check for typos (no spaces, correct protocol, correct port)

