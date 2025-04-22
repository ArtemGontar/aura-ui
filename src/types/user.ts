export interface UserData {
  id: number;
  firstName: string;
  lastName?: string;
  username?: string;
  languageCode?: string;
  isPremium?: boolean;
  photoUrl?: string;
  dateOfBirth?: string;
  zodiacSign?: string;
  sex?: string;
  maritalStatus?: string;
  userSubscription?: UserSubscription;
  stats?: UserStats;
}

export interface UserStats {
  streak: number;
  coinBalance: number;
}

export interface Subscription {
  name: string;
  price: number;
}

export interface UserSubscription {
  id: number;
  name: string;
  startDate: string;
  endDate?: string;
  isActive: boolean;
  subscription: Subscription;
}

export interface UserState {
  userData: UserData | null;
  userStats: UserStats;
  userSubscription: UserSubscription | null;
  isUserLoading: boolean;
  isStatsLoading: boolean;
  isSubscriptionLoading: boolean;
  error: string | null;
}