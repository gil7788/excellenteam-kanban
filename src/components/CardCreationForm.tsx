import {
  Autocomplete,
  Button,
  Checkbox,
  Chip,
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
import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";

const availableTags: Tag[] = [
  { id: "1", label: "Urgent", color: "#ff0000" },
  { id: "2", label: "Bug", color: "#ffa500" },
  { id: "3", label: "Feature", color: "#00ff00" },
  { id: "4", label: "Urgent2", color: "#ff0000" },
  { id: "5", label: "Bug2", color: "#ffa500" },
  { id: "6", label: "Feature2", color: "#00ff00" },
  { id: "7", label: "Urgent3", color: "#ff0000" },
  { id: "8", label: "Bug3", color: "#ffa500" },
  { id: "9", label: "Feature3", color: "#00ff00" },
];

interface CardCreationFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (card: CardType) => void;
}

const CardCreationForm = (props: CardCreationFormProps) => {
  const { open, onClose, onSubmit } = props;
  const initialCardData: CardType = {
    id: Date.now().toString(),
    title: "",
    description: "",
    createdAt: new Date().toISOString(),
    dueDate: "",
    tags: [],
  };

  const [cardData, setCardData] = useState(initialCardData);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setCardData({ ...cardData, [name]: value });
  };

  const handleDateChange = (newValue: Date | null) => {
    setSelectedDate(newValue);
    const newSelectedDate = newValue ? newValue.toISOString() : "";
    setCardData({ ...cardData, dueDate: newSelectedDate });
  };

  // const handleTagsChange(newValue) => {
  //   setSelectedTags((prev) => [...prev, newValue])
  // }
  
  const handleClose = () => {
    onClose();
    setCardData(initialCardData);
    setSelectedDate(null);
  };

  const handleSubmit = () => {
    if (cardData.title.trim()) {
      onSubmit(cardData);
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
        <Autocomplete
          multiple
          options={availableTags}
          disableCloseOnSelect
          getOptionLabel={(option: Tag) => option.label}
          value={selectedTags}
          onChange={(_event, newValue) => setSelectedTags(newValue)}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => {
              const { key, ...tagProps } = getTagProps({ index });
              return (
                <Chip
                  key={key}
                  label={option.label}
                  style={{ backgroundColor: option.color, color: "white" }}
                  {...tagProps}
                />
              );
            })
          }
          renderOption={(props, option, { selected }) => {
            const { key, ...optionProps } = props;
            return (
              <li key={key} {...optionProps}>
                <Checkbox
                  icon={<CheckBoxOutlineBlank fontSize="small"/>}
                  checkedIcon={<CheckBox fontSize="small"/>}
                  style={{ marginRight: 8 }}
                  checked={selected}
                />
                {option.label}
              </li>
            );
          }}
          renderInput={(params) => <TextField margin="normal" {...params} label="Tags" />}
        />
        
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="outlined">
          Cancel
        </Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CardCreationForm;
