import { useEffect } from "react";
import { useUserData } from "./useUserData";
import { incrementStreak, getUserStats } from "../services/userStatsService";

export const useUserStats = () => {
  const { userData } = useUserData();

  useEffect(() => {
    const fetchUserStats = async (userId: number) => {
      try {
        await incrementStreak(userId);
        await getUserStats(userId);
        // console.log("User stats fetched and streak incremented successfully for user:", userId);
      } catch (error) {
        console.error("Failed to fetch user stats or increment streak for user:", userId, error);
      }
    };

    if (userData?.id) {
      fetchUserStats(userData.id);
    }
  }, [userData?.id]);
};
