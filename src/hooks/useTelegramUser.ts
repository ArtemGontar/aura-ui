import { useState, useEffect } from 'react';
import { UserData } from '../types/user';

export const useTelegramUser = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const loadUserData = () => {
      try {
        const savedUserData = localStorage.getItem("telegramUserData");
        if (savedUserData) {
          setUserData(JSON.parse(savedUserData));
        } else {
          setError("No user data found");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load user data");
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);

  const handleSubscribe = () => {
    // TODO: Implement subscription logic
    console.log("Subscribe clicked");
  };

  return { isLoading, error, userData, handleSubscribe };
}; 