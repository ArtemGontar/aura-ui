import React from "react";
import styles from "./Profile.module.css";

const Profile: React.FC = () => {
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    subscribed: false, // Change to true for testing the subscribed state
    subscription: {
      plan: "Premium",
      expiration: "2025-01-31",
    },
    predictions: [
      { date: "2025-01-05", type: "Daily Horoscope", result: "Positive vibes await you today!" },
      { date: "2025-01-04", type: "Magic Ball", result: "Yes, the answer is clear!" },
      { date: "2025-01-03", type: "Astrology", result: "Your rising sign brings harmony to your relationships." },
    ],
  };

  return (
    <div className={styles.container}>
      {/* Profile Info */}
      <div className={styles.profileInfo}>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRetqGORHJAzupIKNuFDrFOkfl0K0ux_bOEHw&s"
          alt={user.name}
          className={styles.avatar}
        />
        <div className={styles.userInfo}>
          <h2 className={styles.name}>{user.name}</h2>
          <p className={styles.email}>{user.email}</p>
        </div>
      </div>

      {/* Subscription Section */}
      <div className={styles.subscription}>
        <h3>Subscription</h3>
        {user.subscribed ? (
          <div className={styles.subscribed}>
            <p>Plan: {user.subscription.plan}</p>
            <p>Expires on: {user.subscription.expiration}</p>
          </div>
        ) : (
          <button className={styles.subscribeButton}>Subscribe Now</button>
        )}
      </div>

      {/* Prediction History Section */}
      <div className={styles.history}>
        <h3>Prediction History</h3>
        {user.predictions.length > 0 ? (
          <ul className={styles.predictionList}>
            {user.predictions.map((prediction, index) => (
              <li key={index} className={styles.predictionItem}>
                <p>
                  <strong>Date:</strong> {prediction.date}
                </p>
                <p>
                  <strong>Type:</strong> {prediction.type}
                </p>
                <p>
                  <strong>Result:</strong> {prediction.result}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No predictions found.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
