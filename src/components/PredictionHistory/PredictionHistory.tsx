import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styles from "./PredictionHistory.module.css";
import { getPredictions } from "../../services/predictionService";
import { Prediction, HoroscopeData, CompatibilityData } from "../../types/prediction";
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
        const horoscope: HoroscopeData = selectedPrediction.content as HoroscopeData;
        return <HoroscopeResult horoscope={horoscope} />;
      default:
        return <div>{t('profile.history.unknownPredictionType')}</div>;
    }
  };

  const renderPredictionPreview = (prediction: Prediction) => {
    if (!prediction) return null;

    switch (prediction.type) {
      case "DailyHoroscope":
        console.log("prediction", prediction.type);
        console.log(prediction.content);

        const generalGuidance: string = (prediction.content as HoroscopeData).generalGuidance;
        return generalGuidance.length > 100
          ? `${generalGuidance.substring(0, 100)}...`
          : generalGuidance;
      default:
        return;
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
                    {renderPredictionPreview(prediction)}
                  </p>
                  <div className={styles.predictionDate}>{prediction.createdAt}</div>
                </div>
              </Drawer.Trigger>
              <Drawer.Portal container={document.getElementById('telegram-root')!}>
              <Drawer.Overlay className="fixed inset-0 bg-black/40" />
              <Drawer.Content className="bg-gray-100 flex flex-col rounded-t-[10px] mt-24 h-[80%] lg:h-[320px] fixed bottom-0 left-0 right-0 outline-none">
                <Drawer.Handle />
                <div className="p-4 bg-white rounded-t-[10px] flex-1 overflow-y-auto">
                  {renderPredictionComponent()}
                </div>
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
