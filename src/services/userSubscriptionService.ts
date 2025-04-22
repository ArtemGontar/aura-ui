import { API_CONFIG } from "../config/api";
import { UserSubscription } from "../types/user";
import api from "./api";

const API_BASE = `${API_CONFIG.BASE_URL}/api/users`;

export const getUserSubscription = async (userId: number): Promise<UserSubscription | null> => {
  try {
    const response = await api.get(`${API_BASE}/${userId}/subscription`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user subscription", error);
    if (error.response && error.response.status === 404) {
      // User doesn't have a subscription
      return null;
    }
    throw error;
  }
};

export const hasActiveSubscription = async (userId: number): Promise<boolean> => {
  try {
    const subscription = await getUserSubscription(userId);
    return !!subscription && subscription.isActive;
  } catch (error) {
    console.error("Error checking subscription status", error);
    return false;
  }
};
