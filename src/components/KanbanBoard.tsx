import { Box, Stack } from "@mui/material";
import AddNewList from "./AddNewList";
import { Card as CardType, List as ListType } from "../types/types";
import { useState } from "react";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import SortableList from "./SortableList";
import Card from "./Card";
import List from "./List";
import { createPortal } from "react-dom";
import { useBoard } from "../hooks/useBoard";

interface KanbanBoardProps {
  boardId: string;
}

const KanbanBoard = ({ boardId }: KanbanBoardProps) => {
  const { board, updateBoard } = useBoard(boardId);
  const [activeList, setActiveList] = useState<ListType | null>(null);
  const [activeCard, setActiveCard] = useState<CardType | null>(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  if (!board) return <div>Board not found</div>;

  const findListByCardId = (cardId: string) => {
    return board.lists.find((list) =>
      list.cards.some((card) => card.id === cardId)
    );
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const activeType = active.data.current?.type;

    if (activeType === "List") {
      setActiveList(active.data.current?.list);
    } else if (activeType === "Card") {
      setActiveCard(active.data.current?.card);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (active.data.current?.type !== "Card") return;

    const activeList = findListByCardId(activeId as string);
    const overList = findListByCardId(overId as string);

    if (!activeList) return;

    // If dropping on a list container
    if (over.data.current?.type === "List") {
      const targetList = board.lists.find((list) => list.id === overId);
      if (!targetList) return;

      // Only update if we're actually moving to a different list
      if (activeList.id !== targetList.id) {
        const activeCard = activeList.cards.find(
          (card) => card.id === activeId
        );
        if (!activeCard) return;

        const updatedLists = board.lists.map((list) => {
          if (list.id === activeList.id) {
            return {
              ...list,
              cards: list.cards.filter((card) => card.id !== activeId),
            };
          }
          if (list.id === targetList.id) {
            return {
              ...list,
              cards: [...list.cards, activeCard], // Add to end of list
            };
          }
          return list;
        });

        // Update the board with the new list state
        updateBoard({ updatedLists });
      }
      return;

      /*if (activeList.id !== targetList.id) {
        
        setLists((lists) => {
          const activeCard = activeList.cards.find(
            (card) => card.id === activeId
          );
          if (!activeCard) return lists;

          return lists.map((list) => {
            if (list.id === activeList.id) {
              return {
                ...list,
                cards: list.cards.filter((card) => card.id !== activeId),
              };
            }
            if (list.id === targetList.id) {
              return {
                ...list,
                cards: [...list.cards, activeCard], // Add to end of list
              };
            }
            return list;
          });
        });

      }
      return; */
    }

    // If dropping on another card
    if (over.data.current?.type === "Card") {
      if (!overList || activeId === overId) return;

      const activeCard = activeList.cards.find((card) => card.id === activeId);
      if (!activeCard) return;

      // Remove card from source list
      const updatedLists = board.lists.map((list) => {
        if (list.id === activeList.id) {
          return {
            ...list,
            cards: list.cards.filter((card) => card.id !== activeId),
          };
        }
        return list;
      });

      // Insert card in the target position
      const finalUpdatedLists = updatedLists.map((list) => {
        if (list.id === overList.id) {
          const overCardIndex = list.cards.findIndex(
            (card) => card.id === overId
          );
          const newCards = [...list.cards];
          // newCards.splice(overCardIndex, 0, activeCard);
          // Calculate position based on whether we're dragging from above or below
          const isSameList = activeList.id === overList.id;
          const activeIndex = activeList.cards.findIndex(
            (card) => card.id === activeId
          );

          let insertIndex = overCardIndex;

          // If we're moving a card from above to below in the same list,
          // we need to adjust the insert position
          if (isSameList && activeIndex < overCardIndex) {
            insertIndex = overCardIndex - 1;
          }

          newCards.splice(insertIndex, 0, activeCard);

          return {
            ...list,
            cards: newCards,
          };
        }
        return list;
      });

      // Update the board with the new list state
      updateBoard({ updatedLists: finalUpdatedLists });

      /* setLists((lists) => {
        const activeCard = activeList.cards.find(
          (card) => card.id === activeId
        );
        if (!activeCard) return lists;

        // Remove card from source list
        const updatedLists = lists.map((list) => {
          if (list.id === activeList.id) {
            return {
              ...list,
              cards: list.cards.filter((card) => card.id !== activeId),
            };
          }
          return list;
        });

        // Insert card in the target position
        return updatedLists.map((list) => {
          if (list.id === overList.id) {
            const overCardIndex = list.cards.findIndex(
              (card) => card.id === overId
            );
            const newCards = [...list.cards];
            // newCards.splice(overCardIndex, 0, activeCard);
            // Calculate position based on whether we're dragging from above or below
            const isSameList = activeList.id === overList.id;
            const activeIndex = activeList.cards.findIndex(
              (card) => card.id === activeId
            );

            let insertIndex = overCardIndex;

            // If we're moving a card from above to below in the same list,
            // we need to adjust the insert position
            if (isSameList && activeIndex < overCardIndex) {
              insertIndex = overCardIndex - 1;
            }

            newCards.splice(insertIndex, 0, activeCard);

            return {
              ...list,
              cards: newCards,
            };
          }
          return list;
        });
      }); */
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    // Handle list reordering
    if (active.data.current?.type === "List") {
      const oldIndex = board.lists.findIndex((list) => list.id === active.id);
      const newIndex = board.lists.findIndex((list) => list.id === over.id);

      if (oldIndex !== newIndex) {
        const newOrderLists = arrayMove(board.lists, oldIndex, newIndex);
        updateBoard({ updatedLists: newOrderLists });
      }
    }

    setActiveList(null);
    setActiveCard(null);
  };

  return (
    <Box
      sx={{
        px: 2,
        width: "100%",
        height: (theme) => theme.heightVariants.boardContentHeight,
        overflowX: "auto",
        overflowY: "hidden",
        //bgcolor: board?.color || "background.default",
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        sx={{
          alignItems: "flex-start",
          justifyContent: "flex-start",
        }}
      >
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragOver={handleDragOver}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={board.lists.map((list) => list.id)}
            strategy={horizontalListSortingStrategy}
          >
            {board.lists.map((list) => (
              <SortableList key={list.id} list={list} boardId={board.id} />
            ))}
          </SortableContext>
          {createPortal(
            <DragOverlay>
              {activeCard && (
                <Card
                  card={activeCard}
                  listId={findListByCardId(activeCard.id)?.id || ""}
                  boardId={board.id}
                  isDragging={true}
                />
              )}
              {activeList && <List list={activeList} boardId={board.id} />}
            </DragOverlay>,
            document.body
          )}
        </DndContext>
        <AddNewList boardId={board.id} />
      </Stack>
    </Box>
  );
};

export default KanbanBoard;
