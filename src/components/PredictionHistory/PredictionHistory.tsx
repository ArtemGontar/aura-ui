import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styles from "./PredictionHistory.module.css";
import { getPredictionHistory } from "../../services/predictionService";

const PredictionHistory: React.FC = () => {
  const { t } = useTranslation();
  const [predictions, setPredictions] = useState([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPredictions = async () => {
      setIsLoading(true);
      try {
        const data = await getPredictionHistory(page, 5);
        setPredictions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPredictions();
  }, [page]);

  if (isLoading) {
    return <div>{t('profile.history.loading')}</div>;
  }

  if (error) {
    return <div>{t('profile.history.error')}</div>;
  }

  if (predictions.length === 0) {
    return <div>{t('profile.history.noPredictions')}</div>;
  }

  return (
    <section className={styles.history} aria-labelledby="history-title">
      <h3 id="history-title">{t('profile.history.title')}</h3>
      <ul className={styles.predictionList}>
        {predictions.map((prediction, index) => (
          <li key={index} className={styles.predictionItem}>
            {prediction}
          </li>
        ))}
      </ul>
      <div className={styles.pagination}>
        <button onClick={() => setPage(page - 1)} disabled={page === 0}>
          {t('profile.history.previous')}
        </button>
        <button onClick={() => setPage(page + 1)}>
          {t('profile.history.next')}
        </button>
      </div>
    </section>
  );
};

export default PredictionHistory;
