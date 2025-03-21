import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styles from "./PredictionHistory.module.css";
import { getPredictions } from "../../services/predictionService";
import { Prediction } from "../../types/prediction";
import { Pagination } from "@telegram-apps/telegram-ui";

const PredictionHistory: React.FC = () => {
  const { t } = useTranslation();
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const fetchPredictions = async () => {
      setIsLoading(true);
      try {
        const { data, total } = await getPredictions(page, 5);
        console.log("data", data);
        console.log("total", total);
        setPredictions(data);
        setTotalItems(total);
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
      <div className={styles.predictionList}>
        {predictions.map((prediction, index) => (
          <div key={index} className={styles.predictionItem}>
            <div className={styles.predictionHeader}>
              <div className={styles.predictionType}>{prediction.type}</div>
            </div>
            <p className={styles.predictionContent}>
              {prediction.content.length > 100 ? `${prediction.content.substring(0, 100)}...` : prediction.content}
            </p>
            <div className={styles.predictionDate}>{prediction.createdAt}</div>
          </div>
        ))}
      </div>
      <div className={styles.pagination}>
        <Pagination 
          page={page}
          onChange={(_event, newPage) => setPage(newPage - 1)}
          count={Math.ceil(totalItems / 5)}
          hideNextButton={totalItems <= 5 || page >= Math.ceil(totalItems / 5) - 1}
          hidePrevButton={page === 0}
        />
      </div>
    </section>
  );
};

export default PredictionHistory;
