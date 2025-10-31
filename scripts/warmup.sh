#!/bin/bash
# Warmup script for Krawl backend
# 
# This script can be used by external monitoring services (UptimeRobot, Healthchecks.io, etc.)
# to keep the backend instance warm and prevent cold starts.
#
# Usage:
#   ./scripts/warmup.sh
#   Or set BACKEND_URL environment variable:
#   BACKEND_URL=https://your-backend.onrender.com ./scripts/warmup.sh
#
# Set this up in:
# - UptimeRobot (free): https://uptimerobot.com
# - Healthchecks.io (free tier available)
# - GitHub Actions (schedule workflow)
# - Any cron service that can make HTTP requests

set -euo pipefail

# Default backend URL (update this to your actual backend URL)
BACKEND_URL="${BACKEND_URL:-https://krawl.onrender.com}"

# Health check endpoint
HEALTH_ENDPOINT="${BACKEND_URL}/api/health"
WARMUP_ENDPOINT="${BACKEND_URL}/api/health/warmup"

echo "🔥 Warming up Krawl backend..."
echo "📍 Backend URL: ${BACKEND_URL}"
echo ""

# First, check if backend is responding
echo "1️⃣ Checking backend health..."
if curl -f -s -m 10 "${HEALTH_ENDPOINT}" > /dev/null; then
    echo "   ✅ Backend is healthy"
else
    echo "   ❌ Backend health check failed"
    exit 1
fi

# Then warm it up
echo "2️⃣ Warming up backend instance..."
if curl -f -s -m 30 "${WARMUP_ENDPOINT}" > /dev/null; then
    echo "   ✅ Backend warmed up successfully"
    echo ""
    echo "🎉 All checks passed at $(date)"
    exit 0
else
    echo "   ⚠️  Warmup request failed (backend might be starting up)"
    # Don't fail - backend might be restarting
    exit 0
fi

