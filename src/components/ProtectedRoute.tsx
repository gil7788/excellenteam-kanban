import { useAuth } from "../contexts/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { isAuthorized } = useAuth();

  return isAuthorized ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
