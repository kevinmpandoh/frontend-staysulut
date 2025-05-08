"use client";
import {
  BookHeart,
  CircleUserRound,
  ClipboardList,
  CreditCard,
  DoorOpen,
  History,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useAuthStore } from "@/stores/auth.store";

const menuItems = [
  {
    href: "profile",
    label: "Akun Saya",
    icon: CircleUserRound,
    match: "profile",
  },
  {
    href: "kost-saya",
    label: "Kost Aktif",
    icon: DoorOpen,
    match: "kost-saya",
  },
  {
    href: "pengajuan-sewa",
    label: "Pengajuan Sewa",
    icon: ClipboardList,
    match: "pengajuan-sewa",
  },
  {
    href: "riwayat-transaksi",
    label: "Riwayat Transaksi",
    icon: CreditCard,
    match: "riwayat-transaksi",
  },
  {
    href: "riwayat-kost",
    label: "Riwayat Kost",
    icon: History,
    match: "riwayat-kost",
  },
  {
    href: "wishlist",
    label: "Wishlist",
    icon: BookHeart,
    match: "wishlist",
  },
];

const SidebarUser = () => {
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);

  return (
    <aside className="flex flex-col gap-6 lg:w-2/5 sticky top-28 h-full">
      <div
        className=" bg-white rounded-lg border shadow-md p-6 flex items-center gap-4"
        style={{ boxShadow: "0 4px 8px rgb(0 0 0 / 0.05)" }}
      >
        <Image
          alt="Profile picture of Kevin Pandoh, young person with short curly hair and pink background"
          className="w-14 h-14 rounded-full object-cover"
          height="56"
          src={user?.foto_profile ?? "/profile-default.png"}
          width="56"
        />
        <div>
          <h3 className="font-semibold text-gray-800 text-lg leading-5">
            {user?.name}
          </h3>
        </div>
      </div>
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
              href={`/user/${href}`}
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
  );
};

export default SidebarUser;

{
  /* <aside className="space-y-6">
  <section className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4">
    <img
      alt="Profile picture of a person with curly hair wearing a white jacket with pink background"
      className="w-12 h-12 rounded-full object-cover"
      height="48"
      src="https://storage.googleapis.com/a1aa/image/a894c2b3-77a4-441d-cf43-b061055c1485.jpg"
      width="48"
    />
    <div>
      <h2 className="font-semibold text-gray-900 text-base leading-5">
        Kevin Pandoh
      </h2>
      <p className="text-xs text-gray-700 leading-4">089510465800</p>
    </div>
  </section>
  <nav
    aria-label="User account navigation"
    className="bg-white rounded-lg border border-gray-200 p-6 space-y-4 text-gray-700 text-sm font-semibold"
  >
    <a
      className="flex items-center space-x-3 rounded-md bg-blue-100 text-blue-700 px-4 py-3 font-bold"
      href="#"
    >
      <i className="fas fa-building fa-fw"></i>
      <span>Kost Aktif</span>
    </a>
    <a
      className="flex items-center space-x-3 px-4 py-3 rounded-md hover:bg-gray-100"
      href="#"
    >
      <i className="far fa-clipboard fa-fw"></i>
      <span>Pengajuan Sewa</span>
    </a>
    <a
      className="flex items-center space-x-3 px-4 py-3 rounded-md hover:bg-gray-100"
      href="#"
    >
      <i className="far fa-credit-card fa-fw"></i>
      <span>Riwayat Transaksi</span>
    </a>
    <a
      className="flex items-center space-x-3 px-4 py-3 rounded-md hover:bg-gray-100"
      href="#"
    >
      <i className="fas fa-history fa-fw"></i>
      <span>Riwayat Kost</span>
    </a>
    <a
      className="flex items-center space-x-3 px-4 py-3 rounded-md hover:bg-gray-100"
      href="#"
    >
      <i className="far fa-heart fa-fw"></i>
      <span>Wishlist</span>
    </a>
  </nav>
</aside>; */
}
