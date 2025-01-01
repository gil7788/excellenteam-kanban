import { Button, IconButton, Menu, Toolbar, Typography } from "@mui/material";
import { StarBorderRounded, StarRounded } from "@mui/icons-material";
import { useState } from "react";
import FilterMenu from "./FilterMenu";

interface KanbanBoardMenuBarProps {
  boardId: string;
}

const KanbanBoardMenuBar: React.FC<KanbanBoardMenuBarProps> = ({ boardId }) => {
  //const { board } = useBoard(boardId);
  const [isFavorite, setIsFavorite] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const toggleFavorite = () => setIsFavorite((prev) => !prev);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Toolbar
      sx={{
        height: (theme) => theme.heightVariants.boardBarHeight,
        overflowX: 'auto',
        // "&::-webkit-scrollbar-track": {
        //   m: 2,
        // },
      }}
    >
      <Typography
        variant="h5"
        color="inherit"
        noWrap
        //sx={{ flex: 1 }}
      >
        {boardId} {/* {board?.id} */}
      </Typography>
      <IconButton onClick={toggleFavorite}>
        {/* <Checkbox icon={<StarBorderRounded />} checkedIcon={<StarRounded />} /> */}
        {isFavorite ? <StarRounded /> : <StarBorderRounded />}
      </IconButton>

      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        variant="outlined"
        size="small"
        sx={{ marginLeft: "auto" }}
      >
        Filters
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <FilterMenu />
      </Menu>
    </Toolbar>
  );
};

export default KanbanBoardMenuBar;
