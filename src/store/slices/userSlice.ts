import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { UserData, UserState, UserStats, UserSubscription } from '../../types/user';
import { updateUserData } from '../../services/userService';
import { getUserStats } from '../../services/userStatsService';
import { getUserSubscription } from '../../services/userSubscriptionService';

export const initialState: UserState = {
  userData: null,
  userStats: {
    streak: 0,
    coinBalance: 0
  },
  userSubscription: null,
  isUserLoading: true,
  isStatsLoading: true,
  isSubscriptionLoading: false,
  error: null,
};

export const saveUserDataAsync = createAsyncThunk(
  'user/saveUserData',
  async (userData: UserData, { dispatch }) => {
    
    const userId = userData.id;
    if (!userId) {
      console.warn("Cannot sync with backend: User ID is missing");
      return userData;
    }

    try {
      const updatedResponse = await updateUserData(userData);
      
      const completeUserData = {
        ...updatedResponse,
        isPremium: userData.isPremium,
        languageCode: userData.languageCode,
        photoUrl: userData.photoUrl,
      };

      dispatch(setUserData(completeUserData));
      return completeUserData;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchUserStatsAsync = createAsyncThunk(
  'user/fetchStats',
  async (userId: number) => {
    try {
      const userStats = await getUserStats(userId);
      return userStats;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchUserSubscriptionAsync = createAsyncThunk(
  'user/fetchSubscription',
  async (userId: number) => {
    try {
      const subscription = await getUserSubscription(userId);
      return subscription;
    } catch (error) {
      console.error("Error fetching user subscription", error);
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
    setUserSubscription: (state, action: PayloadAction<UserSubscription | null>) => {
      state.userSubscription = action.payload;
      state.isSubscriptionLoading = false;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isUserLoading = false;
      state.isStatsLoading = false;
      state.isSubscriptionLoading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isUserLoading = action.payload;
      state.isStatsLoading = action.payload;
      state.isSubscriptionLoading = action.payload;
    },
    setUserLoading: (state, action: PayloadAction<boolean>) => {
      state.isUserLoading = action.payload;
    },
    setStatsLoading: (state, action: PayloadAction<boolean>) => {
      state.isStatsLoading = action.payload;
    },
    setSubscriptionLoading: (state, action: PayloadAction<boolean>) => {
      state.isSubscriptionLoading = action.payload;
    },
    clearUserData: (state) => {
      state.userData = null;
      state.userStats = { streak: 0, coinBalance: 0 };
      state.userSubscription = null;
      state.error = null;
      state.isUserLoading = false;
      state.isStatsLoading = false;
      state.isSubscriptionLoading = false;
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
      })
      .addCase(fetchUserSubscriptionAsync.pending, (state) => {
        state.isSubscriptionLoading = true;
        state.error = null;
      })
      .addCase(fetchUserSubscriptionAsync.fulfilled, (state, action) => {
        state.userSubscription = action.payload;
        state.isSubscriptionLoading = false;
      })
      .addCase(fetchUserSubscriptionAsync.rejected, (state, action) => {
        state.error = action.error.message || 'Failed to fetch user subscription';
        state.isSubscriptionLoading = false;
      });
  },
});

export const { 
  setUserData, 
  setUserStats,
  setUserSubscription,
  setError, 
  setLoading,
  setUserLoading,
  setStatsLoading,
  setSubscriptionLoading,
  clearUserData 
} = userSlice.actions;

export default userSlice.reducer;