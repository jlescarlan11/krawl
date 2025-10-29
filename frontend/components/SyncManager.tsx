'use client';

import { useEffect } from 'react';
import { useNetworkStatusChange } from '@/lib/hooks/useNetworkStatus';
import { processSyncQueue } from '@/lib/db/syncManager';

/**
 * Component that automatically syncs queued changes when network is restored
 */
export default function SyncManager() {
  useNetworkStatusChange(
    () => {
      // When coming back online
      console.log('🌐 Network restored, processing sync queue...');
      processSyncQueue().catch(error => {
        console.error('Failed to process sync queue:', error);
      });
    },
    () => {
      // When going offline
      console.log('📴 Network lost, entering offline mode');
    }
  );

  // Also check on mount (in case there are pending items from previous session)
  useEffect(() => {
    const checkPendingSync = async () => {
      try {
        await processSyncQueue();
      } catch (error) {
        console.error('Error processing sync queue on mount:', error);
      }
    };

    // Wait a bit for DB to initialize
    const timeoutId = setTimeout(checkPendingSync, 2000);
    return () => clearTimeout(timeoutId);
  }, []);

  // This component doesn't render anything
  return null;
}

