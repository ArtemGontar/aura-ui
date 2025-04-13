import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const useUserData = (onUserDataChange?: (userData: any) => void) => {
  const { userData, userStats, isUserLoading, isStatsLoading, error } = useSelector((state: RootState) => state.user);
  
  useEffect(() => {
    if (onUserDataChange && userData) {
      onUserDataChange(userData);
    }
  }, [userData, onUserDataChange]);

  return {
    isUserLoading,
    isStatsLoading,
    error,
    userData,
    userStats
  };
};