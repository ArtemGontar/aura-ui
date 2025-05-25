import { useEffect, useCallback } from "react"; // Added useCallback, removed React
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import styles from "./Profile.module.css";
import { useUserData } from "../../hooks/useUserData";
import PredictionHistory from "../PredictionHistory/PredictionHistory";
import { ProfileProps } from "../../types/profile";
import Subscription from "../Subscription/Subscription";
// deleteUser import removed, now handled by useDeleteAccount
import ProfileHeader from "./ProfileHeader";
import { fetchUserSubscriptionAsync } from "../../store/slices/userSlice";
import WebApp from "@twa-dev/sdk"; // WebApp might still be used by other parts or TWA specific features
import { AppDispatch } from "../../store";
import { useDeleteAccount } from "../../hooks/useDeleteAccount"; // Added import

const Profile: React.FC<ProfileProps> = ({ className }) => {
  const { t } = useTranslation();
  const { isUserLoading, error, userData, userSubscription, isSubscriptionLoading } = useUserData();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const { 
    confirmAndDeleteAccount, 
    isDeleting, 
    deleteError 
  } = useDeleteAccount({ userId: userData?.id, t });

  const handleEditClick = useCallback(() => {
    navigate('/edit-user');
  }, [navigate]);

  useEffect(() => {
    if (userData?.id) {
      dispatch(fetchUserSubscriptionAsync(userData.id));
    }
  }, [userData?.id, dispatch]); // userData.id for more specific dependency

  // handleDeleteAccount function is removed

  if (isUserLoading) {
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
      <ProfileHeader
        photoUrl={userData.photoUrl}
        displayName={displayName || ''}
        username={userData.username}
        onEditClick={handleEditClick}
        t={t}
      />

      <Subscription 
        isSubscribed={userSubscription?.isActive}
        subscription={userSubscription}
        isLoading={isSubscriptionLoading}
      />

      <PredictionHistory />

      {/* Optional: Display deleteError prominently if needed */}
      {deleteError && <p className={styles.error} role="alert">{deleteError}</p>}

      <button
        className={styles.deleteButton}
        onClick={confirmAndDeleteAccount}
        disabled={isDeleting}
      >
        {isDeleting ? t('profile.deleting', 'Deleting...') : t('profile.deleteAccount', 'Delete Account')}
      </button>
    </div>
  );
};

export default Profile;
