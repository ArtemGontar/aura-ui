import { Prediction, HoroscopeData, CompatibilityData, AffirmationData, DreamBookData } from "../types/prediction";
import api from "./api";

const API_BASE = `/api/fortunes`;

export const getPredictions = async (page: number, top: number): Promise<{ data: Prediction[], total: number }> => {
  try {
    const response = await api.get(`${API_BASE}`, {
      params: { page, top }
    });
    if (response.status === 404) {
      return { data: [], total: 0 };
    }
    const parsedData = response.data.items.map((prediction: Prediction) => ({
      ...prediction,
      content: JSON.parse(prediction.content as unknown as string),
    }));
    return { data: parsedData, total: response.data.totalItems };
  } catch (error) {
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
    console.error("Error fetching response:", error);
    throw error;
  }
};

export const getCompatibility = async (partnerData: {
   firstName: string; lastName: string; dateOfBirth: string
}): Promise<CompatibilityData> => {
  try {
    const response = await api.post<{ content: string }>(`${API_BASE}/compatibility`, partnerData);
    const parsedData: CompatibilityData = JSON.parse(response.data.content);
    return parsedData;
  } catch (error) {
    console.error("Error fetching response", error);
    throw error;
  }
}

export const getAffirmation = async (goal: string): Promise<AffirmationData> => {
  try {
    const response = await api.post<{ content: string }>(`${API_BASE}/affirmation`, { goal });
    const parsedData: AffirmationData = JSON.parse(response.data.content);
    return parsedData;
  } catch (error) {
    console.error("Error fetching response", error);
    throw error;
  }
};

export const getDreamInterpretation = async (dreamText: string): Promise<DreamBookData> => {
  try {
    const response = await api.post<{ content: string }>(`${API_BASE}/dream`, { dreamText });
    const parsedData: DreamBookData = JSON.parse(response.data.content);
    return parsedData;
  } catch (error) {
    console.error("Error fetching dream response", error);
    throw error;
  }
};

export const getTarotReading = async (spreadType = "Three Cards") => {
  try {
    const response = await api.post<{ content: string }>(`${API_BASE}/tarot-reading`, { 
      spreadType 
    });
    const parsedData = JSON.parse(response.data.content);
    return parsedData;
  } catch (error) {
    console.error("Error fetching tarot reading", error);
    throw error;
  }
};

export const getMagicBallAnswer = async (): Promise<string> => {
  return new Promise(() => {});
}