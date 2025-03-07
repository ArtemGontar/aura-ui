import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import { HomeProps } from "../../types";
import { HOME_CARDS } from "../../constants/cards";
import { useUserData } from "../../hooks/useUserData";

const Home: React.FC<HomeProps> = ({ className }) => {
  const navigate = useNavigate();
  const { isLoading, error, userData, userStats } = useUserData();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  if (isLoading) {
    return (
      <div className={styles.loading} role="status" aria-label="Loading user data">
        Loading user data...
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error} role="alert">
        {error}
      </div>
    );
  }

  if (!userData) {
    return (
      <div className={styles.error} role="alert">
        No user data found. Please log in again.
      </div>
    );
  }

  return (
    <div className={`${styles.home} ${className || ''}`}>
      <div className={styles.welcomeContainer}>
        <p className={styles.streak}>
          {userStats.streak} days streak {userStats.streak > 0 ? "🔥" : ""}
        </p>
        <h2 className={styles.welcome}>{userData.firstName}</h2>
        <p className={styles.subtitle}>We hope you have a magical day!</p>
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
              {card.title}
            </h3>
            <p className={styles.cardDescription}>{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;