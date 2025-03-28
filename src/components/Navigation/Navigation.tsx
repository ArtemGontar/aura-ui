import React from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { Home, Person, SelfImprovement } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import styles from "./Navigation.module.css";
import useTelegramHaptics from "../../hooks/useTelegramHaptic";

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
    if (newValue === 2) navigate("/profile");
  };

  return (
    <div className={styles.container}>
      <BottomNavigation value={value} onChange={handleChange}>
        <BottomNavigationAction label={t('navigation.home')} icon={<Home />} />
        <BottomNavigationAction label={t('navigation.meditations')} icon={<SelfImprovement />} />
        {/* <BottomNavigationAction label={t('navigation.task')} icon={<Task />} /> */}
        {/* <BottomNavigationAction label={t('navigation.leaderboard')} icon={<Leaderboard />} /> */}
        <BottomNavigationAction label={t('navigation.profile')} icon={<Person />} />
      </BottomNavigation>
    </div>
  );
};

export default Navigation;
