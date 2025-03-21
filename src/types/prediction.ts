export interface Prediction {
  id: number;
  type: string;
  createdAt: string;
  updatedAt: string;
  content: string;
}

export interface Horoscope {
  generalGuidance: string;
  loveRelationshipsAdvice: string;
  careerFinancialInsights: string;
}

export interface Compatibility {
  compatibilityScore: string;
  strengths: string[];
  challenges: string[];
  todayScenario: string;
}