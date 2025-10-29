import maplibregl from 'maplibre-gl';
import { MAP_CONFIG } from '../config';

/**
 * Adds 3D building extrusion layer to the map
 * Uses verde-themed color gradient based on building height
 * Gracefully handles different map styles that may not support 3D buildings
 */
export function add3DBuildingsLayer(map: maplibregl.Map): void {
  try {
    const style = map.getStyle();
    
    // Check if we have the required source
    if (!style.sources['openmaptiles']) {
      console.log('ℹ️ 3D buildings not available in this map style (openmaptiles source not found)');
      return;
    }

    // Try to add 3D buildings layer
    map.addLayer({
      'id': '3d-buildings',
      'source': 'openmaptiles',
      'source-layer': 'building',
      'type': 'fill-extrusion',
      'minzoom': 15,
      'paint': {
        // Use solid verde color for compatibility
        'fill-extrusion-color': MAP_CONFIG.BUILDING_COLORS.MEDIUM,
        'fill-extrusion-height': [
          'interpolate',
          ['linear'],
          ['zoom'],
          15, 0,
          15.05, ['get', 'height']
        ],
        'fill-extrusion-base': [
          'interpolate',
          ['linear'],
          ['zoom'],
          15, 0,
          15.05, ['get', 'min_height']
        ],
        'fill-extrusion-opacity': 0.6
      }
    });
    
    console.log('✅ 3D buildings layer added successfully');
  } catch (error) {
    // Fail silently - 3D buildings are a nice-to-have feature
    console.log('ℹ️ 3D buildings not available in this map style');
  }
}

