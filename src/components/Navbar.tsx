import React from "react";
import { AppBar, Toolbar, Box, Button, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import {
  DarkModeOutlined,
  LightMode,
  Home as HomeIcon,
} from "@mui/icons-material";
import { useTheme } from "../contexts/ThemeContext";

const Navbar: React.FC = () => {
  const { themeMode, toggleTheme } = useTheme();

  // const trigger = useScrollTrigger({
  //   disableHysteresis: true,
  //   threshold: 0,
  // });

  return (
    <AppBar
      position="sticky"
      sx={{
        background: "transparent",
        backdropFilter: "blur(20px)",
        color: (theme) =>  theme.palette.mode === "light" ? "secondary.main": "text.primary",
        height: (theme) => theme.heightVariants.navBarHeight,
        // backdropFilter: trigger ? "blur(20px)" : "none",
        // WebkitBackdropFilter: trigger ? "blur(20px)" : "none",
        // bgcolor: (theme) =>
        //   trigger
        //     ? theme.palette.mode === "light"
        //       ? "rgba(255, 255, 255, 0.8)"
        //       : "rgba(18, 18, 18, 0.8)"
        //     : "transparent",
        //transition: "all 0.3s ease-in-out",
        //borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        // borderBottom: (theme) =>
        //   trigger ? `1px solid ${theme.palette.divider}` : "none",
        // boxShadow: trigger ? 1 : "none",
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

          <IconButton onClick={toggleTheme} style={{ color: "inherit" }}>
            {themeMode === "light" ? <LightMode /> : <DarkModeOutlined />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
