import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import DatePicker from "../DatePicker/DatePicker";
import { saveUserBirthDate } from "../../services/userService";
import { Button } from "@telegram-apps/telegram-ui";
import styles from "./BirthDatePicker.module.css";

const BirthDatePicker: React.FC = () => {
  const { t } = useTranslation();
  const [birthDate, setBirthDate] = useState({ day: "", month: "", year: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleBirthDateChange = (field: string, value: string) => {
    setBirthDate((prev) => ({ ...prev, [field]: value }));
  };

  const saveBirthDate = async () => {
    setLoading(true);
    setError("");
    try {
      const formattedDate = `${birthDate.year}-${birthDate.month.padStart(2, "0")}-${birthDate.day.padStart(2, "0")}`;
      await saveUserBirthDate(formattedDate);
    } catch {
      setError(t("dailyHoroscope.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.birthDatePicker}>
      <DatePicker 
        {...birthDate} 
        days={Array.from({ length: 31 }, (_, i) => i + 1)}
        months={Array.from({ length: 12 }, (_, i) => i + 1)}
        years={Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i)}
        handleDayChange={(e) => handleBirthDateChange("day", e.target.value)}
        handleMonthChange={(e) => handleBirthDateChange("month", e.target.value)}
        handleYearChange={(e) => handleBirthDateChange("year", e.target.value)}
      />
      {birthDate.day && birthDate.month && birthDate.year && (
        <Button onClick={saveBirthDate} disabled={loading}>
          {loading ? t("dailyHoroscope.loading") : t("dailyHoroscope.buttons.saveBirthDate")}
        </Button>
      )}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default BirthDatePicker;
