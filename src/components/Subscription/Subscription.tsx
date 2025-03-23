import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./Subscription.module.css";
import { createInvoiceLink } from "../../services/paymentService";
import WebApp from "@twa-dev/sdk";
import useTelegramHaptics from "../../hooks/useTelegramHaptic";

interface SubscriptionProps {
  isSubscribed: boolean;
}

const Subscription: React.FC<SubscriptionProps> = ({ isSubscribed }) => {
  const { t } = useTranslation();
  const { notificationOccurred } = useTelegramHaptics();

  const handleSubscribe = async () => {
    // Replace 'invoice_payload' with the actual payload for the invoice
    var invoiceLink = await createInvoiceLink();
    WebApp.openInvoice(invoiceLink, function(status) {
      if (status == 'paid') {
        notificationOccurred('success');
      } else if (status == 'failed') {
        notificationOccurred('error');
      } else {
        notificationOccurred('warning');      }
    });
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
          onClick={handleSubscribe}
        >
          {t('profile.subscription.subscribe')}
        </button>
      )}
    </section>
  );
};

export default Subscription;
