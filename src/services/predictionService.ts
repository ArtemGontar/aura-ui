import axios from "axios";
import api from "./api";

const API_BASE = `/api/fortunes`;

export const getHoroscope = async (): Promise<{
  generalGuidance: string;
  loveRelationshipsAdvice: string;
  careerFinancialInsights: string;
}> => {
  try {
    const response = await api.get<{ content: string }>(`${API_BASE}/daily-horoscope`);
    
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

export const getCompatibility = async (): Promise<string> => {
  try {
    const response = await api.get(`${API_BASE}/compatibility`);
    console.log("response", response.data);
    return response.data;
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