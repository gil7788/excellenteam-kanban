import KanbanBoard from "./KanbanBoard";
import KanbanBoardMenuBar from "./KanbanBoardMenuBar";

interface KanbanWrapperProps {
  boardId: string;
}

const KanbanWrapper: React.FC<KanbanWrapperProps> = ({boardId}) => {

  return (
    <>
      <KanbanBoardMenuBar boardId={boardId} />
      <KanbanBoard boardId={boardId} />
    </>
  );
};

export default KanbanWrapper;
