"use client";
import { ThemeInterface } from "@/theme/Theme";
import React, { createContext, useState, useContext } from "react";

interface ThemeContextType {
  themeProvider: ThemeInterface["themeProvider"];
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [themeProvider, setThemeProvider] = useState<ThemeContextType["themeProvider"]>("dark mode");

  const toggleTheme = () => {
    setThemeProvider((prev) => (prev === "dark mode" ? "light mode" : "dark mode"));
  };

  return (
    <ThemeContext.Provider value={{ themeProvider, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
