import { UserData } from "../types/user";

const mockUserData: UserData = {
  telegramId: "123456789",
  firstName: "John",
  lastName: "Doe",
  username: "johndoe",
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