import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  expenseData: null,
};

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    add: (state, action) => {
      state.status = true;
      state.expenseData = action.payload;
    },
    flush: (state) => {
      state.status = false;
      state.expenseData = null;
    },
  },
});

export const { add, flush } = expenseSlice.actions;
export default expenseSlice.reducer;
