import api from "./api";


export const getAudioSasUrl = async (audioUrl: string): Promise<string> => {
  try {
    const response = await api.get(`${audioUrl}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching audio SAS URL:", error);
    throw error;
  }
};