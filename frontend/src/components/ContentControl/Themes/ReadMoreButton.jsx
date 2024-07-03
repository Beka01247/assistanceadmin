import React, { useState } from "react";

export default function ReadMoreButton() {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className="mx-auto cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className={isHovered ? "opacity-70" : "opacity-40"}>
        Читать дальше
      </span>
      <div
        className={
          "h-[0.5px] w-28 " + (isHovered ? "bg-gray-700" : "bg-gray-400")
        }
      ></div>
    </div>
  );
}
