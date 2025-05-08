"use client";

import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Skeleton } from "../ui/skeleton";

interface Message {
  id: string;
  text: string;
  senderId: string;
  createdAt: string;
}

interface ChatMessagesProps {
  messages: Message[];
  currentUserId: string;
  isLoading: boolean;
  chatRoomId: string;
}

const ChatMessages = ({
  messages: initialMessages,
  currentUserId,
  isLoading,
  chatRoomId,
}: ChatMessagesProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>(initialMessages ?? []);

  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (initialMessages) {
      setMessages(initialMessages);
    }
  }, [initialMessages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_WEBSOCKET_URL!, {
      withCredentials: true,
      query: {
        userId: currentUserId,
      },
    });

    socketRef.current = socket;

    // Gabung ke chat room
    socket.emit("joinRoom", { chatRoomId });

    // Dapat pesan baru
    socket.on("receiveMessage", (newMessage: Message) => {
      console.log("New message received:", newMessage);
      setMessages((prev) => [...prev, newMessage]);
    });

    return () => {
      socket.disconnect();
    };
  }, [chatRoomId, currentUserId]);

  if (isLoading || !initialMessages) {
    return (
      <div className="flex-1 w-full max-w-md overflow-y-auto px-6 py-4 space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-6 w-3/4 rounded-lg" />
            <Skeleton className="h-3 w-16" />
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="flex-1 w-full max-w-md overflow-y-auto scrollbar-thin px-6 py-4 space-y-6 text-sm text-gray-700">
      <div>
        <p className="mb-1 font-semibold text-gray-700">Andri Thomas</p>
        <p className="inline-block bg-gray-100 rounded-lg px-4 py-3 max-w-[70%]">
          I want to make an appointment tomorrow from 2:00 to 5:00pm?
        </p>
        <p className="mt-1 text-xs text-gray-400">1:55pm</p>
      </div>

      <div className="flex justify-end items-end flex-col w-full">
        <p className="bg-blue-600 text-white rounded-lg px-4 py-3  max-w-[70%]">
          Hello, Thomas! I will check the schedule and inform you.
        </p>
        <p className="mt-1 text-xs text-gray-400 self-end">1:58pm</p>
      </div>

      <div>
        <p className="mb-1 font-semibold text-gray-700">Andri Thomas</p>
        <p className="inline-block bg-gray-100 rounded-lg px-4 py-3 max-w-[70%] text-gray-500">
          Ok, Thanks for your reply.
        </p>
        <p className="mt-1 text-xs text-gray-400">1:59pm</p>
      </div>

      <div className="flex justify-end items-end flex-col w-full">
        <p className="bg-blue-600 text-white rounded-lg px-4 py-3 max-w-[70%]">
          You are welcome!
        </p>
        <p className="mt-1 text-xs text-gray-400 self-end">2:00pm</p>
      </div>
      {messages.map((msg) => {
        const isMe = msg.senderId === currentUserId;
        return (
          <div
            key={msg.id}
            className={`flex ${isMe ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs px-3 py-2 text-sm rounded-lg ${
                isMe ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
              }`}
            >
              {msg.text}
            </div>
          </div>
        );
      })}

      <div ref={bottomRef} />
    </div>
  );
};

export default ChatMessages;
