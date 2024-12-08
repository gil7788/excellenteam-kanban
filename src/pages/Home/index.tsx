import React, { useState } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import BoardList from "./BoardList";
import CreateBoardModal from "./CreateBoardModal";
import Layout from "../../layout";
import { Board } from "../../types";

const Home: React.FC = () => {
  const [boards, setBoards] = useState<Board[]>([
    { id: 1, title: "Project A", created_at: Date.now().toString(), items: [] },
    { id: 2, title: "Project B", created_at: Date.now().toString(), items: [] },
  ]);
  const [modalOpen, setModalOpen] = useState(false);

  const handleCreateBoard = async (title: string) => {
    const newBoard: Board = {
      id: boards.length + 1,
      title,
      created_at: Date.now().toString(),
      items: [],
    };
    setBoards([...boards, newBoard]);
  };

  const handleDeleteBoard = async (id: number) => {
    setBoards((prev) => prev.filter((board) => board.id !== id));
  };

  return (
    <Layout>
      <Box sx={{ minHeight: "100%", width: "100vw" }}>
        <Box sx={{ p: 4 }}>
          <Container>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                pb: 4,
                pl: 3,
                m: 1,
              }}
            >
              <Typography
                variant="h5"
                fontWeight="semi-bold"
                color="text.secondary"
                gutterBottom
              >
                Your Boards
              </Typography>
              <Button onClick={() => setModalOpen(true)} variant={"contained"}>
                Create new board
              </Button>
            </Box>
            <BoardList boards={boards} onDeleteBoard={handleDeleteBoard} />
          </Container>
        </Box>

        <CreateBoardModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onCreate={handleCreateBoard}
        />
      </Box>
    </Layout>
  );
};

export default Home;

{
  /*<Layout>
      <Box display="flex" height="100vh" width="100vw">
        <Container>
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            Your Boards
          </Typography>
          <Button onClick={() => setModalOpen(true)}>new board</Button>

          <BoardList boards={boards} onDeleteBoard={handleDeleteBoard} />
        </Container>
      </Box>
      <CreateBoardModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onCreate={handleCreateBoard}
      />
    </Layout> */
}
