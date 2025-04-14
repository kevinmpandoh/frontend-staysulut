import { create } from "zustand";

type User = {
  id: string;
  name: string;
  email: string;
  role: "penyewa" | "pemilik";
};

type AuthState = {
  user: User | null;
  isHydrated: boolean;
  setUser: (user: User | null) => void;
  isLoggedIn: () => boolean;
  logout: () => void;
  setHydrated: (value: boolean) => void;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isHydrated: false,
  setUser: (user) => set({ user, isHydrated: true }),
  isLoggedIn: () => !!get().user,
  setHydrated: (value: boolean) => set({ isHydrated: value }),
  logout: () => {
    // Hapus cookie token

    // document.cookie = "token=; Max-Age=0; path=/;";
    set({ user: null, isHydrated: false });
    // window.location.href = "/auth/login";
  },
}));
