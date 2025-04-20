import React from "react";
import { Pause, Play, Rewind, FastForward, Download, Loader } from "lucide-react";
import { Meditation } from "../../types/meditation";
import styles from "./MeditationCard.module.css";
import LoadingDisplay from "../LoadingDisplay/LoadingDisplay";

interface MeditationCardProps {
  meditation: Meditation;
  isPlaying: boolean;
  onPlayPause: () => void;
  onMoveAudio: (direction: "forward" | "backward") => void;
  onDownload?: () => void;
  disabled?: boolean;
  statusMessage?: string;
  showLoadingAnimation?: boolean;
}

const MeditationCard: React.FC<MeditationCardProps> = ({
  meditation,
  isPlaying,
  onPlayPause,
  onMoveAudio,
  onDownload,
  disabled = false,
  statusMessage,
  showLoadingAnimation = false,
}) => (
  <div 
    className={`${styles.card} ${styles.generalCard} ${disabled ? styles.disabledCard : ''}`} 
    style={{ position: 'relative' }}
  >
    <h4 className={styles.cardTitle}>{meditation.text}</h4>
    
    {statusMessage && (
      <div className={styles.statusMessage}>
        {showLoadingAnimation && (
          <LoadingDisplay size="s" message={statusMessage} />
        )}
      </div>
    )}
    
    <div className={styles.controls}>
      <button
        className={styles.controlButton}
        onClick={(e) => {
          e.stopPropagation();
          onMoveAudio("backward");
        }}
        style={{ display: isPlaying ? "inline-block" : "none" }}
        disabled={disabled}
      >
        <Rewind size={24} className={styles.controlIcon} />
      </button>
      <button
        className={`${styles.controlButton} ${styles.playButton}`}
        onClick={onPlayPause}
        disabled={disabled}
      >
        {isPlaying ? (
          <Pause size={24} className={styles.activeIcon} />
        ) : (
          <Play size={24} className={styles.controlIcon} />
        )}
      </button>
      <button
        className={styles.controlButton}
        onClick={(e) => {
          e.stopPropagation();
          onMoveAudio("forward");
        }}
        style={{ display: isPlaying ? "inline-block" : "none" }}
        disabled={disabled}
      >
        <FastForward size={24} className={styles.controlIcon} />
      </button>
    </div>
    {onDownload && (
      <button
        className={styles.downloadButton}
        onClick={(e) => {
          e.stopPropagation();
          onDownload();
        }}
        aria-label="Download meditation"
        disabled={disabled}
      >
        <Download size={18} className={styles.downloadIcon} />
      </button>
    )}
    <div className={styles.categoryLabelContainer}>
      <span className={styles.categoryLabel}>{meditation.category}</span>
    </div>
  </div>
);

export default MeditationCard;
