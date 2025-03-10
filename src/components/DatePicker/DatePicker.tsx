import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './DatePicker.module.css';

interface DatePickerProps {
  day: string;
  month: string;
  year: string;
  days: number[];
  months: number[];
  years: number[];
  handleDayChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleMonthChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleYearChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({
  day,
  month,
  year,
  handleDayChange,
  handleMonthChange,
  handleYearChange,
}) => {
  const { t } = useTranslation();
  const [dateValue, setDateValue] = useState('');

  useEffect(() => {
    if (day && month && year) {
      const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      setDateValue(formattedDate);
    }
  }, [day, month, year]);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(e.target.value);
    const newDay = date.getDate().toString();
    const newMonth = (date.getMonth() + 1).toString();
    const newYear = date.getFullYear().toString();

    // Create synthetic events to match the existing handlers
    const dayEvent = { target: { value: newDay } } as React.ChangeEvent<HTMLSelectElement>;
    const monthEvent = { target: { value: newMonth } } as React.ChangeEvent<HTMLSelectElement>;
    const yearEvent = { target: { value: newYear } } as React.ChangeEvent<HTMLSelectElement>;

    handleDayChange(dayEvent);
    handleMonthChange(monthEvent);
    handleYearChange(yearEvent);
  };

  return (
    <div className={styles.datePickerContainer}>
      <label htmlFor="date-input" className={styles.label}>
        {t('dailyHoroscope.datePicker.label')}
      </label>
      <input
        type="date"
        id="date-input"
        value={dateValue}
        onChange={handleDateChange}
        className={styles.dateInput}
        max={new Date().toISOString().split('T')[0]}
        aria-label={t('dailyHoroscope.datePicker.label')}
      />
      <p className={styles.comment}>
        {t('dailyHoroscope.datePicker.comment')}
      </p>
    </div>
  );
};

export default DatePicker;