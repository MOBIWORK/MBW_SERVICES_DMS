/** @format */

import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

const currentMonth = dayjs().month() + 1;
const month = currentMonth.toString();

const monthInitialSate = {
  currentMonth: month,
  currentYear: dayjs().format("YYYY"),
};
const monthSlice = createSlice({
  name: "month",
  initialState: monthInitialSate,
  reducers: {
    setMonth: (state, action) => {
      state.currentMonth = action.payload;
    },
    setYear: (state, action) => {
      state.currentYear = action.payload;
    },
  },
});

export const { setMonth, setYear } = monthSlice.actions;
export default monthSlice.reducer;
