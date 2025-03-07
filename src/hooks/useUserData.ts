import { useState, useEffect } from 'react';
import { UserData, UserStats } from '../types';
import { getUserDataFromStorage, getDailyPredictionStreak, getCrystalBalance } from '../services/userService';

export const useUserData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [userStats, setUserStats] = useState<UserStats>({
    streak: 0,
    crystalBalance: 0
  });

  useEffect(() => {
    const initializeData = async () => {
      try {
        setIsLoading(true);
        const userData = getUserDataFromStorage();
        setUserData(userData);

        const [streakData, crystalData] = await Promise.all([
          getDailyPredictionStreak(),
          getCrystalBalance()
        ]);

        setUserStats({
          streak: streakData,
          crystalBalance: crystalData
        });
      } catch (err) {
        setError('Failed to load user data');
        console.error('Error initializing data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, []);

  return {
    isLoading,
    error,
    userData,
    userStats
  };
}; 