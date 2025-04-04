export interface FeatureQuota {
  predictionType: string;
  remainingUses: number;
}

export interface QuotaState {
  quotas: FeatureQuota[];
  loading: boolean;
}