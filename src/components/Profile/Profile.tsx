import React from "react";
import styles from "./Profile.module.css";
import { ProfileProps } from "../../types";
import { useTelegramUser } from "../../hooks/useTelegramUser";

const Profile: React.FC<ProfileProps> = ({ className }) => {
  const { isLoading, error, userData, handleSubscribe } = useTelegramUser();

  if (isLoading) {
    return (
      <div className={styles.loading} role="status" aria-label="Loading profile data">
        Loading profile data...
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
        No user data found.
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
        <h3 id="subscription-title">Subscription</h3>
        {userData.isPremium ? (
          <div className={styles.subscribed}>
            <p>Premium Member</p>
            <p>Enjoying all features</p>
          </div>
        ) : (
          <button 
            className={styles.subscribeButton}
            onClick={handleSubscribe}
            aria-label="Subscribe to premium plan"
          >
            Subscribe Now
          </button>
        )}
      </section>

      {/* Prediction History Section */}
      <section className={styles.history} aria-labelledby="history-title">
        <h3 id="history-title">Prediction History</h3>
        <ul className={styles.predictionList}>
          <li className={styles.predictionItem}>
            <p className={styles.noPredictions}>No predictions found.</p>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default Profile;
