import axios from "axios";
import api from "./api";

const API_BASE = `/api/fortunes`;

export const getHoroscope = async (): Promise<{
  generalGuidance: string;
  loveRelationshipsAdvice: string;
  careerFinancialInsights: string;
}> => {
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
}): Promise<{
  compatibilityScore: string;
  strengths: string[];
  challenges: string[];
  todayScenario: string;
}> => {
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
  try {
    const response = await axios.get("/api/getMagicBallAnswer");
    return response.data.answer;
  } catch (error) {
    console.error("Error fetching Magic Ball answer", error);
    throw error;
  }
};

export const getPsychologicalInsight = async (data: {
  focusArea: string;
  concern: string;
  emotionalState: string;
  goal: string;
  backgroundInfo: string;
}): Promise<string> => {
  try {
    const response = await axios.post("/api/getPsychologicalInsight", data);
    return response.data.insight;
  } catch (error) {
    console.error("Error fetching psychological insight", error);
    throw error;
  }
};

export const getPredictionHistory = async (page: number, limit: number): Promise<string[]> => {
  try {
    const response = await api.get<{ predictions: string[] }>(`${API_BASE}/history`, {
      params: { page, limit }
    });
    return response.data.predictions;
  } catch (error) {
    console.error("Error fetching prediction history", error);
    throw error;
  }
};