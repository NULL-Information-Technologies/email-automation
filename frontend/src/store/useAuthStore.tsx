import { create } from "zustand";

type User = {
  id: string;
  email: string;
  fullName:string;
};

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  login: (user: User) => void;
  logout: () => void;
  setUser: (user: User | null) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,

  login: (user) =>
    set({
      user,
      isAuthenticated: true,
    }),

  logout: () =>
    set({
      user: null,
      isAuthenticated: false,
    }),

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
    }),
}));