// contexts/AuthContext.tsx
"use client";

import { ReactNode, useEffect } from "react";

import { useAuthStore } from "@/stores/auth.store";
import { useAuth } from "@/hooks/useAuth";

export const AuthProvider = ({
  children,
}: // user: userFromServer,
{
  children: ReactNode;
  // user: any; // sesuai format dari backend
}) => {
  const { me, isLoadingMe } = useAuth(); // ini dari hook React Query
  const { setUser, logout, setHydrated } = useAuthStore();

  useEffect(() => {
    if (!isLoadingMe) {
      if (me) {
        setUser(me);
      } else {
        logout(); // clear user jika tidak ada user yang valid
      }

      setHydrated(true); // penting agar app tahu auth udah dicek
    }
  }, [me, isLoadingMe, setUser, logout, setHydrated]);

  // useEffect(() => {
  //   // if (userFromServer) {
  //   //   setUser(userFromServer);
  //   // } else {
  //   const fetchUser = async () => {
  //     try {
  //       const user = await AuthService.getUser();
  //       setUser(user?.data);
  //     } catch (err) {
  //       console.log("Error fetching user:", err);
  //       logout();
  //     } finally {
  //       setHydrated(true); // Penting: pastikan flag tetap diset
  //     }
  //   };
  //   fetchUser();
  //   // }
  // }, [setUser, logout, setHydrated]);

  return <>{children}</>;
};
