import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import commonStyles from "../Cards.module.css";
import MagicBallModule from "../../MagicBallModel/MagicBallModel";
import { getMagicBallAnswer } from "../../../services/predictionService";

const MagicBall: React.FC = () => {
  const { t } = useTranslation();
  const [magicText, setMagicText] = useState<string>(t('magicBall.initialText'));
  const [isShaking, setIsShaking] = useState(false); // Whether the ball is shaking

  const askMagicBall = async () => {
    try {
      const answer = await getMagicBallAnswer();
      console.log("Magic Ball answer:", answer);
      setMagicText(answer);
    } catch (error) {
      console.error("Failed to get Magic Ball answer", error);
    }
  };

  // Function that handles click event on the ball
  const handleBallClick = async () => {
    setIsShaking(true); // Start shaking
    await askMagicBall(); // Make backend request (can happen anytime while shaking)
    setIsShaking(false); // Stop shaking after 2 seconds
  };

  return (
    <div className={commonStyles.card}>
      <h2 className={commonStyles.title}>{t('magicBall.title')}</h2>
      <p className={commonStyles.description}>{t('magicBall.description')}</p>
      <MagicBallModule text={magicText} isShaking={isShaking} onBallClick={handleBallClick} />
    </div>
  );
};

export default MagicBall;