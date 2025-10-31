import type { MyProfile } from '@/types/user';

export type UIProfile = {
  username: string;
  bio?: string | null;
  memberSince?: string; // ISO
  tier: string;
  score: number;
};

export function toUiProfileSelf(self: MyProfile): UIProfile {
  return {
    username: self.username,
    bio: self.bio,
    memberSince: self.createdAt,
    tier: self.reputationTier,
    score: self.creatorScore,
  };
}

export type PublicProfile = {
  username: string;
  bio?: string | null;
  joinDate?: string;
  tier: string;
  score: number;
  gemsCreated?: number;
  krawlsCreated?: number;
};

export function toUiProfilePublic(pub: PublicProfile): UIProfile {
  return {
    username: pub.username,
    bio: pub.bio,
    memberSince: pub.joinDate,
    tier: pub.tier,
    score: pub.score,
  };
}


