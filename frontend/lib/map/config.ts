export const MAP_CONFIG = {
  MANILA_CENTER: [120.9842, 14.5995] as [number, number],
  DEFAULT_ZOOM: 16,
  DEFAULT_PITCH: 60,
  MAX_PITCH: 85,
  DEFAULT_BEARING: 0,
  OFFLINE_TIMEOUT_MS: 5000,
  
  VERDE_MARKER_COLOR: '#2d7a3e',
  
  SAMPLE_LOCATIONS: [
    { lat: 14.5995, lng: 120.9842, title: 'Sample Location 1' },
    { lat: 14.6042, lng: 120.9822, title: 'Sample Location 2' },
    { lat: 14.5925, lng: 120.9960, title: 'Sample Location 3' },
  ],
  
  BUILDING_COLORS: {
    SHORT: '#e8f5e9',
    MEDIUM: '#c8e6c9',
    TALL: '#a5d6a7',
    VERY_TALL: '#81c784',
  },
} as const;

export const CATEGORIES = [
  { id: 'food', label: 'Food & Drink', icon: 'LuUtensils' },
  { id: 'landmarks', label: 'Landmarks', icon: 'LuLandmark' },
  { id: 'hidden-gems', label: 'Hidden Gems', icon: 'LuMapPin' },
  { id: 'photo-spots', label: 'Photo Spots', icon: 'LuCamera' },
] as const;