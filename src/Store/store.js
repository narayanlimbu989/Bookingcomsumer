import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./Slices/authSlice";
import searchSlice from "./Slices/searchSlice";

export const store = configureStore({
  reducer: {
    search: searchSlice,
    auth: authSlice
  },
});
