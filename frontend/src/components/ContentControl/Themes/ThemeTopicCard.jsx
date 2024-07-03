import React, { useEffect, useState } from "react";
import Chat from "../../../assets/images/chat";
import Dots from "../../../assets/images/threedots";
import MoreVertical from "../../../assets/images/morevertical";

const ThemeTopicCard = ({ content }) => {
  useEffect(() => {
    console.log("comment", content);
  }, [content]);
  return (
    content && (
      <div className="w-full h-max flex items-center relative">
        <div className="bg-white w-full px-4 py-2 flex items-center justify-between ">
          <div className="flex items-center w-full">
            <div className="flex-shrink-0 cursor-pointer self-start">
              <img
                className="w-14 h-14 rounded-full"
                src="https://via.placeholder.com/40"
                alt="avatar"
              />
            </div>
            <div className="flex flex-col w-full">
              <div className="flex flex-row">
                <h3 className="ml-2 text-lg font-semibold">{content.author}</h3>
                <div className="flex flex-row items-end ml-4">
                  <p className="text-xs text-gray-500">{content.time}</p>
                </div>
              </div>
              <div className="flex flex-row w-full">
                <p className="ml-3 text-lg text-gray-500">{content.role}</p>
                <div className="flex ml-auto"></div>
              </div>
              <div className="w-full">
                <p className="-ml-12 mt-2 text-xs text-gray-500 flex flex-col">
                  <span className="text-lg font-bold">
                    Экстренная помощь и спасение
                  </span>
                  <span className="text-base">
                    Если вы являетесь профессиональным спасателем или работали в
                    этой сфере, поделитесь своими историями и советами о том,
                    как справляться с экстремальными ситуациями?
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ThemeTopicCard;
