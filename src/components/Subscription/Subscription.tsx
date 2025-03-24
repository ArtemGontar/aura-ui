import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import styles from "./Subscription.module.css";
import TariffPlans from "../TariffPlans/TariffPlans";

interface SubscriptionProps {
  isSubscribed: boolean;
}

const Subscription: React.FC<SubscriptionProps> = ({ isSubscribed }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleSubscribeClick = () => {
    navigate('/tariff-plans');
  };

  return (
    <section className={styles.subscription} aria-labelledby="subscription-title">
      <h3 id="subscription-title">{t('profile.subscription.title')}</h3>
      {isSubscribed ? (
        <div className={styles.subscribed}>
          <p>{t('profile.subscription.premium.status')}</p>
          <p>{t('profile.subscription.premium.benefits')}</p>
        </div>
      ) : (
        <button 
          className={styles.subscribeButton}
          aria-label={t('profile.subscription.subscribe')}
          onClick={handleSubscribeClick}
        >
          {t('profile.subscription.subscribe')}
        </button>
      )}
    </section>
  );
};

export default Subscription;
