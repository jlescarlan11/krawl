const CACHE_VERSION = 'v3';
const CACHE_NAME = `krawl-${CACHE_VERSION}`;
const STATIC_CACHE = `krawl-static-${CACHE_VERSION}`;
const API_CACHE = `krawl-api-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `krawl-dynamic-${CACHE_VERSION}`;
const IMAGE_CACHE = `krawl-images-${CACHE_VERSION}`;

// Development mode check
const IS_DEV = self.location.hostname === 'localhost' || self.location.hostname === '127.0.0.1';

// Cache configuration
const CACHE_CONFIG = {
  static: {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    maxItems: 100,
  },
  api: {
    maxAge: 5 * 60 * 1000, // 5 minutes
    maxItems: 50,
  },
  dynamic: {
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    maxItems: 50,
  },
  images: {
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    maxItems: 100,
  }
};

const urlsToCache = [
  '/',
  '/explore',
  '/krawls',
  '/add',
  '/profile',
];

// ============================================
// Helper Functions
// ============================================

/**
 * Determines cache strategy based on request URL
 */
function getRequestType(url) {
  if (url.includes('/api/') || url.includes('localhost:8080') || url.includes('/backend/')) {
    return 'api';
  }
  
  if (url.match(/\.(jpg|jpeg|png|gif|webp|svg|ico)$/)) {
    return 'image';
  }
  
  if (url.match(/\.(js|css|woff2?|ttf|otf|eot)$/) || url.includes('/_next/static/')) {
    return 'static';
  }
  
  return 'dynamic';
}

/**
 * Get appropriate cache name for request type
 */
function getCacheName(type) {
  switch (type) {
    case 'static': return STATIC_CACHE;
    case 'api': return API_CACHE;
    case 'image': return IMAGE_CACHE;
    case 'dynamic': return DYNAMIC_CACHE;
    default: return DYNAMIC_CACHE;
  }
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
 * Cache-first with expiration
 * Good for: static assets, images
 */
async function cacheFirst(request, cacheName, config) {
  try {
    const cachedResponse = await caches.match(request);
    
    // Return fresh cache if available
    if (cachedResponse && isCacheFresh(cachedResponse, config.maxAge)) {
      console.log('📦 Cache hit (fresh):', request.url);
      return cachedResponse;
    }
    
    // Fetch from network
    const networkResponse = await fetchWithTimeout(request, 5000);
    
    if (networkResponse && networkResponse.ok) {
      // Cache the response
      const cache = await caches.open(cacheName);
      const responseToCache = addCacheMetadata(networkResponse.clone(), { strategy: 'cache-first' });
      
      await cache.put(request, responseToCache);
      
      // Limit cache size
      limitCacheSize(cacheName, config.maxItems);
      
      return networkResponse;
    }
    
    // Return stale cache if network failed
    if (cachedResponse) {
      console.log('⚠️ Returning stale cache for:', request.url);
      return cachedResponse;
    }
    
    throw new Error('No cache and network failed');
    
  } catch (error) {
    console.error('❌ Cache-first error:', error.message);
    
    // Try to return any cached version
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline fallback for HTML pages
    if (request.headers.get('accept')?.includes('text/html')) {
      return caches.match('/offline');
    }
    
    throw error;
  }
}

/**
 * Network-first with cache fallback and expiration
 * Good for: API calls
 */
async function networkFirst(request, cacheName, config) {
  try {
    // Try network first
    const networkResponse = await fetchWithTimeout(request, 5000);
    
    if (networkResponse && networkResponse.ok) {
      // Cache successful response
      const cache = await caches.open(cacheName);
      const responseToCache = addCacheMetadata(networkResponse.clone(), { strategy: 'network-first' });
      
      await cache.put(request, responseToCache);
      
      // Clean up cache
      limitCacheSize(cacheName, config.maxItems);
      
      console.log('🌐 Network success:', request.url);
      return networkResponse;
    }
    
    throw new Error(`Network response not OK: ${networkResponse?.status}`);
    
  } catch (error) {
    console.warn('⚠️ Network failed, trying cache:', error.message);
    
    // Fallback to cache
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse && isCacheFresh(cachedResponse, config.maxAge)) {
      console.log('📦 Using fresh cached API response');
      return cachedResponse;
    }
    
    if (cachedResponse) {
      console.log('⚠️ Using stale cached API response');
      return cachedResponse;
    }
    
    // No cache available
    throw new Error('Network failed and no cache available');
  }
}

/**
 * Stale-while-revalidate
 * Good for: dynamic pages
 */
async function staleWhileRevalidate(request, cacheName, config) {
  const cachedResponse = await caches.match(request);
  
  const fetchPromise = fetchWithTimeout(request, 5000)
    .then(async (networkResponse) => {
      if (networkResponse && networkResponse.ok) {
        const cache = await caches.open(cacheName);
        const responseToCache = addCacheMetadata(networkResponse.clone(), { strategy: 'swr' });
        
        await cache.put(request, responseToCache);
        limitCacheSize(cacheName, config.maxItems);
        
        console.log('🔄 Background update successful:', request.url);
    }
    return networkResponse;
    })
    .catch((error) => {
      console.log('⚠️ Background fetch failed:', error.message);
    return cachedResponse;
  });
  
  // Return cached response immediately if available, otherwise wait for network
  return cachedResponse || fetchPromise;
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
 * Install event - cache essential resources
 */
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('📦 Caching app shell');
        // Cache URLs individually to prevent one failure from breaking all
        return Promise.allSettled(
          urlsToCache.map(url => 
            cache.add(url).catch(err => {
              console.warn(`Failed to cache ${url}:`, err);
              return null;
            })
          )
        );
      })
      .then(() => {
        console.log('✅ Installation complete');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('❌ Installation failed:', error);
        // Don't throw - allow SW to install even if caching fails
      })
  );
});

/**
 * Activate event - clean up old caches
 */
self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker activating...');
  
  const currentCaches = [CACHE_NAME, STATIC_CACHE, API_CACHE, DYNAMIC_CACHE, IMAGE_CACHE];
  
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
      
      // Clean expired entries from current caches
      cleanExpiredCache(API_CACHE, CACHE_CONFIG.api.maxAge),
      cleanExpiredCache(STATIC_CACHE, CACHE_CONFIG.static.maxAge),
      cleanExpiredCache(DYNAMIC_CACHE, CACHE_CONFIG.dynamic.maxAge),
      cleanExpiredCache(IMAGE_CACHE, CACHE_CONFIG.images.maxAge),
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
 * Fetch event - route requests to appropriate caching strategy
 */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = request.url;
  
  // Skip non-http requests
  if (!url.startsWith('http')) {
    return;
  }
  
  // Skip POST, PUT, DELETE requests (only cache GET requests)
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip map tiles and external CDN resources
  // Let them load directly without service worker interference
  if (
    url.includes('tile.openstreetmap.org') ||
    url.includes('tiles.stadiamaps.com') ||
    url.includes('basemaps.cartocdn.com') ||
    url.includes('server.arcgisonline.com') ||
    url.includes('tile.opentopomap.org') ||
    url.includes('tile.thunderforest.com') ||
    url.includes('tile-cyclosm.openstreetmap.fr') ||
    url.includes('maps.wikimedia.org') ||
    url.includes('tile.jawg.io') ||
    url.includes('api.mapbox.com') ||
    url.includes('unpkg.com/leaflet') ||
    url.includes('.tile.') // Generic tile domain pattern
  ) {
    // Let these requests pass through without caching
    return;
  }
  
  const requestType = getRequestType(url);
  const cacheName = getCacheName(requestType);
  const config = CACHE_CONFIG[requestType] || CACHE_CONFIG.dynamic;
  
  try {
    if (requestType === 'static' || requestType === 'image') {
      // Cache-first for static assets and images
      event.respondWith(cacheFirst(request, cacheName, config));
  } else if (requestType === 'api') {
    // Network-first for API calls
      event.respondWith(networkFirst(request, cacheName, config));
  } else {
    // Check if this is an HTML document request
    const isHtmlRequest = request.headers.get('accept')?.includes('text/html');
    
    // In development, skip caching HTML to prevent hydration mismatches
    if (IS_DEV && isHtmlRequest) {
      console.log('🔧 DEV: Bypassing cache for HTML:', url);
      event.respondWith(fetch(request));
    } else {
      // Stale-while-revalidate for dynamic content
      event.respondWith(staleWhileRevalidate(request, cacheName, config));
    }
    }
  } catch (error) {
    console.error('❌ Fetch handler error:', error);
    event.respondWith(
      caches.match('/offline').then(response => 
        response || new Response('Offline', { status: 503 })
      )
    );
  }
});

/**
 * Message event - handle cache management commands
 */
self.addEventListener('message', (event) => {
  const { type, payload } = event.data;
  
  switch (type) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;
      
    case 'CLEAR_CACHE':
      event.waitUntil(
        caches.keys().then(names => {
          return Promise.all(names.map(name => caches.delete(name)));
        }).then(() => {
          event.ports[0].postMessage({ success: true });
        })
      );
      break;
      
    case 'CLEAR_API_CACHE':
      event.waitUntil(
        caches.delete(API_CACHE).then(() => {
          event.ports[0].postMessage({ success: true });
        })
      );
      break;
      
    case 'GET_CACHE_SIZE':
      event.waitUntil(
        Promise.all([
          caches.open(STATIC_CACHE).then(c => c.keys()),
          caches.open(API_CACHE).then(c => c.keys()),
          caches.open(DYNAMIC_CACHE).then(c => c.keys()),
          caches.open(IMAGE_CACHE).then(c => c.keys()),
        ]).then(([static_, api, dynamic, images]) => {
          event.ports[0].postMessage({
            static: static_.length,
            api: api.length,
            dynamic: dynamic.length,
            images: images.length,
            total: static_.length + api.length + dynamic.length + images.length
          });
        })
      );
      break;
      
    default:
      console.log('Unknown message type:', type);
  }
});

/**
 * Periodic background sync to clean caches
 */
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'clean-cache') {
    event.waitUntil(
      Promise.all([
        cleanExpiredCache(API_CACHE, CACHE_CONFIG.api.maxAge),
        cleanExpiredCache(STATIC_CACHE, CACHE_CONFIG.static.maxAge),
        cleanExpiredCache(DYNAMIC_CACHE, CACHE_CONFIG.dynamic.maxAge),
        cleanExpiredCache(IMAGE_CACHE, CACHE_CONFIG.images.maxAge),
      ])
    );
  }
});

console.log('📝 Service Worker loaded');