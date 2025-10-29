// lib/db/userStore.ts
// User and settings-related IndexedDB operations

import { getDB } from './indexedDB';
import type { User, AppSettings } from './types';

/**
 * Save current user profile
 */
export async function saveCurrentUser(user: User): Promise<void> {
  const db = await getDB();
  await db.put('users', user);
  
  // Also save user ID in settings
  await saveSetting('currentUserId', user.user_id);
}

/**
 * Get current user
 */
export async function getCurrentUser(): Promise<User | null> {
  const userId = await getSetting('currentUserId');
  if (!userId) return null;

  const db = await getDB();
  const user = await db.get('users', userId);
  return user || null;
}

/**
 * Clear current user (logout)
 */
export async function clearCurrentUser(): Promise<void> {
  await deleteSetting('currentUserId');
}

/**
 * Save a user to the cache
 */
export async function saveUser(user: User): Promise<void> {
  const db = await getDB();
  await db.put('users', user);
}

/**
 * Get a user by ID
 */
export async function getUser(userId: string): Promise<User | undefined> {
  const db = await getDB();
  return await db.get('users', userId);
}

/**
 * Get all cached users
 */
export async function getAllUsers(): Promise<User[]> {
  const db = await getDB();
  return await db.getAll('users');
}

/**
 * Save a setting
 */
export async function saveSetting(key: string, value: any): Promise<void> {
  const db = await getDB();
  await db.put('settings', {
    key,
    value,
    updated_at: new Date().toISOString(),
  });
}

/**
 * Get a setting
 */
export async function getSetting(key: string): Promise<any> {
  const db = await getDB();
  const setting = await db.get('settings', key);
  return setting?.value;
}

/**
 * Delete a setting
 */
export async function deleteSetting(key: string): Promise<void> {
  const db = await getDB();
  await db.delete('settings', key);
}

/**
 * Get all settings
 */
export async function getAllSettings(): Promise<AppSettings[]> {
  const db = await getDB();
  return await db.getAll('settings');
}

/**
 * Check if user is logged in
 */
export async function isUserLoggedIn(): Promise<boolean> {
  const userId = await getSetting('currentUserId');
  return !!userId;
}

