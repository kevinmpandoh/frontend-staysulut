import { Bell } from "lucide-react";
import React from "react";

const Header = () => {
  return (
    <header className="flex justify-between items-center border-b border-gray-200 px-6 py-4">
      <div className="text-sm">Halo, Kevin</div>
      <div className="flex items-center space-x-6">
        <button
          aria-label="Notifications"
          className="p-2 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
        >
          <Bell size={18} />
        </button>
        <div className="flex items-center space-x-3">
          <img
            src="https://placehold.co/40x40?text=KP&font=inter&bg=ddd&fg=555&bold"
            alt="Profile picture of Kevin Pandoh wearing a white shirt with red flower brooch"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="text-sm leading-tight">
            <p className="font-semibold text-gray-900">Kevin Pandoh</p>
            <p className="text-gray-500 text-xs">Pemilik Kost</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
