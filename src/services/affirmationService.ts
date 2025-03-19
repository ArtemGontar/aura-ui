import api from "./api";
import { Affirmation } from "../types/Affirmation";

const API_BASE = `/api/affirmations`;

export const getAffirmations = async (): Promise<Affirmation[]> => {
  try {
    const response = await api.get<Affirmation[]>(`${API_BASE}`);
    
    console.log("response", response.data);

    return response.data;
  } catch (error) {
    console.error("Error ", error);
    throw error;
  }
};
