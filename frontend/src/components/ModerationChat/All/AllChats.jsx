import React from "react";
import Chat from "../Chat";

const AllChats = ({ chats, setTab }) => {
  return (
    <div className="min-h-screen p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {chats.map((chat) => (
          <Chat
            key={chat.chat_id}
            name={chat.user_name}
            description={chat.last_message}
            avatarUrl="https://via.placeholder.com/50"
            notifications={chat.unread_messages}
            onClick={() => setTab({ type: 5, id: chat.chat_id })}
          />
        ))}
      </div>
    </div>
  );
};

export default AllChats;
