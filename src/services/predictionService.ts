import { Prediction, HoroscopeData, CompatibilityData, AffirmationData } from "../types/prediction";
import api from "./api";

const API_BASE = `/api/fortunes`;

export const getPredictions = async (page: number, limit: number): Promise<{ data: Prediction[], total: number }> => {
  try {
    const response = await api.get(`${API_BASE}`, {
      params: { page, limit }
    });
    const parsedData = response.data.items.map((prediction: Prediction) => ({
      ...prediction,
      content: JSON.parse(prediction.content as unknown as string),
    }));
    return { data: parsedData, total: response.data.totalItems };
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.warn("No predictions found, returning empty array");
      return { data: [], total: 0 };
    }
    console.error("Error fetching prediction history", error);
    throw error;
  }
};

export const getHoroscope = async (): Promise<HoroscopeData> => {
  try {
    const response = await api.post<{ content: string }>(`${API_BASE}/daily-horoscope`);
    const parsedData: HoroscopeData = JSON.parse(response.data.content);
    return parsedData;
  } catch (error) {
    console.error("Error parsing GPT horoscope response:", error);
    throw error;
  }
};

export const getCompatibility = async (partnerData: {
   firstName: string; lastName: string; dateOfBirth: string
}): Promise<CompatibilityData> => {
  try {
    const response = await api.post<{ content: string }>(`${API_BASE}/compatibility`, partnerData);
    console.log("response", response.data);

    const parsedData: CompatibilityData = JSON.parse(response.data.content);

    return parsedData;
  } catch (error) {
    console.error("Error fetching compatibility", error);
    throw error;
  }
}

export const getMagicBallAnswer = async (): Promise<string> => {
 return new Promise(() => {});
}

export const getAffirmation = async (goal: string): Promise<AffirmationData> => {
  try {
    const response = await api.post<{ content: string }>(`${API_BASE}/affirmation`, { goal });
    console.log("content", response.data);
    const parsedData: AffirmationData = JSON.parse(response.data.content);
    console.log("parsedData", parsedData);
    return parsedData;
  } catch (error) {
    console.error("Error fetching affirmation", error);
    throw error;
  }
};

export const getDreamInterpretation = async (dreamText: string): Promise<string> => {
  try {
    const response = await api.post<{ content: string }>(`${API_BASE}/dream`, { dreamText });
    return response.data.content;
  } catch (error) {
    console.error("Error fetching dream interpretation", error);
    throw error;
  }
};