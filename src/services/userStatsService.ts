import { store } from "../store";
import { setUserStats } from "../store/slices/userSlice";
import { API_CONFIG } from "../config/api";
import api from "./api";
import { DEFAULT_USER_STATS } from "../constants/userStats";

export interface UserStats {
  streak: number;
  coinBalance: number;
}

const API_BASE = `${API_CONFIG.BASE_URL}/api/users`;

export const getUserStats = async (userId: number): Promise<UserStats> => {
  try {
    const response = await api.get(`${API_BASE}/${userId}/stats`);
    if (response.status === 404) {
      return DEFAULT_USER_STATS;
    }
    store.dispatch(setUserStats(response.data));
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const incrementStreak = async (userId: number): Promise<UserStats> => {
  try {
    const response = await api.put(`${API_BASE}/${userId}/stats/streak`);
    store.dispatch(setUserStats(response.data));
    return response.data;
  } catch (error) {
    throw error;
  }
};