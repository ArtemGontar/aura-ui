import React, { createContext, useContext, useEffect, useState } from 'react';
import WebApp from '@twa-dev/sdk';
import { ThemeParams } from '../types/telegram';

interface ThemeContextType {
  isDarkMode: boolean;
  themeParams: ThemeParams;
  setIsDarkMode: (isDarkMode: boolean) => void;
  toggleTheme: () => void;
}

const defaultThemeParams: ThemeParams = {
  bg_color: getComputedStyle(document.documentElement).getPropertyValue('--tg-theme-bg-color').trim(),
  text_color: getComputedStyle(document.documentElement).getPropertyValue('--tg-theme-text-color').trim(),
  hint_color: getComputedStyle(document.documentElement).getPropertyValue('--tg-theme-hint-color').trim(),
  link_color: getComputedStyle(document.documentElement).getPropertyValue('--tg-theme-link-color').trim(),
  button_color: getComputedStyle(document.documentElement).getPropertyValue('--tg-theme-button-color').trim(),
  button_text_color: getComputedStyle(document.documentElement).getPropertyValue('--tg-theme-button-text-color').trim(),
  secondary_bg_color: getComputedStyle(document.documentElement).getPropertyValue('--tg-theme-secondary-bg-color').trim()
};

const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  themeParams: defaultThemeParams,
  setIsDarkMode: () => {},
  toggleTheme: () => {}
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(WebApp.colorScheme  === 'dark');
  const [themeParams, setThemeParams] = useState<ThemeParams>(defaultThemeParams);

  useEffect(() => {
    const initTheme = () => {
      // Get theme params from Telegram WebApp
      const params = WebApp.themeParams;
      if (params && Object.keys(params).length > 0) {
        setThemeParams({
          bg_color: params.bg_color,
          text_color: params.text_color,
          hint_color: params.hint_color,
          link_color: params.link_color,
          button_color: params.button_color,
          button_text_color: params.button_text_color,
          secondary_bg_color: params.secondary_bg_color
        });
      } else {
        setThemeParams(defaultThemeParams);
      }
    };

    initTheme();

    // Listen for theme changes
    WebApp.onEvent('themeChanged', initTheme);

    return () => {
      WebApp.offEvent('themeChanged', initTheme);
    };
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prevMode => {
      const newMode = !prevMode;
      return newMode;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, themeParams, setIsDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};