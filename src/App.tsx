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
import { MOCK_USER_DATA } from "./utils/debug.ts"

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const savedUserData = localStorage.getItem("telegramUserData")
    if (savedUserData) {
      setIsLoading(false)
      return
    }

    try {
      // Initialize Telegram WebApp
      WebApp.ready()

      const initData = WebApp.initData
      let newUserData: UserData;
      if (!initData) {
        console.log("No initialization data available, using mock data");
        console.log("User data initialized:", MOCK_USER_DATA)
        newUserData = MOCK_USER_DATA;
      } else {
        const user = WebApp.initDataUnsafe.user;
      
        if (!user) {
          setError("User data not available");
          setIsLoading(false);
          return;
        }
      
        newUserData = {
          id: user.id,
          firstName: user.first_name,
          lastName: user.last_name || "",
          username: user.username || "",
          languageCode: user.language_code || "en",
          isPremium: user.is_premium || false,
          photoUrl: user.photo_url || "",
        };
      }

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
  }, [])

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
