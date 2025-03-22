import api from "./api";
import { Meditation } from "../types/meditation";

const API_BASE = `/api/meditations`;

export const getMeditations = async (): Promise<Meditation[]> => {
  try {
    const response = await api.get<Meditation[]>(`${API_BASE}`);
    
    console.log("response", response.data);

    return response.data;
  } catch (error) {
    console.error("Error ", error);
    throw error;
  }
};
