import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";

// interface FilterMenuProps {
//     onSearch: (query: string) => void;
//     onFilter: (filters: any) => void;
// }

interface FilterObject {
  keyword: string;
  dueDate: string;
  labels: string[];
  match: "any" | "exact";
}

const FilterMenu = () => {
  const [filters, setFilters] = useState<FilterObject>({
    keyword: "",
    dueDate: "",
    labels: [],
    match: "any",
  });

  const handleChange = (field: string, value: string | string[]) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Box sx={{ p: 2, width: 300 }}>
      <Typography align="center" variant="subtitle1" gutterBottom>
        Filter
      </Typography>
      <Divider />

      {/* Free Search */}
      <Typography variant="body2" sx={{ mt: 2, mb: 1 }}>
        Keyword
      </Typography>
      <TextField
        fullWidth
        size="small"
        placeholder="Enter a keyword..."
        helperText="Search cards, labels, and more."
      />

      {/* Due Date Filter*/}
      <Typography variant="body2" sx={{ mt: 2, mb: 1 }}>
        Due date
      </Typography>
      <Box display="flex" flexDirection="column">
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={filters.dueDate === "noDate"}
              onChange={() => handleChange("dueDate", "noDate")}
            />
          }
          label="No dates"
        />
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={filters.dueDate === "overdue"}
              onChange={() => handleChange("dueDate", "overdue")}
            />
          }
          label="Overdue"
        />
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={filters.dueDate === "nextDay"}
              onChange={() => handleChange("dueDate", "nextDay")}
            />
          }
          label="Due in the next day"
        />
      </Box>

      {/* Labels Filter*/}
      <Typography variant="body2" sx={{ mt: 2, mb: 1 }}>
        Labels
      </Typography>
      <Box display="flex" flexDirection="column">
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={filters.labels.length === 0}
              onChange={() => handleChange("labels", "noLabel")}
            />
          }
          label="No label"
        />
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={filters.labels.length > 0}
              onChange={() => handleChange("labels", "someLabel")}
            />
          }
          label={
            <Select
              multiple
              fullWidth
              size="small"
              value={filters.labels}
              onChange={(e) => handleChange("labels", e.target.value)}
              displayEmpty
            >
              <MenuItem value="" disabled>
                Select labels
              </MenuItem>
              <MenuItem value="bug">Bug</MenuItem>
              <MenuItem value="feature">Feature</MenuItem>
              <MenuItem value="docs">Docs</MenuItem>
            </Select>
          }
        />
      </Box>

      <Divider sx={{ my: 2 }} />

      {/* Match Type */}
      <Select
        fullWidth
        size="small"
        value={filters.match}
        onChange={(e) => handleChange("match", e.target.value)}
      >
        <MenuItem value="any">Any match</MenuItem>
        <MenuItem value="exact">Exact match</MenuItem>
      </Select>
    </Box>
  );
};

export default FilterMenu;
