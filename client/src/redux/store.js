import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../redux/userSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: counterReducer,
  },
});
