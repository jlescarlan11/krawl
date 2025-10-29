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

// Offline-first API methods with IndexedDB caching
export const api = {
  // Gems - Offline-first approach
  getGems: async () => {
    try {
      // Try to load from cache first (instant, works offline)
      const cached = await getAllGems();
      
      // If we have cached data, return it immediately
      if (cached.length > 0) {
        // Start background sync but don't wait for it
        apiFetch<Gem[]>('/gems')
          .then((fresh) => {
            saveGems(fresh).catch(console.error);
          })
          .catch(() => {
            // Silently fail background sync - we have cached data
            console.log('📴 Using cached gems (offline mode)');
          });
        
        return cached;
      }

      // No cache, must fetch from API
      const fresh = await apiFetch<Gem[]>('/gems');
      await saveGems(fresh);
      return fresh;
    } catch (error) {
      // Network error - try cache as fallback
      const cached = await getAllGems();
      if (cached.length > 0) {
        toast.info('Using cached data (offline mode)');
        return cached;
      }
      throw error;
    }
  },

  getGemById: async (id: string) => {
    try {
      // Check cache first
      const cached = await getGem(id);
      
      if (cached) {
        // Start background sync
        apiFetch<Gem>(`/gems/${id}`)
          .then((fresh) => {
            saveGem(fresh).catch(console.error);
          })
          .catch(() => {
            console.log(`📴 Using cached gem ${id} (offline mode)`);
          });
        
        return cached;
      }

      // Not in cache, fetch from API
      const fresh = await apiFetch<Gem>(`/gems/${id}`);
      await saveGem(fresh);
      return fresh;
    } catch (error) {
      const cached = await getGem(id);
      if (cached) {
        toast.info('Using cached data (offline mode)');
        return cached;
      }
      throw error;
    }
  },

  // Krawls - Offline-first approach
  getKrawls: async () => {
    try {
      const cached = await getAllKrawls();
      
      if (cached.length > 0) {
        apiFetch<Krawl[]>('/krawls')
          .then((fresh) => {
            saveKrawls(fresh).catch(console.error);
          })
          .catch(() => {
            console.log('📴 Using cached krawls (offline mode)');
          });
        
        return cached;
      }

      const fresh = await apiFetch<Krawl[]>('/krawls');
      await saveKrawls(fresh);
      return fresh;
    } catch (error) {
      const cached = await getAllKrawls();
      if (cached.length > 0) {
        toast.info('Using cached data (offline mode)');
        return cached;
      }
      throw error;
    }
  },

  getKrawlById: async (id: string) => {
    try {
      const cached = await getKrawl(id);
      
      if (cached) {
        apiFetch<Krawl>(`/krawls/${id}`)
          .then((fresh) => {
            saveKrawl(fresh).catch(console.error);
          })
          .catch(() => {
            console.log(`📴 Using cached krawl ${id} (offline mode)`);
          });
        
        return cached;
      }

      const fresh = await apiFetch<Krawl>(`/krawls/${id}`);
      await saveKrawl(fresh);
      return fresh;
    } catch (error) {
      const cached = await getKrawl(id);
      if (cached) {
        toast.info('Using cached data (offline mode)');
        return cached;
      }
      throw error;
    }
  },

  // Create gem with offline support
  createGem: async (gemData: any) => {
    try {
      const result = await apiFetch<Gem>('/gems', {
        method: 'POST',
        body: JSON.stringify(gemData),
      });
      await saveGem(result);
      return result;
    } catch (error) {
      // If offline, queue for later sync
      toast.info('Saved locally. Will sync when online.');
      const tempId = `temp-${Date.now()}`;
      const tempGem = { ...gemData, gem_id: tempId, _synced: false };
      await saveGem(tempGem);
      await addToSyncQueue('CREATE', 'gem', tempId, gemData);
      return tempGem;
    }
  },

  // Create krawl with offline support
  createKrawl: async (krawlData: any) => {
    try {
      const result = await apiFetch<Krawl>('/krawls', {
        method: 'POST',
        body: JSON.stringify(krawlData),
      });
      await saveKrawl(result);
      return result;
    } catch (error) {
      toast.info('Saved locally. Will sync when online.');
      const tempId = `temp-${Date.now()}`;
      const tempKrawl = { ...krawlData, krawl_id: tempId, _synced: false };
      await saveKrawl(tempKrawl);
      await addToSyncQueue('CREATE', 'krawl', tempId, krawlData);
      return tempKrawl;
    }
  },
};