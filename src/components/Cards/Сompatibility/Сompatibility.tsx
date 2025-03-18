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
  const [personB, setPersonB] = useState({ name: '', dateOfBirth: '' });
  const [compatibilityResult, setCompatibilityResult] = useState<string | null>(null);
  const [profileData, setProfileData] = useState({ dateOfBirth: '' });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonB({ ...personB, [name]: value });
  };

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const checkCompatibility = async () => {
    const response = await getCompatibility();
    setCompatibilityResult(response);
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
          <button onClick={saveProfileData} disabled={loading}>
            {loading ? t('compatibility.loading') : t('compatibility.saveProfileButton')}
          </button>
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
            {t('compatibility.personBName')}
            <input type="text" name="name" value={personB.name} onChange={handleInputChange} />
          </label>
          <label>
            {t('compatibility.personBDateOfBirth')}
            <input type="date" name="dateOfBirth" value={personB.dateOfBirth} onChange={handleInputChange} />
          </label>
          <Button onClick={checkCompatibility}>{t('compatibility.checkButton')}</Button>
        </div>
        {compatibilityResult && <p>{t('compatibility.result', { result: compatibilityResult })}</p>}
      </div>
    </div>
  );
};

export default Compatibility;
