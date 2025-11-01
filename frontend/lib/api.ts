import { toast } from 'sonner';
import {
  getAllGems,
  saveGems,
  getGem,
  saveGem,
  getAllKrawls,
  saveKrawls,
  getKrawl,
  saveKrawl,
  addToSyncQueue,
  type Gem,
  type Krawl,
} from './db';
import { checkActualConnectivity } from './utils/network';
import { offlineFirstFetch, createWithOfflineSupport } from './api/offline-first';
import { config } from './config/env';
import { API_CONSTANTS } from './constants';
import { ApiError } from './errors/api-error';

// Connectivity check caching to avoid checking on every request
let lastConnectivityCheck = 0;
let lastConnectivityResult = true;

// Token refresh state
let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

/**
 * Refresh access token using refresh token from HttpOnly cookie
 */
async function refreshAccessToken(): Promise<string | null> {
  // Deduplicate concurrent refresh calls
  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }

  isRefreshing = true;
  refreshPromise = (async () => {
    try {
      const basePath = config.api.getBasePath();
      const response = await fetch(`${basePath}/auth/refresh`, {
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

      // Update stored token
      if (typeof window !== 'undefined' && token) {
        const raw = window.localStorage.getItem('auth') || window.sessionStorage.getItem('auth');
        if (raw) {
          const auth = JSON.parse(raw);
          auth.token = token;
          auth.user = { id: data.userId, email: data.email, username: data.username };
          const storage = window.localStorage.getItem('auth') ? window.localStorage : window.sessionStorage;
          storage.setItem('auth', JSON.stringify(auth));
        }
      }

      return token;
    } catch (error) {
      console.error('Token refresh failed:', error);
      // Clear auth on refresh failure
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem('auth');
        window.sessionStorage.removeItem('auth');
      }
      return null;
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

// Generic fetch wrapper with error handling and automatic token refresh
export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const basePath = config.api.getBasePath();
  const url = `${basePath}${endpoint}`;
  
  // Check actual connectivity (with caching to avoid checking every request)
  const now = Date.now();
  if (now - lastConnectivityCheck > API_CONSTANTS.CONNECTIVITY_CACHE_MS) {
    try {
      // Health endpoint is not versioned on the backend, use baseURL directly
      lastConnectivityResult = await checkActualConnectivity(`${config.api.baseURL}/api/health`)
        .catch(() => checkActualConnectivity('/manifest.json'));
      lastConnectivityCheck = now;
    } catch {
      lastConnectivityResult = false;
    }
  }

  if (!lastConnectivityResult) {
    console.log('📴 Offline - server unreachable');
    throw ApiError.fromNetworkError(new Error('OFFLINE'));
  }

  
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  // Attach JWT if present (from either localStorage or sessionStorage)
  let authHeader: Record<string, string> = {};
  if (typeof window !== 'undefined') {
    try {
      const raw = window.localStorage.getItem('auth') || window.sessionStorage.getItem('auth');
      if (raw) {
        const { token } = JSON.parse(raw);
        if (token) authHeader.Authorization = `Bearer ${token}`;
      }
    } catch {}
  }

  try {
    const response = await fetch(url, {
      ...options,
      credentials: 'include', // Include cookies for refresh token
      headers: {
        ...defaultHeaders,
        ...authHeader,            // include the Authorization header
        ...options?.headers,
      },
    });

    // Handle 401 with token refresh (except for refresh endpoint itself)
    if (response.status === 401 && !endpoint.includes('/auth/refresh')) {
      console.log('Received 401, attempting token refresh...');
      
      const newToken = await refreshAccessToken();
      
      if (newToken) {
        // Retry original request with new token
        console.log('Token refreshed, retrying request...');
        return fetch(url, {
          ...options,
          credentials: 'include',
          headers: {
            ...defaultHeaders,
            Authorization: `Bearer ${newToken}`,
            ...options?.headers,
          },
        }).then(async (retryResponse) => {
          if (!retryResponse.ok) {
            const apiError = await ApiError.fromResponse(retryResponse);
            toast.error(apiError.message);
            throw apiError;
          }
          
          // Handle successful retry response
          const contentType = retryResponse.headers.get('content-type') || '';
          const hasJsonBody = contentType.includes('application/json');
          
          if (retryResponse.status === 204 || !hasJsonBody) {
            return undefined as unknown as T;
          }

          const text = await retryResponse.text();
          if (!text.trim()) {
            return undefined as unknown as T;
          }

          try {
            return JSON.parse(text) as T;
          } catch (e) {
            console.warn('Failed to parse JSON response:', e);
            return undefined as unknown as T;
          }
        });
      } else {
        // Refresh failed, clear auth
        if (typeof window !== 'undefined') {
          window.localStorage.removeItem('auth');
          window.sessionStorage.removeItem('auth');
        }
        const apiError = await ApiError.fromResponse(response);
        toast.error(apiError.message);
        throw apiError;
      }
    }

    if (!response.ok) {
      const apiError = await ApiError.fromResponse(response);
      toast.error(apiError.message);
      throw apiError;
    }

    // Check if response has a body before parsing JSON
    const contentType = response.headers.get('content-type') || '';
    const hasJsonBody = contentType.includes('application/json');
    
    // Handle 204 No Content or empty 200 responses
    if (response.status === 204 || !hasJsonBody) {
      return undefined as unknown as T;
    }

    // Read response as text first to check if empty
    const text = await response.text();
    if (!text.trim()) {
      return undefined as unknown as T;
    }

    // Parse JSON only if content exists
    try {
      return JSON.parse(text) as T;
    } catch (e) {
      // If parsing fails, still return undefined rather than crashing
      console.warn('Failed to parse JSON response, treating as empty:', e);
      return undefined as unknown as T;
    }
  } catch (error) {
    console.error('API Fetch Error:', error);
    
    // If it's already an ApiError, rethrow it
    if (error instanceof ApiError) {
      throw error;
    }
    
    // Convert network errors to ApiError
    const apiError = ApiError.fromNetworkError(error);
    
    // Don't show redundant offline messages
    if (apiError.message === 'OFFLINE' || apiError.message === 'NETWORK_ERROR') {
      throw apiError;
    }
    
    // Show toast for other errors
    if (!apiError.message.includes('API Error:')) {
      toast.error(apiError.message);
    }
    
    throw apiError;
  }
}

// Offline-first API methods - NOW SUPER SIMPLE! 🎉
export const api = {
  // Gems
  getGems: () => offlineFirstFetch({
    fetchFn: () => apiFetch<Gem[]>('/gems'),
    getCachedFn: getAllGems,
    saveCacheFn: saveGems,
    resourceName: 'gems',
  }),

  getGemById: (id: string) => offlineFirstFetch({
    fetchFn: () => apiFetch<Gem>(`/gems/${id}`),
    getCachedFn: async () => {
      const gem = await getGem(id);
      return gem ?? null;
    },
    saveCacheFn: saveGem,
    resourceName: `gem ${id}`,
  }),

  // Krawls
  getKrawls: () => offlineFirstFetch({
    fetchFn: () => apiFetch<Krawl[]>('/krawls'),
    getCachedFn: getAllKrawls,
    saveCacheFn: saveKrawls,
    resourceName: 'krawls',
  }),

  getKrawlById: (id: string) => offlineFirstFetch({
    fetchFn: () => apiFetch<Krawl>(`/krawls/${id}`),
    getCachedFn: async () => {
      const krawl = await getKrawl(id);
      return krawl ?? null;
    },
    saveCacheFn: saveKrawl,
    resourceName: `krawl ${id}`,
  }),

  // Create with offline support
  createGem: (gemData: Omit<Gem, 'gem_id' | 'created_at' | 'updated_at'>) => createWithOfflineSupport({
    data: gemData,
    createFn: (data) => apiFetch<Gem>('/gems', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    saveCacheFn: saveGem,
    addToSyncQueueFn: (action, entity, entityId, data) => 
      addToSyncQueue(action, entity as 'gem', entityId, data),
    entity: 'gem',
    createTempResult: (data, tempId) => ({
      ...data,
      gem_id: tempId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      _synced: 0,
    } as Gem),
  }),

  createKrawl: (krawlData: Omit<Krawl, 'krawl_id' | 'created_at' | 'updated_at'>) => createWithOfflineSupport({
    data: krawlData,
    createFn: (data) => apiFetch<Krawl>('/krawls', {
      method: 'POST',
      body: JSON.stringify(data),
    }),
    saveCacheFn: saveKrawl,
    addToSyncQueueFn: (action, entity, entityId, data) => 
      addToSyncQueue(action, entity as 'krawl', entityId, data),
    entity: 'krawl',
    createTempResult: (data, tempId) => ({
      ...data,
      krawl_id: tempId,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      _synced: 0,
    } as Krawl),
  }),
};