import React, { useState } from "react";
import commonStyles from "../Cards.module.css";
import styles from "./MagicBall.module.css";
import { getMagicBallAnswer } from "../../../services/predictionMockService"; // or magicBallMockService
import MagicBallModule from "../../MagicBallModel/MagicBallModel";

const MagicBall: React.FC = () => {
  const [magicText, setMagicText] = useState<string>("Ask the Magic Ball a question.");
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
      <h2 className={commonStyles.title}>Magic Ball</h2>
      <p className={commonStyles.description}>Ask the Magic Ball any question and get an answer.</p>
      <MagicBallModule text={magicText} isShaking={isShaking} onBallClick={handleBallClick} />
    </div>
  );
};

export default MagicBall;