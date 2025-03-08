import { useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

export const useApplyTheme = () => {
  const { themeParams } = useTheme();

  useEffect(() => {
    const root = document.documentElement;

    // Apply theme variables
    root.style.setProperty('--tg-theme-bg-color', themeParams.bg_color);
    root.style.setProperty('--tg-theme-text-color', themeParams.text_color);
    root.style.setProperty('--tg-theme-hint-color', themeParams.hint_color);
    root.style.setProperty('--tg-theme-link-color', themeParams.link_color);
    root.style.setProperty('--tg-theme-button-color', themeParams.button_color);
    root.style.setProperty('--tg-theme-button-text-color', themeParams.button_text_color);
    root.style.setProperty('--tg-theme-secondary-bg-color', themeParams.secondary_bg_color);

    // Apply additional theme variables based on the main colors
    root.style.setProperty('--tg-theme-error-color', '#ff3b30');
    root.style.setProperty('--tg-theme-success-color', '#34c759');
    root.style.setProperty('--tg-theme-warning-color', '#ff9500');
  }, [themeParams]);
}; 