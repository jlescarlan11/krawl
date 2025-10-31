import { apiFetch } from '@/lib/api';
import type { UserProfile, MyProfile, UpdateMyProfileInput } from '@/types/user';

export function getPublicProfile(username: string) {
  return apiFetch<UserProfile>(`/users/${encodeURIComponent(username)}`, {
    method: 'GET',
  });
}

export function getMyProfile() {
  return apiFetch<MyProfile>('/users/me', {
    method: 'GET',
  });
}

export function updateMyProfile(input: UpdateMyProfileInput) {
  return apiFetch<MyProfile>('/users/me', {
    method: 'PUT',
    body: JSON.stringify(input),
  });
}


