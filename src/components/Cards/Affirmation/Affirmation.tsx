import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import styles from "./Affirmation.module.css";
import { getAffirmation } from "../../../services/predictionService";
import { Button } from "@telegram-apps/telegram-ui";

const Affirmation: React.FC = () => {
  const { t } = useTranslation();
  const [affirmation, setAffirmation] = useState<{ message: string; category: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [goal, setGoal] = useState<string>("");

  const fetchAffirmation = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await getAffirmation();
      setAffirmation(data);
    } catch {
      setError(t("cards.error"));
    } finally {
      setLoading(false);
    }
  };

  const handleGoalChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setGoal(value === "custom" ? "" : value);
  };

  const handleCustomGoalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGoal(event.target.value);
  };

  useEffect(() => {
    fetchAffirmation();
  }, []);

  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{t("affirmation.title")}</h2>
      <div className={styles.goalContainer}>
        <label htmlFor="goalSelect">{t("affirmation.goal.label")}</label>
        <select id="goalSelect" value={goal} onChange={handleGoalChange}>
          <option value="">{t("affirmation.goal.selectPlaceholder")}</option>
          <option value="career">{t("affirmation.goal.options.career")}</option>
          <option value="health">{t("affirmation.goal.options.health")}</option>
          <option value="relationships">{t("affirmation.goal.options.relationships")}</option>
          <option value="custom">{t("affirmation.goal.options.custom")}</option>
        </select>
        {goal === "" && (
          <input
            type="text"
            placeholder={t("affirmation.goal.customPlaceholder")}
            value={goal}
            onChange={handleCustomGoalChange}
          />
        )}
      </div>
      {affirmation ? (
        <>
          <p className={styles.message}>{affirmation.message}</p>
          <p className={styles.category}>{t("affirmation.category", { category: affirmation.category })}</p>
        </>
      ) : (
        <p>{loading ? t("cards.loading") : error || t("affirmation.noData")}</p>
      )}
      <Button className={styles.button} onClick={fetchAffirmation} disabled={loading}>
        {loading ? t("cards.loading") : t("affirmation.buttons.refresh")}
      </Button>
    </div>
  );
};

export default Affirmation;
