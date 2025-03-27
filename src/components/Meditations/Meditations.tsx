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
  const [playingId, setPlayingId] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const fetchMeditations = async () => {
      try {
        const [generalData, personalData] = await Promise.all([
          getMeditations("general"),
          getMeditations("personal"),
        ]);
        setGeneralMeditations(generalData);
        setPersonalMeditations(personalData);
      } catch (error) {
        console.error("Failed to fetch meditations", error);
      }
    };

    fetchMeditations();
  }, []);

  const togglePlayPause = (audioUrl: string, id: number) => {
    if (!audioRef.current) return;

    if (playingId === id) {
      audioRef.current.pause();
      setPlayingId(null);
    } else {
      audioRef.current.src = API_CONFIG.BASE_URL + "/" + audioUrl;
      audioRef.current
        .play()
        .then(() => setPlayingId(id))
        .catch((error) => console.error("Error playing audio:", error));
    }
  };

  const moveAudio = (direction: "forward" | "backward") => {
    if (audioRef.current) {
      const offset = direction === "forward" ? 10 : -10;
      audioRef.current.currentTime = Math.max(
        0,
        Math.min(audioRef.current.duration, audioRef.current.currentTime + offset)
      );
    }
  };

  const MeditationCard = ({
    meditation,
    isPlaying,
    onPlayPause,
  }: {
    meditation: Meditation;
    isPlaying: boolean;
    onPlayPause: () => void;
  }) => (
    <div
      className={`${styles.card} ${styles.generalCard}`}
      onClick={onPlayPause}
    >
      <h4 className={styles.cardTitle}>{meditation.text}</h4>
      <div className={styles.controls}>
        <button
          className={styles.controlButton}
          onClick={(e) => {
            e.stopPropagation();
            moveAudio("backward");
          }}
          style={{ display: isPlaying ? "inline-block" : "none" }}
        >
          <img src={backwardIcon} alt="Backward" />
        </button>
        <button
          className={styles.playButton}
          onClick={(e) => {
            e.stopPropagation();
            onPlayPause();
          }}
        >
          <img src={isPlaying ? pauseIcon : playIcon} alt="Play/Pause" />
        </button>
        <button
          className={styles.controlButton}
          onClick={(e) => {
            e.stopPropagation();
            moveAudio("forward");
          }}
          style={{ display: isPlaying ? "inline-block" : "none" }}
        >
          <img src={forwardIcon} alt="Forward" />
        </button>
      </div>
    </div>
  );

  const handleCreatePersonalMeditation = () => {
    impactOccurred("light");
    navigate("/create-personal-meditation");
  };

  return (
    <div className={styles.meditations}>
      <div className={styles.banner}>
        <span className={styles.emoji}>✨</span>
        <h2 className={styles.bannerText}>{t("meditations.banner.title")}</h2>
        <p className={styles.subText}>{t("meditations.banner.subtitle")}</p>
      </div>
      <div className={styles.cards}>
        <h3>{t("meditations.general.title")}</h3>
        {generalMeditations.map((meditation) => (
          <MeditationCard
            key={meditation.id}
            meditation={meditation}
            isPlaying={playingId === meditation.id}
            onPlayPause={() => togglePlayPause(meditation.audioUrl, meditation.id)}
          />
        ))}
      </div>
      <div className={styles.cards}>
        <h3>{t("meditations.personal.title")}</h3>
        {personalMeditations.length > 0 ? (
          personalMeditations.map((meditation) => (
            <MeditationCard
              key={meditation.id}
              meditation={meditation}
              isPlaying={playingId === meditation.id}
              onPlayPause={() =>
                togglePlayPause(meditation.audioUrl, meditation.id)
              }
            />
          ))
        ) : (
          <div
            className={`${styles.card} ${styles.createCard}`}
            onClick={handleCreatePersonalMeditation}
          >
            <h4 className={styles.createText}>
              {t("meditations.personal.create")}
            </h4>
            <div className={styles.createIcon}>+</div>
          </div>
        )}
      </div>
      <div className={styles.player}>
        <audio ref={audioRef} controls style={{ display: "none" }} />
      </div>
    </div>
  );
};

export default Meditations;
