import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  Stack,
  Divider,
} from "@mui/material";

interface CreateBoardModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (title: string, color: string) => void;
}

const PRESET_COLORS = [
  "#2563EB", // blue
  "#7C3AED", // purple
  "#16A34A", // green
  "#CA8A04", // yellow
  "#EA580C", // orange
  "#DC2626", // red
  "#DB2777", // pink
];

const CreateBoardModal: React.FC<CreateBoardModalProps> = ({
  open,
  onClose,
  onCreate,
}) => {
  const [title, setTitle] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");

  const handleCreate = () => {
    if (title.trim()) {
      onCreate(title.trim(), selectedColor);
      handleClose();
    }
  };

  const handleClose = () => {
    onClose();
    setTitle("");
    setSelectedColor("");
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create Board</DialogTitle>
      <DialogContent>
        <Stack spacing={1} sx={{ pt: 1 }}>
          {/* Board Title */}
          <TextField
            label="Board title"
            fullWidth
            required
            variant="outlined"
            size="small"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />

          <Divider sx={{ pt: 1 }} />

          {/* Board Color */}
          <Typography variant="subtitle2" sx={{ pt: 1 }}>
            Background (Optional)
          </Typography>

          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
            {PRESET_COLORS.map((color) => (
              <Box
                key={color}
                onClick={() => setSelectedColor(color)}
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: 1,
                  backgroundColor: color,
                  cursor: "pointer",
                  border:
                    selectedColor === color
                      ? "2px solid black"
                      : "2px solid transparent",
                  "&:hover": {
                    opacity: 0.8,
                  },
                }}
              />
            ))}
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleCreate}
          variant="contained"
          disabled={!title.trim()}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateBoardModal;
