import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import commonStyles from "../Cards.module.css";
import styles from "./DailyHoroscope.module.css";
import WebApp from '@twa-dev/sdk';
import { getHoroscope } from "../../../services/predictionService";
import { useUserData } from "../../../hooks/useUserData";
import { Button } from "@telegram-apps/telegram-ui";
import BirthDatePicker from "../../BirthDatePicker/BirthDatePicker";

const DailyHoroscope: React.FC = () => {
  const { t } = useTranslation();
  const { userData } = useUserData();
  WebApp.BackButton.show();
  const [horoscope, setHoroscope] = useState<{
    generalGuidance: string;
    loveRelationshipsAdvice: string;
    careerFinancialInsights: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [horoscopeSign, setHoroscopeSign] = useState(userData?.zodiacSign || null);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);

  useEffect(() => {
    if (userData?.dateOfBirth) {
      setHoroscopeSign(userData.zodiacSign || null);
    }
  }, [userData]);

  useEffect(() => {
    if (horoscopeSign) {
      setBackgroundImage(`/images/horoscope-signs/${horoscopeSign.toLowerCase()}.png`);
    }
  }, [horoscopeSign]);

  const requestHoroscope = async () => {
    setLoading(true);
    setError("");
    try {
      setHoroscope(await getHoroscope());
    } catch {
      setError(t("dailyHoroscope.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={commonStyles.card}>
      <h2 className={commonStyles.title}>{t("dailyHoroscope.title")}</h2>
      <p className={commonStyles.description}>{t("dailyHoroscope.description")}</p>
      
      <div className={styles.titleContainer}>
        {!userData?.dateOfBirth ? (
          <BirthDatePicker />
        ) : (
          <>
            {backgroundImage && <img src={backgroundImage} alt={horoscopeSign || "Horoscope Sign"} className={styles.horoscopeImage} />}
            <Button onClick={requestHoroscope} disabled={loading}>
              {loading ? t("cards.loading") : t("dailyHoroscope.buttons.getHoroscope")}
            </Button>
          </>
        )}
      </div>

      {error && <p className={styles.error}>{error}</p>}
      
      {horoscope && 
       <div className={styles.resultContainer}>
        <h3 className={styles.resultTitle}>{t('dailyHoroscope.generalGuidance')}</h3>
        <p className={styles.resultText}>{horoscope.generalGuidance}</p>
        <h3 className={styles.resultTitle}>{t('dailyHoroscope.loveRelationshipsAdvice')}</h3>
        <p className={styles.resultText}>{horoscope.loveRelationshipsAdvice}</p>
        <h3 className={styles.resultTitle}>{t('dailyHoroscope.careerFinancialInsights')}</h3>
        <p className={styles.resultText}>{horoscope.careerFinancialInsights}</p>
       </div>}
    </div>
  );
};

export default DailyHoroscope;