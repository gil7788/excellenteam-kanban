import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid2 as Grid,
  CardActions,
} from "@mui/material";
import { BoardMetadata } from "../../types/types";
import { Link } from "react-router-dom";

interface BoardListProps {
  boards: BoardMetadata[];
  onDeleteBoard: (id: string) => void;
}

const BoardList = (props: BoardListProps) => {
  const { boards, onDeleteBoard } = props;

  return (
    <Grid container spacing={2}>
      {boards.map((board) => (
        <Grid columns={{ xs: 2, sm: 3, md: 4 }} key={board.id}>
          <Card
            sx={{
              width: 200,
              border: 3,
              borderColor: board.color || "background.paper",
            }}
          >
            <CardContent>
              <Typography variant="h6">{board.title}</Typography>
            </CardContent>

            <CardActions>
              <Button
                component={Link}
                to={`/dashboard/${board.id}`}
                variant="contained"
                color="secondary"
                sx={{ mt: 2 }}
              >
                Open
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => onDeleteBoard(board.id)}
                sx={{ mt: 2 }}
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default BoardList;
