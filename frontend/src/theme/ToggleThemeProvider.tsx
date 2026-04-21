import { createContext, useContext, useMemo, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { lightTheme } from "./lightTheme";
import { darkTheme } from "./darkTheme";

type ThemeMode = "light" | "dark";

type ThemeContextType = {
  toggleTheme: () => void;
  mode: ThemeMode;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export const useThemeToggle = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeToggle must be used inside ToggleThemeProvider");
  }
  return context;
};

export const ToggleThemeProvider = ({ children }: { children: React.ReactNode }) => {
  
  const [mode, setMode] = useState<ThemeMode>(() => {
    const saved = localStorage.getItem("theme-mode");
    return (saved as ThemeMode) || "light";
  });

  const theme = useMemo(() => {
    return mode === "light" ? lightTheme : darkTheme;
  }, [mode]);

  const toggleTheme = () => {
    setMode((prev) => {
      const newMode = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme-mode", newMode);
      return newMode;
    });
  };

  return (
    <ThemeContext.Provider value={{ toggleTheme, mode }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};