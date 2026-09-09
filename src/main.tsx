import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";

import { App } from "./app/App";
import { AuthProvider } from "./modules/auth/context/AuthContext";
import { queryClient } from "./core/query/queryClient";
import "./styles.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error('No se encontró el elemento raíz con id "root".');
}

createRoot(rootElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);
