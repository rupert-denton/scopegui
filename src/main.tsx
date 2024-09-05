import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ScopeAndSequenceProvider } from "./hooks/ScopeAndSequenceContext.tsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayout from "./views/MainLayout.tsx";
import MainView from "./views/MainView.tsx";
import ErrorView from "./views/ErrorView.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorView />,
    children: [
      {
        path: "",
        element: <MainView />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ScopeAndSequenceProvider>
      <RouterProvider router={router} />
    </ScopeAndSequenceProvider>
  </StrictMode>
);
