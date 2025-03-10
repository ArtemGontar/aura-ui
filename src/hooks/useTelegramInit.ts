import { useEffect, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WebApp from '@twa-dev/sdk';
import { UserData } from "../types/user";
import { MOCK_USER_DATA } from "../utils/debug";
import { setError, setLoading, saveUserDataAsync } from '../store/slices/userSlice';
import { RootState, AppDispatch } from '../store';

// Types
interface TelegramInitState {
  isInitialized: boolean;
  initPromise: Promise<void> | null;
}

// Singleton to track initialization status
const telegramInitState: TelegramInitState = {
  isInitialized: false,
  initPromise: null
};

// Helper functions
const getTelegramUserData = (): UserData => {
  const initData = WebApp.initData;
  
  if (!initData) {
    if (process.env.NODE_ENV === 'development') {
      console.log("No initialization data available, using mock data");
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

const setupTelegramWebApp = () => {
  WebApp.ready();
  WebApp.expand();
  WebApp.enableClosingConfirmation();
};

const cleanupTelegramWebApp = () => {
  WebApp.disableClosingConfirmation();
};

export const useTelegramInit = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  // Memoize the selector result
  const { isLoading, error } = useSelector((state: RootState) => state.user, (prev, next) => 
    prev.isLoading === next.isLoading && prev.error === next.error
  );

  // Memoize the initialization function
  const initializeTelegram = useCallback(async () => {
    // If already initialized, return immediately
    if (telegramInitState.isInitialized) {
      return;
    }

    // If initialization is in progress, return the existing promise
    if (telegramInitState.initPromise) {
      return telegramInitState.initPromise;
    }

    // Create new initialization promise
    telegramInitState.initPromise = (async () => {
      try {
        // Get user data and setup Telegram WebApp
        const userData = getTelegramUserData();
        setupTelegramWebApp();

        // Save user data
        await dispatch(saveUserDataAsync(userData));
        
        // Mark as initialized
        telegramInitState.isInitialized = true;
      } catch (err) {
        dispatch(setError(err instanceof Error ? err.message : "Failed to initialize Telegram WebApp"));
      } finally {
        dispatch(setLoading(false));
        telegramInitState.initPromise = null;
      }
    })();

    return telegramInitState.initPromise;
  }, [dispatch]);

  useEffect(() => {
    initializeTelegram();
    return cleanupTelegramWebApp;
  }, []);

  // Memoize the return value
  return useMemo(() => ({ isLoading, error }), [isLoading, error]);
}; 