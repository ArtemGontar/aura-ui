import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@telegram-apps/telegram-ui";
import styles from "./EditUser.module.css";
import DatePicker from "../DatePicker/DatePicker";
import { updateUserData } from "../../services/userService";
import { useUserData } from "../../hooks/useUserData";
import useTelegramHaptics from "../../hooks/useTelegramHaptic";
import { useNavigate } from "react-router-dom";

const EditUser: React.FC = () => {
  const { t } = useTranslation();
  const { userData } = useUserData();
  const haptics = useTelegramHaptics();
  const navigate = useNavigate();

  const [birthDate, setBirthDate] = useState({
    day: userData?.dateOfBirth?.split("-")[2] || "",
    month: userData?.dateOfBirth?.split("-")[1] || "",
    year: userData?.dateOfBirth?.split("-")[0] || "",
  });
  const [sex, setSex] = useState(userData?.sex || "default");
  const [maritalStatus, setMaritalStatus] = useState(userData?.maritalStatus || "default");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    haptics.notificationOccurred("success");
    setLoading(true);
    setError("");
    try {
      const dateOfBirth = `${birthDate.year}-${birthDate.month.padStart(2, "0")}-${birthDate.day.padStart(2, "0")}`;
      if (userData) {
        await updateUserData({ ...userData, dateOfBirth, sex, maritalStatus });
        navigate(-1);
      } else {
        haptics.notificationOccurred("error");
      }
    } catch (err) {
      setError(t("editUser.saveError"));
      haptics.notificationOccurred("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.editUserWrapper}>
      <h3>{t("editUser.title")}</h3>
      <div className={styles.field}>
        <label>{t("editUser.birthDate")}</label>
        <DatePicker
          onChange={(date) => setBirthDate(date)}
        />
      </div>
      <div className={styles.field}>
        <label>{t("editUser.sex")}</label>
        <select
          className={styles.select}
          value={sex}
          onChange={(e) => {
            haptics.selectionChanged();
            setSex(e.target.value);
          }}
        >
          <option value="default">{t("editUser.default")}</option>
          <option value="female">{t("editUser.female")}</option>
          <option value="male">{t("editUser.male")}</option>
          <option value="other">{t("editUser.other")}</option>
        </select>
      </div>
      <div className={styles.field}>
        <label>{t("editUser.maritalStatus")}</label>
        <select
          className={styles.select}
          value={maritalStatus}
          onChange={(e) => {
            haptics.selectionChanged();
            setMaritalStatus(e.target.value);
          }}
        >
          <option value="default">{t("editUser.default")}</option>
          <option value="single">{t("editUser.single")}</option>
          <option value="married">{t("editUser.married")}</option>
          <option value="divorced">{t("editUser.divorced")}</option>
          <option value="widowed">{t("editUser.widowed")}</option>
        </select>
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <Button
        className={styles.saveButton}
        onClick={handleSave}
        disabled={loading}
      >
        {loading ? t("loading") : t("editUser.save")}
      </Button>
    </div>
  );
};

export default EditUser;
