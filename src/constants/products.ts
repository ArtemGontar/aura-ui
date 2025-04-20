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
  CreatePersonalMeditation = 8
}

export const PRODUCT_PRICES = {
  // Subscriptions
  [SubscriptionType.Basic]: 1, // 200
  [SubscriptionType.Premium]: 1, // 400
  [SubscriptionType.Ultra]: 1, // 600
  
  // Features
  [FeatureType.DailyHoroscope]: 1, // 20
  [FeatureType.Compatibility]: 1, // 40
  [FeatureType.Affirmation]: 1, // 10
  [FeatureType.DreamInterpretation]: 1, // 30
  [FeatureType.CreatePersonalMeditation]: 1 // 50
};

// Replace with translation keys
export const PRODUCT_NAME_KEYS = {
  [FeatureType.DailyHoroscope]: "products.dailyHoroscope",
  [FeatureType.Compatibility]: "products.compatibility",
  [FeatureType.Affirmation]: "products.affirmation",
  [FeatureType.DreamInterpretation]: "products.dreamInterpretation",
  [FeatureType.CreatePersonalMeditation]: "products.personalMeditation"
};
