import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import GameDetailPage from "./pages/GameDetailPage";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import PrivateRoutes from "./components/PrivateRoutes";
import ArticlesPage from "./pages/ArticlesPage";
import ArticleDetailPage from "./pages/ArticleDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "games/:slug", element: <GameDetailPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "articles", element: <ArticlesPage /> },
      { path: "articles/:id", element: <ArticleDetailPage /> },
    ],
  },
  {
    element: <PrivateRoutes />,
    errorElement: <ErrorPage />,
    children: [{ path: "profile", element: <ProfilePage /> }],
  },
]);

export default router;
