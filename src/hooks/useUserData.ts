import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const useUserData = (onUserDataChange?: (userData: any) => void) => {
  const { userData, userStats, isLoading, error } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (onUserDataChange) {
      onUserDataChange(userData);
    }
  }, [userData, onUserDataChange]);

  return {
    isLoading,
    error,
    userData,
    userStats
  };
};