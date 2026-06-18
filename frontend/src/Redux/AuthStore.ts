import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./AuthApi";

export const AuthStore = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export type authRootState = ReturnType<typeof AuthStore.getState>;
export type authDispatch = typeof AuthStore.dispatch;
