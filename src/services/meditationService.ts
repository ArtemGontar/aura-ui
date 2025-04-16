import api from "./api";
import { Meditation, MeditationSettings } from "../types/meditation";

const API_BASE = `/api/meditations`;

export const getMeditations = async (type: string): Promise<Meditation[]> => {
  try {
    const response = await api.get<Meditation[]>(`${API_BASE}?type=${type}`);
    
    console.log("response", response.data);

    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.warn("No meditations found, returning empty array");
      return [];
    }
    console.error("Error ", error);
    throw error;
  }
};

export const createPersonalMeditation = async (settings: MeditationSettings): Promise<Meditation> => {
  try {
    const response = await api.post<Meditation>(`${API_BASE}`, settings);
    
    console.log("response", response.data);

    return response.data;
  } catch (error) {
    console.error("Error creating meditation:", error);
    throw error;
  }
};