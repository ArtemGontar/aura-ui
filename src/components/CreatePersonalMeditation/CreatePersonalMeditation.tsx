import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styles from "./CreatePersonalMeditation.module.css";
import { Button, Slider, Checkbox, Select } from "@telegram-apps/telegram-ui";

const CreatePersonalMeditation: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [topic, setTopic] = useState<string>("");
  const [voicePreference, setVoicePreference] = useState<string>("");
  const [speechRate, setSpeechRate] = useState<number>(0);
  const [pitch, setPitch] = useState<number>(0);
  const [pauseStrength, setPauseStrength] = useState<number>(1);
  const [addBreathingEffects, setAddBreathingEffects] = useState<boolean>(false);
  const [backgroundAudio, setBackgroundAudio] = useState<string>("");
  const [showAdvancedSettings, setShowAdvancedSettings] = useState<boolean>(false);

  const handleSubmit = async () => {
    // Add logic to create meditation with all settings
    const meditationSettings = {
      topic,
      voicePreference,
      speechRate,
      pitch,
      pauseStrength,
      addBreathingEffects,
      backgroundAudio
    };
    
    console.log("Creating meditation with settings:", meditationSettings);
    
    // After creation, redirect back to Meditations component
    navigate("/meditations");
  };

  return (
    <div className={styles.createPersonalMeditation}>
      <h2>{t('createPersonalMeditation.title')}</h2>
      <label className={styles.label}>
        {t('createPersonalMeditation.topic')}
        <input 
          type="text" 
          value={topic} 
          onChange={(e) => setTopic(e.target.value)} 
          className={styles.input} 
          required 
        />
      </label>
      <label className={styles.label}>
        {t('createPersonalMeditation.voicePreference')}
        <input 
          type="text" 
          value={voicePreference} 
          onChange={(e) => setVoicePreference(e.target.value)} 
          className={styles.input} 
          required 
        />
      </label>
      
      <div className={styles.advancedSettingsHeader} onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}>
        <h3>{t('createPersonalMeditation.advancedSettings')}</h3>
        <span>{showAdvancedSettings ? '▲' : '▼'}</span>
      </div>
      
      {showAdvancedSettings && (
        <div className={styles.advancedSettings}>
          <div className={styles.sliderContainer}>
            <label className={styles.label}>
              {t('createPersonalMeditation.speechRate')}
              <Slider
                min={-30}
                max={30}
                value={speechRate}
                onChange={(value) => setSpeechRate(value)}
                className={styles.slider}
              />
              <span className={styles.sliderValue}>{speechRate}</span>
            </label>
          </div>

          <div className={styles.sliderContainer}>
            <label className={styles.label}>
              {t('createPersonalMeditation.pitch')}
              <Slider
                min={-50}
                max={50}
                value={pitch}
                onChange={(value) => setPitch(value)}
                className={styles.slider}
              />
              <span className={styles.sliderValue}>{pitch}</span>
            </label>
          </div>

          <div className={styles.sliderContainer}>
            <label className={styles.label}>
              {t('createPersonalMeditation.pauseStrength')}
              <Slider
                min={1}
                max={3}
                value={pauseStrength}
                onChange={(value) => setPauseStrength(value)}
                className={styles.slider}
              />
              <span className={styles.sliderValue}>{pauseStrength}</span>
            </label>
          </div>

          <div className={styles.checkboxContainer}>
            <label className={styles.checkboxLabel}>
              <Checkbox
                checked={addBreathingEffects}
                onChange={() => setAddBreathingEffects(!addBreathingEffects)}
              />
              {t('createPersonalMeditation.addBreathingEffects')}
            </label>
          </div>

          <div className={styles.selectContainer}>
            <label className={styles.label}>
              {t('createPersonalMeditation.backgroundAudio')}
              <Select
                value={backgroundAudio}
                onChange={(e) => setBackgroundAudio(e.target.value)}
                className={styles.select}
                header={t('createPersonalMeditation.backgroundAudio')}
              >
                <option value="">{t('createPersonalMeditation.noBackgroundAudio')}</option>
                <option value="nature">{t('createPersonalMeditation.backgroundOptions.nature')}</option>
                <option value="rain">{t('createPersonalMeditation.backgroundOptions.rain')}</option>
                <option value="ocean">{t('createPersonalMeditation.backgroundOptions.ocean')}</option>
                <option value="ambient">{t('createPersonalMeditation.backgroundOptions.ambient')}</option>
              </Select>
            </label>
          </div>
        </div>
      )}

      <div className={styles.buttonContainer}>
        <Button onClick={handleSubmit}>
          {t('createPersonalMeditation.createButton')}
        </Button>
      </div>
    </div>
  );
};

export default CreatePersonalMeditation;
