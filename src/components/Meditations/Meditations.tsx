import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styles from "./Meditations.module.css";
import { getMeditations } from "../../services/meditationService";
import { Meditation } from "../../types/meditation";
import { API_CONFIG } from "../../config/api";
import useTelegramHaptics from "../../hooks/useTelegramHaptic";
import playIcon from "../../assets/player/play.png";
import pauseIcon from "../../assets/player/pause.png";
import forwardIcon from "../../assets/player/forward.png";
import backwardIcon from "../../assets/player/backward.png";

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
    if (!audioRef.current) return;
  
    if (isPlaying && playingId === id) {
      audioRef.current.pause();
      setPlayingId(null);
      setIsPlaying(false);
    } else {
      if (playingId !== null) {
        // Stop any currently playing audio
        audioRef.current.pause();
      }
      audioRef.current
        .play()
        .then(() => {
          setPlayingId(id);
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error("Error playing audio:", error);
          setIsPlaying(false);
        });
    }
  };
  
  const moveForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(audioRef.current.duration, audioRef.current.currentTime + 10);
    }
  };

  const moveBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10);
    }
  };
  
  useEffect(() => {
    if (audioRef.current && currentMeditation) {
      audioRef.current.src = currentMeditation;
      setIsPlaying(false);
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
            <div className={styles.controls}>
              <button 
                className={styles.controlButton} 
                onClick={(e) => { e.stopPropagation(); moveBackward(); }}
                style={{ display: isPlaying && playingId === meditation.id ? "inline-block" : "none" }}
              >
                <img src={backwardIcon} alt="Backward" />
              </button>
              <button 
                className={styles.playButton} 
                onClick={(e) => { e.stopPropagation(); togglePlayPause(meditation.id); }}
              >
                {isPlaying && playingId === meditation.id ? (
                  <img src={pauseIcon} alt="Pause" />
                ) : (
                  <img src={playIcon} alt="Play" />
                )}
              </button>
              <button 
                className={styles.controlButton} 
                onClick={(e) => { e.stopPropagation(); moveForward(); }}
                style={{ display: isPlaying && playingId === meditation.id ? "inline-block" : "none" }}
              >
                <img src={forwardIcon} alt="Forward" />
              </button>
            </div>
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
              <div className={styles.controls}>
                <button 
                  className={styles.controlButton} 
                  onClick={(e) => { e.stopPropagation(); moveBackward(); }}
                  style={{ display: isPlaying && playingId === meditation.id ? "inline-block" : "none" }}
                >
                  <img src={backwardIcon} alt="Backward" />
                </button>
                <button 
                  className={styles.playButton} 
                  onClick={(e) => { e.stopPropagation(); togglePlayPause(meditation.id); }}
                >
                  {isPlaying && playingId === meditation.id ? (
                    <img src={pauseIcon} alt="Pause" />
                  ) : (
                    <img src={playIcon} alt="Play" />
                  )}
                </button>
                <button 
                  className={styles.controlButton} 
                  onClick={(e) => { e.stopPropagation(); moveForward(); }}
                  style={{ display: isPlaying && playingId === meditation.id ? "inline-block" : "none" }}
                >
                  <img src={forwardIcon} alt="Forward" />
                </button>
              </div>
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
