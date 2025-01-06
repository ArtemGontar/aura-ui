import React from 'react';
import styles from "../Cards.module.css";

const Runes: React.FC = () => {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Runes Reading</h2>
      <p className={styles.description}>Draw runes and provide interpretations here.</p>
    </div>
  );
};

export default Runes;