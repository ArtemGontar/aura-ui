import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./Affirmation.module.css";
import { getAffirmation } from "../../../services/predictionService";
import { Button } from "@telegram-apps/telegram-ui";
import { Autocomplete, TextField } from "@mui/material";
import AffirmationResult from "./AffirmationResult";

const Affirmation: React.FC = () => {
  const { t } = useTranslation();
  const [affirmation, setAffirmation] = useState<{ message: string; category: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [goal, setGoal] = useState<string[]>([]);

  const fetchAffirmation = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getAffirmation(goal);
      setAffirmation(data);
    } catch {
      setError(t("cards.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.affirmationContainer}>
      <h2 className={styles.title}>{t("affirmation.title")}</h2>
      <div className={styles.goalContainer}>
        <Autocomplete
          multiple
          sx={{ width: '80%' }}
          options={[
            t("affirmation.goal.options.career"),
            t("affirmation.goal.options.health"),
            t("affirmation.goal.options.relationships"),
          ]}
          value={goal}
          onChange={(_event, newValue) => setGoal(newValue)}
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
      <AffirmationResult affirmation={affirmation} loading={loading} error={error} />
    </div>
  );
};

export default Affirmation;
