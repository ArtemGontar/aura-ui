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