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
import DatePicker from '../../DatePicker/DatePicker';
import LoadingDisplay from '../../LoadingDisplay/LoadingDisplay';
import useShowOnboarding from '../../../hooks/useShowOnboarding';
import { useTelegramInit } from '../../../hooks/useTelegramInit';
import CompatibilityResult from '../../Cards/Сompatibility/СompatibilityResult';
import { CompatibilityData } from '../../../types/prediction';
import { PartnerInfo } from '../../../types/partner';

const Compatibility: React.FC = () => {
  const { t } = useTranslation();
  const { userData } = useUserData();
  const { isLoading: isTelegramLoading } = useTelegramInit();
  const [partnerInfo, setPartnerInfo] = useState<PartnerInfo>({
    firstName: '', 
    lastName: '', 
    dateOfBirth: '',
    sex: '', 
    relationshipStatus: '' 
  });
  const [compatibilityResult, setCompatibilityResult] = useState<CompatibilityData | null>(null);
  const [loading, setLoading] = useState(false);
  const haptics = useTelegramHaptics();
  const navigate = useNavigate();

  const handleOnboardingComplete = () => {
    navigate("/compatibility");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPartnerInfo({ ...partnerInfo, [name]: value });
  };

  const handleDateChange = (date: { day: string; month: string; year: string }) => {
    const formattedDate = `${date.year}-${date.month.padStart(2, '0')}-${date.day.padStart(2, '0')}`;
    setPartnerInfo({ ...partnerInfo, dateOfBirth: formattedDate });
  };

  const checkCompatibility = async () => {
    setLoading(true);
    try {
      const response: CompatibilityData = await getCompatibility(partnerInfo);
      setCompatibilityResult(response);
      haptics.notificationOccurred("success");
    } catch (err) {
      haptics.notificationOccurred("error");
    } finally {
      setLoading(false);
    }
  };

  if (isTelegramLoading) {
    return <LoadingDisplay />;
  }

  const showOnboarding = !isTelegramLoading && useShowOnboarding(userData);

  return (
    <div className={commonStyles.card}>
      <div className={styles.banner}>
        <span className={styles.emoji}>💞</span>
        <h2 className={styles.bannerText}>
          {t('compatibility.banner.title')}
        </h2>
        <p className={styles.subText}>
          {t('compatibility.banner.subtitle')}
        </p>
      </div>
      {showOnboarding ? (
        <Onboarding onBirthDateChange={() => {}} onComplete={handleOnboardingComplete} />
      ) : (
        <div className={styles.compatibility}>
          {loading ? (
            <LoadingDisplay />
          ) : compatibilityResult ? (
            <CompatibilityResult partnerInfo={partnerInfo} compatibilityResult={compatibilityResult} />
          ) : (
            <>
              <h4>{t('compatibility.title')}</h4>
              <div>
                <label>
                  {t('compatibility.partnerInfoDateOfBirth')} <span className={styles.required}>*</span>
                  <DatePicker onChange={handleDateChange} />
                </label>
                <label>
                  {t('compatibility.partnerInfoFirstName')}
                  <input type="text" name="firstName" value={partnerInfo.firstName} onChange={handleInputChange} />
                </label>
                <label>
                  {t('compatibility.partnerInfoLastName')}
                  <input type="text" name="lastName" value={partnerInfo.lastName} onChange={handleInputChange} />
                </label>
                <label>
                  {t('compatibility.partnerInfoSex')}
                  <select name="sex" value={partnerInfo.sex} onChange={handleInputChange}>
                    <option value="">{t('compatibility.selectPlaceholder')}</option>
                    <option value="male">{t('compatibility.sexMale')}</option>
                    <option value="female">{t('compatibility.sexFemale')}</option>
                    <option value="other">{t('compatibility.sexOther')}</option>
                  </select>
                </label>
                <label>
                  {t('compatibility.partnerInfoRelationshipStatus')}
                  <select name="relationshipStatus" value={partnerInfo.relationshipStatus} onChange={handleInputChange}>
                    <option value="">{t('compatibility.selectPlaceholder')}</option>
                    <option value="single">{t('compatibility.statusSingle')}</option>
                    <option value="inRelationship">{t('compatibility.statusInRelationship')}</option>
                    <option value="married">{t('compatibility.statusMarried')}</option>
                    <option value="complicated">{t('compatibility.statusComplicated')}</option>
                  </select>
                </label>
                <Button onClick={() => { checkCompatibility(); haptics.impactOccurred("medium"); }} disabled={loading || !partnerInfo.dateOfBirth}>
                  {t("compatibility.checkButton")}
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Compatibility;
