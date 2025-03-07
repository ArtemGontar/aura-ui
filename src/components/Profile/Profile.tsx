import React from "react";
import styles from "./Profile.module.css";
import { ProfileProps } from "../../types";
import { useProfileData } from "../../hooks/useProfileData";

const Profile: React.FC<ProfileProps> = ({ className }) => {
  const { isLoading, error, profileData, handleSubscribe } = useProfileData();

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

  if (!profileData) {
    return (
      <div className={styles.error} role="alert">
        No profile data found.
      </div>
    );
  }

  return (
    <div className={`${styles.container} ${className || ''}`}>
      {/* Profile Info */}
      <section className={styles.profileInfo} aria-labelledby="profile-title">
        <img
          src={profileData.avatar}
          alt={`${profileData.name}'s avatar`}
          className={styles.avatar}
          loading="lazy"
        />
        <div className={styles.userInfo}>
          <h2 id="profile-title" className={styles.name}>{profileData.name}</h2>
          <p className={styles.email}>{profileData.email}</p>
        </div>
      </section>

      {/* Subscription Section */}
      <section className={styles.subscription} aria-labelledby="subscription-title">
        <h3 id="subscription-title">Subscription</h3>
        {profileData.subscribed ? (
          <div className={styles.subscribed}>
            <p>Plan: {profileData.subscription?.plan}</p>
            <p>Expires on: {profileData.subscription?.expiration}</p>
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
        {profileData.predictions.length > 0 ? (
          <ul className={styles.predictionList}>
            {profileData.predictions.map((prediction, index) => (
              <li key={index} className={styles.predictionItem}>
                <div className={styles.predictionHeader}>
                  <span className={styles.predictionDate}>{prediction.date}</span>
                  <span className={styles.predictionType}>{prediction.type}</span>
                </div>
                <p className={styles.predictionResult}>{prediction.result}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.noPredictions}>No predictions found.</p>
        )}
      </section>
    </div>
  );
};

export default Profile;
