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
import Meditations from "./components/Meditations/Meditations";
import ErrorDisplay from "./components/ErrorDisplay/ErrorDisplay";
import LoadingDisplay from "./components/LoadingDisplay/LoadingDisplay";
import { useTelegramInit } from "./hooks/useTelegramInit";
import { ThemeProvider } from "./contexts/ThemeContext";
import { useApplyTheme } from "./hooks/useApplyTheme";
import { incrementStreak, getUserStats } from "./services/userStatsService";
import { useUserData } from "./hooks/useUserData";
import ThemeSwitcher from "./components/ThemeSwitcher/ThemeSwitcher"; // Add this import
import Compatibility from "./components/Cards/Сompatibility/Сompatibility";
import CreatePersonalMeditation from "./components/CreatePersonalMeditation/CreatePersonalMeditation"; // Add this import
import TariffPlans from "./components/TariffPlans/TariffPlans"; // Add this import
import Onboarding from "./components/Onboarding/Onboarding"; // Add this import
import useTelegramBackButton from "./hooks/useTelegramBackButton"; // Re-add this import

const AppContent: React.FC = () => {
  const { isLoading, error, isTelegram } = useTelegramInit(); // Destructure isTelegram
  useApplyTheme();
  const { userData } = useUserData();
  useTelegramBackButton(); // Re-add this line

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
    <>
      <div className={styles.content}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/meditations" element={<Meditations />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/horoscope" element={<DailyHoroscope />} />
          <Route path="/compatibility" element={<Compatibility />} />
          <Route path="/psychological" element={<Psychological />} />
          <Route path="/astrology" element={<Astrology />} />
          <Route path="/magicball" element={<MagicBall />} />
          <Route path="/create-personal-meditation" element={<CreatePersonalMeditation />} /> {/* Add this route */}
          <Route path="/tariff-plans" element={<TariffPlans />} /> {/* Add this route */}
          <Route path="/onboarding" element={<Onboarding />} /> {/* Add this route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <Navigation />
      {!isTelegram && <ThemeSwitcher />} {/* Add ThemeSwitcher if not in Telegram context */}
    </>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </Router>
  );
};

export default App;
