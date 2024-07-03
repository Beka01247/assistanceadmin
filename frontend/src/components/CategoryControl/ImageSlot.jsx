import React, { useState } from "react";

function ImageSlot() {
  const [showPlus, setShowPlus] = useState(false);
  return (
    <div
      className="bg-white border border-gray-300 rounded-lg flex items-center justify-center h-20 w-20"
      onMouseEnter={() => setShowPlus(true)}
      onMouseLeave={() => setShowPlus(false)}
    >
      {showPlus && <button className="text-[#E13737] text-4xl">+</button>}
    </div>
  );
}

export default ImageSlot;
