import React from "react";
import axios from "axios";

const ContentCard = ({ content }) => {
  const handleBanUser = async () => {
    try {
      await axios.patch(
        `http://localhost:4010/api/admin/incidents/${content.incident_id}/status`,
        { reason: "Admin" },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      alert("User has been banned successfully");
      console.log(content.incident_id);
    } catch (error) {
      console.error("Error banning user:", error);
      alert("Failed to ban user");
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full mx-auto mb-4">
      <div className="flex items-center mb-4">
        <img
          src="https://via.placeholder.com/50"
          alt="Icon"
          className="w-36 h-36 mr-4 rounded-xl"
        />
        <div>
          <div className="text-gray-500 text-sm">Время</div>
          <div className="text-gray-900">
            {new Date(content.created_at).toLocaleString()}
          </div>
          <div className="text-gray-500 text-sm mt-2">Имя и фамилия</div>
          <div className="text-gray-900">Николай Григорьевич</div>
          <div className="text-gray-500 text-sm mt-2">Категория ситуации</div>
          <div className="text-gray-900">{content.type}</div>
        </div>
      </div>
      <div className="text-gray-700 mb-4">
        Описание
        <p>{content.description}</p>
      </div>
      <button
        onClick={handleBanUser}
        disabled={!content.isActive}
        className={`font-semibold py-2 px-4 rounded-lg w-full ${
          content.isActive
            ? "bg-[#E13737] text-white"
            : "bg-white text-[#E13737] border-2 border-[#E13737]"
        }`}
      >
        {content.isActive ? "Отклонить ситуацию" : "Отменен"}
      </button>
    </div>
  );
};

export default ContentCard;
