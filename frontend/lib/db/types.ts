// lib/db/types.ts
// TypeScript interfaces for IndexedDB data models

export interface Gem {
  gem_id: string;
  name: string;
  description?: string;
  location: {
    latitude: number;
    longitude: number;
  };
  founder_id?: string;
  vouch_count: number;
  average_rating: number;
  rating_count: number;
  approval_status: 'pending' | 'approved' | 'rejected';
  lifecycle_status: 'open' | 'closed' | 'flagged';
  tags?: string[];
  photos?: GemPhoto[];
  created_at: string;
  updated_at: string;
  // Offline sync fields
  _synced?: number; // 0 = not synced, 1 = synced
  _lastSynced?: string;
}

export interface GemPhoto {
  photo_id: string;
  gem_id: string;
  photo_url: string;
  caption?: string;
  is_featured: boolean;
}

export interface Krawl {
  krawl_id: string;
  title: string;
  description?: string;
  creator_id: string;
  creator_username?: string;
  visibility: 'public' | 'friends_only';
  average_rating: number;
  rating_count: number;
  items?: KrawlItem[];
  created_at: string;
  updated_at: string;
  // Offline fields
  _downloaded?: boolean;
  _lastDownloaded?: string;
  _synced?: number; // 0 = not synced, 1 = synced
}

export interface KrawlItem {
  krawl_item_id: string;
  krawl_id: string;
  gem_id: string;
  step_order: number;
  creator_note?: string;
  lokal_secret?: string;
}

export interface User {
  user_id: string;
  username: string;
  email: string;
  bio?: string;
  creator_score: number;
  reputation_tier: string;
  created_at: string;
}

export interface Tag {
  tag_id: number;
  tag_name: string;
}

export interface SyncQueueItem {
  id?: number;
  action: 'CREATE' | 'UPDATE' | 'DELETE';
  entity: 'gem' | 'krawl' | 'rating' | 'vouch';
  entityId: string;
  data: any;
  timestamp: string;
  retries: number;
  synced: number; // 0 = not synced, 1 = synced
}

export interface AppSettings {
  key: string;
  value: any;
  updated_at: string;
}

