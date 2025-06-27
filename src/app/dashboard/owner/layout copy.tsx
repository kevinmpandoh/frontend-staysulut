import React from "react";

import SidebarOwner from "./SidebarOwner";
import Header from "./Header";

export default function DashboardOwnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex min-h-screen">
        <SidebarOwner />
        <div className="flex flex-col flex-1">
          <Header />
          {children}
        </div>
      </div>
    </>
  );
}
