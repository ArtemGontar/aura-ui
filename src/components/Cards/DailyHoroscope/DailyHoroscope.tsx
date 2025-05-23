import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import commonStyles from "../Cards.module.css";
import styles from "./DailyHoroscope.module.css";
import { getHoroscope } from "../../../services/predictionService";
import { useUserData } from "../../../hooks/useUserData";
import useTelegramHaptics from "../../../hooks/useTelegramHaptic";
import Onboarding from "../../Onboarding/Onboarding";
import { Drawer } from "vaul";
import { calculateZodiacSign } from "../../../utils/calculateZodiacSign";
import HoroscopeResult from "../HoroscopeResult/HoroscopeResult";
import { HoroscopeData } from "../../../types/prediction";
import { useQuotas } from "../../../hooks/useQuotas";
import FeatureButton from "../../FeatureButton/FeatureButton";
import tariffs from "../../../constants/tariffs";
import { createInvoiceLink } from "../../../services/paymentService";
import WebApp from "@twa-dev/sdk";
import { FeatureType, PRODUCT_NAME_KEYS } from "../../../constants/products";

const DailyHoroscope: React.FC = () => {
  const { t } = useTranslation();
  const { impactOccurred, notificationOccurred } = useTelegramHaptics();
  const { remainingUses, useFeature } = useQuotas("DailyHoroscope");
  const [horoscope, setHoroscope] = useState<HoroscopeData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [horoscopeSign, setHoroscopeSign] = useState("undefined");
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);

  const handleUserDataChange = (userData: any) => {
    if (userData?.zodiacSign === "" || userData?.dateOfBirth) {
      setHoroscopeSign(userData?.zodiacSign || "undefined");
      setShowOnboarding(!userData?.dateOfBirth || !userData?.sex || !userData?.maritalStatus);
    }

  };

  const { userData } = useUserData(handleUserDataChange);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    if (userData?.dateOfBirth) {
      setHoroscopeSign(userData.zodiacSign || "undefined");
    }
  };

  const handleBirthDateChange = (date: { day: string; month: string; year: string }) => {
    const zodiacSign = calculateZodiacSign(date);
    setHoroscopeSign(zodiacSign);
  };

  useEffect(() => {
    if (horoscopeSign) {
      setBackgroundImage(`/images/horoscope-signs/${horoscopeSign.toLowerCase()}.png`);
    }
  }, [horoscopeSign]);

  const requestHoroscope = async () => {
    setLoading(true);
    setError("");
    impactOccurred("medium");
    try {
      const fetchedHoroscope: HoroscopeData = await getHoroscope();
      setHoroscope(fetchedHoroscope);
      useFeature();
    } catch {
      setError(t("cards.error"));
    } finally {
      setLoading(false);
    }
  };

  const requestPaidHoroscope = async () => {
      const featureId = FeatureType.DailyHoroscope;
      const featureName = t(PRODUCT_NAME_KEYS[featureId]);
      const invoiceLink = await createInvoiceLink(featureId, featureName, t("dailyHoroscope.description"), "XTR", false);
      WebApp.openInvoice(invoiceLink, async (status) => {
        if (status === 'paid') {
          await requestHoroscope();
          notificationOccurred('success');
        } else if (status === 'failed') {
          notificationOccurred('error');
        } else {
          notificationOccurred('warning');
        }
      });
    };

  return (
    <div className={commonStyles.card}>
      <h2 className={commonStyles.title}>{t("dailyHoroscope.title")}</h2>
      <p className={commonStyles.description}>{t("dailyHoroscope.description")}</p>
      <div className={styles.titleContainer}>
        <div className={`${styles.horoscopeImageContainer} ${backgroundImage ? styles.visible : styles.hidden}`}>
          {backgroundImage && (
            <img
              src={backgroundImage}
              alt={horoscopeSign || "Horoscope Sign"}
              className={styles.horoscopeImage}
            />
          )}
        </div>
        {showOnboarding ? (
          <Drawer.Root>
            <Drawer.Trigger>
              <span className={styles.triggerButton}>{t("onboarding.openDrawer")}</span>
            </Drawer.Trigger>
            <Drawer.Portal container={document.getElementById('telegram-root')!}>
              <Drawer.Overlay className="fixed inset-0 bg-black/40" />
              <Drawer.Content className={`${styles.onboardingContent} fixed bottom-0 left-0 right-0 rounded-t-2xl p-4`}>
                <Drawer.Handle />
                <Onboarding 
                  onComplete={handleOnboardingComplete} 
                  onBirthDateChange={handleBirthDateChange} 
                />
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
        ) : (
          <FeatureButton
            loading={loading}
            remainingUses={remainingUses}
            onFreeAction={requestHoroscope}
            onPaidAction={requestPaidHoroscope}
            freeActionTextKey="dailyHoroscope.buttons.getHoroscope"
            paidActionTextKey="dailyHoroscope.buttons.usePaidPrediction"
            starsAmount={tariffs.dailyHoroscopeStarsAmount}
          />
        )}
      </div>
      {horoscope &&
        <HoroscopeResult horoscope={horoscope} />
      }
      {error && <p className={styles.error}>{error}</p>}

    </div>
  );
};

export default DailyHoroscope;