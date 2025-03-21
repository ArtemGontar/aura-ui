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
  focus: string;
}

export interface Compatibility {
  emotionalScore: string;
  communicationScore: string;
  passionScore: string;
  strengths: string[];
  challenges: string[];
}