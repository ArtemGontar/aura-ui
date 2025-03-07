import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import { UserData } from "../../types/user";

const Home: React.FC = () => {
  const [userData] = useState<UserData | null>(null);
  const [streak, setStreak] = useState<number>(0);
  const [crystal, setCrystal] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    // const userData = getUserDataFromTelegram();
    // setUserData(userData);
    // saveUserData(userData); // Save user data to the backend

    // Mock function to get the daily prediction streak
    const dailyStreak = getDailyPredictionStreak();
    setStreak(dailyStreak);

    // Mock function to get the daily prediction streak
    const crystal = getCrystal();
    setCrystal(crystal);
  }, []);

  const getDailyPredictionStreak = (): number => {
    // Mock function to return a streak value
    return 12; // Example streak value
  };

  const getCrystal = (): number => {
    return 12131;
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className={styles.home}>
      <div className={styles.welcomeContainer}>
        <p className={styles.streak}>{streak} days streak {streak > 0 ? "🔥" : "" }</p>
        <h2 className={styles.welcome}>
          {userData ? userData.firstName : "[User's Telegram Name]"}
        </h2>
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