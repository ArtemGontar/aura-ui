import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./TariffPlans.module.css";
import { createInvoiceLink } from "../../services/paymentService";
import WebApp from "@twa-dev/sdk";
import useTelegramHaptics from "../../hooks/useTelegramHaptic";

const TariffPlans: React.FC = () => {
  const { t } = useTranslation();
  const { notificationOccurred } = useTelegramHaptics();

  const tariffPlans = [
    {
      id: 1,
      title: t('profile.subscription.basic.title'),
      description: t('profile.subscription.basic.description'),
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
      bonuses: [
        t('profile.subscription.ultimate.bonuses.part1'),
        t('profile.subscription.ultimate.bonuses.part2'),
        t('profile.subscription.ultimate.bonuses.part3')
      ]
    }
  ];

  const handleSubscribe = async (id: number, title: string, description: string) => {
    var invoiceLink = await createInvoiceLink(id, title, description, "XTR");
    WebApp.openInvoice(invoiceLink, function(status) {
      if (status == 'paid') {
        notificationOccurred('success');
      } else if (status == 'failed') {
        notificationOccurred('error');
      } else {
        notificationOccurred('warning');
      }
    });
  };

  return (
    <div className={styles.tariffPlans}>
      <h3>{t('profile.subscription.choosePlan')}</h3>
      {tariffPlans.map((plan, index) => (
        <div key={index} className={styles.plan}>
          <h4>{plan.title}</h4>
          {plan.bonuses.map((desc, idx) => (
            <p key={idx}>{desc}</p>
          ))}
          <button onClick={() => handleSubscribe(plan.id, plan.title, plan.description)}>{t('profile.subscription.subscribe')}</button>
        </div>
      ))}
    </div>
  );
};

export default TariffPlans;
