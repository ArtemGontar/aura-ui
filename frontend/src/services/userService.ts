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