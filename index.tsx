import React from "react";
import ReactDOM from "react-dom/client";
import App from "@layouts/App";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();
const appElement = document.querySelector("#app");
if (!appElement) throw new Error("Failed to find the app element");

ReactDOM.createRoot(appElement).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} position="bottom" />
    </QueryClientProvider>
  </BrowserRouter>,
);
