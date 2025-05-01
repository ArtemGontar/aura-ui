import { FeatureQuota } from "../types/quota";
import api, { is404Error } from './api';

const API_BASE = `/api/quota`;

export const getQuota = async (): Promise<FeatureQuota[]> => {
  try {
    const response = await api.get(`${API_BASE}`);
    return response.data;
  } catch (error) {
    if (is404Error(error)) {
      return [];
    }
    console.error("Error fetching user data", error);
    throw error;
  }
};