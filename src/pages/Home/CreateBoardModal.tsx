import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

type CreateBoardModalProps = {
  open: boolean;
  onClose: () => void;
  onCreate: (title: string) => void;
};

const CreateBoardModal: React.FC<CreateBoardModalProps> = ({
  open,
  onClose,
  onCreate,
}) => {
  const [title, setTitle] = useState("");
  //const [titleError, setTitleError] = useState(false);

  const handleCreate = () => {
    onCreate(title);
    setTitle("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create board</DialogTitle>
      <DialogContent>
        <TextField
          label="Board title"
          fullWidth
          required
          variant="outlined"
          margin="normal"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleCreate}
          variant="contained"
          color="primary"
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateBoardModal;

// const CreateBoardModal: React.FC<CreateBoardModalProps> = ({
//   onCreateBoard,
// }) => {
//   const [open, setOpen] = useState(false);
//   const [title, setTitle] = useState("");
//   const [titleError, setTitleError] = useState(false);
//   const [description, setDesciption] = useState("");

//   const handleTitleChange = (e: { target: { value: SetStateAction<string>; }; }) => {
//     setTitle(e.target.value);
//     if (title) {
//       setTitleError(false);
//     } else {
//       setTitleError(true);
//     }
//   };

//   const handleCreate = () => {
//     if (title) {
//       onCreateBoard({ id: Date.now().toString(), title, description });
//       setTitle("");
//       setDesciption("");
//       setOpen(false);
//     }
//   };

//   return (
//     <>
//       <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
//         Create New Board
//       </Button>
//       <Modal open={open} onClose={() => setOpen(false)}>
//         <Box sx={ModalStyle}>
//           <TextField
//             label="Board Title"
//             required
//             fullWidth
//             value={title}
//             onChange={handleTitleChange}
//             error={titleError}
//             helperText={titleError ? "Title is required" : ""}
//             sx={{ marginBottom: 2 }}
//           />
//           <TextField
//             label="Description"
//             fullWidth
//             value={description}
//             onChange={(e) => setDesciption(e.target.value)}
//             sx={{ marginBottom: 2 }}
//           />
//           <Button variant="contained" onClick={handleCreate}>
//             Create
//           </Button>
//         </Box>
//       </Modal>
//     </>
//   );
// };

// export default CreateBoardModal;

// import React, { SetStateAction, useState } from "react";
// import { Button, Modal, Box, TextField } from "@mui/material";

// const ModalStyle = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   p: 4,
// };

// interface CreateBoardModalProps {
//   onCreateBoard: (board: {
//     id: string;
//     title: string;
//     description?: string;
//   }) => void;
// }

// const CreateBoardModal: React.FC<CreateBoardModalProps> = ({
//   onCreateBoard,
// }) => {
//   const [open, setOpen] = useState(false);
//   const [title, setTitle] = useState("");
//   const [titleError, setTitleError] = useState(false);
//   const [description, setDesciption] = useState("");

//   const handleTitleChange = (e: { target: { value: SetStateAction<string>; }; }) => {
//     setTitle(e.target.value);
//     if (title) {
//       setTitleError(false);
//     } else {
//       setTitleError(true);
//     }
//   };

//   const handleCreate = () => {
//     if (title) {
//       onCreateBoard({ id: Date.now().toString(), title, description });
//       setTitle("");
//       setDesciption("");
//       setOpen(false);
//     }
//   };

//   return (
//     <>
//       <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
//         Create New Board
//       </Button>
//       <Modal open={open} onClose={() => setOpen(false)}>
//         <Box sx={ModalStyle}>
//           <TextField
//             label="Board Title"
//             required
//             fullWidth
//             value={title}
//             onChange={handleTitleChange}
//             error={titleError}
//             helperText={titleError ? "Title is required" : ""}
//             sx={{ marginBottom: 2 }}
//           />
//           <TextField
//             label="Description"
//             fullWidth
//             value={description}
//             onChange={(e) => setDesciption(e.target.value)}
//             sx={{ marginBottom: 2 }}
//           />
//           <Button variant="contained" onClick={handleCreate}>
//             Create
//           </Button>
//         </Box>
//       </Modal>
//     </>
//   );
// };

// export default CreateBoardModal;
