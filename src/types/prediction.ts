export interface Prediction {
  id: number;
  type: string;
  createdAt: string;
  updatedAt: string;
  content: CompatibilityData | HoroscopeData | AffirmationData | DreamBookData | TarotReading | HandFortuneData;
}

export enum PredictionType {
  DailyHoroscope = "DailyHoroscope",
  Compatibility = "Compatibility",
  Affirmation = "Affirmation",
  DreamInterpretation = "DreamInterpretation",
  TarotReading = "TarotReading",
  HandFortune = "HandFortune",
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

export interface TarotReading {
  spreadType: string;
  cards: {
    position: string;
    cardName: string;
    orientation: string;
    interpretation: string;
  }[];
  overallInterpretation: string;
}

export interface HandFortuneData {
  lifeLineReading: string;
  heartLineReading: string;
  headLineReading: string;
  fateLineReading: string;
  mountsAnalysis: string;
  overallInterpretation: string;
}