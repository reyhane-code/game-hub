import { Navigate, Outlet } from "react-router-dom";
import { HttpRequest } from "../helpers/http-request-class.helper";

const PrivateRoutes = () => {
  const isAuthenticated = HttpRequest.getTokens;
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default PrivateRoutes;
