"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[]; // contoh: ["tenant", "admin"]
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  allowedRoles,
}) => {
  const router = useRouter();
  const { user, isAuthenticated, isHydrated } = useAuthStore();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Tunggu sampai Zustand hydration selesai
    if (isHydrated) {
      // Jika belum login → redirect ke login
      if (!isAuthenticated || !user) {
        router.replace("/auth/login");
        return;
      }

      // Jika login, tapi role tidak sesuai
      if (allowedRoles && !allowedRoles.includes(user.role)) {
        router.replace("/unauthorized");
        return;
      }

      setIsLoading(false); // lolos semua pengecekan
    }
  }, [isHydrated, isAuthenticated, user, allowedRoles, router]);

  if (isLoading) {
    return <div className="text-center py-12">Loading...</div>;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
