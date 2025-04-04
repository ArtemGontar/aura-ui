export interface FeatureQuota {
  featureType: string;
  remainingUses: number;
}

export interface QuotaState {
  quotas: FeatureQuota[];
  loading: boolean;
}