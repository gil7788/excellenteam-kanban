import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import CardCreationForm from "./CardCreationForm";
import { List as ListType, Card as CardType } from "../types/types";
import {
  Add as AddIcon,
  DeleteOutline as DeleteIcon,
} from "@mui/icons-material";
import SortableCard from "./SortableCard";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useBoard } from "../hooks/useBoard";

interface ListProps {
  list: ListType;
  boardId: string;
}

const List = (props: ListProps) => {
  const { list, boardId } = props;
  const { deleteList, updateList, addCard } = useBoard(boardId);
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState(list.title);
  const [isEditing, setisEditing] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleAddCard = (cardData: CardType) => {
    addCard(list.id, cardData);
  };

  const handleDeleteList = () => {
    deleteList(list.id);
    setOpenDeleteModal(false);
  };

  const handleBlur = () => {
    setisEditing(false);
    setTitle(title.trim());
    if (!title || title.trim() === list.title) {
      setTitle(list.title);
      return;
    }
    updateList(list.id, title);
  };

  return (
    <Paper
      elevation={0}
      sx={{
        minWidth: 250,
        maxWidth: 250,
        borderRadius: 2,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        bgcolor: (theme) =>
          theme.palette.mode === "light"
            ? "#ececec"
            : theme.palette.background.paper,
      }}
    >
      {/* Header */}
      <Box
        sx={{
          px: 2,
          py: 1,
          display: "flex",
          alignItems: "center",
          height: (theme) => theme.heightVariants.listHeaderHeight,
        }}
      >
        {!isEditing ? (
          <Typography
            variant="subtitle1"
            onClick={() => setisEditing(true)}
            sx={{ flex: 1 }}
          >
            {title}
          </Typography>
        ) : (
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleBlur}
            sx={{
              flex: 1,
              bgcolor: (theme) =>
                theme.palette.mode === "light"
                  ? "white"
                  : theme.palette.background.paper[100],
            }}
          />
        )}

        <IconButton size="small" onClick={() => setOpenDeleteModal(true)}>
          <DeleteIcon />
        </IconButton>
      </Box>

      {/* Cards */}
      <Box
        sx={{
          // flex: 1,
          p: list.cards?.length ? 1 : 0, // in case list is empty
          pb: 0,
          overflowY: "auto",
          maxHeight: "280px",
        }}
      >
        <SortableContext
          items={list.cards.map((card) => card.id)}
          strategy={verticalListSortingStrategy}
        >
          {list.cards.map((card) => (
            <SortableCard
              key={card.id}
              card={card}
              listId={list.id}
              boardId={boardId}
            />
          ))}
        </SortableContext>
      </Box>

      {/* Footer */}
      <Box
        sx={{
          height: (theme) => theme.heightVariants.listFooterHeight,
          display: "flex",
        }}
      >
        <Button
          startIcon={<AddIcon />}
          sx={{
            justifyContent: "flex-start",
            color: "text.secondary",
            py: 1,
            px: 2,
          }}
          fullWidth
          onClick={() => setModalOpen(true)}
        >
          Add a card
        </Button>
      </Box>

      <CardCreationForm
        boardId={boardId}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleAddCard}
      />

      {/* Delete List Confimation Modal */}
      <Dialog open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
        <DialogTitle>Delete list</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this list? All tasks within it will
            be lost.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteList} color="error" variant="contained">
            Delete
          </Button>
          <Button onClick={() => setOpenDeleteModal(false)} variant="outlined">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default List;
