import React from "react";
import styles from "./AffirmationResult.module.css";

interface AffirmationResultProps {
  affirmation: { text: string } | null;
}

const AffirmationResult: React.FC<AffirmationResultProps> = ({ affirmation }) => {
  return (
    <div className={styles.resultContainer}>
      {affirmation && (
        <>
          <p className={styles.message}>{affirmation.text}</p>
        </>
      )}
    </div>
  );
};

export default AffirmationResult;
