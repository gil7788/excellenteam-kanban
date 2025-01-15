import { Board, List, Card, BoardMetadata, Tag } from "../types/types";
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

  const addList = (newList: List) => {
    if (board) {
      setBoard({ ...board, lists: [...board.lists, newList] });
    }
  };

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

  const addTag = (newTag: Tag) => {
    if (board) {
      setBoard({ ...board, tags: [...board.tags, newTag] });
    }
  };

  const deleteTag = (tagId: string) => {
    if (board) {
      setBoard({
        ...board,
        tags: board.tags.filter((tag) => tag.id !== tagId),
        // Remove the tag from all cards
        lists: board.lists.map((list) => ({
          ...list,
          cards: list.cards.map((card) => ({
            ...card,
            tagIds: card.tagIds.filter((id) => id !== tagId),
          })),
        })),
      });
    }
  };

  const updateTag = (id: string, updates: Partial<Tag>) => {
    if (board) {
      setBoard({
        ...board,
        tags: board.tags.map((tag) =>
          tag.id === id ? { ...tag, ...updates } : tag
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
    addTag,
    updateTag,
    deleteTag,
  };
}
