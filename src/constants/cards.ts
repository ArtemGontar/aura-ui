import { CardData } from '../types';

export const HOME_CARDS: CardData[] = [
  {
    id: 'horoscope',
    path: '/horoscope',
    icon: '⭐',
    disabled: false
  },
  {
    id: 'compatibility',
    path: '/compatibility',
    icon: '❤️',
    disabled: false
  },
  {
    id: 'psychological',
    path: '/psychological',
    icon: '🧠',
    disabled: true
  },
  {
    id: 'astrology',
    path: '/astrology',
    icon: '🌠',
    disabled: true
  },
  {
    id: 'magicball',
    path: '/magicball',
    icon: '🔮',
    disabled: true
  }
];