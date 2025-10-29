'use client';

import { useEffect, useState } from 'react';
import { initDB, getDatabaseStats } from '@/lib/db';

/**
 * Client component that initializes IndexedDB on mount
 */
export default function DBInitializer() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const initialize = async () => {
      try {
        console.log('🔧 Initializing IndexedDB...');
        await initDB();
        
        if (!mounted) return;

        // Get stats for debugging
        const stats = await getDatabaseStats();
        console.log('📊 Database stats:', stats);
        
        setIsInitialized(true);
        console.log('✅ IndexedDB ready for offline storage');
      } catch (err) {
        console.error('❌ IndexedDB initialization failed:', err);
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Failed to initialize database');
        }
      }
    };

    initialize();

    return () => {
      mounted = false;
    };
  }, []);

  // This component doesn't render anything visible
  // It just handles the side effect of initializing the database
  if (error) {
    console.error('Database error:', error);
  }

  return null;
}

