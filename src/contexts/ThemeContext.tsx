import React, { createContext, useContext, useEffect, useState } from 'react';
import WebApp from '@twa-dev/sdk';
import { ThemeParams } from '../types/telegram';

interface ThemeContextType {
  isDarkMode: boolean;
  themeParams: ThemeParams;
}

const defaultThemeParams: ThemeParams = {
  bg_color: '#ffffff',
  text_color: '#000000',
  hint_color: '#999999',
  link_color: '#2481cc',
  button_color: '#2481cc',
  button_text_color: '#ffffff',
  secondary_bg_color: '#f4f4f5'
};

const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  themeParams: defaultThemeParams
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [themeParams, setThemeParams] = useState<ThemeParams>(defaultThemeParams);

  useEffect(() => {
    const initTheme = () => {
      // Get color scheme from Telegram WebApp
      const colorScheme = WebApp.colorScheme;
      setIsDarkMode(colorScheme === 'dark');

      // Get theme params from Telegram WebApp
      const params = WebApp.themeParams;
      if (params) {
        setThemeParams({
          bg_color: params.bg_color,
          text_color: params.text_color,
          hint_color: params.hint_color,
          link_color: params.link_color,
          button_color: params.button_color,
          button_text_color: params.button_text_color,
          secondary_bg_color: params.secondary_bg_color
        });
      }
    };

    initTheme();

    // Listen for theme changes
    WebApp.onEvent('themeChanged', initTheme);

    return () => {
      WebApp.offEvent('themeChanged', initTheme);
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ isDarkMode, themeParams }}>
      {children}
    </ThemeContext.Provider>
  );
}; 