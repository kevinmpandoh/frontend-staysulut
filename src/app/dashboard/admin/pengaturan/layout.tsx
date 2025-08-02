"use client";
import React from "react";
import { CircleUserRound, DoorOpen } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const menuItems = [
  {
    href: "profile",
    label: "Akun Saya",
    icon: CircleUserRound,
    match: "profile",
  },
  {
    href: "change-password",
    label: "Ganti Password",
    icon: DoorOpen,
    match: "change-password",
  },
];

export default function PengaturanOwnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-6">
        <aside className="flex flex-col gap-6 lg:w-1/3 h-full">
          <nav
            aria-label="Sidebar navigation"
            className=" bg-white rounded-lg border px-4 py-6 space-y-2 text-[#475569] font-semibold text-sm"
            style={{ boxShadow: "0 4px 8px rgb(0 0 0 / 0.05)" }}
          >
            {menuItems.map(({ href, label, icon: Icon, match }) => {
              const isActive = pathname.includes(match);
              return (
                <Link
                  key={href}
                  href={`${href}`}
                  className={`flex items-center text-lg gap-2 px-4 py-4 rounded-md ${
                    isActive
                      ? "bg-primary/20 text-[#3B5AFE] hover:bg-primary/30"
                      : "hover:text-[#1E293B] hover:bg-gray-100"
                  }`}
                >
                  <Icon
                    size={20}
                    className={isActive ? "text-[#3B5AFE]" : "text-[#64748B]"}
                  />
                  {label}
                </Link>
              );
            })}
          </nav>
        </aside>

        <section className="bg-white w-full rounded-lg border min-h-[556px] border-gray-200 px-10 py-8">
          {children}
        </section>
      </div>
    </>
  );
}
