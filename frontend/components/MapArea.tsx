'use client';

import { useEffect, useRef, memo, useState } from 'react';
import { LuSearch, LuUtensils, LuMapPin, LuLandmark, LuCamera, LuPlus, LuWifiOff } from 'react-icons/lu';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import Link from 'next/link';
import { useNetworkStatus } from '@/lib/hooks/useNetworkStatus';

const categories = [
  { id: 'food', label: 'Food & Drink', icon: LuUtensils },
  { id: 'landmarks', label: 'Landmarks', icon: LuLandmark },
  { id: 'hidden-gems', label: 'Hidden Gems', icon: LuMapPin },
  { id: 'photo-spots', label: 'Photo Spots', icon: LuCamera },
];

function MapArea() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const [is3DView, setIs3DView] = useState(true);
  const is3DViewRef = useRef(true); // Ref to track 3D state in event listeners
  const { isOnline } = useNetworkStatus(); // Track network status
  const [mapError, setMapError] = useState<string | null>(null); // Track map errors
  const [mapLoaded, setMapLoaded] = useState(false); // Track if map successfully loaded
  const [showOfflineOverlay, setShowOfflineOverlay] = useState(false); // Only show if map fails to load offline
  const offlineTimeoutRef = useRef<NodeJS.Timeout | null>(null); // Timeout for showing offline overlay

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // TODO: Replace 'YOUR_MAPTILER_API_KEY' with your actual MapTiler API key
    // Get free key at: https://cloud.maptiler.com/account/keys/
    const MAPTILER_API_KEY = process.env.NEXT_PUBLIC_MAPTILER_API_KEY;
    
    console.log(`🗺️ Initializing map - ${isOnline ? 'online' : 'offline (will use cache if available)'} mode`);
    
    // Initialize MapLibre GL map centered on Manila, Philippines
    // Even when offline, try to initialize - service worker will serve cached resources
    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      // Using MapTiler Streets V4 style (latest version - vector tiles - super smooth!)
      // Other styles: 'basic-v2', 'bright-v2', 'outdoor-v2', 'winter-v2', 'satellite', 'hybrid'
      style: `https://api.maptiler.com/maps/streets-v4/style.json?key=${MAPTILER_API_KEY}`,
      center: [120.9842, 14.5995], // [lng, lat] - Note: MapLibre uses [lng, lat] not [lat, lng]
      zoom: 16, // Closer zoom level - shows street-level detail (was 13)
      pitch: 60, // 3D tilt angle - MAXIMUM tilt for dramatic 3D effect
      bearing: 0, // Rotation angle (0-360) - 0 is north
      maxPitch: 85, // Allow maximum possible tilt (85 is the limit in MapLibre)
    });

    // Add navigation controls (zoom buttons only - we'll add custom compass)
    map.addControl(
      new maplibregl.NavigationControl({
        showCompass: false, // We'll add custom compass with 3D toggle
        showZoom: true,
        visualizePitch: false,
      }),
      'bottom-left'
    );

    // Custom compass/3D toggle control (like MapTiler)
    class CompassControl {
      _map: maplibregl.Map | undefined;
      _container: HTMLDivElement | undefined;

      onAdd(map: maplibregl.Map) {
        this._map = map;
        this._container = document.createElement('div');
        this._container.className = 'maplibregl-ctrl maplibregl-ctrl-group';
        
        const button = document.createElement('button');
        button.className = 'maplibregl-ctrl-compass';
        button.type = 'button';
        button.setAttribute('aria-label', 'Toggle 3D view and reset bearing to north');
        button.title = 'Toggle 3D View'
        
        // Add compass icon
        const icon = document.createElement('span');
        icon.className = 'maplibregl-ctrl-icon';
        icon.setAttribute('aria-hidden', 'true');
        icon.innerHTML = `<svg width="29" height="29" viewBox="0 0 29 29" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
          <path d="m 10.5,14 a 4,4 0 1 0 8,0 a 4,4 0 1 0 -8,0 z m 4,-1.5 a 1.5,1.5 0 1 1 0,3 a 1.5,1.5 0 1 1 0,-3 z M 14.5,7 L 12,11 l 5,0 z" />
        </svg>`;
        
        button.appendChild(icon);
        
        button.onclick = () => {
          // Toggle 3D view
          const currentPitch = map.getPitch();
          const newIs3D = currentPitch === 0;
          is3DViewRef.current = newIs3D;
          setIs3DView(newIs3D);
          
          // Animate to north bearing with 3D toggle
          map.easeTo({
            bearing: 0,
            pitch: newIs3D ? 60 : 0,
            duration: 1000,
          });
        };
        
        this._container.appendChild(button);
        return this._container;
      }

      onRemove() {
        this._container?.parentNode?.removeChild(this._container);
        this._map = undefined;
      }
    }

    // Add custom compass control
    map.addControl(new CompassControl() as any, 'bottom-left');

    // Add geolocate control (center map on user location)
    map.addControl(
      new maplibregl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
        fitBoundsOptions: {
          maxZoom: 17, // Zoom closer when locating user (was default ~15)
        },
      }),
      'bottom-left'
    );

    // When offline, give service worker time to serve cached resources before showing overlay
    if (!isOnline) {
      console.log('⏳ Offline mode - waiting for cached resources (5s timeout)...');
      offlineTimeoutRef.current = setTimeout(() => {
        if (!mapLoaded) {
          console.warn('⚠️ Map failed to load offline within timeout - no cached resources available');
          setShowOfflineOverlay(true);
        }
      }, 5000); // Give 5 seconds for cache to load
    }

    // Handle map errors (e.g., failed to fetch style or tiles when offline)
    map.on('error', (e) => {
      console.error('Map error:', e);
      
      // Check if it's a network-related error
      const errorMessage = e.error?.message || '';
      const isNetworkError = 
        errorMessage.includes('Failed to fetch') || 
        errorMessage.includes('AJAXError') ||
        errorMessage.includes('NetworkError') ||
        e.error?.status === 0 ||
        !navigator.onLine;
      
      if (isNetworkError && !isOnline) {
        // Offline - but don't show overlay immediately, timeout will handle it
        console.warn('⚠️ Network error while offline (expected if no cache):', errorMessage);
      } else if (isNetworkError) {
        setMapError('Unable to load map resources. Check your internet connection.');
      } else if (e.error) {
        // Log other errors but don't show to user unless critical
        console.warn('Non-critical map error:', errorMessage);
      }
    });

    // Track when map successfully loads
    map.on('load', () => {
      console.log('✅ Map loaded successfully');
      setMapLoaded(true);
      setShowOfflineOverlay(false);
      setMapError(null);
      
      // Clear offline timeout - map loaded successfully!
      if (offlineTimeoutRef.current) {
        clearTimeout(offlineTimeoutRef.current);
        offlineTimeoutRef.current = null;
      }
    });

    // Clear error when tiles successfully load
    map.on('sourcedata', (e) => {
      if (e.isSourceLoaded) {
        setMapError(null);
        if (!mapLoaded) {
          setMapLoaded(true);
          setShowOfflineOverlay(false);
          
          // Clear offline timeout - tiles loaded!
          if (offlineTimeoutRef.current) {
            clearTimeout(offlineTimeoutRef.current);
            offlineTimeoutRef.current = null;
          }
        }
      }
    });

    // Wait for map to load before adding markers and 3D buildings
    map.on('load', () => {
        const zoomInButton = document.querySelector('.maplibregl-ctrl-zoom-in');
        if (zoomInButton) {
            zoomInButton.setAttribute('title', 'Zoom In');
        }

        const zoomOutButton = document.querySelector('.maplibregl-ctrl-zoom-out');
        if (zoomOutButton) {
            zoomOutButton.setAttribute('title', 'Zoom Out');
        }
      // Enable 3D buildings if available in the style
      const layers = map.getStyle().layers;
      const buildingLayer = layers?.find(layer => layer.id === 'building');
      
      if (buildingLayer) {
        // Add 3D extrusion to buildings with verde-themed colors
        map.addLayer({
          'id': '3d-buildings',
          'source': 'openmaptiles',
          'source-layer': 'building',
          'type': 'fill-extrusion',
          'minzoom': 15,
          'paint': {
            // Gradient from light to dark based on building height
            'fill-extrusion-color': [
              'interpolate',
              ['linear'],
              ['get', 'render_height'],
              0, '#e8f5e9',      // Short buildings - light verde
              30, '#c8e6c9',     // Medium buildings
              60, '#a5d6a7',     // Tall buildings
              100, '#81c784'     // Very tall buildings - darker verde
            ],
            'fill-extrusion-height': ['get', 'render_height'],
            'fill-extrusion-base': ['get', 'render_min_height'],
            'fill-extrusion-opacity': 0.85
          }
        });
      }

      // Add sample markers (replace with actual data later)
    const sampleLocations = [
      { lat: 14.5995, lng: 120.9842, title: 'Sample Location 1' },
      { lat: 14.6042, lng: 120.9822, title: 'Sample Location 2' },
      { lat: 14.5925, lng: 120.9960, title: 'Sample Location 3' },
    ];

    sampleLocations.forEach((location) => {
        // Create popup
        const popup = new maplibregl.Popup({ offset: 25 }).setHTML(
          `<strong>${location.title}</strong>`
        );

        // Create marker
        const marker = new maplibregl.Marker({
          color: '#2d7a3e', // Verde color
        })
          .setLngLat([location.lng, location.lat])
          .setPopup(popup)
          .addTo(map);

        markersRef.current.push(marker);
      });
    });

    mapRef.current = map;

    // Cleanup
    return () => {
      // Clear offline timeout
      if (offlineTimeoutRef.current) {
        clearTimeout(offlineTimeoutRef.current);
        offlineTimeoutRef.current = null;
      }
      
      // Remove all markers
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];

      // Remove map
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [isOnline]); // Re-run when online status changes

  // Show online notification when connection is restored
  useEffect(() => {
    if (isOnline && mapRef.current === null) {
      console.log('🟢 Connection restored - map will initialize');
    }
  }, [isOnline]);

  return (
    <div className="w-full h-full relative">
      {/* Offline Overlay - Only show when offline AND map fails to load (no cached resources) */}
      {showOfflineOverlay && (
        <div className="absolute inset-0 z-[999] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
          <div className="max-w-md w-full mx-4 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 text-center">
            {/* Icon */}
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <LuWifiOff className="w-10 h-10 text-white" />
              </div>
            </div>

            {/* Message */}
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Map Unavailable Offline
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Map tiles require an internet connection to load. Only areas you&apos;ve previously viewed while online will be cached.
            </p>

            {/* Info Box */}
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6 text-left">
              <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
                💡 To use maps offline:
              </h3>
              <ol className="text-sm text-blue-800 dark:text-blue-400 space-y-1 list-decimal list-inside">
                <li>Connect to the internet</li>
                <li>Navigate around your favorite areas on the map</li>
                <li>Map tiles will be cached for 30 days</li>
                <li>Those areas will work offline next time!</li>
              </ol>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Link
                href="/krawls"
                className="block w-full bg-gradient-to-r from-verde-500 to-verde-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-verde-600 hover:to-verde-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                View Saved Krawls
              </Link>
              <Link
                href="/explore"
                className="block w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold py-3 px-6 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-200"
              >
                Browse Gems
              </Link>
            </div>

            {/* Connection Status */}
            <div className="mt-6 flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
              <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
              Offline Mode
            </div>
          </div>
        </div>
      )}

      {/* Offline Indicator Badge - shown when offline but map is working from cache */}
      {!isOnline && mapLoaded && !showOfflineOverlay && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-[1001] bg-yellow-500/90 backdrop-blur-md text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-3 duration-300">
          <LuWifiOff size={16} />
          <span className="text-sm font-medium">Offline Mode - Using Cached Map</span>
        </div>
      )}

      {/* Map Error Banner (shown only when online but map fails) */}
      {isOnline && mapError && (
        <div className="absolute top-16 left-1/2 -translate-x-1/2 z-[1001] bg-red-500/90 backdrop-blur-md text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 animate-in fade-in slide-in-from-top-3 duration-300">
          <LuWifiOff size={16} />
          <span className="text-sm font-medium">{mapError}</span>
        </div>
      )}

      {/* Floating Header - positioned absolutely within map */}
      <header className="absolute top-0 left-0 right-0 z-[1000] h-[60px]">
        <div className="flex items-center gap-3 px-4 h-full">
          
          {/* Search Bar - Glass morphism effect */}
          <div className="flex-1 max-w-2xl relative">
            <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-600 z-10" size={20} />
            <input
              type="text"
              placeholder="Search gems, krawls, locations..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-verde-500 focus:border-transparent bg-white/80 backdrop-blur-md border border-white/40 shadow-lg hover:bg-white/90 transition-all"
            />
          </div>
          
          {/* Category Filters - Glass morphism effect */}
          <div className="hidden lg:flex items-center gap-2">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                    title={category.label}
                  className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/80 backdrop-blur-md border border-white/40 hover:bg-verde-100/80 hover:border-verde-400/60 hover:text-verde-700 transition-all text-sm font-medium text-neutral-700 shadow-lg"
                >
                  <Icon size={16} />
                  <span className="hidden xl:inline">{category.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

            {/* Floating Action Button - Add Gem */}
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

// Export memoized version to prevent unnecessary rerenders when parent components update
export default memo(MapArea);
