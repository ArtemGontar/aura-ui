import React, { useState, useEffect } from "react"; // Removed useRef
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styles from "./Meditations.module.css";
import appStyles from "../../App.module.css"; // Import App styles
import { getMeditations } from "../../services/meditationService";
import { Meditation, MeditationCategory, MeditationStatus } from "../../types/meditation";
import useTelegramHaptics from "../../hooks/useTelegramHaptic";
import MeditationCard from "./MeditationCard";
import { Pagination } from "@telegram-apps/telegram-ui";
import { downloadAudio } from "../../services/audioService"; // Removed getAudioSasUrl
import LoadingDisplay from "../LoadingDisplay/LoadingDisplay";
import { useMeditationPlayer } from "../../hooks/useMeditationPlayer"; // Added import

type FilterCategory = "All" | MeditationCategory;

// Define categories as a separate entity
const MEDITATION_CATEGORIES: FilterCategory[] = ["All", "Neural", "Humanic", "Ambient"];

const Meditations: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { impactOccurred, selectionChanged } = useTelegramHaptics();
  const [generalMeditations, setGeneralMeditations] = useState<Meditation[]>([]);
  const [personalMeditations, setPersonalMeditations] = useState<Meditation[]>([]);
  // playingId, audioRef, audioSasUrls are now managed by useMeditationPlayer
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("All");
  
  const { 
    playingId, 
    audioRef, 
    togglePlayPause: playerTogglePlayPause, 
    moveAudio: playerMoveAudio,
    isLoadingSasUrl 
  } = useMeditationPlayer();

  // Pagination state
  const [generalPage, setGeneralPage] = useState<number>(1);
  const [personalPage, setPersonalPage] = useState<number>(1);
  const [generalTotal, setGeneralTotal] = useState<number>(0);
  const [personalTotal, setPersonalTotal] = useState<number>(0);
  
  // Add loading states
  const [isGeneralLoading, setIsGeneralLoading] = useState<boolean>(false);
  const [isPersonalLoading, setIsPersonalLoading] = useState<boolean>(false);
  const limit = 5; // Items per page

  useEffect(() => {
    const fetchGeneralMeditations = async () => {
      try {
        setIsGeneralLoading(true);
        const generalData = await getMeditations(
          "general",
          generalPage,
          limit,
          activeCategory === "All" ? undefined : activeCategory
        );
        setGeneralMeditations(generalData.data);
        setGeneralTotal(generalData.total);
      } catch (error) {
        console.error("Failed to fetch general meditations", error);
      } finally {
        setIsGeneralLoading(false);
      }
    };

    fetchGeneralMeditations();
  }, [activeCategory, generalPage]);

  useEffect(() => {
    const fetchPersonalMeditations = async () => {
      try {
        setIsPersonalLoading(true);
        const personalData = await getMeditations(
          "personal",
          personalPage,
          limit,
          activeCategory === "All" ? undefined : activeCategory
        );
        setPersonalMeditations(personalData.data);
        setPersonalTotal(personalData.total);
      } catch (error) {
        console.error("Failed to fetch personal meditations", error);
      } finally {
        setIsPersonalLoading(false);
      }
    };

    fetchPersonalMeditations();
  }, [activeCategory, personalPage]);

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

  // togglePlayPause and moveAudio are now provided by useMeditationPlayer
  // Renamed to playerTogglePlayPause and playerMoveAudio to avoid naming conflicts if any local handlers were needed.

  const handlePlayPause = (meditation: Meditation) => {
    if (meditation.readinessStatus === "InProgress" || meditation.readinessStatus === "Failed") return;
    // Ensure meditation.id is a string if your hook expects string IDs
    playerTogglePlayPause(String(meditation.id), meditation.audioUrl);
  };

  const handleMoveAudio = (meditationId: number, direction: "forward" | "backward") => {
    const amount = direction === "forward" ? 10 : -10;
    // Ensure meditationId is a string if your hook expects string IDs
    playerMoveAudio(String(meditationId), amount);
  };

  const handleCreatePersonalMeditation = () => {
    impactOccurred("light");
    navigate("/create-personal-meditation");
  };

  const handleDownload = async (audioUrl: string, name: string, status: MeditationStatus) => {
    // Don't allow downloading inprogress or failed meditations
    if (status === "InProgress" || status === "Failed") return;
    
    try {
      impactOccurred("light");
      await downloadAudio(audioUrl, name);
      // Optional: Add some UI feedback here (toast, notification, etc.)
    } catch (error) {
      console.error("Error downloading audio:", error);
    }
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

  // Helper function to render meditation card with status handling
  const renderMeditationCard = (meditation: Meditation, isPersonal: boolean = false) => {
    const isInProgress = meditation.readinessStatus === "InProgress";
    const isFailed = meditation.readinessStatus === "Failed";
    
    return (
      <MeditationCard
        key={meditation.id}
        meditation={meditation}
        isPlaying={playingId === String(meditation.id)} // Compare with string ID
        onPlayPause={() => handlePlayPause(meditation)}
        onMoveAudio={(direction) => handleMoveAudio(meditation.id, direction)} // Pass direction
        onDownload={() => handleDownload(meditation.audioUrl, meditation.text, meditation.readinessStatus)}
        disabled={(isInProgress || isFailed) || (isLoadingSasUrl && playingId === String(meditation.id))} // Disable if this card's SAS is loading
        statusMessage={
          isInProgress ? t("meditations.status.inprogress") :
          isFailed ? t("meditations.status.failed") : 
          undefined
        }
        showLoadingAnimation={(isPersonal && isInProgress) || (isLoadingSasUrl && playingId === String(meditation.id))} // Show loader if this card's SAS is loading
      />
    );
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
            {t(`meditations.categories.${category.toLowerCase()}`)}
          </button>
        ))}
      </div>
      
      <div className={styles.cards}>
        <h3>{t("meditations.general.title")}</h3>
        {isGeneralLoading ? (
          <div className={styles.loadingWrapper}>
            <LoadingDisplay 
              message={t("meditations.loading")} 
              wrapperStyle={{ 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center', 
                alignItems: 'center', 
                width: '100%', 
                margin: '2rem 0'
              }}
            />
          </div>
        ) : generalMeditations.length > 0 ? (
          <>
            {generalMeditations.map((meditation) => renderMeditationCard(meditation))}
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
        {isPersonalLoading ? (
          <div className={styles.loadingWrapper}>
            <LoadingDisplay 
              message={t("meditations.loading")} 
              wrapperStyle={{ 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center', 
                alignItems: 'center', 
                width: '100%', 
                margin: '2rem 0'
              }}
            />
          </div>
        ) : (
          <>
            {/* Display any existing personal meditations */}
            {personalMeditations.length > 0 && (
              <>
                {personalMeditations.map((meditation) => renderMeditationCard(meditation, true))}
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
            )}
            
            {/* Always show the create card */}
            <div
              className={`${styles.card} ${styles.createCard}`}
              onClick={handleCreatePersonalMeditation}
            >
              <div className={styles.betaLabel}>Beta</div> {/* Moved betaLabel here */}
              <h4 className={styles.createText}>
                {t("meditations.personal.create")}
              </h4>
              <div className={styles.createIcon}>+</div>
            </div>
          </>
        )}
      </div>
      <div className={styles.player}>
        <audio ref={audioRef} controls style={{ display: "none" }} /> {/* Assign audioRef from hook */}
      </div>
    </div>
  );
};

export default Meditations;
