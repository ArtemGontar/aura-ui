import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './LoadingDisplay.module.css';
import { Spinner } from '@telegram-apps/telegram-ui';

interface LoadingDisplayProps {
  message?: string;
  size?: 's' | 'm' | 'l';
}

const LoadingDisplay: React.FC<LoadingDisplayProps> = ({ 
  message,
  size = 'l'
}) => {
  const { t } = useTranslation();
  const displayMessage = message || t('loading');

  return (
    <>
      <Spinner size={size} />
      <div className={styles.loadingText}>
        {displayMessage}
      </div>
    </>  
  );
};

export default LoadingDisplay;