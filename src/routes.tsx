import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import GameDetailPage from "./pages/GameDetailPage";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/PorfilePage";
import PrivateRoutes from "./components/PrivateRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "games/:slug", element: <GameDetailPage /> },
      { path: "login", element: <LoginPage /> },
    ],
  },
  {
    element: <PrivateRoutes />,
    children: [{ path: "profile", element: <ProfilePage /> }],
  },
]);

export default router;
