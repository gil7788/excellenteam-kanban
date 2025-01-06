import { useState } from "react";
import { Card as CardType } from "../types/types";
import {
  Card as MuiCard,
  CardContent,
  Typography,
  CardActionArea,
} from "@mui/material";
import ExpandedCard from "./ExpandedCard";
import { useBoard } from "../hooks/useBoard";

interface CardProps {
  card: CardType;
  listId: string;
  boardId: string;
  isDragging?: boolean;
}

const Card = (props: CardProps) => {
  const { card, listId, boardId, isDragging } = props;
  const { deleteCard, updateCard } = useBoard(boardId);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  //const [expanded, setExpanded] = useState(false);

  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };

  const handleDeleteCard = (cardId: string) => {
    deleteCard(listId, cardId);
  };

  const handleUpdateCard = (updatedCard: CardType) => {
    updateCard(listId, updatedCard);
  };

  return (
    <>
      <MuiCard
        elevation={3}
        sx={{ mb: 1, opacity: isDragging ? 0.5 : undefined, cursor: "move" }}
      >
        <CardActionArea onClick={handleOpenDialog}>
          <CardContent>
            <Typography variant="subtitle1">{card.title}</Typography>
            {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Typography variant="body2" color="text.secondary">
              {card.description}
            </Typography>
            {!!card.dueDate && (
              <Typography variant="body2" color="text.secondary">
                {card.dueDate}
              </Typography>
            )}
          </Collapse> */}
          </CardContent>
        </CardActionArea>
      </MuiCard>

      {/* Expanded Card Modal */}
      {/* <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      > */}
      <ExpandedCard
        boardId={boardId}
        card={card}
        open={openDialog}
        onClose={handleCloseDialog}
        onUpdateCard={handleUpdateCard}
        onDeleteCard={handleDeleteCard}
      />
    </>
  );
};

export default Card;
