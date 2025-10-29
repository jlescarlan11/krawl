'use client';

import { useNetworkStatus } from '@/lib/hooks/useNetworkStatus';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

/**
 * Component that displays network status and shows notifications
 * when connection changes
 */
export default function NetworkStatus() {
  const { isOnline, effectiveType } = useNetworkStatus();
  const [wasOffline, setWasOffline] = useState(false);

  useEffect(() => {
    if (!isOnline) {
      setWasOffline(true);
      toast.error('No internet connection', {
        description: 'You are now offline. Changes will sync when you reconnect.',
        duration: 5000,
      });
    } else if (wasOffline) {
      // User came back online
      toast.success('Back online!', {
        description: 'Syncing your changes...',
        duration: 3000,
      });
      setWasOffline(false);
    }
  }, [isOnline, wasOffline]);

  // Optional: Show persistent indicator
  if (!isOnline) {
    return (
      <div className="fixed top-0 left-0 right-0 bg-red-600 text-white text-center py-1 text-sm z-50">
        <span className="inline-flex items-center gap-2">
          <span className="animate-pulse">●</span>
          Offline mode
        </span>
      </div>
    );
  }

  // Optional: Show slow connection warning
  if (effectiveType === 'slow-2g' || effectiveType === '2g') {
    return (
      <div className="fixed top-0 left-0 right-0 bg-yellow-600 text-white text-center py-1 text-sm z-50">
        <span className="inline-flex items-center gap-2">
          <span className="animate-pulse">⚠</span>
          Slow connection
        </span>
      </div>
    );
  }

  return null;
}

