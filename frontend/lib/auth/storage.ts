/**
 * Centralized authentication storage management
 * 
 * Handles localStorage and sessionStorage for auth tokens and user data.
 * Provides a single source of truth for auth storage operations.
 */

import type { User } from '@/lib/auth';
import { STORAGE_KEYS } from '@/lib/constants';

export interface AuthData {
  token: string;
  user: User;
}

const AUTH_STORAGE_KEY = STORAGE_KEYS.AUTH;

/**
 * Gets the current storage type being used (localStorage or sessionStorage)
 */
function getStorageType(): 'localStorage' | 'sessionStorage' | null {
  if (typeof window === 'undefined') return null;
  
  if (window.localStorage.getItem(AUTH_STORAGE_KEY)) {
    return 'localStorage';
  }
  if (window.sessionStorage.getItem(AUTH_STORAGE_KEY)) {
    return 'sessionStorage';
  }
  return null;
}

/**
 * Gets the appropriate storage object based on current auth storage
 */
function getStorage(): Storage | null {
  if (typeof window === 'undefined') return null;
  
  const storageType = getStorageType();
  if (storageType === 'localStorage') {
    return window.localStorage;
  }
  if (storageType === 'sessionStorage') {
    return window.sessionStorage;
  }
  return null;
}

/**
 * Retrieves auth data from storage
 * Checks localStorage first, then sessionStorage
 */
export function getAuthData(): AuthData | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const raw = window.localStorage.getItem(AUTH_STORAGE_KEY) || 
                window.sessionStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return null;
    
    return JSON.parse(raw) as AuthData;
  } catch (error) {
    console.error('Failed to parse auth data from storage:', error);
    return null;
  }
}

/**
 * Gets the auth token from storage
 */
export function getAuthToken(): string | null {
  const authData = getAuthData();
  return authData?.token ?? null;
}

/**
 * Saves auth data to storage
 * @param token - JWT token
 * @param user - User object
 * @param remember - If true, use localStorage; if false, use sessionStorage
 */
export function setAuthData(token: string, user: User, remember: boolean = false): void {
  if (typeof window === 'undefined') return;
  
  const authData: AuthData = { token, user };
  const payload = JSON.stringify(authData);
  
  if (remember) {
    // Persist across browser sessions
    window.localStorage.setItem(AUTH_STORAGE_KEY, payload);
    window.sessionStorage.removeItem(AUTH_STORAGE_KEY);
  } else {
    // Store in sessionStorage only (clears when tab closes)
    window.sessionStorage.setItem(AUTH_STORAGE_KEY, payload);
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
  }
}

/**
 * Updates only the token while preserving user data and storage type
 */
export function updateAuthToken(token: string): void {
  if (typeof window === 'undefined') return;
  
  const currentAuth = getAuthData();
  if (!currentAuth) return;
  
  const storageType = getStorageType();
  if (storageType === 'localStorage') {
    setAuthData(token, currentAuth.user, true);
  } else if (storageType === 'sessionStorage') {
    setAuthData(token, currentAuth.user, false);
  }
}

/**
 * Clears auth data from both storage types
 */
export function clearAuthData(): void {
  if (typeof window === 'undefined') return;
  
  window.localStorage.removeItem(AUTH_STORAGE_KEY);
  window.sessionStorage.removeItem(AUTH_STORAGE_KEY);
}

/**
 * Updates user data while preserving token and storage type
 */
export function updateAuthUser(user: User): void {
  if (typeof window === 'undefined') return;
  
  const currentAuth = getAuthData();
  if (!currentAuth) return;
  
  const storageType = getStorageType();
  if (storageType === 'localStorage') {
    setAuthData(currentAuth.token, user, true);
  } else if (storageType === 'sessionStorage') {
    setAuthData(currentAuth.token, user, false);
  }
}

