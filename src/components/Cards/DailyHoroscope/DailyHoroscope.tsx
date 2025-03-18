import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import commonStyles from "../Cards.module.css";
import styles from "./DailyHoroscope.module.css";
import DatePicker from "../../DatePicker/DatePicker";
import { getHoroscope } from "../../../services/predictionService";
import { saveUserBirthDate } from "../../../services/userService";
import { useUserData } from "../../../hooks/useUserData";
import { Button } from "@telegram-apps/telegram-ui";

const DailyHoroscope: React.FC = () => {
  const { t } = useTranslation();
  const { userData } = useUserData();
  
  const [birthDate, setBirthDate] = useState({ day: "", month: "", year: "" });
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
      const [year, month, day] = userData.dateOfBirth.split("-");
      setBirthDate({ day, month, year });
      setHoroscopeSign(userData.zodiacSign || null);
    }
  }, [userData]);

  useEffect(() => {
    if (horoscopeSign) {
      setBackgroundImage(`url(/images/horoscope-signs/${horoscopeSign.toLowerCase()}.png)`);
    }
  }, [horoscopeSign]);

  const handleBirthDateChange = (field: string, value: string) => {
    setBirthDate((prev) => ({ ...prev, [field]: value }));
  };

  const saveBirthDate = async () => {
    setLoading(true);
    setError("");
    try {
      const formattedDate = `${birthDate.year}-${birthDate.month.padStart(2, "0")}-${birthDate.day.padStart(2, "0")}`;
      const updatedUserData = await saveUserBirthDate(formattedDate);
      setHoroscopeSign(updatedUserData.zodiacSign || null);
    } catch {
      setError(t("dailyHoroscope.error"));
    } finally {
      setLoading(false);
    }
  };

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
          <DatePicker 
            {...birthDate} 
            days={Array.from({ length: 31 }, (_, i) => i + 1)}
            months={Array.from({ length: 12 }, (_, i) => i + 1)}
            years={Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i)}
            handleDayChange={(e) => handleBirthDateChange("day", e.target.value)}
            handleMonthChange={(e) => handleBirthDateChange("month", e.target.value)}
            handleYearChange={(e) => handleBirthDateChange("year", e.target.value)}
          />
        )}
      </div>
      
      {!userData?.dateOfBirth && birthDate.day && birthDate.month && birthDate.year && (
        <Button onClick={saveBirthDate} disabled={loading}>
          {loading ? t("dailyHoroscope.loading") : t("dailyHoroscope.buttons.saveBirthDate")}
        </Button>
      )}
      
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