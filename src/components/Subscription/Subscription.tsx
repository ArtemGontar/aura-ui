import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { UserSubscription } from "../../services/userSubscriptionService";
import styles from "./Subscription.module.css";
import { Button } from "@telegram-apps/telegram-ui";

interface SubscriptionProps {
  isSubscribed?: boolean;
  subscription?: UserSubscription | null;
  isLoading?: boolean;
}

const Subscription: React.FC<SubscriptionProps> = ({ 
  isSubscribed: isSubscribedProp, 
  subscription, 
  isLoading = false 
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSubscribeClick = () => {
    navigate('/tariff-plans');
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString();
  };

  const isUserSubscribed = isSubscribedProp !== undefined ? isSubscribedProp : (subscription && subscription.isActive);

  return (
    <section className={styles.subscription} aria-labelledby="subscription-title">
      <h3 id="subscription-title">{t('profile.subscription.title')}</h3>
      {isLoading ? (
        <p>{t('loading')}</p>
      ) : isUserSubscribed ? (
        <div className={styles.subscribed}>
          {subscription ? (
            <>
              <p><strong>{subscription.name}</strong></p>
              <p>{t('profile.subscription.startDate')}: {formatDate(subscription.startDate)}</p>
              {subscription.endDate && (
                <p>{t('profile.subscription.endDate')}: {formatDate(subscription.endDate)}</p>
              )}
            </>
          ) : (
            <>
              <p>{t('profile.subscription.premium.status')}</p>
              <p>{t('profile.subscription.premium.benefits')}</p>
            </>
          )}
        </div>
      ) : (
        <Button 
          className={styles.subscribeButton}
          onClick={handleSubscribeClick}
        >
          {t('profile.subscription.subscribe')}
        </Button>
      )}
    </section>
  );
};

export default Subscription;
