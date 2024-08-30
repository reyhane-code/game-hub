import { useEffect, ReactNode } from "react";
import useAuth from "../../hooks/useAuth";

interface LayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: LayoutProps) => {
  const { setUserIdentityIfLoggedIn } = useAuth();

  useEffect(() => {
    const initializeUserIdentity = async () => {
      await setUserIdentityIfLoggedIn();
    };

    initializeUserIdentity();
  }, [setUserIdentityIfLoggedIn]);

  return <>{children}</>;
};

export default AppLayout;
