import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './DreamBookResult.module.css';

interface DreamBookResultProps {
  interpretation: string;
}

const DreamBookResult: React.FC<DreamBookResultProps> = ({ interpretation }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.resultContainer}>
      <h4>{t('dreamBook.resultTitle')}</h4>
      <p>{interpretation}</p>
    </div>
  );
};

export default DreamBookResult;
