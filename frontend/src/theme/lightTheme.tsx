import { createTheme } from "@mui/material/styles";
import { violet } from "./colors";

export const lightTheme = createTheme({
  palette: {
    mode: "light",

    primary: {
      main: violet[600],
      light: violet[400],
      dark: violet[700],
      contrastText: "#f0f0f0",
    },

    secondary: {
      main: violet[500],
    },

    background: {
      default: "#f7f7f8", 
      paper: "#f0f0f0",
    },

    text: {
      primary: "#1f2937",   
      secondary: "#6b7280",
    },

    divider: "#e5e7eb",
  },

  shape: {
    borderRadius: 12,
  },

  typography: {
    fontFamily: "Inter, sans-serif",
  },
});