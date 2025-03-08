import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './LoadingDisplay.module.css';

interface LoadingDisplayProps {
  message?: string;
}

const LoadingDisplay: React.FC<LoadingDisplayProps> = ({ 
  message
}) => {
  const { t } = useTranslation();
  const displayMessage = message || t('loading');

  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingCard}>
        <div className={styles.loadingIconContainer}>
          <div className={styles.loadingIcon}>
            <div className={styles.spinner}>
              <div className={styles.spinnerRing}></div>
              <div className={styles.spinnerRing}></div>
              <div className={styles.spinnerRing}></div>
              <div className={styles.spinnerCore}></div>
            </div>
          </div>
        </div>
        <div className={styles.loadingContent}>
          <div className={styles.loadingText}>
            {displayMessage}
          </div>
          <div className={styles.loadingProgress}>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingDisplay; 