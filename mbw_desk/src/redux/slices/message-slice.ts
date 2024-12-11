/** @format */

// src/store/dateSlice.js
import { createSlice } from "@reduxjs/toolkit";

const messageInitialState = {
  message: "",
  type: "success",
};

const messageSlice = createSlice({
  name: "message",
  initialState: messageInitialState,
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload.message;
      state.type = action.payload.type;
    },
  },
});

export const { setMessage } = messageSlice.actions;
export default messageSlice.reducer;
