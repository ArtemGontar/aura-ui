import api from "./api";
import { Meditation, MeditationSettings, MeditationCategory } from "../types/meditation";

const API_BASE = `/api/meditations`;

export const getMeditations = async (
  type: string, 
  page: number = 1, 
  top: number = 5, 
  category?: MeditationCategory | "All"
): Promise<{ data: Meditation[], total: number }> => {
  try {
    let url = `${API_BASE}?type=${type}&page=${page}&top=${top}`;
    
    if (category && category !== "All") {
      url += `&category=${category}`;
    }
    
    const response = await api.get(url);
    
    console.log("meditation response", response.data);

    // Match the prediction service format
    return { 
      data: response.data.items || [], 
      total: response.data.totalItems || 0 
    };
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.warn("No meditations found, returning empty array");
      return { data: [], total: 0 };
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