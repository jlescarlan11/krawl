// Centralized constants for the application

export const API_CONSTANTS = {
  CONNECTIVITY_CACHE_MS: 5000,
  RETRY_DELAY_MS: 1000,
  MAX_RETRIES: 3,
} as const;

export const AUTH_CONSTANTS = {
  TOKEN_REFRESH_THRESHOLD_MS: 5 * 60 * 1000, // 5 minutes
  TOKEN_CHECK_INTERVAL_MS: 60 * 1000, // 1 minute
} as const;

export const STORAGE_KEYS = {
  AUTH: 'auth',
} as const;

export const ROUTES = {
  HOME: '/',
  EXPLORE: '/explore',
  KRAWLS: '/krawls',
  ADD: '/add',
  PROFILE: '/profile',
  OFFLINE: '/offline',
} as const;

export const SYNC_CONSTANTS = {
  DEFAULT_RETRY_DELAY: 1000,
  MAX_RETRY_COUNT: 5,
} as const;

