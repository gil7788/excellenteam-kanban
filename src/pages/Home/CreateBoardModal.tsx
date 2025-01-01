import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

type CreateBoardModalProps = {
  open: boolean;
  onClose: () => void;
  onCreate: (title: string) => void;
};

const CreateBoardModal: React.FC<CreateBoardModalProps> = ({
  open,
  onClose,
  onCreate,
}) => {
  const [title, setTitle] = useState("");
  //const [titleError, setTitleError] = useState(false);

  const handleCreate = () => {
    onCreate(title);
    setTitle("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create board</DialogTitle>
      <DialogContent>
        <TextField
          label="Board title"
          fullWidth
          required
          variant="outlined"
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleCreate}
          variant="contained"
          color="primary"
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateBoardModal;
