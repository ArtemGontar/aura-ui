import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './ErrorDisplay.module.css';

interface ErrorDisplayProps {
  error: string;
  onRetry?: () => void;
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ 
  error,
  onRetry = () => window.location.reload()
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.errorContainer}>
      <div className={styles.errorCard}>
        <div className={styles.errorIcon}>⚠️</div>
        <div className={styles.errorContent}>
          <div className={styles.error}>
            {error ? error : t('error.somethingWentWrong')}
          </div>
          <button 
            className={styles.retryButton}
            onClick={onRetry}
          >
            <span className={styles.retryIcon}>↻</span>
            {t('error.retry')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorDisplay; 