import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WebApp from '@twa-dev/sdk';
import { UserData } from "../types/user";
import { MOCK_USER_DATA } from "../utils/debug";
import { setUserData, setError, setLoading, setUserStats } from '../store/slices/userSlice';
import { RootState } from '../store';

export const useTelegramInit = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const initializeTelegram = async () => {
      try {
        WebApp.ready();
        const initData = WebApp.initData;
        
        let newUserData: UserData;
        if (!initData) {
          if (process.env.NODE_ENV === 'development') {
            console.log("No initialization data available, using mock data");
            newUserData = MOCK_USER_DATA;
          } else {
            throw new Error("No initialization data available");
          }
        } else {
          const user = WebApp.initDataUnsafe.user;
          if (!user) {
            throw new Error("User data not available");
          }

          newUserData = {
            id: user.id,
            firstName: user.first_name,
            lastName: user.last_name,
            username: user.username,
            languageCode: user.language_code,
            isPremium: user.is_premium,
            photoUrl: user.photo_url
          };
        }

        dispatch(setUserData(newUserData));
        
        // Initialize user stats (you might want to fetch these from an API in production)
        dispatch(setUserStats({
          streak: 0,
          crystalBalance: 0
        }));

        WebApp.expand();
        WebApp.enableClosingConfirmation();
      } catch (err) {
        dispatch(setError(err instanceof Error ? err.message : "Failed to initialize Telegram WebApp"));
      } finally {
        dispatch(setLoading(false));
      }
    };

    initializeTelegram();
  }, [dispatch]);

  return { isLoading, error };
}; 