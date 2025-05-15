import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './HandFortune.module.css';
import { HandFortuneData } from '../../../types/prediction';

interface HandFortuneResultProps {
  reading: HandFortuneData;
}

const HandFortuneResult: React.FC<HandFortuneResultProps> = ({ reading }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.resultContainer}>
      <h3 className={styles.resultTitle}>{t('handFortune.overallInterpretation')}</h3>
      <p className={styles.resultText}>{reading.overallInterpretation}</p>
      
      <h4 className={styles.lineTitle}>{t('handFortune.lifeLineReading')}</h4>
      <p className={styles.resultText}>{reading.lifeLineReading}</p>
      
      <h4 className={styles.lineTitle}>{t('handFortune.heartLineReading')}</h4>
      <p className={styles.resultText}>{reading.heartLineReading}</p>
      
      <h4 className={styles.lineTitle}>{t('handFortune.headLineReading')}</h4>
      <p className={styles.resultText}>{reading.headLineReading}</p>
      
      <h4 className={styles.lineTitle}>{t('handFortune.fateLineReading')}</h4>
      <p className={styles.resultText}>{reading.fateLineReading}</p>
      
      <h4 className={styles.lineTitle}>{t('handFortune.mountsAnalysis')}</h4>
      <p className={styles.resultText}>{reading.mountsAnalysis}</p>
    </div>
  );
};

export default HandFortuneResult;
