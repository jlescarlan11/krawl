'use client';

import { apiFetch } from '@/lib/api';
import { API_ROUTES } from '@/lib/api/routes';

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
  const backendRes = await apiFetch<BackendAuthResponse>(API_ROUTES.AUTH.LOGIN, {
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
  const backendRes = await apiFetch<BackendAuthResponse>(API_ROUTES.AUTH.REGISTER, {
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
  return apiFetch<void>(API_ROUTES.AUTH.PASSWORD_RESET_REQUEST, {
    method: 'POST',
    body: JSON.stringify({ email: data.email }),
  });
}

export async function resetPassword(data: { token: string; newPassword: string }) {
  return apiFetch<void>(API_ROUTES.AUTH.PASSWORD_RESET, {
    method: 'POST',
    body: JSON.stringify({ token: data.token, newPassword: data.newPassword }),
  });
}

export async function me() {
  return apiFetch<User>(API_ROUTES.AUTH.ME, { method: 'GET' });
}

export async function logout() {
  return apiFetch<{ message: string }>(API_ROUTES.AUTH.LOGOUT, { method: 'POST' });
}

export async function registerRequest(data: { username: string; email: string; captchaToken: string }) {
  return apiFetch<void>(API_ROUTES.AUTH.REGISTER_REQUEST, {
    method: 'POST',
    body: JSON.stringify({ username: data.username, email: data.email, captchaToken: data.captchaToken }),
  });
}

export async function registerComplete(data: { token: string; password: string }) {
  const backendRes = await apiFetch<BackendAuthResponse>(API_ROUTES.AUTH.REGISTER_COMPLETE, {
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
