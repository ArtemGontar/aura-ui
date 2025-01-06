import React from "react";
import styles from "../Cards.module.css";

const Astrology: React.FC = () => {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Astrology</h2>
      <p className={styles.description}>Uncover astrological secrets about your zodiac sign.</p>
    </div>
  );
};

export default Astrology;
