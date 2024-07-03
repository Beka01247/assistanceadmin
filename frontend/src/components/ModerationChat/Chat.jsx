import React from "react";

const Chat = ({ name, description, avatarUrl, notifications, onClick }) => {
  return (
    <div
      className="p-4 bg-white border rounded-lg shadow-lg cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center mb-4">
        <img
          src={avatarUrl}
          alt={`${name}'s avatar`}
          className="w-10 h-10 rounded-full mr-4"
        />
        <div>
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
      {notifications > 0 && (
        <div className="text-red-500 text-sm font-semibold">
          {notifications} new messages
        </div>
      )}
    </div>
  );
};

export default Chat;
