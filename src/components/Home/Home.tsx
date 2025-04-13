import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./Home.module.css";
import { HomeProps } from "../../types";
import { HOME_CARDS } from "../../constants/cards";
import { useUserData } from "../../hooks/useUserData";
import ErrorDisplay from "../ErrorDisplay/ErrorDisplay";
import LoadingDisplay from "../LoadingDisplay/LoadingDisplay";
import coin from "../../assets/coin.png";

const Home: React.FC<HomeProps> = ({ className }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isUserLoading, isStatsLoading, error, userData, userStats } = useUserData();

  const welcomeMessages = [
    t('home.welcomeMessage1'),
    t('home.welcomeMessage2'),
    t('home.welcomeMessage3'),
    t('home.welcomeMessage4'),
    t('home.welcomeMessage5'),
  ];
  const randomWelcomeMessage = welcomeMessages[Math.floor(Math.random() * welcomeMessages.length)];

  const handleNavigation = (path: string, disabled: boolean) => {
    if (!disabled) {
      navigate(path);
    }
  };

  if (error) {
    return <ErrorDisplay error={error}></ErrorDisplay>;
  }

  if (!userData && !isUserLoading) {
    return <ErrorDisplay error={t('error.noUserData')}></ErrorDisplay>;
  }

  if (isUserLoading && !userData) {
    return <LoadingDisplay />;
  }

  return (
    <div className={`${styles.home} ${className || ''}`}>
      <div className={styles.welcomeContainer}>
        <p className={styles.streak}>
          {userStats?.streak} {t('home.daysStreak')} {userStats?.streak > 0 ? "🔥" : ""}
        </p>
        <h2 className={styles.welcome}>{userData?.firstName}</h2>
        <p className={styles.subtitle}>{randomWelcomeMessage}</p>
        <p className={styles.coinContainer}>
          <span className={styles.coin}>
            {isStatsLoading ? (
              <span className={styles.coinAmount}>
                <span className={styles.coinLoader}>...</span>
              </span>
            ) : (
              <span className={styles.coinAmount}>{userStats?.coinBalance}</span>
            )}
            <img src={coin} alt="Aura coin" className="w-12 h-12" />
          </span>
        </p>
      </div>
      <div className={styles.cards} role="grid">
        {HOME_CARDS.map((card) => (
          <div
            key={card.id}
            onClick={() => handleNavigation(card.path, card.disabled)}
            className={`${styles.card} ${card.disabled ? styles.cardDisabled : ''} ${styles[`card${card.id.charAt(0).toUpperCase() + card.id.slice(1)}`]}`}
            role="gridcell"
            tabIndex={0}
            onKeyPress={(e) => {
              if (!card.disabled && (e.key === 'Enter' || e.key === ' ')) {
                handleNavigation(card.path, card.disabled);
              }
            }}
          >
            <h3 className={styles.cardTitle}>
              {card.icon && <span className={styles.cardIcon}>{card.icon}</span>}
              {t(`home.cards.${card.id}.title`)}
            </h3>
            <p className={styles.cardDescription}>{t(`home.cards.${card.id}.description`)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;