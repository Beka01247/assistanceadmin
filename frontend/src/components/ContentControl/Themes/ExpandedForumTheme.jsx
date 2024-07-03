import React, { useState, useEffect } from "react";
import axios from "axios";
import MessageCard from "../Messages/MessageCard";
import ThemeTopicCard from "./ThemeTopicCard";
import ReadMoreButton from "./ReadMoreButton";

const ExpandedForumTheme = ({ forumId }) => {
  const [forum, setForum] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchForumData();
    fetchMessages();
  }, [forumId]);

  const fetchForumData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4010/api/admin/forums/${forumId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setForum(response.data);
    } catch (error) {
      console.error("Error fetching forum data:", error);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4010/api/admin/forums/${forumId}/messages`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  if (!forum) {
    return <p>Loading...</p>;
  }

  return (
    <div className="p-4">
      <div className="max-w-6xl mx-auto flex">
        <div className="bg-white mb-4 w-[30%]">
          <ThemeTopicCard
            content={{
              author: `${forum.name} ${forum.surname}`,
              role: forum.type,
              date: new Date(forum.created_at).toLocaleString(),
            }}
          />
        </div>

        <div className="flex flex-wrap w-[70%]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 py-2 px-7 ml-8">
            {messages.map((message, index) => (
              <MessageCard
                key={index}
                content={{
                  author: `${message.message_user_name} ${message.message_user_surname}`,
                  time: new Date(message.message_created_at).toLocaleString(),
                  role: message.message_user_type,
                  content: message.content,
                }}
              />
            ))}
          </div>
          <ReadMoreButton />
        </div>
      </div>
    </div>
  );
};

export default ExpandedForumTheme;
