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

  const focusAreaArray = [
    { option: 'Career', imageUrl: '/src/assets/area-of-life/career.png' },
    { option: 'Family', imageUrl: '/src/assets/area-of-life/family.png' },
    { option: 'Health', imageUrl: '/src/assets/area-of-life/health.png' },
    { option: 'Sleep', imageUrl: '/src/assets/area-of-life/sleep.png' },
    { option: 'Sport', imageUrl: '/src/assets/area-of-life/sport.png' },
    { option: 'Other', imageUrl: '/src/assets/area-of-life/other.png' },
  ];
  const emotionalStateArray = [
    { option: 'Happy', imageUrl: '/src/assets/emotions/happy.png' },
    { option: 'Sad', imageUrl: '/src/assets/emotions/sad.png' },
    { option: 'Anxious', imageUrl: '/src/assets/emotions/anxious.png' },
    { option: 'Cry', imageUrl: '/src/assets/emotions/cry.png' },
    { option: 'Distruct', imageUrl: '/src/assets/emotions/distruct.png' },
    { option: 'Other', imageUrl: '/src/assets/emotions/other.png' },
  ];
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
              {focusAreaArray.map((area) => (
                <OptionCard
                  key={area.option}
                  option={area.option}
                  imageUrl={area.imageUrl}
                  onClick={() => handleOptionClick(area.option)}
                  selected={selectedOption === area.option}
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
              {emotionalStateArray.map((emotionalState) => (
                <OptionCard
                  key={emotionalState.option}
                  option={emotionalState.option}
                  imageUrl={emotionalState.imageUrl}
                  onClick={() => handleOptionClick(emotionalState.option)}
                  selected={selectedOption === emotionalState.option}
                />
              ))}
            </div>
            {selectedOption === 'Other' && (
              <label className={styles.label}>
                Please specify
                <input type="text" value={otherOption} onChange={handleOtherOptionChange} className={styles.input} placeholder="Specify other option" />
              </label>
            )}
            <div className={styles.buttonGroup}>
              <button onClick={handlePreviousStep} className={`${commonStyles.button} ${styles.button}`}>Back</button>
              <button onClick={handleNextStep} className={`${commonStyles.button} ${styles.button}`} disabled={!selectedOption || (selectedOption === 'Other' && !otherOption)}>Next</button>
            </div>
          </div>
        </>
      )}
      {step === 2 && (
        <div className={styles.step}>
          <label className={styles.label}>
            What is your goal or hope?
            <input type="text" value={goal} onChange={(e) => setGoal(e.target.value)} className={styles.input} placeholder="What is your goal or hope?" />
          </label>
          <div className={styles.buttonGroup}>
            <button onClick={handlePreviousStep} className={`${commonStyles.button} ${styles.button}`}>Back</button>
            <button onClick={handleNextStep} className={`${commonStyles.button} ${styles.button}`} disabled={!goal}>Next</button>
          </div>
        </div>
      )}
      {step === 3 && (
        <div className={styles.step}>
          <label className={styles.label}>
            Provide any background information
            <input type="text" value={backgroundInfo} onChange={(e) => setBackgroundInfo(e.target.value)} className={styles.input} placeholder="Provide any background information" />
          </label>
          <div className={styles.buttonGroup}>
            <button onClick={handlePreviousStep} className={`${commonStyles.button} ${styles.button}`}>Back</button>
            <button onClick={handleNextStep} className={`${commonStyles.button} ${styles.button}`} disabled={!backgroundInfo}>Next</button>
          </div>
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
          <div className={styles.buttonGroup}>
            <button onClick={handlePreviousStep} className={`${commonStyles.button} ${styles.button}`}>Back</button>
            <button onClick={requestInsight} className={`${commonStyles.button} ${styles.button}`} disabled={loading || !selectedOption || (selectedOption === 'Other' && !otherOption)}>Get Insight</button>
          </div>
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