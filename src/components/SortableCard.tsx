import { useSortable } from "@dnd-kit/sortable";
import { Card as CardType } from "../types/types";
import Card from "./Card";
import { CSS } from "@dnd-kit/utilities";

interface SortableCardProps {
  card: CardType;
  listId: string;
  boardId: string;
}

const SortableCard = (props: SortableCardProps) => {
  const { card, listId, boardId } = props;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: card.id, data: { type: "Card", card } });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : undefined,
    position: "relative" as const,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Card card={card} listId={listId} boardId={boardId} />
    </div>
  );
};

export default SortableCard;
