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

const DailyHoroscope: React.FC = () => {
  const { t } = useTranslation();
  const { userData } = useUserData();
  const haptics = useTelegramHaptics();
  const [horoscope, setHoroscope] = useState<{
    generalGuidance: string;
    loveRelationshipsAdvice: string;
    careerFinancialInsights: string;
    focus: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [horoscopeSign, setHoroscopeSign] = useState(userData?.zodiacSign || "aries");
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(!userData?.dateOfBirth || !userData?.sex || !userData?.maritalStatus);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    if (userData?.dateOfBirth) {
      setHoroscopeSign(userData.zodiacSign || "aries");
    }
  };

  const handleBirthDateChange = (date: { day: string; month: string; year: string }) => {
    const zodiacSign = calculateZodiacSign(date); // Assume this function exists
    setHoroscopeSign(zodiacSign);
  };

  useEffect(() => {
    if (userData?.dateOfBirth) {
      setHoroscopeSign(userData.zodiacSign || "aries");
    }
  }, [userData]);

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
      setHoroscope(await getHoroscope());
    } catch {
      setError(t("cards.error"));
    } finally {
      setLoading(false);
    }
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
          <Button onClick={requestHoroscope} disabled={loading}>
            {loading ? t("cards.loading") : t("dailyHoroscope.buttons.getHoroscope")}
          </Button>
        )}
      </div>

      {error && <p className={styles.error}>{error}</p>}
      
      {horoscope && 
       <div className={styles.resultContainer}>
        <h3 className={styles.resultTitle}>{t('dailyHoroscope.generalGuidance')}</h3>
        <p className={styles.resultText}>{horoscope.generalGuidance}</p>
        <h3 className={styles.resultTitle}>{t('dailyHoroscope.loveRelationshipsAdvice')}</h3>
        <p className={styles.resultText}>{horoscope.loveRelationshipsAdvice}</p>
        <h3 className={styles.resultTitle}>{t('dailyHoroscope.careerFinancialInsights')}</h3>
        <p className={styles.resultText}>{horoscope.careerFinancialInsights}</p>
        <h3 className={styles.resultTitle}>{t('dailyHoroscope.focus')}</h3> {/* Added focus section */}
        <p className={styles.resultText}>{horoscope.focus}</p>
       </div>}
    </div>
  );
};

export default DailyHoroscope;