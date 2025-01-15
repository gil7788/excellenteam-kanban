import { useState } from "react";
import { Box, Button, Typography, Grid2 as Grid } from "@mui/material";
import BoardList from "./BoardList";
import CreateBoardModal from "./CreateBoardModal";
import Layout from "../../layout";
import { BoardMetadata } from "../../types/types";
import { useBoardsList } from "../../hooks/useBoardsList";
import Footer from "../../components/Footer";

const Home = () => {
  const { boards, addBoard, deleteBoard } = useBoardsList();
  const [modalOpen, setModalOpen] = useState(false);

  const handleCreateBoard = (title: string, color: string) => {
    const newBoard: BoardMetadata = {
      id: Date.now().toString(),
      title,
      createdAt: new Date().toISOString(),
      color,
    };
    addBoard(newBoard);
  };

  const handleDeleteBoard = (id: string) => {
    deleteBoard(id);
  };

  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: (theme) =>
            `calc(100vh - ${theme.heightVariants.navBarHeight})`,
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        <Box sx={{ flex: 1, px: 2, m: 4 }}>
          <Grid container spacing={3}>
            <Grid
              container
              size={{ xs: 12 }}
              sx={{ justifyContent: "space-between" }}
            >
              <Typography
                variant="h5"
                fontWeight="semi-bold"
                color="text.secondary"
                gutterBottom
              >
                Your Boards
              </Typography>
              <Button onClick={() => setModalOpen(true)} variant="contained">
                Create new board
              </Button>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <BoardList boards={boards} onDeleteBoard={handleDeleteBoard} />
            </Grid>
          </Grid>
        </Box>

        <Footer />
      </Box>

      <CreateBoardModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleCreateBoard}
      />
    </Layout>
  );
};

export default Home;
