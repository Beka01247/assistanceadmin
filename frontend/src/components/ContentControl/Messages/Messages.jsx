import React, { useEffect, useState } from "react";
import MessageCard from "./MessageCard";
import ReadMoreButton from "../Themes/ReadMoreButton";

export default function Messages({ contents, onDelete }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    setComments(contents);
  }, [contents]);

  const handleDelete = (id) => {
    setComments((prev) =>
      prev.filter((comment) => comment.forum_message_id !== id)
    );
  };

  return (
    <div className="p-4">
      <div className="max-w-7xl mx-auto">
        <div className="p-6 mb-4">
          <div className="flex flex-wrap">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 py-2 px-7 ml-8">
              {comments.map((comment, index) => (
                <MessageCard
                  key={comment.forum_message_id}
                  content={comment}
                  onDelete={handleDelete}
                />
              ))}
            </div>
            <ReadMoreButton />
          </div>
        </div>
      </div>
    </div>
  );
}
