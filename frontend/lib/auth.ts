'use client';

import { apiFetch } from '@/lib/api';

export type User = { id: string; email: string; username?: string; name?: string };
export type AuthResponse = { token: string; user: User };

// Backend response structure
type BackendAuthResponse = {
  token: string;
  type: string;
  userId: string;
  email: string;
  username: string;
};

export async function login(data: { email: string; password: string }) {
  const payload = { emailOrUsername: data.email, password: data.password };
  const backendRes = await apiFetch<BackendAuthResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  
  // Transform backend response to frontend format
  return {
    token: backendRes.token,
    user: {
      id: backendRes.userId,
      email: backendRes.email,
      username: backendRes.username,
    },
  };
}

export async function register(data: { username: string; email: string; password: string }) {
  const backendRes = await apiFetch<BackendAuthResponse>('/auth/register', {
    method: 'POST',
    body: JSON.stringify({
      username: data.username,
      email: data.email,
      password: data.password,
    }),
  });
  
  // Transform backend response to frontend format
  return {
    token: backendRes.token,
    user: {
      id: backendRes.userId,
      email: backendRes.email,
      username: backendRes.username,
    },
  };
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
