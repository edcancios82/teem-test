import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import { SectionsProvider, UserProvider } from "./context";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <UserProvider>
      <SectionsProvider>
        <App />
      </SectionsProvider>
    </UserProvider>
  </React.StrictMode>
);
