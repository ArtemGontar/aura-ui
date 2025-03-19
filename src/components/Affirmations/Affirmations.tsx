import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styles from "./Affirmations.module.css";
import { getAffirmations } from "../../services/affirmationService";
import { Affirmation } from "../../types/Affirmation";
import { API_CONFIG } from "../../config/api";

const Affirmations: React.FC = () => {
  const { t } = useTranslation();
  const [affirmations, setAffirmations] = useState<Affirmation[]>([]);
  const [currentAffirmation, setCurrentAffirmation] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const fetchAffirmations = async () => {
      try {
        const data = await getAffirmations();
        setAffirmations(data);
      } catch (error) {
        console.error("Failed to fetch affirmations", error);
      }
    };

    fetchAffirmations();
  }, []);

  const playAffirmation = (audioUrl: string) => {
    console.log("Playing affirmation", API_CONFIG.BASE_URL + '/' + audioUrl);
    setCurrentAffirmation(API_CONFIG.BASE_URL + '/' + audioUrl);
  };

  useEffect(() => {
    if (audioRef.current && currentAffirmation) {
      audioRef.current.src = currentAffirmation;
      audioRef.current.play();
    }
  }, [currentAffirmation]);

  return (
    <div className={styles.affirmations}>
      <div className={styles.banner}>
        <span className={styles.emoji}>✨</span>
        <h2 className={styles.bannerText}>
          {t('affirmations.banner.title')}
        </h2>
        <p className={styles.subText}>
          {t('affirmations.banner.subtitle')}
        </p>
      </div>
      <div className={styles.cards}>
        {affirmations.map(affirmation => (
          <div key={affirmation.id} className={styles.card} onClick={() => playAffirmation(affirmation.audioUrl)}>
            <div className={styles.cardTitle}>{affirmation.text}</div>
          </div>
        ))}
      </div>
      {currentAffirmation && (
        <div className={styles.player}>
          <audio ref={audioRef} controls />
        </div>
      )}
    </div>
  );
};

export default Affirmations;
