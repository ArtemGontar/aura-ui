import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styles from "./CreatePersonalMeditation.module.css";
import { Slider } from "@telegram-apps/telegram-ui";
import { ChevronDown, ChevronUp } from "lucide-react";
import { createPersonalMeditation } from "../../services/meditationService";
import { MeditationSettings } from "../../types/meditation";
import { getVoiceOptions, VoiceOption } from "../../utils/voiceUtils";
import FeatureButton from "../FeatureButton/FeatureButton";
import { useQuotas } from "../../hooks/useQuotas";
import tariffs from "../../constants/tariffs";
import { useUserData } from "../../hooks/useUserData";
import { FeatureType, PRODUCT_NAME_KEYS } from "../../constants/products";
import { createInvoiceLink } from "../../services/paymentService";
import WebApp from "@twa-dev/sdk";
import useTelegramHaptics from "../../hooks/useTelegramHaptic";

const CreatePersonalMeditation: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { remainingUses, useFeature } = useQuotas("CreatePersonalMeditation");
  const [topic, setTopic] = useState<string>("");
  const [voiceName, setVoiceName] = useState<string>("");
  const [voiceOptions, setVoiceOptions] = useState<VoiceOption[]>([]);
  const [speechRate, setSpeechRate] = useState<number>(0);
  const [pitch, setPitch] = useState<number>(0);
  const [pauseStrength, setPauseStrength] = useState<number>(1);
  const [backgroundAudioFileName, setBackgroundAudioFileName] = useState<string>("");
  const [showAdvancedSettings, setShowAdvancedSettings] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { userData } = useUserData();
  const { notificationOccurred } = useTelegramHaptics();

  useEffect(() => {
    if (userData?.languageCode) {
      const options = getVoiceOptions(userData.languageCode);
      setVoiceOptions(options);
      
      // Set default voice if available
      if (options.length > 0 && !voiceName) {
        setVoiceName(options[0].id);
      }
    }
  }, [userData?.languageCode, voiceName]);

  const requestPersonalMeditation = async () => {
    try {
      setLoading(true);
      const meditationSettings: MeditationSettings = {
        topic,
        voiceName,
        speechRate,
        pitch,
        pauseStrength,
        backgroundAudioFileName,
      };
      
      await createPersonalMeditation(meditationSettings);
      useFeature();
      navigate("/meditations");
    } catch (error) {
      console.error("Failed to create meditation:", error);
    } finally {
      setLoading(false);
    }
  };

  const requestPaidPersonalMeditation = async () => {
    const featureId = FeatureType.CreatePersonalMeditation;
    const featureName = t(PRODUCT_NAME_KEYS[featureId]);
    const invoiceLink = await createInvoiceLink(featureId, featureName, t("compatibility.description"), "XTR", false);
    WebApp.openInvoice(invoiceLink, async (status) => {
      if (status === 'paid') {
        await requestPersonalMeditation();
        notificationOccurred('success');
      } else if (status === 'failed') {
        notificationOccurred('error');
      } else {
        notificationOccurred('warning');
      }
    });
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
          </div>
          <div className={styles.selectContainer}>
            <label className={styles.label}>
              {t('createPersonalMeditation.backgroundAudio')}
              <select
                value={backgroundAudioFileName}
                onChange={(e) => setBackgroundAudioFileName(e.target.value)}
                className={styles.select}
              >
                <option value="">{t('createPersonalMeditation.noBackgroundAudio')}</option>
                <option value="8635ec9d-2e6f-4bc6-a8cf-48c7cfa3b3c4.wav">{t('createPersonalMeditation.backgroundOptions.forest')}</option>
                <option value="61eccef4-f0e6-40c6-8686-13a4c342d3bd.wav">{t('createPersonalMeditation.backgroundOptions.ambient')}</option>
              </select>
            </label>
          </div>
        </div>
      )}
      <FeatureButton
        loading={loading}
        remainingUses={remainingUses}
        onFreeAction={requestPersonalMeditation}
        onPaidAction={requestPaidPersonalMeditation}
        freeActionTextKey="createPersonalMeditation.createButton"
        paidActionTextKey="createPersonalMeditation.createButtonPaid"
        starsAmount={tariffs.createPersonalMeditationStarsAmount}
      />
    </div>
  );
};

export default CreatePersonalMeditation;
