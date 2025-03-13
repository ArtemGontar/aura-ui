import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import styles from "./App.module.css";
import DailyHoroscope from "./components/Cards/DailyHoroscope/DailyHoroscope";
import Psychological from "./components/Cards/Psychological/Psychological";
import Astrology from "./components/Cards/Astrology/Astrology";
import MagicBall from "./components/Cards/MagicBall/MagicBall";
import Tarot from "./components/Cards/Tarot/Tarot";
import Runes from "./components/Cards/Runes/Runes";
import Affirmations from "./components/Affirmations/Affirmations";
import ErrorDisplay from "./components/ErrorDisplay/ErrorDisplay";
import LoadingDisplay from "./components/LoadingDisplay/LoadingDisplay";
import { useTelegramInit } from "./hooks/useTelegramInit";
import { ThemeProvider } from "./contexts/ThemeContext";
import { useApplyTheme } from "./hooks/useApplyTheme";
import { incrementStreak, getUserStats } from "./services/userStatsService";
import { useUserData } from "./hooks/useUserData";
import ThemeSwitcher from "./components/ThemeSwitcher/ThemeSwitcher"; // Add this import

const AppContent: React.FC = () => {
  const { isLoading, error, isTelegram } = useTelegramInit(); // Destructure isTelegram
  useApplyTheme();
  const { userData } = useUserData();

  useEffect(() => {
    const fetchUserStats = async (userId: string) => {
      try {
        await incrementStreak(userId);
        await getUserStats(userId);
      } catch (error) {
        console.error(error);
      }
    };

    if (userData?.id) {
      fetchUserStats(userData.id.toString());
    }
  }, [userData?.id]);

  if (isLoading) {
    return <LoadingDisplay />;
  }

  if (error) {
    return <ErrorDisplay error={error} />;
  }

  return (
    <Router>
      <div className={styles.content}>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/affirmations" element={<Affirmations />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/horoscope" element={<DailyHoroscope />} />
          <Route path="/psychological" element={<Psychological />} />
          <Route path="/astrology" element={<Astrology />} />
          <Route path="/magicball" element={<MagicBall />} />
          <Route path="/tarot" element={<Tarot />} />
          <Route path="/runes" element={<Runes />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </div>
      <Navigation />
      {!isTelegram && <ThemeSwitcher />} {/* Add ThemeSwitcher if not in Telegram context */}
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
};

export default App;
