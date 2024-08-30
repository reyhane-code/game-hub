import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import AuthModal from "./components/AuthModal";
import useAuth from "./hooks/useAuth";

const queryClient = new QueryClient();

const Main = () => {
  const { setUserIdentityIfLoggedIn } = useAuth();

  useEffect(() => {
    const initializeUserIdentity = async () => {
      await setUserIdentityIfLoggedIn();
    };

    initializeUserIdentity();
  }, []);

  return (
    <>
      <RouterProvider router={router} />
      <AuthModal />
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Main />
    </QueryClientProvider>
  </React.StrictMode>
);
