import React, { useState } from "react";
import commonStyles from "../Cards.module.css";
import styles from "./Psychological.module.css";
import { getPsychologicalInsight } from "../../../services/predictionMockService"; // or predictionService

const Psychological: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [otherOption, setOtherOption] = useState<string>("");
  const [concern, setConcern] = useState<string>("");
  const [emotionalState, setEmotionalState] = useState<string>("");
  const [goal, setGoal] = useState<string>("");
  const [backgroundInfo, setBackgroundInfo] = useState<string>("");
  const [insight, setInsight] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
    if (e.target.value !== "Other") {
      setOtherOption("");
    }
  };

  const handleOtherOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtherOption(e.target.value);
  };

  const handleConcernChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConcern(e.target.value);
  };

  const handleEmotionalStateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmotionalState(e.target.value);
  };

  const handleGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGoal(e.target.value);
  };

  const handleBackgroundInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBackgroundInfo(e.target.value);
  };

  const requestInsight = async () => {
    setLoading(true);
    try {
      const focusArea = selectedOption === "Other" ? otherOption : selectedOption;
      const insight = await getPsychologicalInsight({
        focusArea,
        concern,
        emotionalState,
        goal,
        backgroundInfo,
      });
      setInsight(insight);
    } catch (error) {
      console.error("Failed to get psychological insight", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={commonStyles.card}>
      <h2 className={commonStyles.title}>Psychological</h2>
      <p className={commonStyles.description}>Gain insights into your personality and mental well-being.</p>
      <label className={styles.label}>
        Focus Area
        <select value={selectedOption} onChange={handleOptionChange} className={styles.select}>
          <option value="">Select an option</option>
          <option value="Career">Career</option>
          <option value="Relationships">Relationships</option>
          <option value="Health">Health</option>
          <option value="Personal Growth">Personal Growth</option>
          <option value="Other">Other</option>
        </select>
      </label>
      {selectedOption === "Other" && (
        <label className={styles.label}>
          Please specify
          <input
            type="text"
            value={otherOption}
            onChange={handleOtherOptionChange}
            className={styles.input}
            placeholder="Please specify"
          />
        </label>
      )}
      <label className={styles.label}>
        Current Concern
        <input
          type="text"
          value={concern}
          onChange={handleConcernChange}
          className={styles.input}
          placeholder="Describe your current concern"
        />
      </label>
      <label className={styles.label}>
        Emotional State
        <input
          type="text"
          value={emotionalState}
          onChange={handleEmotionalStateChange}
          className={styles.input}
          placeholder="Describe your emotional state"
        />
      </label>
      <label className={styles.label}>
        Goal or Hope
        <input
          type="text"
          value={goal}
          onChange={handleGoalChange}
          className={styles.input}
          placeholder="What is your goal or hope?"
        />
      </label>
      <label className={styles.label}>
        Background Info
        <input
          type="text"
          value={backgroundInfo}
          onChange={handleBackgroundInfoChange}
          className={styles.input}
          placeholder="Provide any background information"
        />
      </label>
      <button onClick={requestInsight} className={styles.button} disabled={loading || !selectedOption || (selectedOption === "Other" && !otherOption) || !concern || !emotionalState || !goal || !backgroundInfo}>
        {loading ? "Loading..." : "Get Insight"}
      </button>
      {insight && <p className={styles.insight}>{insight}</p>}
    </div>
  );
};

export default Psychological;