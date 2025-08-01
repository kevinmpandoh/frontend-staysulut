"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[]; // contoh: ["tenant", "admin"]
}

const AuthProtected: React.FC<ProtectedRouteProps> = ({ children }) => {
  const router = useRouter();
  const { user, isAuthenticated, isHydrated } = useAuthStore();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Tunggu sampai Zustand hydration selesai
    if (isHydrated) {
      // Jika belum login → redirect ke login
      if (isAuthenticated || user) {
        if (user?.role === "admin") {
          router.push("/dashboard/admin");
        } else if (user?.role === "tenant") {
          router.push("/user/profile");
        } else if (user?.role === "owner") {
          router.push("/dashboard/owner");
        } else {
          router.push("/");
        }
        return;
      }

      setIsLoading(false); // lolos semua pengecekan
    }
  }, [isHydrated, isAuthenticated, user, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
};

export default AuthProtected;
