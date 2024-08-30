import useAuthStore from "../auth.store";
import User from "../entities/User";
import { HttpRequest } from "../helpers/http-request-class.helper";

export default function useAuth() {
    const isAuthenticated = HttpRequest.getTokens?.accessToken ?? false;
    const setIdentity = useAuthStore((s) => s.setIdentity);
    const openLoginDialog = useAuthStore(s => s.openLoginDialog);

    const setUserIdentityIfLoggedIn = async () => {
        if (!isAuthenticated) return;
        try {
            const response = await HttpRequest.get<User>("/v1/user/identity");
            setIdentity(response.data);
            return response.data;
        } catch (error) {
            console.error("Error fetching user data:", error);
            throw new Error("Failed to fetch user data");
        }

    };
    const loginIfNeeded = (callback: () => void) => {
        if (isAuthenticated) {
            return callback();
        } else {
            openLoginDialog(callback);
        }
    };

    const setTokens = (accessToken: string, refreshToken: string) => {
        return HttpRequest.setTokens = {
            data: { accessToken, refreshToken },
            key: "tokens",
        };
    }

    const logout = () => {
        return HttpRequest.deleteTokens()
    }
    return {
        isAuthenticated,
        setUserIdentityIfLoggedIn,
        loginIfNeeded,
        setTokens,
        logout
    };
}




