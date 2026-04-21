import { IconButton, Tooltip } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useThemeToggle } from "./ToggleThemeProvider";

export default function ThemeToggleButton() {
  const { toggleTheme, mode } = useThemeToggle();

  return (
    <Tooltip title="Toggle Theme">
      <IconButton color="inherit" onClick={toggleTheme}>
        {mode === "light" ? <DarkModeIcon color="action"/> : <LightModeIcon />}
      </IconButton>
    </Tooltip>
  );
}