import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import commonStyles from "../Cards.module.css";
import styles from "./DailyHoroscope.module.css";
import DatePicker from "../../DatePicker/DatePicker";
import { getHoroscope } from "../../../services/predictionService";
import { saveUserBirthDate } from "../../../services/userService";
import { useUserData } from "../../../hooks/useUserData";
import { Button } from '@telegram-apps/telegram-ui';

const DailyHoroscope: React.FC = () => {
  const { t } = useTranslation();
  const { userData } = useUserData();
  const [day, setDay] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [horoscope, setHoroscope] = useState<{
    generalGuidance: string;
    loveRelationshipsAdvice: string;
    careerFinancialInsights: string;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [birthDateExists, setBirthDateExists] = useState<boolean>(false);
  const [horoscopeSign, setHoroscopeSign] = useState<string | null>(userData?.zodiacSign || null);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);

  useEffect(() => {
    if (userData?.dateOfBirth) {
      const [year, month, day] = userData.dateOfBirth.split("-");
      setYear(year);
      setMonth(month);
      setDay(day);
      setBirthDateExists(true);
      setHoroscopeSign(userData.zodiacSign || null);
    }
  }, [userData]);

  const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDay(e.target.value);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setMonth(e.target.value);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(e.target.value);
  };

  const requestHoroscope = async () => {
    setLoading(true);
    try {
      const horoscope = await getHoroscope();
      setHoroscope(horoscope);
    } catch (err) {
      setError(t('dailyHoroscope.error'));
    } finally {
      setLoading(false);
    }
  };

  const saveBirthDate = async () => {
    setLoading(true);
    try {
      const formattedMonth = month.padStart(2, '0');
      const formattedDay = day.padStart(2, '0');
      const dateOfBirth = `${year}-${formattedMonth}-${formattedDay}`;
      const updatedUserData = await saveUserBirthDate(dateOfBirth);
      setBirthDateExists(true);
      console.log(updatedUserData);
      setHoroscopeSign(updatedUserData.zodiacSign || null);
    } catch (err) {
      setError(t('dailyHoroscope.error'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(horoscopeSign);
    if (horoscopeSign) {
      setBackgroundImage(`url(/images/horoscope-signs/${horoscopeSign.toLowerCase()}.png)`);
    }
  }, [horoscopeSign, backgroundImage]);

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

  return (
    <div className={commonStyles.card}>
      <h2 className={commonStyles.title}>{t('dailyHoroscope.title')}</h2>
      <p className={commonStyles.description}>{t('dailyHoroscope.description')}</p>  
      <div 
        className={styles.titleContainer}
        style={{
          backgroundImage: backgroundImage || 'none',
        }}
      >
        {!birthDateExists && (
          <DatePicker
            day={day}
            month={month}
            year={year}
            days={days}
            months={months}
            years={years}
            handleDayChange={handleDayChange}
            handleMonthChange={handleMonthChange}
            handleYearChange={handleYearChange}
          />
        )}
      </div>
      {!birthDateExists && day && month && year && (
        <Button 
          onClick={saveBirthDate}
          disabled={loading}
        >
          {loading ? t('dailyHoroscope.loading') : t('dailyHoroscope.buttons.saveBirthDate')}
        </Button>
      )}
      {birthDateExists && (
        <Button
          onClick={requestHoroscope}
          disabled={loading}
        >
          {loading ? t('dailyHoroscope.loading') : t('dailyHoroscope.buttons.getHoroscope')}
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