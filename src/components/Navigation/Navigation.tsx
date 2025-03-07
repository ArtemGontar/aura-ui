import React from "react";
import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { Home, Person, SelfImprovement } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import styles from "./Navigation.module.css";

const Navigation: React.FC = () => {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    if (newValue === 0) navigate("/home");
    if (newValue === 1) navigate("/affirmations");
    if (newValue === 2) navigate("/profile");
  };

  return (
    <div className={styles.container}>
      <BottomNavigation value={value} onChange={handleChange}>
        <BottomNavigationAction label={t('navigation.home')} icon={<Home />} />
        <BottomNavigationAction label={t('navigation.affirmations')} icon={<SelfImprovement />} />
        <BottomNavigationAction label={t('navigation.profile')} icon={<Person />} />
      </BottomNavigation>
    </div>
  );
};

export default Navigation;
