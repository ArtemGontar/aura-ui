import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./Profile.module.css";
import { useUserData } from "../../hooks/useUserData";
import PredictionHistory from "../PredictionHistory/PredictionHistory";
import { ProfileProps } from "../../types/profile";
import Subscription from "../Subscription/Subscription";

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

  const fullName = `${userData.firstName} ${userData.lastName ? ` ${userData.lastName}` : ''}`;
  const displayName = fullName || userData.username;

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

      <Subscription isSubscribed={false} />

      <PredictionHistory />
    </div>
  );
};

export default Profile;
