import React, { useState } from 'react';
import OptionCard from '../../OptionCard/OptionCard';
import styles from './Psychological.module.css';
import commonStyles from '../Cards.module.css';

const Psychological: React.FC = () => {
  const [step, setStep] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [otherOption, setOtherOption] = useState<string>('');
  const [goal, setGoal] = useState<string>('');
  const [backgroundInfo, setBackgroundInfo] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [insight, setInsight] = useState<string>('');

  const focusAreaArray = ['Career', 'Relationships', 'Health', 'Personal Growth', 'Other'];
  const emotionalStateArray = ['Happy', 'Sad', 'Anxious', 'Angry', 'Other'];

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    if (option !== 'Other') {
      setOtherOption('');
    }
  };

  const handleOtherOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtherOption(e.target.value);
  };

  const requestInsight = () => {
    // Mock insight generation
    setLoading(true);
    setTimeout(() => {
      setInsight('Your psychological insight will be displayed here.');
      setLoading(false);
    }, 2000);
  };

  return (
    <div className={commonStyles.card}>
      <h2 className={commonStyles.title}>Psychological Insight</h2>
      {step === 0 && (
        <>
          <p className={commonStyles.description}>Choose your focus area</p>
          <div className={styles.step}>
            <div className={styles.optionsGrid}>
              {focusAreaArray.map((option) => (
                <OptionCard
                  key={option}
                  option={option}
                  onClick={() => handleOptionClick(option)}
                  selected={selectedOption === option}
                />
              ))}
            </div>
            {selectedOption === 'Other' && (
              <label className={styles.label}>
                Please specify
                <input type="text" value={otherOption} onChange={handleOtherOptionChange} className={styles.input} placeholder="Specify other option" />
              </label>
            )}
            <button onClick={handleNextStep} className={`${commonStyles.button} ${styles.button}`} disabled={!selectedOption || (selectedOption === 'Other' && !otherOption)}>Next</button>
          </div>
        </>
      )}
      {step === 1 && (
        <>
          <p className={commonStyles.description}>How are you feeling emotionally?</p>
          <div className={styles.step}>
            <div className={styles.optionsGrid}>
              {emotionalStateArray.map((option) => (
                <OptionCard
                  key={option}
                  option={option}
                  onClick={() => handleOptionClick(option)}
                  selected={selectedOption === option}
                />
              ))}
            </div>
            {selectedOption === 'Other' && (
              <label className={styles.label}>
                Please specify
                <input type="text" value={otherOption} onChange={handleOtherOptionChange} className={styles.input} placeholder="Specify other option" />
              </label>
            )}
            <button onClick={handlePreviousStep} className={`${commonStyles.button} ${styles.button}`}>Back</button>
            <button onClick={handleNextStep} className={`${commonStyles.button} ${styles.button}`} disabled={!selectedOption || (selectedOption === 'Other' && !otherOption)}>Next</button>
          </div>
        </>
      )}
      {step === 2 && (
        <div className={styles.step}>
          <label className={styles.label}>
            What is your goal or hope?
            <input type="text" value={goal} onChange={(e) => setGoal(e.target.value)} className={styles.input} placeholder="What is your goal or hope?" />
          </label>
          <button onClick={handlePreviousStep} className={`${commonStyles.button} ${styles.button}`}>Back</button>
          <button onClick={handleNextStep} className={`${commonStyles.button} ${styles.button}`} disabled={!goal}>Next</button>
        </div>
      )}
      {step === 3 && (
        <div className={styles.step}>
          <label className={styles.label}>
            Provide any background information
            <input type="text" value={backgroundInfo} onChange={(e) => setBackgroundInfo(e.target.value)} className={styles.input} placeholder="Provide any background information" />
          </label>
          <button onClick={handlePreviousStep} className={`${commonStyles.button} ${styles.button}`}>Back</button>
          <button onClick={handleNextStep} className={`${commonStyles.button} ${styles.button}`} disabled={!backgroundInfo}>Next</button>
        </div>
      )}
      {step === 4 && (
        <div className={styles.step}>
          <label className={styles.label}>
            Select an option
            <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)} className={styles.select}>
              <option value="">Select an option</option>
              <option value="Option 1">Option 1</option>
              <option value="Option 2">Option 2</option>
              <option value="Other">Other</option>
            </select>
          </label>
          {selectedOption === 'Other' && (
            <label className={styles.label}>
              Please specify
              <input type="text" value={otherOption} onChange={handleOtherOptionChange} className={styles.input} placeholder="Specify other option" />
            </label>
          )}
          <button onClick={handlePreviousStep} className={`${commonStyles.button} ${styles.button}`}>Back</button>
          <button onClick={requestInsight} className={`${commonStyles.button} ${styles.button}`} disabled={loading || !selectedOption || (selectedOption === 'Other' && !otherOption)}>Get Insight</button>
        </div>
      )}
      {insight && (
        <div className={styles.insight}>
          <h3>Your Psychological Insight</h3>
          <p>{insight}</p>
        </div>
      )}
    </div>
  );
};

export default Psychological;