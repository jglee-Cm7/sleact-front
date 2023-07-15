import React from "react";
import ReactDOM from "react-dom/client";
import App from "@layouts/App";
import { BrowserRouter } from "react-router-dom";

const appElement = document.querySelector("#app");
if (!appElement) throw new Error("Failed to find the app element");
ReactDOM.createRoot(appElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
