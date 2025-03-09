import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserStats, setError } from '../store/slices/userSlice';
import { RootState } from '../store';
import { getUserStats } from '../services/userStatsService';

export const useUserStats = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    const initializeUserStats = async () => {
      if (!userData?.id) return;

      try {
        await getUserStats(userData.id.toString());
      } catch (error) {
        dispatch(setError('Failed to fetch user stats'));
        // Set default stats as fallback
        dispatch(setUserStats({
          streak: 0,
          crystalBalance: 0
        }));
      }
    };

    initializeUserStats();
  }, [dispatch, userData?.id]);
}; 