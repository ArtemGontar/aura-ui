import React from 'react';
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
  days,
  months,
  years,
  handleDayChange,
  handleMonthChange,
  handleYearChange,
}) => {
  return (
    <>
      <label className={styles.label}>Enter your date of birth:</label>
      <div className={styles.datePicker}>
        <select value={day} onChange={handleDayChange} className={styles.select}>
          <option value="">Day</option>
          {days.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
        <select value={month} onChange={handleMonthChange} className={styles.select}>
          <option value="">Month</option>
          {months.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        <select value={year} onChange={handleYearChange} className={styles.select}>
          <option value="">Year</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>
      <p className={styles.comment}>This data will be saved to the server and you can change it later in your profile.</p>
    </>
  );
};

export default DatePicker;