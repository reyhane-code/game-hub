import { useEffect, ReactNode } from "react";
import useAuth from "../../hooks/useAuth";

interface LayoutProps {
  children: ReactNode;
}

const AppLayout = ({ children }: LayoutProps) => {
  const { initAuth } = useAuth();
  useEffect(() => {
    const initializeUserIdentity = async () => {
      await initAuth();
    };

    initializeUserIdentity()
  }, [initAuth]);

  return <>{children}</>;
};

export default AppLayout;
