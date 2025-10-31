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
  return apiFetch<void>('/auth/password/reset-request', {
    method: 'POST',
    body: JSON.stringify({ email: data.email }),
  });
}

export async function resetPassword(data: { token: string; newPassword: string }) {
  return apiFetch<void>('/auth/password/reset', {
    method: 'POST',
    body: JSON.stringify({ token: data.token, newPassword: data.newPassword }),
  });
}

export async function me() {
  return apiFetch<User>('/auth/me', { method: 'GET' });
}

export async function logout() {
  return apiFetch<{ message: string }>('/auth/logout', { method: 'POST' });
}

export async function registerRequest(data: { username: string; email: string; captchaToken: string }) {
  return apiFetch<void>('/auth/register/request', {
    method: 'POST',
    body: JSON.stringify({ username: data.username, email: data.email, captchaToken: data.captchaToken }),
  });
}

export async function registerComplete(data: { token: string; password: string }) {
  const backendRes = await apiFetch<BackendAuthResponse>('/auth/register/complete', {
    method: 'POST',
    body: JSON.stringify({ token: data.token, password: data.password }),
  });
  return {
    token: backendRes.token,
    user: {
      id: backendRes.userId,
      email: backendRes.email,
      username: backendRes.username,
    },
  };
}
