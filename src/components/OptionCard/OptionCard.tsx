import React from 'react';
import styles from './OptionCard.module.css';

interface OptionCardProps {
  option: string;
  onClick: () => void;
  selected: boolean;
  imageUrl: string;
}

const OptionCard: React.FC<OptionCardProps> = ({ option, onClick, selected, imageUrl }) => {
  return (
    <div className={`${styles.card} ${selected ? styles.selected : ''}`} onClick={onClick}>
      <img src={imageUrl} alt={option} className={styles.image} />
      <h6>{option}</h6>
    </div>
  );
};

export default OptionCard;