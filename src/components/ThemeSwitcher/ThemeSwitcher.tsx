import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './ThemeSwitcher.module.css';

const ThemeSwitcher: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className={styles.themeSwitcher}>
      <button onClick={toggleTheme}>
        Switch to {isDarkMode ? 'Light' : 'Dark'} Theme
      </button>
    </div>
  );
};

export default ThemeSwitcher;
