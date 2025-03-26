import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@telegram-apps/telegram-ui";
import styles from "./Onboarding.module.css";
import useTelegramHaptics from "../../hooks/useTelegramHaptic";
import { Drawer } from 'vaul';
import { updateUserData } from "../../services/userService";
import DatePicker from "../DatePicker/DatePicker";

const Onboarding: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [birthDate, setBirthDate] = useState({ day: "", month: "", year: "" });
  const [sex, setSex] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const haptics = useTelegramHaptics();

  const handleNextStep = () => {
    haptics.selectionChanged();
    setStep((prev) => prev + 1);
  };

  const handleFinish = async () => {
    haptics.notificationOccurred("success");
    setLoading(true);
    setError("");
    try {
      const dateOfBirth = `${birthDate.year}-${birthDate.month.padStart(2, "0")}-${birthDate.day.padStart(2, "0")}`;
      await updateUserData(1, { dateOfBirth, sex, maritalStatus });
      onComplete();
    } catch (err) {
      setError(t("onboarding.errorSavingData"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.onboarding}>
      <Drawer.Root>
        <Drawer.Trigger>                  
          <span>{t("onboarding.openDrawer")}</span>
        </Drawer.Trigger>
        <Drawer.Portal container={document.getElementById('telegram-root')!}>
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content className={`${styles.onboardingContent} fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl p-4`}>
            <Drawer.Handle />
            <div className={styles.onboardingContentWrapper}>
              {step === 1 && (
                <>
                  <h4>{t("onboarding.enterBirthDate")}</h4>
                  <DatePicker
                    onChange={(date) => setBirthDate(date)}
                  />
                  <Button
                    onClick={handleNextStep}
                    disabled={!birthDate.day || !birthDate.month || !birthDate.year}
                  >
                    {t("onboarding.next")}
                  </Button>
                </>
              )}
              {step === 2 && (
                <>
                  <h4>{t("onboarding.enterSex")}</h4>
                  <select
                    className={styles.select}
                    value={sex}
                    onChange={(e) => {
                      haptics.selectionChanged();
                      setSex(e.target.value);
                    }}
                  >
                    <option value="">{t("onboarding.selectSex")}</option>
                    <option value="male">{t("onboarding.male")}</option>
                    <option value="female">{t("onboarding.female")}</option>
                    <option value="other">{t("onboarding.other")}</option>
                  </select>
                  <Button
                    className={styles.button}
                    onClick={handleNextStep}
                    disabled={!sex}
                  >
                    {t("onboarding.next")}
                  </Button>
                </>
              )}
              {step === 3 && (
                <div>
                  <h4>{t("onboarding.enterMaritalStatus")}</h4>
                  <select
                    className={styles.select}
                    value={maritalStatus}
                    onChange={(e) => {
                      haptics.selectionChanged();
                      setMaritalStatus(e.target.value);
                    }}
                  >
                    <option value="">{t("onboarding.selectMaritalStatus")}</option>
                    <option value="single">{t("onboarding.single")}</option>
                    <option value="married">{t("onboarding.married")}</option>
                    <option value="divorced">{t("onboarding.divorced")}</option>
                    <option value="widowed">{t("onboarding.widowed")}</option>
                  </select>
                  <Button
                    className={styles.button}
                    onClick={handleFinish}
                    disabled={!maritalStatus || loading}
                  >
                    {loading ? t("loading") : t("onboarding.finish")}
                  </Button>
                  {error && <p className={styles.error}>{error}</p>}
                </div>
              )}
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
};

export default Onboarding;
