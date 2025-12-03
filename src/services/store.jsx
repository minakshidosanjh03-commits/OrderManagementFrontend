import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice";
import orderReducer from "../slices/orderSlice";
import { Api } from "../services/api";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    orders: orderReducer,
    [Api.reducerPath]: Api.reducer, 
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(Api.middleware), 
  devTools: true,
});
