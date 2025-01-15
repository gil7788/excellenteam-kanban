import {
  Button,
  IconButton,
  Menu,
  TextField,
  Toolbar,
  Typography,
  useTheme as MuiUseTheme,
} from "@mui/material";
import { StarBorderRounded, StarRounded } from "@mui/icons-material";
import { useState, useEffect, useRef } from "react";
import FilterMenu from "./FilterMenu";
import { useBoard } from "../hooks/useBoard";

interface KanbanBoardMenuBarProps {
  boardId: string;
}

const KanbanBoardMenuBar: React.FC<KanbanBoardMenuBarProps> = ({ boardId }) => {
  const { board, updateBoard } = useBoard(boardId);
  const theme = MuiUseTheme();
  const [isFavorite, setIsFavorite] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [title, setTitle] = useState(board?.title);
  const [isEditing, setIsEditing] = useState(false);
  const [inputWidth, setInputWidth] = useState(0);
  const measureRef = useRef<HTMLSpanElement>(null);
  // const [filteredLists, setFilteredLists] = useState<
  //   { listId: string; cards: CardType[] }[]
  // >([]);

  useEffect(() => {
    if (measureRef.current && title) {
      const width = measureRef.current.getBoundingClientRect().width;
      setInputWidth(width + 16);
    }
  }, [title]);

  if (!board) return <div>Error board not found</div>;

  const toggleFavorite = () => setIsFavorite((prev) => !prev);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleBlur = () => {
    setIsEditing(false);
    setTitle(title?.trim());
    if (!title || title.trim() === board?.title) {
      setTitle(board?.title);
      return;
    }
    updateBoard({ updatedMetadata: { title: title } });
  };

  // const handleFilteredCardsChange = (
  //   filtered: { listId: string; cards: CardType[] }[]
  // ) => {
  //   setFilteredLists(filtered);
  // };
  // const handleFilterChange = (filters: FilterObject) => {
  //   // Apply the filters to your cards
  //   const filteredCards = cards.filter((card) => {
  //     // Keyword match
  //     const keywordMatch = filters.keyword
  //       ? card.title.toLowerCase().includes(filters.keyword.toLowerCase()) ||
  //         card.description.toLowerCase().includes(filters.keyword.toLowerCase())
  //       : true;

  //     // Due date match
  //     const dueDateMatch =
  //       filters.dueDate.length === 0
  //         ? true
  //         : filters.dueDate.some((dateFilter) => {
  //             switch (dateFilter) {
  //               case "noDate":
  //                 return !card.dueDate;
  //               case "overdue":
  //                 return card.dueDate && new Date(card.dueDate) < new Date();
  //               case "nextDay": {
  //                 const tomorrow = new Date();
  //                 tomorrow.setDate(tomorrow.getDate() + 1);
  //                 return card.dueDate && new Date(card.dueDate) <= tomorrow;
  //               }
  //               default:
  //                 return true;
  //             }
  //           });
  //     // Labels match
  //     const labelMatch =
  //       filters.labels.length === 0
  //         ? true
  //         : filters.match === "any"
  //         ? card.tagIds.some((id) => filters.labels.includes(id))
  //         : filters.labels.every((id) => card.tagIds.includes(id));

  //     return filters.match === "any"
  //       ? keywordMatch || dueDateMatch || labelMatch
  //       : keywordMatch && dueDateMatch && labelMatch;
  //   });

  //   setFilteredCards(filteredCards);
  // };

  return (
    <Toolbar
      sx={{
        height: (theme) => theme.heightVariants.boardBarHeight,
        //bgcolor: board?.color || "background.default",
        // overflowX: "auto",
        // "&::-webkit-scrollbar-track": {
        //   m: 2,
        // },
      }}
    >
      {/* Editable Title */}
      <span
        ref={measureRef}
        style={{
          visibility: "hidden",
          position: "absolute",
          whiteSpace: "pre",
          ...theme.typography.h5,
        }}
      >
        {title}
      </span>

      {!isEditing ? (
        <Typography
          variant="h5"
          onClick={() => setIsEditing(true)}
          sx={{
            p: 0.5,
            borderRadius: 1,
            transition: "background-color 0.2s ease",
            "&:hover": {
              bgcolor: (theme) => theme.palette.action.hover,
              cursor: "pointer",
            },
          }}
        >
          {title}
        </Typography>
      ) : (
        <TextField
          variant="standard"
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleBlur();
            }
          }}
          sx={{
            width: inputWidth,
            minWidth: 60,
            "& .MuiInput-root": {
              "&:before, &:after": {
                display: "none",
              },
              "& input": {
                ...theme.typography.h5,
                p: "2px 4px",
                bgcolor: (theme) =>
                  theme.palette.mode === "light" ? "white" : "#33485D",
                border: 2,
                borderColor: "primary.main",
                borderRadius: 1,
              },
            },
          }}
        />
      )}

      {/* Toggle Favorite */}
      <IconButton onClick={toggleFavorite} size="small" sx={{ ml: 1 }}>
        {isFavorite ? <StarRounded color="primary" /> : <StarBorderRounded />}
      </IconButton>

      {/* Filter & Search Menu */}
      <Button
        id="filter-menu-button"
        aria-controls={open ? "filter-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        variant="outlined"
        size="small"
        sx={{ ml: "auto" }}
      >
        Filters
      </Button>
      <Menu
        id="filter-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "filter-menu-button",
        }}
      >
        <FilterMenu
          board={board}
          // onFilteredCardsChange={handleFilteredCardsChange}
          // tags={board?.tags || []}
          // onFilterChange={handleFilterChange}
        />
      </Menu>
    </Toolbar>
  );
};

export default KanbanBoardMenuBar;
