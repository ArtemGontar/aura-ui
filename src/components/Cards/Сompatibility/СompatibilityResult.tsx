import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './СompatibilityResult.module.css';
import { CompatibilityData } from '../../../types/prediction';
import { PartnerInfo } from '../../../types/partner';

interface CompatibilityResultProps {
  partnerInfo?: PartnerInfo;
  compatibilityResult: CompatibilityData;
}

const CompatibilityResult: React.FC<CompatibilityResultProps> = ({ partnerInfo, compatibilityResult }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.resultContainer}>
      {partnerInfo && (
        <div className={styles.partnerInfo}>
          <h5>{t('compatibility.partnerInfo')}</h5>
          <p>{t('compatibility.partnerInfoFirstName')}: {partnerInfo.firstName || t('compatibility.notFilled')}</p>
          <p>{t('compatibility.partnerInfoLastName')}: {partnerInfo.lastName || t('compatibility.notFilled')}</p>
          <p>{t('compatibility.partnerInfoDateOfBirth')}: {partnerInfo.dateOfBirth || t('compatibility.notFilled')}</p>
          <p>{t('compatibility.partnerInfoSex')}: {partnerInfo.sex ? t(`compatibility.sex${partnerInfo.sex.charAt(0).toUpperCase() + partnerInfo.sex.slice(1)}`) : t('compatibility.notFilled')}</p>
          <p>{t('compatibility.partnerInfoRelationshipStatus')}: {partnerInfo.relationshipStatus ? t(`compatibility.status${partnerInfo.relationshipStatus.charAt(0).toUpperCase() + partnerInfo.relationshipStatus.slice(1)}`) : t('compatibility.notFilled')}</p>
        </div>
      )}
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
  );
};

export default CompatibilityResult;
