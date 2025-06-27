import {
  FileChartColumn,
  House,
  LayoutDashboard,
  MessageSquare,
  Star,
  User,
} from "lucide-react";
import Image from "next/image";
import React from "react";

const SidebarOwner = () => {
  return (
    <>
      <aside className="hidden md:flex flex-col w-72 border-r border-gray-200 min-h-screen px-6 pt-10">
        <div className="flex justify-center mb-10">
          <Image
            src={"/logos/Logo-Stay-Kost.svg"}
            alt="Logo Stay Sulut"
            width={120}
            height={120}
          />
        </div>
        <nav className="flex flex-col space-y-3 text-lg font-medium">
          <a
            href="#"
            className="flex items-center space-x-2 px-4 py-2 rounded-md bg-indigo-200 text-indigo-700"
          >
            <LayoutDashboard size={18} />
            <span>Beranda</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-2 px-4 py-2 rounded-md text-gray-400 cursor-default"
          >
            <House size={18} />
            <span>Manajemen Kost</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-2 px-4 py-2 rounded-md text-gray-400 cursor-default"
          >
            <MessageSquare size={18} />
            <span>Pesan</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-2 px-4 py-2 rounded-md text-gray-400 cursor-default"
          >
            <FileChartColumn size={18} />
            <span>Laporan Keuangan</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-2 px-4 py-2 rounded-md text-gray-400 cursor-default"
          >
            <Star size={24} />
            <span>Rating & Ulasan</span>
          </a>
          <a
            href="#"
            className="flex items-center space-x-2 px-4 py-2 rounded-md text-gray-400 cursor-default"
          >
            <User size={20} />
            <span>Akun Saya</span>
          </a>
        </nav>
      </aside>
    </>
  );
};

export default SidebarOwner;
