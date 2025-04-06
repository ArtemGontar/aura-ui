import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./TariffPlans.module.css";
import { createInvoiceLink } from "../../services/paymentService";
import WebApp from "@twa-dev/sdk";
import useTelegramHaptics from "../../hooks/useTelegramHaptic";
import { Button } from "@telegram-apps/telegram-ui";
import tariffs from "../../config/tariffs";

const TariffPlans: React.FC = () => {
  const { t } = useTranslation();
  const { notificationOccurred } = useTelegramHaptics();
  const [selectedPlan, setSelectedPlan] = useState<number>(1);

  const tariffPlans = [
    {
      id: 1,
      title: t('profile.subscription.basic.title'),
      description: t('profile.subscription.basic.description'),
      cost: tariffs.subscriptionCosts.basic,
      bonuses: [
        t('profile.subscription.basic.bonuses.part1'),
        t('profile.subscription.basic.bonuses.part2'),
        t('profile.subscription.basic.bonuses.part3')
      ]
    },
    {
      id: 2,
      title: t('profile.subscription.premium.title'),
      description: t('profile.subscription.premium.description'),
      cost: tariffs.subscriptionCosts.premium,
      bonuses: [
        t('profile.subscription.premium.bonuses.part1'),
        t('profile.subscription.premium.bonuses.part2'),
        t('profile.subscription.premium.bonuses.part3')
      ]
    },
    {
      id: 3,
      title: t('profile.subscription.ultimate.title'),
      description: t('profile.subscription.ultimate.description'),
      cost: tariffs.subscriptionCosts.ultimate,
      bonuses: [
        t('profile.subscription.ultimate.bonuses.part1'),
        t('profile.subscription.ultimate.bonuses.part2'),
        t('profile.subscription.ultimate.bonuses.part3')
      ]
    }
  ];

  const handleSubscribe = async () => {
    if (selectedPlan === null) return;
    const plan = tariffPlans.find(plan => plan.id === selectedPlan);
    if (!plan) return;

    const invoiceLink = await createInvoiceLink(plan.id, plan.title, plan.description, "XTR");
    WebApp.openInvoice(invoiceLink, (status) => {
      if (status === 'paid') {
        notificationOccurred('success');
      } else if (status === 'failed') {
        notificationOccurred('error');
      } else {
        notificationOccurred('warning');
      }
    });
  };

  return (
    <div className={styles.tariffPlans}>
      <h3>{t('profile.subscription.choosePlan')}</h3>
      {tariffPlans.map((plan) => (
        <div
          key={plan.id}
          className={`${styles.plan} ${selectedPlan === plan.id ? styles.selected : ''}`}
          onClick={() => setSelectedPlan(plan.id)}
        >
          {plan.id === 2 && (
            <span className={styles.recommendationLabel}>
              {t('profile.subscription.recommended')}
            </span>
          )}
          <h4>{plan.title}</h4>
          {plan.bonuses.map((desc, idx) => (
            <p key={idx}>{desc}</p>
          ))}
        </div>
      ))}
      <Button
        className={styles.subscribeButton}
        onClick={handleSubscribe}
        disabled={selectedPlan === null}
      >
        {selectedPlan !== null
          ? `${t('profile.subscription.subscribe')} - ${tariffPlans.find(plan => plan.id === selectedPlan)?.cost} ⭐`
          : t('profile.subscription.subscribe')}
      </Button>
    </div>
  );
};

export default TariffPlans;
