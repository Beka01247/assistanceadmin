import React, { useState, useEffect } from "react";
import axios from "axios";
import ChatSection from "./ChatSection";
import MessageInput from "./MessageInput";
import StatusSection from "./StatusSection";

const ExtendedChat = ({ chatId }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, [chatId]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4010/api/admin/chats/${chatId}/messages`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setMessages(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSendMessage = async (message) => {
    try {
      await axios.post(
        `http://localhost:4010/api/admin/chats/${chatId}/messages`,
        { message },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      fetchMessages(); // Refresh messages after sending
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="min-h-screen p-8 flex items-start w-full justify-center">
      <ChatSection messages={messages} loading={loading} />
      <MessageInput onSendMessage={handleSendMessage} />
      <StatusSection />
    </div>
  );
};

export default ExtendedChat;
