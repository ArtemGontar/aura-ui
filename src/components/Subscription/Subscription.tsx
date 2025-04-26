import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styles from "./Subscription.module.css";
import { Button } from "@telegram-apps/telegram-ui";
import { UserSubscription } from "../../types/user";
import { formatLocalizedDate } from "../../utils/utils";

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
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const handleSubscribeClick = () => {
    navigate('/tariff-plans');
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
              <p><strong>{subscription.subscription.name}</strong></p>
              <p>{t('profile.subscription.startDate')}: {formatLocalizedDate(subscription.startDate, i18n.language)}</p>
              {subscription.endDate && (
                <p>{t('profile.subscription.endDate')}: {formatLocalizedDate(subscription.endDate, i18n.language)}</p>
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
