import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './DatePicker.module.css';
import useTelegramHaptics from "../../hooks/useTelegramHaptic";

interface DatePickerProps {
  onChange?: (date: { day: string; month: string; year: string }) => void;
  date?: string;
  className?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({ onChange, date, className }) => {
  const { t } = useTranslation();
  const haptics = useTelegramHaptics();
  const [dateValue, setDateValue] = useState('');

  useEffect(() => {
    if (date) {
      setDateValue(date);
    } else {
      // Use today's date as default if no date prop provided
      const today = new Date();
      const defaultDate = today.toISOString().split('T')[0];
      setDateValue(defaultDate);
    }
  }, [date]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    const newDay = date.getDate().toString();
    const newMonth = (date.getMonth() + 1).toString();
    const newYear = date.getFullYear().toString();
    haptics.impactOccurred("light");
    if (onChange) {
      onChange({ day: newDay, month: newMonth, year: newYear });
    }
    setDateValue(e.target.value);
  };

  return (
    <div className={`${styles.datePickerContainer} ${className || ''}`}>
      <input
        type="date"
        id="date-input"
        value={dateValue}
        onChange={handleDateChange}
        className={styles.dateInput}
        max={new Date().toISOString().split('T')[0]}
        aria-label={t('dailyHoroscope.datePicker.label')}
      />
    </div>
  );
};

export default DatePicker;