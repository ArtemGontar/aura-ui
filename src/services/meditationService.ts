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
    if (response.status === 404) {
      return { data: [], total: 0 };
    }
    return { 
      data: response.data.items || [], 
      total: response.data.totalItems || 0 
    };
  } catch (error) {
    console.error("Error ", error);
    throw error;
  }
};

export const createPersonalMeditation = async (settings: MeditationSettings): Promise<Meditation> => {
  try {
    const response = await api.post<Meditation>(`${API_BASE}`, settings);
    return response.data;
  } catch (error) {
    console.error("Error creating meditation:", error);
    throw error;
  }
};