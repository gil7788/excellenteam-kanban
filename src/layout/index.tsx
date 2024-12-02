import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { Box } from "@mui/material";

type LayoutProps = {
  children: JSX.Element;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <Box
        component="main"
        sx={{
          flex: 1,
          overflow: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      
      <Footer />
      </Box>
    </Box>
  );
};

export default Layout;

/*      <CssBaseline />
      <Navbar />
      <Box height={"100vw"} width={"100vw"}>
        <Box sx={{ width: "100%" }}>{children}</Box>
        <Footer />
      </Box>
    </>*/
