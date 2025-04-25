import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import commonStyles from "../Cards.module.css";
import styles from './DreamBook.module.css';
import { getDreamInterpretation } from '../../../services/predictionService';
import useTelegramHaptics from '../../../hooks/useTelegramHaptic';
import LoadingDisplay from '../../LoadingDisplay/LoadingDisplay';
import DreamBookResult from './DreamBookResult';
import Banner from '../../Banner/Banner';
import { CloudMoon } from 'lucide-react';
import FeatureButton from '../../FeatureButton/FeatureButton';
import { useQuotas } from '../../../hooks/useQuotas';
import { PredictionType } from '../../../types/prediction';
import tariffs from "../../../constants/tariffs";

const DreamBook: React.FC = () => {
  const { t } = useTranslation();
  const [dreamText, setDreamText] = useState('');
  const [interpretation, setInterpretation] = useState<string | null>(null);
  const { remainingUses, useFeature } = useQuotas(PredictionType.DreamInterpretation);
  const [loading, setLoading] = useState(false);
  const haptics = useTelegramHaptics();

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDreamText(e.target.value);
  };

  const requestInterpretDream = async () => {
    setLoading(true);
    try {
      const response = await getDreamInterpretation(dreamText);
      setInterpretation(response.interpretation);
      useFeature();
      haptics.notificationOccurred("success");
    } catch (err) {
      haptics.notificationOccurred("error");
    } finally {
      setLoading(false);
    }
  };
  
  const requestPaidInterpretDream = async () => {
    console.log("Paid action triggered");
  }

  return (
    <div className={commonStyles.card}>
      <Banner 
        headerText={t('dreamBook.banner.title')} 
        subText={t('dreamBook.banner.subtitle')} 
        bgColor={styles.bannerBackground}
        icon={<CloudMoon className="w-8 h-8 mb-4 text-white" fill="white" />} 
      />
      <div className={styles.dreamBook}>
        <h4>{t('dreamBook.title')}</h4>
        <textarea
          className={styles.textarea}
          value={dreamText}
          onChange={handleInputChange}
          placeholder={t('dreamBook.placeholder')}
        />
        <FeatureButton
          loading={loading}
          remainingUses={remainingUses}
          onFreeAction={requestInterpretDream}
          onPaidAction={requestPaidInterpretDream}
          freeActionTextKey="dreamBook.buttons.interpret"
          paidActionTextKey="dreamBook.buttons.interpretPaid"
          starsAmount={tariffs.dreamBookStarsAmount} // Use config value
        />
        {loading && (
          <LoadingDisplay 
            message={t('dreamBook.interpretingDream')}
            size="s"
            wrapperStyle={{ 
              display: 'flex', 
              flexDirection: 'column',
              justifyContent: 'center', 
              alignItems: 'center', 
              width: '100%', 
              margin: '2rem 0'
            }}
            />
        )}
        {interpretation && <DreamBookResult interpretation={interpretation} />}
      </div>
    </div>
  );
};

export default DreamBook;
