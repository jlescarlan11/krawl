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

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

export const apiConfig = {
  baseURL: API_BASE_URL,
};

// Connectivity check caching to avoid checking on every request
let lastConnectivityCheck = 0;
let lastConnectivityResult = true;
const CONNECTIVITY_CACHE_MS = 5000; // Cache for 5 seconds

// Generic fetch wrapper with error handling
export async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${apiConfig.baseURL}${endpoint}`;
  
  // Check actual connectivity (with caching to avoid checking every request)
  const now = Date.now();
  if (now - lastConnectivityCheck > CONNECTIVITY_CACHE_MS) {
    try {
      lastConnectivityResult = await checkActualConnectivity(`${apiConfig.baseURL}/health`)
        .catch(() => checkActualConnectivity('/manifest.json'));
      lastConnectivityCheck = now;
    } catch {
      lastConnectivityResult = false;
    }
  }

  if (!lastConnectivityResult) {
    console.log('📴 Offline - server unreachable');
    throw new Error('OFFLINE');
  }

  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const errorMessage = `API Error: ${response.status} ${response.statusText}`;
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.error('API Fetch Error:', error);
    
    if (error instanceof Error && error.message === 'OFFLINE') {
      // Don't show redundant offline messages
      throw error;
    }
    
    // Check if it's a network error (fetch failed)
    if (error instanceof TypeError && error.message.includes('fetch')) {
      console.log('📴 Network error - likely offline or server unreachable');
      throw new Error('NETWORK_ERROR');
    }
    
    if (error instanceof Error) {
      // Only show toast if we haven't already shown one
      if (!error.message.includes('API Error:')) {
        toast.error('Network error. Please check your connection.');
      }
    }
    throw error;
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
  createGem: (gemData: any) => createWithOfflineSupport({
    createFn: () => apiFetch<Gem>('/gems', {
      method: 'POST',
      body: JSON.stringify(gemData),
    }),
    saveCacheFn: saveGem,
    addToSyncQueueFn: (action, entity, entityId, data) => 
      addToSyncQueue(action, entity as 'gem', entityId, data),
    entity: 'gem',
    createTempResult: (_, tempId) => ({
      ...gemData,
      gem_id: tempId,
      _synced: false,
    }),
  }),

  createKrawl: (krawlData: any) => createWithOfflineSupport({
    createFn: () => apiFetch<Krawl>('/krawls', {
      method: 'POST',
      body: JSON.stringify(krawlData),
    }),
    saveCacheFn: saveKrawl,
    addToSyncQueueFn: (action, entity, entityId, data) => 
      addToSyncQueue(action, entity as 'krawl', entityId, data),
    entity: 'krawl',
    createTempResult: (_, tempId) => ({
      ...krawlData,
      krawl_id: tempId,
      _synced: false,
    }),
  }),
};