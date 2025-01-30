import React from 'react';
import styles from "../Cards.module.css";

const Tarot: React.FC = () => {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Tarot Reading</h2>
      <p className={styles.description}>Generate Tarot spreads and explanations here.</p>
    </div>
  );
};

export default Tarot;