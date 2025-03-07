import axios from "axios";
import { UserData } from "../types/user";

export const saveUserData = async (userData: UserData) => {
  try {
    const response = await axios.post("/api/saveUserData", userData);
    return response.data;
  } catch (error) {
    console.error("Error saving user data", error);
    throw error;
  }
};

export const getUserData = async (userId: string) => {
  try {
    const response = await axios.get(`/api/getUserData/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data", error);
    throw error;
  }
};

export const saveUserBirthDate = async (dateOfBirth: string): Promise<void> => {
  try {
    await axios.post("/api/saveUserBirthDate", { dateOfBirth });
  } catch (error) {
    console.error("Error saving user birth date", error);
    throw error;
  }
};

export const getUserBirthDate = async (): Promise<string | null> => {
  try {
    const response = await axios.get("/api/getUserBirthDate");
    return response.data.birthDate || null;
  } catch (error) {
    console.error("Error fetching user birth date", error);
    throw error;
  }
};

export const getUserDataFromStorage = (): UserData | null => {
  try {
    const savedUserData = localStorage.getItem("telegramUserData");
    return savedUserData ? JSON.parse(savedUserData) : null;
  } catch (error) {
    console.error('Error reading user data from storage:', error);
    return null;
  }
};

export const getDailyPredictionStreak = (): number => {
  // TODO: Replace with actual API call
  return 12;
};

export const getCrystalBalance = (): number => {
  // TODO: Replace with actual API call
  return 12131;
};