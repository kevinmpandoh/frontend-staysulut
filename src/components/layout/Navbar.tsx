"use client";
import { useEffect, useState } from "react";
import {
  Bell,
  BookHeart,
  Building2,
  ClipboardList,
  DoorOpen,
  Heart,
  Home,
  LogIn,
  LogOut,
  MessageCircle,
  MessageSquare,
  Search,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import clsx from "clsx";
// import { useAuthContext } from "@/contexts/AuthContext";
import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/stores/auth.store";
// import { useAuth } from "@/contexts/AuthContext";
import ChatPopup from "@/components/chat/ChatPopup";
import { useChatPopupStore } from "@/stores/chatPopup.store";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";

const Navbar = () => {
  const { logout } = useAuth();
  const pathname = usePathname();
  const [showSearch, setShowSearch] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  // const [showChatPopup, setShowChatPopup] = useState(false);
  const { togglePopup, isOpen } = useChatPopupStore();
  const user = useAuthStore((state) => state.user);
  const isHydrated = useAuthStore((state) => state.isHydrated);

  const closeDropdown = () => setShowDropdown(false);

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
      <div className="sticky top-0 left-0 w-full z-50 flex justify-between items-center bg-white shadow-sm">
        <div className="max-w-7xl mx-auto md:w-full px-4 py-6  flex items-center justify-between">
          <div className="flex">
            {/* Logo */}
            <Link href="/" className="text-xl font-bold text-primary">
              <Image
                src="/logos/Logo-Stay-Kost.svg"
                alt="Logo"
                width={100}
                height={100}
                className="mr-2"
              />
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
            {!isHydrated ? ( // <Skeleton className="h-10 w-20 rounded-md" />
              <div className="h-10 w-20 rounded-md bg-gray-200 animate-pulse"></div>
            ) : user && user.role === "tenant" ? (
              <div
                className={`items-center justify-between w-full  gap-4 px-5  lg:flex shadow-theme-md lg:justify-end lg:px-0 lg:shadow-none`}
              >
                <div className="flex items-center gap-2 2xsm:gap-3">
                  <button
                    className="relative dropdown-toggle flex items-center justify-center text-gray-500 transition-colors bg-brand-50 border border-gray-200 rounded-full hover:text-gray-700 h-10 w-10 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                    onClick={() => togglePopup()}
                  >
                    <MessageSquare className="text-brand-500" size={20} />
                  </button>
                  <button className="relative dropdown-toggle flex items-center justify-center text-gray-500 transition-colors bg-brand-50 border border-gray-200 rounded-full hover:text-gray-700 h-10 w-10 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white">
                    <Bell className="text-brand-500" size={20} />
                  </button>
                </div>
                <div className="relative">
                  <button
                    onClick={() => setShowDropdown(!showDropdown)}
                    className={`flex items-center gap-2 border p-1 pr-4 rounded-full text-gray-700 dark:text-gray-400 dropdown-toggle ${
                      showDropdown ? "bg-brand-25" : ""
                    }`}
                  >
                    <div className=" overflow-hidden rounded-full h-10 w-10">
                      <Image
                        width={44}
                        height={44}
                        src={user.foto_profile || "/profile-default.png"}
                        alt="User"
                      />
                    </div>

                    <svg
                      className={`stroke-gray-500 dark:stroke-gray-400 transition-transform duration-200 ${
                        showDropdown ? "rotate-180" : ""
                      }`}
                      width="18"
                      height="20"
                      viewBox="0 0 18 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.3125 8.65625L9 13.3437L13.6875 8.65625"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <Dropdown
                    isOpen={showDropdown}
                    onClose={() => closeDropdown}
                    className="absolute right-0 mt-[17px] flex w-[320px] flex-col rounded-2xl border border-gray-200 bg-white py-6 px-4 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark"
                  >
                    <div className="flex items-center gap-2">
                      <Image
                        src={user.foto_profile || "/profile-default.png"}
                        alt="Profile Image"
                        className="w-10 h-10 rounded-full object-contain"
                        width={40}
                        height={40}
                      />
                      <div>
                        <span className="block font-semibold text-gray-700 text-base dark:text-gray-400">
                          {user.name}
                        </span>
                        <span className="mt-0.5 block text-sm text-gray-500 dark:text-gray-400">
                          {user.email}
                        </span>
                      </div>
                    </div>

                    <hr className="my-5" />

                    <ul className="flex flex-col gap-1 pb-3 border-b border-gray-200 dark:border-gray-800">
                      <li>
                        <DropdownItem
                          onItemClick={() => closeDropdown}
                          tag="a"
                          href="/user/profile"
                          className="flex items-center gap-3 px-3 py-3 font-medium text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                        >
                          <User
                            className="text-primary  dark:group-hover:fill-gray-300"
                            size={24}
                          />
                          <span className="text-base font-medium">
                            Akun Saya
                          </span>
                        </DropdownItem>
                      </li>
                      <li>
                        <DropdownItem
                          onItemClick={() => closeDropdown}
                          tag="a"
                          href="/user/kost-saya"
                          className="flex items-center gap-3 px-3 py-3 font-semibold text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                        >
                          <DoorOpen
                            className="text-primary  dark:group-hover:fill-gray-300"
                            size={24}
                          />
                          <span className="text-base font-medium">
                            Kost Saya
                          </span>
                        </DropdownItem>
                      </li>
                      <li>
                        <DropdownItem
                          onItemClick={() => closeDropdown}
                          tag="a"
                          href="/user/pengajuan-sewa"
                          className="flex items-center gap-3 px-3 py-3 font-semibold text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                        >
                          <ClipboardList
                            className="text-primary  dark:group-hover:fill-gray-300"
                            size={24}
                          />
                          <span className="text-base font-medium">
                            Pengajuan Sewa
                          </span>
                        </DropdownItem>
                      </li>
                      <li>
                        <DropdownItem
                          onItemClick={() => closeDropdown}
                          tag="a"
                          href="/user/wishlist"
                          className="flex items-center gap-3 px-3 py-3 font-semibold text-gray-700 rounded-lg group text-theme-sm hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                        >
                          <BookHeart
                            className="text-primary  dark:group-hover:fill-gray-300"
                            size={24}
                          />
                          <span className="text-base font-medium">
                            Favorite
                          </span>
                        </DropdownItem>
                      </li>
                    </ul>
                    <button
                      onClick={() => logout()}
                      className="flex items-center gap-3 px-4 py-3 mt-3 font-semibolld text-gray-700 rounded-lg group text-theme-md hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
                    >
                      <LogOut
                        className="text-primary  dark:group-hover:fill-gray-300"
                        size={24}
                      />
                      Log Out
                    </button>
                  </Dropdown>
                </div>
              </div>
            ) : user && user.role === "owner" ? (
              <>
                <Button variant={"ghost"} size={"lg"}>
                  <Link href={"/dashboard/owner"}>Halaman Pemilik</Link>
                </Button>
              </>
            ) : user && user.role === "admin" ? (
              <Button variant={"ghost"} size={"lg"}>
                <Link href={"/dashboard/admin"}>Halaman Admin</Link>
              </Button>
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
      {isOpen && <ChatPopup />}
    </>
  );
};

export default Navbar;
