import React from "react";

const ChatItem = ({ name, role, message, time }) => {
  return (
    <div className="flex mb-4">
      <img
        src="https://via.placeholder.com/40"
        alt="Avatar"
        className="w-10 h-10 rounded-full mr-3"
      />
      <div>
        <div className="text-gray-900 font-semibold">{name}</div>
        <div className="text-gray-500 text-sm">{role}</div>
        <div className="text-gray-700 mt-1">{message}</div>
        <div className="text-gray-400 text-xs mt-2">{time}</div>
      </div>
    </div>
  );
};

export default ChatItem;
