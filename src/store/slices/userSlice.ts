import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { UserData, UserState, UserStats } from '../../types/user';
import { getUserData, updateUserData } from '../../services/userService';
import { getUserStats } from '../../services/userStatsService';

export const initialState: UserState = {
  userData: null,
  userStats: {
    streak: 0,
    coinBalance: 0
  },
  isUserLoading: true,
  isStatsLoading: true,
  error: null,
};

export const saveUserDataAsync = createAsyncThunk(
  'user/saveUserData',
  async (userData: UserData, { dispatch }) => {
    dispatch(setUserData(userData));
    
    const userId = userData.id;
    if (!userId) {
      console.warn("Cannot sync with backend: User ID is missing");
      return userData;
    }

    try {
      // Get existing user data from backend
      const existingUserResponse = await getUserData(userId);
      const existingUserData = existingUserResponse;

      // Update only specific fields
      const updatedUserData = {
        ...existingUserData,
        firstName: userData.firstName,
        lastName: userData.lastName !== undefined ? userData.lastName : existingUserData.lastName,
        username: userData.username !== undefined ? userData.username : existingUserData.username,
        languageCode: userData.languageCode !== undefined ? userData.languageCode : existingUserData.languageCode,
        isPremium: userData.isPremium !== undefined ? userData.isPremium : existingUserData.isPremium,
        photoUrl: userData.photoUrl !== undefined ? userData.photoUrl : existingUserData.photoUrl,
      };

      console.log("Updating user data:", updatedUserData);
      const updatedResponse = await updateUserData(updatedUserData);
      dispatch(setUserData(updatedResponse));
      return updatedResponse;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        // If user does not exist, create new user data
        const newUserResponse = await updateUserData(userData);
        dispatch(setUserData(newUserResponse));
        return newUserResponse;
      } else {
        throw error;
      }
    }
  }
);

export const fetchUserStatsAsync = createAsyncThunk(
  'user/fetchStats',
  async (userId: string) => {
    try {
      const userStats = await getUserStats(userId);
      return userStats;
    } catch (error) {
      throw error;
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserData>) => {
      state.userData = action.payload;
      state.isUserLoading = false;
    },
    setUserStats: (state, action: PayloadAction<UserStats>) => {
      state.userStats = action.payload;
      state.isStatsLoading = false;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isUserLoading = false;
      state.isStatsLoading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isUserLoading = action.payload;
      state.isStatsLoading = action.payload;
    },
    setUserLoading: (state, action: PayloadAction<boolean>) => {
      state.isUserLoading = action.payload;
    },
    setStatsLoading: (state, action: PayloadAction<boolean>) => {
      state.isStatsLoading = action.payload;
    },
    clearUserData: (state) => {
      state.userData = null;
      state.userStats = { streak: 0, coinBalance: 0 };
      state.error = null;
      state.isUserLoading = false;
      state.isStatsLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveUserDataAsync.pending, (state) => {
        state.isUserLoading = true;
        state.error = null;
      })
      .addCase(saveUserDataAsync.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.isUserLoading = false;
      })
      .addCase(saveUserDataAsync.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to save user data';
        state.isUserLoading = false;
      })
      .addCase(fetchUserStatsAsync.pending, (state) => {
        state.isStatsLoading = true;
        state.error = null;
      })
      .addCase(fetchUserStatsAsync.fulfilled, (state, action) => {
        state.userStats = action.payload;
        state.isStatsLoading = false;
      })
      .addCase(fetchUserStatsAsync.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch user stats';
        state.isStatsLoading = false;
      });
  },
});

export const { 
  setUserData, 
  setUserStats,
  setError, 
  setLoading,
  setUserLoading,
  setStatsLoading,
  clearUserData 
} = userSlice.actions;

export default userSlice.reducer;