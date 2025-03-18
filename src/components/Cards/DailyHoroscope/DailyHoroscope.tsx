import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import commonStyles from "../Cards.module.css";
import styles from "./DailyHoroscope.module.css";
import { getHoroscope } from "../../../services/predictionService";
import { useUserData } from "../../../hooks/useUserData";
import { Button } from "@telegram-apps/telegram-ui";
import BirthDatePicker from "../../BirthDatePicker/BirthDatePicker";

const DailyHoroscope: React.FC = () => {
  const { t } = useTranslation();
  const { userData } = useUserData();
  
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
      setBackgroundImage(`url(/images/horoscope-signs/${horoscopeSign.toLowerCase()}.png)`);
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
      
      <div className={styles.titleContainer} style={{ backgroundImage: backgroundImage || "none" }}>
        {!userData?.dateOfBirth && (
          <BirthDatePicker />
        )}
      </div>
      
      {userData?.dateOfBirth && (
        <Button onClick={requestHoroscope} disabled={loading}>
          {loading ? t("dailyHoroscope.loading") : t("dailyHoroscope.buttons.getHoroscope")}
        </Button>
      )}

      {error && <p className={styles.error}>{error}</p>}
      
      {horoscope && 
       <div className={styles.citationWindow}>
        <h3 className={styles.citationTitle}>{t('dailyHoroscope.generalGuidance')}</h3>
        <p className={styles.citationText}>{horoscope.generalGuidance}</p>
        <h3 className={styles.citationTitle}>{t('dailyHoroscope.loveRelationshipsAdvice')}</h3>
        <p className={styles.citationText}>{horoscope.loveRelationshipsAdvice}</p>
        <h3 className={styles.citationTitle}>{t('dailyHoroscope.careerFinancialInsights')}</h3>
        <p className={styles.citationText}>{horoscope.careerFinancialInsights}</p>
       </div>}
    </div>
  );
};

export default DailyHoroscope;