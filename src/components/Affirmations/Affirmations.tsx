import React from "react";
import styles from "./Affirmations.module.css";

const Affirmations: React.FC = () => {
  return (
    <div className={styles.affirmations}>
      <div className={styles.banner}>
        <span className={styles.emoji}>✨</span>
        <p className={styles.bannerText}>
          Affirmations are getting a makeover!
        </p>
        <p className={styles.subText}>
          We're crafting something special to help you stay positive and motivated. Check back soon!
        </p>
      </div>
    </div>
  );
}

export default Affirmations;
