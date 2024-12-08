import React from "react";
import Layout from "../../layout";
import { Box, Container, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthProvider";

const Profile: React.FC = () => {
  const { user } = useAuth();

  return (
    <Layout>
      <Container>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">Profile</Typography>
          {user && <Typography variant="h5"> {user.username}</Typography>}
        </Box>
      </Container>
    </Layout>
  );
};

export default Profile;
