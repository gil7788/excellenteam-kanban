import React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Link } from "react-router-dom";
import {
  DarkModeOutlined as DarkModeIcon,
  Home as HomeIcon,
  LightModeOutlined as LightModeIcon,
} from "@mui/icons-material";
import { useTheme } from "../contexts/ThemeContext";

const Navbar: React.FC = () => {
  const { themeMode, toggleTheme } = useTheme();

  return (
    <AppBar
      position="sticky"
      sx={{
        background: "transparent",
        backdropFilter: "blur(20px)",
        color: (theme) =>
          theme.palette.mode === "light" ? "secondary.main" : "text.primary",
        height: (theme) => theme.heightVariants.navBarHeight,
      }}
    >
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            pb: 2,
          }}
        >
          {/* Navigation Links */}
          <IconButton
            component={Link}
            to={"/home"}
            edge="start"
            color="inherit"
          >
            <HomeIcon />
          </IconButton>
          <Button component={Link} to={"/settings"} color="inherit">
            Settings
          </Button>
          <Button component={Link} to={"/profile"} color="inherit">
            Profile
          </Button>

          <Box sx={{ flexGrow: 1 }} />

          {/* Toggle Theme Button*/}
          <Tooltip
            title={`Switch to ${themeMode === "light" ? "Dark" : "Light"} Mode`}
          >
            <IconButton onClick={toggleTheme} style={{ color: "inherit" }}>
              {themeMode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
