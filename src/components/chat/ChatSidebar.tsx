"use client";
import ChatItem from "../ChatItem";

interface ChatSidebarProps {
  chats: {
    id: string;
    kost: {
      namaKost: string;
      fotoKost: string;
    };
    last_message: string;
    last_message_at: string;
    unread_messages: number;
  }[];
  onSelect: (chatId: string) => void;
  selectedChatId: string | null;
}

const ChatSidebar = ({ chats, onSelect, selectedChatId }: ChatSidebarProps) => {
  if (!chats || chats.length === 0) {
    return (
      <div className="w-72 border-r border-gray-200 flex flex-col">
        <div className="flex items-center justify-between px-6 py-4">
          <h2 className="font-bold text-lg">Chat</h2>
          <span className="text-xs font-semibold bg-gray-200 text-gray-700 rounded-md px-2 py-0.5 select-none">
            0
          </span>
        </div>
        <div className="px-4 pb-4">
          <div className="relative text-gray-400">
            <input
              type="text"
              placeholder="Search..."
              className="w-full border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
            />
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center h-full">
          <p className="text-gray-400">No chats available</p>
        </div>
      </div>
    );
  }
  return (
    <div className="w-72 border-r border-gray-200 flex flex-col">
      <div className="flex items-center justify-between px-6 py-4">
        <h2 className="font-bold text-lg">Chat</h2>
        <span className="text-xs font-semibold bg-gray-200 text-gray-700 rounded-md px-2 py-0.5 select-none">
          {chats.length}
        </span>
      </div>
      <div className="px-4 pb-4">
        <div className="relative text-gray-400">
          <input
            type="text"
            placeholder="Search..."
            className="w-full border border-gray-300 rounded-md py-2 pl-3 pr-10 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto scrollbar-thin">
        {chats.map((chat) => (
          <ChatItem
            key={chat.id}
            imgSrc={chat.kost.fotoKost || "https://placehold.co/40x40?text=?"}
            name={chat.kost.namaKost}
            message={chat.last_message}
            onClick={() => onSelect(chat.id)}
            active={chat.id === selectedChatId}
            unreadCount={chat.unread_messages || 0}
          />
        ))}
        {/* <ChatItem
          imgSrc="https://placehold.co/40x40/png?text=Devid"
          altText="Portrait of Devid"
          name="Devid Heilo"
          message="I cam across your and..."
        />
        <ChatItem
          imgSrc="https://placehold.co/40x40/png?text=Henry"
          altText="Portrait of Henry"
          name="Henry Fisher"
          message="I like your confidence 💪"
          active
        />
        <ChatItem
          imgSrc="https://placehold.co/40x40/png?text=Wilium"
          altText="Portrait of Wilium"
          name="Wilium Smith"
          message="Can you share your offer?"
          status="green"
        />
        <ChatItem
          imgSrc="https://placehold.co/40x40/png?text=Henry+Deco"
          altText="Portrait of Henry Deco"
          name="Henry Deco"
          message="I'm waiting for your response!"
          status="red"
        />
        <ChatItem
          imgSrc="https://placehold.co/40x40/png?text=Jubin"
          altText="Portrait of Jubin"
          name="Jubin Jack"
          message="I'm waiting for your response!"
        /> */}
      </div>
    </div>
  );
};

export default ChatSidebar;
