import React from "react";
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
import { useTelegramInit } from "./hooks/useTelegramInit";

const App: React.FC = () => {
  const { isLoading, error } = useTelegramInit();

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loading}>Loading user data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.error}>{error}</div>
        <button 
          className={styles.retryButton}
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className={styles.app}>
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
      </Router>
    </div>
  );
};

export default App;
