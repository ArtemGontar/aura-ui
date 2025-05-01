import { UserStats } from "../services/userStatsService";

/**
 * Default user stats to use when user stats are not found (404)
 */
export const DEFAULT_USER_STATS: UserStats = {
  streak: 0,
  coinBalance: 0
};
