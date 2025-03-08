import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./Affirmations.module.css";

const Affirmations: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.affirmations}>
      <div className={styles.banner}>
        <span className={styles.emoji}>✨</span>
        <p className={styles.bannerText}>
          {t('affirmations.banner.title')}
        </p>
        <p className={styles.subText}>
          {t('affirmations.banner.subtitle')}
        </p>
      </div>
    </div>
  );
};

export default Affirmations;
