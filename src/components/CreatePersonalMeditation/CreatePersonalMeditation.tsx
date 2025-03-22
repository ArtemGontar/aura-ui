import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styles from "./CreatePersonalMeditation.module.css";
import { Button } from "@telegram-apps/telegram-ui";

const CreatePersonalMeditation: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [topic, setTopic] = useState<string>("");
  const [voicePreference, setVoicePreference] = useState<string>("");

  const handleSubmit = async () => {
    // Add logic to create meditation
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
      <div className={styles.buttonContainer}>
        <Button className={styles.button} onClick={handleSubmit}>
          {t('createPersonalMeditation.createButton')}
        </Button>
      </div>
    </div>
  );
};

export default CreatePersonalMeditation;
