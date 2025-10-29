/**
 * Cache management utilities for client-side
 * Provides functions to interact with service worker cache
 */

export interface CacheSize {
  static: number;
  api: number;
  dynamic: number;
  images: number;
  total: number;
}

/**
 * Check if service worker is available
 */
function isServiceWorkerAvailable(): boolean {
  return 'serviceWorker' in navigator && !!navigator.serviceWorker.controller;
}

/**
 * Send message to service worker and wait for response
 */
async function sendMessageToSW<T>(type: string, payload?: any): Promise<T | null> {
  if (!isServiceWorkerAvailable()) {
    console.warn('Service Worker not available');
    return null;
  }

  return new Promise((resolve, reject) => {
    const messageChannel = new MessageChannel();
    
    // Timeout after 5 seconds
    const timeout = setTimeout(() => {
      reject(new Error('Service Worker message timeout'));
    }, 5000);

    messageChannel.port1.onmessage = (event) => {
      clearTimeout(timeout);
      resolve(event.data);
    };

    try {
      navigator.serviceWorker.controller!.postMessage(
        { type, payload },
        [messageChannel.port2]
      );
    } catch (error) {
      clearTimeout(timeout);
      reject(error);
    }
  });
}

/**
 * Clear all caches
 * @returns Promise that resolves to true if successful
 */
export async function clearAllCaches(): Promise<boolean> {
  try {
    const result = await sendMessageToSW<{ success: boolean }>('CLEAR_CACHE');
    return result?.success || false;
  } catch (error) {
    console.error('Failed to clear caches:', error);
    return false;
  }
}

/**
 * Clear only API caches
 * @returns Promise that resolves to true if successful
 */
export async function clearApiCache(): Promise<boolean> {
  try {
    const result = await sendMessageToSW<{ success: boolean }>('CLEAR_API_CACHE');
    return result?.success || false;
  } catch (error) {
    console.error('Failed to clear API cache:', error);
    return false;
  }
}

/**
 * Get cache size information
 * @returns Promise that resolves to cache size data or null if unavailable
 */
export async function getCacheSize(): Promise<CacheSize | null> {
  try {
    const result = await sendMessageToSW<CacheSize>('GET_CACHE_SIZE');
    return result;
  } catch (error) {
    console.error('Failed to get cache size:', error);
    return null;
  }
}

/**
 * Force update service worker
 * Checks for new service worker version and updates if available
 */
export async function updateServiceWorker(): Promise<void> {
  if (!('serviceWorker' in navigator)) {
    console.warn('Service Worker not supported');
    return;
  }

  try {
    const registration = await navigator.serviceWorker.getRegistration();
    if (registration) {
      await registration.update();
      console.log('✅ Service Worker update check complete');
    }
  } catch (error) {
    console.error('❌ Failed to update service worker:', error);
  }
}

/**
 * Skip waiting and activate new service worker immediately
 * Call this when a new service worker is waiting to activate
 */
export function skipWaiting(): void {
  if (!isServiceWorkerAvailable()) {
    return;
  }

  navigator.serviceWorker.controller!.postMessage({ type: 'SKIP_WAITING' });
}

/**
 * Listen for service worker updates
 * @param onUpdate Callback when new service worker is available
 */
export function onServiceWorkerUpdate(onUpdate: () => void): () => void {
  if (!('serviceWorker' in navigator)) {
    return () => {};
  }

  let registration: ServiceWorkerRegistration;

  const checkForUpdates = async () => {
    registration = await navigator.serviceWorker.getRegistration() as ServiceWorkerRegistration;
    
    if (registration?.waiting) {
      onUpdate();
    }
  };

  // Check on load
  checkForUpdates();

  // Listen for updates
  const updateHandler = () => {
    checkForUpdates();
  };

  navigator.serviceWorker.addEventListener('controllerchange', updateHandler);

  // Return cleanup function
  return () => {
    navigator.serviceWorker.removeEventListener('controllerchange', updateHandler);
  };
}

/**
 * Get cache statistics and information
 * @returns Object with cache stats
 */
export async function getCacheStats(): Promise<{
  size: CacheSize | null;
  supported: boolean;
  active: boolean;
}> {
  const supported = 'caches' in window && 'serviceWorker' in navigator;
  const active = isServiceWorkerAvailable();
  const size = active ? await getCacheSize() : null;

  return {
    size,
    supported,
    active,
  };
}

/**
 * Preload URLs into cache
 * Useful for prefetching important resources
 */
export async function preloadUrls(urls: string[]): Promise<void> {
  if (!('caches' in window)) {
    console.warn('Cache API not supported');
    return;
  }

  try {
    const cache = await caches.open('krawl-v2');
    await Promise.all(
      urls.map(url => 
        cache.add(url).catch(err => 
          console.warn(`Failed to cache ${url}:`, err)
        )
      )
    );
    console.log(`✅ Preloaded ${urls.length} URLs`);
  } catch (error) {
    console.error('❌ Failed to preload URLs:', error);
  }
}

/**
 * Check if a URL is cached
 */
export async function isUrlCached(url: string): Promise<boolean> {
  if (!('caches' in window)) {
    return false;
  }

  try {
    const response = await caches.match(url);
    return !!response;
  } catch (error) {
    console.error('Failed to check cache:', error);
    return false;
  }
}

