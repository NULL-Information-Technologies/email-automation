import { IconButton, Tooltip, Box, Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useState } from "react";

import trFlag from "../assets/img/Flag_of_Turkey.svg";
import enFlag from "../assets/img/Flag_of_the_United_States.svg";

const LanguageToggle: React.FC = () => {
  const { i18n } = useTranslation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (lang: "tr-TR" | "en-US") => {
    i18n.changeLanguage(lang);
    handleClose();
  };

  const isTR = i18n.language === "tr-TR";

  return (
    <>
      <Tooltip title="Language">
        <IconButton color="inherit" onClick={handleOpen}>
          <Box
            component="img"
            src={isTR ? trFlag : enFlag}
            alt="language flag"
            sx={{
              width: 26,
              height: 26,
              borderRadius: "4px",
            }}
          />
        </IconButton>
      </Tooltip>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={() => changeLanguage("tr-TR")}>
          <ListItemIcon>
            <Box component="img" src={trFlag} sx={{ width: 22 }} />
          </ListItemIcon>
          <ListItemText>Türkçe</ListItemText>
        </MenuItem>

        <MenuItem onClick={() => changeLanguage("en-US")}>
          <ListItemIcon>
            <Box component="img" src={enFlag} sx={{ width: 22 }} />
          </ListItemIcon>
          <ListItemText>English</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

export default LanguageToggle;