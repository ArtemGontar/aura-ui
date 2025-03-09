export interface UserData {
  id: number;
  firstName: string;
  lastName?: string;
  username?: string;
  languageCode?: string;
  isPremium?: boolean;
  photoUrl?: string;
  dateOfBirth?: string;
}

export interface UserStats {
  streak: number;
  crystalBalance: number;
}