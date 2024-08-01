import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../auth.store";

const PrivateRoutes = () => {
  const isAuthenticated = useAuthStore((s) => s.auth.isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default PrivateRoutes;
