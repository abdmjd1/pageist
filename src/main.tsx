import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthContextProvider } from "./contexts/AuthContext.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage/SignUpPage.tsx";
import SignInPage from "./pages/SignInPage/SignInPage.tsx";
import PasswordResetPage from "./pages/PasswordResetPage/PasswordResetPage.tsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.tsx";
import PublicRoute from "./components/PublicRoute/PublicRoute.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <PublicRoute>
        <SignUpPage />
      </PublicRoute>
    ),
  },
  {
    path: "/signin",
    element: (
      <PublicRoute>
        <SignInPage />
      </PublicRoute>
    ),
  },
  {
    path: "/password-reset",
    element: (
      <PublicRoute>
        <PasswordResetPage />
      </PublicRoute>
    ),
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </StrictMode>
);
