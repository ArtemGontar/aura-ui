import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUserData } from '../../../hooks/useUserData';
import commonStyles from "../Cards.module.css";
import styles from './DreamBook.module.css';
import { getDreamInterpretation } from '../../../services/predictionService';
import { Button } from '@telegram-apps/telegram-ui';
import useTelegramHaptics from '../../../hooks/useTelegramHaptic';
import LoadingDisplay from '../../LoadingDisplay/LoadingDisplay';

const DreamBook: React.FC = () => {
  const { t } = useTranslation();
  const { userData } = useUserData();
  const [dreamText, setDreamText] = useState('');
  const [interpretation, setInterpretation] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const haptics = useTelegramHaptics();

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDreamText(e.target.value);
  };

  const interpretDream = async () => {
    setLoading(true);
    try {
      const response = await getDreamInterpretation(dreamText);
      setInterpretation(response);
      haptics.notificationOccurred("success");
    } catch (err) {
      haptics.notificationOccurred("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={commonStyles.card}>
      <div className={styles.banner}>
        <span className={styles.emoji}>🌙</span>
        <h2 className={styles.bannerText}>
          {t('dreamBook.banner.title')}
        </h2>
        <p className={styles.subText}>
          {t('dreamBook.banner.subtitle')}
        </p>
      </div>
      <div className={styles.dreamBook}>
        {loading ? (
          <LoadingDisplay />
        ) : interpretation ? (
          <div className={styles.resultContainer}>
            <h4>{t('dreamBook.resultTitle')}</h4>
            <p>{interpretation}</p>
          </div>
        ) : (
          <>
            <h4>{t('dreamBook.title')}</h4>
            <textarea
              className={styles.textarea}
              value={dreamText}
              onChange={handleInputChange}
              placeholder={t('dreamBook.placeholder')}
            />
            <Button onClick={interpretDream} disabled={loading || !dreamText}>
              {t("dreamBook.interpretButton")}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default DreamBook;
