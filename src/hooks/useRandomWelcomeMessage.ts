import { useMemo } from 'react';
import { TFunction } from 'i18next';

export const useRandomWelcomeMessage = (t: TFunction): string => {
  const randomWelcomeMessage = useMemo(() => {
    const welcomeMessagesKeys = [
      'home.welcomeMessage1',
      'home.welcomeMessage2',
      'home.welcomeMessage3',
      'home.welcomeMessage4',
      'home.welcomeMessage5',
    ];
    const translatedMessages = welcomeMessagesKeys.map(key => t(key));
    return translatedMessages[Math.floor(Math.random() * translatedMessages.length)];
  }, [t]);

  return randomWelcomeMessage;
};
