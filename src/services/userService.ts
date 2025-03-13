import { UserData } from "../types/user";
import { store } from "../store";
import { setUserData, setBirthDate } from "../store/slices/userSlice";
import api from './api';
import { FEATURES } from '../config/features';

const API_BASE = `/api/users`;

export const saveUserData = async (userData: UserData) => {
  // Always save to store first for immediate user feedback
  store.dispatch(setUserData(userData));

  // If backend is enabled, try to sync in background
  if (FEATURES.USE_BACKEND) {
    const userId = userData.id;
    if (!userId) {
      console.warn("Cannot sync with backend: User ID is missing");
      return userData;
    }

    // Fire and forget - don't await the backend sync
    api.put(`${API_BASE}/${userId}`, userData)
      .then(response => {
        // Optionally update store with server response if needed
        store.dispatch(setUserData(response.data));
      })
      .catch(error => {
        // Just log the error but don't affect the user experience
        console.warn("Background sync failed:", error);
      });
  }

  return userData;
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
    const userData = store.getState().user.userData;
    if (!userData) throw new Error("User not found");
    userData.dateOfBirth = dateOfBirth;
    await updateUserData(userData.id.toString(), userData);
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