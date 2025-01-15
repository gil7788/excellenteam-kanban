import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Chip,
  Popover,
  TextField,
  Typography,
  IconButton,
  Stack,
  Tooltip,
} from "@mui/material";
import {
  CheckBox,
  CheckBoxOutlineBlank,
  Add as AddIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import { Tag } from "../types/types";

interface TagSelectorProps {
  availableTags: Tag[];
  selectedTagIds: string[];
  onChange: (tagIds: string[]) => void;
  onAddTag: (tag: Omit<Tag, "id">) => void;
  onUpdateTag: (tagId: string, updates: Partial<Tag>) => void;
  disabled?: boolean;
}

interface TagPopoverProps {
  tag: Tag | null;
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  onSave: (tagData: { label: string; color: string }) => void;
  mode: "add" | "edit";
}

const PRESET_COLORS = [
  "#DC2626", // red
  "#EA580C", // orange
  "#CA8A04", // yellow
  "#16A34A", // green
  "#2563EB", // blue
  "#7C3AED", // purple
  "#DB2777", // pink
];

// TagPopover component for adding/editing tags
const TagPopover = ({
  tag,
  open,
  anchorEl,
  onClose,
  onSave,
  mode,
}: TagPopoverProps) => {
  const [label, setLabel] = useState<string>(tag?.label || "");
  const [selectedColor, setSelectedColor] = useState<string>(
    tag?.color || PRESET_COLORS[0]
  );

  // Update state when tag prop changes
  useEffect(() => {
    if (tag) {
      setLabel(tag.label);
      setSelectedColor(tag.color);
    } else {
      setLabel("");
      setSelectedColor(PRESET_COLORS[0]);
    }
  }, [tag]);

  const handleSave = () => {
    if (label.trim()) {
      onSave({ label: label.trim(), color: selectedColor });
      onClose();
    }
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
    >
      <Box sx={{ p: 2, width: 300 }}>
        <Stack spacing={2}>
          <Typography variant="subtitle1">
            {mode === "add" ? "Add Tag" : "Edit Tag"}
          </Typography>

          <TextField
            fullWidth
            size="small"
            label="Tag Name"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            autoFocus
          />

          <Typography variant="subtitle2" sx={{ mt: 1 }}>
            Select Color
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

          <Box
            sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 2 }}
          >
            <Button variant="outlined" size="small" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              size="small"
              onClick={handleSave}
              disabled={!label.trim()}
            >
              {mode === "add" ? "Add" : "Save"}
            </Button>
          </Box>
        </Stack>
      </Box>
    </Popover>
  );
};

export const TagSelector: React.FC<TagSelectorProps> = ({
  availableTags,
  selectedTagIds,
  onChange,
  onAddTag,
  onUpdateTag,
  disabled = false,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [tagToEdit, setTagToEdit] = useState<Tag | null>(null);
  const [mode, setMode] = useState<"add" | "edit">("add");

  const selectedTags = availableTags.filter((tag) =>
    selectedTagIds.includes(tag.id)
  );

  const handleAddClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setMode("add");
    setTagToEdit(null);
    setAnchorEl(e.currentTarget);
  };

  const handleEditClick = (e: React.MouseEvent<HTMLElement>, tag: Tag) => {
    e.stopPropagation();
    setMode("edit");
    setTagToEdit(tag);
    setAnchorEl(e.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setTagToEdit(null);
  };

  const handleTagSave = (tagData: { label: string; color: string }) => {
    if (mode === "add") {
      onAddTag(tagData);
    } else if (tagToEdit) {
      onUpdateTag(tagToEdit.id, tagData);
    }
  };

  return (
    <>
      <Autocomplete
        multiple
        disableClearable
        disabled={disabled}
        options={availableTags}
        value={selectedTags}
        disableCloseOnSelect
        getOptionLabel={(option: Tag) => option.label}
        onChange={(_event, newValue) => {
          onChange(newValue.map((tag) => tag.id));
        }}
        renderTags={(value, getTagProps) =>
          value.map((tag, index) => (
            <Chip
              {...getTagProps({ index })}
              key={tag.id}
              label={tag.label}
              style={{ backgroundColor: tag.color, color: "white" }}
              onClick={(e) => handleEditClick(e, tag)}
            />
          ))
        }
        renderOption={(props, tag, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={<CheckBoxOutlineBlank fontSize="small" />}
              checkedIcon={<CheckBox fontSize="small" />}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            <Box
              component="span"
              sx={{
                width: 16,
                height: 16,
                mr: 1,
                borderRadius: 0.5,
                backgroundColor: tag.color,
              }}
            />
            <span style={{ flexGrow: 1 }}>{tag.label}</span>
            <IconButton
              size="small"
              onClick={(e) => handleEditClick(e, tag)}
              sx={{ ml: 1 }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Tags"
            margin="normal"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {params.InputProps.endAdornment}
                  <Tooltip title="Add new custom tag">
                    <IconButton
                      size="small"
                      onClick={handleAddClick}
                      sx={{ mr: 1 }}
                    >
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </>
              ),
            }}
          />
        )}
      />

      <TagPopover
        tag={tagToEdit}
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        onSave={handleTagSave}
        mode={mode}
      />
    </>
  );
};
