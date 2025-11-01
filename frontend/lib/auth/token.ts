/**
 * Token management utilities
 * 
 * Handles JWT token parsing, validation, and refresh logic.
 */

import { config } from '@/lib/config/env';
import { AUTH_CONSTANTS } from '@/lib/constants';
import { API_ROUTES } from '@/lib/api/routes';
import { getAuthData, setAuthData, updateAuthToken, clearAuthData } from './storage';

/**
 * Parses a JWT token and extracts the payload
 * @param token - JWT token string
 * @returns Parsed payload or null if invalid
 */
export function parseToken(token: string): { exp: number; userId: string; [key: string]: any } | null {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload;
  } catch (error) {
    console.error('Failed to parse token:', error);
    return null;
  }
}

/**
 * Checks if a token is expiring soon
 * @param token - JWT token string
 * @param thresholdMs - Threshold in milliseconds (default: from AUTH_CONSTANTS)
 * @returns true if token expires within threshold
 */
export function isTokenExpiringSoon(token: string, thresholdMs: number = AUTH_CONSTANTS.TOKEN_REFRESH_THRESHOLD_MS): boolean {
  try {
    const payload = parseToken(token);
    if (!payload || !payload.exp) {
      return true; // If we can't parse, assume expired
    }
    
    const expiry = payload.exp * 1000; // Convert to milliseconds
    const now = Date.now();
    const timeUntilExpiry = expiry - now;
    
    return timeUntilExpiry < thresholdMs;
  } catch {
    return true; // If we can't parse, assume expired
  }
}

/**
 * Token refresh state management
 */
let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

/**
 * Refreshes the access token using the refresh token from HttpOnly cookie
 * Implements deduplication to avoid concurrent refresh calls
 * 
 * @returns New access token or null if refresh failed
 */
export async function refreshAccessToken(): Promise<string | null> {
  // Deduplicate concurrent refresh calls
  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }

  isRefreshing = true;
  refreshPromise = (async () => {
    try {
      const basePath = config.api.getBasePath();
      const response = await fetch(`${basePath}${API_ROUTES.AUTH.REFRESH}`, {
        method: 'POST',
        credentials: 'include', // Important: send HttpOnly cookie
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Refresh failed');
      }

      const data = await response.json();
      const { token } = data;

      // Update stored token and user
      if (typeof window !== 'undefined' && token) {
        const currentAuth = getAuthData();
        if (currentAuth) {
          updateAuthToken(token);
          // Also update user data if provided
          if (data.userId && (data.email || data.username)) {
            setAuthData(token, {
              id: data.userId,
              email: data.email || currentAuth.user.email,
              username: data.username || currentAuth.user.username,
            }, window.localStorage.getItem('auth') !== null);
          }
        }
      }

      return token;
    } catch (error) {
      console.error('Token refresh failed:', error);
      // Clear auth on refresh failure
      clearAuthData();
      return null;
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

/**
 * Proactively refreshes token if it's expiring soon
 * Designed to be called periodically (e.g., every minute)
 * 
 * @returns Promise that resolves when refresh completes (or skips if not needed)
 */
export async function refreshTokenIfNeeded(): Promise<void> {
  const authData = getAuthData();
  if (!authData?.token) {
    return;
  }

  if (isTokenExpiringSoon(authData.token)) {
    console.log('Token expiring soon, refreshing proactively...');
    try {
      const newToken = await refreshAccessToken();
      if (newToken) {
        console.log('Token refreshed proactively');
      }
    } catch (error) {
      console.error('Proactive token refresh failed:', error);
    }
  }
}

