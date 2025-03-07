export interface UserData {
  telegramId: number;
  firstName: string;
  lastName: string | undefined;
  username: string | undefined;
  dateOfBirth?: string;
  photoUrl: string | undefined;
  languageCode: string | undefined;
}