import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ScopeAndSequenceProvider } from "./hooks/ScopeAndSequenceContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ScopeAndSequenceProvider>
      <App />
    </ScopeAndSequenceProvider>
  </StrictMode>
);
