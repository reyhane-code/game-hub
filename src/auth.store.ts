import { create } from "zustand";
import User from "./entities/User";

export interface Auth {
  tokens: Tokens;
  identity: User;
  isAuthenticated: boolean;
}

interface Tokens {
  accessToken?: string;
  refreshToken?: string;
}

interface AuthStore {
  auth: Auth;
  loginDialog: boolean;
  loginCallBack?: () => void;
  setTokens: (tokens: Tokens) => void;
  setIdentity: (user: User) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  openLoginDialog: (callback?: () => void) => void;
  closeLoginDialog: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  auth: {
    tokens: { accessToken: "", refreshToken: "" },
    identity: {} as User,
    isAuthenticated: false,
  },
  loginDialog: false,
  loginCallBack: undefined,
  setTokens: (tokens) => set((state) => ({
    ...state,
    auth: { ...state.auth, tokens },
  })),
  setIdentity: (user) => set((state) => ({
    ...state,
    auth: { ...state.auth, identity: user },
  })),
  setIsAuthenticated: (isAuthenticated) => set((state) => ({
    ...state,
    auth: { ...state.auth, isAuthenticated },
  })),
  openLoginDialog: (callback) => set((state) => {
    return {
      ...state,
      loginCallBack: typeof callback === "function" ? callback : undefined,
      loginDialog: true,
    };
  }),
  closeLoginDialog: () => set((state) => {
    return {
      ...state,
      loginCallBack: undefined,
      loginDialog: false,
    };
  }),
}));

export default useAuthStore;
