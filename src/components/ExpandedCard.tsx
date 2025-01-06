import { useState } from "react";
import {
  Drawer,
  Box,
  Grid2 as Grid,
  Typography,
  Button,
  IconButton,
  TextField,
  Divider,
} from "@mui/material";
import {
  Close as CloseIcon,
  DeleteOutline as DeleteIcon,
} from "@mui/icons-material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { enGB } from "date-fns/locale";
import { Card as CardType, Tag } from "../types/types";
import { useBoard } from "../hooks/useBoard";
import { TagSelector } from "./TagSelector";

interface ExpandedCardProps {
  boardId: string;
  card: CardType;
  open: boolean;
  onClose: () => void;
  onUpdateCard: (updatedCard: CardType) => void;
  onDeleteCard: (cardId: string) => void;
}

const ExpandedCard: React.FC<ExpandedCardProps> = (
  props: ExpandedCardProps
) => {
  const { boardId, card, open, onClose, onUpdateCard, onDeleteCard } = props;
  const { board, addTag, updateTag } = useBoard(boardId);

  const [title, setTitle] = useState(card.title);
  //const [dueDate, setDueDate] = useState(card.dueDate);
  const [description, setDescription] = useState(card.description);
  const [selectedDueDate, setSelectedDueDate] = useState<Date | null>(
    card.dueDate ? new Date(card.dueDate) : null
  );
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>(card.tagIds);

  const handleSave = () => {
    if (!title.trim()) {
      setTitle(card.title);
    }
    onUpdateCard({
      ...card,
      title,
      description,
      tagIds: selectedTagIds,
    });
    onClose();
  };

  const handleAddTag = (tagData: Omit<Tag, "id">) => {
    const newTag: Tag = { id: `tag-${Date.now()}`, ...tagData };
    addTag(newTag);
    setSelectedTagIds((prev) => [...prev, newTag.id]);
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiDrawer-paper": {
          width: "450px",
          padding: 2,
        },
      }}
    >
      <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid>
            <Typography variant="h5">{card.title}</Typography>
          </Grid>
          <Grid container gap={2}>
            <Grid>
              <IconButton size="small" onClick={() => onDeleteCard(card.id)}>
                <DeleteIcon />
              </IconButton>
            </Grid>
            <Grid>
              <IconButton onClick={onClose}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        {/* Form */}
        <Box sx={{ flexGrow: 1, overflowY: "auto", p: 2 }}>
          <Grid container spacing={3}>
            {/* Title */}
            <Grid size={12}>
              <TextField
                fullWidth
                label="Title"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Grid>

            {/* Due Date */}
            <Grid size={{ xs: 12 }}>
              <Grid container alignItems="center" spacing={2}>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Typography variant="subtitle1">Due date:</Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 8 }}>
                  <LocalizationProvider
                    dateAdapter={AdapterDateFns}
                    adapterLocale={enGB}
                  >
                    <DatePicker
                      disabled
                      label="Due Date"
                      value={selectedDueDate}
                      onChange={(newValue) => setSelectedDueDate(newValue)}
                      slotProps={{ textField: { fullWidth: true } }}
                    />
                  </LocalizationProvider>
                </Grid>
              </Grid>
            </Grid>

            {/* Description */}
            <Grid size={{ xs: 12 }}>
              <Grid container alignItems="center" spacing={2}>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Typography variant="subtitle1">Description:</Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 8 }}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    variant="outlined"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Tags */}
            <Grid size={{ xs: 12 }}>
              <TagSelector
                availableTags={board?.tags || []}
                selectedTagIds={selectedTagIds}
                onChange={setSelectedTagIds}
                onAddTag={handleAddTag}
                onUpdateTag={updateTag}
              />
            </Grid>

            {/* Save Button */}
            <Grid size={{ xs: 12 }}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSave}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Drawer>
  );
};

export default ExpandedCard;
