import React, { useState } from "react";
import commonStyles from "../Cards.module.css";
import styles from "./MagicBall.module.css";
import { getMagicBallAnswer } from "../../../services/predictionService"; // or magicBallMockService

const MagicBall: React.FC = () => {
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };

  const askMagicBall = async () => {
    setLoading(true);
    try {
      const answer = await getMagicBallAnswer();
      setAnswer(answer);
    } catch (error) {
      console.error("Failed to get Magic Ball answer", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={commonStyles.card}>
      <h2 className={commonStyles.title}>Magic Ball</h2>
      <p className={commonStyles.description}>Ask the Magic Ball any question and get an answer.</p>
      <input
        type="text"
        value={question}
        onChange={handleQuestionChange}
        className={commonStyles.input}
        placeholder="Enter your question"
      />
      <button onClick={askMagicBall} className={commonStyles.button} disabled={loading || !question}>
        {loading ? "Thinking..." : "Ask the Magic Ball"}
      </button>
      {answer && <p className={styles.answer}>{answer}</p>}
    </div>
  );
};

export default MagicBall;