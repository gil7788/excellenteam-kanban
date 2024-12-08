import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "background.paper",
        display: "flex",
        justifyContent: "center",
        p: 2.5,
      }}
    >
      <Typography variant="subtitle1" color="textSecondary">
        &copy; MyApp |&nbsp;
        <Link to="/home">Home</Link> |&nbsp;
        <Link to="/settings">Settings</Link> |&nbsp;
        <Link to="/profile">Profile</Link>
      </Typography>
    </Box>
  );
};

export default Footer;
