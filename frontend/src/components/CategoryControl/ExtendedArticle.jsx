import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MoreVertical from "./../../assets/images/morevertical";

const ProfileSection = ({ creator }) => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleEdit = () => {
    console.log("Edit");
  };

  const handleDelete = () => {
    console.log("Delete");
  };

  const navigate = useNavigate();

  return (
    <div className="flex items-center p-4">
      <img
        src="https://via.placeholder.com/40" // Replace with actual profile image URL
        alt="Profile"
        className="w-10 h-10 rounded-full mr-3"
      />
      <div>
        <div className="text-gray-900 font-semibold">
          {creator.name} {creator.surname}
        </div>
        <div className="text-gray-500 text-sm">{creator.type}</div>
      </div>
      <div className="ml-auto relative">
        <div onClick={toggleMenu}>
          <MoreVertical />
        </div>
        {menuVisible && (
          <div className="absolute right-0 top-12 w-56 bg-white border rounded-lg shadow-xl z-10">
            <ul>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-center"
                onClick={handleEdit}
              >
                Посмотреть профиль
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-center"
                onClick={() => navigate("/admin/user-control/activity")}
              >
                Посмотреть активность
              </li>
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600 text-center"
                onClick={handleDelete}
              >
                Удалить
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

const ContentSection = ({ content }) => {
  return (
    <div className="p-4">
      <div className="text-gray-500 text-sm mb-2 -mt-4">
        Дата создания: {new Date(content.created_at).toLocaleString()}
      </div>
      <div className="text-gray-900 font-semibold text-lg mb-2">
        {content.title}
      </div>
      <img
        src={content.photo} // Replace with actual image URL
        alt="Content"
        className="w-full h-auto rounded-lg mb-4"
      />
      <div className="text-gray-700">{content.description}</div>
    </div>
  );
};

const NotificationCard = ({ content }) => {
  const creator = {
    name: content.creator_name,
    surname: content.creator_surname,
    type: content.creator_type,
  };

  return (
    <div className="max-w-md mx-auto">
      <ProfileSection creator={creator} />
      <ContentSection content={content} />
    </div>
  );
};

const ExtendedArticle = ({ natDisId }) => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    fetchContent();
  }, [natDisId]);

  const fetchContent = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4010/api/admin/disasters/${natDisId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setContent(response.data);
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      {content ? <NotificationCard content={content} /> : <p>Loading...</p>}
    </div>
  );
};

export default ExtendedArticle;
