import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import quotaReducer from './slices/quotaSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    quotas: quotaReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
