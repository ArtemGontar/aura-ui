import React from "react";
import styles from "../Cards.module.css";

const MagicBall: React.FC = () => {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>Magic Ball</h2>
      <p className={styles.description}>Ask a question and let the magic ball reveal your answer.</p>
    </div>
  );
};

export default MagicBall;
