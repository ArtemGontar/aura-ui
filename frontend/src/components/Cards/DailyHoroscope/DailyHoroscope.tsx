import React, { useState } from "react";
import axios from "axios";
import styles from "../Cards.module.css";

const DailyHoroscope: React.FC = () => {
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [horoscope, setHoroscope] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateOfBirth(e.target.value);
  };

  const requestHoroscope = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axios.post("/api/getHoroscope", { dateOfBirth });
      setHoroscope(response.data.horoscope);
    } catch (err) {
      setError("Failed to fetch horoscope. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Daily Horoscope</h2>
      <p className={styles.description}>Discover what the stars have in store for you today.</p>
      <input
        type="date"
        value={dateOfBirth}
        onChange={handleDateChange}
        className={styles.input}
        placeholder="Enter your date of birth"
      />
      <button onClick={requestHoroscope} className={styles.button} disabled={loading}>
        {loading ? "Loading..." : "Get Horoscope"}
      </button>
      {error && <p className={styles.error}>{error}</p>}
      {horoscope && <p className={styles.horoscope}>{horoscope}</p>}
    </div>
  );
};

export default DailyHoroscope;