import React from "react";
import { Pause, Play, Rewind, FastForward, Download } from "lucide-react";
import { Meditation } from "../../types/meditation";
import styles from "./MeditationCard.module.css";

interface MeditationCardProps {
  meditation: Meditation;
  isPlaying: boolean;
  onPlayPause: () => void;
  onMoveAudio: (direction: "forward" | "backward") => void;
  onDownload?: () => void; // Added optional download handler
}

const MeditationCard: React.FC<MeditationCardProps> = ({
  meditation,
  isPlaying,
  onPlayPause,
  onMoveAudio,
  onDownload,
}) => (
  <div className={`${styles.card} ${styles.generalCard}`} style={{ position: 'relative' }}>
    <h4 className={styles.cardTitle}>{meditation.text}</h4>
    <div className={styles.controls}>
      <button
        className={styles.controlButton}
        onClick={(e) => {
          e.stopPropagation();
          onMoveAudio("backward");
        }}
        style={{ display: isPlaying ? "inline-block" : "none" }}
      >
        <Rewind size={24} className={styles.controlIcon} />
      </button>
      <button
        className={`${styles.controlButton} ${styles.playButton}`}
        onClick={onPlayPause}
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
