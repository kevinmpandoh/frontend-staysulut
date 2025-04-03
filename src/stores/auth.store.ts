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
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));

// import { create } from "zustand";
// import axios from "@/lib/axios";

// interface User {
//   id: string;
//   email: string;
//   role: "admin" | "owner" | "tenant";
// }

// interface AuthState {
//   user: User | null;
//   login: (email: string, password: string) => Promise<void>;
//   logout: () => void;
//   checkAuth: () => Promise<void>;
// }

// export const useAuthStore = create<AuthState>((set) => ({
//   user: null,

//   login: async (email, password) => {
//     try {
//       const userData = await axios.post("/auth/login", { email, password });

//       set({ user: userData.data });
//     } catch (error) {
//       throw new Error("Login gagal!");
//     }
//   },

//   logout: async () => {
//     await axios.post("/auth/logout");
//     set({ user: null });
//   },

//   checkAuth: async () => {
//     try {
//       const res = await axios.get("/auth/me");
//       set({ user: res.data });
//     } catch {
//       set({ user: null });
//     }
//   },
// }));
