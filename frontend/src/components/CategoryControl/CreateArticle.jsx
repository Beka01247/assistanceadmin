import React from "react";
import ImageSlot from "./ImageSlot";

const CreateArticle = () => {
  return (
    <div className="flex items-start mt-8 justify-center h-screen">
      <div className="p-6 w-[50%] mx-auto flex flex-col">
        <div className="flex mb-4">
          <div className="flex-1 mr-4">
            <label className="block text-gray-700 mb-1">Заголовок</label>
            <input
              type="text"
              className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-gray-500"
              placeholder="Будет возможно землетрясение"
            />
            <label className="block text-gray-700 mt-4 mb-1">
              Фото (не обязательно)
            </label>
            <div className="grid grid-cols-4 gap-2">
              {Array(4)
                .fill()
                .map((_, i) => (
                  <ImageSlot />
                ))}
            </div>
          </div>
          <div className="flex-1 ml-4">
            <label className="block text-gray-700 mb-1">Описание</label>
            <textarea
              className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-gray-500"
              rows="10"
              placeholder="Хочу поделиться важной информацией о возможном землетрясении..."
            ></textarea>
          </div>
        </div>
        <button className="bg-[#E13737] text-white font-semibold py-2 px-4 rounded-full w-1/2 mx-auto">
          Опубликовать
        </button>
      </div>
    </div>
  );
};

export default CreateArticle;
