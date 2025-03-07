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
import { LaunchParams } from './types/telegram.ts'

const App: React.FC = () => {
  const [, setUser] = useState<LaunchParams | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      // Initialize Telegram WebApp
      WebApp.ready()
      
      // Get user data from launch params
      const initData = WebApp.initData
      
      if (!initData) {
        setError('No init data available. Are you running this outside of Telegram?')
        setIsLoading(false)
        return
      }
      
      // Parse the initData string
      const searchParams = new URLSearchParams(initData)
      const userStr = searchParams.get('user')
      
      if (!userStr) {
        setError('No user data found in launch parameters')
        setIsLoading(false)
        return
      }
      
      // Parse user data
      const userData = JSON.parse(userStr)
      
      // Get other launch params
      const startParam = searchParams.get('start_param')
      const authDate = searchParams.get('auth_date')
      const hash = searchParams.get('hash')
      
      // Combine all data
      const launchParams: LaunchParams = {
        user: userData,
        startParam,
        authDate,
        hash,
        // Add other params from WebApp
        colorScheme: WebApp.colorScheme,
        themeParams: WebApp.themeParams,
        viewportHeight: WebApp.viewportHeight,
        viewportStableHeight: WebApp.viewportStableHeight,
        isExpanded: WebApp.isExpanded,
        platform: WebApp.platform
      }
      
      setUser(launchParams)
      setIsLoading(false)
      
      // Set the header color to match Telegram theme
      WebApp.setHeaderColor(WebApp.themeParams.bg_color)
      
      // Enable closing confirmation if needed
      // WebApp.enableClosingConfirmation()
      
    } catch (err) {
      setError(`Error initializing: ${err instanceof Error ? err.message : String(err)}`)
      setIsLoading(false)
    }
  }, [])

  if (isLoading) {
    return <div className="loading">Loading...</div>
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
