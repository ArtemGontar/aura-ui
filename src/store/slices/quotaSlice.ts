import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { QuotaState } from "../../types/quota";
import { getQuota } from "../../services/quotaService";

const initialState: QuotaState = {
  quotas: [],
  loading: false,
};

export const fetchQuotasAsync = createAsyncThunk("quota/fetchQuotas", async () => {
  const response = await getQuota();
  return response;
});

const quotaSlice = createSlice({
  name: "quota",
  initialState,
  reducers: {
    decrementQuota: (state, action) => {
      const feature = action.payload;
      const quota = state.quotas.find((q) => q.predictionType === feature);
      if (quota && quota.remainingUses > 0) {
        quota.remainingUses--;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuotasAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchQuotasAsync.fulfilled, (state, action) => {
        state.quotas = action.payload;
        state.loading = false;
      })
      .addCase(fetchQuotasAsync.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { decrementQuota } = quotaSlice.actions;
export default quotaSlice.reducer;
