// src/context/ThemeContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem("themeMode") || "default";
  });

  useEffect(() => {
    document.body.classList.remove("dark-mode", "visual-aid");

    if (mode === "dark") document.body.classList.add("dark-mode");
    else if (mode === "visual-aid") document.body.classList.add("visual-aid");

    localStorage.setItem("themeMode", mode);
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};
