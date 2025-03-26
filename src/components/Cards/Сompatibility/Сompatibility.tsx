import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUserData } from '../../../hooks/useUserData';
import commonStyles from "../Cards.module.css";
import styles from './Compatibility.module.css';
import { getCompatibility } from '../../../services/predictionService';
import { Button } from '@telegram-apps/telegram-ui';
import useTelegramHaptics from '../../../hooks/useTelegramHaptic';
import { useNavigate } from "react-router-dom";
import Onboarding from "../../Onboarding/Onboarding";

const Compatibility: React.FC = () => {
  const { t } = useTranslation();
  const { userData } = useUserData();
  const [partnerInfo, setPartnerInfo] = useState({ firstName: '', lastName: '', dateOfBirth: '' });
  const [compatibilityResult, setCompatibilityResult] = useState<{
    emotionalScore: string;
    communicationScore: string;
    passionScore: string;
    strengths: string[];
    challenges: string[];
  } | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const haptics = useTelegramHaptics();
  const navigate = useNavigate();
  const [showOnboarding, setShowOnboarding] = useState(!userData?.dateOfBirth || !userData?.sex || !userData?.maritalStatus);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    navigate("/compatibility");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPartnerInfo({ ...partnerInfo, [name]: value });
  };

  const checkCompatibility = async () => {
    setLoading(true);
    try {
      const response = await getCompatibility(partnerInfo);
      console.log("response", response);
      setCompatibilityResult(response);
      haptics.notificationOccurred("success");
    } catch (err) {
      setError(t('compatibility.error'));
      haptics.notificationOccurred("error");
    } finally {
      setLoading(false);
    }
  };

  if (showOnboarding) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className={commonStyles.card}>
      <div className={styles.compatibility}>
        <h4>{t('compatibility.title')}</h4>
        <div>
          <label>
            {t('compatibility.partnerInfoFirstName')}
            <input type="text" name="firstName" value={partnerInfo.firstName} onChange={handleInputChange} />
          </label>
          <label>
            {t('compatibility.partnerInfoLastName')}
            <input type="text" name="lastName" value={partnerInfo.lastName} onChange={handleInputChange} />
          </label>
          <label>
            {t('compatibility.partnerInfoDateOfBirth')}
            <input type="date" name="dateOfBirth" value={partnerInfo.dateOfBirth} onChange={handleInputChange} />
          </label>
          <Button onClick={() => { checkCompatibility(); haptics.impactOccurred("medium"); }} disabled={loading}>
            {loading ? t("cards.loading") : t("compatibility.checkButton")}
          </Button>
        </div>
        {compatibilityResult && (
          <div className={styles.resultContainer}>
            <div className={styles.scores}>
              <div>
                <p>{t('compatibility.emotional')}</p>
                <p>{compatibilityResult.emotionalScore}</p>
              </div>
              <div>
                <p>{t('compatibility.intellectual')}</p>
                <p>{compatibilityResult.communicationScore}</p>
              </div>
              <div>
                <p>{t('compatibility.physical')}</p>
                <p>{compatibilityResult.passionScore}</p>
              </div>
            </div>
            <h5>{t('compatibility.strengthsTitle')}</h5>
            <ul className={styles.list}>
              {compatibilityResult.strengths.map((strength, index) => (
                <li key={index}>{strength}</li>
              ))}
            </ul>
            <h5>{t('compatibility.challengesTitle')}</h5>
            <ul className={styles.list}>
              {compatibilityResult.challenges.map((challenge, index) => (
                <li key={index}>{challenge}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Compatibility;
