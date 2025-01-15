import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import Horoscope from "../Cards/DailyHoroscope/DailyHoroscope";
import Psychological from "../Cards/Psychological/Psychological";
import Astrology from "../Cards/Astrology/Astrology";
import MagicBall from "../Cards/MagicBall/MagicBall";
import Tarot from "../Cards/Tarot/Tarot";
import Runes from "../Cards/Runes/Runes";
import { saveUserData } from "../../services/userMockService"; // Use this for mock service
import { UserData } from "../../types/user";
import { useNavigate } from "react-router-dom";

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
        <div onClick={() => handleNavigation("/horoscope")} className={styles.card}><Horoscope /></div>
        <div onClick={() => handleNavigation("/psychological")} className={styles.card}><Psychological /></div>
        <div onClick={() => handleNavigation("/astrology")} className={styles.card}><Astrology /></div>
        <div onClick={() => handleNavigation("/magicball")} className={styles.card}><MagicBall /></div>
        <div onClick={() => handleNavigation("/tarot")} className={styles.card}><Tarot /></div>
        <div onClick={() => handleNavigation("/runes")} className={styles.card}><Runes /></div>
      </div>
    </div>
  );
};

export default Home;