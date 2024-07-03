import React, { useState } from "react";
import Dots from "../../../assets/images/threedots";
import MoreVertical from "../../../assets/images/morevertical";
import Clock from "../../../assets/images/clock";
import View from "../../../assets/images/view";

const ContentCard = ({ content, setTab }) => {
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

  return (
    <div
      className="w-full h-[80px] flex items-center relative"
      onClick={() => setTab({ type: 6, id: content.nat_dis_id })} // Ensure type 6 for ExtendedArticle
    >
      <div className="bg-white border w-full border-gray-200 rounded-lg px-4 py-2 flex items-center justify-between ">
        <div className="flex items-center w-full">
          <div className="flex-shrink-0 cursor-pointer">
            <img
              className="w-10 h-10 rounded-full"
              src="https://via.placeholder.com/40"
              alt="avatar"
            />
          </div>
          <div className="flex flex-col w-full">
            <div className="flex flex-row">
              <h3 className="ml-2">{content.title}</h3>
              <div className="flex flex-row items-end ml-auto"></div>
            </div>
            <div className="flex flex-row w-full mt-2">
              <div className="flex ml-2 gap-4">
                <p className="text-xs flex text-gray-500">
                  <Clock />
                  {new Date(content.created_at).toLocaleString()}
                </p>
                <p className="text-xs flex text-gray-500"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
