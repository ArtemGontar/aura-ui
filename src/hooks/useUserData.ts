import { useSelector } from 'react-redux';
import { RootState } from '../store';

export const useUserData = () => {
  const { userData, userStats, isLoading, error } = useSelector((state: RootState) => state.user);

  return {
    isLoading,
    error,
    userData,
    userStats
  };
}; 