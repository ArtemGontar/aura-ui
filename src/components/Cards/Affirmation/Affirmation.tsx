import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./Affirmation.module.css";
import { getAffirmation } from "../../../services/predictionService";
// Remove the Select import from @telegram-apps/telegram-ui
import AffirmationResult from "./AffirmationResult";
import Banner from "../../Banner/Banner";
import { Goal } from "lucide-react";
import { useQuotas } from "../../../hooks/useQuotas";
import { PredictionType } from "../../../types/prediction";
import FeatureButton from "../../FeatureButton/FeatureButton";
import useTelegramHaptics from "../../../hooks/useTelegramHaptic";
import tariffs from "../../../constants/tariffs"; // Import the config file

const Affirmation: React.FC = () => {
  const { t } = useTranslation();
  const [affirmation, setAffirmation] = useState<{ text: string; } | null>(null);
  const { remainingUses, useFeature } = useQuotas(PredictionType.Affirmation);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [goal, setGoal] = useState<string>("career");
  const haptics = useTelegramHaptics();

  const requestAffirmation = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getAffirmation(goal);
      setAffirmation(data);
      useFeature();
      haptics.notificationOccurred("success");
    } catch {
      setError(t("cards.error"));
      haptics.notificationOccurred("error");
    } finally {
      setLoading(false);
    }
  };

  const requestPaidAffirmation = async () => {
    console.log("Paid action triggered");
  }

  return (
    <div className={styles.affirmationContainer}>
      <Banner 
        headerText={t('affirmation.banner.title')} 
        subText={t('affirmation.banner.subtitle')} 
        bgColor={styles.bannerBackground}
        icon={<Goal className="w-8 h-8 mb-4 text-white" />} 
      />
      <div className={styles.selectContainer}>
        <label htmlFor="goalSelect" className={styles.label}>{t("affirmation.goal.label")}</label>
        <select
          id="goalSelect"
          className={styles.select}
          value={goal}
          onChange={(event) => setGoal(event.target.value)}
        >
          <option value="career">
            {t("affirmation.goal.options.career")}
          </option>
          <option value="health">
            {t("affirmation.goal.options.health")}
          </option>
          <option value="relationships">
            {t("affirmation.goal.options.relationships")}
          </option>
        </select>
      </div>
      <FeatureButton
        loading={loading}
        remainingUses={remainingUses}
        onFreeAction={requestAffirmation}
        onPaidAction={requestPaidAffirmation}
        freeActionTextKey="affirmation.buttons.generate"
        paidActionTextKey="affirmation.buttons.generatePaid"
        starsAmount={tariffs.affirmationStarsAmount}
      />
      {error && <div className={styles.error}>{error}</div>}
      {!loading && affirmation && (
        <AffirmationResult affirmation={affirmation} />
      )}
    </div>
  );
};

export default Affirmation;
