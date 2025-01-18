import React from 'react';
import styles from './OptionCard.module.css';

interface OptionCardProps {
  option: string;
  onClick: () => void;
  selected: boolean;
}

const OptionCard: React.FC<OptionCardProps> = ({ option, onClick, selected }) => {
  return (
    <div className={`${styles.card} ${selected ? styles.selected : ''}`} onClick={onClick}>
      <h3>{option}</h3>
    </div>
  );
};

export default OptionCard;