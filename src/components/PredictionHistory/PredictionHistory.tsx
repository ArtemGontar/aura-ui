import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styles from "./PredictionHistory.module.css";
import { getPredictions } from "../../services/predictionService";
import { Prediction, HoroscopeData } from "../../types/prediction";
import { Pagination } from "@telegram-apps/telegram-ui";
import useTelegramHaptics from "../../hooks/useTelegramHaptic";
import HoroscopeResult from "../../components/Cards/HoroscopeResult/HoroscopeResult";
import { Drawer } from "vaul";

const PredictionHistory: React.FC = () => {
  const { t } = useTranslation();
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [page, setPage] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const haptics = useTelegramHaptics();
  const [selectedPrediction, setSelectedPrediction] = useState<Prediction | null>(null);

  useEffect(() => {
    const fetchPredictions = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { data, total } = await getPredictions(page, 5);
        setPredictions(data);
        setTotalItems(total);
      } catch (err) {
        setError(err.message || t('profile.history.error'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchPredictions();
  }, [page]);

  const renderPredictionComponent = () => {
    if (!selectedPrediction) return null;

    switch (selectedPrediction.type) {
      case "DailyHoroscope":
        const horoscope: HoroscopeData = JSON.parse(selectedPrediction.content);
        return <HoroscopeResult horoscope={horoscope} />;
      default:
        return <div>{t('profile.history.unknownPredictionType')}</div>;
    }
  };

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
    <>
      <section className={styles.history} aria-labelledby="history-title">
        <h3 id="history-title">{t('profile.history.title')}</h3>
        <div className={styles.predictionList}>
          {predictions.map((prediction, index) => (
            <Drawer.Root key={index}>
              <Drawer.Trigger asChild>
                <div 
                  className={styles.predictionItem} 
                  onClick={() => setSelectedPrediction(prediction)}
                >
                  <div className={styles.predictionHeader}>
                    <div className={styles.predictionType}>{prediction.type}</div>
                  </div>
                  <p className={styles.predictionContent}>
                    {prediction.content.length > 100 ? `${prediction.content.substring(0, 100)}...` : prediction.content}
                  </p>
                  <div className={styles.predictionDate}>{prediction.createdAt}</div>
                </div>
              </Drawer.Trigger>
              <Drawer.Portal container={document.getElementById('telegram-root')!}>
                <Drawer.Overlay className="fixed inset-0 bg-black/40" />
                <Drawer.Content className={`${styles.drawerContent} fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4`}>
                  <Drawer.Handle />
                  {renderPredictionComponent()}
                </Drawer.Content>
              </Drawer.Portal>
            </Drawer.Root>
          ))}
        </div>
        <div className={styles.pagination}>
          <Pagination 
            page={page}
            onChange={(_event, newPage) => {
              setPage(newPage - 1);
              haptics.selectionChanged();
            }}
            count={Math.ceil(totalItems / 5)}
            hideNextButton={totalItems <= 5 || page >= Math.ceil(totalItems / 5) - 1}
            hidePrevButton={page === 0}
          />
        </div>
      </section>
    </>
  );
};

export default PredictionHistory;
