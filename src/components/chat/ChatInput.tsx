"use client";
import { SendHorizonal } from "lucide-react";
import { useState } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  isSending?: boolean;
}

const ChatInput = ({ onSend, isSending }: ChatInputProps) => {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input.trim());
    setInput("");
  };
  return (
    <div className="border-t border-gray-200 px-6 py-3 flex items-center space-x-3">
      <input
        type="text"
        placeholder="Ketik pesan..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault(); // ⛔ penting
            handleSend(); // Kirim pesan
          }
        }}
        className="flex-1 border border-gray-300 rounded-lg py-2 px-3 text-sm text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
      />
      <button
        type="button"
        disabled={isSending}
        onClick={handleSend}
        // className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-3 flex items-center justify-center"
        className={`${
          isSending ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
        } text-white rounded-lg p-3 flex items-center justify-center`}
        aria-label="Send message"
      >
        <SendHorizonal size={18} />
      </button>
    </div>
  );
};

export default ChatInput;
