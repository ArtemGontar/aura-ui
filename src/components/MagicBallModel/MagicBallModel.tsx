import React from 'react';
import styles from './MagicBallModel.module.css';

interface MagicBallModuleProps {
  text: string; // The current text passed from the parent
  isShaking: boolean; // Whether the ball is shaking or not
  onBallClick: () => void; // Function to handle ball click
}

const MagicBallModule: React.FC<MagicBallModuleProps> = ({ text, isShaking, onBallClick }) => {
  return (
    <div className={styles.container}>
      <div
        className={`${styles.magicBall} ${isShaking ? styles.shaking : ''}`}
        onClick={onBallClick} // Trigger shaking on click
      >
        <div className={styles.triangle}>
          <span className={styles.triangleText}>{text}</span>
        </div>
      </div>
    </div>
  );
};

export default MagicBallModule;
