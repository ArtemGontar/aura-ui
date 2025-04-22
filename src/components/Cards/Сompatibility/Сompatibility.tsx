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
import CompatibilityResult from '../../Cards/Сompatibility/СompatibilityResult';
import { CompatibilityData } from '../../../types/prediction';
import { PartnerInfo } from '../../../types/partner';
import { Heart } from 'lucide-react';
import FeatureButton from "../../FeatureButton/FeatureButton";
import { useQuotas } from '../../../hooks/useQuotas';
import Banner from '../../Banner/Banner';
import tariffs from "../../../constants/tariffs";

const Compatibility: React.FC = () => {
  const { t } = useTranslation();
  const { userData } = useUserData();
  const { remainingUses, useFeature } = useQuotas("Compatibility");
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
      useFeature();
      haptics.notificationOccurred("success");
    } catch (err) {
      haptics.notificationOccurred("error");
    } finally {
      setLoading(false);
    }
  };

  const requestCompatibility = () => {
    checkCompatibility();
    haptics.impactOccurred("medium");
  };


  const showOnboarding = useShowOnboarding(userData);

  return (
    <div className={commonStyles.card}>
      <Banner 
        headerText={t('compatibility.banner.title')} 
        subText={t('compatibility.banner.subtitle')} 
        bgColor={styles.bannerBackground}
        icon={<Heart className="w-8 h-8 mb-4 text-white" fill="white" />} 
      />
      {showOnboarding ? (
        <Onboarding onBirthDateChange={() => {}} onComplete={handleOnboardingComplete} />
      ) : (
        <div className={styles.compatibility}>
          {loading ? (
            <div className={styles.loadingWrapper}>
              <LoadingDisplay message={t('compatibility.verifyingCompatibility')} />
            </div>
          ) : compatibilityResult ? (
            <>
              <CompatibilityResult 
                partnerInfo={partnerInfo} 
                compatibilityResult={compatibilityResult} />
              <Button onClick={() => setCompatibilityResult(null)}>
                {t("compatibility.checkAgainButton")}
              </Button>
            </>
          ) : (
            <>
              <h4>{t('compatibility.title')}</h4>
              <div>
                <label>
                  {t('compatibility.partnerInfoDateOfBirth')} <span className={styles.required}>*</span>
                  <DatePicker onChange={handleDateChange} />
                </label>
                <div className={styles.nameContainer}>
                  <label>
                    {t('compatibility.partnerInfoFirstName')}
                    <input className={styles.input} type="text" name="firstName" value={partnerInfo.firstName} onChange={handleInputChange} />
                  </label>
                  <label>
                    {t('compatibility.partnerInfoLastName')}
                    <input className={styles.input} type="text" name="lastName" value={partnerInfo.lastName} onChange={handleInputChange} />
                  </label>  
                </div>
                <label>
                  {t('compatibility.partnerInfoSex')}
                  <select className={styles.select} name="sex" value={partnerInfo.sex} onChange={handleInputChange}>
                    <option value="">{t('compatibility.selectPlaceholder')}</option>
                    <option value="male">{t('compatibility.sexMale')}</option>
                    <option value="female">{t('compatibility.sexFemale')}</option>
                    <option value="other">{t('compatibility.sexOther')}</option>
                  </select>
                </label>
                <label>
                  {t('compatibility.partnerInfoRelationshipStatus')}
                  <select className={styles.select} name="relationshipStatus" value={partnerInfo.relationshipStatus} onChange={handleInputChange}>
                    <option value="">{t('compatibility.selectPlaceholder')}</option>
                    <option value="inRelationship">{t('compatibility.statusInRelationship')}</option>
                    <option value="married">{t('compatibility.statusMarried')}</option>
                    <option value="lovers">{t('compatibility.statusLovers')}</option>
                    <option value="divorced">{t('compatibility.statusDivorced')}</option>
                    <option value="freinds">{t('compatibility.statusFriends')}</option>
                    <option value="complicated">{t('compatibility.statusComplicated')}</option>
                  </select>
                </label>
                <FeatureButton
                  loading={loading}
                  remainingUses={remainingUses}
                  onFreeAction={requestCompatibility}
                  onPaidAction={() => console.log("Paid compatibility requested")}
                  freeActionTextKey="compatibility.buttons.checkCompatibility"
                  paidActionTextKey="compatibility.buttons.usePaidCompatibility"
                  starsAmount={tariffs.compatibilityStarsAmount}
                />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Compatibility;
