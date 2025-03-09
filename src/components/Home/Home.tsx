import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import styles from "./Home.module.css";
import { HomeProps } from "../../types";
import { HOME_CARDS } from "../../constants/cards";
import { useUserData } from "../../hooks/useUserData";
import ErrorDisplay from "../ErrorDisplay/ErrorDisplay";
import LoadingDisplay from "../LoadingDisplay/LoadingDisplay";

const Home: React.FC<HomeProps> = ({ className }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isLoading, error, userData, userStats } = useUserData();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  if (isLoading) {
    return <LoadingDisplay />;
  }

  if (error) {
    return <ErrorDisplay error={error}></ErrorDisplay>;
  }

  if (!userData) {
    return <ErrorDisplay error={t('error.noUserData')}></ErrorDisplay>;
  }

  return (
    <div className={`${styles.home} ${className || ''}`}>
      <div className={styles.welcomeContainer}>
        <p className={styles.streak}>
          {userStats.streak} {t('home.daysStreak')} {userStats.streak > 0 ? "🔥" : ""}
        </p>
        <h2 className={styles.welcome}>{userData.firstName}</h2>
        <p className={styles.subtitle}>{t('home.welcomeMessage')}</p>
        <p className={styles.crystalContainer}>
          <span className={styles.crystal}>
            <span className={styles.crystalEmoji}>💎</span>
            <span className={styles.crystalAmount}>{userStats.crystalBalance}</span>
          </span>
        </p>
      </div>
      <div className={styles.cards} role="grid">
        {HOME_CARDS.map((card) => (
          <div
            key={card.id}
            onClick={() => handleNavigation(card.path)}
            className={`${styles.card} ${styles[`card${card.id.charAt(0).toUpperCase() + card.id.slice(1)}`]}`}
            role="gridcell"
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleNavigation(card.path);
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