import React, { useState } from "react";
import commonStyles from "../Cards.module.css";
import styles from "./Astrology.module.css";

const Astrology: React.FC = () => {
  const [step, setStep] = useState<number>(0);
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [timeOfBirth, setTimeOfBirth] = useState<string>("");
  const [placeOfBirth, setPlaceOfBirth] = useState<string>("");
  const [focusArea, setFocusArea] = useState<string>("");
  const [specificConcern, setSpecificConcern] = useState<string>("");
  const [reading, setReading] = useState<string>("");

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleDateOfBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateOfBirth(e.target.value);
  };

  const handleTimeOfBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTimeOfBirth(e.target.value);
  };

  const handlePlaceOfBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlaceOfBirth(e.target.value);
  };

  const handleFocusAreaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFocusArea(e.target.value);
  };

  const handleSpecificConcernChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSpecificConcern(e.target.value);
  };

  const handleGetReading = () => {
    // Mock reading generation
    setReading("Your astrological reading will be displayed here.");
  };

  return (
    <div className={commonStyles.card}>
      <h2 className={commonStyles.title}>Astrology</h2>
      <p className={commonStyles.description}>Uncover astrological secrets about your zodiac sign.</p>
      {step === 0 && (
        <div className={styles.step}>
          <p>Ready to explore what the stars say about you? Let’s begin!</p>
          <button onClick={handleNextStep} className={commonStyles.button}>Start</button>
        </div>
      )}
      {step === 1 && (
        <div className={styles.step}>
          <label className={styles.label}>
            What’s your date of birth?
            <input type="date" value={dateOfBirth} onChange={handleDateOfBirthChange} className={styles.input} />
          </label>
          <button onClick={handlePreviousStep} className={commonStyles.button}>Back</button>
          <button onClick={handleNextStep} className={commonStyles.button} disabled={!dateOfBirth}>Next</button>
        </div>
      )}
      {step === 2 && (
        <div className={styles.step}>
          <label className={styles.label}>
            Do you know the exact time of your birth? (Optional)
            <input type="time" value={timeOfBirth} onChange={handleTimeOfBirthChange} className={styles.input} />
          </label>
          <button onClick={handlePreviousStep} className={commonStyles.button}>Back</button>
          <button onClick={handleNextStep} className={commonStyles.button}>Next</button>
        </div>
      )}
      {step === 3 && (
        <div className={styles.step}>
          <label className={styles.label}>
            Where were you born?
            <input type="text" value={placeOfBirth} onChange={handlePlaceOfBirthChange} className={styles.input} placeholder="City, Country" />
          </label>
          <button onClick={handlePreviousStep} className={commonStyles.button}>Back</button>
          <button onClick={handleNextStep} className={commonStyles.button} disabled={!placeOfBirth}>Next</button>
        </div>
      )}
      {step === 4 && (
        <div className={styles.step}>
          <label className={styles.label}>
            What area of life would you like guidance on?
            <select value={focusArea} onChange={handleFocusAreaChange} className={styles.select}>
              <option value="">Select an option</option>
              <option value="Love">Love</option>
              <option value="Career">Career</option>
              <option value="Health">Health</option>
              <option value="Personal Growth">Personal Growth</option>
            </select>
          </label>
          <button onClick={handlePreviousStep} className={commonStyles.button}>Back</button>
          <button onClick={handleNextStep} className={commonStyles.button} disabled={!focusArea}>Next</button>
        </div>
      )}
      {step === 5 && (
        <div className={styles.step}>
          <label className={styles.label}>
            Is there something specific on your mind? (Optional)
            <input type="text" value={specificConcern} onChange={handleSpecificConcernChange} className={styles.input} placeholder="Describe your concern" />
          </label>
          <button onClick={handlePreviousStep} className={commonStyles.button}>Back</button>
          <button onClick={handleGetReading} className={commonStyles.button}>Get Reading</button>
        </div>
      )}
      {reading && (
        <div className={styles.reading}>
          <h3>Your Astrological Reading</h3>
          <p>{reading}</p>
        </div>
      )}
    </div>
  );
};

export default Astrology;