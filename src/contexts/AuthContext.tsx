"use client";
import { createContext, useContext } from "react";
import type { ReactNode } from "react";

type User = {
  id: string;
  email: string;
  name: string;
};

type AuthContextType = {
  user: User | null;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({
  user,
  children,
}: {
  user: User | null;
  children: ReactNode;
}) => {
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
