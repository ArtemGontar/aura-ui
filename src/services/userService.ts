import { UserData } from "../types/user";
import { store } from "../store";
import { setUserData, clearUserData } from "../store/slices/userSlice";
import api from './api';

const API_BASE = `/api/users`;

export const getUserData = async (userId: number): Promise<UserData> => {
  try {
    const response = await api.get(`${API_BASE}/${userId}`);
    store.dispatch(setUserData(response.data));
    return response.data;
  } catch (error) {
    console.error("Error fetching user data", error);
    throw error;
  }
};

export const updateUserData = async (userData: UserData): Promise<UserData> => {
  try {
    console.log("Updating user data", userData);
    const response = await api.put(`${API_BASE}/${userData.id}`, userData);
    store.dispatch(setUserData(response.data));
    return response.data;
  } catch (error) {
    console.error("Error updating user data", error);
    throw error;
  }
};

export const deleteUser = async (userId: number): Promise<void> => {
  try {
    await api.delete(`${API_BASE}/${userId}`);
    store.dispatch(clearUserData());
  } catch (error) {
    console.error("Error deleting user", error);
    throw error;
  }
};