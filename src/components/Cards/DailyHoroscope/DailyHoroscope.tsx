import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import commonStyles from "../Cards.module.css";
import styles from "./DailyHoroscope.module.css";
import { getHoroscope } from "../../../services/predictionService";
import { useUserData } from "../../../hooks/useUserData";
import { Button } from "@telegram-apps/telegram-ui";
import useTelegramHaptics from "../../../hooks/useTelegramHaptic";
import Onboarding from "../../Onboarding/Onboarding";
import { Drawer } from "vaul";
import { calculateZodiacSign } from "../../../utils/calculateZodiacSign";
import HoroscopeResult from "../HoroscopeResult/HoroscopeResult";
import { HoroscopeData } from "../../../types/prediction";
import { useQuotas } from "../../../hooks/useQuotas";
import { Link } from "react-router-dom";

const DailyHoroscope: React.FC = () => {
  const { t } = useTranslation();
  const haptics = useTelegramHaptics();
  const { remainingUses, useFeature } = useQuotas("DailyHoroscope");
  const [horoscope, setHoroscope] = useState<HoroscopeData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [horoscopeSign, setHoroscopeSign] = useState("aries");
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(false);

  const handleUserDataChange = (userData: any) => {
    setHoroscopeSign(userData?.zodiacSign || "aries");
    setShowOnboarding(!userData?.dateOfBirth || !userData?.sex || !userData?.maritalStatus);
  };

  const { userData } = useUserData(handleUserDataChange);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    if (userData?.dateOfBirth) {
      setHoroscopeSign(userData.zodiacSign || "aries");
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
    haptics.impactOccurred("medium");
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
      //requestHoroscope();  
      console.log("Paid horoscope requested"); // Use standard browser console
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
              <Drawer.Content className={`${styles.onboardingContent} fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4`}>
                <Drawer.Handle />
                <Onboarding 
                  onComplete={handleOnboardingComplete} 
                  onBirthDateChange={handleBirthDateChange} 
                />
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
        ) : (
          <>
            <Button
                onClick={remainingUses > 0 ? requestHoroscope : requestPaidHoroscope}
                disabled={loading}
            >
                {loading
                    ? t("cards.loading")
                    : remainingUses > 0
                    ? t("dailyHoroscope.buttons.getHoroscope")
                    : t("dailyHoroscope.buttons.usePaidPrediction", { stars: 20 })}
            </Button>

            {remainingUses > 0 && (
                <p className="text-sm text-gray-500">
                    {t("dailyHoroscope.freeUsesLeft", { count: remainingUses })}
                </p>
            )}

            {remainingUses === 0 && (
                <p className="text-sm text-gray-500">
                    <Link to="/tariff-plans" className="text-blue-500 underline">
                        {t("cards.upgradeToPremium")}
                    </Link>
                </p>
            )}
          </>
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