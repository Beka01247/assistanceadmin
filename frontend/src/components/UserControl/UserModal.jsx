import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProfileCard = ({ onClose, user }) => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    forumMessages: 0,
    forums: 0,
    incidents: 0,
    natDisMessages: 0,
  });
  const [currentUser, setCurrentUser] = useState(user);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4010/api/admin/users/${currentUser.user_id}/stats`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching user stats:", error);
      }
    };

    fetchStats();
  }, [currentUser.user_id]);

  const formattedDate = new Date(currentUser.created_at).toLocaleDateString();

  const handleBanUser = async () => {
    try {
      const response = await axios.post(
        `http://localhost:4010/api/admin/users/${currentUser.user_id}/ban`,
        { isBanned: true },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(response.data.message);
      // Update the current user state to reflect the ban status
      setCurrentUser((prevUser) => ({
        ...prevUser,
        isBanned: true,
      }));
    } catch (error) {
      console.error("Error banning user:", error);
    }
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg shadow-lg relative w-[50%] h-max">
        <button onClick={onClose} className="absolute top-2 right-2 text-lg">
          &times;
        </button>
        <div className="flex mb-4">
          <img
            src={`http://localhost:4010/uploads/avatars/${user.photo}`}
            alt={`${user.name}'s photo`}
            className="rounded-lg w-[180px] h-[180px] mr-1"
          />

          <div className="mr-4">
            <div className="flex gap-32 items-center justify-between">
              <div className="text-gray-900 font-semibold">Тип</div>
              <div className="text-gray-500">{currentUser.type}</div>
            </div>
            <div className="flex gap-32 items-center justify-between">
              <div className="text-gray-900 font-semibold mt-2">
                Дата регистрации
              </div>
              <div className="text-gray-500">{formattedDate}</div>
            </div>
            <div className="flex gap-32 items-center justify-between">
              <div className="text-gray-900 font-semibold mt-2">ID</div>
              <div className="text-gray-500">#{currentUser.user_id}</div>
            </div>
            <div className="flex gap-32 items-center justify-between">
              <div className="text-gray-900 font-semibold mt-2">Имя</div>
              <div className="text-gray-500">{currentUser.name}</div>
            </div>
            <div className="flex gap-32 items-center justify-between">
              <div className="text-gray-900 font-semibold mt-2">Фамилия</div>
              <div className="text-gray-500">{currentUser.surname}</div>
            </div>
            <div className="flex gap-32 items-center justify-between">
              <div className="text-gray-900 font-semibold mt-2">Номер</div>
              <div className="text-gray-500">{currentUser.phone}</div>
            </div>
            <div className="flex gap-32 items-center justify-between">
              <div className="text-gray-900 font-semibold mt-2">Email</div>
              <div className="text-gray-500">{currentUser.email}</div>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex flex-col gap-4 mb-4">
            <div className="flex gap-16 items-center justify-between">
              <div className="text-gray-900 font-semibold">
                Сообщений на форуме
              </div>
              <div className="text-gray-500">{stats.forumMessages} шт.</div>
            </div>
            <div className="flex gap-16 items-center justify-between">
              <div className="text-gray-900 font-semibold">
                Статьи на форуме
              </div>
              <div className="text-gray-500">{stats.forums} шт.</div>
            </div>
            <div className="flex gap-16 items-center justify-between">
              <div className="text-gray-900 font-semibold">Объявлений</div>
              <div className="text-gray-500">{stats.incidents} шт.</div>
            </div>
            <div className="flex gap-16 items-center justify-between">
              <div className="text-gray-900 font-semibold">
                Сообщений о бедствии
              </div>
              <div className="text-gray-500">{stats.natDisMessages} шт.</div>
            </div>
          </div>
          <div className="flex flex-col gap-4 w-[50%]">
            <button
              className="bg-[#E13737] text-white font-semibold py-2 px-4 rounded-full w-full h-14"
              onClick={() => navigate("/admin/user-control/activity")}
            >
              Посмотреть активность
            </button>
            <button
              className={`bg-white text-[#E13737] border border-[#E13737] font-semibold py-2 px-4 rounded-full w-full h-14 ${
                currentUser.isBanned ? "cursor-not-allowed opacity-50" : ""
              }`}
              onClick={handleBanUser}
              disabled={currentUser.isBanned}
            >
              {currentUser.isBanned ? "Заблокирован" : "Заблокировать"}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ProfileCard;
