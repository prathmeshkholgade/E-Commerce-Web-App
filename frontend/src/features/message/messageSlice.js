import { createSlice } from "@reduxjs/toolkit";

export const messageSlice = createSlice({
  name: "message",
  initialState: {
    message: "",
  },
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    clearMsg: (state, action) => {
      state.message = "";
    },
  },
});

export const { setMessage, clearMsg } = messageSlice.actions
export default messageSlice.reducer;
