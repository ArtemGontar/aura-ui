import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import OptionCard from '../../OptionCard/OptionCard';
import styles from './Psychological.module.css';
import commonStyles from '../Cards.module.css';

const Psychological: React.FC = () => {
  const { t } = useTranslation();
  const [step, setStep] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [otherOption, setOtherOption] = useState<string>('');
  const [goal, setGoal] = useState<string>('');
  const [backgroundInfo, setBackgroundInfo] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [insight, setInsight] = useState<string>('');

  const focusAreaArray = [
    { option: t('psychological.focusAreas.career'), imageUrl: '/images/area-of-life/career.png' },
    { option: t('psychological.focusAreas.family'), imageUrl: '/images/area-of-life/family.png' },
    { option: t('psychological.focusAreas.health'), imageUrl: '/images/area-of-life/health.png' },
    { option: t('psychological.focusAreas.sleep'), imageUrl: '/images/area-of-life/sleep.png' },
    { option: t('psychological.focusAreas.sport'), imageUrl: '/images/area-of-life/sport.png' },
    { option: t('psychological.focusAreas.other'), imageUrl: '/images/area-of-life/other.png' },
  ];
  const emotionalStateArray = [
    { option: t('psychological.emotions.happy'), imageUrl: '/images/emotions/happy.png' },
    { option: t('psychological.emotions.sad'), imageUrl: '/images/emotions/sad.png' },
    { option: t('psychological.emotions.anxious'), imageUrl: '/images/emotions/anxious.png' },
    { option: t('psychological.emotions.cry'), imageUrl: '/images/emotions/cry.png' },
    { option: t('psychological.emotions.distruct'), imageUrl: '/images/emotions/distruct.png' },
    { option: t('psychological.emotions.other'), imageUrl: '/images/emotions/other.png' },
  ];
  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    if (option !== t('psychological.focusAreas.other') && option !== t('psychological.emotions.other')) {
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
      setInsight(t('psychological.insight.defaultText'));
      setLoading(false);
    }, 2000);
  };

  return (
    <div className={commonStyles.card}>
      <h2 className={commonStyles.title}>{t('psychological.title')}</h2>
      {step === 0 && (
        <>
          <p className={commonStyles.description}>{t('psychological.description')}</p>
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
            {selectedOption === t('psychological.focusAreas.other') && (
              <label className={styles.label}>
                {t('psychological.form.specifyOther')}
                <input 
                  type="text" 
                  value={otherOption} 
                  onChange={handleOtherOptionChange} 
                  className={styles.input} 
                  placeholder={t('psychological.form.otherPlaceholder')} 
                />
              </label>
            )}
            <button 
              onClick={handleNextStep} 
              className={`${commonStyles.button} ${styles.button}`} 
              disabled={!selectedOption || (selectedOption === t('psychological.focusAreas.other') && !otherOption)}
            >
              {t('psychological.buttons.next')}
            </button>
          </div>
        </>
      )}
      {step === 1 && (
        <>
          <p className={commonStyles.description}>{t('psychological.emotionalState')}</p>
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
            {selectedOption === t('psychological.emotions.other') && (
              <label className={styles.label}>
                {t('psychological.form.specifyOther')}
                <input 
                  type="text" 
                  value={otherOption} 
                  onChange={handleOtherOptionChange} 
                  className={styles.input} 
                  placeholder={t('psychological.form.otherPlaceholder')} 
                />
              </label>
            )}
            <div className={styles.buttonGroup}>
              <button onClick={handlePreviousStep} className={`${commonStyles.button} ${styles.button}`}>
                {t('psychological.buttons.back')}
              </button>
              <button 
                onClick={handleNextStep} 
                className={`${commonStyles.button} ${styles.button}`} 
                disabled={!selectedOption || (selectedOption === t('psychological.emotions.other') && !otherOption)}
              >
                {t('psychological.buttons.next')}
              </button>
            </div>
          </div>
        </>
      )}
      {step === 2 && (
        <div className={styles.step}>
          <label className={styles.label}>
            {t('psychological.form.goalQuestion')}
            <input 
              type="text" 
              value={goal} 
              onChange={(e) => setGoal(e.target.value)} 
              className={styles.input} 
              placeholder={t('psychological.form.goalPlaceholder')} 
            />
          </label>
          <div className={styles.buttonGroup}>
            <button onClick={handlePreviousStep} className={`${commonStyles.button} ${styles.button}`}>
              {t('psychological.buttons.back')}
            </button>
            <button onClick={handleNextStep} className={`${commonStyles.button} ${styles.button}`} disabled={!goal}>
              {t('psychological.buttons.next')}
            </button>
          </div>
        </div>
      )}
      {step === 3 && (
        <div className={styles.step}>
          <label className={styles.label}>
            {t('psychological.form.backgroundQuestion')}
            <input 
              type="text" 
              value={backgroundInfo} 
              onChange={(e) => setBackgroundInfo(e.target.value)} 
              className={styles.input} 
              placeholder={t('psychological.form.backgroundPlaceholder')} 
            />
          </label>
          <div className={styles.buttonGroup}>
            <button onClick={handlePreviousStep} className={`${commonStyles.button} ${styles.button}`}>
              {t('psychological.buttons.back')}
            </button>
            <button onClick={handleNextStep} className={`${commonStyles.button} ${styles.button}`} disabled={!backgroundInfo}>
              {t('psychological.buttons.next')}
            </button>
          </div>
        </div>
      )}
      {step === 4 && (
        <div className={styles.step}>
          <label className={styles.label}>
            {t('psychological.form.selectOption')}
            <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)} className={styles.select}>
              <option value="">{t('psychological.form.selectOption')}</option>
              <option value="Option 1">{t('psychological.form.option1')}</option>
              <option value="Option 2">{t('psychological.form.option2')}</option>
              <option value="Other">{t('psychological.focusAreas.other')}</option>
            </select>
          </label>
          {selectedOption === 'Other' && (
            <label className={styles.label}>
              {t('psychological.form.specifyOther')}
              <input 
                type="text" 
                value={otherOption} 
                onChange={handleOtherOptionChange} 
                className={styles.input} 
                placeholder={t('psychological.form.otherPlaceholder')} 
              />
            </label>
          )}
          <div className={styles.buttonGroup}>
            <button onClick={handlePreviousStep} className={`${commonStyles.button} ${styles.button}`}>
              {t('psychological.buttons.back')}
            </button>
            <button 
              onClick={requestInsight} 
              className={`${commonStyles.button} ${styles.button}`} 
              disabled={loading || !selectedOption || (selectedOption === 'Other' && !otherOption)}
            >
              {t('psychological.buttons.getInsight')}
            </button>
          </div>
        </div>
      )}
      {insight && (
        <div className={styles.insight}>
          <h3>{t('psychological.insight.title')}</h3>
          <p>{insight}</p>
        </div>
      )}
    </div>
  );
};

export default Psychological;