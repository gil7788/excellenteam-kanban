import React from "react";
import { Box, Typography, Link as MuiLink } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        // position: "absolute",
        // bottom: 0,
        // left: 0,
        // right: 0,
        mt: "auto",
        borderTop: "1px solid",
        borderColor: "divider",
        p: 2,
        height: (theme) => theme.heightVariants.footerHeight,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "background.paper",
      }}
    >
      <Typography>
        © 2024 MyApp |&nbsp;
        <MuiLink
          component={RouterLink}
          to="/home"
          color="inherit"
          underline="hover"
        >
          Home
        </MuiLink>{" "}
        |&nbsp;
        <MuiLink
          component={RouterLink}
          to="/settings"
          color="inherit"
          underline="hover"
        >
          Settings
        </MuiLink>{" "}
        |&nbsp;
        <MuiLink
          component={RouterLink}
          to="/profile"
          color="inherit"
          underline="hover"
        >
          Profile
        </MuiLink>
      </Typography>
    </Box>
  );
};

export default Footer;
