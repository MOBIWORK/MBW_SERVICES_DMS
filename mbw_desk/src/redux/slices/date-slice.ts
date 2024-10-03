// src/store/dateSlice.js
import { createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';


const startOfMonth: any = dayjs().startOf("month");
const endOfMonth: any = dayjs().endOf("month");



let start = Date.parse(startOfMonth["$d"]) / 1000;
let end = Date.parse(endOfMonth["$d"]) / 1000;


const dateInitialState = {
  startDate: start,
  endDate: end,
};

const dateSlice = createSlice({
  name: 'date',
  initialState: dateInitialState,
  reducers: {
    setStartDate: (state, action) => {
      const payload = action.payload
      state.startDate = payload
      
      const newStartMonth = dayjs.unix(payload).month()
      const currentEndMonth = dayjs.unix(state.endDate).month()
      const currentYear = dayjs.unix(payload).year();
      
      if (newStartMonth !== currentEndMonth) {
        state.endDate = dayjs(new Date(currentYear, newStartMonth + 1, 0)).unix();
      }
    },
    setEndDate: (state, action) => {
      state.endDate = action.payload;
    },
  },
});


export const { setStartDate, setEndDate } = dateSlice.actions;
export default dateSlice.reducer;
