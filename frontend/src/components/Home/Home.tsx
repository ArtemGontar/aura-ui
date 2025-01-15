import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import { saveUserData } from "../../services/userMockService"; // Use this for mock service
import { UserData } from "../../types/user";

const Home: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [streak, setStreak] = useState<number>(0);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = getUserDataFromTelegram();
    setUserData(userData);
    saveUserData(userData); // Save user data to the backend

    // Mock function to get the daily prediction streak
    const dailyStreak = getDailyPredictionStreak();
    setStreak(dailyStreak);
  }, []);

  const getUserDataFromTelegram = (): UserData => {
    return {
      telegramId: "123456789",
      firstName: "John",
      lastName: "Doe",
      username: "johndoe",
    };
  };

  const getDailyPredictionStreak = (): number => {
    // Mock function to return a streak value
    return 0; // Example streak value
  };

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className={styles.home}>
      <h1 className={styles.welcome}>
        👋 Welcome, {userData ? userData.firstName : "[User's Telegram Name]"}!
      </h1>
      <p className={styles.subtitle}>We hope you have a magical day!</p>
      <div className={styles.streak}>
        {streak > 0 ? (
          <>
            <div className={styles.emoji}>🔥</div>
            <div className={styles.text}>{streak} days straight</div>
          </>
        ) : (
          <div className={styles.encouragement}>Start your streak today!</div>
        )}
      </div>
      <div className={styles.cards}>
        <div onClick={() => handleNavigation("/horoscope")} className={styles.card}>
          <h3 className={styles.cardTitle}>Horoscope</h3>
          <p className={styles.cardDescription}>Get your daily horoscope reading.</p>
        </div>
        <div onClick={() => handleNavigation("/psychological")} className={styles.card}>
          <h3 className={styles.cardTitle}>Psychological</h3>
          <p className={styles.cardDescription}>Explore psychological insights.</p>
        </div>
        <div onClick={() => handleNavigation("/astrology")} className={styles.card}>
          <h3 className={styles.cardTitle}>Astrology</h3>
          <p className={styles.cardDescription}>Discover astrological predictions.</p>
        </div>
        <div onClick={() => handleNavigation("/magicball")} className={styles.card}>
          <h3 className={styles.cardTitle}>Magic Ball</h3>
          <p className={styles.cardDescription}>Ask the magic ball for answers.</p>
        </div>
        <div onClick={() => handleNavigation("/tarot")} className={styles.card}>
          <h3 className={styles.cardTitle}>Tarot</h3>
          <p className={styles.cardDescription}>Get a tarot card reading.</p>
        </div>
        <div onClick={() => handleNavigation("/runes")} className={styles.card}>
          <h3 className={styles.cardTitle}>Runes</h3>
          <p className={styles.cardDescription}>Read your rune stones.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;