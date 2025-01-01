import React from "react";
import { Container } from "@mui/material";
import Navbar from "../components/Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <Navbar />
        {children}
    </Container>
  );
};

export default Layout;

// import { JSX } from "react";
// import Footer from "../components/Footer";
// import Navbar from "../components/Navbar";
// import { Box, CssBaseline } from "@mui/material";

// type LayoutProps = {
//   children: JSX.Element;
// };

// const Layout: React.FC<LayoutProps> = ({ children }) => {
//   return (
//     <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
//       <CssBaseline />
//       <Navbar />
//       <Box
//         component="main"
//         sx={{
//           flex: 1,
//           width: "100%",
//           px: 3,
//           py: 2,
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "start",
//         }}
//       >
//         {children}

//       </Box>
//       <Footer />
//     </Box>
//   );
// };

// export default Layout;