// components/chat/ChatPopup.tsx
"use client";

import { motion } from "framer-motion";
import ChatSidebar from "./ChatSidebar";
import ChatHeader from "./ChatHeader";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { useChat } from "@/hooks/useChat";
import { useMessages } from "@/hooks/useMessages";
import { Loader2, MessageSquare, X } from "lucide-react";
import { useAuthStore } from "@/stores/auth.store";
import { useChatPopupStore } from "@/stores/chatPopup.store";
import { useEffect } from "react";

const ChatPopup = () => {
  const { selectedChatId, closePopup, setSelectedChatId } = useChatPopupStore();
  const user = useAuthStore((state) => state.user);

  const { chatList, loadingChatList } = useChat();
  const {
    messages: data,
    loadingMessages,
    sendMessage,
    seendingMessage,
  } = useMessages(selectedChatId ?? "");

  const handleSend = (message: string) => {
    if (!selectedChatId) return;

    sendMessage({ chatRoomId: selectedChatId, message }); // API post/send via socket/react query
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedChatId) {
        setSelectedChatId(""); // hilangkan chat yang sedang dibuka
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (!user) {
    return;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-5 right-4 max-w-3xl bg-white border shadow-lg rounded-lg z-50"
    >
      <div className="flex max-w-4xl mx-auto h-[600px] border border-gray-200 rounded-lg overflow-hidden shadow-sm">
        {/* Left panel */}

        {loadingChatList ? (
          <div className="flex justify-center items-center h-full w-[280px] bg-gray-50">
            <Loader2 className="animate-spin w-5 h-5 text-gray-500" />
          </div>
        ) : (
          <ChatSidebar
            chats={chatList ?? []}
            selectedChatId={selectedChatId}
            user={user}
          />
        )}

        {/* Right panel */}
        <div className="flex-1 flex flex-col">
          {selectedChatId ? (
            <>
              {/* Header */}
              <ChatHeader
                // name={data?.namaKost}
                // image={data?.photo}
                name={
                  user?.role === "tenant"
                    ? data?.namaKost
                    : data?.sender?.name || "User"
                }
                image={
                  user?.role === "tenant"
                    ? data?.photo
                    : data?.sender?.avatar || "/profile-default.png"
                }
                isLoading={loadingMessages}
              />
              {/* Messages */}
              <ChatMessages
                messages={data?.messages ?? []}
                currentUserId={user?.id}
                isLoading={loadingMessages}
                chatRoomId={selectedChatId}
              />
              {/* Input */}
              <ChatInput onSend={handleSend} isSending={seendingMessage} />
            </>
          ) : (
            <>
              <div className="flex items-center justify-end max-w-md w-full border-b border-gray-200 px-6 py-4">
                <button
                  aria-label="Close chat"
                  className="text-gray-400 hover:text-gray-600 focus:outline-none"
                  onClick={closePopup}
                >
                  <X />
                </button>
              </div>
              <div className="flex flex-col items-center justify-center h-full text-gray-400 p-6 gap-2 w-[520px] max-w-md">
                <MessageSquare className="w-8 h-8" />
                <p className="text-sm">Pilih chat untuk mulai percakapan</p>
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ChatPopup;
