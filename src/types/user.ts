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
}

export interface UserStats {
  streak: number;
  crystalBalance: number;
}

export interface Subscription {
  plan: string;
  expiration: string;
}