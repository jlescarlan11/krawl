'use client';

import dynamic from 'next/dynamic';

const MapArea = dynamic(() => import('@/components/MapArea'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-neutral-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-verde-600 mx-auto mb-4"></div>
        <p className="text-neutral-600">Loading map...</p>
      </div>
    </div>
  ),
});

export default function MapWrapper() {
  return (
    <div className="w-full h-full">
      <MapArea />
    </div>
  );
}

