import { Board, List, Card, BoardMetadata } from "../types/types";
import { useBoardsList } from "./useBoardsList";
import useLocalStorage from "./useLocalStorage";

export function useBoard(boardId: string) {
  const [board, setBoard] = useLocalStorage<Board | null>(
    `board-${boardId}`,
    null
  );

  const { deleteBoard, updateBoard: updateBoardMetadata } = useBoardsList();

  //   if (!board) {
  //     throw new Error(`Board with ID ${boardId} not found`);
  //     // return <div>Board with ID {boardId} not found</div>;
  //   }

  const updateBoard = ({
    updatedMetadata,
    updatedLists,
  }: {
    updatedMetadata?: Partial<BoardMetadata>;
    updatedLists?: List[];
  }) => {
    if (board) {
      // Sync metadata with boards list (for metadata update)
      if (updatedMetadata) {
        updateBoardMetadata(board.id, updatedMetadata);
      }

      // Update board data
      const updatedBoard: Board = {
        ...board,
        ...(updatedMetadata && { ...updatedMetadata }),
        ...(updatedLists && { lists: updatedLists }),
      };

      // Save the updated board data
      setBoard(updatedBoard);
    }
  };

  //   const deleteBoard = () => {
  //     deleteBoard(board.id);
  //   }

  //   const updateBoard = (updatedBoard: Board) => {
  //     setBoards((prev) =>
  //       prev.map((board) => (board.id === boardId ? updatedBoard : board))
  //     );
  //   };

  const addList = (newList: List) => {
    if (board) {
      setBoard({ ...board, lists: [...board.lists, newList] });
    }
    // if (board) {
    //   const updatedBoard = {
    //     ...board,
    //     lists: [...board.lists, newList],
    //   };
    //   updateBoard(updatedBoard);
    // }
  };

  //   const moveList = (fromIndex: number, toIndex: number) => {
  //     if (board) {
  //       const newLists = [...board.lists];
  //       const [removed] = newLists.splice(fromIndex, 1);
  //       newLists.splice(toIndex, 0, removed);

  //       const updatedBoard = {
  //         ...board,
  //         lists: newLists,
  //       };
  //       updateBoard(updatedBoard);
  //     }
  //   };

  //   const moveCard = (
  //     sourceListId: string,
  //     destinationListId: string,
  //     fromIndex: number,
  //     toIndex: number
  //   ) => {
  //     if (board) {
  //       const newLists = board.lists.map((list) => {
  //         if (list.id === sourceListId) {
  //           const newCards = [...list.cards];
  //           const [removed] = newCards.splice(fromIndex, 1);

  //           if (list.id === destinationListId) {
  //             // Moving within the same list
  //             newCards.splice(toIndex, 0, removed);
  //             return { ...list, cards: newCards };
  //           }
  //           // Moving to different list
  //           return { ...list, cards: newCards };
  //         }

  //         if (list.id === destinationListId) {
  //           const newCards = [...list.cards];
  //           const [removed] =
  //             board.lists.find((l) => l.id === sourceListId)?.cards || [];
  //           newCards.splice(toIndex, 0, removed);
  //           return { ...list, cards: newCards };
  //         }

  //         return list;
  //       });

  //       const updatedBoard = {
  //         ...board,
  //         lists: newLists,
  //       };
  //       updateBoard(updatedBoard);
  //     }
  //   };

  //   const addCard = (listId: string, newCard: Card) => {
  //     // if (board) {
  //     //   const newLists = board.lists.map((list) =>
  //     //     list.id === listId ? { ...list, cards: [...list.cards, newCard] } : list
  //     //   );

  //     //   const updatedBoard = {
  //     //     ...board,
  //     //     lists: newLists,
  //     //   };
  //     //   updateBoard(updatedBoard);
  //     }
  //   };

  const deleteList = (id: string) => {
    if (board) {
      setBoard({
        ...board,
        lists: board.lists.filter((list) => list.id !== id),
      });
    }
  };

  const updateList = (id: string, title: string) => {
    if (board) {
      setBoard({
        ...board,
        lists: board.lists.map((list) =>
          list.id === id ? { ...list, title } : list
        ),
      });
    }
  };

  const addCard = (listId: string, cardData: Card) => {
    if (board) {
      setBoard({
        ...board,
        lists: board.lists.map((list) =>
          list.id === listId
            ? { ...list, cards: [...list.cards, cardData] }
            : list
        ),
      });
    }
  };

  const deleteCard = (listId: string, cardId: string) => {
    if (board) {
      setBoard({
        ...board,
        lists: board.lists.map((list) =>
          list.id === listId
            ? {
                ...list,
                cards: list.cards.filter((card) => card.id !== cardId),
              }
            : list
        ),
      });
    }
  };

  const updateCard = (listId: string, cardData: Card) => {
    if (board) {
      setBoard({
        ...board,
        lists: board.lists.map((list) =>
          list.id === listId
            ? {
                ...list,
                cards: list.cards.map((card) =>
                  card.id === cardData.id ? cardData : card
                ),
              }
            : list
        ),
      });
    }
  };

  return {
    board,
    updateBoard,
    deleteBoard,
    addList,
    updateList,
    deleteList,
    addCard,
    updateCard,
    deleteCard,
  };
}

//   const updateBoards = useCallback((updater: (board: Board) => Board) => {
//     setBoards(prevBoards =>
//       prevBoards.map(board =>
//         board.id === boardId ? updater(board) : board
//       )
//     );
//   }, [boardId, setBoards]);

//   const board = boards.find((b) => b.id === boardId);

//   const updateBoard = useCallback((updatedBoard: Board) => {
//     setBoards(prev =>
//       prev.map((board) => (board.id === boardId ? updatedBoard : board))
//     );
//   }, [boardId, setBoards]);

//   const moveCard = useCallback((
//     sourceListId: string,
//     destinationListId: string,
//     cardId: string,
//     newIndex: number
//   ) => {
//     if (board) {
//       const sourceList = board.lists.find(l => l.id === sourceListId);
//       const card = sourceList?.cards.find(c => c.id === cardId);

//       if (!sourceList || !card) return;

//       updateBoards(board => ({
//         ...board,
//         lists: board.lists.map(list => {
//           if (list.id === sourceListId) {
//             return {
//               ...list,
//               cards: list.cards.filter(c => c.id !== cardId),
//             };
//           }
//           if (list.id === destinationListId) {
//             const newCards = [...list.cards];
//             newCards.splice(newIndex, 0, card);
//             return {
//               ...list,
//               cards: newCards,
//             };
//           }
//           return list;
//         }),
//       }));
//     }
//   }, [board, updateBoards]);

//   const moveList = useCallback((listId: string, newIndex: number) => {
//     if (board) {
//       const list = board.lists.find(l => l.id === listId);
//       if (!list) return;

//       updateBoards(board => {
//         const newLists = board.lists.filter(l => l.id !== listId);
//         newLists.splice(newIndex, 0, list);
//         return {
//           ...board,
//           lists: newLists,
//         };
//       });
//     }
//   }, [board, updateBoards]);
