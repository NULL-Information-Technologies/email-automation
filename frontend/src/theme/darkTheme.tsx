import { createTheme } from "@mui/material/styles";
import { violet } from "./colors";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",

    primary: {
      main: violet[400],      // Daha canlı ton
      light: violet[300],     // Hover için açık ton
      dark: violet[600],      // Basınma/active durumu
      contrastText: "#f5f5f5",
    },

    secondary: {
      main: violet[400],
      contrastText: "#ffffff",
    },

    background: {
      default: "#212121",
      paper: "#2a2a2a",
    },

    text: {
      primary: "#e4e4e7",
      secondary: "#a1a1aa",
    },

    divider: "#3a3a3a",
  },

  shape: {
    borderRadius: 12,
  },

  typography: {
    fontFamily: "Inter, sans-serif",
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
        },
        containedPrimary: {
          backgroundColor: violet[700],   // Daha canlı renk
          color: "#f5f5f5",
          "&:hover": {
            backgroundColor: violet[600],  // Hover daha açık ton
          },
        },
        containedSecondary: {
          backgroundColor: violet[600],
          color: "#ffffff",
          "&:hover": {
            backgroundColor: violet[400],
          },
        },
      },
    },
  },
});