/**
 * Entry point for the React app.
 *
 * Mounts <App /> into the DOM element with id "root" using React createRoot.
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