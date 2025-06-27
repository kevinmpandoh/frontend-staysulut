"use client";

import React from "react";
// import { Dropdown } from "../ui/dropdown/Dropdown";
import { MessageSquare } from "lucide-react";

export default function MessageDropdown({
  // isOpen,
  onToggle,
}: // onClose,
{
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  return (
    <div className="relative">
      <button
        className="relative dropdown-toggle flex items-center justify-center text-gray-500 transition-colors bg-brand-50 border border-gray-200 rounded-full hover:text-gray-700 h-10 w-10 hover:bg-gray-100 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
        onClick={onToggle}
      >
        <MessageSquare className="text-brand-500" size={20} />
      </button>
    </div>
  );
}
