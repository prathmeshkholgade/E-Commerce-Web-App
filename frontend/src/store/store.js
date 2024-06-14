import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../features/product/productDataSlice";
import messageReducer from "../features/message/messageSlice";
import authReducer from "../features/user/userSlice";

export const store = configureStore({
  reducer: {
    Products: productReducer,
    flashMessage: messageReducer,
    user: authReducer,
  },
});
