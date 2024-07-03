import React, { useState, useEffect } from "react";
import axios from "axios";
import MainHeader from "../MainHeader";
import BurgerMenu from "../BurgerMenu";
import Back from "./../../assets/images/back";
import AllChats from "./All/AllChats";
import ExtendedChat from "./ExtendedChat/ExtendedChat";

function ModerationChat() {
  const [chats, setChats] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [tab, setTab] = useState({ type: 0, id: null });

  useEffect(() => {
    fetchChats();
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const fetchChats = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4010/api/admin/chats",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setChats(response.data);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  };

  return (
    <div className="flex flex-col">
      <MainHeader toggleMenu={toggleMenu} />
      <h1 className="text-center text-2xl font-semibold mt-8 mb-2">
        Все пользователи
      </h1>
      <div className="w-full flex items-center relative">
        {(tab.type === 5 || tab.type === 3) && (
          <div
            className="absolute left-32 -top-0 font-medium text-lg flex items-center gap-4 cursor-pointer"
            onClick={() => setTab({ type: 0, id: null })}
          >
            <Back />
            Назад
          </div>
        )}
        <div className="w-max flex mx-auto mb-8 text-xl text-[#1F1F1F] gap-6 font-medium relative">
          <span
            onClick={() => setTab({ type: 0, id: null })}
            className={
              "cursor-pointer px-2 " +
              (tab.type === 0 || tab.type === 5
                ? `opacity-100 border-b-2 border-[#1F1F1F]`
                : `opacity-40`)
            }
          >
            Все
          </span>
        </div>
      </div>
      {tab.type === 0 && <AllChats chats={chats} setTab={setTab} />}
      {tab.type === 5 && <ExtendedChat chatId={tab.id} />}
      <BurgerMenu isOpen={menuOpen} toggleMenu={toggleMenu} />
    </div>
  );
}

export default ModerationChat;
