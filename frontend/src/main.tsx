import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { authApi } from "./Redux/AuthApi.ts";
import { Provider } from "react-redux";
import { AuthStore } from "./Redux/AuthStore.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApiProvider api={authApi}>
      <Provider store={AuthStore}>
        <App />
      </Provider>
    </ApiProvider>
  </StrictMode>,
);
