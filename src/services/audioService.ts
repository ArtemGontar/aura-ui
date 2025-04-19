import api from "./api";

const API_BASE = `/api/audio`;

export const getAudioSasUrl = async (audioUrl: string): Promise<string> => {
  try {
    const response = await api.get(`${audioUrl}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching audio SAS URL:", error);
    throw error;
  }
};

export const downloadAudio = async (audioUrl: string) => {
  try {
    const fileName = audioUrl.split('/').pop() || '';
    await api.post(`${API_BASE}/meditations/download-via-telegram`, {fileName});
  } catch (error) {
    console.error("Error downloading audio:", error);
    throw error;
  }
};