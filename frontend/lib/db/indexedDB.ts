// lib/db/indexedDB.ts
// Core IndexedDB initialization and configuration

import { DBSchema, openDB, IDBPDatabase } from 'idb';
import type {
  Gem,
  Krawl,
  User,
  Tag,
  GemPhoto,
  SyncQueueItem,
  AppSettings,
} from './types';

// Database schema definition
interface KrawlDB extends DBSchema {
  gems: {
    key: string;
    value: Gem;
    indexes: {
      'by-creator': string;
      'by-status': string;
      'by-synced': number;
    };
  };
  krawls: {
    key: string;
    value: Krawl;
    indexes: {
      'by-creator': string;
      'by-visibility': string;
      'by-downloaded': boolean;
    };
  };
  users: {
    key: string;
    value: User;
    indexes: { 'by-username': string };
  };
  tags: {
    key: number;
    value: Tag;
    indexes: { 'by-name': string };
  };
  photos: {
    key: string;
    value: GemPhoto;
    indexes: { 'by-gem': string };
  };
  syncQueue: {
    key: number;
    value: SyncQueueItem;
    indexes: {
      'by-synced': number;
      'by-timestamp': string;
    };
  };
  settings: {
    key: string;
    value: AppSettings;
  };
}

const DB_NAME = 'KrawlDB';
const DB_VERSION = 2; // Incremented: Changed synced fields from boolean to number

let dbInstance: IDBPDatabase<KrawlDB> | null = null;

/**
 * Initialize IndexedDB with schema
 */
export async function initDB(): Promise<IDBPDatabase<KrawlDB>> {
  if (dbInstance) {
    return dbInstance;
  }

  dbInstance = await openDB<KrawlDB>(DB_NAME, DB_VERSION, {
    upgrade(db, oldVersion, newVersion, transaction) {
      console.log(`📦 Upgrading database from v${oldVersion} to v${newVersion}`);

      // Create Gems store
      if (!db.objectStoreNames.contains('gems')) {
        const gemStore = db.createObjectStore('gems', {
          keyPath: 'gem_id',
        });
        gemStore.createIndex('by-creator', 'founder_id', { unique: false });
        gemStore.createIndex('by-status', 'approval_status', {
          unique: false,
        });
        gemStore.createIndex('by-synced', '_synced', { unique: false });
        console.log('✅ Created gems store');
      }

      // Create Krawls store
      if (!db.objectStoreNames.contains('krawls')) {
        const krawlStore = db.createObjectStore('krawls', {
          keyPath: 'krawl_id',
        });
        krawlStore.createIndex('by-creator', 'creator_id', { unique: false });
        krawlStore.createIndex('by-visibility', 'visibility', {
          unique: false,
        });
        krawlStore.createIndex('by-downloaded', '_downloaded', {
          unique: false,
        });
        console.log('✅ Created krawls store');
      }

      // Create Users store
      if (!db.objectStoreNames.contains('users')) {
        const userStore = db.createObjectStore('users', {
          keyPath: 'user_id',
        });
        userStore.createIndex('by-username', 'username', { unique: true });
        console.log('✅ Created users store');
      }

      // Create Tags store
      if (!db.objectStoreNames.contains('tags')) {
        const tagStore = db.createObjectStore('tags', {
          keyPath: 'tag_id',
        });
        tagStore.createIndex('by-name', 'tag_name', { unique: true });
        console.log('✅ Created tags store');
      }

      // Create Photos store
      if (!db.objectStoreNames.contains('photos')) {
        const photoStore = db.createObjectStore('photos', {
          keyPath: 'photo_id',
        });
        photoStore.createIndex('by-gem', 'gem_id', { unique: false });
        console.log('✅ Created photos store');
      }

      // Create Sync Queue store
      if (!db.objectStoreNames.contains('syncQueue')) {
        const syncStore = db.createObjectStore('syncQueue', {
          keyPath: 'id',
          autoIncrement: true,
        });
        syncStore.createIndex('by-synced', 'synced', { unique: false });
        syncStore.createIndex('by-timestamp', 'timestamp', { unique: false });
        console.log('✅ Created syncQueue store');
      }

      // Create Settings store
      if (!db.objectStoreNames.contains('settings')) {
        db.createObjectStore('settings', {
          keyPath: 'key',
        });
        console.log('✅ Created settings store');
      }
    },
    blocked() {
      console.warn('⚠️ Database upgrade blocked by another tab');
    },
    blocking() {
      console.warn('⚠️ This tab is blocking a database upgrade');
    },
  });

  console.log('✅ IndexedDB initialized successfully');
  return dbInstance;
}

/**
 * Get the database instance (initialize if needed)
 */
export async function getDB(): Promise<IDBPDatabase<KrawlDB>> {
  if (!dbInstance) {
    return await initDB();
  }
  return dbInstance;
}

/**
 * Close the database connection
 */
export function closeDB(): void {
  if (dbInstance) {
    dbInstance.close();
    dbInstance = null;
    console.log('🔒 Database connection closed');
  }
}

/**
 * Clear all data from the database (useful for logout/reset)
 */
export async function clearAllData(): Promise<void> {
  const db = await getDB();
    const stores = [
    'gems',
    'krawls',
    'users',
    'tags',
    'photos',
    'syncQueue',
  ] as const;

  const tx = db.transaction([...stores], 'readwrite');

  await Promise.all([
    ...stores.map((store) => tx.objectStore(store).clear()),
    tx.done,
  ]);

  console.log('🗑️ All data cleared from IndexedDB');
}

/**
 * Delete the entire database
 */
export async function deleteDatabase(): Promise<void> {
  closeDB();
  await new Promise<void>((resolve, reject) => {
    const request = indexedDB.deleteDatabase(DB_NAME);
    request.onsuccess = () => {
      console.log('🗑️ Database deleted successfully');
      resolve();
    };
    request.onerror = () => reject(request.error);
  });
}

/**
 * Check if database is initialized
 */
export function isDBInitialized(): boolean {
  return dbInstance !== null;
}

/**
 * Get database stats (for debugging)
 */
export async function getDatabaseStats(): Promise<{
  gems: number;
  krawls: number;
  users: number;
  tags: number;
  photos: number;
  syncQueue: number;
}> {
  const db = await getDB();
  
  return {
    gems: await db.count('gems'),
    krawls: await db.count('krawls'),
    users: await db.count('users'),
    tags: await db.count('tags'),
    photos: await db.count('photos'),
    syncQueue: await db.count('syncQueue'),
  };
}

