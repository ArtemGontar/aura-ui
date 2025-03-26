import { UserData } from "../types/user";
import { store } from "../store";
import { setUserData } from "../store/slices/userSlice";
import api from './api';
import { FEATURES } from '../config/features';

const API_BASE = `/api/users`;

export const getUserData = async (userId: number): Promise<UserData> => {
  try {
    if (FEATURES.USE_BACKEND) {
      const response = await api.get(`${API_BASE}/${userId}`);
      store.dispatch(setUserData(response.data));
      return response.data;
    } else {
      const userData = store.getState().user.userData;
      if (!userData) {
        throw new Error("User data not found in store");
      }
      return userData;
    }
  } catch (error) {
    console.error("Error fetching user data", error);
    throw error;
  }
};

export const updateUserData = async (userId: number, userData: Partial<UserData>): Promise<UserData> => {
  try {
    if (FEATURES.USE_BACKEND) {
      const response = await api.put(`${API_BASE}/${userId}`, userData);
      store.dispatch(setUserData(response.data));
      return response.data;
    } else {
      const currentUserData = store.getState().user.userData;
      if (!currentUserData) {
        throw new Error("User data not found in store");
      }
      const updatedUserData = { ...currentUserData, ...userData };
      store.dispatch(setUserData(updatedUserData));
      return updatedUserData;
    }
  } catch (error) {
    console.error("Error updating user data", error);
    throw error;
  }
};

export const saveUserBirthDate = async (dateOfBirth: string): Promise<UserData> => {
  try {
    const userData = store.getState().user.userData;
    if (!userData) throw new Error("User not found");
    const userDataRequest = { ...userData, dateOfBirth };
    var updatedUserData = await updateUserData(userData.id, userDataRequest);
    store.dispatch(setUserData(updatedUserData));
    return updatedUserData;
  } catch (error) {
    console.error("Error saving user birth date", error);
    throw error;
  }
};