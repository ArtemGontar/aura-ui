import React from 'react';
import { TFunction } from 'i18next';
import styles from './Home.module.css'; // Using existing styles

// Assuming a card structure based on HOME_CARDS usage
interface CardConfig {
  id: string;
  path: string;
  icon?: React.ReactNode | string; // Icon can be a string (emoji) or a component
  disabled: boolean;
  // title and description are typically derived using t(`home.cards.${card.id}.title`)
  // so they are not direct properties of the card object itself from HOME_CARDS
}

interface HomeCardsGridProps {
  cards: CardConfig[];
  onCardClick: (path: string, disabled: boolean) => void;
  t: TFunction;
}

const HomeCardsGrid: React.FC<HomeCardsGridProps> = ({ cards, onCardClick, t }) => {
  return (
    <div className={styles.cards} role="grid">
      {cards.map((card) => (
        <div
          key={card.id}
          onClick={() => onCardClick(card.path, card.disabled)}
          className={`${styles.card} ${card.disabled ? styles.cardDisabled : ''} ${styles[`card${card.id.charAt(0).toUpperCase() + card.id.slice(1)}`]}`}
          role="gridcell"
          tabIndex={0}
          onKeyPress={(e) => {
            if (!card.disabled && (e.key === 'Enter' || e.key === ' ')) {
              onCardClick(card.path, card.disabled);
            }
          }}
        >
          <h3 className={styles.cardTitle}>
            {card.icon && <span className={styles.cardIcon}>{card.icon}</span>}
            {t(`home.cards.${card.id}.title`)}
          </h3>
          <p className={styles.cardDescription}>{t(`home.cards.${card.id}.description`)}</p>
        </div>
      ))}
    </div>
  );
};

export default HomeCardsGrid;
