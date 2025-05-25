import React from 'react';
import { TFunction } from 'i18next';
import styles from './Home.module.css'; // Assuming styles are co-located or general enough
import coin from '../../assets/coin.png';

interface HomeHeaderProps {
  userName?: string;
  streak?: number;
  coinBalance?: number;
  welcomeMessage: string;
  isStatsLoading: boolean;
  t: TFunction;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({
  userName,
  streak,
  coinBalance,
  welcomeMessage,
  isStatsLoading,
  t,
}) => {
  return (
    <div className={styles.welcomeContainer}>
      <p className={styles.streak}>
        {streak} {t('home.daysStreak', 'days streak')} {streak && streak > 0 ? "🔥" : ""}
      </p>
      <h2 className={styles.welcome}>{userName}</h2>
      <p className={styles.subtitle}>{welcomeMessage}</p>
      <div className={styles.coinContainer}>
        <div className={styles.coin}>
          <div className={styles.coinInfo}>
            {isStatsLoading ? (
              <span className={styles.coinAmount}>
                <span className={styles.coinLoader}>...</span>
              </span>
            ) : (
              <span className={styles.coinAmount}>{coinBalance}</span>
            )}
            <img src={coin} alt={t('alt.coin', 'Aura coin')} className="w-12 h-12" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
