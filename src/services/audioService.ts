import api, { is404Error } from "./api";

const API_BASE = `/api/audio`;

export const getAudioSasUrl = async (audioUrl: string): Promise<string | null> => {
  try {
    const response = await api.get(`${audioUrl}`);
    return response.data;
  } catch (error) {
    if (is404Error(error)) {
      return null;
    }
    console.error("Error fetching audio SAS URL:", error);
    throw error;
  }
};

export const downloadAudio = async (audioUrl: string, name: string) => {
  try {
    const fileName = audioUrl.split('/').pop() || '';
    await api.post(`${API_BASE}/meditations/download-via-telegram`, {fileName, name});
  } catch (error) {
    console.error("Error downloading audio:", error);
    throw error;
  }
};