import { toast } from 'sonner';

export interface OfflineFirstOptions<T> {
  /**
   * Function to fetch data from API
   */
  fetchFn: () => Promise<T>;
  
  /**
   * Function to get cached data
   */
  getCachedFn: () => Promise<T | T[] | null>;
  
  /**
   * Function to save data to cache
   */
  saveCacheFn: (data: T) => Promise<void>;
  
  /**
   * Resource name for logging (e.g., "gems", "krawl")
   */
  resourceName: string;
  
  /**
   * Whether to show toast on cache fallback
   * @default true
   */
  showCacheToast?: boolean;
  
  /**
   * Whether to perform background sync
   * @default true
   */
  backgroundSync?: boolean;
}

/**
 * Generic offline-first data fetcher
 * 
 * Strategy:
 * 1. Return cached data immediately if available
 * 2. Fetch fresh data in background and update cache
 * 3. On network error, fall back to cache
 * 
 * @example
 * ```ts
 * const gems = await offlineFirstFetch({
 *   fetchFn: () => apiFetch<Gem[]>('/gems'),
 *   getCachedFn: getAllGems,
 *   saveCacheFn: saveGems,
 *   resourceName: 'gems',
 * });
 * ```
 */
export async function offlineFirstFetch<T>(
  options: OfflineFirstOptions<T>
): Promise<T | T[]> {
  const {
    fetchFn,
    getCachedFn,
    saveCacheFn,
    resourceName,
    showCacheToast = true,
    backgroundSync = true,
  } = options;

  try {
    // Try to load from cache first (instant, works offline)
    const cached = await getCachedFn();
    
    // If we have cached data, return it immediately
    const hasCachedData = Array.isArray(cached) ? cached.length > 0 : cached !== null;
    
    if (hasCachedData) {
      console.log(`✅ Returning cached ${resourceName}`);
      
      // Start background sync if enabled
      if (backgroundSync) {
        fetchFn()
          .then((fresh) => {
            saveCacheFn(fresh).catch(console.error);
            console.log(`🔄 Background sync completed for ${resourceName}`);
          })
          .catch(() => {
            console.log(`📴 Using cached ${resourceName} (offline mode)`);
          });
      }
      
      return cached as T | T[];
    }

    // No cache, must fetch from API
    console.log(`🌐 Fetching fresh ${resourceName} from API`);
    const fresh = await fetchFn();
    await saveCacheFn(fresh);
    return fresh;
    
  } catch (error) {
    // Network error - try cache as fallback
    console.warn(`⚠️ Network error fetching ${resourceName}, trying cache`);
    const cached = await getCachedFn();
    const hasCachedData = Array.isArray(cached) ? cached.length > 0 : cached !== null;
    
    if (hasCachedData) {
      if (showCacheToast) {
        toast.info(`Using cached ${resourceName} (offline mode)`);
      }
      return cached as T | T[];
    }
    
    // No cache and network failed - rethrow error
    throw error;
  }
}

export interface CreateWithOfflineOptions<TData, TResult> {
  /**
   * Function to create resource via API
   */
  createFn: (data: TData) => Promise<TResult>;
  
  /**
   * Function to save to local cache
   */
  saveCacheFn: (data: TResult) => Promise<void>;
  
  /**
   * Function to add to sync queue
   */
  addToSyncQueueFn: (
    action: 'CREATE' | 'UPDATE' | 'DELETE',
    entity: string,
    entityId: string,
    data: TData
  ) => Promise<void>;
  
  /**
   * Entity type (e.g., "gem", "krawl")
   */
  entity: string;
  
  /**
   * Function to generate temporary ID
   * @default () => `temp-${Date.now()}`
   */
  generateTempId?: () => string;
  
  /**
   * Function to create temp result with temp ID
   */
  createTempResult: (data: TData, tempId: string) => TResult;
}

/**
 * Generic create with offline support
 * 
 * Strategy:
 * 1. Try to create via API
 * 2. On success, save to cache
 * 3. On failure, create temp entity and queue for sync
 * 
 * @example
 * ```ts
 * const gem = await createWithOfflineSupport({
 *   createFn: (data) => apiFetch<Gem>('/gems', {
 *     method: 'POST',
 *     body: JSON.stringify(data),
 *   }),
 *   saveCacheFn: saveGem,
 *   addToSyncQueueFn: addToSyncQueue,
 *   entity: 'gem',
 *   createTempResult: (data, tempId) => ({
 *     ...data,
 *     gem_id: tempId,
 *     _synced: false,
 *   }),
 * });
 * ```
 */
export async function createWithOfflineSupport<TData, TResult>(
  options: CreateWithOfflineOptions<TData, TResult>
): Promise<TResult> {
  const {
    createFn,
    saveCacheFn,
    addToSyncQueueFn,
    entity,
    generateTempId = () => `temp-${Date.now()}`,
    createTempResult,
  } = options;

  try {
    const result = await createFn(undefined as any); // Data already bound in createFn
    await saveCacheFn(result);
    console.log(`✅ Created ${entity} successfully`);
    return result;
  } catch (error) {
    // If offline, queue for later sync
    console.log(`📴 Offline - queueing ${entity} for sync`);
    toast.info('Saved locally. Will sync when online.');
    
    const tempId = generateTempId();
    const tempResult = createTempResult(undefined as any, tempId); // Data bound in createTempResult
    
    await saveCacheFn(tempResult);
    await addToSyncQueueFn('CREATE', entity, tempId, undefined as any);
    
    return tempResult;
  }
}