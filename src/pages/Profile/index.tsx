import React from "react";
import Layout from "../../layout";
import { Box, Container, Typography } from "@mui/material";
import { useAuth } from "../../contexts/AuthProvider";
import Footer from "../../components/Footer";

const Profile: React.FC = () => {
  const { user } = useAuth();

  return (
    <Layout>
      <Container>
        <Box
          sx={{
            pt: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            height: (theme) =>
              `calc(100vh - ${theme.heightVariants.navBarHeight} - ${theme.heightVariants.footerHeight})`,
          }}
        >
          <Typography variant="h5">Profile</Typography>
          {user && <Typography variant="h5"> {user.username}</Typography>}
        </Box>
      </Container>
      <Footer />
    </Layout>
  );
};

export default Profile;
