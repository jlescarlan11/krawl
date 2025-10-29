// lib/db/index.ts
// Central export point for IndexedDB utilities

// Core database functions
export {
  initDB,
  getDB,
  closeDB,
  clearAllData,
  deleteDatabase,
  isDBInitialized,
  getDatabaseStats,
} from './indexedDB';

// Gem operations
export {
  saveGem,
  saveGems,
  getGem,
  getAllGems,
  getGemsByCreator,
  getGemsByStatus,
  getUnsyncedGems,
  searchGems,
  getGemsNearLocation,
  updateGem,
  deleteGem,
  countGems,
} from './gemStore';

// Krawl operations
export {
  saveKrawl,
  saveKrawls,
  getKrawl,
  getAllKrawls,
  getDownloadedKrawls,
  getKrawlsByCreator,
  markKrawlAsDownloaded,
  updateKrawl,
  deleteKrawl,
  searchKrawls,
  countKrawls,
  getPublicKrawls,
} from './krawlStore';

// User operations
export {
  saveCurrentUser,
  getCurrentUser,
  clearCurrentUser,
  saveUser,
  getUser,
  getAllUsers,
  saveSetting,
  getSetting,
  deleteSetting,
  getAllSettings,
  isUserLoggedIn,
} from './userStore';

// Sync queue operations
export {
  addToSyncQueue,
  getPendingSyncItems,
  markSyncItemCompleted,
  incrementSyncRetry,
  clearCompletedSyncItems,
  getSyncQueueCount,
  deleteSyncItem,
  clearAllSyncItems,
} from './syncQueue';

// Type exports
export type {
  Gem,
  GemPhoto,
  Krawl,
  KrawlItem,
  User,
  Tag,
  SyncQueueItem,
  AppSettings,
} from './types';

