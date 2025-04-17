import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styles from "./Meditations.module.css";
import appStyles from "../../App.module.css"; // Import App styles
import { getMeditations } from "../../services/meditationService";
import { Meditation, MeditationCategory } from "../../types/meditation";
import { API_CONFIG } from "../../config/api";
import useTelegramHaptics from "../../hooks/useTelegramHaptic";
import MeditationCard from "./MeditationCard";

type FilterCategory = "All" | MeditationCategory;

// Define categories as a separate entity
const MEDITATION_CATEGORIES: FilterCategory[] = ["All", "Neural", "Humanic", "Ambient"];

const Meditations: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { impactOccurred } = useTelegramHaptics();
  const [generalMeditations, setGeneralMeditations] = useState<Meditation[]>([]);
  const [personalMeditations, setPersonalMeditations] = useState<Meditation[]>([]);
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("All");
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

  // Filter meditations by category
  const filteredGeneralMeditations = generalMeditations.filter(
    (meditation) => activeCategory === "All" || meditation.category === activeCategory
  );
  
  const filteredPersonalMeditations = personalMeditations.filter(
    (meditation) => activeCategory === "All" || meditation.category === activeCategory
  );

  // Change category handler
  const handleCategoryChange = (category: FilterCategory) => {
    impactOccurred("light");
    setActiveCategory(category);
  };

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
      
      <div className={styles.categoryFilters}>
        {MEDITATION_CATEGORIES.map((category) => (
          <button 
            key={category}
            className={`${styles.telegramButton} ${activeCategory === category ? styles.activeButton : ""} ${appStyles.autoWidthButton}`}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
      
      <div className={styles.cards}>
        <h3>{t("meditations.general.title")}</h3>
        {filteredGeneralMeditations.map((meditation) => (
          <MeditationCard
            key={meditation.id}
            meditation={meditation}
            isPlaying={playingId === meditation.id}
            onPlayPause={() => togglePlayPause(meditation.audioUrl, meditation.id)}
            onMoveAudio={moveAudio}
          />
        ))}
      </div>
      <div className={styles.cards}>
        <h3>{t("meditations.personal.title")}</h3>
        {filteredPersonalMeditations.length > 0 ? (
          filteredPersonalMeditations.map((meditation) => (
            <MeditationCard
              key={meditation.id}
              meditation={meditation}
              isPlaying={playingId === meditation.id}
              onPlayPause={() =>
                togglePlayPause(meditation.audioUrl, meditation.id)
              }
              onMoveAudio={moveAudio}
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
