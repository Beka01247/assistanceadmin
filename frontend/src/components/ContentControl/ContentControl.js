import React, { useState, useEffect } from "react";
import axios from "axios";
import MainHeader from "../MainHeader";
import BurgerMenu from "../BurgerMenu";
import Themes from "./Themes/Themes";
import ExpandedForumTheme from "./Themes/ExpandedForumTheme";
import Back from "./../../assets/images/back";
import Messages from "./Messages/Messages";
import WordFilter from "./WordFilter/WordFilter";
import Certificates from "./Certificates/Certificates";

function ContentControl() {
  const [contents, setContents] = useState([]);
  const [messages, setMessages] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [tab, setTab] = useState({ type: 0, id: null });

  useEffect(() => {
    fetchContents();
    fetchMessages();
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const fetchContents = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4010/api/admin/forums",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setContents(response.data);
    } catch (error) {
      console.error("Error fetching contents:", error);
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4010/api/admin/messages",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  return (
    <div className="flex flex-col">
      <MainHeader toggleMenu={toggleMenu} />
      <div className="w-full flex items-center relative">
        {(tab.type === 5 || tab.type === 3) && (
          <div
            className="absolute left-32 top-8 font-medium text-lg flex items-center gap-4 cursor-pointer"
            onClick={() => setTab({ type: 0, id: null })}
          >
            <Back />
            Назад
          </div>
        )}
        <div className="w-max flex mx-auto my-8 text-xl text-[#1F1F1F] gap-6 font-medium">
          <span
            onClick={() => setTab({ type: 0, id: null })}
            className={
              "cursor-pointer px-2 " +
              (tab.type === 0 || tab.type === 5
                ? `opacity-100 border-b-2 border-[#1F1F1F]`
                : `opacity-40`)
            }
          >
            Темы
          </span>
          <span
            onClick={() => setTab({ type: 1, id: null })}
            className={
              "cursor-pointer px-2 " +
              (tab.type === 1
                ? `opacity-100 border-b-2 border-[#1F1F1F]`
                : `opacity-40`)
            }
          >
            Сообщения
          </span>
          <span
            onClick={() => setTab({ type: 2, id: null })}
            className={
              "cursor-pointer px-2 " +
              (tab.type === 2
                ? `opacity-100 border-b-2 border-[#1F1F1F]`
                : `opacity-40`)
            }
          >
            Сертификаты
          </span>
          <span
            onClick={() => setTab({ type: 3, id: null })}
            className={
              "cursor-pointer px-2 " +
              (tab.type === 3
                ? `opacity-100 border-b-2 border-[#1F1F1F]`
                : `opacity-40`)
            }
          >
            Фильтрация слов
          </span>
        </div>
      </div>
      <BurgerMenu isOpen={menuOpen} toggleMenu={toggleMenu} />
      {tab.type === 0 && <Themes contents={contents} setTab={setTab} />}
      {tab.type === 2 && <Certificates />}
      {tab.type === 1 && <Messages contents={messages} />}
      {tab.type === 3 && <WordFilter />}
      {tab.type === 5 && <ExpandedForumTheme forumId={tab.id} />}
    </div>
  );
}

export default ContentControl;
