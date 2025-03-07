import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import { UserData } from "../../types/user";
import { getUserDataFromStorage, getDailyPredictionStreak, getCrystalBalance } from "../../services/userService";

interface HomeProps {
  className?: string;
}

const Home: React.FC<HomeProps> = ({ className }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [streak, setStreak] = useState<number>(0);
  const [crystal, setCrystal] = useState<number>(0);

  useEffect(() => {
    const initializeData = async () => {
      try {
        setIsLoading(true);
        const userData = getUserDataFromStorage();
        setUserData(userData);

        const [streakData, crystalData] = await Promise.all([
          getDailyPredictionStreak(),
          getCrystalBalance()
        ]);

        setStreak(streakData);
        setCrystal(crystalData);
      } catch (err) {
        setError('Failed to load user data');
        console.error('Error initializing data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, []);

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  if (isLoading) {
    return <div className={styles.loading}>Loading user data...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!userData) {
    return <div className={styles.error}>No user data found. Please log in again.</div>;
  }

  return (
    <div className={`${styles.home} ${className || ''}`}>
      <div className={styles.welcomeContainer}>
        <p className={styles.streak}>
          {streak} days streak {streak > 0 ? "🔥" : ""}
        </p>
        <h2 className={styles.welcome}>{userData.firstName}</h2>
        <p className={styles.subtitle}>We hope you have a magical day!</p>
        <p className={styles.crystalContainer}>
          <span className={styles.crystal}>
            <span className={styles.crystalEmoji}>💎</span>
            <span className={styles.crystalAmount}>{crystal}</span>
          </span>
        </p>
      </div>
      <div className={styles.cards}>
        <div onClick={() => handleNavigation("/horoscope")} className={`${styles.card} ${styles.cardHoroscope}`}>
          <h3 className={styles.cardTitle}>Horoscope</h3>
          <p className={styles.cardDescription}>Get your daily horoscope reading.</p>
        </div>
        <div onClick={() => handleNavigation("/psychological")} className={`${styles.card} ${styles.cardPsychological}`}>
          <h3 className={styles.cardTitle}>Psychological</h3>
          <p className={styles.cardDescription}>Explore psychological insights.</p>
        </div>
        <div onClick={() => handleNavigation("/astrology")} className={`${styles.card} ${styles.cardAstrology}`}>
          <h3 className={styles.cardTitle}>Astrology</h3>
          <p className={styles.cardDescription}>Discover astrological predictions.</p>
        </div>
        <div onClick={() => handleNavigation("/magicball")} className={`${styles.card} ${styles.cardMagicBall}`}>
          <h3 className={styles.cardTitle}>Magic Ball</h3>
          <p className={styles.cardDescription}>Ask the magic ball for answers.</p>
        </div>
        <div onClick={() => handleNavigation("/tarot")} className={`${styles.card} ${styles.cardTarot}`}>
          <h3 className={styles.cardTitle}>Tarot</h3>
          <p className={styles.cardDescription}>Get a tarot card reading.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;