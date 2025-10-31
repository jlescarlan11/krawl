export interface UserProfile {
  username: string;
  bio?: string | null;
  joinDate: string;
  score: number;
  tier: string;
  gemsCreated: number;
  krawlsCreated: number;
}

export interface MyProfile {
  userId: string;
  username: string;
  email: string;
  bio?: string | null;
  creatorScore: number;
  reputationTier: string;
  createdAt: string;
  updatedAt: string;
  gemsCreated: number;
  krawlsCreated: number;
}

export interface UpdateMyProfileInput {
  username?: string;
  bio?: string;
}


