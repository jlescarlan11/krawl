import { apiFetch } from '@/lib/api';
import { API_ROUTES } from '@/lib/api/routes';
import type { UserProfile, MyProfile, UpdateMyProfileInput } from '@/types/user';

export function getPublicProfile(username: string) {
  return apiFetch<UserProfile>(API_ROUTES.USERS.BY_USERNAME(username), {
    method: 'GET',
  });
}

export function getMyProfile() {
  return apiFetch<MyProfile>(API_ROUTES.USERS.ME, {
    method: 'GET',
  });
}

export function updateMyProfile(input: UpdateMyProfileInput) {
  return apiFetch<MyProfile>(API_ROUTES.USERS.ME, {
    method: 'PUT',
    body: JSON.stringify(input),
  });
}


