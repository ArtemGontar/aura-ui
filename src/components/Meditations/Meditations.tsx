import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styles from "./Meditations.module.css";
import appStyles from "../../App.module.css"; // Import App styles
import { getMeditations } from "../../services/meditationService";
import { Meditation, MeditationCategory } from "../../types/meditation";
import useTelegramHaptics from "../../hooks/useTelegramHaptic";
import MeditationCard from "./MeditationCard";
import { Pagination } from "@telegram-apps/telegram-ui";
import { getAudioSasUrl } from "../../services/audioService";

type FilterCategory = "All" | MeditationCategory;

// Define categories as a separate entity
const MEDITATION_CATEGORIES: FilterCategory[] = ["All", "Neural", "Humanic", "Ambient"];

const Meditations: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { impactOccurred, selectionChanged } = useTelegramHaptics();
  const [generalMeditations, setGeneralMeditations] = useState<Meditation[]>([]);
  const [personalMeditations, setPersonalMeditations] = useState<Meditation[]>([]);
  const [playingId, setPlayingId] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("All");
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // Pagination state
  const [generalPage, setGeneralPage] = useState<number>(1);
  const [personalPage, setPersonalPage] = useState<number>(1);
  const [generalTotal, setGeneralTotal] = useState<number>(0);
  const [personalTotal, setPersonalTotal] = useState<number>(0);
  const limit = 5; // Items per page

  useEffect(() => {
    const fetchMeditations = async () => {
      try {
        const [generalData, personalData] = await Promise.all([
          getMeditations("general", generalPage, limit, activeCategory === "All" ? undefined : activeCategory),
          getMeditations("personal", personalPage, limit, activeCategory === "All" ? undefined : activeCategory),
        ]);
        
        setGeneralMeditations(generalData.data);
        setGeneralTotal(generalData.total);
        
        setPersonalMeditations(personalData.data);
        setPersonalTotal(personalData.total);
      } catch (error) {
        console.error("Failed to fetch meditations", error);
      }
    };

    fetchMeditations();
  }, [activeCategory, generalPage, personalPage]);

  // Change category handler
  const handleCategoryChange = (category: FilterCategory) => {
    impactOccurred("light");
    setActiveCategory(category);
    // Reset pagination when changing category
    setGeneralPage(1);
    setPersonalPage(1);
  };

  // Calculate total pages
  const calculateTotalPages = (totalItems: number) => {
    return Math.max(1, Math.ceil(totalItems / limit));
  };

  const togglePlayPause = async (audioUrl: string, id: number) => {
    if (!audioRef.current) return;

    if (playingId === id) {
      audioRef.current.pause();
      setPlayingId(null);
    } else {
      try {
        // Get SAS URL for the audio
        const sasUrl = await getAudioSasUrl(audioUrl);
        
        // Play using the SAS URL
        audioRef.current.src = sasUrl;
        await audioRef.current.play();
        setPlayingId(id);
      } catch (error) {
        console.error("Error playing audio:", error);
      }
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

  // Pagination handlers
  const handleGeneralPageChange = (_event: React.ChangeEvent<unknown>, newPage: number) => {
    setGeneralPage(newPage);
    selectionChanged();
  };

  const handlePersonalPageChange = (_event: React.ChangeEvent<unknown>, newPage: number) => {
    setPersonalPage(newPage);
    selectionChanged();
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
        {generalMeditations.length > 0 ? (
          <>
            {generalMeditations.map((meditation) => (
              <MeditationCard
                key={meditation.id}
                meditation={meditation}
                isPlaying={playingId === meditation.id}
                onPlayPause={() => togglePlayPause(meditation.audioUrl, meditation.id)}
                onMoveAudio={moveAudio}
              />
            ))}
            {generalTotal > limit && (
              <div className={styles.paginationControls}>
                <Pagination 
                  page={generalPage}
                  onChange={handleGeneralPageChange}
                  count={calculateTotalPages(generalTotal)}
                  hideNextButton={generalPage >= calculateTotalPages(generalTotal)}
                  hidePrevButton={generalPage === 1}
                />
              </div>
            )}
          </>
        ) : (
          <div className={styles.noContent}>
            {t("meditations.general.notFound")}
          </div>
        )}
      </div>
      <div className={styles.cards}>
        <h3>{t("meditations.personal.title")}</h3>
        {personalMeditations.length > 0 ? (
          <>
            {personalMeditations.map((meditation) => (
              <MeditationCard
                key={meditation.id}
                meditation={meditation}
                isPlaying={playingId === meditation.id}
                onPlayPause={() => togglePlayPause(meditation.audioUrl, meditation.id)}
                onMoveAudio={moveAudio}
              />
            ))}
            {personalTotal > limit && (
              <div className={styles.paginationControls}>
                <Pagination 
                  page={personalPage}
                  onChange={handlePersonalPageChange}
                  count={calculateTotalPages(personalTotal)}
                  hideNextButton={personalPage >= calculateTotalPages(personalTotal)}
                  hidePrevButton={personalPage === 1}
                />
              </div>
            )}
          </>
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
