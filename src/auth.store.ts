import { create } from "zustand";
import User from "./entities/User";

export interface Auth {
  identity: User;
}


interface AuthStore {
  auth: Auth;
  loginDialog: boolean;
  loginCallBack?: () => void;
  setIdentity: (user: User) => void;
  openLoginDialog: (callback?: () => void) => void;
  closeLoginDialog: () => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  auth: {
    identity: {} as User,
  },
  loginDialog: false,
  loginCallBack: undefined,

  setIdentity: (user) => set((state) => ({
    ...state,
    auth: { ...state.auth, identity: user },
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
