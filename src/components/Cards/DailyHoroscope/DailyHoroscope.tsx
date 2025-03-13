import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import commonStyles from "../Cards.module.css";
import styles from "./DailyHoroscope.module.css";
import DatePicker from "../../DatePicker/DatePicker";
import { getHoroscopeSign } from "../../../utils/horoscopeFn";
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
  const [horoscope, setHoroscope] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [birthDateExists, setBirthDateExists] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [horoscopeSign, setHoroscopeSign] = useState<string | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);

  useEffect(() => {
    if (userData?.dateOfBirth) {
      const [year, month, day] = userData.dateOfBirth.split("-");
      setYear(year);
      setMonth(month);
      setDay(day);
      setBirthDateExists(true);
      const sign = getHoroscopeSign(parseInt(day), parseInt(month));
      setHoroscopeSign(sign);
    }
    setIsFetching(false);
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
      const dateOfBirth = `${year}-${month}-${day}`;
      await saveUserBirthDate(dateOfBirth);
      setBirthDateExists(true);
      const sign = getHoroscopeSign(parseInt(day), parseInt(month));
      setHoroscopeSign(sign);
    } catch (err) {
      setError(t('dailyHoroscope.error'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (horoscopeSign) {
      setBackgroundImage(`url(/images/horoscope-signs/${horoscopeSign.toLowerCase()}.png)`);
    }
  }, [horoscopeSign]);

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
        {!isFetching && !birthDateExists && (
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
          disabled={loading || isFetching}
        >
          {loading || isFetching ? t('dailyHoroscope.loading') : t('dailyHoroscope.buttons.saveBirthDate')}
        </Button>
      )}
      {birthDateExists && (
        <Button
          onClick={requestHoroscope}
          disabled={loading || isFetching}
        >
          {loading || isFetching ? t('dailyHoroscope.loading') : t('dailyHoroscope.buttons.getHoroscope')}
        </Button>
      )}
      {error && <p className={styles.error}>{error}</p>}
      {horoscope && 
       <div className={styles.citationWindow}>
        <p className={styles.citationText}>{horoscope}</p>
       </div>}
    </div>
  );
};

export default DailyHoroscope;