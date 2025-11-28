import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
/**
 * App router setup using React Router.
 *
 * Defines main routes: "/" => renders login page, 
 * "/register" => renders registration page,
 *  "/dashboard" => renders dashboard page.
 */

import RegisterPage from "./pages/register.page.tsx";
import LoginPage from "./pages/login.page.tsx";
import DashboardPage from "./pages/dashboard.page.tsx";


const router = createBrowserRouter([
  { path: "/", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/dashboard", element: <DashboardPage /> },
]);

export default function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}
