import { useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WebApp from '@twa-dev/sdk';
import { UserData } from "../types/user";
import { MOCK_USER_DATA } from "../utils/debug";
import { setError, setLoading, saveUserDataAsync } from '../store/slices/userSlice';
import { RootState, AppDispatch } from '../store';
import { fetchQuotasAsync } from '../store/slices/quotaSlice';

// Helper functions
const getTelegramUserData = (): UserData => {
  const initData = WebApp.initData;

  if (!initData) {
    if (process.env.NODE_ENV === 'development') {
      return MOCK_USER_DATA;
    }
    throw new Error("No initialization data available");
  }

  const user = WebApp.initDataUnsafe.user;
  if (!user) {
    throw new Error("User data not available");
  }
  return {
    id: user.id,
    firstName: user.first_name,
    lastName: user.last_name,
    username: user.username,
    languageCode: user.language_code,
    isPremium: user.is_premium,
    photoUrl: user.photo_url
  };
};

export const useTelegramInit = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  // Memoize the selector result
  const { isUserLoading, error } = useSelector((state: RootState) => state.user, (prev, next) => 
    prev.isUserLoading === next.isUserLoading && prev.error === next.error
  );

  // Memoize the initialization function
  const initializeTelegram = useCallback(async () => {
    try {
      const userData = getTelegramUserData();
      await dispatch(saveUserDataAsync(userData));
      await dispatch(fetchQuotasAsync());
    } catch (err) {
      dispatch(setError(err instanceof Error ? err.message : "Failed to initialize Telegram WebApp"));
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  // Initialize Telegram WebApp on component mount
  useEffect(() => {
    initializeTelegram();
  }, [initializeTelegram]);

  // Determine if the app is running in a Telegram context
  const isTelegram = !!WebApp.initData;

  // Memoize the return value
  return useMemo(() => ({ isUserLoading, error, isTelegram }), [isUserLoading, error, isTelegram]);
};