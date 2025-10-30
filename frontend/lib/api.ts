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

// Generic fetch wrapper with error handling
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
      lastConnectivityResult = await checkActualConnectivity(`${basePath}/health`)
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
      headers: {
        ...defaultHeaders,
        ...authHeader,            // include the Authorization header
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const apiError = await ApiError.fromResponse(response);
      toast.error(apiError.message);
      throw apiError;
    }

    return await response.json();
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