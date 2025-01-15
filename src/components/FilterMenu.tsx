import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { Board } from "../types/types";

interface FilterObject {
  keyword: string;
  dueDate: string[];
  labels: string[];
  match: "any" | "exact";
}

interface FilterMenuProps {
  // onSearch: (query: string) => void;
  // onFilter: (filters: any) => void;
  // tags: Tag[];
  // onFilterChange: (filters: FilterObject) => void;
  board: Board;
  // onFilteredCardsChange: (
  //   filteredCards: { listId: string; cards: Card[] }[]
  // ) => void;
}

const FilterMenu: React.FC<FilterMenuProps> = ({
  board,
  // onFilteredCardsChange,
}) => {
  const [filters, setFilters] = useState<FilterObject>({
    keyword: "",
    dueDate: [],
    labels: [],
    match: "any",
  });

  // useEffect(() => {
  //   applyFilters();
  // }, [filters]);

  // const applyFilters = () => {
  //   const filteredLists = board.lists.map((list) => {
  //     const filteredCards = list.cards.filter((card) => {
  //       // Keyword search in title and description
  //       const keywordMatch =
  //         !filters.keyword ||
  //         card.title.toLowerCase().includes(filters.keyword.toLowerCase()) ||
  //         (card.description
  //           ?.toLowerCase()
  //           .includes(filters.keyword.toLowerCase()) ??
  //           false);

  //       // Due date filtering
  //       const dueDateMatch =
  //         filters.dueDate.length === 0 ||
  //         filters.dueDate.some((dateFilter) => {
  //           switch (dateFilter) {
  //             case "noDate":
  //               return !card.dueDate;
  //             case "overdue":
  //               return card.dueDate && new Date(card.dueDate) < new Date();
  //             case "nextDay": {
  //               const tomorrow = new Date();
  //               tomorrow.setDate(tomorrow.getDate() + 1);
  //               return card.dueDate && new Date(card.dueDate) <= tomorrow;
  //             }
  //             default:
  //               return true;
  //           }
  //         });

  //       // Label filtering
  //       const labelMatch =
  //         filters.labels.length === 0 ||
  //         (filters.match === "any"
  //           ? filters.labels.some((labelId) => card.tagIds.includes(labelId))
  //           : filters.labels.every((labelId) => card.tagIds.includes(labelId)));

  //       // Combine all filters based on match type
  //       return filters.match === "any"
  //         ? keywordMatch || dueDateMatch || labelMatch
  //         : keywordMatch && dueDateMatch && labelMatch;
  //     });

  //     return {
  //       listId: list.id,
  //       cards: filteredCards,
  //     };
  //   });

  //   onFilteredCardsChange(filteredLists);
  // };

  // const handleChange = (field: string, value: string | string[]) => {
  //   setFilters((prev) => ({ ...prev, [field]: value }));
  // };

  // Handle text search
  // const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const newFilters = {
  //     ...filters,
  //     keyword: event.target.value,
  //   };
  //   setFilters(newFilters);
  //   onFilterChange(newFilters);
  // };
  const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({
      ...prev,
      keyword: event.target.value,
    }));
  };

  // Handle due date changes
  // const handleDueDateChange = (value: string) => {
  //   const newDueDates = filters.dueDate.includes(value)
  //     ? filters.dueDate.filter((date) => date !== value)
  //     : [...filters.dueDate, value];

  //   const newFilters = {
  //     ...filters,
  //     dueDate: newDueDates,
  //   };
  //   setFilters(newFilters);
  //   onFilterChange(newFilters);
  // };
  const handleDueDateChange = (value: string) => {
    setFilters((prev) => ({
      ...prev,
      dueDate: prev.dueDate.includes(value)
        ? prev.dueDate.filter((date) => date !== value)
        : [...prev.dueDate, value],
    }));
  };

  // Handle label changes
  // const handleLabelChange = (event: SelectChangeEvent<string[]>) => {
  //   const value = event.target.value;
  //   const newLabels = typeof value === "string" ? value.split(",") : value;

  //   const newFilters = {
  //     ...filters,
  //     labels: newLabels,
  //   };
  //   setFilters(newFilters);
  //   onFilterChange(newFilters);
  // };
  const handleLabelChange = (event: SelectChangeEvent<string[]>) => {
    const value = event.target.value;
    setFilters((prev) => ({
      ...prev,
      labels: typeof value === "string" ? value.split(",") : value,
    }));
  };

  // Handle match type change
  // const handleMatchChange = (event: SelectChangeEvent<"any" | "exact">) => {
  //   const newFilters = {
  //     ...filters,
  //     match: event.target.value as "any" | "exact",
  //   };
  //   setFilters(newFilters);
  //   onFilterChange(newFilters);
  // };

  // Handle "No Label" checkbox
  // const handleNoLabelChange = (checked: boolean) => {
  //   const newFilters = {
  //     ...filters,
  //     labels: checked ? [] : filters.labels,
  //   };
  //   setFilters(newFilters);
  //   onFilterChange(newFilters);
  // };

  return (
    <Box sx={{ p: 2, width: 300 }}>
      <Typography align="center" variant="subtitle1" gutterBottom>
        Filter
      </Typography>
      <Divider />

      {/* Keyword Search */}
      <Typography variant="body2" sx={{ mt: 2, mb: 1 }}>
        Keyword
      </Typography>
      <TextField
        fullWidth
        size="small"
        placeholder="Enter a keyword..."
        helperText="Search cards, labels, and more."
        value={filters.keyword}
        onChange={handleKeywordChange}
      />

      {/* Due Date Filter */}
      <Typography variant="body2" sx={{ mt: 2, mb: 1 }}>
        Due date
      </Typography>
      <Box display="flex" flexDirection="column">
        {[
          { value: "noDate", label: "No dates" },
          { value: "overdue", label: "Overdue" },
          { value: "next day", label: "Due in the next day" },
        ].map((option) => (
          <FormControlLabel
            key={option.value}
            control={
              <Checkbox
                size="small"
                checked={filters.dueDate.includes(option.value)}
                onChange={() => handleDueDateChange(option.value)} //{() => handleChange("dueDate", "noDate")}
              />
            }
            label={option.label}
          />
        ))}
      </Box>

      {/* 
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
        /> */}

      {/* Labels Filter */}
      <Typography variant="body2" sx={{ mt: 2, mb: 1 }}>
        Labels
      </Typography>
      <Box display="flex" flexDirection="column" gap={1}>
        <FormControlLabel
          control={
            <Checkbox
              size="small"
              checked={filters.labels.length === 0}
              //onChange={(e) => handleNoLabelChange(e.target.checked)}
              onChange={() => setFilters((prev) => ({ ...prev, labels: [] }))}
            />
          }
          label="No label"
        />

        <Select
          multiple
          fullWidth
          size="small"
          value={filters.labels}
          onChange={handleLabelChange} //{(e) => handleChange("labels", e.target.value)}
          // disabled={
          //   filters.labels.length === 0 && filters.dueDate.includes("noDate")
          // }
          renderValue={(selected) => {
            return selected.length === 0
              ? "Select labels"
              : board.tags
                  .filter((tag) => selected.includes(tag.id))
                  .map((tag) => tag.label)
                  .join(", ");
          }}
        >
          {board.tags.map((tag) => (
            <MenuItem key={tag.id} value={tag.id}>
              <Checkbox
                size="small"
                checked={filters.labels.includes(tag.id)}
              />
              <Box
                component="span"
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: 1,
                  bgcolor: tag.color,
                  mr: 1,
                  display: "inline-block",
                }}
              />
              {tag.label}
            </MenuItem>
          ))}
        </Select>
      </Box>

      {/* <FormControlLabel
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
        /> */}

      <Divider sx={{ my: 2 }} />

      {/* Match Type */}
      <Select
        fullWidth
        size="small"
        value={filters.match}
        //onChange={handleMatchChange} // {(e) => handleChange("match", e.target.value)}
        onChange={(e) =>
          setFilters((prev) => ({
            ...prev,
            match: e.target.value as "any" | "exact",
          }))
        }
      >
        <MenuItem value="any">Any match</MenuItem>
        <MenuItem value="exact">Exact match</MenuItem>
      </Select>
    </Box>
  );
};

export default FilterMenu;
