import { AppBar, Button, IconButton, Toolbar } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton component={Link} to={"/home"} edge="start" color="inherit">
          <HomeIcon />
        </IconButton>
        <Button component={Link} to={"/settings"} color="inherit">
          Settings
        </Button>
        <Button component={Link} to={"/profile"} color="inherit">
          Profile
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
