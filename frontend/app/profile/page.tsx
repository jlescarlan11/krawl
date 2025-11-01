'use client';

import AppLayout from '@/components/AppLayout';
import { useEffect, useState, lazy, Suspense } from 'react';
import { getMyProfile } from '@/lib/users';
import type { MyProfile } from '@/types/user';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileStats from '@/components/profile/ProfileStats';
import PageHeaderBar from '@/components/common/PageHeaderBar';
import TierScoreBanner from './TierScoreBanner';
import ProfileSkeleton from '@/components/skeletons/ProfileSkeleton';
import { toUiProfileSelf } from '@/lib/users/uiProfile';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import ErrorAlert from '@/components/common/ErrorAlert';

const ProfileEditModal = lazy(() => import('@/components/profile/ProfileEditModal'));

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

  return (
    <AppLayout showBottomNav={true}>
      <div className="h-full overflow-auto">
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          {loading && <ProfileSkeleton />}
          {error && (
            <ErrorAlert
              title="Failed to load profile"
              message={error}
              onRetry={() => window.location.reload()}
            />
          )}
          {!loading && profile && (
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4">
                <h1 className="heading-2">Your Profile</h1>
                <Button
                  variant="ghost"
                  onClick={() => router.back()}
                  aria-label="Back to Map"
                  size="sm"
                >
                  Back to Map
                </Button>
              </div>

              <div className="p-4 space-y-4">
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

                <div className="pt-4 flex flex-col sm:flex-row gap-4">
                  <Button
                    variant="primary"
                    onClick={() => setEditOpen(true)}
                    className="flex-1 sm:flex-none"
                  >
                    Edit Profile
                  </Button>
                  <Button
                    variant="destructive"
                    loading={loggingOut}
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
                    className="flex-1 sm:flex-none"
                  >
                    Log out
                  </Button>
                </div>

                {editOpen && (
                  <Suspense fallback={null}>
                    <ProfileEditModal
                      open={editOpen}
                      initialUsername={profile.username}
                      initialBio={profile.bio}
                      onClose={() => setEditOpen(false)}
                      onUpdated={(p) => setProfile(p)}
                    />
                  </Suspense>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </AppLayout>
  );
}