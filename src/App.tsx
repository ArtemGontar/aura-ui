import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navigation from "./components/Navigation/Navigation";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import styles from "./App.module.css";
import DailyHoroscope from "./components/Cards/DailyHoroscope/DailyHoroscope";
import PsychologySuccess from "./components/Cards/PsychologySuccess/PsychologySuccess";
import Tarot from "./components/Cards/Tarot/Tarot";
import MagicBall from "./components/Cards/MagicBall/MagicBall";
import Meditations from "./components/Meditations/Meditations";
import ErrorDisplay from "./components/ErrorDisplay/ErrorDisplay";
import LoadingDisplay from "./components/LoadingDisplay/LoadingDisplay";
import { useTelegramInit } from "./hooks/useTelegramInit";
import { ThemeProvider } from "./contexts/ThemeContext";
import { useApplyTheme } from "./hooks/useApplyTheme";
import { useUserData } from "./hooks/useUserData";
import { useUserStats } from "./hooks/useUserStats"; // Added import
import ThemeSwitcher from "./components/ThemeSwitcher/ThemeSwitcher"; 
import Compatibility from "./components/Cards/Сompatibility/Сompatibility";
import CreatePersonalMeditation from "./components/CreatePersonalMeditation/CreatePersonalMeditation"; 
import TariffPlans from "./components/TariffPlans/TariffPlans"; 
import useTelegramBackButton from "./hooks/useTelegramBackButton";
import EditUser from "./components/EditUser/EditUser";
import useTelegramWebApp from "./hooks/useTelegramWebApp";
import Affirmation from "./components/Cards/Affirmation/Affirmation";
import DreamBook from "./components/Cards/DreamBook/DreamBook";
import TasksPage from "./components/Tasks/Tasks";
import HandFortune from "./components/Cards/HandFortune/HandFortune";

const AppContent: React.FC = () => {
  const { isUserLoading, error, isTelegram } = useTelegramInit();
  useApplyTheme();
  const { userData } = useUserData(); // Retain for potential other uses, though useUserStats also uses it.
  useTelegramBackButton();
  useTelegramWebApp();
  useUserStats(); // Use the new hook

  if (isUserLoading) {
    return <LoadingDisplay 
      size="l" 
      wrapperStyle={{ 
        display: 'flex', 
        flexDirection: 'column',
        justifyContent: 'center', 
        alignItems: 'center', 
        width: '100%', 
        margin: '2rem 0',
        height: '100vh'
      }}
    />;
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
          <Route path="/affirmation" element={<Affirmation />} />
          <Route path="/psychologySuccess" element={<PsychologySuccess />} />
          <Route path="/handfortune" element={<HandFortune />} />
          <Route path="/tarot" element={<Tarot />} />
          <Route path="/magicball" element={<MagicBall />} />
          <Route path="/create-personal-meditation" element={<CreatePersonalMeditation />} />
          <Route path="/tariff-plans" element={<TariffPlans />} />
          <Route path="/edit-user" element={<EditUser />} />
          <Route path="/dreambook" element={<DreamBook />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <Navigation />
      {!isTelegram && <ThemeSwitcher />}
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
