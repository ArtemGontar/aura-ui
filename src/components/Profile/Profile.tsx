import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styles from "./Profile.module.css";
import { useUserData } from "../../hooks/useUserData";
import PredictionHistory from "../PredictionHistory/PredictionHistory";
import { ProfileProps } from "../../types/profile";
import Subscription from "../Subscription/Subscription";
import { deleteUser } from "../../services/userService";
import WebApp from "@twa-dev/sdk";

const Profile: React.FC<ProfileProps> = ({ className }) => {
  const { t } = useTranslation();
  const { isLoading, error, userData } = useUserData();
  const navigate = useNavigate();

  const handleDeleteAccount = async () => {
    WebApp.showConfirm(t('profile.confirmDelete'), async (result) => {
      if (result && userData) {
        try {
          await deleteUser(userData.id);
          WebApp.close();
        } catch (error) {
          console.error("Error deleting account", error);
          alert(t('profile.deleteError'));
        }
      }
    });
  };

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
            <div className={styles.userActions}>
              <p className={styles.email}>@{userData.username}</p>
              <button
                className={styles.editButton}
                onClick={() => navigate('/edit-user')}
              >
                {t('profile.edit')}
              </button>
            </div>
          )}
        </div>
      </section>

      <Subscription isSubscribed={false} />

      <PredictionHistory />

      <button
        className={styles.deleteButton}
        onClick={handleDeleteAccount}
      >
        {t('profile.deleteAccount')}
      </button>
    </div>
  );
};

export default Profile;
