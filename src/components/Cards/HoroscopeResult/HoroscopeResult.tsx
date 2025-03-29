import React from "react";
import styles from "./HoroscopeResult.module.css";
import { useTranslation } from "react-i18next";

interface HoroscopeResultProps {
  horoscope: {
    generalGuidance: string;
    loveRelationshipsAdvice: string;
    careerFinancialInsights: string;
    focus: string;
  };
}

const HoroscopeResult: React.FC<HoroscopeResultProps> = ({ horoscope }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.resultContainer}>
      <h3 className={styles.resultTitle}>{t('dailyHoroscope.generalGuidance')}</h3>
      <p className={styles.resultText}>{horoscope.generalGuidance}</p>
      <h3 className={styles.resultTitle}>{t('dailyHoroscope.loveRelationshipsAdvice')}</h3>
      <p className={styles.resultText}>{horoscope.loveRelationshipsAdvice}</p>
      <h3 className={styles.resultTitle}>{t('dailyHoroscope.careerFinancialInsights')}</h3>
      <p className={styles.resultText}>{horoscope.careerFinancialInsights}</p>
      <h3 className={styles.resultTitle}>{t('dailyHoroscope.focus')}</h3>
      <p className={styles.resultText}>{horoscope.focus}</p>
    </div>
  );
};

export default HoroscopeResult;
