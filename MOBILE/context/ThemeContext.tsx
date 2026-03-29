import { THEMES } from "@/assets/styles/colors";
import React, { createContext, useContext, useState } from "react";

type ThemeName = keyof typeof THEMES;

const ThemeContext = createContext<any>(null);

export const ThemeProvider = ({ children }: any) => {
  const [themeName, setThemeName] = useState<ThemeName>("coffee");
  const theme = THEMES[themeName];
  return (
    <ThemeContext.Provider value={{ theme, themeName, setThemeName }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }
  return context;
};
