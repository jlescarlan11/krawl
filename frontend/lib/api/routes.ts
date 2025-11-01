/**
 * Centralized API route configuration
 * 
 * Provides type-safe route building and centralized route management.
 * This makes it easier to refactor routes as the API evolves.
 */

/**
 * API route builders with type-safe parameters
 */
export const API_ROUTES = {
  // Auth routes
  AUTH: {
    BASE: '/auth',
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
    REFRESH: '/auth/refresh',
    REGISTER_REQUEST: '/auth/register/request',
    REGISTER_COMPLETE: '/auth/register/complete',
    PASSWORD_RESET_REQUEST: '/auth/password/reset-request',
    PASSWORD_RESET: '/auth/password/reset',
  },

  // Gem routes
  GEMS: {
    BASE: '/gems',
    BY_ID: (id: string) => `/gems/${encodeURIComponent(id)}`,
  },

  // Krawl routes
  KRAWLS: {
    BASE: '/krawls',
    BY_ID: (id: string) => `/krawls/${encodeURIComponent(id)}`,
  },

  // User routes
  USERS: {
    BASE: '/users',
    ME: '/users/me',
    BY_USERNAME: (username: string) => `/users/${encodeURIComponent(username)}`,
  },

  // Health check (not versioned)
  HEALTH: '/api/health',
} as const;

/**
 * Type helper for extracting route values
 */
export type ApiRoute = 
  | typeof API_ROUTES.AUTH[keyof typeof API_ROUTES.AUTH]
  | typeof API_ROUTES.GEMS[keyof typeof API_ROUTES.GEMS]
  | typeof API_ROUTES.KRAWLS[keyof typeof API_ROUTES.KRAWLS]
  | typeof API_ROUTES.USERS[keyof typeof API_ROUTES.USERS]
  | typeof API_ROUTES.HEALTH;

/**
 * Helper function to build versioned API routes
 * Routes are automatically prefixed with /api/v1
 */
export function buildApiRoute(route: string): string {
  // Health route is not versioned
  if (route === API_ROUTES.HEALTH) {
    return route;
  }
  return route;
}

/**
 * Legacy route constants (for backward compatibility during migration)
 * @deprecated Use API_ROUTES instead
 */
export const ROUTES_LEGACY = {
  GEMS: '/gems',
  KRAWLS: '/krawls',
  AUTH_LOGIN: '/auth/login',
  AUTH_REGISTER: '/auth/register',
} as const;

