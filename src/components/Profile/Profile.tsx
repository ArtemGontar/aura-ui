import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./Profile.module.css";
import { ProfileProps } from "../../types";
import { useUserData } from "../../hooks/useUserData";

const Profile: React.FC<ProfileProps> = ({ className }) => {
  const { t } = useTranslation();
  const { isLoading, error, userData } = useUserData();

  if (isLoading) {
    return (
      <div className={styles.loading} role="status" aria-label={t('profile.loading')}>
        {t('profile.loading')}
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error} role="alert">
        {error}
      </div>
    );
  }

  if (!userData) {
    return (
      <div className={styles.error} role="alert">
        {t('profile.noData')}
      </div>
    );
  }

  const fullName = `${userData.firstName}${userData.lastName ? ` ${userData.lastName}` : ''}`;
  const displayName = userData.username || fullName;

  return (
    <div className={`${styles.container} ${className || ''}`}>
      {/* Profile Info */}
      <section className={styles.profileInfo} aria-labelledby="profile-title">
        <img
          src={userData.photoUrl || '/default-avatar.png'}
          alt={`${displayName}'s avatar`}
          className={styles.avatar}
          loading="lazy"
        />
        <div className={styles.userInfo}>
          <h2 id="profile-title" className={styles.name}>{displayName}</h2>
          {userData.username && (
            <p className={styles.email}>@{userData.username}</p>
          )}
        </div>
      </section>

      {/* Subscription Section */}
      <section className={styles.subscription} aria-labelledby="subscription-title">
        <h3 id="subscription-title">{t('profile.subscription.title')}</h3>
        {userData.isPremium ? (
          <div className={styles.subscribed}>
            <p>{t('profile.subscription.premium.status')}</p>
            <p>{t('profile.subscription.premium.benefits')}</p>
          </div>
        ) : (
          <button 
            className={styles.subscribeButton}
            aria-label={t('profile.subscription.subscribe')}
          >
            {t('profile.subscription.subscribe')}
          </button>
        )}
      </section>

      {/* Prediction History Section */}
      <section className={styles.history} aria-labelledby="history-title">
        <h3 id="history-title">{t('profile.history.title')}</h3>
        <ul className={styles.predictionList}>
          <li className={styles.predictionItem}>
            <p className={styles.noPredictions}>{t('profile.history.noPredictions')}</p>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Profile;
