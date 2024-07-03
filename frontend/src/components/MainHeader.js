import React from "react";
import Search from "../assets/images/search.jsx";
import Bars from "../assets/images/bars.jsx";

const MainHeader = ({ toggleMenu }) => {
  return (
    <header className="flex flex-grow items-center bg-white h-[36px] mt-5 w-full">
      <button
        onClick={toggleMenu}
        className="flex items-center justify-center p-2 ml-[60px]"
      >
        <Bars />
      </button>
      <div className="flex flex-grow items-center justify-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Поиск"
            className="w-[846px] p-2 pl-10 border border-gray-300 rounded-lg"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-5 h-5 text-gray-500" />
          </div>
        </div>
      </div>
      <div className="flex items-center bebas-neue-regular text-[rgba(225,55,55,1)] mr-[45px]">
        ADMIN
      </div>
    </header>
  );
};

export default MainHeader;
