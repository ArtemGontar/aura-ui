import { Compatibility, Horoscope, Prediction } from "../types/prediction";
import api from "./api";

const API_BASE = `/api/fortunes`;

export const getPredictions = async (page: number, limit: number): Promise<Prediction[]> => {
  try {
    const response = await api.get(`${API_BASE}`, {
      params: { page, limit }
    });
    return response.data;
  } catch (error) {
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
      careerFinancialInsights: parsedData.careerFinancialInsights
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
      compatibilityScore: parsedData.compatibilityScore,
      strengths: parsedData.strengths,
      challenges: parsedData.challenges,
      todayScenario: parsedData.todayScenario
    };
  } catch (error) {
    console.error("Error fetching compatibility", error);
    throw error;
  }
}

export const getMagicBallAnswer = async (): Promise<string> => {
 return new Promise(() => {});
}