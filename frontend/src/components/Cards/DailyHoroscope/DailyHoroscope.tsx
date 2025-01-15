import React, { useEffect, useState } from "react";
import styles from "../Cards.module.css";
import { saveUserBirthDate, getUserBirthDate } from "../../../services/userMockService"; // or userService
import { getHoroscope } from "../../../services/predictionMockService"; // or predictionService

const DailyHoroscope: React.FC = () => {
  const [day, setDay] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [year, setYear] = useState<string>("");
  const [horoscope, setHoroscope] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [birthDateExists, setBirthDateExists] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(true);

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
      setError("Failed to fetch horoscope. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Daily Horoscope</h2>
      <p className={styles.description}>Discover what the stars have in store for you today.</p>
      {!isFetching && !birthDateExists && (
        <>
          <label className={styles.label}>Enter your date of birth:</label>
          <div className={styles.datePicker}>
            <select value={day} onChange={handleDayChange} className={styles.select}>
              <option value="">Day</option>
              {days.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
            <select value={month} onChange={handleMonthChange} className={styles.select}>
              <option value="">Month</option>
              {months.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            <select value={year} onChange={handleYearChange} className={styles.select}>
              <option value="">Year</option>
              {years.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
          <p className={styles.comment}>This data will be saved to the server and you can change it later in your profile.</p>
        </>
      )}
      <button onClick={requestHoroscope} className={styles.button} disabled={loading || isFetching}>
        {loading || isFetching ? "Loading..." : "Get Horoscope"}
      </button>
      {error && <p className={styles.error}>{error}</p>}
      {horoscope && <p className={styles.horoscope}>{horoscope}</p>}
    </div>
  );
};

export default DailyHoroscope;