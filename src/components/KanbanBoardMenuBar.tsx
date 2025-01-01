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

  useEffect(() => {
    if (measureRef.current && title) {
      const width = measureRef.current.getBoundingClientRect().width;
      setInputWidth(width + 16);
    }
  }, [title]);

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

  return (
    <Toolbar
      sx={{
        height: (theme) => theme.heightVariants.boardBarHeight,
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
        <FilterMenu />
      </Menu>
    </Toolbar>
  );
};

export default KanbanBoardMenuBar;
