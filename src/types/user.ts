export interface UserData {
  id: number;
  firstName: string;
  lastName: string | undefined;
  username: string | undefined;
  dateOfBirth?: string;
  isPremium: boolean;
  photoUrl: string | undefined;
  languageCode: string | undefined;
}