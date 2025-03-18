import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUserData } from '../../../hooks/useUserData';
import commonStyles from "../Cards.module.css";
import styles from './Сompatibility.module.css';
import { getCompatibility } from '../../../services/predictionService';
import { saveUserBirthDate } from '../../../services/userService';
import { Button } from '@telegram-apps/telegram-ui';

const Compatibility: React.FC = () => {
  const { t } = useTranslation();
  const { userData } = useUserData();
  const [partnerInfo, setPartnerInfo] = useState({ firstName: '', lastName: '', dateOfBirth: '' });
  const [compatibilityResult, setCompatibilityResult] = useState<{
    compatibilityScore: string;
    strengths: string[];
    challenges: string[];
    todayScenario: string;
  } | null>(null);
  const [profileData, setProfileData] = useState({ dateOfBirth: '' });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPartnerInfo({ ...partnerInfo, [name]: value });
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const checkCompatibility = async () => {
    try {
      const response = await getCompatibility(partnerInfo);
      setCompatibilityResult(response);
    } catch (err) {
      setError(t('compatibility.error'));
    }
  };

  const saveProfileData = async () => {
    setLoading(true);
    try {
      const updatedUserData = { ...userData, ...profileData };
      await saveUserBirthDate(updatedUserData.dateOfBirth);
    } catch (err) {
      setError(t('compatibility.error'));
    } finally {
      setLoading(false);
    }
  };

  if (!userData || !userData.dateOfBirth || !userData.zodiacSign) {
    return (
      <div className={commonStyles.card}>
        <div className={styles.compatibility}>
          <h4>{t('compatibility.completeProfile')}</h4>
          <label>
            {t('compatibility.dateOfBirth')}
            <input type="date" name="dateOfBirth" value={profileData.dateOfBirth} onChange={handleProfileChange} />
          </label>
          <Button onClick={saveProfileData} disabled={loading}>
            {loading ? t('compatibility.loading') : t('compatibility.saveProfileButton')}
          </Button>
          {error && <p className={styles.error}>{error}</p>}
        </div>
      </div>
    );
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
          <Button onClick={checkCompatibility}>{t('compatibility.checkButton')}</Button>
        </div>
        {compatibilityResult && (
          <div>
            <p>{t('compatibility.result', { result: compatibilityResult.compatibilityScore })}</p>
            <h5>{t('compatibility.strengthsTitle')}</h5>
            <ul>
              {compatibilityResult.strengths.map((strength, index) => (
                <li key={index}>{strength}</li>
              ))}
            </ul>
            <h5>{t('compatibility.challengesTitle')}</h5>
            <ul>
              {compatibilityResult.challenges.map((challenge, index) => (
                <li key={index}>{challenge}</li>
              ))}
            </ul>
            <h5>{t('compatibility.todayScenarioTitle')}</h5>
            <p>{compatibilityResult.todayScenario}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Compatibility;
