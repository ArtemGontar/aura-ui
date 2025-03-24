import api from "./api";

const API_BASE = `/api/payments`;

export const createInvoiceLink = async (
  productId: number,
  title: string,
  description: string,
  providerToken: string
): Promise<string> => {
  try {
    const response = await api.post<string>(`${API_BASE}/create-invoice-link`, {
      title,
      description,
      payload: "{}",
      providerToken,
      productId
    });
    console.log("response", response.data);
    return response.data;
  } catch (error) {
    console.error("Error ", error);
    throw error;
  }
};
