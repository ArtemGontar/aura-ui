import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styles from "./Meditations.module.css";
import { getMeditations } from "../../services/meditationService";
import { Meditation } from "../../types/meditation";
import { API_CONFIG } from "../../config/api";
import { PlayArrow, Pause } from "@mui/icons-material";

const backgrounds = [
  "var(--gradient-one)", "var(--gradient-two)", "var(--gradient-three)", "var(--gradient-four)", "var(--gradient-five)"
];

const Meditations: React.FC = () => {
  const { t } = useTranslation();
  const [meditations, setMeditations] = useState<Meditation[]>([]);
  const [currentMeditation, setCurrentMeditation] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playingId, setPlayingId] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const fetchMeditations = async () => {
      try {
        const data = await getMeditations();
        setMeditations(data);
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
        {meditations.map((meditation, index) => (
          <div 
            key={meditation.id} 
            className={styles.card} 
            onClick={() => playMeditation(meditation.audioUrl, meditation.id)} 
            style={{ background: backgrounds[index % backgrounds.length] }}
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
      {currentMeditation && (
        <div className={styles.player}>
          <audio ref={audioRef} controls />
        </div>
      )}
    </div>
  );
};

export default Meditations;
