import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styles from "./PredictionHistory.module.css";
import { getPredictions } from "../../services/predictionService";
import { Prediction, HoroscopeData, CompatibilityData, AffirmationData, DreamBookData, PredictionType } from "../../types/prediction";
import { Pagination } from "@telegram-apps/telegram-ui";
import useTelegramHaptics from "../../hooks/useTelegramHaptic";
import HoroscopeResult from "../../components/Cards/HoroscopeResult/HoroscopeResult";
import { Drawer } from "vaul";
import CompatibilityResult from "../Cards/Сompatibility/СompatibilityResult";
import AffirmationResult from "../Cards/Affirmation/AffirmationResult";
import DreamBookResult from "../Cards/DreamBook/DreamBookResult";
import { formatLocalizedDate, trimContent } from "../../utils/utils";

const PredictionHistory: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [predictions, setPredictions] = useState<Prediction[]>([]);

  // Pagination state
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // Loading and error states
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
      } catch (error) {
        setError(error.message || t('profile.history.error'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchPredictions();
  }, [page]);

  const renderPredictionComponent = () => {
    if (!selectedPrediction) return null;

    switch (selectedPrediction.type) {
      case PredictionType.DailyHoroscope:
        const horoscope: HoroscopeData = selectedPrediction.content as HoroscopeData;
        return <HoroscopeResult horoscope={horoscope} />;
      case PredictionType.Compatibility:
        const compatibilityData = selectedPrediction.content as CompatibilityData;
        return <CompatibilityResult compatibilityResult={compatibilityData} />;
      case PredictionType.Affirmation:
        const affirmationData = selectedPrediction.content as AffirmationData;
        return <AffirmationResult affirmation={affirmationData} />;
      case PredictionType.DreamInterpretation:
        const dreamBookData = selectedPrediction.content as DreamBookData;
        return <DreamBookResult interpretation={dreamBookData.interpretation} />;
      default:
        return <div>{t('profile.history.unknownPredictionType')}</div>;
    }
  };

  const renderPredictionPreview = (prediction: Prediction) => {
    if (!prediction) return null;

    switch (prediction.type) {
      case PredictionType.DailyHoroscope:
        const generalGuidance: string = (prediction.content as HoroscopeData).generalGuidance;
        return trimContent(generalGuidance);
      case PredictionType.Compatibility:
        console.log("prediction", prediction.content);
        const compatibilityResult: string = (prediction.content as CompatibilityData).strengths.join(", ");
        return trimContent(compatibilityResult);
      case PredictionType.Affirmation:
        const affirmationResult: string = (prediction.content as AffirmationData).text;
        return trimContent(affirmationResult);
      case PredictionType.DreamInterpretation:
        const dreamBookResult: string = (prediction.content as DreamBookData).interpretation;
        return trimContent(dreamBookResult);
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
                  <div className={styles.predictionDate}>
                    {formatLocalizedDate(prediction.createdAt, i18n.language)}
                  </div>
                </div>
              </Drawer.Trigger>
              <Drawer.Portal container={document.getElementById('telegram-root')!}>
              <Drawer.Overlay className="fixed inset-0 bg-black/40" />
              <Drawer.Content className={`${styles.drawerContent} flex flex-col rounded-t-[10px] mt-24 h-[80%] lg:h-[320px] fixed bottom-0 left-0 right-0`}>
                <Drawer.Handle />
                <div className="p-4 rounded-t-[10px] flex-1 overflow-y-auto">
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
