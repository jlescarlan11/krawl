'use client';

import { useEffect, useState, useCallback } from 'react';
import { checkActualConnectivity } from '../utils/network';

export interface NetworkStatus {
  isOnline: boolean;
  effectiveType?: string; // '4g', '3g', '2g', 'slow-2g'
  downlink?: number; // Mbps
  rtt?: number; // Round-trip time in ms
  saveData?: boolean;
}

// Get API base URL from environment
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

/**
 * Custom hook for detecting network status
 * Returns online/offline state and network connection quality
 * Uses actual connectivity checks instead of relying on navigator.onLine
 */
export function useNetworkStatus(): NetworkStatus {
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>({
    isOnline: true, // Optimistically assume online initially
  });

  const updateNetworkStatus = useCallback(async () => {
    const connection = (navigator as any).connection || 
                      (navigator as any).mozConnection || 
                      (navigator as any).webkitConnection;

    // Perform actual connectivity check
    let actuallyOnline = false;
    try {
      console.log('🔍 Checking connectivity...');
      
      // First try the backend health endpoint
      console.log(`📡 Trying backend health check: ${API_BASE_URL}/health`);
      actuallyOnline = await checkActualConnectivity(`${API_BASE_URL}/health`);
      
      // If backend check failed, try a local resource as fallback
      if (!actuallyOnline) {
        console.log('⚠️ Backend health check failed, trying fallback...');
        actuallyOnline = await checkActualConnectivity('/manifest.json');
      } else {
        console.log('✅ Backend health check passed!');
      }
      
      console.log(`📶 Network status: ${actuallyOnline ? 'ONLINE' : 'OFFLINE'}`);
    } catch (error) {
      console.error('❌ Error during connectivity check:', error);
      actuallyOnline = false;
    }

    setNetworkStatus({
      isOnline: actuallyOnline,
      effectiveType: connection?.effectiveType,
      downlink: connection?.downlink,
      rtt: connection?.rtt,
      saveData: connection?.saveData,
    });
  }, []);

  useEffect(() => {
    // Initial update
    updateNetworkStatus();

    // Periodic connectivity check (every 10 seconds)
    const intervalId = setInterval(updateNetworkStatus, 10000);

    // Listen for online/offline events as hints to check immediately
    const handleOnline = () => {
      console.log('🟢 Network: Online event detected, verifying...');
      updateNetworkStatus();
    };

    const handleOffline = () => {
      console.log('🔴 Network: Offline event detected, verifying...');
      updateNetworkStatus();
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Listen for connection quality changes (if supported)
    const connection = (navigator as any).connection || 
                      (navigator as any).mozConnection || 
                      (navigator as any).webkitConnection;

    if (connection) {
      connection.addEventListener('change', updateNetworkStatus);
    }

    // Cleanup
    return () => {
      clearInterval(intervalId);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      if (connection) {
        connection.removeEventListener('change', updateNetworkStatus);
      }
    };
  }, [updateNetworkStatus]);

  return networkStatus;
}

/**
 * Hook that triggers a callback when network status changes
 */
export function useNetworkStatusChange(
  onOnline?: () => void,
  onOffline?: () => void
) {
  const { isOnline } = useNetworkStatus();

  useEffect(() => {
    if (isOnline && onOnline) {
      onOnline();
    } else if (!isOnline && onOffline) {
      onOffline();
    }
  }, [isOnline, onOnline, onOffline]);

  return isOnline;
}

