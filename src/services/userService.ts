import axios from "axios";
import { UserData } from "../types/user";
import { store } from "../store";
import { setUserData, setBirthDate } from "../store/slices/userSlice";

export const saveUserData = async (userData: UserData) => {
  try {
    const response = await axios.post("/api/saveUserData", userData);
    store.dispatch(setUserData(userData));
    return response.data;
  } catch (error) {
    console.error("Error saving user data", error);
    throw error;
  }
};

export const getUserData = async (userId: string) => {
  try {
    const response = await axios.get(`/api/getUserData/${userId}`);
    store.dispatch(setUserData(response.data));
    return response.data;
  } catch (error) {
    console.error("Error fetching user data", error);
    throw error;
  }
};

export const saveUserBirthDate = async (dateOfBirth: string): Promise<void> => {
  try {
    await axios.post("/api/saveUserBirthDate", { dateOfBirth });
    store.dispatch(setBirthDate(dateOfBirth));
  } catch (error) {
    console.error("Error saving user birth date", error);
    throw error;
  }
};

export const getUserBirthDate = async (): Promise<string | null> => {
  try {
    const response = await axios.get("/api/getUserBirthDate");
    const birthDate = response.data.birthDate || null;
    if (birthDate) {
      store.dispatch(setBirthDate(birthDate));
    }
    return birthDate;
  } catch (error) {
    console.error("Error fetching user birth date", error);
    throw error;
  }
};

export const getUserDataFromStore = (): UserData | null => {
  return store.getState().user.userData;
};

export const getDailyPredictionStreak = (): number => {
  return store.getState().user.userStats.streak;
};

export const getCrystalBalance = (): number => {
  return store.getState().user.userStats.crystalBalance;
};