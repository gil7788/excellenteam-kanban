import { useSortable } from "@dnd-kit/sortable";
import { List as ListType } from "../types/types";
import List from "./List";
import { CSS } from "@dnd-kit/utilities";

interface SortableListProps {
  list: ListType;
  boardId: string;
}

const SortableList = (props: SortableListProps) => {
  const { list, boardId } = props;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: list.id, data: { type: "List", list } });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : undefined,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <List list={list} boardId={boardId} />
    </div>
  );
};

export default SortableList;
