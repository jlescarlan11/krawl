'use client';

import { memo } from 'react';
import { LuWifiOff, LuPlus } from 'react-icons/lu';
import Link from 'next/link';
import 'maplibre-gl/dist/maplibre-gl.css';
import { useNetworkStatus } from '@/lib/hooks/useNetworkStatus';
import { useMapInitialization } from '@/lib/map/hooks/useMapInitialization';
import { OfflineOverlay } from './map/OfflineOverlay';
import { MapSearchHeader } from './map/MapSearchHeader';

function MapArea() {
  const { isOnline } = useNetworkStatus();
  
  const {
    mapContainerRef,
    mapLoaded,
    mapError,
    showOfflineOverlay,
  } = useMapInitialization({
    isOnline,
    onMapLoaded: () => console.log('Map loaded callback'),
    onMapError: (error) => console.error('Map error callback:', error),
  });

  return (
    <div className="w-full h-full relative">
      {/* Offline Overlay */}
      {showOfflineOverlay && <OfflineOverlay />}

      {/* Offline Indicator Badge */}
      {!isOnline && mapLoaded && !showOfflineOverlay && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-[1001] bg-yellow-500/90 backdrop-blur-md text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-3 duration-300">
          <LuWifiOff size={16} />
          <span className="text-sm font-medium">Offline Mode - Using Cached Map</span>
        </div>
      )}

      {/* Map Error Banner */}
      {isOnline && mapError && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-[1001] bg-red-500/90 backdrop-blur-md text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-3 duration-300">
          <LuWifiOff size={16} />
          <span className="text-sm font-medium">{mapError}</span>
        </div>
      )}

      {/* Search Header */}
      <MapSearchHeader />

      {/* Floating Action Button */}
      <Link
        href="/add"
        title="Add new gem"
        className="fixed bottom-20 md:bottom-6 right-6 w-14 h-14 bg-verde-600 hover:bg-verde-700 text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-105 z-[1000]"
        aria-label="Add new gem"
      >
        <LuPlus size={24} />
      </Link>

      {/* Map Container */}
      <div 
        ref={mapContainerRef} 
        className="w-full h-full relative z-0"
        style={{ background: '#f5f5dc' }}
      />
    </div>
  );
}

export default memo(MapArea);