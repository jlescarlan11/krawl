import { useEffect, useRef, useState } from 'react';
import maplibregl from 'maplibre-gl';
import { MAP_CONFIG } from '../config';
import { CompassControl } from '../controls/CompassControl';
import { add3DBuildingsLayer } from '../layers/buildings';
import { addSampleMarkers } from '../markers';

export interface UseMapInitializationOptions {
  isOnline: boolean;
  onMapLoaded?: () => void;
  onMapError?: (error: string) => void;
}

export function useMapInitialization(options: UseMapInitializationOptions) {
  const { isOnline, onMapLoaded, onMapError } = options;
  
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const offlineTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const [is3DView, setIs3DView] = useState(true);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  const [showOfflineOverlay, setShowOfflineOverlay] = useState(false);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const MAPTILER_API_KEY = process.env.NEXT_PUBLIC_MAPTILER_API_KEY;
    
    console.log(`🗺️ Initializing map - ${isOnline ? 'online' : 'offline (will use cache if available)'} mode`);

    // Initialize map
    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: `https://api.maptiler.com/maps/streets-v4/style.json?key=${MAPTILER_API_KEY}`,
      center: MAP_CONFIG.MANILA_CENTER,
      zoom: MAP_CONFIG.DEFAULT_ZOOM,
      pitch: MAP_CONFIG.DEFAULT_PITCH,
      bearing: MAP_CONFIG.DEFAULT_BEARING,
      maxPitch: MAP_CONFIG.MAX_PITCH,
    });

    // Add controls
    map.addControl(
      new maplibregl.NavigationControl({
        showCompass: false,
        showZoom: true,
        visualizePitch: false,
      }),
      'bottom-left'
    );

    map.addControl(
      new CompassControl({
        onToggle: setIs3DView,
      }) as any,
      'bottom-left'
    );

    map.addControl(
      new maplibregl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true,
        fitBoundsOptions: { maxZoom: 17 },
      }),
      'bottom-left'
    );

    // Setup offline timeout
    if (!isOnline) {
      console.log('⏳ Offline mode - waiting for cached resources (5s timeout)...');
      offlineTimeoutRef.current = setTimeout(() => {
        if (!mapLoaded) {
          console.warn('⚠️ Map failed to load offline within timeout');
          setShowOfflineOverlay(true);
        }
      }, MAP_CONFIG.OFFLINE_TIMEOUT_MS);
    }

    // Error handling
    map.on('error', (e) => {
      console.error('Map error:', e);
      
      const errorMessage = e.error?.message || '';
      const isNetworkError = 
        errorMessage.includes('Failed to fetch') || 
        errorMessage.includes('AJAXError') ||
        errorMessage.includes('NetworkError') ||
        e.error?.status === 0 ||
        !navigator.onLine;
      
      if (isNetworkError && !isOnline) {
        console.warn('⚠️ Network error while offline (expected if no cache):', errorMessage);
      } else if (isNetworkError) {
        const error = 'Unable to load map resources. Check your internet connection.';
        setMapError(error);
        onMapError?.(error);
      }
    });

    // Load handling
    map.on('load', () => {
      console.log('✅ Map loaded successfully');
      setMapLoaded(true);
      setShowOfflineOverlay(false);
      setMapError(null);
      onMapLoaded?.();
      
      if (offlineTimeoutRef.current) {
        clearTimeout(offlineTimeoutRef.current);
        offlineTimeoutRef.current = null;
      }

      // Setup accessibility
      const zoomInButton = document.querySelector('.maplibregl-ctrl-zoom-in');
      if (zoomInButton) zoomInButton.setAttribute('title', 'Zoom In');

      const zoomOutButton = document.querySelector('.maplibregl-ctrl-zoom-out');
      if (zoomOutButton) zoomOutButton.setAttribute('title', 'Zoom Out');

      // Add 3D buildings
      add3DBuildingsLayer(map);

      // Add sample markers
      const markers = addSampleMarkers(map);
      markersRef.current = markers;
    });

    map.on('sourcedata', (e) => {
      if (e.isSourceLoaded && !mapLoaded) {
        setMapLoaded(true);
        setShowOfflineOverlay(false);
        setMapError(null);
        
        if (offlineTimeoutRef.current) {
          clearTimeout(offlineTimeoutRef.current);
          offlineTimeoutRef.current = null;
        }
      }
    });

    mapRef.current = map;

    // Cleanup
    return () => {
      if (offlineTimeoutRef.current) {
        clearTimeout(offlineTimeoutRef.current);
      }
      
      markersRef.current.forEach((marker) => marker.remove());
      markersRef.current = [];

      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [isOnline, mapLoaded, onMapLoaded, onMapError]);

  return {
    mapContainerRef,
    mapRef,
    is3DView,
    mapLoaded,
    mapError,
    showOfflineOverlay,
  };
}