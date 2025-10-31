import { NextResponse } from 'next/server';

/**
 * Health check endpoint for monitoring and load balancers.
 * 
 * This endpoint is used by:
 * - Render for health checks
 * - External monitoring services (UptimeRobot, etc.)
 * - Cron jobs to verify frontend is running
 * 
 * Returns a simple status to indicate the application is running.
 */
export async function GET() {
  return NextResponse.json({
    status: 'UP',
    timestamp: new Date().toISOString(),
    service: 'krawl-frontend',
  });
}

