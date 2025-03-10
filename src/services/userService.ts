import { UserData } from "../types/user";
import { store } from "../store";
import { setUserData, setBirthDate } from "../store/slices/userSlice";
import api from './api';
import { FEATURES } from '../config/features';

const API_BASE = `/api/users`;

export const saveUserData = async (userData: UserData) => {
  try {
    if (FEATURES.USE_BACKEND) {
      const response = await api.post(API_BASE, userData);
      store.dispatch(setUserData(response.data));
      return response.data;
    } else {
      store.dispatch(setUserData(userData));
      return userData;
    }
  } catch (error) {
    console.error("Error saving user data", error);
    throw error;
  }
};

export const getUserData = async (userId: string) => {
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

export const updateUserData = async (userId: string, userData: Partial<UserData>) => {
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

export const saveUserBirthDate = async (dateOfBirth: string): Promise<void> => {
  try {
    const userId = store.getState().user.userData?.id;
    if (!userId) throw new Error("User ID not found");
    
    await updateUserData(userId.toString(), { dateOfBirth });
    store.dispatch(setBirthDate(dateOfBirth));
  } catch (error) {
    console.error("Error saving user birth date", error);
    throw error;
  }
};

export const getUserBirthDate = async (): Promise<string | null> => {
  try {
    const userId = store.getState().user.userData?.id;
    if (!userId) throw new Error("User ID not found");

    const userData = await getUserData(userId.toString());
    return userData.dateOfBirth || null;
  } catch (error) {
    console.error("Error fetching user birth date", error);
    throw error;
  }
};

export const getUserDataFromStore = (): UserData | null => {
  return store.getState().user.userData;
};

export const updateUserDataInStore = (userData: UserData) => {
  store.dispatch(setUserData(userData));
  return userData;
};