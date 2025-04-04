import { create } from "zustand";

type User = {
  id: string;
  name: string;
  email: string;
  role: "penyewa" | "pemilik";
};

type AuthState = {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  isAuthenticated: false,
}));
