import React from 'react';
import { TFunction } from 'i18next';
import styles from './Profile.module.css'; // Using existing styles from Profile.tsx

interface ProfileHeaderProps {
  photoUrl?: string;
  displayName: string;
  username?: string;
  onEditClick: () => void;
  t: TFunction;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  photoUrl,
  displayName,
  username,
  onEditClick,
  t,
}) => {
  return (
    <section className={styles.profileInfo} aria-labelledby="profile-title">
      <img
        src={photoUrl || '/images/default-avatar.png'}
        alt={t('profile.altAvatar', { name: displayName }) || `${displayName}'s avatar`}
        className={styles.avatar}
        loading="lazy"
      />
      <div className={styles.userInfo}>
        <h2 id="profile-title" className={styles.name}>{displayName}</h2>
        {username && (
          <div className={styles.userActions}>
            <p className={styles.email}>@{username}</p>
            <button
              className={styles.editButton}
              onClick={onEditClick}
            >
              {t('profile.edit', 'Edit')}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProfileHeader;
