import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUserData } from '../../../hooks/useUserData';
import commonStyles from "../Cards.module.css";
import styles from './Compatibility.module.css';
import { getCompatibility } from '../../../services/predictionService';
import { Button } from '@telegram-apps/telegram-ui';
import BirthDatePicker from '../../BirthDatePicker/BirthDatePicker';

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
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPartnerInfo({ ...partnerInfo, [name]: value });
  };

  const checkCompatibility = async () => {
    setLoading(true);
    try {
      const response = await getCompatibility(partnerInfo);
      setCompatibilityResult(response);
    } catch (err) {
      setError(t('compatibility.error'));
    } finally {
      setLoading(false);
    }
  };

  if (!userData || !userData.dateOfBirth) {
    return (
      <div className={commonStyles.card}>
        <div className={styles.compatibility}>
          <h4>{t('compatibility.completeProfile')}</h4>
          <BirthDatePicker />
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
          <Button onClick={checkCompatibility} disabled={loading}>
            {loading ? t("cards.loading") : t("compatibility.checkButton")}
          </Button>
        </div>
        {compatibilityResult && (
          <div className={styles.resultContainer}>
            <p>{t('compatibility.result', { result: compatibilityResult.compatibilityScore })}</p>
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
