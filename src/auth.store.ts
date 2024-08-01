import { create } from "zustand";
import User from "./entities/User";

export interface Auth {
  tokens: Tokens;
  identity: User;
  isAuthenticated: boolean;
}

interface Tokens {
  accessToken: string | undefined;
  refreshToken: string | undefined;
}

interface AuthStore {
  auth: Auth;
  setTokens: (tokens: Tokens) => void;
  setIdentity: (user: User) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  auth: {
    tokens: { accessToken: "", refreshToken: "" }, // Initialize tokens
    identity: {} as User, // Initialize identity (you may want to provide a default User object)
    isAuthenticated: false, // Initialize authentication status
  },
  setTokens: (tokens) => set((state) => ({ auth: { ...state.auth, tokens } })),
  setIdentity: (user) =>
    set((state) => ({ auth: { ...state.auth, identity: user } })),
  setIsAuthenticated: (isAuthenticated) =>
    set((state) => ({
      auth: { ...state.auth, isAuthenticated },
    })),
}));

export default useAuthStore;
