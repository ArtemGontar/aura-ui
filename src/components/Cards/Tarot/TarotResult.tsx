import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './TarotResult.module.css';

interface Card {
  position: string;
  cardName: string;
  orientation: string;
  interpretation: string;
  cardImageFilename: string;
}

interface TarotReadingData {
  spreadType: string;
  cards: Card[];
  overallInterpretation: string;
}

interface TarotResultProps {
  reading: TarotReadingData;
}

const TarotResult: React.FC<TarotResultProps> = ({ reading }) => {
  const { t } = useTranslation();

  return (
    <div className={styles.resultContainer}>
      <h3 className={styles.spreadType}>{reading.spreadType}</h3>
      
      <div className={styles.cardsContainer}>
        {reading.cards.map((card, index) => (
          <div key={index} className={styles.card}>
            <div className={`${styles.cardImage} ${styles[card.orientation]}`}>
              <img 
                src={`/images/${card.cardImageFilename}.png`} 
                alt={card.cardName} 
                className={styles.cardImageContent} 
              />
            </div>
            <div className={styles.cardInfo}>
              <h4 className={styles.position}>{card.position}</h4>
              <p className={styles.cardName}>
                {card.cardName}
                <span className={styles.orientation}>
                  {card.orientation === 'upright' 
                    ? t('tarot.upright') 
                    : t('tarot.reversed')}
                </span>
              </p>
              <p className={styles.interpretation}>{card.interpretation}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className={styles.overallSection}>
        <h4 className={styles.overallTitle}>{t('tarot.overallInterpretation')}</h4>
        <p className={styles.overallText}>{reading.overallInterpretation}</p>
      </div>
    </div>
  );
};

export default TarotResult;
