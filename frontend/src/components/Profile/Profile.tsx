import React from "react";
import styles from "./Profile.module.css";

const Profile: React.FC = () => {
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
  };

  return (
    <div className={styles.container}>
      <img
        src="/static/images/avatar/1.jpg"
        alt={user.name}
        className={styles.avatar}
      />
      <h2 className={styles.name}>{user.name}</h2>
      <p className={styles.email}>{user.email}</p>
    </div>
  );
};

export default Profile;
