/**
 * Entry point for the client React application.
 *
 * Initializes and mounts the root React component into the DOM using React 18's
 * createRoot API and wraps the application in React.StrictMode to enable
 * additional development checks and warnings.
 *
 * @file main.tsx
 * @summary Bootstraps the React app by mounting <App /> into the DOM element with id "root".
 *
 * @remarks
 * - Imports global styles from "index.css".
 * - Imports the root App component.
 * - Uses a non-null assertion (document.getElementById("root")!) to assume the mount
 *   node exists; ensure your HTML template contains an element with id="root".
 * - This module is executed once on application startup.
 *
 * @throws {Error} If the mount element with id "root" is missing, the non-null assertion
 *                 will cause a runtime error when attempting to call render.
 */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);