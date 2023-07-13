import App from "@layouts/App";
import React from "react";
import ReactDOM from "react-dom/client";

const appElement = document.querySelector("#app");
if (!appElement) throw new Error("Failed to find the app element");
ReactDOM.createRoot(appElement).render(<App />);
