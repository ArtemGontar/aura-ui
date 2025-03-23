import api from "./api";

const API_BASE = `/api/payments`;

export const createInvoiceLink = async (): Promise<string> => {
  try {
    const response = await api.get<string>(`${API_BASE}/create-invoice-link`);
    console.log("response", response.data);
    return response.data;
  } catch (error) {
    console.error("Error ", error);
    throw error;
  }
};
