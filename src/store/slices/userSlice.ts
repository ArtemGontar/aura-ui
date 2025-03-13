import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { UserStats } from '../../types';
import { UserData } from '../../types/user';
import api from '../../services/api';
import { FEATURES } from '../../config/features';

const API_BASE = `/api/users`;

export const saveUserDataAsync = createAsyncThunk(
  'user/saveUserData',
  async (userData: UserData, { dispatch }) => {
    // Always save to store first for immediate user feedback
    dispatch(setUserData(userData));

    // If backend is enabled, try to sync in background
    if (FEATURES.USE_BACKEND) {
      const userId = userData.id;
      if (!userId) {
        console.warn("Cannot sync with backend: User ID is missing");
        return userData;
      }

      try {
        // Get existing user data from backend
        const existingUserResponse = await api.get(`${API_BASE}/${userId}`);
        const existingUserData = existingUserResponse.data;

        // Update only specific fields
        existingUserData.firstName = userData.firstName;
        if (userData.lastName !== undefined) existingUserData.lastName = userData.lastName;
        if (userData.username !== undefined) existingUserData.username = userData.username;
        if (userData.languageCode !== undefined) existingUserData.languageCode = userData.languageCode;
        if (userData.isPremium !== undefined) existingUserData.isPremium = userData.isPremium;
        if (userData.photoUrl !== undefined) existingUserData.photoUrl = userData.photoUrl;

        // Fire and forget - don't await the backend sync
        api.put(`${API_BASE}/${userId}`, existingUserData)
          .then(response => {
            // Optionally update store with server response if needed
            dispatch(setUserData(response.data));
          })
          .catch(error => {
            // Just log the error but don't affect the user experience
            console.warn("Background sync failed:", error);
          });
      } catch (error) {
        console.warn("Failed to fetch existing user data:", error);
      }
    }

    return userData;
  }
);

export interface UserState {
  userData: UserData | null;
  userStats: UserStats;
  birthDate: string | null;
  isLoading: boolean;
  error: string | null;
}

export const initialState: UserState = {
  userData: null,
  userStats: {
    streak: 0,
    crystalBalance: 0
  },
  birthDate: null,
  isLoading: true,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserData>) => {
      state.userData = action.payload;
      state.isLoading = false;
    },
    setUserStats: (state, action: PayloadAction<UserStats>) => {
      state.userStats = action.payload;
    },
    setBirthDate: (state, action: PayloadAction<string>) => {
      state.birthDate = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    clearUserData: (state) => {
      state.userData = null;
      state.userStats = { streak: 0, crystalBalance: 0 };
      state.birthDate = null;
      state.error = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveUserDataAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(saveUserDataAsync.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.isLoading = false;
      })
      .addCase(saveUserDataAsync.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to save user data';
        state.isLoading = false;
      });
  },
});

export const { 
  setUserData, 
  setUserStats, 
  setBirthDate,
  setError, 
  setLoading, 
  clearUserData 
} = userSlice.actions;

export default userSlice.reducer;