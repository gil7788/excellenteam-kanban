import { Box, Typography, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box position={"fixed"} bottom="0" width="100%" left="0" component="footer">
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          p: 1,
          m: 1,
        }}
      >
        <Typography>
          &copy; MyApp |&nbsp;
          <Link href="/">Home</Link> |&nbsp;
          <Link href="/settings">Settings</Link> |&nbsp;
          <Link href="/profile">Profile</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
