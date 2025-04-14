// contexts/AuthContext.tsx
"use client";

import { ReactNode, useEffect } from "react";

import { useAuthStore } from "@/stores/auth.store";
import { AuthService } from "@/services/auth.service";

export const AuthProvider = ({
  children,
  user: userFromServer,
}: {
  children: ReactNode;
  user: any; // sesuai format dari backend
}) => {
  const { setUser, logout, setHydrated } = useAuthStore();

  useEffect(() => {
    if (userFromServer) {
      setUser(userFromServer);
    } else {
      const fetchUser = async () => {
        try {
          const user = await AuthService.getUser();
          setUser(user?.data);
        } catch (err) {
          console.log("Error fetching user:", err);
          logout();
        } finally {
          setHydrated(true); // Penting: pastikan flag tetap diset
        }
      };
      fetchUser();
    }
  }, [userFromServer, setUser, logout, setHydrated]);

  return <>{children}</>;
};
