import axios from "axios";

export const getHoroscope = async (dateOfBirth: string): Promise<string> => {
  try {
    const response = await axios.post("/api/getHoroscope", { dateOfBirth });
    return response.data.horoscope;
  } catch (error) {
    console.error("Error fetching horoscope", error);
    throw error;
  }
};

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