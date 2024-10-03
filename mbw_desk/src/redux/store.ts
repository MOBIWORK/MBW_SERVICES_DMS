import { configureStore } from '@reduxjs/toolkit'
import dateReducer from './slices/date-slice'
import groupReducer from "./slices/groups-slice"
import monthReducer from "./slices/month-slice"


export const store = configureStore({
    reducer: {
        date: dateReducer,
        group: groupReducer,
        month: monthReducer
     }
})