import React, { useEffect, useState, useCallback } from "react";
import styles from "./Leaderboard.module.css";
import Banner from "../Banner/Banner";
import { RadioGroup, FormControlLabel, Radio } from "@mui/material";
import { useTranslation } from "react-i18next";
import { getLeaderboardByReferrals, getLeaderboardByCoins } from "../../services/userService";
import { Trophy } from "lucide-react";

interface LeaderboardUser {
  id: number;
  name: string;
  avatarUrl?: string;
  coins: number;
  referrals: number;
}

const Leaderboard: React.FC = () => {
  const { t } = useTranslation();
  const [tab, setTab] = useState<"referrals" | "coins">("referrals");
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const data =
          tab === "referrals"
            ? await getLeaderboardByReferrals()
            : await getLeaderboardByCoins();
        setUsers(data);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [tab]);

  const handleTabChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setTab(event.target.value as "referrals" | "coins");
    },
    []
  );

  return (
    <div className={styles.leaderboardContainer}>
      <Banner
        headerText={t("navigation.leaderboard")}
        subText={t("Earn rewards by inviting friends or collecting coins!")}
        bgColor="bg-yellow-400"
        icon={<Trophy />}
      />

      <div className={styles.tabs}>
        <RadioGroup
          row
          value={tab}
          onChange={handleTabChange}
        >
          <FormControlLabel
            value="referrals"
            control={<Radio color="primary" />}
            label={t("leaderboard.byReferrals")}
          />
          <FormControlLabel
            value="coins"
            control={<Radio color="primary" />}
            label={t("leaderboard.byCoins")}
          />
        </RadioGroup>
      </div>

      <ul className={styles.list}>
        {loading ? (
          <li className={styles.loading}>{t("loading")}</li>
        ) : (
          users.map((user, idx) => (
            <li key={user.id} className={styles.listItem}>
              <span className={styles.rank}>{idx + 1}</span>
              {user.avatarUrl ? (
                <img src={user.avatarUrl} alt={user.name} className={styles.avatar} />
              ) : (
                <span className={styles.avatarPlaceholder}>{user.name[0]}</span>
              )}
              <span className={styles.name}>{user.name}</span>
              <span className={styles.score}>
                {tab === "referrals" ? user.referrals : user.coins}
                {tab === "referrals" ? ` ${t("leaderboard.referralsShort")}` : " 🪙"}
              </span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Leaderboard;
