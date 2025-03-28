import axios from "axios";
import { store } from "../store";
import { setUserStats } from "../store/slices/userSlice";
import { API_CONFIG } from "../config/api";

export interface UserStats {
  streak: number;
  crystalBalance: number;
}

const API_BASE = `${API_CONFIG.BASE_URL}/api/users`;

export const getUserStats = async (userId: string): Promise<UserStats> => {
  try {
    const response = await axios.get(`${API_BASE}/${userId}/stats`);
    store.dispatch(setUserStats(response.data));
    return response.data;
  } catch (error) {
    console.error("Error fetching user stats", error);
    throw error;
  }
};

export const incrementStreak = async (userId: string): Promise<UserStats> => {
  try {
    const response = await axios.put(`${API_BASE}/${userId}/stats/streak`);
    store.dispatch(setUserStats(response.data));
    return response.data;
  } catch (error) {
    console.error("Error incrementing streak", error);
    throw error;
  }
};

export const getUserStatsFromStore = (): UserStats => {
  return store.getState().user.userStats;
}; 