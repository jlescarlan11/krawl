const CACHE_VERSION = 'v9'; // Map-only caching - simplified service worker for maintainability
const CACHE_NAME = `krawl-${CACHE_VERSION}`; // Kept for offline fallback
const TILE_CACHE = `krawl-tiles-${CACHE_VERSION}`;

// Map tile cache configuration
const TILE_CACHE_CONFIG = {
  maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  maxItems: 600, // Map tiles + style resources (style.json, sprites, fonts, glyphs)
};

// ============================================
// Helper Functions
// ============================================

/**
 * Check if URL is a MapTiler resource that should be cached
 * Returns true for MapTiler tiles, styles, fonts, sprites, and glyphs
 */
function isMapTilerResource(url) {
  if (!url.includes('api.maptiler.com')) {
    return false;
  }
  
  // Cache tiles (.pbf, .mvt)
  if (url.includes('/tiles/') || url.match(/\.(pbf|mvt)$/)) {
    return true;
  }
  
  // Cache style resources (style.json, sprites, fonts, glyphs)
  if (url.includes('/maps/') || url.includes('/fonts/') || url.includes('/sprites/') || url.match(/style\.json/)) {
    return true;
  }
  
  return false;
}

/**
 * Check if cached response is still fresh
 */
function isCacheFresh(response, maxAge) {
  if (!response) return false;
  
  const fetchedOn = response.headers.get('sw-fetched-on');
  if (!fetchedOn) return false;
  
  const age = Date.now() - parseInt(fetchedOn);
  return age < maxAge;
}

/**
 * Add metadata headers to response
 */
function addCacheMetadata(response, metadata = {}) {
  const headers = new Headers(response.headers);
  headers.set('sw-fetched-on', Date.now().toString());
  
  if (metadata.strategy) {
    headers.set('sw-cache-strategy', metadata.strategy);
  }
  
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: headers
  });
}

/**
 * Limit cache size by removing oldest entries
 */
async function limitCacheSize(cacheName, maxItems) {
  try {
      const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    
    if (keys.length > maxItems) {
      // Remove oldest entries (FIFO)
      const toDelete = keys.slice(0, keys.length - maxItems);
      await Promise.all(toDelete.map(key => cache.delete(key)));
      console.log(`🗑️ Cleaned ${toDelete.length} old entries from ${cacheName}`);
    }
  } catch (error) {
    console.error(`❌ Error limiting cache size for ${cacheName}:`, error);
  }
}

/**
 * Clean expired cache entries
 */
async function cleanExpiredCache(cacheName, maxAge) {
  try {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    
    const deletePromises = keys.map(async (key) => {
      const response = await cache.match(key);
      if (!isCacheFresh(response, maxAge)) {
        return cache.delete(key);
      }
    });
    
    await Promise.all(deletePromises);
  } catch (error) {
    console.error(`❌ Error cleaning expired cache for ${cacheName}:`, error);
  }
}

// ============================================
// Caching Strategies
// ============================================

/**
 * Flexible cache matching for map tiles
 * Matches by URL path, ignoring query parameters for better cache hits
 */
async function findCachedTile(url, cacheName) {
  try {
    const cache = await caches.open(cacheName);
    const urlObj = new URL(url);
    
    // Try exact match first
    const exactMatch = await cache.match(url);
    if (exactMatch) return exactMatch;
    
    // Try matching without query parameters (for tiles with varying query params)
    const urlWithoutQuery = `${urlObj.protocol}//${urlObj.host}${urlObj.pathname}`;
    const keys = await cache.keys();
    
    for (const key of keys) {
      const keyUrl = new URL(key.url);
      const keyWithoutQuery = `${keyUrl.protocol}//${keyUrl.host}${keyUrl.pathname}`;
      
      if (keyWithoutQuery === urlWithoutQuery) {
        const match = await cache.match(key);
        if (match) return match;
      }
    }
    
    return null;
  } catch (error) {
    console.error('❌ Error in findCachedTile:', error);
    return null;
  }
}

/**
 * Cache-first strategy for map tiles
 * Uses flexible matching to handle varying query parameters
 */
