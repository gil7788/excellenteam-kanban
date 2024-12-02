import React from "react";
import { Card, CardContent, Typography, Button, Grid } from "@mui/material";
import { Board } from "../../types";

interface BoardListProps {
  boards: Board[];
  onDeleteBoard: (id: number) => void;
}

const BoardList: React.FC<BoardListProps> = ({ boards, onDeleteBoard }) => {
  return (
    <Grid container spacing={3}>
      {boards.map((board) => (
        <Grid item xs={12} sm={6} md={4} lg={3} key={board.id}>
          <Card>
            <CardContent>
              <Typography variant="h6">{board.title}</Typography>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => onDeleteBoard(board.id)}
                sx={{ marginTop: 2 }}
              >
                Delete
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default BoardList;
