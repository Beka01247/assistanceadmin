import React from "react";

const ChatSection = ({ messages, loading }) => {
  if (loading) {
    return <p>Loading messages...</p>;
  }

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-100 rounded-lg">
      {messages.map((msg) => (
        <div key={msg.message_id} className="mb-4">
          <div className="text-sm text-gray-600">
            {new Date(msg.sent_at).toLocaleString()}
          </div>
          <div className="text-lg">{msg.message}</div>
        </div>
      ))}
    </div>
  );
};

export default ChatSection;