async function cacheMapTile(request) {
  try {
    // Use flexible matching for tiles (ignores query params)
    const cachedResponse = await findCachedTile(request.url, TILE_CACHE);
    
    // Return fresh cache if available
    if (cachedResponse && isCacheFresh(cachedResponse, TILE_CACHE_CONFIG.maxAge)) {
      console.log(`📦 Cache hit (fresh): ${request.url.substring(0, 80)}...`);
      return cachedResponse;
    }
    
    // Fetch from network
    const networkResponse = await fetchWithTimeout(request, 5000);
    
    if (networkResponse && networkResponse.ok) {
      // Cache the response
      const cache = await caches.open(TILE_CACHE);
      const responseToCache = addCacheMetadata(networkResponse.clone(), { strategy: 'cache-first' });
      
      await cache.put(request, responseToCache);
      
      // Limit cache size
      limitCacheSize(TILE_CACHE, TILE_CACHE_CONFIG.maxItems);
      
      if (cachedResponse) {
        console.log(`🔄 Network updated cache for tile: ${request.url.substring(0, 80)}...`);
      } else {
        console.log(`📥 Cached new tile: ${request.url.substring(0, 80)}...`);
      }
      
      return networkResponse;
    }
    
    // Return stale cache if network failed
    if (cachedResponse) {
      console.log(`⚠️ Returning stale cache for: ${request.url.substring(0, 80)}...`);
      return cachedResponse;
    }
    
    throw new Error('No cache and network failed');
    
  } catch (error) {
    console.error('❌ Map tile cache error:', error.message);
    
    // Try to return any cached version
    const cachedResponse = await findCachedTile(request.url, TILE_CACHE);
    
    if (cachedResponse) {
      console.log(`📦 Using fallback cache: ${request.url.substring(0, 80)}...`);
      return cachedResponse;
    }
    
    throw error;
  }
}

/**
 * Fetch with timeout
 */
function fetchWithTimeout(request, timeout = 5000) {
  return Promise.race([
    fetch(request),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Request timeout')), timeout)
    )
  ]);
}

// ============================================
// Service Worker Events
// ============================================

/**
 * Install event - skip waiting to activate immediately
 */
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker installing...');
  event.waitUntil(self.skipWaiting());
});

/**
 * Activate event - clean up old caches and expired tile entries
 */
self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker activating...');
  
  const currentCaches = [CACHE_NAME, TILE_CACHE];
  
  event.waitUntil(
    Promise.all([
      // Delete old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (!currentCaches.includes(cacheName)) {
              console.log('🗑️ Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      
      // Clean expired entries from tile cache
      cleanExpiredCache(TILE_CACHE, TILE_CACHE_CONFIG.maxAge),
    ])
    .then(() => {
      console.log('✅ Activation complete');
      return self.clients.claim();
    })
    .catch((error) => {
      console.error('❌ Activation error:', error);
    })
  );
});

/**
 * Fetch event - only intercept MapTiler requests for caching
 * All other requests bypass the service worker (let browser handle naturally)
 */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = request.url;
  
  // Only handle GET requests for MapTiler resources
  if (request.method !== 'GET' || !isMapTilerResource(url)) {
    return; // Bypass service worker - let browser handle naturally
  }
  
  // Cache MapTiler resources (tiles, styles, fonts, sprites)
  try {
    const resourceType = url.includes('style.json') ? 'style' :
                         url.includes('sprites') ? 'sprite' :
                         url.includes('fonts') ? 'font' :
                         url.includes('glyphs') ? 'glyph' : 'tile';
    console.log(`🗺️ Map ${resourceType} request:`, url.substring(url.lastIndexOf('/') + 1));
    event.respondWith(cacheMapTile(request));
  } catch (error) {
    console.error('❌ Map tile fetch error:', error);
    // Fallback to network fetch
    event.respondWith(fetch(request));
  }
});

/**
 * Message event - handle cache management commands
 */
self.addEventListener('message', (event) => {
  const { type } = event.data;
  
  switch (type) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;
      
    case 'CLEAR_CACHE':
      event.waitUntil(
        caches.keys().then(names => {
          return Promise.all(names.map(name => caches.delete(name)));
        }).then(() => {
          if (event.ports && event.ports[0]) {
            event.ports[0].postMessage({ success: true });
          }
        })
      );
      break;
      
    case 'CLEAR_TILE_CACHE':
      event.waitUntil(
        caches.delete(TILE_CACHE).then(() => {
          if (event.ports && event.ports[0]) {
            event.ports[0].postMessage({ success: true });
          }
        })
      );
      break;
      
    case 'GET_CACHE_SIZE':
      event.waitUntil(
        caches.open(TILE_CACHE).then(cache => cache.keys()).then(keys => {
          if (event.ports && event.ports[0]) {
            event.ports[0].postMessage({
              tiles: keys.length,
              total: keys.length
            });
          }
        })
      );
      break;
      
    default:
      console.log('Unknown message type:', type);
  }
});

/**
 * Periodic background sync to clean expired tile cache
 */
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'clean-cache') {
    event.waitUntil(
      cleanExpiredCache(TILE_CACHE, TILE_CACHE_CONFIG.maxAge)
    );
  }
});

console.log('📝 Service Worker loaded');