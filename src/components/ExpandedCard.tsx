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
  Chip,
} from "@mui/material";
import { Close as CloseIcon, DeleteOutline as DeleteIcon } from "@mui/icons-material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { enGB } from "date-fns/locale";
import { Card as CardType, Tag } from "../types/types";

const ALL_TAGS: Tag[] = [
  { id: "1", label: "Urgent", color: "#D32F2F" },
  { id: "2", label: "Low Priority", color: "#1976D2" },
  { id: "3", label: "Bug", color: "#F57C00" },
  { id: "4", label: "Feature", color: "#388E3C" },
];

interface ExpandedCardProps {
  card: CardType;
  open: boolean;
  onClose: () => void;
  onUpdateCard: (updatedCard: CardType) => void;
  onDeleteCard: (cardId: string) => void;
}

const ExpandedCard: React.FC<ExpandedCardProps> = ({
  card,
  open,
  onClose,
  onUpdateCard,
  onDeleteCard
}) => {
  const [title, setTitle] = useState(card.title);
  //const [dueDate, setDueDate] = useState(card.dueDate);
  const [description, setDescription] = useState(card.description);
  const [selectedDueDate, setSelectedDueDate] = useState<Date | null>(
    card.dueDate ? new Date(card.dueDate) : null
  );
  const [tags, setTags] = useState<Tag[]>(card.tags);

  const handleTagToggle = (tag: Tag) => {
    setTags((prevTags) => {
      const isTagSelected = prevTags.some((t) => t.id === tag.id);
      return isTagSelected
        ? prevTags.filter((t) => t.id !== tag.id) // Remove tag
        : [...prevTags, tag]; // Add tag
    });
  };

  const handleSave = () => {
    if (!title.trim()) {
      setTitle(card.title); // back to original state
    }
    onUpdateCard({
      ...card,
      title,
      description,
      tags,
    });
    onClose();
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
              <Grid container alignItems="center" spacing={2}>
                <Grid size={{ xs: 12, sm: 4 }}>
                  <Typography variant="subtitle1">Tags:</Typography>
                </Grid>
                <Grid size={{ xs: 12, sm: 8 }}>
                  {ALL_TAGS.map((tag) => (
                    <Chip
                      key={tag.id}
                      label={tag.label}
                      clickable
                      onClick={() => handleTagToggle(tag)}
                      color={
                        tags.some((t) => t.id === tag.id)
                          ? "primary"
                          : "default"
                      }
                      sx={{
                        backgroundColor: tags.some((t) => t.id === tag.id)
                          ? tag.color
                          : undefined,
                      }}
                    />
                  ))}
                </Grid>
              </Grid>
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

// const ExpandedCard: React.FC<ExpandedCardProps> = ({ card, onClose }) => {
//   const [title, setTitle] = useState(card.title);
//   const [description, setDescription] = useState(card.description);
//   const [selectedTags, setSelectedTags] = useState<Tag[]>(card.tags);
//   //const [selectedDate, setSelectedDate] = useState<Date | null>(null);
//   const [selectedDate, setSelectedDate] = useState<Date | null>(
//     card.dueDate ? new Date(card.dueDate) : null
//   );
// //   const handleChange = (
// //     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
// //   ) => {
// //     const { name, value } = e.target;
// //     setCardData({ ...cardData, [name]: value });
// //   };

// //   const handleDateChange = (newValue: Date | null) => {
// //     setSelectedDate(newValue);
// //     const newSelectedDate = newValue ? newValue.toISOString() : "";
// //     setCardData({ ...cardData, dueDate: newSelectedDate });
// //   };

//   const toggleTag = (tag: Tag) => {
//     setSelectedTags((prevTags) =>
//       prevTags.some((t) => t.id === tag.id)
//         ? prevTags.filter((t) => t.id !== tag.id)
//         : [...prevTags, tag]
//     );
//   };

//   const handleSave = () => {

//     console.log("Updated Card Data:", {
//       title,
//       description,
//       dueDate: selectedDate,
//       tags: selectedTags,
//     });
//     onClose();
//   };

//   return (
//     <>
//       <DialogTitle>Card Details</DialogTitle>
//       <DialogContent>
//         <Stack spacing={2} sx={{ mt: 1 }}>
//           {/* Title */}
//           <TextField
//             label="Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             fullWidth
//           />

//           {/* Description */}
//           <TextField
//             label="Description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             fullWidth
//             multiline
//             rows={3}
//           />

//           {/* Due Date */}
//           <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
//             <DatePicker
//             disabled
//               label="Due Date"
//               value={selectedDate}
//               onChange={(newValue) => setSelectedDate(newValue)}
//               slotProps={{ textField: { fullWidth: true } }}
//             />
//           </LocalizationProvider>

//           {/* Tags */}
//           <Typography variant="body2">
//             <strong>Tags:</strong>
//           </Typography>
//           <Stack direction="row" spacing={1} flexWrap="wrap">
//             {ALL_TAGS.map((tag) => (
//               <Chip
//                 key={tag.id}
//                 label={tag.label}
//                 onClick={() => toggleTag(tag)}
//                 sx={{
//                   backgroundColor: selectedTags.some((t) => t.id === tag.id)
//                     ? tag.color
//                     : "#E0E0E0",
//                   color: selectedTags.some((t) => t.id === tag.id)
//                     ? "#fff"
//                     : "#000",
//                   cursor: "pointer",
//                 }}
//                 size="small"
//               />
//             ))}
//           </Stack>
//         </Stack>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={onClose} variant="outlined" color="secondary">
//           Cancel
//         </Button>
//         <Button onClick={handleSave} variant="contained" color="primary">
//           Save
//         </Button>
//       </DialogActions>
//     </>
//   );
// };

// export default ExpandedCard;
