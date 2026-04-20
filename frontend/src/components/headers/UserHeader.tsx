import React from "react";
import { AppBar, Drawer, Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation } from "react-router-dom";
import LanguageToggle from "../../locales/LanguageToggle";
import ThemeToggleButton from "../../theme/ThemeToggleButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useThemeToggle } from "../../theme/ToggleThemeProvider";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useTranslation } from "react-i18next";
import { useLogout } from "../../api/authApi/useAuth";
interface propTypes {
  visible: boolean;
  username?: string;
}

export default function UserHeader({ visible }: propTypes) {
  const { pathname } = useLocation();
  const matches = useMediaQuery((theme) => theme.breakpoints.up("sm"));
  const { mutate: logoutUser } = useLogout();
  const { toggleTheme, mode } = useThemeToggle();
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    { label: t("header.dashboard"), path: "/dashboard" },
    { label: t("header.campaigns"), path: "/campaigns" },
    { label: t("header.mailList"), path: "/mail-list" },
    { label: t("header.templates"), path: "/templates" },
  ];
  const handleLogout = () => {
    logoutUser();
  };
  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: "background.paper",
          borderBottom: "1px solid",
          borderColor: "divider",
          transition: "transform 0.3s ease-in-out",
          transform: visible ? "translateY(0)" : "translateY(-100%)",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            px: 2,
          }}
        >
          {/* Mobile menu button */}
          <IconButton
            onClick={() => setDrawerOpen(true)}
            sx={{ display: { lg: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo */}
          <Box sx={{ flexShrink: 0 }}>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Typography
                sx={{
                  fontSize: 16,
                  color: "text.primary",
                  fontWeight: 600,
                }}
              >
                LOGO
              </Typography>
            </Link>
          </Box>

          {/* Desktop navigation */}
          <Box
            sx={{
              display: { xs: "none", lg: "flex" },
              flex: 1,
              mx: 4,
              gap: 3,
            }}
          >
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                style={{ textDecoration: "none" }}
              >
                <Typography
                  sx={{
                    color:
                      pathname === item.path
                        ? "primary.main"
                        : "text.secondary",
                    fontWeight: pathname === item.path ? 600 : 400,
                  }}
                >
                  {item.label}
                </Typography>
              </Link>
            ))}
          </Box>
          <Box
            sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
          >
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar sx={{ width: 32, height: 32 }}></Avatar>
              </IconButton>
            </Tooltip>
            {matches ? (
              <>
                <LanguageToggle />
              </>
            ) : (
              <></>
            )}
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            slotProps={{
              paper: {
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem onClick={handleClose}>
              <Avatar /> Profile
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Avatar /> My account
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              {t("auth.logout")}
            </MenuItem>
            <MenuItem onClick={toggleTheme}>
              <ListItemIcon>
                {mode === "light" ? (
                  <DarkModeIcon color="action" />
                ) : (
                  <LightModeIcon />
                )}
              </ListItemIcon>
              {mode === "light" ? t("light") : t("dark")}
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: 280,
            justifyContent: "space-between",
          },
        }}
      >
        <Box>
          <Box sx={{ p: 2 }}>
            <Typography variant="h6">Menu</Typography>
          </Box>

          <Divider />

          <Box sx={{ px: 2 }}>
            {menuItems.map((item) => (
              <MenuItem
                key={item.path}
                component={Link}
                to={item.path}
                onClick={() => setDrawerOpen(false)}
                selected={pathname === item.path}
              >
                {item.label}
              </MenuItem>
            ))}
          </Box>
        </Box>

        <Box>
          <Divider sx={{ my: 1 }} />

          {/* Theme Switch */}
          <Box
            sx={{
              px: 2,
              py: 1,
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <LanguageToggle />
            <ThemeToggleButton />
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
