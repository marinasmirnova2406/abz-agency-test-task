import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/main.scss";
import { UserProvider } from "./context/UserContext";

const root = createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);
