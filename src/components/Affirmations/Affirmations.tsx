import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styles from "./Affirmations.module.css";
import { getAffirmations } from "../../services/affirmationService";
import { Affirmation } from "../../types/Affirmation";
import { API_CONFIG } from "../../config/api";
import { PlayArrow, Pause } from "@mui/icons-material";

const backgrounds = [
  "var(--gradient-one)", "var(--gradient-two)", "var(--gradient-three)", "var(--gradient-four)", "var(--gradient-five)"
];

const Affirmations: React.FC = () => {
  const { t } = useTranslation();
  const [affirmations, setAffirmations] = useState<Affirmation[]>([]);
  const [currentAffirmation, setCurrentAffirmation] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playingId, setPlayingId] = useState<number | null>(null);
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

  const playAffirmation = (audioUrl: string, id: number) => {
    console.log("Playing affirmation", API_CONFIG.BASE_URL + '/' + audioUrl);
    setCurrentAffirmation(API_CONFIG.BASE_URL + '/' + audioUrl);
    setPlayingId(id);
    togglePlayPause(id);
    setIsPlaying(true);
  };

  const togglePlayPause = (id: number) => {
    if (audioRef.current) {
      if (isPlaying && playingId === id) {
        audioRef.current.pause();
        setPlayingId(null);
      } else {
        audioRef.current.play();
        setPlayingId(id);
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (audioRef.current && currentAffirmation) {
      audioRef.current.src = currentAffirmation;
      audioRef.current.play();
      setIsPlaying(true);
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
        {affirmations.map((affirmation, index) => (
          <div 
            key={affirmation.id} 
            className={styles.card} 
            onClick={() => playAffirmation(affirmation.audioUrl, affirmation.id)} 
            style={{ background: backgrounds[index % backgrounds.length] }}
          >
            <h4 className={styles.cardTitle}>{affirmation.text}</h4>
            <button 
              className={styles.playButton}
            >
              {isPlaying && playingId === affirmation.id ? <Pause /> : <PlayArrow />}
            </button>
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
