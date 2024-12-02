import { AppBar, Button, IconButton, Toolbar } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";

const Navbar = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton edge="start" color="inherit" href="/">
          <HomeIcon />
        </IconButton>
        <Button color="inherit" href="/settings">
          Settings
        </Button>
        <Button color="inherit" href="/profile">
          Profile
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
