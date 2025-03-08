import { useState, useEffect } from 'react';
import WebApp from '@twa-dev/sdk';
import { UserData } from "../types/user";
import { MOCK_USER_DATA } from "../utils/debug";

export const useTelegramInit = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeTelegram = async () => {
      try {
        const savedUserData = localStorage.getItem("telegramUserData");
        if (savedUserData) {
          setIsLoading(false);
          return;
        }

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
            lastName: user.last_name || "",
            username: user.username || "",
            languageCode: user.language_code || "en",
            isPremium: user.is_premium || false,
            photoUrl: user.photo_url || "",
          };
        }

        localStorage.setItem("telegramUserData", JSON.stringify(newUserData));
        WebApp.expand();
        WebApp.enableClosingConfirmation();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to initialize Telegram WebApp");
      } finally {
        setIsLoading(false);
      }
    };

    initializeTelegram();
  }, []);

  return { isLoading, error };
}; 