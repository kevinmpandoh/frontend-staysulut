"use client";
import { useEffect, useState } from "react";
import {
  Bell,
  Building2,
  Heart,
  Home,
  LogIn,
  MessageCircle,
  Search,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { useAuthContext } from "@/contexts/AuthContext";
import { useAuth } from "@/hooks/useAuth";
// import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const { user } = useAuthContext();
  const { logout } = useAuth();
  const pathname = usePathname();
  const [showSearch, setShowSearch] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  console.log(user, "USER NAVBAR");

  useEffect(() => {
    const handleScroll = () => {
      const heroSection = document.getElementById("hero");
      if (!heroSection) return;

      const rect = heroSection.getBoundingClientRect();
      setShowSearch(rect.bottom < 200); // Kalau udah lewat 80px dari atas
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/favorit", label: "Favorit", icon: Heart },
    { href: "/kost-saya", label: "Kost Saya", icon: Building2 },
    { href: "/pesan", label: "Pesan", icon: MessageCircle },
    {
      href: user ? "/profile" : "/login",
      label: "Profil",
      icon: user ? User : LogIn,
    },
  ];
  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 flex justify-between items-center bg-white shadow-sm">
        <div className="max-w-7xl mx-auto md:w-full px-4 py-6 flex items-center justify-between">
          <div className="flex">
            {/* Logo */}
            <Link href="/" className="text-xl font-bold text-orange-600">
              Kost<span className="text-gray-800">ku</span>
            </Link>

            {/* Search bar for desktop & tablet */}
            <div className="hidden sm:flex flex-1 max-w-md mx-4">
              <div className="relative w-full">
                {showSearch && (
                  <>
                    <AnimatePresence>
                      <motion.input
                        type="text"
                        placeholder="Cari kost..."
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.25 }}
                        className="w-full border rounded-full px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600"
                      />
                    </AnimatePresence>
                    <Search
                      className="absolute left-3 top-2.5 text-gray-400"
                      size={16}
                    />
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Right actions */}
          <div className="hidden sm:flex items-center gap-2">
            {user ? (
              <>
                <div className="flex space-x-4 mr-4">
                  <MessageCircle
                    size={24}
                    className="text-gray-700 cursor-pointer"
                  />
                  <Bell size={24} className="text-gray-700 cursor-pointer" />
                </div>
                <div className="relative">
                  <Image
                    src="/profile-default.png"
                    alt="Avatar"
                    width={40}
                    height={40}
                    className="rounded-full cursor-pointer"
                    onClick={() => setShowDropdown(!showDropdown)}
                  />
                  {showDropdown && (
                    <div className="absolute right-0 mt-2 w-60 divide-y divide-gray-100 bg-white border rounded-lg shadow-md z-50">
                      <div>
                        <Link
                          href="/profile"
                          className="block px-6 py-3 text-md font-semibold text-gray-700 hover:bg-gray-100"
                        >
                          Profil
                        </Link>
                        <Link
                          href="/kost-saya"
                          className="block px-6 py-3 text-md font-semibold text-gray-700 hover:bg-gray-100"
                        >
                          Kost Saya
                        </Link>
                      </div>
                      <button
                        onClick={() => logout()}
                        className="block w-full text-left px-6 py-3 text-md font-semibold text-red-600 hover:bg-red-50"
                      >
                        Keluar
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link href="/auth/login">
                  <Button variant="outline" className="w-24">
                    {" "}
                    Masuk
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button variant="default" className="w-24">
                    Daftar
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="sm:hidden px-4 py-2 w-full ">
          <div className="relative w-full">
            {showSearch && (
              <>
                <input
                  type="text"
                  placeholder="Cari kost..."
                  className="w-full border rounded-full px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-orange-600"
                />
                <Search
                  className="absolute left-3 top-2.5 text-gray-400"
                  size={16}
                />
              </>
            )}
          </div>
        </div>
      </div>
      {/* <Topbar user={user} /> */}
      {/* <BottomNavigation user={user} /> */}
      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t shadow z-40 flex justify-around items-center py-2 sm:hidden">
        {navItems.map(({ href, label, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            className="flex flex-col items-center text-xs text-gray-700 hover:text-orange-600"
          >
            <Icon
              size={20}
              className={clsx(pathname === href && "text-orange-600")}
            />
            <span>{label}</span>
          </Link>
        ))}
      </nav>
    </>
  );
};

export default Navbar;
