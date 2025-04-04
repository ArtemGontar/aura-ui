import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { decrementQuota } from "../store/slices/quotaSlice";

export const useQuotas = (predictionType: string) => {
    const dispatch = useDispatch<AppDispatch>();

    const quota = useSelector((state: RootState) => 
        state.quotas.quotas.find((q) => q.predictionType === predictionType)
    );

    const remainingUses = quota?.remainingUses ?? 0;

    const useFeature = () => {
        console.log("Using feature:", predictionType);
        if (remainingUses > 0) {
            dispatch(decrementQuota(predictionType));
        }
    };

    return { remainingUses, useFeature };
};
