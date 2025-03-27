import { useEffect } from 'react';
import WebApp from '@twa-dev/sdk';

const setupTelegramWebApp = () => {
  WebApp.ready();
  WebApp.expand();
  // WebApp.requestFullscreen();
  WebApp.enableClosingConfirmation();
};

const useTelegramWebApp = () => {
  useEffect(() => {
    setupTelegramWebApp();
  }, []);
};

export default useTelegramWebApp;
