import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './LoadingDisplay.module.css';
import { Spinner } from '@telegram-apps/telegram-ui';

interface LoadingDisplayProps {
  message?: string;
  size?: 's' | 'm' | 'l';
  wrapperStyle?: React.CSSProperties; // New prop for custom styles
}

const LoadingDisplay: React.FC<LoadingDisplayProps> = ({ 
  message,
  size = 'l',
  wrapperStyle = {} // Ensure a default empty object for safety
}) => {
  const { t } = useTranslation();
  const displayMessage = message || t('loading');

  return (
    <div style={wrapperStyle}> {/* Add wrapper div with custom styles */}
      <Spinner size={size} />
      <div className={styles.loadingText}>
        {displayMessage}
      </div>
    </div>  
  );
};

export default LoadingDisplay;