import React, { useEffect, useState } from "react";
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
import WebApp from '@twa-dev/sdk'
import { UserData } from "./types/user.ts";

const App: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(() => {
    const savedUserData = localStorage.getItem("telegramUserData")
    return savedUserData ? JSON.parse(savedUserData) : null
  })
  const [isLoading, setIsLoading] = useState(!userData)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (userData) {
      return // Skip initialization if we already have user data
    }

    try {
      // Initialize Telegram WebApp
      WebApp.ready()

      const initData = WebApp.initData

      if (!initData) {
        setError("No initialization data available")
        setIsLoading(false)
        return
      }

      // Extract user data from initData
      const user = WebApp.initDataUnsafe.user

      if (!user) {
        setError("User data not available")
        setIsLoading(false)
        return
      }

      const newUserData: UserData = {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name || "",
        username: user.username || "",
        languageCode: user.language_code || "en",
        isPremium: user.is_premium || false,
        photoUrl: user.photo_url || "",
      }

      setUserData(newUserData)
      localStorage.setItem("telegramUserData", JSON.stringify(newUserData))

      // Expand the Telegram Mini App to its maximum allowed height
      WebApp.expand()

      // Enable closing confirmation if needed
      WebApp.enableClosingConfirmation()

      setIsLoading(false)
    } catch (err) {
      setError(`Failed to initialize: ${err instanceof Error ? err.message : String(err)}`)
      setIsLoading(false)
    }
  }, [userData])

  if (isLoading) {
    return <div className="loading">Loading user data...</div>
  }

  if (error) {
    return <div className="error">{error}</div>
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
