"use client";

import ProtectedRoute from "@/components/HOC/ProtectedRoute";
import { useSidebar } from "@/contexts/SidebarContext";
import AdminSidebar from "@/layout/AdminSidebar";
import AppHeader from "@/layout/AppHeader";
// import AppHeader from "@/layout/AppHeader";
// import Backdrop from "@/layout/Backdrop";
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  // Dynamic class for main content margin based on sidebar state
  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[290px]"
    : "lg:ml-[90px]";

  return (
    <ProtectedRoute allowedRoles={["admin"]}>
      <div className="min-h-screen xl:flex">
        {/* Sidebar and Backdrop */}
        <AdminSidebar />
        {/* <Backdrop /> */}
        {/* Main Content Area */}
        <div
          className={`flex-1 transition-all  duration-300 ease-in-out ${mainContentMargin}`}
        >
          {/* Header */}
          <AppHeader />
          {/* Page Content */}
          <div className="p-4 mx-auto md:p-6  w-full max-w-[1244px]">
            {children}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
