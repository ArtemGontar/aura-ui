import React from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { Home, Person, SelfImprovement, Task } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import styles from "./Navigation.module.css";
import useTelegramHaptics from "../../hooks/useTelegramHaptic";
import { Tabbar } from "@telegram-apps/telegram-ui";
import { AudioLines, House, ListTodo, User, Trophy } from "lucide-react";

const Navigation: React.FC = () => {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const haptics = useTelegramHaptics();

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    haptics.selectionChanged();
    if (newValue === 0) navigate("/");
    if (newValue === 1) navigate("/meditations");
    if (newValue === 2) navigate("/tasks");
    if (newValue === 3) navigate("/leaderboard");
    if (newValue === 4) navigate("/profile");
  };

  return (
    <div className={styles.container}>
      <BottomNavigation value={value} onChange={handleChange}>
        <BottomNavigationAction label={t('navigation.home')} icon={<House />} />
        <BottomNavigationAction label={t('navigation.meditations')} icon={<AudioLines />} />
        <BottomNavigationAction label={t('navigation.tasks')} icon={<ListTodo />} />
        <BottomNavigationAction label={t('navigation.leaderboard') ?? "Leaderboard"} icon={<Trophy />} />
        <BottomNavigationAction label={t('navigation.profile')} icon={<User />} />
      </BottomNavigation>
    </div>
  );
};

export default Navigation;
