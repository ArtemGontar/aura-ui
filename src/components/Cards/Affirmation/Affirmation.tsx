import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./Affirmation.module.css";
import { getAffirmation } from "../../../services/predictionService";
import { Button } from "@telegram-apps/telegram-ui";
import { Autocomplete, TextField } from "@mui/material";
import AffirmationResult from "./AffirmationResult";
import Banner from "../../Banner/Banner";
import { Goal } from "lucide-react";

const Affirmation: React.FC = () => {
  const { t } = useTranslation();
  const [affirmation, setAffirmation] = useState<{ text: string; } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [goals, setGoals] = useState<string[]>([]);

  const fetchAffirmation = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getAffirmation(goals);
      setAffirmation(data);
    } catch {
      setError(t("cards.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.affirmationContainer}>
      <Banner 
        headerText={t('affirmation.banner.title')} 
        subText={t('affirmation.banner.subtitle')} 
        bgColor={styles.bannerBackground}
        icon={<Goal className="w-8 h-8 mb-4 text-white" fill="white" />} 
      />
      <div className={styles.goalContainer}>
        <Autocomplete
          multiple
          sx={{ width: '80%' }}
          options={[
            t("affirmation.goal.options.career"),
            t("affirmation.goal.options.health"),
            t("affirmation.goal.options.relationships"),
          ]}
          value={goals}
          onChange={(_event, newValue) => setGoals(newValue)}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              placeholder={t("affirmation.goal.selectPlaceholder")}
            />
          )}
        />
      </div>
      <Button className={styles.button} onClick={fetchAffirmation} disabled={loading}>
        {loading ? t("cards.loading") : t("affirmation.buttons.generate")}
      </Button>
      {error && <div className={styles.error}>{error}</div>}
      {!loading && affirmation && (
        <AffirmationResult affirmation={affirmation} />
      )}
    </div>
  );
};

export default Affirmation;
