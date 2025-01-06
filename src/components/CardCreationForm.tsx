import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { Card as CardType, Tag } from "../types/types";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { enGB } from "date-fns/locale";
import { useBoard } from "../hooks/useBoard";
import { TagSelector } from "./TagSelector";

interface CardCreationFormProps {
  boardId: string;
  open: boolean;
  onClose: () => void;
  onSubmit: (card: CardType) => void;
}

const CardCreationForm = (props: CardCreationFormProps) => {
  const { open, onClose, onSubmit, boardId } = props;
  const { board, addTag, updateTag } = useBoard(boardId);

  const initialCardData: CardType = {
    id: Date.now().toString(),
    title: "",
    description: "",
    createdAt: new Date().toISOString(),
    dueDate: "",
    tagIds: [],
  };

  const [cardData, setCardData] = useState(initialCardData);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCardData({ ...cardData, [name]: value });
  };

  const handleDateChange = (newValue: Date | null) => {
    setSelectedDate(newValue);
    //const newSelectedDate = newValue ? newValue.toISOString() : "";
    //setCardData({ ...cardData, dueDate: newSelectedDate });
  };

  const handleAddTag = (tagData: Omit<Tag, "id">) => {
    const newTag: Tag = { id: `tag-${Date.now()}`, ...tagData };
    addTag(newTag);
    setSelectedTagIds((prev) => [...prev, newTag.id]);
  };

  const handleClose = () => {
    onClose();
    setCardData(initialCardData);
    setSelectedDate(null);
    setSelectedTagIds([]);
  };

  const handleSubmit = () => {
    if (cardData.title.trim()) {
      const newCard: CardType = {
        ...cardData,
        tagIds: selectedTagIds,
        dueDate: selectedDate?.toISOString() || "",
      };
      onSubmit(newCard);
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add new card</DialogTitle>
      <DialogContent>
        {/* Title */}
        <TextField
          label="Title"
          name="title"
          value={cardData.title}
          onChange={handleChange}
          fullWidth
          required
          variant="outlined"
          margin="normal"
        />

        {/* Description */}
        <TextField
          label="Description"
          name="description"
          value={cardData.description}
          onChange={handleChange}
          fullWidth
          multiline
          rows={3}
          variant="outlined"
          margin="normal"
        />

        {/* Due Date */}
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
          <DatePicker
            label="Due Date"
            value={selectedDate}
            onChange={handleDateChange}
            disablePast
            slotProps={{
              textField: {
                margin: "normal",
                fullWidth: true,
              },
            }}
          />
        </LocalizationProvider>

        {/* Tags */}
        <TagSelector
          availableTags={board?.tags || []}
          selectedTagIds={selectedTagIds}
          onChange={setSelectedTagIds}
          onAddTag={handleAddTag}
          onUpdateTag={updateTag}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" disabled={!cardData.title.trim()}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CardCreationForm;
