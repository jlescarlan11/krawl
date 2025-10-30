'use client';

import { apiFetch } from '@/lib/api';

export type User = { id: string; email: string; name?: string };
export type AuthResponse = { token: string; user: User };

export async function login(data: { email: string; password: string }) {
  const payload = { emailOrUsername: data.email, password: data.password };
  return apiFetch<AuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export async function register(data: { name: string; email: string; password: string }) {
  return apiFetch<AuthResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function forgotPassword(data: { email: string }) {
  // Adjust endpoint to match backend when implemented
  return apiFetch<{ message: string }>('/auth/forgot', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

export async function me() {
  return apiFetch<User>('/auth/me', { method: 'GET' });
}

export async function logout() {
  return apiFetch<{ message: string }>('/auth/logout', { method: 'POST' });
}
