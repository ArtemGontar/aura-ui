import React from "react";
import styles from "../Cards.module.css";

const Psychological: React.FC = () => {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Psychological</h2>
      <p className={styles.description}>Gain insights into your personality and mental well-being.</p>
    </div>
  );
};

export default Psychological;
