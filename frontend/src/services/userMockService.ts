import { UserData } from "../types/user";

const mockUserData: UserData = {
  telegramId: "123456789",
  firstName: "John",
  lastName: "Doe",
  username: "johndoe",
  dateOfBirth: "1990-01-01", // Added dateOfBirth field
};

export const saveUserData = async (userData: UserData): Promise<UserData> => {
  console.log("Mock saveUserData called with:", userData);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(userData);
    }, 1000);
  });
};

export const getUserData = async (userId: string): Promise<UserData> => {
  console.log("Mock getUserData called with userId:", userId);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockUserData);
    }, 1000);
  });
};

export const saveUserBirthDate = async (dateOfBirth: string): Promise<void> => {
  console.log("Mock saveUserBirthDate called with:", dateOfBirth);
  return new Promise((resolve) => {
    setTimeout(() => {
      mockUserData.dateOfBirth = dateOfBirth;
      resolve();
    }, 1000);
  });
};

export const getUserBirthDate = async (): Promise<string | null> => {
  console.log("Mock getUserBirthDate called");
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockUserData.dateOfBirth || null);
    }, 1000);
  });
};