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