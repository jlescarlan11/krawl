import AppLayout from '@/components/AppLayout';
import { config } from '@/lib/config/env';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileStats from '@/components/profile/ProfileStats';
import PageHeaderBar from '@/components/common/PageHeaderBar';
import TierScoreBanner from '@/app/profile/TierScoreBanner';
import { toUiProfilePublic } from '@/lib/users/uiProfile';

type Params = { username: string };

async function fetchPublicProfile(username: string) {
  const basePath = config.api.getBasePath();
  const res = await fetch(`${basePath}/users/${encodeURIComponent(username)}`, {
    cache: 'no-store',
  });
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error('Failed to load profile');
  }
  return res.json();
}

export default async function UserProfilePage({ params }: { params: Promise<Params> }) {
  const { username } = await params;
  const profile = await fetchPublicProfile(username);

  return (
    <AppLayout showBottomNav={true}>
      <div className="h-full overflow-auto">
        {!profile ? (
          <div className="max-w-5xl mx-auto text-center p-4">
            <h1 className="heading-3">User not found</h1>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto">
            <PageHeaderBar
              title={`@${profile.username}'s profile`}
              action={
                <button
                  type="button"
                  className="px-4 py-2 rounded-md bg-verde-700 text-white hover:bg-verde-800"
                >
                  Vouch
                </button>
              }
            />

            <div className="p-4 space-y-6">
              {(() => {
                const ui = toUiProfilePublic(profile);
                return (
                  <ProfileHeader
                    username={ui.username}
                    bio={ui.bio ?? undefined}
                    memberSince={ui.memberSince}
                  />
                );
              })()}

              {(() => {
                const ui = toUiProfilePublic(profile);
                return (
                  <TierScoreBanner tier={ui.tier} score={ui.score} />
                );
              })()}

              <ProfileStats
                gemsCreated={profile.gemsCreated}
                krawlsCreated={profile.krawlsCreated}
              />
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}