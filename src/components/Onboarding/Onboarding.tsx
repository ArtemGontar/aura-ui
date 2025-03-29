import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@telegram-apps/telegram-ui";
import styles from "./Onboarding.module.css";
import useTelegramHaptics from "../../hooks/useTelegramHaptic";
import { updateUserData } from "../../services/userService";
import DatePicker from "../DatePicker/DatePicker";
import { useUserData } from "../../hooks/useUserData";

const Onboarding: React.FC<{ 
  onComplete: () => void; 
  onBirthDateChange: (date: { day: string; month: string; year: string }) => void; 
}> = ({ onComplete, onBirthDateChange }) => {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [birthDate, setBirthDate] = useState({ day: "", month: "", year: "" });
  const [sex, setSex] = useState("female");
  const [maritalStatus, setMaritalStatus] = useState("single");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const haptics = useTelegramHaptics();
  const { userData } = useUserData();

  const handleNextStep = () => {
    haptics.selectionChanged();
    setStep((prev) => prev + 1);
  };

  const handleDateChange = (date: { day: string; month: string; year: string }) => {
    setBirthDate(date);
    onBirthDateChange(date);
  };

  const handleFinish = async () => {
    haptics.notificationOccurred("success");
    setLoading(true);
    setError("");
    try {
      const dateOfBirth = `${birthDate.year}-${birthDate.month.padStart(2, "0")}-${birthDate.day.padStart(2, "0")}`;
      if (userData) {
        await updateUserData({ ...userData, dateOfBirth, sex, maritalStatus });
      } else {
        haptics.notificationOccurred("error");
      }
      onComplete();
    } catch (err) {
      haptics.notificationOccurred("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className={styles.onboardingContentWrapper}>
        {step === 1 && (
          <>
            <h4>{t("onboarding.enterBirthDate")}</h4>
            <DatePicker
              className={styles.datePicker}
              onChange={handleDateChange}
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
              <option value="female">{t("onboarding.female")}</option>
              <option value="male">{t("onboarding.male")}</option>
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
          <>
            <h4>{t("onboarding.enterMaritalStatus")}</h4>
            <select
              className={styles.select}
              value={maritalStatus}
              onChange={(e) => {
                haptics.selectionChanged();
                setMaritalStatus(e.target.value);
              }}
            >
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
            <p className={styles.comment}>
              {t('onboarding.comment')}
            </p>
            {error && <p className={styles.error}>{error}</p>}
          </>
        )}
      </div>
    </>
  );
};

export default Onboarding;
