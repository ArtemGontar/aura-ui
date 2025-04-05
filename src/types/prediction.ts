export interface Prediction {
  id: number;
  type: string;
  createdAt: string;
  updatedAt: string;
  content: CompatibilityData | HoroscopeData | AffirmationData | DreamBookData;
}

export enum PredictionType {
  DailyHoroscope = "DailyHoroscope",
  Compatibility = "Compatibility",
  Affirmation = "Affirmation",
  DreamInterpretation = "DreamInterpretation",
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

export interface CompatibilityData {
  emotionalScore: string;
  communicationScore: string;
  passionScore: string;
  strengths: string[];
  challenges: string[];
}

export interface HoroscopeData {
  generalGuidance: string;
  loveRelationshipsAdvice: string;
  careerFinancialInsights: string;
  focus: string;
}

export interface AffirmationData {
  text: string;
}

export interface DreamBookData {
  interpretation: string;
}