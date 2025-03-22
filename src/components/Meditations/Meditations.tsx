import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styles from "./Meditations.module.css";
import { getMeditations } from "../../services/meditationService";
import { Meditation } from "../../types/meditation";
import { API_CONFIG } from "../../config/api";
import { PlayArrow, Pause } from "@mui/icons-material";
import useTelegramHaptics from "../../hooks/useTelegramHaptic";

const Meditations: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { impactOccurred } = useTelegramHaptics();
  const [generalMeditations, setGeneralMeditations] = useState<Meditation[]>([]);
  const [personalMeditations, setPersonalMeditations] = useState<Meditation[]>([]);
  const [currentMeditation, setCurrentMeditation] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playingId, setPlayingId] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const fetchMeditations = async () => {
      try {
        const [generalData, personalData] = await Promise.all([
          getMeditations("general"),
          getMeditations("personal")
        ]);
        setGeneralMeditations(generalData);
        setPersonalMeditations(personalData);
      } catch (error) {
        console.error("Failed to fetch meditations", error);
      }
    };

    fetchMeditations();
  }, []);

  const playMeditation = (audioUrl: string, id: number) => {
    console.log("Playing meditation", API_CONFIG.BASE_URL + '/' + audioUrl);
    setCurrentMeditation(API_CONFIG.BASE_URL + '/' + audioUrl);
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
    if (audioRef.current && currentMeditation) {
      audioRef.current.src = currentMeditation;
      audioRef.current.play();
      setIsPlaying(true);
    }
  }, [currentMeditation]);

  const handleCreatePersonalMeditation = () => {
    impactOccurred("light");
    navigate("/create-personal-meditation");
  };

  return (
    <div className={styles.meditations}>
      <div className={styles.banner}>
        <span className={styles.emoji}>✨</span>
        <h2 className={styles.bannerText}>
          {t('meditations.banner.title')}
        </h2>
        <p className={styles.subText}>
          {t('meditations.banner.subtitle')}
        </p>
      </div>
      <div className={styles.cards}>
        <h3>{t('meditations.general.title')}</h3>
        {generalMeditations.map((meditation, index) => (
          <div 
            key={meditation.id} 
            className={`${styles.card} ${styles.generalCard}`} 
            onClick={() => playMeditation(meditation.audioUrl, meditation.id)}
          >
            <h4 className={styles.cardTitle}>{meditation.text}</h4>
            <button 
              className={styles.playButton}
            >
              {isPlaying && playingId === meditation.id ? <Pause /> : <PlayArrow />}
            </button>
          </div>
        ))}
      </div>
      <div className={styles.cards}>
        <h3>{t('meditations.personal.title')}</h3>
        {personalMeditations.length > 0 ? (
          personalMeditations.map((meditation, index) => (
            <div 
              key={meditation.id} 
              className={`${styles.card} ${styles.personalCard}`} 
              onClick={() => playMeditation(meditation.audioUrl, meditation.id)}
            >
              <h4 className={styles.cardTitle}>{meditation.text}</h4>
              <button 
                className={styles.playButton}
              >
                {isPlaying && playingId === meditation.id ? <Pause /> : <PlayArrow />}
              </button>
            </div>
          ))
        ) : (
          <div 
            className={`${styles.card} ${styles.createCard}`} 
            onClick={handleCreatePersonalMeditation} // Update this line
          >
            <h4 className={styles.createText}>{t('meditations.personal.create')}</h4>
            <div className={styles.createIcon}>+</div>
          </div>
        )}
      </div>
      {currentMeditation && (
        <div className={styles.player}>
          <audio ref={audioRef} controls />
        </div>
      )}
    </div>
  );
};

export default Meditations;
