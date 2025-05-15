export enum SubscriptionType {
  Basic = 1,
  Premium = 2,
  Ultra = 3
}

export enum FeatureType {
  DailyHoroscope = 4,
  Compatibility = 5,
  Affirmation = 6,
  DreamInterpretation = 7,
  CreatePersonalMeditation = 8,
  TarotReading = 9,
  HandFortune = 10
}

// Replace with translation keys
export const PRODUCT_NAME_KEYS = {
  [FeatureType.DailyHoroscope]: "products.dailyHoroscope",
  [FeatureType.Compatibility]: "products.compatibility",
  [FeatureType.Affirmation]: "products.affirmation",
  [FeatureType.DreamInterpretation]: "products.dreamInterpretation",
  [FeatureType.CreatePersonalMeditation]: "products.personalMeditation",
  [FeatureType.TarotReading]: "tarot.productName",
  [FeatureType.HandFortune]: "handFortune.title"
};
