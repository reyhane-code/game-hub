import { useEffect, ReactNode } from "react";
import useAuth from "../../hooks/useAuth";

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    const { setUserIdentityIfLoggedIn } = useAuth();

    useEffect(() => {
        const initializeUserIdentity = async () => {
            await setUserIdentityIfLoggedIn();
        };

        initializeUserIdentity();
    }, [setUserIdentityIfLoggedIn]); 

    return <>{children}</>;
};

export default Layout;
