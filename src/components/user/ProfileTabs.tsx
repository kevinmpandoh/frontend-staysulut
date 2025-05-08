// components/user/TabsProfile.tsx

"use client";

import { useState } from "react";
import { cn } from "@/lib/utils"; // optional: classNames helper

const tabs = ["Informasi Akun", "Preferensi"];

export default function ProfileTabs({
  onChange,
}: {
  onChange: (tab: string) => void;
}) {
  const [active, setActive] = useState("Informasi Akun");

  const handleClick = (tab: string) => {
    setActive(tab);
    onChange(tab);
  };

  return (
    <nav className="mt-8 flex text-sm font-semibold text-[#64748B]">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={cn(
            "pb-2 mr-8 border-b-2 text-base cursor-pointer",
            active === tab
              ? "text-[#3B5AFE] border-[#3B5AFE]"
              : "border-transparent"
          )}
          onClick={() => handleClick(tab)}
        >
          {tab}
        </button>
      ))}
    </nav>
  );
}
