import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Home from "../pages/Home";
import Settings from "../pages/Settings";
import Profile from "../pages/Profile";
//import Register from "../pages/Register";
import ProtectedRoute from "../components/ProtectedRoute";
import Login from "../pages/Login";
import DashBoard from "../pages/DashBoard";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route index element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="settings" element={<Settings />} />
        <Route path="profile" element={<Profile />} />
        <Route path="dashboard/:boardId" element={<DashBoard />} />
      </Route>
    </Route>
  )
);
