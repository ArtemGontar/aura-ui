import React from "react";
import { Pause, Play, Rewind, FastForward } from "lucide-react";
import { Meditation } from "../../types/meditation";
import styles from "./Meditations.module.css"; // Changed to use the correct module

interface MeditationCardProps {
  meditation: Meditation;
  isPlaying: boolean;
  onPlayPause: () => void;
  onMoveAudio: (direction: "forward" | "backward") => void;
}

const MeditationCard: React.FC<MeditationCardProps> = ({
  meditation,
  isPlaying,
  onPlayPause,
  onMoveAudio,
}) => (
  <div className={`${styles.card} ${styles.generalCard}`} style={{ position: 'relative' }}>
    <div className={styles.categoryLabelContainer}>
      <span className={styles.categoryLabel}>{meditation.category}</span>
    </div>
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
  </div>
);

export default MeditationCard;
