import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserStats } from '../../types';
import { UserData } from '../../types/user';

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