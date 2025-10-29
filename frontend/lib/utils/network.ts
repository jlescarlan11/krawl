/**
 * Network detection and utility functions
 */

/**
 * Check if the browser is currently online
 */
export function isOnline(): boolean {
  return typeof navigator !== 'undefined' ? navigator.onLine : true;
}

/**
 * Check if the browser is currently offline
 */
export function isOffline(): boolean {
  return !isOnline();
}

/**
 * Get network connection information (if available)
 */
export function getNetworkInfo() {
  const connection = (navigator as any).connection || 
                    (navigator as any).mozConnection || 
                    (navigator as any).webkitConnection;

  if (!connection) {
    return null;
  }

  return {
    effectiveType: connection.effectiveType,
    downlink: connection.downlink,
    rtt: connection.rtt,
    saveData: connection.saveData,
  };
}

/**
 * Check if network connection is slow
 */
export function isSlowConnection(): boolean {
  const info = getNetworkInfo();
  if (!info) return false;

  return info.effectiveType === 'slow-2g' || 
         info.effectiveType === '2g' ||
         (info.rtt && info.rtt > 1000);
}

/**
 * Check if user has enabled data saver mode
 */
export function isDataSaverEnabled(): boolean {
  const info = getNetworkInfo();
  return info?.saveData || false;
}

/**
 * Wait for network to be online
 * Returns a promise that resolves when online
 */
export function waitForOnline(timeout?: number): Promise<void> {
  return new Promise((resolve, reject) => {
    if (isOnline()) {
      resolve();
      return;
    }

    let timeoutId: NodeJS.Timeout | undefined;

    const handleOnline = () => {
      window.removeEventListener('online', handleOnline);
      if (timeoutId) clearTimeout(timeoutId);
      resolve();
    };

    window.addEventListener('online', handleOnline);

    if (timeout) {
      timeoutId = setTimeout(() => {
        window.removeEventListener('online', handleOnline);
        reject(new Error('Network timeout'));
      }, timeout);
    }
  });
}

/**
 * Ping a URL to check actual connectivity
 * navigator.onLine can give false positives
 * Returns true if we get ANY response (even 404), false only if network fails
 */
export async function checkActualConnectivity(url: string = '/manifest.json'): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
    
    // Determine if this is a same-origin request
    const isSameOrigin = url.startsWith('/') || url.startsWith(window.location.origin);
    
    const response = await fetch(url, {
      method: 'HEAD',
      cache: 'no-cache',
      signal: controller.signal,
      // Use no-cors for cross-origin requests to avoid CORS errors blocking connectivity check
      mode: isSameOrigin ? 'cors' : 'no-cors',
    });
    
    clearTimeout(timeoutId);
    
    // Any response (including 404, 405 for HEAD not allowed) means we're connected
    // For no-cors mode, we get an opaque response but that still means network is working
    console.log(`✅ Connectivity check passed for ${url}`, response.type, response.status || '(opaque)');
    return true;
  } catch (error: any) {
    // AbortError means timeout, which actually means we might be online but slow
    if (error.name === 'AbortError') {
      console.log(`⏱️ Connectivity check timed out for ${url}, assuming offline`);
    } else {
      console.log(`❌ Connectivity check failed for ${url}:`, error.message);
    }
    return false;
  }
}

