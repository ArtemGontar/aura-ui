import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { decrementQuota } from "../store/slices/quotaSlice";

export const useQuotas = (featureType: string) => {
    const dispatch = useDispatch<AppDispatch>();

    const quota = useSelector((state: RootState) =>
        state.quotas.quotas.find((q) => q.featureType === featureType)
    );

    const remainingUses = quota?.remainingUses ?? 0;

    const useFeature = () => {
        if (remainingUses > 0) {
            dispatch(decrementQuota(featureType));
        }
    };

    return { remainingUses, useFeature };
};
