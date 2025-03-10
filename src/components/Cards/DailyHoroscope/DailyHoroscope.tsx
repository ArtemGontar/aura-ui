import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import WebApp from '@twa-dev/sdk';
import commonStyles from "../Cards.module.css";
import styles from "./DailyHoroscope.module.css";
import DatePicker from "../../DatePicker/DatePicker";
import { getHoroscopeSign } from "../../../utils/horoscopeFn";
import { getHoroscope } from "../../../services/predictionService";
import { saveUserBirthDate } from "../../../services/userService";

const DailyHoroscope: React.FC = () => {
  const { t } = useTranslation();
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
    const fetchBirthDate = async () => {
      try {
        const birthDate = await getUserBirthDate();
        if (birthDate) {
          const [year, month, day] = birthDate.split("-");
          setYear(year);
          setMonth(month);
          setDay(day);
          setBirthDateExists(true);
          const sign = getHoroscopeSign(parseInt(day), parseInt(month));
          setHoroscopeSign(sign);
        }
      } catch (err) {
        console.error("Failed to fetch birth date", err);
      } finally {
        setIsFetching(false);
      }
    };

    fetchBirthDate();
  }, []);

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
    setError("");
    try {
      const dateOfBirth = `${year}-${month}-${day}`;
      const horoscope = await getHoroscope(dateOfBirth);
      setHoroscope(horoscope);
      if (!birthDateExists) {
        await saveUserBirthDate(dateOfBirth);
      }
    } catch (err) {
      setError(t('dailyHoroscope.error'));
    } finally {
      setLoading(false);
    }
  };

  const saveBirthDate = () => {
    // Save birth date logic here
    setBirthDateExists(true);
    const sign = getHoroscopeSign(parseInt(day), parseInt(month));
    setHoroscopeSign(sign);
  };

  useEffect(() => {
    if (horoscopeSign) {
      setBackgroundImage(`url(/images/horoscope-signs/${horoscopeSign.toLowerCase()}.png)`);
    }
  }, [horoscopeSign]);

  useEffect(() => {
    if (!birthDateExists && day && month && year) {
      WebApp.MainButton.setText(t('dailyHoroscope.buttons.saveBirthDate'));
      WebApp.MainButton.show();
      WebApp.MainButton.onClick(saveBirthDate);
    } else {
      WebApp.MainButton.hide();
    }

    return () => {
      WebApp.MainButton.offClick(saveBirthDate);
    };
  }, [day, month, year, birthDateExists, t]);

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
      {birthDateExists && (
        <button 
          onClick={requestHoroscope} 
          className={`${commonStyles.button} ${styles.button}`} 
          disabled={loading || isFetching}
        >
          {loading || isFetching ? t('dailyHoroscope.loading') : t('dailyHoroscope.buttons.getHoroscope')}
        </button>
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