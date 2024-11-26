/** @format */

import { configureStore } from "@reduxjs/toolkit";
import dateReducer from "./slices/date-slice";
import groupReducer from "./slices/groups-slice";
import monthReducer from "./slices/month-slice";
import promotionReducer from "./slices/promotion-slice";
import messageReducer from "./slices/message-slice";
export const store = configureStore({
  reducer: {
    date: dateReducer,
    group: groupReducer,
    month: monthReducer,
    promotion: promotionReducer,
    message: messageReducer,
  },
});

// Khai báo kiểu RootState đại diện cho toàn bộ state của ứng dụng
export type RootState = ReturnType<typeof store.getState>;
