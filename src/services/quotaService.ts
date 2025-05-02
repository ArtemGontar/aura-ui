import { FeatureQuota } from "../types/quota";
import api from './api';

const API_BASE = `/api/quota`;

export const getQuota = async (): Promise<FeatureQuota[]> => {
  try {
    const response = await api.get(`${API_BASE}`);
    if (response.status === 404) {
      return [];
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching user data", error);
    throw error;
  }
};