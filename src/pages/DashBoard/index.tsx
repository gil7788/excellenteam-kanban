import { useParams } from "react-router-dom";
import KanbanWrapper from "../../components/KanbanWrapper";
import Layout from "../../layout";
import Footer from "../../components/Footer";

const DashBoard = () => {
  const { boardId } = useParams();

  if (!boardId) return <div>Error 404 - Page Not Found</div>;

  return (
    <Layout>
      <KanbanWrapper boardId={boardId} />
      <Footer />
    </Layout>
  );
};

export default DashBoard;
