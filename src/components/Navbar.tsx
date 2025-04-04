import { useAuthStore } from "@/stores/auth.store";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <header className="px-40 bg-white flex items-center justify-between p-6 border-b">
      <div className="flex items-center space-x-4">
        <h1 className="text-2xl font-bold text-gray-800">StaySulut</h1>
      </div>
      <div className="flex space-x-2 items-center">
        <div className="flex space-x-3 mr-10">
          <Link href="#" className="text-gray-600 font-semibold">
            Tentang Kami
          </Link>
          <Link href="#" className="text-gray-600 font-semibold">
            Kontak Kami
          </Link>
        </div>
        <Link
          href={"/auth/login"}
          className="px-4 cursor-pointer py-2 text-center border-2 border-primary text-primary w-[116px] rounded-md font-semibold"
        >
          Masuk
        </Link>
        <Link
          href={"/auth/register"}
          className="px-4 cursor-pointer py-2 text-center bg-primary text-white rounded-md w-[116px] font-semibold"
        >
          Daftar
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
