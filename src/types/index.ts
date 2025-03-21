export interface CardData {
  id: string;
  path: string;
  icon?: string;
  disabled: boolean;
}

export interface HomeProps {
  className?: string;
}

export interface UserStats {
  streak: number;
  crystalBalance: number;
}

export interface Subscription {
  plan: string;
  expiration: string;
}

export interface Prediction {
  date: string;
  type: string;
  result: string;
}

export interface ProfileData {
  name: string;
  email: string;
  avatar?: string;
  subscribed: boolean;
  subscription?: Subscription;
  predictions: Prediction[];
}

export interface ProfileProps {
  className?: string;
} 