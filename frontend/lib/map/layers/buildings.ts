import maplibregl from 'maplibre-gl';
import { MAP_CONFIG } from '../config';

/**
 * Adds 3D building extrusion layer to the map
 * Uses verde-themed color gradient based on building height
 */
export function add3DBuildingsLayer(map: maplibregl.Map): void {
  const layers = map.getStyle().layers;
  const buildingLayer = layers?.find(layer => layer.id === 'building');
  
  if (!buildingLayer) {
    console.warn('⚠️ Building layer not found in map style');
    return;
  }

  try {
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
          0, MAP_CONFIG.BUILDING_COLORS.SHORT,      // Short buildings
          30, MAP_CONFIG.BUILDING_COLORS.MEDIUM,    // Medium buildings
          60, MAP_CONFIG.BUILDING_COLORS.TALL,      // Tall buildings
          100, MAP_CONFIG.BUILDING_COLORS.VERY_TALL // Very tall buildings
        ],
        'fill-extrusion-height': ['get', 'render_height'],
        'fill-extrusion-base': ['get', 'render_min_height'],
        'fill-extrusion-opacity': 0.85
      }
    });
    console.log('✅ 3D buildings layer added');
  } catch (error) {
    console.error('❌ Failed to add 3D buildings layer:', error);
  }
}

