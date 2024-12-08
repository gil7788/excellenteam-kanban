//import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { isAuthorized } = useAuth();

  return isAuthorized ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

//     //   const navigate = useNavigate();

//     //   useEffect(() => {
//     //   if (!isAuthorized) {
//     //     navigate("/login", { replace: true });
//     //   }
//     //   }, [navigate, isAuthorized]);

