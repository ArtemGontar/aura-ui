import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styles from "./CreatePersonalMeditation.module.css";
import { Button, Slider } from "@telegram-apps/telegram-ui";
import { ChevronDown, ChevronUp, Check } from "lucide-react";
import { createPersonalMeditation } from "../../services/meditationService";
import { MeditationSettings } from "../../types/meditation";
import { getVoiceOptions, VoiceOption } from "../../utils/voiceUtils";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const CreatePersonalMeditation: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.userData);
  const [topic, setTopic] = useState<string>("");
  const [voiceName, setVoiceName] = useState<string>("");
  const [voiceOptions, setVoiceOptions] = useState<VoiceOption[]>([]);
  const [speechRate, setSpeechRate] = useState<number>(0);
  const [pitch, setPitch] = useState<number>(0);
  const [pauseStrength, setPauseStrength] = useState<number>(1);
  const [addBreathingEffects, setAddBreathingEffects] = useState<boolean>(false);
  const [backgroundAudio, setBackgroundAudio] = useState<string>("");
  const [showAdvancedSettings, setShowAdvancedSettings] = useState<boolean>(false);

  // Get voice options based on user language when component mounts
  useEffect(() => {
    if (user?.languageCode) {
      const options = getVoiceOptions(user.languageCode);
      setVoiceOptions(options);
      
      // Set default voice if available
      if (options.length > 0 && !voiceName) {
        setVoiceName(options[0].id);
      }
    }
  }, [user?.languageCode, voiceName]);

  const handleSubmit = async () => {
    try {
      const meditationSettings: MeditationSettings = {
        topic,
        voiceName: voiceName, // Keep property name compatible with backend if needed
        speechRate,
        pitch,
        pauseStrength,
        addBreathingEffects,
        backgroundAudio
      };
      
      // Call the service function with settings object
      const result = await createPersonalMeditation(meditationSettings);
      console.log("Meditation created successfully:", result);
      
      // After creation, redirect back to Meditations component
      navigate("/meditations");
    } catch (error) {
      console.error("Failed to create meditation:", error);
      // You could add error handling UI feedback here
    }
  };

  return (
    <div className={styles.createPersonalMeditation}>
      <h2>{t('createPersonalMeditation.title')}</h2>
      <label className={styles.label}>
        {t('createPersonalMeditation.topic')}
        <textarea
          value={topic} 
          onChange={(e) => setTopic(e.target.value)} 
          className={styles.textarea} 
          required 
          rows={4}
        />
      </label>
      <label className={styles.label}>
        {t('createPersonalMeditation.voiceName')}
        <select
          value={voiceName}
          onChange={(e) => setVoiceName(e.target.value)}
          className={styles.select}
        >
          {voiceOptions.map((voice) => (
            <option key={voice.id} value={voice.id}>
              {voice.name} ({t(`common.gender.${voice.gender}`)})
            </option>
          ))}
        </select>
      </label>
      
      <div className={styles.advancedSettingsHeader} onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}>
        <h3>{t('createPersonalMeditation.advancedSettings')}</h3>
        {showAdvancedSettings ? (
          <ChevronUp size={20} color="var(--tg-theme-text-color)" />
        ) : (
          <ChevronDown size={20} color="var(--tg-theme-text-color)" />
        )}
      </div>
      
      {showAdvancedSettings && (
        <div className={styles.advancedSettings}>
          <div className={styles.settingsRow}>
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
          </div>

          <div className={styles.settingsRow}>
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

            <div className={styles.buttonContainer}>
              <label className={styles.label}>
                {t('createPersonalMeditation.addBreathingEffects')}
                <Button 
                  onClick={() => setAddBreathingEffects(!addBreathingEffects)}
                  className={addBreathingEffects ? styles.activeButton : ''}
                >
                  {addBreathingEffects ? t('common.enabled') : t('common.disabled')}
                </Button>
              </label>
            </div>
          </div>

          <div className={styles.selectContainer}>
            <label className={styles.label}>
              {t('createPersonalMeditation.backgroundAudio')}
              <select
                value={backgroundAudio}
                onChange={(e) => setBackgroundAudio(e.target.value)}
                className={styles.select}
              >
                <option value="">{t('createPersonalMeditation.noBackgroundAudio')}</option>
                <option value="nature">{t('createPersonalMeditation.backgroundOptions.nature')}</option>
                <option value="rain">{t('createPersonalMeditation.backgroundOptions.rain')}</option>
                <option value="ocean">{t('createPersonalMeditation.backgroundOptions.ocean')}</option>
                <option value="ambient">{t('createPersonalMeditation.backgroundOptions.ambient')}</option>
              </select>
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
