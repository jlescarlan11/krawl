# Cold Start Optimization Guide

This document explains the cold start optimization strategies implemented for the Krawl application deployed on Render and Supabase.

## Overview

Cold starts occur when Render scales your service down to zero instances during periods of inactivity, and then needs to spin up a new instance when a request comes in. This can cause 30-60 second delays for users.

## Solution Implemented

We've implemented a **multi-layered approach** to minimize cold starts:

1. **Keep Instances Warm** - Always keep at least 1 instance running
2. **Automated Warmup** - Cron job pings warmup endpoint every 5 minutes
3. **Startup Optimizations** - Fast application startup configuration
4. **Health Checks** - Proper health endpoints for monitoring

## Components

### 1. Health Endpoints

**Backend (`/api/health`)**:
- Lightweight health check for load balancers
- Returns `{status: "UP", timestamp: "..."}`

**Backend (`/api/health/warmup`)**:
- Warms up critical components (database connection pool, JPA)
- Called by cron jobs to prevent idle shutdown
- Returns `{status: "WARMED", timestamp: "...", message: "..."}`

**Frontend (`/api/health`)**:
- Health check for frontend service
- Returns `{status: "UP", timestamp: "...", service: "krawl-frontend"}`

### 2. Render Configuration (`render.yaml`)

Key settings:
- **`minInstances: 1`** - Critical setting that keeps at least 1 instance always running
- **Health check paths** - `/actuator/health` for backend, `/api/health` for frontend
- **Cron job** - Runs every 5 minutes to ping warmup endpoint

### 3. Application Optimizations

**Backend (`application.yaml` / `application-prod.yaml`)**:
- Reduced Hibernate metadata scanning (`temp.use_jdbc_metadata_defaults: false`)
- Optimized connection pool settings
- Production logging reduced for faster startup

**Dockerfile**:
- JVM optimizations for containers (`-XX:+UseContainerSupport`)
- G1 garbage collector for better memory management
- Container-aware memory limits

**Frontend (`next.config.ts`)**:
- SWC minification enabled
- Console log removal in production
- Package import optimization

## Setup Instructions

### Initial Setup

1. **Deploy services using `render.yaml`**:
   ```bash
   # In Render dashboard:
   # New > Blueprint > Connect your repository
   # Render will auto-detect render.yaml
   ```

2. **Update environment variables** in Render dashboard:
   - Backend: `JWT_SECRET`, `CLOUDINARY_*`, `CORS_ALLOWED_ORIGINS`, etc.
   - Frontend: `NEXT_PUBLIC_API_URL` (your backend URL)
   - Cron job: `BACKEND_URL` (update after backend deploys)

3. **Verify scaling settings**:
   - Backend: `minInstances: 1` ✅
   - Frontend: `minInstances: 1` ✅

### Alternative: External Warmup Service

If Render cron jobs aren't available on your plan, use external monitoring:

1. **UptimeRobot** (Free tier):
   - URL: `https://your-backend.onrender.com/api/health/warmup`
   - Interval: 5 minutes
   - Alert contacts: Optional

2. **Healthchecks.io**:
   - Similar setup to UptimeRobot
   - Better integration with monitoring dashboards

3. **GitHub Actions** (Free for public repos):
   ```yaml
   # .github/workflows/warmup.yml
   name: Warmup Backend
   on:
     schedule:
       - cron: '*/5 * * * *'  # Every 5 minutes
   jobs:
     warmup:
       runs-on: ubuntu-latest
       steps:
         - run: |
             curl -f https://your-backend.onrender.com/api/health/warmup
   ```

## Monitoring

### Check if Instances Stay Warm

1. **Render Dashboard**:
   - Go to your service → Metrics
   - Check "Active Instances" - should always show ≥ 1

2. **Health Check Logs**:
   - Monitor `/api/health/warmup` responses
   - Should return quickly (< 100ms) if warm
   - Slower responses (> 1s) indicate cold start

3. **Application Logs**:
   - Look for "Started BackendApplication" messages
   - Frequent restarts indicate scaling issues

## Troubleshooting

### Cold Starts Still Happening?

1. **Check `minInstances` setting**:
   ```bash
   # In Render dashboard → Your Service → Settings → Scaling
   # Ensure "Minimum Instances" is set to 1
   ```

2. **Verify cron job is running**:
   - Check Render dashboard → Cron Jobs → Logs
   - Should see successful warmup requests every 5 minutes

3. **Check plan limits**:
   - Free tier may have restrictions
   - Consider upgrading to "Starter" plan ($7/month) for guaranteed instance persistence

### Warmup Endpoint Not Working?

1. **Security configuration**:
   - Ensure `/api/health/**` is permitted in `SecurityConfig`
   - Should be publicly accessible (no authentication required)

2. **Network issues**:
   - Cron job might be blocked by firewall
   - Check Render cron job logs for errors

### High Costs?

If keeping instances always-on is too expensive:

1. **Use external warmup service** (free):
   - UptimeRobot or Healthchecks.io
   - Still set `minInstances: 1`, but external service provides backup

2. **Optimize instance size**:
   - Use smallest instance that works
   - Monitor actual resource usage

## Cost Considerations

- **Free tier**: May spin down after 15 minutes of inactivity (even with cron)
- **Starter plan** ($7/month): Better instance persistence
- **Cron jobs**: Free on all plans
- **External monitoring**: Free tiers available (UptimeRobot, Healthchecks.io)

## Best Practices

1. ✅ **Always set `minInstances: 1`** for user-facing services
2. ✅ **Use health checks** for proper load balancer integration
3. ✅ **Monitor warmup endpoint** to ensure it's being called
4. ✅ **Test cold starts** by manually stopping/starting service
5. ✅ **Document your setup** so team knows how it works

## Future Improvements

If cold starts remain an issue, consider:

1. **Edge Functions**: Move stateless endpoints to Supabase Edge Functions or Cloudflare Workers
2. **Spring Native**: Use GraalVM for native images (faster startup)
3. **CDN + Static Pages**: Pre-render pages that don't need server-side rendering
4. **Connection Pooling**: Use Supabase connection pooling for database connections

## References

- [Render Scaling Documentation](https://render.com/docs/scaling)
- [Spring Boot Production Ready Features](https://spring.io/guides/gs/actuator-service/)
- [Next.js Production Optimization](https://nextjs.org/docs/advanced-features/measuring-performance)

