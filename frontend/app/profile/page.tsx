'use client';

import AppLayout from '@/components/AppLayout';
import { useEffect, useState } from 'react';
import { getMyProfile } from '@/lib/users';
import type { MyProfile } from '@/types/user';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileEditModal from '@/components/profile/ProfileEditModal';
import ProfileStats from '@/components/profile/ProfileStats';
import PageHeaderBar from '@/components/common/PageHeaderBar';
import TierScoreBanner from './TierScoreBanner';
import ProfileSkeleton from '@/components/skeletons/ProfileSkeleton';
import { toUiProfileSelf } from '@/lib/users/uiProfile';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const [profile, setProfile] = useState<MyProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editOpen, setEditOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const { logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    let mounted = true;
    getMyProfile()
      .then((p) => mounted && setProfile(p))
      .catch((e) => mounted && setError(e?.message ?? 'Failed to load'))
      .finally(() => mounted && setLoading(false));
    return () => { mounted = false; };
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AppLayout showBottomNav={true}>
      <div className="h-full overflow-auto">
        <div className="max-w-5xl mx-auto">
          {loading && <ProfileSkeleton />}
          {error && <div className="body-base text-red-600 p-4">{error}</div>}
          {!loading && profile && (
            <div className="space-y-6">
              <PageHeaderBar
                title="Your Profile"
                action={
                  <button
                    type="button"
                    className="px-4 py-2 rounded-md border border-neutral-300"
                    onClick={() => router.back()}
                  >
                    Back
                  </button>
                }
              />

              <div className="p-4 space-y-6">
                {(() => {
                  const ui = toUiProfileSelf(profile as MyProfile);
                  return (
                    <ProfileHeader
                      username={ui.username}
                      bio={ui.bio ?? undefined}
                      memberSince={ui.memberSince}
                    />
                  );
                })()}
                
<TierScoreBanner
  tier={toUiProfileSelf(profile as MyProfile).tier}
  score={toUiProfileSelf(profile as MyProfile).score}
  subtitle={toUiProfileSelf(profile as MyProfile).tier === 'Krawl Master' ? 'Platform Ambassador — No higher tier' : undefined}
/>

                <ProfileStats
                  gemsCreated={profile.gemsCreated}
                  krawlsCreated={profile.krawlsCreated}
                />

                <div className="border-t border-neutral-200" />

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    className="flex-1 sm:flex-none px-4 py-2 rounded-md border border-neutral-300"
                    onClick={() => setEditOpen(true)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="flex-1 sm:flex-none px-4 py-2 rounded-md border border-red-300 text-red-700 hover:bg-red-50 disabled:opacity-50"
                    onClick={async () => {
                      if (loggingOut) return;
                      setLoggingOut(true);
                      try {
                        await logout();
                        router.push('/login');
                      } finally {
                        setLoggingOut(false);
                      }
                    }}
                    disabled={loggingOut}
                  >
                    {loggingOut ? 'Logging out…' : 'Log out'}
                  </button>
                </div>

                <ProfileEditModal
                  open={editOpen}
                  initialUsername={profile.username}
                  initialBio={profile.bio}
                  onClose={() => setEditOpen(false)}
                  onUpdated={(p) => setProfile(p)}
                />

                <div className="pt-4 border-t border-neutral-200">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors"
                  >
                    Log Out
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}