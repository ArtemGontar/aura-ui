import React from "react";
import styles from "../Cards.module.css";

const DailyHoroscope: React.FC = () => {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Daily Horoscope</h2>
      <p className={styles.description}>Discover what the stars have in store for you today.</p>
    </div>
  );
};

export default DailyHoroscope;
