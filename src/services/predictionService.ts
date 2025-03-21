import { Compatibility, Horoscope, Prediction } from "../types/prediction";
import api from "./api";

const API_BASE = `/api/fortunes`;

export const getPredictions = async (page: number, limit: number): Promise<{ data: Prediction[], total: number }> => {
  try {
    const response = await api.get(`${API_BASE}`, {
      params: { page, limit }
    });
    return { data: response.data.items, total: response.data.totalItems };
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.warn("No predictions found, returning empty array");
      return { data: [], total: 0 };
    }
    console.error("Error fetching prediction history", error);
    throw error;
  }
};

export const getHoroscope = async (): Promise<Horoscope> => {
  try {
    const response = await api.post<{ content: string }>(`${API_BASE}/daily-horoscope`);
    
    console.log("response", response.data.content);
    // Parse the extracted JSON string
    const parsedData = JSON.parse(response.data.content);

    return {
      generalGuidance: parsedData.generalGuidance,
      loveRelationshipsAdvice: parsedData.loveRelationshipsAdvice,
      careerFinancialInsights: parsedData.careerFinancialInsights,
      focus: parsedData.focus
    };
  } catch (error) {
    console.error("Error parsing GPT horoscope response:", error);
    throw error;
  }
};

export const getCompatibility = async (partnerData: {
   firstName: string; lastName: string; dateOfBirth: string
}): Promise<Compatibility> => {
  try {
    const response = await api.post<{ content: string }>(`${API_BASE}/compatibility`, partnerData);
    console.log("response", response.data);

    const parsedData = JSON.parse(response.data.content);

    return {
      emotionalScore: parsedData.emotionalScore,
      communicationScore: parsedData.communicationScore,
      passionScore: parsedData.passionScore,
      strengths: parsedData.strengths,
      challenges: parsedData.challenges
    };
  } catch (error) {
    console.error("Error fetching compatibility", error);
    throw error;
  }
}

export const getMagicBallAnswer = async (): Promise<string> => {
 return new Promise(() => {});
}