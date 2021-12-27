import { createSlice } from "@reduxjs/toolkit";

const dredgeSlice = createSlice({
  name: "dredge",
  initialState: { data: {}, extra_data: {}, non_eff: {} },
  reducers: {
    getDredge() {},
    setDredge(state, action) {
      const dredgeData = action.payload;
      return { ...state, ...dredgeData };
    },
  },
});

export const { getDredge, setDredge } = dredgeSlice.actions;
export default dredgeSlice.reducer;
