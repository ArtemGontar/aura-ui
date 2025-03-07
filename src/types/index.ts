export interface UserData {
  firstName: string;
  lastName?: string;
  id: string;
  username?: string;
}

export interface CardData {
  id: string;
  title: string;
  description: string;
  path: string;
  icon?: string;
}

export interface HomeProps {
  className?: string;
}

export interface UserStats {
  streak: number;
  crystalBalance: number;
} 