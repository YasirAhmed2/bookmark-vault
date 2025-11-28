// components/ThemeToggle.tsx
import { useState, useEffect } from "react";
import "./darkthemToggle.css";
export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <button  className="theme-toggle-btn" onClick={() => setDarkMode(prev => !prev)}>
      {darkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
}
