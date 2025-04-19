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

export const downloadAudio = async (audioUrl: string) => {
  try {
    await api.post(`${audioUrl}/download-via-telegram`);
  } catch (error) {
    console.error("Error downloading audio:", error);
    throw error;
  }
};