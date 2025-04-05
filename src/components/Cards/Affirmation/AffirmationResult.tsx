import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./AffirmationResult.module.css";

interface AffirmationResultProps {
  affirmation: { message: string; category: string } | null;
  loading: boolean;
  error: string;
}

const AffirmationResult: React.FC<AffirmationResultProps> = ({ affirmation, loading, error }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.resultContainer}>
      {affirmation ? (
        <>
          <p className={styles.message}>{affirmation.message}</p>
          <p className={styles.category}>{t("affirmation.category", { category: affirmation.category })}</p>
        </>
      ) : (
        <p>{loading ? '' : error}</p>
      )}
    </div>
  );
};

export default AffirmationResult;
