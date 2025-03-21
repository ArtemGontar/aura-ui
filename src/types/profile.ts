import { Prediction } from "./prediction";
import { Subscription } from "./user";

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