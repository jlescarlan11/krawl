// Centralized constants for the application

export const API_CONSTANTS = {
  CONNECTIVITY_CACHE_MS: 5000,
  RETRY_DELAY_MS: 1000,
  MAX_RETRIES: 3,
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

